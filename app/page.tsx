"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { getTranslation } from "@/lib/translations";
import { 
  Briefcase, 
  User, 
  GraduationCap, 
  Laptop, 
  FileText, 
  Cpu, 
  Download,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Users
} from "lucide-react";

/**
 * Main Premium Web Application Landing Page (/).
 */
export default function LandingPage() {
  const { language } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeCardIdx, setActiveCardIdx] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveCardIdx((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Stats definition
  const stats = [
    { value: "10,000+", labelKey: "statCvsCreated", icon: FileText },
    { value: "4 Types", labelKey: "statCvTypes", icon: Cpu },
    { value: "100% Free", labelKey: "statFreePercent", icon: Sparkles },
    { value: "Pakistanis", labelKey: "statTrustedBy", icon: Users },
  ];

  // CV Type cards mapping
  const cvTypes = [
    {
      id: "ats",
      nameKey: "atsCvName",
      tagKey: "atsCvTag",
      badgeKey: "watermarkBadge",
      descKey: "atsCvDesc",
      icon: Briefcase,
      badgeVariant: "warning" as const,
      color: "from-blue-600/30 to-blue-500/10",
      border: "border-blue-500/20"
    },
    {
      id: "biodata",
      nameKey: "biodataName",
      tagKey: "biodataTag",
      badgeKey: "freeBadge",
      descKey: "biodataDesc",
      icon: User,
      badgeVariant: "success" as const,
      color: "from-emerald-600/30 to-emerald-500/10",
      border: "border-emerald-500/20"
    },
    {
      id: "student",
      nameKey: "studentCvName",
      tagKey: "studentCvTag",
      badgeKey: "freeBadge",
      descKey: "studentCvDesc",
      icon: GraduationCap,
      badgeVariant: "success" as const,
      color: "from-purple-600/30 to-purple-500/10",
      border: "border-purple-500/20"
    },
    {
      id: "freelancer",
      nameKey: "freelancerCvName",
      tagKey: "freelancerCvTag",
      badgeKey: "watermarkBadge",
      descKey: "freelancerDesc",
      icon: Laptop,
      badgeVariant: "warning" as const,
      color: "from-cyan-600/30 to-cyan-500/10",
      border: "border-cyan-500/20"
    }
  ];

  // 10 Detailed Questions for Accordion FAQ & Schema
  const faqs = [
    {
      q: language === "ur" ? "کیا یہ ویب سائٹ بالکل مفت ہے؟" : "Is FastCV PK completely free?",
      a: language === "ur" 
        ? "جی ہاں! سادہ بائیو ڈیٹا اور طلباء کی سی وی بالکل مفت ہیں جن پر کوئی واٹر مارک نہیں آتا۔ کارپوریٹ اے ٹی ایس اور فری لانسر سی وی پر ہلکا واٹر مارک آتا ہے جسے آپ 199 روپے میں ہٹا سکتے ہیں۔" 
        : "Yes! Simple Biodata and Student CV templates are 100% free with no watermarks. ATS and Freelancer CVs are also free, but contain a tiny watermark at the bottom which you can remove for Rs. 199."
    },
    {
      q: language === "ur" ? "واٹر مارک کیا ہوتا ہے اور یہ کہاں نظر آتا ہے؟" : "What is a watermark and where does it appear?",
      a: language === "ur"
        ? "واٹر مارک صفحہ کے بالکل نیچے ہلکے رنگ کا چھوٹا سا لکھا ہوا متن ہوتا ہے جس پر 'Created free at FastCV.PK' درج ہوتا ہے۔ یہ پرنٹ میں مخل نہیں ہوتا۔"
        : "A watermark is a subtle, light gray text at the bottom center of the page saying: 'Created free at FastCV.PK'. It is very small and doesn't interfere with your CV details."
    },
    {
      q: language === "ur" ? "اے ٹی ایس (ATS) فرینڈلی سی وی کا کیا فائدہ ہے؟" : "What is the benefit of an ATS-friendly CV?",
      a: language === "ur"
        ? "اے ٹی ایس وہ خودکار سافٹ ویئر ہوتا ہے جسے بڑی کمپنیاں اور نوکری فراہم کرنے والے ادارے امیدواروں کی سی وی اسکین کرنے کے لیے استعمال کرتے ہیں۔ اے ٹی ایس فرینڈلی سی وی کے ذریعے آپ کی نوکری ملنے کے امکانات 80٪ تک بڑھ جاتے ہیں۔"
        : "ATS (Applicant Tracking System) is a software used by large employers in Pakistan and globally to parse CVs. An ATS friendly CV uses single-column layout, standard fonts, and job-specific keywords to pass scanner checks successfully."
    },
    {
      q: language === "ur" ? "کیا میں اردو بائیو ڈیٹا بھی بنا سکتا ہوں؟" : "Can I make an Urdu matrimonial Biodata?",
      a: language === "ur"
        ? "جی ہاں! سادہ بائیو ڈیٹا فارمیٹ خاص طور پر خوبصورت اردو نستعلیق رسم الخط میں تیار کیا جاتا ہے جو شادی (رشتے) اور جنرل نوکریوں کے لیے بے حد موزوں ہے۔"
        : "Yes! The Simple Biodata template is specifically styled with elegant Urdu Noto Nastaliq fonts, perfect for matrimonials (Rishta) and local general job applications."
    },
    {
      q: language === "ur" ? "میں پی ڈی ایف فائل کیسے ڈاؤن لوڈ کروں؟" : "How do I download the generated PDF?",
      a: language === "ur"
        ? "فارم مکمل کرنے کے بعد، جیسے ہی آپ 'Generate with AI' پر کلک کریں گے، سسٹم ایک منٹ میں سی وی تیار کر دے گا اور ڈاؤن لوڈ پیج پر آپ کو 'ڈاؤن لوڈ پی ڈی ایف' کا بٹن مل جائے گا جس پر کلک کرتے ہی فائل آپ کے فون یا کمپیوٹر میں محفوظ ہو جائے گی۔"
        : "After filling details and generating via AI, click the 'Download PDF' button. It renders instantly using client-side jsPDF in 300 DPI, saving the print-ready A4 directly to your device."
    },
    {
      q: language === "ur" ? "کیا اے آئی (AI) کے استعمال کی کوئی فیس ہے؟" : "Is there a charge to use the AI writer?",
      a: language === "ur"
        ? "نہیں! گوگل جیمنی اے آئی (Gemini AI) کے ذریعے آپ کے تجربے اور خوبیوں کو تفصیلاً لکھنا بالکل مفت ہے۔"
        : "No! Using our Google Gemini 2.0 AI generator to expand your job responsibilities, formulate professional objectives, and suggest skills is completely free across all formats."
    },
    {
      q: language === "ur" ? "پریمیم واٹر مارک ہٹانے کی ادائیگی کا طریقہ کار کیا ہے؟" : "How does the paid watermark-removal system work?",
      a: language === "ur"
        ? "آپ 199 روپے ہمارے بتائے گئے نیا پے (NayaPay) نمبر پر بھیجتے ہیں، اور ٹرانزیکشن کی رسید / آئی ڈی جمع کراتے ہیں۔ ایڈمن تصدیق کرتے ہی 24 گھنٹے کے اندر آپ کی ای میل پر صاف پی ڈی ایف بھیج دیتا ہے۔"
        : "You send Rs. 199 to our specified NayaPay account, submit the transaction receipt details in the builder, and our admin approves it in the backend. Once approved, the clean PDF is sent to your email via Resend."
    },
    {
      q: language === "ur" ? "کیا نوکری کے لیے اردو سی وی کارآمد ہے؟" : "Is an Urdu CV effective for formal job applications?",
      a: language === "ur"
        ? "زیادہ تر کارپوریٹ اور ملٹی نیشنل کمپنیوں میں انگریزی سی وی ہی مانی جاتی ہے کیونکہ ان کے سسٹمز اردو اسکین نہیں کر سکتے۔ تاہم لوکل، ہوم سروسز اور بائیو ڈیٹا کے لیے اردو سب سے بہترین ہے۔"
        : "For corporate, software, and international jobs, English is mandatory. For local general jobs (e.g. driver, receptionist, technician) and personal matrimonial profiles, Urdu is highly effective."
    },
    {
      q: language === "ur" ? "کیا میرا ڈیٹا محفوظ رہے گا؟" : "Is my personal data safe with FastCV PK?",
      a: language === "ur"
        ? "جی ہاں، آپ کا تمام ڈیٹا گوگل فائر بیس فائر اسٹور کے محفوظ ڈیٹا بیس میں اسٹور کیا جاتا ہے اور یہ کسی تیسرے فریق کے ساتھ شیئر نہیں کیا جاتا۔"
        : "Absolutely. We secure user submissions using Firestore encryption. We do not sell or share personal data to recruiters or third-party advertisements."
    },
    {
      q: language === "ur" ? "کیا میں موبائل فون پر بھی سی وی بنا سکتا ہوں؟" : "Can I create my resume using a mobile phone?",
      a: language === "ur"
        ? "جی ہاں! ہمارا بلڈر موبائل فرسٹ ڈیزائن پر بنایا گیا ہے۔ آپ باآسانی اپنے موبائل فون پر فارم بھر کر پی ڈی ایف ڈاؤن لوڈ کر سکتے ہیں۔"
        : "Yes! FastCV PK is built with responsive touch metrics and custom layouts so that you can fill details, interact with the AI editor, and print files seamlessly from any mobile browser."
    }
  ];

  // JSON-LD Structural SEO Markups
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://fastcvpk.online/#webapp",
        "url": "https://fastcvpk.online",
        "name": "FastCV PK",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "All",
        "browserRequirements": "Requires JavaScript. Requires HTML5.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "PKR"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://fastcvpk.online/#faq",
        "mainEntity": faqs.map((f, i) => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.a
          }
        }))
      }
    ]
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-start w-full relative overflow-hidden bg-[#0F172A]">
      
      {/* Dynamic SEO JSON-LD scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      <title>{language === "ur" ? "مفت آن لائن سی وی اور بائیو ڈیٹا میکر — FastCV PK" : "Free Online CV & Biodata Maker — FastCV PK"}</title>
      <meta name="description" content="Create print-ready, professional resumes and matrimonial Biodata online. Free ATS CV templates, Urdu Nastaliq styling, and custom AI content generation." />

      {/* Background neon glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Sparkle Tag */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-400 text-xs font-semibold mb-6 animate-pulse select-none">
          <Sparkles size={13} />
          {language === "ur" ? "پاکستان کا نمبر 1 فری سی وی میکر" : "PAKISTAN'S #1 FREE CV & BIODATA MAKER"}
        </div>

        {/* Major Headline */}
        <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight max-w-4xl tracking-tight">
          {language === "ur" ? (
            <span className="font-urdu leading-normal block">
              اپنا پروفیشنل <span className="bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">سی وی مفت</span> بنائیں
            </span>
          ) : (
            <span>
              Create Your <span className="bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">Professional CV</span> Free
            </span>
          )}
        </h1>

        {/* Subhead */}
        <p className="mt-6 text-sm sm:text-base text-textSecondary max-w-2xl leading-relaxed">
          {getTranslation("heroSubtitle", language)}
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap gap-4 justify-center items-center">
          <Link href="/create">
            <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-bold touch-btn px-8 py-3.5 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] btn-glow transition-all">
              {getTranslation("heroCTA1", language)}
              <ArrowRight size={16} />
            </button>
          </Link>
          <Link href="/templates">
            <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold touch-btn px-6 py-3.5 backdrop-blur-md transition-all">
              {getTranslation("heroCTA2", language)}
            </button>
          </Link>
        </div>

        {/* Premium Animated Pakistani CV Previews (High Fidelity) */}
        <div className="w-full max-w-5xl mt-16 relative">
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes floatCard1 {
              0%, 100% { transform: translateY(0px) rotate(-3deg); }
              50% { transform: translateY(-8px) rotate(-3deg); }
            }
            @keyframes floatCard2 {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-12px) rotate(0deg); }
            }
            @keyframes floatCard3 {
              0%, 100% { transform: translateY(0px) rotate(3deg); }
              50% { transform: translateY(-7px) rotate(3deg); }
            }
            .animate-float-1 {
              animation: floatCard1 3s ease-in-out infinite;
              will-change: transform;
            }
            .animate-float-2 {
              animation: floatCard2 4s ease-in-out infinite;
              will-change: transform;
            }
            .animate-float-3 {
              animation: floatCard3 5s ease-in-out infinite;
              will-change: transform;
            }
          `}} />

          {/* DESKTOP VIEW: 3 Cards side by side with GPU accelerated gentle floating and custom rotations */}
          <div className="hidden md:grid grid-cols-3 gap-8 relative z-10 select-none">
            
            {/* CARD 1 — Ayesha Malik (ATS CV) */}
            <div className="animate-float-1 w-full bg-white text-slate-800 rounded-xl shadow-[0_15px_40px_rgba(59,130,246,0.15)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.3)] border border-blue-500/10 hover:border-blue-500/30 p-5 text-left transition-all duration-300 relative font-inter aspect-[1/1.35] flex flex-col justify-between">
              {/* Blue accent indicator */}
              <div className="absolute left-0 top-0 w-1 h-full bg-[#3B82F6] rounded-l-xl" />
              
              <div>
                <div className="flex justify-between items-start mb-3 pl-1">
                  <div>
                    <h3 className="text-sm font-black tracking-tight text-slate-900 leading-none">
                      Ayesha Malik
                    </h3>
                    <p className="text-[7.5px] font-black uppercase tracking-widest text-[#3B82F6] mt-1">
                      Marketing Manager
                    </p>
                    <p className="text-[6.5px] font-semibold text-slate-400 mt-0.5">
                      Lahore • Unilever Pakistan
                    </p>
                  </div>
                  <span className="text-[5.5px] font-black uppercase text-blue-600 bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded tracking-wide shadow-sm">
                    ATS Friendly
                  </span>
                </div>

                {/* Profile Summary */}
                <div className="mb-3 pl-1">
                  <h4 className="text-[6px] font-black uppercase tracking-wider text-slate-400 mb-0.5 border-b border-slate-100 pb-0.5">
                    Executive Profile
                  </h4>
                  <p className="text-[7.5px] text-slate-500 leading-relaxed">
                    Innovative Marketing Manager with 4+ years of experience leading unilever digital campaigns. Proven record boosting organic web conversions and social reach.
                  </p>
                </div>

                {/* Experience */}
                <div className="mb-3 pl-1">
                  <h4 className="text-[6px] font-black uppercase tracking-wider text-slate-400 mb-1 border-b border-slate-100 pb-0.5">
                    Professional History
                  </h4>
                  <div>
                    <div className="flex justify-between items-baseline text-[7.5px] font-bold text-slate-800">
                      <span>Marketing Manager <span className="font-normal text-slate-400">at</span> Unilever</span>
                      <span className="text-slate-400 text-[6px] font-medium">2022 — Present</span>
                    </div>
                    <ul className="list-disc pl-3 text-[6.5px] text-slate-500 space-y-0.5 leading-relaxed mt-0.5">
                      <li>Led cross-functional SEO campaigns, raising web retention by 40%.</li>
                      <li>Optimized social media ad streams, driving organic conversions.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="pl-1">
                <h4 className="text-[6px] font-black uppercase tracking-wider text-slate-400 mb-1 border-b border-slate-100 pb-0.5">
                  Core Skills
                </h4>
                <div className="flex flex-wrap gap-1">
                  {["Digital Marketing", "SEO", "Social Media", "Canva"].map((skill, sIdx) => (
                    <span key={sIdx} className="bg-slate-50 border border-slate-200 text-slate-700 px-1.5 py-0.5 text-[6.5px] font-bold rounded tracking-wide shadow-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* CARD 2 — Ahmed Hassan (Student CV) */}
            <div className="animate-float-2 w-full bg-white text-slate-800 rounded-xl shadow-[0_15px_40px_rgba(16,185,129,0.15)] hover:shadow-[0_20px_50px_rgba(16,185,129,0.3)] border border-emerald-500/10 hover:border-emerald-500/30 p-5 text-left transition-all duration-300 relative font-inter aspect-[1/1.35] flex flex-col justify-between">
              {/* Green accent indicator */}
              <div className="absolute top-0 inset-x-0 h-1 bg-[#10B981] rounded-t-xl" />
              
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-sm font-black tracking-tight text-slate-900 leading-none">
                      Ahmed Hassan
                    </h3>
                    <p className="text-[7.5px] font-black uppercase tracking-widest text-[#10B981] mt-1">
                      CS Student
                    </p>
                    <p className="text-[6.5px] font-semibold text-slate-400 mt-0.5">
                      Karachi • FAST NUCES
                    </p>
                  </div>
                  <span className="text-[5.5px] font-black uppercase text-emerald-600 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded tracking-wide shadow-sm">
                    Student CV
                  </span>
                </div>

                {/* Profile Summary */}
                <div className="mb-3">
                  <h4 className="text-[6px] font-black uppercase tracking-wider text-slate-400 mb-0.5 border-b border-slate-100 pb-0.5">
                    Objective
                  </h4>
                  <p className="text-[7.5px] text-slate-500 leading-relaxed">
                    Motivated Computer Science student at FAST NUCES. Eager to apply algorithmic knowledge and design rich full-stack web applications.
                  </p>
                </div>

                {/* Education */}
                <div className="mb-3">
                  <h4 className="text-[6px] font-black uppercase tracking-wider text-slate-400 mb-1 border-b border-slate-100 pb-0.5">
                    Education
                  </h4>
                  <div>
                    <div className="flex justify-between items-baseline text-[7.5px] font-bold text-slate-800">
                      <span>BS Computer Science <span className="font-normal text-slate-400">at</span> FAST NUCES</span>
                      <span className="text-slate-400 text-[6px] font-medium">2023 — Present</span>
                    </div>
                    <ul className="list-disc pl-3 text-[6.5px] text-slate-500 space-y-0.5 leading-relaxed mt-0.5">
                      <li>Current CGPA: 3.8 / 4.0.</li>
                      <li>Completed advanced course structures in Algorithms and Web Engineering.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h4 className="text-[6px] font-black uppercase tracking-wider text-slate-400 mb-1 border-b border-slate-100 pb-0.5">
                  Expertise
                </h4>
                <div className="flex flex-wrap gap-1">
                  {["Python", "React", "Java"].map((skill, sIdx) => (
                    <span key={sIdx} className="bg-slate-50 border border-slate-200 text-slate-700 px-1.5 py-0.5 text-[6.5px] font-bold rounded tracking-wide shadow-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* CARD 3 — Usman Tariq (Global Pro Specialist) */}
            <div className="animate-float-3 w-full bg-white text-slate-800 rounded-xl shadow-[0_15px_40px_rgba(168,85,247,0.15)] hover:shadow-[0_20px_50px_rgba(168,85,247,0.3)] border border-purple-500/10 hover:border-purple-500/30 p-5 text-left transition-all duration-300 relative font-inter aspect-[1/1.35] flex flex-col justify-between">
              {/* Purple accent indicator */}
              <div className="absolute left-0 top-0 w-1 h-full bg-purple-600 rounded-l-xl" />
              
              <div>
                <div className="flex justify-between items-start mb-3 pl-1">
                  <div className="flex items-center gap-1.5">
                    {/* Circle Avatar placeholder */}
                    <div className="w-6 h-6 rounded-full bg-purple-100 border border-purple-200 text-purple-600 font-black text-[7.5px] flex items-center justify-center">
                      UT
                    </div>
                    <div>
                      <h3 className="text-[10px] font-black tracking-tight text-slate-900 leading-none">
                        Usman Tariq
                      </h3>
                      <p className="text-[6.5px] font-black uppercase tracking-widest text-purple-600 mt-0.5">
                        Senior Software Engineer
                      </p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-[5.5px] font-semibold text-slate-400">Islamabad • Systems Ltd</span>
                        <span className="text-[4.5px] font-bold text-purple-600 bg-purple-50 px-1 py-0.2 rounded">Remote</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-[5.5px] font-black uppercase text-purple-600 bg-purple-50 border border-purple-100 px-1.5 py-0.5 rounded tracking-wide shadow-sm">
                    Global Pro 🌍
                  </span>
                </div>

                {/* Profile Summary */}
                <div className="mb-3 pl-1">
                  <h4 className="text-[6px] font-black uppercase tracking-wider text-slate-400 mb-0.5 border-b border-slate-100 pb-0.5">
                    Summary
                  </h4>
                  <p className="text-[7.5px] text-slate-500 leading-relaxed">
                    Senior Software Engineer with 6+ years designing scalable AWS microservices, cloud Docker configurations, and dynamic React frontends.
                  </p>
                </div>

                {/* Experience */}
                <div className="mb-3 pl-1">
                  <h4 className="text-[6px] font-black uppercase tracking-wider text-slate-400 mb-1 border-b border-slate-100 pb-0.5">
                    Experience
                  </h4>
                  <div>
                    <div className="flex justify-between items-baseline text-[7.5px] font-bold text-slate-800">
                      <span>Senior Engineer <span className="font-normal text-slate-400">at</span> Systems Ltd</span>
                      <span className="text-slate-400 text-[6px] font-medium">2021 — Present</span>
                    </div>
                    <ul className="list-disc pl-3 text-[6.5px] text-slate-500 space-y-0.5 leading-relaxed mt-0.5">
                      <li>Architected remote Node API endpoints for global high-traffic clients.</li>
                      <li>Deployed clean Kubernetes/Docker stacks inside Amazon cloud networks.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="pl-1">
                <h4 className="text-[6px] font-black uppercase tracking-wider text-slate-400 mb-1 border-b border-slate-100 pb-0.5">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-1">
                  {["React", "Node.js", "AWS", "Docker"].map((skill, sIdx) => (
                    <span key={sIdx} className="bg-slate-50 border border-slate-200 text-slate-700 px-1.5 py-0.5 text-[6.5px] font-bold rounded tracking-wide shadow-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* MOBILE VIEW: Show 1 card at a time with smooth fade auto-cycling every 3 seconds */}
          <div className="md:hidden flex justify-center items-center h-[340px] relative w-full overflow-hidden select-none">
            
            {/* MOBILE CARD 1 */}
            <div className={`absolute transition-all duration-700 ease-in-out transform ${
              activeCardIdx === 0 
                ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" 
                : "opacity-0 scale-95 translate-y-4 pointer-events-none"
            } w-[260px] bg-white text-slate-800 rounded-xl shadow-[0_15px_40px_rgba(59,130,246,0.2)] border border-blue-500/10 p-5 text-left relative font-inter aspect-[1/1.35] flex flex-col justify-between`}>
              <div className="absolute left-0 top-0 w-1 h-full bg-[#3B82F6] rounded-l-xl" />
              <div>
                <div className="flex justify-between items-start mb-2 pl-1">
                  <div>
                    <h3 className="text-xs font-black tracking-tight text-slate-900 leading-none">Ayesha Malik</h3>
                    <p className="text-[6.5px] font-black uppercase tracking-widest text-[#3B82F6] mt-0.5">Marketing Manager</p>
                    <p className="text-[5.5px] text-slate-400">Lahore • Unilever Pakistan</p>
                  </div>
                  <span className="text-[5px] font-black uppercase text-blue-600 bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded">ATS Friendly</span>
                </div>
                <div className="mb-2 pl-1">
                  <p className="text-[7px] text-slate-500 leading-normal">
                    Innovative Marketing Manager with 4+ years of experience leading Unilever campaigns. Boosted organic web conversions by 40%.
                  </p>
                </div>
              </div>
              <div className="pl-1">
                <div className="flex flex-wrap gap-1">
                  {["Digital Marketing", "SEO", "Social"].map((skill, sIdx) => (
                    <span key={sIdx} className="bg-slate-50 border border-slate-200 text-slate-700 px-1.5 py-0.5 text-[5.5px] font-bold rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* MOBILE CARD 2 */}
            <div className={`absolute transition-all duration-700 ease-in-out transform ${
              activeCardIdx === 1 
                ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" 
                : "opacity-0 scale-95 translate-y-4 pointer-events-none"
            } w-[260px] bg-white text-slate-800 rounded-xl shadow-[0_15px_40px_rgba(16,185,129,0.2)] border border-emerald-500/10 p-5 text-left relative font-inter aspect-[1/1.35] flex flex-col justify-between`}>
              <div className="absolute top-0 inset-x-0 h-1 bg-[#10B981] rounded-t-xl" />
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xs font-black tracking-tight text-slate-900 leading-none">Ahmed Hassan</h3>
                    <p className="text-[6.5px] font-black uppercase tracking-widest text-[#10B981] mt-0.5">CS Student</p>
                    <p className="text-[5.5px] text-slate-400">Karachi • FAST NUCES</p>
                  </div>
                  <span className="text-[5px] font-black uppercase text-emerald-600 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded">Student CV</span>
                </div>
                <div className="mb-2">
                  <p className="text-[7px] text-slate-500 leading-normal">
                    BS CS student at FAST NUCES Karachi. Strong algorithmic foundation, current CGPA: 3.8/4.0. Eager to code full-stack applications.
                  </p>
                </div>
              </div>
              <div>
                <div className="flex flex-wrap gap-1">
                  {["Python", "React", "Java"].map((skill, sIdx) => (
                    <span key={sIdx} className="bg-slate-50 border border-slate-200 text-slate-700 px-1.5 py-0.5 text-[5.5px] font-bold rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* MOBILE CARD 3 */}
            <div className={`absolute transition-all duration-700 ease-in-out transform ${
              activeCardIdx === 2 
                ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" 
                : "opacity-0 scale-95 translate-y-4 pointer-events-none"
            } w-[260px] bg-white text-slate-800 rounded-xl shadow-[0_15px_40px_rgba(168,85,247,0.2)] border border-purple-500/10 p-5 text-left relative font-inter aspect-[1/1.35] flex flex-col justify-between`}>
              <div className="absolute left-0 top-0 w-1 h-full bg-purple-600 rounded-l-xl" />
              <div>
                <div className="flex justify-between items-start mb-2 pl-1">
                  <div className="flex items-center gap-1">
                    <div className="w-5 h-5 rounded-full bg-purple-100 border border-purple-200 text-purple-600 font-black text-[6.5px] flex items-center justify-center">UT</div>
                    <div>
                      <h3 className="text-[8.5px] font-black tracking-tight text-slate-900 leading-none">Usman Tariq</h3>
                      <p className="text-[5.5px] font-black uppercase tracking-widest text-purple-600 mt-0.5">Senior Engineer</p>
                    </div>
                  </div>
                  <span className="text-[5px] font-black uppercase text-purple-600 bg-purple-50 border border-purple-100 px-1.5 py-0.5 rounded">Global Pro 🌍</span>
                </div>
                <div className="mb-2 pl-1">
                  <p className="text-[7px] text-slate-500 leading-normal">
                    Senior Software Engineer with 6+ years architecture history. Specializes in scalable remote React/Node endpoints and Docker clouds.
                  </p>
                </div>
              </div>
              <div className="pl-1">
                <div className="flex flex-wrap gap-1">
                  {["React", "Node.js", "Docker"].map((skill, sIdx) => (
                    <span key={sIdx} className="bg-slate-50 border border-slate-200 text-slate-700 px-1.5 py-0.5 text-[5.5px] font-bold rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Dots Indicator for Mobile to visualize cycling */}
          <div className="flex md:hidden justify-center items-center gap-2 mt-2 select-none">
            {[0, 1, 2].map((idx) => (
              <button
                key={idx}
                onClick={() => setActiveCardIdx(idx)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  activeCardIdx === idx ? "bg-blue-500 w-3" : "bg-white/20"
                }`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* ================= STATS BAR ================= */}
      <section className="w-full bg-slate-950/60 border-y border-white/5 py-10 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="flex flex-col items-center justify-center p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                <Icon size={20} className="text-blue-400 mb-2" />
                <span className="text-xl sm:text-2xl font-black text-white tracking-wide">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm text-textSecondary mt-1 leading-relaxed">
                  {getTranslation(stat.labelKey, language)}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= CV TYPES SECTION ================= */}
      <section className="w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8 flex flex-col items-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white text-center tracking-tight">
          {getTranslation("selectCvTitle", language)}
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-textSecondary text-center max-w-xl leading-relaxed">
          {getTranslation("selectCvSub", language)}
        </p>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 w-full">
          {cvTypes.map((card) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.id}
                className={`rounded-2xl border ${card.border} bg-gradient-to-br ${card.color} p-8 flex flex-col justify-between hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                      <IconComponent size={24} className="text-blue-400" />
                    </div>
                    <span className="text-xs font-semibold text-textSecondary tracking-wider bg-white/5 px-2.5 py-1 rounded-full border border-white/10 uppercase font-inter">
                      {getTranslation(card.tagKey, language)}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mt-6 flex items-center gap-2">
                    {getTranslation(card.nameKey, language)}
                  </h3>

                  <div className="mt-3">
                    <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${
                      card.badgeVariant === "success" 
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    }`}>
                      {getTranslation(card.badgeKey, language)}
                    </span>
                  </div>

                  <p className="mt-4 text-xs sm:text-sm text-textSecondary leading-relaxed">
                    {getTranslation(card.descKey, language)}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5">
                  <Link href={`/create/${card.id}`}>
                    <button className="flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-wider">
                      {getTranslation("useThisTemplate", language)}
                      <ArrowRight size={13} />
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= HOW IT WORKS SECTION ================= */}
      <section className="w-full bg-slate-950/40 border-y border-white/5 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <h2 className={language === "ur" ? "text-3xl sm:text-4xl font-urdu text-white tracking-normal leading-relaxed" : "text-2xl sm:text-3xl font-extrabold text-white tracking-tight"}>
            {getTranslation("howItWorksTitle", language)}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 w-full">
            
            {/* Step 1 */}
            <div className="glass-panel rounded-xl p-8 flex flex-col items-center text-center relative">
              <div className="p-3 bg-blue-500/10 rounded-full border border-blue-500/20 text-blue-400 mb-4">
                <FileText size={22} />
              </div>
              <h3 className={language === "ur" ? "text-xl sm:text-2xl font-urdu text-white font-normal leading-loose" : "text-sm sm:text-base font-bold text-white uppercase tracking-wider"}>
                {getTranslation("step1Title", language)}
              </h3>
              <p className={language === "ur" ? "mt-4 text-base text-textSecondary leading-relaxed font-urdu" : "mt-2 text-xs text-textSecondary leading-relaxed"}>
                {getTranslation("step1Desc", language)}
              </p>
            </div>

            {/* Step 2 */}
            <div className="glass-panel rounded-xl p-8 flex flex-col items-center text-center relative border-blue-500/30">
              <div className="absolute top-[-10px] right-4 bg-blue-500 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded tracking-wide animate-pulse">
                AI Driven
              </div>
              <div className="p-3 bg-blue-500/10 rounded-full border border-blue-500/20 text-blue-400 mb-4">
                <Cpu size={22} />
              </div>
              <h3 className={language === "ur" ? "text-xl sm:text-2xl font-urdu text-white font-normal leading-loose" : "text-sm sm:text-base font-bold text-white uppercase tracking-wider"}>
                {getTranslation("step2Title", language)}
              </h3>
              <p className={language === "ur" ? "mt-4 text-base text-textSecondary leading-relaxed font-urdu" : "mt-2 text-xs text-textSecondary leading-relaxed"}>
                {getTranslation("step2Desc", language)}
              </p>
            </div>

            {/* Step 3 */}
            <div className="glass-panel rounded-xl p-8 flex flex-col items-center text-center relative">
              <div className="p-3 bg-blue-500/10 rounded-full border border-blue-500/20 text-blue-400 mb-4">
                <Download size={22} />
              </div>
              <h3 className={language === "ur" ? "text-xl sm:text-2xl font-urdu text-white font-normal leading-loose" : "text-sm sm:text-base font-bold text-white uppercase tracking-wider"}>
                {getTranslation("step3Title", language)}
              </h3>
              <p className={language === "ur" ? "mt-4 text-base text-textSecondary leading-relaxed font-urdu" : "mt-2 text-xs text-textSecondary leading-relaxed"}>
                {getTranslation("step3Desc", language)}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= WATERMARK EXPLANATION SECTION ================= */}
      <section className="w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {getTranslation("watermarkSectionTitle", language)}
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-textSecondary max-w-xl leading-relaxed">
          {getTranslation("watermarkSectionSub", language)}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 w-full">
          {/* Free Tier */}
          <div className="glass-panel rounded-2xl p-8 border-emerald-500/20 text-left flex flex-col justify-between">
            <div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                Type A - 100% Free
              </span>
              <h3 className="text-lg font-bold text-white mt-4">
                {language === "ur" ? "سادہ اور اسٹوڈنٹ ٹیمپلیٹس" : "Matrimonial Biodata & Student CVs"}
              </h3>
              <p className="mt-4 text-xs sm:text-sm text-textSecondary leading-relaxed">
                {getTranslation("watermarkTypeA", language)}
              </p>
              <ul className="mt-6 space-y-2 text-xs text-textSecondary">
                <li className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-emerald-400 flex-shrink-0" />
                  <span>{language === "ur" ? "کوئی پوشیدہ چارجز نہیں" : "No hidden charges"}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-emerald-400 flex-shrink-0" />
                  <span>{language === "ur" ? "پانی کا نشان (واٹر مارک) نہیں" : "No watermark text printed at the bottom"}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-emerald-400 flex-shrink-0" />
                  <span>{language === "ur" ? "لامحدود مرتبہ ڈاؤن لوڈ کریں" : "Unlimited downloads forever"}</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-8 pt-4 border-t border-white/5">
              <Link href="/create">
                <button className="w-full text-center rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold touch-btn px-6 py-2.5 transition-colors">
                  {language === "ur" ? "مفت شروع کریں" : "Create Free CV"}
                </button>
              </Link>
            </div>
          </div>

          {/* Premium Tier */}
          <div className="glass-panel rounded-2xl p-8 border-blue-500/30 text-left flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-500/5 pointer-events-none" />
            <div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20">
                Type B - Premium Option
              </span>
              <h3 className="text-lg font-bold text-white mt-4">
                {language === "ur" ? "کارپوریٹ اے ٹی ایس اور فری لانسر" : "Corporate ATS & Freelancer templates"}
              </h3>
              <p className="mt-4 text-xs sm:text-sm text-textSecondary leading-relaxed">
                {getTranslation("watermarkTypeB", language)}
              </p>
              <ul className="mt-6 space-y-2 text-xs text-textSecondary">
                <li className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-blue-400 flex-shrink-0" />
                  <span>{language === "ur" ? "اے ٹی ایس اسکین پاس کریں" : "100% compliant with scanner keywords"}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-blue-400 flex-shrink-0" />
                  <span>{language === "ur" ? "مفت ڈاؤن لوڈ (واٹر مارک کے ساتھ)" : "Free export available with small bottom note"}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-blue-400 flex-shrink-0" />
                  <span>{language === "ur" ? "صرف 199 روپے میں واٹر مارک ہٹائیں" : "Remove watermark for a tiny one-time fee of Rs. 199"}</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-white/5">
              <Link href="/create">
                <button className="w-full text-center rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold touch-btn px-6 py-2.5 transition-colors shadow-lg shadow-blue-500/20">
                  {getTranslation("watermarkCTA", language)}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="w-full bg-slate-950/60 border-t border-white/5 py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <HelpCircle size={32} className="text-blue-400 mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {getTranslation("faqTitle", language)}
            </h2>
          </div>

          <div className="mt-12 space-y-4">
            {faqs.map((faq, index) => {
              const active = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-white/5 bg-white/5 overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaq(active ? null : index)}
                    className="w-full text-left flex items-center justify-between px-6 py-4 font-semibold text-white focus:outline-none hover:bg-white/5 transition-colors touch-btn"
                  >
                    <span className={language === "ur" ? "font-urdu text-right w-full" : "font-inter text-left"}>
                      {faq.q}
                    </span>
                    <span className="ml-4 text-blue-400 text-xl font-bold flex-shrink-0">
                      {active ? "-" : "+"}
                    </span>
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      active ? "max-h-[300px] border-t border-white/5 p-6" : "max-h-0 overflow-hidden"
                    }`}
                  >
                    <p className={`text-xs sm:text-sm text-textSecondary leading-relaxed ${language === "ur" ? "font-urdu text-right" : "font-inter text-left"}`}>
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
