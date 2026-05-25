import { NextResponse } from "next/server";
import { queryGemini, buildResponsibilitiesPrompt, buildSummaryPrompt, buildSmartFillPrompt } from "@/lib/gemini";

/**
 * Simple in-memory rate limiter — max 10 requests per IP per 60 seconds.
 */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (record.count >= RATE_LIMIT_MAX) return false;
  record.count += 1;
  return true;
}

/** Strip HTML tags and dangerous chars to prevent prompt injection */
function sanitize(value: unknown): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/[<>'"]/g, "")
    .trim()
    .substring(0, 2000);
}

/**
 * API route to request Gemini AI generation.
 * Protected with IP-based rate limiting and input sanitization.
 */
export async function POST(req: Request) {
  // Rate limiting
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Please wait 1 minute. / براہ کرم 1 منٹ بعد دوبارہ کوشش کریں۔" },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const { action, lang = "en", cvType } = body;

    // Whitelist allowed actions
    const allowedActions = ["summary", "responsibilities", "ai-fill", "skills-suggestions"];
    if (!action || !allowedActions.includes(action)) {
      return NextResponse.json({ error: "Invalid or missing 'action' parameter" }, { status: 400 });
    }

    // Whitelist allowed languages
    const safeLang = ["en", "ur"].includes(lang) ? lang : "en";

    let aiPrompt = "";

    if (action === "summary") {
      const title = sanitize(body.title);
      const details = sanitize(body.details);
      const skills = Array.isArray(body.skills)
        ? body.skills.map((s: unknown) => sanitize(s)).slice(0, 20)
        : [];
      const isStudent = Boolean(body.isStudent);
      aiPrompt = buildSummaryPrompt(title, details, skills, safeLang, isStudent);

    } else if (action === "responsibilities") {
      const jobTitle = sanitize(body.jobTitle);
      const company = sanitize(body.company);
      const briefText = sanitize(body.briefText);
      if (!jobTitle || !briefText) {
        return NextResponse.json({ error: "Missing 'jobTitle' or 'briefText'" }, { status: 400 });
      }
      aiPrompt = buildResponsibilitiesPrompt(jobTitle, company || "Company Name", briefText, safeLang);

    } else if (action === "ai-fill") {
      const jobTitle = sanitize(body.jobTitle);
      if (!jobTitle) {
        return NextResponse.json({ error: "Missing required parameter 'jobTitle'" }, { status: 400 });
      }
      aiPrompt = buildSmartFillPrompt(jobTitle, safeLang);

    } else if (action === "skills-suggestions") {
      const role = sanitize(body.role);
      aiPrompt = `
        Type: skills_suggestions
        Language: ${safeLang}
        Role/Job Title: ${role || "Student"}
        
        Goal: Suggest a list of exactly 8 highly relevant technical and soft skills for this role.
        Return JSON format: { "skillsSuggestions": ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5", "Skill 6", "Skill 7", "Skill 8"] }
      `;
    }

    const response = await queryGemini(aiPrompt, 1, cvType, safeLang);
    return NextResponse.json(response);

  } catch (error: any) {
    console.error("API generate-cv route error:", error);

    const isRateLimit = error?.status === 429 || error?.message?.includes("rate limit") || error?.message?.includes("429");
    const isPermission = error?.status === 403 || error?.message?.includes("permission") || error?.message?.includes("API key");

    let errorMessage = "CV generation failed. Please try again.";
    let statusCode = 500;

    if (isRateLimit) {
      errorMessage = "AI busy hai, 1 minute mein dobara try karein ⏱️ / AI is busy, please try again in 1 minute ⏱️";
      statusCode = 429;
    } else if (isPermission) {
      errorMessage = "Gemini API key configuration error. Contact support.";
      statusCode = 403;
    } else {
      errorMessage = error?.message || "An unexpected error occurred during AI processing.";
    }

    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}
