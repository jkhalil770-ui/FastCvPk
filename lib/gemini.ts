import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export interface AISuggestionResponse {
  professionalSummary?: string;
  careerObjective?: string;
  expandedResponsibilities?: string[];
  skillsSuggestions?: string[];
  translatedText?: string;
  summary?: string;
  skills?: string[];
  responsibilities?: string[];
}

const ENGLISH_SYSTEM_PROMPT = `
You are a senior Pakistani CV writer with 15 years experience. You have helped 50,000+ professionals get jobs.

YOUR WRITING STYLE:
- Write like a smart human, not AI
- Short and punchy sentences
- Every word must earn its place
- No fluff, no padding

STRICT RULES FOR ENGLISH:
Professional Summary:
- Maximum 3 sentences only
- Sentence 1: Who you are + years exp
- Sentence 2: Your biggest achievement
- Sentence 3: What you bring to table
Example of PERFECT summary:
'Software engineer with 5 years building web apps in React and Node.js. Cut page load times by 60% at my last company, serving 20,000 daily users. Looking for a remote role where I can build products that actually matter.'

Work Experience Bullets:
- Maximum 4 bullets per job
- Each bullet: 1 line only
- Always start with action verb
- Always include 1 number/result
- GOOD: 'Reduced API response time by 40% using Redis caching'
- BAD: 'Responsible for the management and optimization of various API endpoints resulting in improved performance metrics'

BANNED PHRASES — never use these:
- Proven track record
- Results-driven professional  
- Dynamic and motivated
- Leverage synergies
- Spearheaded initiatives
- Adept at utilizing
- Innovative solutions provider
- Strategic vision
- Cross-functional collaboration
- Value-added contributions
- Seasoned professional
- Passionate about
- Going forward
- At the end of the day

Skills:
- Only real skills user mentioned
- No fake padding skills
- Max 12 skills total
- No generic: 'Microsoft Office' unless specifically relevant

Education:
- Degree, institution, year only
- No unnecessary description

TONE: Confident, direct, human
READING LEVEL: Clear and simple
FORMAT: Return clean JSON only
`;

const URDU_SYSTEM_PROMPT = `
آپ پاکستان کے سینئر سی وی رائٹر ہیں۔

اردو لکھنے کے اصول:
- سادہ اور واضح اردو لکھیں
- پیچیدہ الفاظ سے بچیں
- مختصر جملے لکھیں
- ہر جملہ مکمل معنی دے

پیشہ ورانہ خلاصہ:
- صرف 2-3 جملے
- سادہ اردو میں
- قابلیت اور تجربہ واضح ہو

ہنر مندیاں:
- صرف اصل صلاحیتیں
- زیادہ سے زیادہ 10

فارمیٹ: صرف JSON واپس کریں
`;

/**
 * Contact Gemini API with system rules and parse JSON output.
 * Implements a single timeout/network retry.
 */
