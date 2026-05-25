const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Load .env.local
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const apiKeyMatch = envContent.match(/GEMINI_API_KEY=(.*)/);
const apiKey = apiKeyMatch ? apiKeyMatch[1].trim().replace(/['"]/g, '') : '';

if (!apiKey) {
  console.error("GEMINI_API_KEY not found in .env.local");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

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

const jobTitles = [
  "Software Engineer",
  "Doctor",
  "Teacher",
  "Graphic Designer",
  "AI Agent"
];

async function testTitle(title) {
  console.log(`============================= TESTING: ${title} =============================`);
  const model = genAI.getGenerativeModel({
    model: 'gemini-flash-latest',
    generationConfig: {
      responseMimeType: 'application/json'
    }
  });

  const prompt = `
    Type: smart_ai_fill
    Job Title / Profession: ${title}
    Language: en
    
    Goal: Automatically suggest:
    1. A relevant high-impact professional summary or career objective (3-4 lines).
    2. Exactly 10 to 15 relevant technical or soft skills tags suitable for this career.
    3. Exactly 3 to 4 common responsibilities expanded with strong active verbs.
    
    Return JSON format:
    {
      "summary": "Professional summary content...",
      "skills": ["Skill Tag 1", "Skill Tag 2", "Skill Tag 3"],
      "responsibilities": ["Bullet 1...", "Bullet 2..."]
    }
  `;

  const fullPrompt = `${ENGLISH_SYSTEM_PROMPT}\n\nTask prompt:\n${prompt}`;
  const result = await model.generateContent(fullPrompt);
  const response = await result.response;
  console.log(response.text().trim());
}

async function start() {
  for (const title of jobTitles) {
    try {
      await testTitle(title);
    } catch (err) {
      console.error(`Error testing ${title}:`, err);
    }
  }
}

start();
