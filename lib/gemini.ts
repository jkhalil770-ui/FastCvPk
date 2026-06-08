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
- ATS COMPLIANCE RULE: If writing for ATS, ATS Classic, or Premium formats, you MUST automatically analyze the role title (e.g. Software Engineer, Customer Support Agent) and inject highly targeted, realistic industry technical keywords and realistic quantified achievements (e.g., percentages, rates, or dollar numbers) to ensure maximum parsing results, even if the user provided minimum inputs.

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

  // Use gemini-2.0-flash by default to ensure stability and high performance.
  const modelToUse = "gemini-2.0-flash";

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

    // If attempt 1 fails, retry once dynamically
    if (attempt === 1) {
      console.log("Attempt 1 failed. Retrying dynamically...");
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
export function buildSummaryPrompt(
  role: string, 
  yearsOfExp: string, 
  skills: string[], 
  lang: 'en' | 'ur', 
  isStudent = false,
  targetCompany = "",
  cvType = ""
): string {
  const segment = isStudent ? "careerObjective" : "professionalSummary";
  let targetCompanyInstruction = "";
  
  if (targetCompany && targetCompany.trim() !== "") {
    const compLower = targetCompany.toLowerCase();
    let specificCompanyContext = "";
    
    // Call center / ibex / BPO mapping
    if (compLower.includes("ibex") || compLower.includes("call center") || compLower.includes("customer support") || compLower.includes("bpo") || compLower.includes("telecom") || compLower.includes("customer care")) {
      specificCompanyContext = `
For '${targetCompany}' (which is a BPO/Call Center environment like ibex Pakistan), you MUST aggressively weave in high-priority customer operation terms:
- CSAT (Customer Satisfaction) improvement (e.g. "boosted CSAT scores by 15%")
- Average Handle Time (AHT) optimization (e.g. "reduced average handle time by 20% while maintaining resolution quality")
- First Call Resolution (FCR) rates
- Quality Assurance (QA) compliance scores (e.g. "maintained a 95%+ QA compliance rating")
- Empathy, active listening, CRM navigation, customer escalation handling, ticket resolution, and upselling or customer retention.
- Ensure the tone is extremely customer-centric, high-energy, and highly capable of handling fast-paced customer queues.`;
    } 
    // Tech firms / Systems Limited / NetSol / Wipro / TCS / Infosys mapping
    else if (compLower.includes("systems") || compLower.includes("software house") || compLower.includes("dev") || compLower.includes("tech") || compLower.includes("contour") || compLower.includes("netsol") || compLower.includes("wipro") || compLower.includes("tcs") || compLower.includes("infosys") || compLower.includes("hcl") || compLower.includes("tech")) {
      specificCompanyContext = `
For '${targetCompany}' (which is a major technology solutions firm like Systems Limited, NetSol, Wipro, TCS, or Infosys), you MUST aggressively weave in hard technical terms, software architecture principles, and delivery metrics:
- Rebuilding or refactoring complex systems to reduce latency (e.g. "reduced API execution time by 30%")
- Agile methodologies, Scrum rituals, sprint delivery, Git collaboration
- Scalability, database indexing, RESTful APIs, cloud deployment, and system security
- Technical leadership, clean code principles, code reviews, and high-performance throughput.`;
    }
    
    targetCompanyInstruction = `\nTarget Company Focus: The candidate is applying to '${targetCompany}'. Optimize this generated summary by naturally weaving in highly relevant corporate keywords, key metrics, or standard principles aligned with '${targetCompany}' (e.g. if Amazon, align with Leadership Principles like Ownership, Bias for Action, Customer Obsession; if a general tech firm, use standard modern high-impact ATS keywords). Make sure it parses perfectly for '${targetCompany}' recruitment screeners.${specificCompanyContext}`;
  }

  let atsInstruction = "";
  if (cvType === "ats" || cvType === "ats-classic" || cvType === "global-pro" || cvType === "freelancer") {
    atsInstruction = `
\n[ATS COMPLIANCE MODE: ACTIVE (MAX OPTIMIZATION)]
Because this is an ATS-optimized CV, you MUST aggressively optimize this summary to pass automated parsing engines:
1. Analyze the Role "${role}" and weave in at least 5 to 7 high-impact industry technical keywords, standard methodologies, and specific toolsets suitable for this profession (e.g., if Tech: include specific tech stacks; if Call Center/Customer Support: include CSAT, ticketing tools, escalations, CRM tools).
2. Inject a realistic, high-impact quantified business achievement metric (e.g., percentages, dollar amounts, or time reductions like "cutting response times by 35%" or "managing a portfolio of $20K+") even if not explicitly provided in the input details. Make it look 100% natural and highly professional.
3. Ensure every sentence starts with or utilizes active corporate verbs.
4. Eliminate generic sentences. Ensure every word contributes to a premium, executive-level technical score.`;
  }

  return `
    Type: ${segment}_generation
    Language: ${lang}
    Target Role / Class: ${role}
    Details: ${yearsOfExp} years of work experience, skills: ${skills.join(", ")}${targetCompanyInstruction}${atsInstruction}
    
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
    targetCompany?: string;
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
      params.isStudent || false,
      params.targetCompany || ""
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