export async function queryGemini(
  prompt: string, 
  attempt = 1, 
  cvType?: string, 
  lang: 'en' | 'ur' = "en"
): Promise<AISuggestionResponse> {
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured on the server.");
  }

  // Use gemini-flash-latest by default on attempt 1 (highest quota availability), fall back to gemini-2.0-flash on attempt 2
  const modelToUse = attempt === 1 ? "gemini-flash-latest" : "models/gemini-2.0-flash";

  try {
    const model = genAI.getGenerativeModel({
      model: modelToUse,
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    let systemPromptToUse = lang === "ur" ? URDU_SYSTEM_PROMPT : ENGLISH_SYSTEM_PROMPT;
    if (cvType === "global-pro" && lang === "en") {
      systemPromptToUse = systemPromptToUse + `
[IMPORTANT: Global Pro Template Instructions]
Generate CV content optimized for international remote job market.
Use strong action verbs.
Quantify all achievements with numbers and percentages (e.g. "Increased sales by 40%", "Managed team of 8 people", "Reduced costs by $10,000").
Professional international English.
Highlight remote work capabilities.
Make it ATS-friendly for international job portals like LinkedIn, Indeed, Remote.co, Upwork, Toptal.
`;
    }

    const fullPrompt = `${systemPromptToUse}\n\nTask prompt:\n${prompt}`;
    
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const rawText = response.text().trim();

    let cleanJson = rawText;
    if (cleanJson.startsWith("```json")) {
      cleanJson = cleanJson.substring(7);
    }
    if (cleanJson.startsWith("```")) {
      cleanJson = cleanJson.substring(3);
    }
    if (cleanJson.endsWith("```")) {
      cleanJson = cleanJson.substring(0, cleanJson.length - 3);
    }
    cleanJson = cleanJson.trim();

    return JSON.parse(cleanJson) as AISuggestionResponse;
  } catch (error: any) {
    console.error(`Gemini query error using ${modelToUse} on attempt ${attempt}:`, error);

    // If attempt 1 fails (even due to 429 rate limits), retry once using the backup model
    if (attempt === 1) {
      console.log("Attempt 1 failed. Retrying dynamically with backup model...");
      return queryGemini(prompt, 2, cvType, lang);
    }

    // For rate limit errors on the fallback attempt, throw rate limit error
    const isRateLimit = error?.status === 429 || error?.message?.includes("429") || error?.message?.includes("Too Many Requests");
    if (isRateLimit) {
      const rateLimitErr = new Error("AI busy hai, 1 minute mein dobara try karein ⏱️ / AI is busy, please try again in 1 minute ⏱️");
      (rateLimitErr as any).status = 429;
      throw rateLimitErr;
    }

    throw error;
  }
}

/**
 * Builds specific prompt to expand job responsibilities based on title and input.
 */
export function buildResponsibilitiesPrompt(jobTitle: string, company: string, briefText: string, lang: 'en' | 'ur'): string {
  return `
    Type: responsibilities_expansion
    Language: ${lang}
    Job Title: ${jobTitle}
    Company: ${company}
    User notes: ${briefText}
    
    Goal: Expand the user's brief notes into exactly 3 to 4 professional high-impact bullet points representing accomplishments and responsibilities. Use active verbs.
    Return JSON format: { "expandedResponsibilities": ["Bullet 1", "Bullet 2", "Bullet 3"] }
  `;
}

/**
 * Builds professional summary or objective prompt.
 */
export function buildSummaryPrompt(role: string, yearsOfExp: string, skills: string[], lang: 'en' | 'ur', isStudent = false): string {
  const segment = isStudent ? "careerObjective" : "professionalSummary";
  return `
    Type: ${segment}_generation
    Language: ${lang}
    Target Role / Class: ${role}
    Details: ${yearsOfExp} years of work experience, skills: ${skills.join(", ")}
    
    Goal: Generate a captivating, highly-professional 3-line ${segment} highlighting skills and drive.
    Return JSON format: { "${segment}": "Professional text goes here..." }
  `;
}

/**
 * Builds smart fill prompt for form auto-fill features based on job title input.
 */
export function buildSmartFillPrompt(jobTitle: string, lang: 'en' | 'ur'): string {
  return `
    Type: smart_ai_fill
    Job Title / Profession: ${jobTitle}
    Language: ${lang}
    
    Goal: Automatically suggest:
    1. A relevant high-impact professional summary or career objective (3-4 lines).
    2. Exactly 10 to 15 relevant technical or soft skills tags suitable for this career.
    3. Exactly 3 to 4 common responsibilities expanded with strong active verbs.
    
    Return JSON format:
    {
      "summary": "Professional summary content...",
      "skills": ["Skill Tag 1", "Skill Tag 2", "Skill Tag 3", "Skill Tag 4", "Skill Tag 5", "Skill Tag 6", "Skill Tag 7", "Skill Tag 8", "Skill Tag 9", "Skill Tag 10"],
      "responsibilities": ["Job responsibility bullet statement 1...", "Job responsibility bullet statement 2...", "Job responsibility bullet statement 3...", "Job responsibility bullet statement 4..."]
    }
  `;
}

/**
 * Unified CV content generation wrapper connecting Gemini 2.0 Flash API.
 * Automatically retries on timeout/failure and formats output.
 */
export async function generateCV(
  action: "summary" | "responsibilities" | "ai-fill" | "skills-suggestions",
  params: {
    jobTitle?: string;
    company?: string;
    briefText?: string;
    title?: string;
    details?: string;
    skills?: string[];
    isStudent?: boolean;
    role?: string;
  },
  lang: 'en' | 'ur' = "en"
): Promise<AISuggestionResponse> {
  let prompt = "";
  
  if (action === "summary") {
    prompt = buildSummaryPrompt(
      params.title || "",
      params.details || "",
      params.skills || [],
      lang,
      params.isStudent || false
    );
  } else if (action === "responsibilities") {
    prompt = buildResponsibilitiesPrompt(
      params.jobTitle || "",
      params.company || "",
      params.briefText || "",
      lang
    );
  } else if (action === "ai-fill") {
    prompt = buildSmartFillPrompt(params.jobTitle || "", lang);
  } else if (action === "skills-suggestions") {
    prompt = `
      Type: skills_suggestions
      Language: ${lang}
      Role/Job Title: ${params.role || "Student"}
      
      Goal: Suggest a list of exactly 8 highly relevant technical and soft skills for this role.
      Return JSON format: { "skillsSuggestions": ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5", "Skill 6", "Skill 7", "Skill 8"] }
    `;
  } else {
    throw new Error(`Unsupported AI CV action: ${action}`);
  }

  return queryGemini(prompt, 1, undefined, lang);
}

