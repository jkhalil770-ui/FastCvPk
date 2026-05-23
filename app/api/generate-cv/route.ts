import { NextResponse } from "next/server";
import { queryGemini, buildResponsibilitiesPrompt, buildSummaryPrompt, buildSmartFillPrompt } from "@/lib/gemini";

/**
 * API route to request Gemini AI generation.
 * Handles action options: 'summary', 'responsibilities', or 'all-skills'.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, lang = "en" } = body;

    if (!action) {
      return NextResponse.json({ error: "Missing required parameter 'action'" }, { status: 400 });
    }

    let aiPrompt = "";

    if (action === "summary") {
      const { title, details, skills = [], isStudent = false } = body;
      aiPrompt = buildSummaryPrompt(title || "", details || "", skills, lang, isStudent);
    } else if (action === "responsibilities") {
      const { jobTitle, company, briefText } = body;
      if (!jobTitle || !briefText) {
        return NextResponse.json({ error: "Missing 'jobTitle' or 'briefText'" }, { status: 400 });
      }
      aiPrompt = buildResponsibilitiesPrompt(jobTitle, company || "Company Name", briefText, lang);
    } else if (action === "ai-fill") {
      const { jobTitle } = body;
      if (!jobTitle) {
        return NextResponse.json({ error: "Missing required parameter 'jobTitle'" }, { status: 400 });
      }
      aiPrompt = buildSmartFillPrompt(jobTitle, lang);
    } else if (action === "skills-suggestions") {
      const { role } = body;
      aiPrompt = `
        Type: skills_suggestions
        Language: ${lang}
        Role/Job Title: ${role || "Student"}
        
        Goal: Suggest a list of exactly 8 highly relevant technical and soft skills for this role.
        Return JSON format: { "skillsSuggestions": ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5", "Skill 6", "Skill 7", "Skill 8"] }
      `;
    } else {
      return NextResponse.json({ error: "Invalid action type" }, { status: 400 });
    }

    // Call Gemini API through Server-Side SDK
    const response = await queryGemini(aiPrompt);
    return NextResponse.json(response);
  } catch (error: any) {
    console.error("API generate-cv route error:", error);

    const isRateLimit = error?.status === 429 || error?.message?.includes("rate limit") || error?.message?.includes("429");
    const isPermission = error?.status === 403 || error?.message?.includes("permission") || error?.message?.includes("API key");

    let errorMessage = "CV generation failed. Please try again.";
    let statusCode = 500;

    if (isRateLimit) {
      errorMessage = "Gemini AI busy hai — 1 minute baad dobara try karein. (Free tier rate limit reached)";
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
