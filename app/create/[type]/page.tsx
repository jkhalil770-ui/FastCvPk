"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { getTranslation } from "@/lib/translations";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useToast } from "@/components/ui/Toast";
import Button from "@/components/ui/Button";

// Import forms
import ATSForm from "@/components/cv-forms/ATSForm";
import BiodataForm from "@/components/cv-forms/BiodataForm";
import StudentForm from "@/components/cv-forms/StudentForm";
import FreelancerForm from "@/components/cv-forms/FreelancerForm";
import GlobalProForm from "@/components/cv-forms/GlobalProForm";

// Import templates
import ATSTemplate from "@/components/cv-templates/ATSTemplate";
import BiodataTemplate from "@/components/cv-templates/BiodataTemplate";
import StudentTemplate from "@/components/cv-templates/StudentTemplate";
import FreelancerTemplate from "@/components/cv-templates/FreelancerTemplate";
import GlobalProTemplate from "@/components/cv-templates/GlobalProTemplate";

import { ArrowLeft, ArrowRight, Sparkles, Eye, Edit3, HelpCircle } from "lucide-react";

/**
 * Main CV Builder wizard page. Supports ATS, Biodata, Student, and Freelancer categories.
 */
export default function CVBuilderPage() {
  const router = useRouter();
  const { type } = useParams();
  const { language } = useLanguage();
  const { toast } = useToast();

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [step, setStep] = useState(1);
  const [activeTab, setActiveTab] = useState<"form" | "preview">("form");
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiProgress, setAiProgress] = useState(0);
  const [aiStatusMessage, setAiStatusMessage] = useState("");

  // Determine standard watermarking rule
  // TYPE A (biodata, student) has NO watermark. TYPE B (ats, freelancer) has watermark by default.
  const isTypeA = type === "biodata" || type === "student";
  const defaultWatermark = !isTypeA;

  // Initialize unified data record
  const [formData, setFormData] = useState<any>({
    personalInfo: {
      fullName: "",
      fatherName: "",
      dob: "",
      cnic: "",
      religion: "",
      city: "",
      address: "",
      phone: "",
      email: "",
      profTitle: "",
      linkedin: "",
      portfolio: "",
      github: "",
      schoolName: "",
      classProgram: "",
      languageChoice: "en", // For student choices
      studentEducation: "",
    },
    experience: [
      { id: "1", company: "", jobTitle: "", fromDate: "", toDate: "", currentlyWorking: false, responsibilities: "", expandedResponsibilities: [] }
    ],
    education: [
      { id: "1", degreeName: "", institution: "", year: "", grade: "" }
    ],
    biodataEducation: {
      matric: { board: "", year: "", marks: "" },
      inter: { board: "", year: "", marks: "" },
      graduation: { university: "", year: "", cgpa: "" },
      masters: { university: "", year: "", cgpa: "" }
    },
    projects: [
      { id: "1", projectName: "", projDesc: "", projUrl: "", resultsAchieved: "", expandedBulletPoints: [] }
    ],
    internships: [
      { id: "1", company: "", role: "", duration: "", details: "", expandedDetails: [] }
    ],
    skills: {
      techSkills: [],
      techSkillsRaw: "",
      softSkills: [],
      softSkillsRaw: "",
      languages: [],
      languagesRaw: "",
      certifications: [],
      services: [],
      servicesRaw: "",
      techStack: [],
      techStackRaw: "",
      softSkillsFreelancer: [],
      studentExtra: "",
    },
    biodataReferences: [
      { name: "", relation: "", phone: "" },
      { name: "", relation: "", phone: "" }
    ]
  });

  // Load Firebase auth state and trigger anonymous login fallback for guests
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      setCurrentUser(usr);
      if (usr) {
        if (usr.email) {
          // Optimistically prefill basic user details
          setFormData((prev: any) => ({
            ...prev,
            personalInfo: {
              ...prev.personalInfo,
              fullName: prev.personalInfo.fullName || usr.displayName || "",
              email: prev.personalInfo.email || usr.email || "",
            }
          }));
        }
      } else {
        // Log in anonymously as a guest to satisfy Firestore rules
        signInAnonymously(auth).catch((err) => {
          console.warn("Anonymous auth attempt skipped or failed:", err);
        });
      }
    });
    return () => unsubscribe();
  }, []);

  // Date and duration comparison helpers for step validation
  const parseMonthYearToDateValue = (monthYearStr: string) => {
    if (!monthYearStr) return 0;
    if (monthYearStr === "Present") return Infinity;
    
    const parts = monthYearStr.trim().split(" ");
    const monthStr = parts[0] || "";
    const yearStr = parts[1] || "";
    
    const year = parseInt(yearStr, 10);
    if (isNaN(year)) return 0;
    
    const monthsMap: { [key: string]: number } = {
      Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
      Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12
    };
    
    const month = monthsMap[monthStr] || 1;
    return year * 100 + month;
  };

  const parseYearToValue = (yearStr: string) => {
    if (!yearStr) return 0;
    if (yearStr === "Present") return Infinity;
    const year = parseInt(yearStr.trim(), 10);
    return isNaN(year) ? 0 : year;
  };

  // Validation before step forwarding
  const handleNextStep = () => {
    if (step === 1) {
      if (!formData.personalInfo.fullName || !formData.personalInfo.phone || !formData.personalInfo.city) {
        toast(
          language === "ur" ? "تفصیلات ادھوری ہیں!" : "Incomplete Information",
          "warning",
          language === "ur" ? "براہ کرم اپنا نام، فون اور شہر ضرور لکھیں۔" : "Name, Phone number, and City are required to proceed."
        );
        return;
      }
      if (type === "global-pro" && !formData.personalInfo.linkedin) {
        toast(
          language === "ur" ? "لنکڈ ان یو آر ایل لازمی ہے!" : "LinkedIn Required",
          "warning",
          language === "ur" ? "گلوبل پرو سی وی کے لیے لنکڈ ان پروفائل لازمی ہے۔" : "LinkedIn Profile URL is required for Global Pro CV."
        );
        return;
      }
    }

    if (step === 2) {
      // 1. Work Experience dates validation for ATS, Global Pro, and Freelancer
      if (type === "ats" || type === "global-pro" || type === "freelancer") {
        const experience = formData.experience || [];
        for (let i = 0; i < experience.length; i++) {
          const exp = experience[i];
          if (exp.company || exp.jobTitle) {
            if (!exp.fromDate || !exp.toDate) {
              toast(
                language === "ur" ? "تاریخ درج کریں!" : "Dates Required",
                "warning",
                language === "ur" ? "براہ کرم ملازمت شروع کرنے اور ختم ہونے کی تاریخ منتخب کریں۔" : "Please select both Start Date and End Date for your experience."
              );
              return;
            }
            
            const fromVal = parseMonthYearToDateValue(exp.fromDate);
            const toVal = parseMonthYearToDateValue(exp.toDate);
            
            if (fromVal > toVal) {
              toast(
                language === "ur" ? "شروع کی تاریخ ختم ہونے کی تاریخ سے پہلے ہونی چاہیے!" : "Start date must be before end date!",
                "warning",
                language === "ur" ? "ملازمت شروع ہونے کا سال اور مہینہ ختم ہونے کے وقت سے پہلے ہونا چاہئے۔" : "The job start date cannot be after the end date."
              );
              return;
            }
          }
        }
      }

      // 2. Student CV Internship duration validation
      if (type === "student") {
        const internships = formData.internships || [];
        for (let i = 0; i < internships.length; i++) {
          const intern = internships[i];
          if (intern.company || intern.role) {
            if (!intern.duration) {
              toast(
                language === "ur" ? "مدت منتخب کریں!" : "Duration Required",
                "warning",
                language === "ur" ? "براہ کرم انٹرنشپ شروع اور ختم ہونے کا سال منتخب کریں۔" : "Please select start and end years for your internship."
              );
              return;
            }

            const parts = intern.duration.split(" - ");
            const fromYearStr = parts[0] || "";
            const toYearStr = parts[1] || "";

            if (!fromYearStr || (!toYearStr && intern.duration !== "Present" && !intern.duration.includes("Present"))) {
              toast(
                language === "ur" ? "سال منتخب کریں!" : "Select Years",
                "warning",
                language === "ur" ? "براہ کرم انٹرنشپ شروع اور ختم ہونے کا سال منتخب کریں۔" : "Please select start and end years."
              );
              return;
            }

            const fromVal = parseYearToValue(fromYearStr);
            const toVal = parseYearToValue(toYearStr || (intern.duration.includes("Present") ? "Present" : ""));

            if (fromVal > toVal) {
              toast(
                language === "ur" ? "شروع کی تاریخ ختم ہونے کی تاریخ سے پہلے ہونی چاہیے!" : "Start date must be before end date!",
                "warning",
                language === "ur" ? "انٹرنشپ شروع ہونے کا سال ختم ہونے کے سال سے پہلے ہونا چاہئے۔" : "The internship start year cannot be after the end year."
              );
              return;
            }
          }
        }
      }
    }

    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  // ─── Fallback professional summaries when Gemini is unavailable ───────────
  const getFallbackSummary = (jobTitle: string, isStudent: boolean, lang: string): string => {
    const name = formData.personalInfo.fullName || "";
    const city = formData.personalInfo.city || "Pakistan";
    const yearsExp = formData.personalInfo.yearsOfExp || "3";
    const timezone = formData.personalInfo.timeZone || "PKT";
    const skills = [...formData.skills.techSkills, ...formData.skills.softSkills].slice(0, 5).join(", ");

    if (lang === "ur") {
      if (isStudent) {
        return `میں ایک محنتی اور پرجوش طالب علم ہوں جو ${jobTitle || "اپنے شعبے"} میں اعلیٰ تعلیم حاصل کر رہا ہوں۔ میں ${city} سے ہوں اور اپنے کیریئر کے آغاز کے لیے کسی اچھے ادارے میں اپنی صلاحیتیں استعمال کرنا چاہتا ہوں۔`;
      }
      return `میں ایک تجربہ کار ${jobTitle || "پیشہ ور"} ہوں جو ${city} میں کام کر رہا ہوں۔ میری مہارتیں ${skills || "مختلف شعبوں"} میں ہیں اور میں اپنی ٹیم کو بہترین نتائج دینے کے لیے ہمیشہ تیار رہتا ہوں۔`;
    }

    // Remote / International or Global Pro
    if (type === "global-pro") {
      return `${jobTitle || "Remote Specialist"} with ${yearsExp} years experience collaborating with international clients. Built remote workflow systems from ${city} and maintained 100% task delivery rates. Flexible across different time zones including ${timezone}, delivering high-impact business outcomes.`;
    }

    // Fresh Graduate / Student
    if (isStudent) {
      return `Eager and driven student from ${city} with academic achievements including top-tier GPA and multiple web projects. Completed internship at top local tech hub and worked on full-stack application development. Keen to learn and contribute to a fast-growing team.`;
    }

    // Tech Roles
    const lowerTitle = (jobTitle || "").toLowerCase();
    const isTech = lowerTitle.includes("software") || lowerTitle.includes("engineer") || lowerTitle.includes("developer") || lowerTitle.includes("designer") || lowerTitle.includes("programmer") || lowerTitle.includes("coder") || lowerTitle.includes("ai") || lowerTitle.includes("tech") || lowerTitle.includes("data");
    if (isTech) {
      return `${jobTitle || "Software Engineer"} with ${yearsExp} years building high-performance web systems in ${skills || "React and Node.js"}. Cut application response times by 40% and served 20,000+ daily active users. Seeking a remote or hybrid role to build meaningful products.`;
    }

    // Business Roles (or fallback default)
    return `${jobTitle || "Business Specialist"} with ${yearsExp} years leading operations and driving customer success. Managed 8-member project groups to increase annual conversion rates by 25%. Focused on building strong client relationships and optimizing team productivity.`;
  };

  // Main CV Generation Handler — works WITH or WITHOUT Gemini AI
  const handleAIGenerate = async () => {
    setAiGenerating(true);
    setAiProgress(5);
    setAiStatusMessage(language === "ur" ? "تفصیلات کی جانچ ہو رہی ہے..." : "Analyzing your details...");

    const isStudent = type === "student";
    const cvLang = type === "biodata" ? "ur" : (formData.personalInfo.languageChoice || "en");
    const title = formData.personalInfo.profTitle || (isStudent ? formData.personalInfo.classProgram : "Professional");
    const skillsArray = [...formData.skills.techSkills, ...formData.skills.softSkills];

    let summaryText = "";
    let aiUsed = false;

    // ── Step 1: Try Gemini AI (non-blocking, graceful fallback) ──────────────
    try {
      setAiProgress(25);
      setAiStatusMessage(language === "ur" ? "اے آئی سے رابطہ کیا جا رہا ہے..." : "Connecting to Gemini AI...");

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000); // 12s timeout

      const aiRes = await fetch("/api/generate-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          action: "summary",
          title,
          details: type === "global-pro" ? "Optimized for international and remote job markets." : "Experienced professional in Pakistani job market.",
          skills: skillsArray,
          isStudent,
          lang: cvLang,
          cvType: type,
        }),
      });
      clearTimeout(timeoutId);

      const aiData = await aiRes.json();

      if (aiRes.ok && !aiData.error) {
        summaryText = aiData.professionalSummary || aiData.careerObjective || "";
        aiUsed = true;
        setAiProgress(65);
        setAiStatusMessage(language === "ur" ? "اے آئی نے خلاصہ تیار کر دیا!" : "AI summary generated!");
      } else {
        // AI failed — use fallback silently
        console.warn("Gemini unavailable, using fallback:", aiData.error);
        summaryText = getFallbackSummary(title, isStudent, cvLang);
        setAiProgress(65);
        setAiStatusMessage(language === "ur" ? "پیشہ ورانہ خلاصہ تیار ہو رہا ہے..." : "Building your professional summary...");
      }
    } catch (aiErr: any) {
      // Timeout / network — use fallback silently
      console.warn("Gemini timeout/error, using fallback:", aiErr.message);
      summaryText = getFallbackSummary(title, isStudent, cvLang);
      setAiProgress(65);
      setAiStatusMessage(language === "ur" ? "خلاصہ تیار کیا جا رہا ہے..." : "Preparing your summary...");
    }

    // ── Step 2: Build CV data ─────────────────────────────────────────────────
    setAiProgress(75);
    setAiStatusMessage(language === "ur" ? "سی وی ڈیٹا مرتب کیا جا رہا ہے..." : "Compiling your CV data...");

    const updatedData = {
      ...formData,
      generatedSummary: summaryText,
      generatedObjective: summaryText,
    };
    setFormData(updatedData);

    // ── Step 3: Save to Firestore ─────────────────────────────────────────────
    setAiProgress(88);
    setAiStatusMessage(language === "ur" ? "ڈیٹا بیس میں محفوظ کیا جا رہا ہے..." : "Saving to database...");

    const cvId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const cvData = {
      id: cvId,
      userId: currentUser?.uid || null,
      sessionId: "session-" + Math.random().toString(36).substring(7),
      cvType: type,
      language: cvLang,
      templateId: "default",
      formData: updatedData.personalInfo,
      generatedContent: {
        summary: summaryText,
        experience: updatedData.experience,
        education: updatedData.education,
        biodataEducation: updatedData.biodataEducation,
        projects: updatedData.projects,
        internships: updatedData.internships,
        skills: updatedData.skills,
        biodataReferences: updatedData.biodataReferences,
      },
      hasWatermark: defaultWatermark,
      aiGenerated: aiUsed,
      downloadCount: 0,
      createdAt: new Date(),
    };

    try {
      const cvRef = doc(db, "cvs", cvId);
      await setDoc(cvRef, cvData);
    } catch (firestoreErr: any) {
      console.warn("Firestore save failed (non-critical):", firestoreErr.message);
      // Continue — user can still download even without Firestore save
    }

    // --- FALLBACK: Save to sessionStorage so download page can read it even if Firestore fails ---
    try {
      sessionStorage.setItem(`cv_${cvId}`, JSON.stringify(cvData));
    } catch (e) {
      console.error("Failed to save to sessionStorage", e);
    }

    // ── Step 4: Success ───────────────────────────────────────────────────────
    setAiProgress(100);
    toast(
      language === "ur" ? "سی وی تیار ہو گئی! ✓" : "CV Created Successfully! ✓",
      "success",
      language === "ur"
        ? "ڈاؤن لوڈ پیج پر منتقل ہو رہے ہیں..."
        : aiUsed
          ? "AI-powered CV ready. Redirecting to download..."
          : "CV ready. Redirecting to download..."
    );

    setTimeout(() => {
      router.push(`/download/${cvId}`);
    }, 700);
  };

  // Switch layouts according to path type with localized error boundary catch
  const renderForm = () => {
    try {
      if (step === 4) {
        const isUrdu = language === "ur";
        return (
          <div className="space-y-8 text-center py-6 px-4 animate-in fade-in zoom-in-95 duration-700 relative overflow-hidden rounded-2xl select-none">
            {/* Neon background light */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-transparent pointer-events-none" />
            
            {/* Animated Glowing Branding Mark */}
            <div className="relative mx-auto w-20 h-20 flex items-center justify-center mb-2">
              <div className="absolute inset-0 rounded-full border border-blue-500/20 border-t-blue-500 animate-spin" style={{ animationDuration: "4s" }} />
              <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group">
                <Sparkles className="text-white w-8 h-8 animate-pulse" />
              </div>
              {/* Pulsating Ring */}
              <span className="absolute inset-0 rounded-full bg-blue-500/10 animate-ping" style={{ animationDuration: "2.5s" }} />
            </div>

            {/* Premium Headline */}
            <div className="space-y-2 relative z-10">
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight bg-gradient-to-r from-blue-400 via-indigo-200 to-blue-400 bg-clip-text text-transparent uppercase font-inter">
                {isUrdu ? "فائنل ریویو اور ڈاؤن لوڈ" : "Final Review & Polish"}
              </h3>
              <p className="text-xs text-textSecondary max-w-sm mx-auto leading-relaxed">
                {isUrdu 
                  ? "آپ کی درج کردہ معلومات لائیو پری ویو میں دکھائی دے رہی ہیں۔ اب فائنل اے آئی پولش کرنے کا وقت ہے۔"
                  : "Your details have been mapped. Review the document layout on the right and proceed to final AI optimization."
                }
              </p>
            </div>

            {/* Premium Features List */}
            <div className="grid grid-cols-1 gap-3 max-w-sm mx-auto text-left relative z-10">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/20 transition-all duration-300">
                <span className="text-blue-400 text-sm">🪄</span>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">{isUrdu ? "گوگل جیمنی اے آئی" : "Google Gemini 2.0 AI"}</h4>
                  <p className="text-[10px] text-textSecondary leading-normal">{isUrdu ? "آپ کی سی وی کو جدید الفاظ اور پیشہ ورانہ مہارتوں سے سجائے گا۔" : "Polishes responsibilities with active verbs & metrics."}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/20 transition-all duration-300">
                <span className="text-blue-400 text-sm">🛡️</span>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">{isUrdu ? "اے ٹی ایس مطابقت" : "ATS-Compliant Structure"}</h4>
                  <p className="text-[10px] text-textSecondary leading-normal">{isUrdu ? "بین الاقوامی کمپنیوں اور اسکینرز کے لیے مکمل موزوں فارمیٹ۔" : "Optimized layout ensuring highest parsing score."}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/20 transition-all duration-300">
                <span className="text-blue-400 text-sm">⚡</span>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">{isUrdu ? "پرنٹ کے لیے تیار پی ڈی ایف" : "Print-Ready 300 DPI PDF"}</h4>
                  <p className="text-[10px] text-textSecondary leading-normal">{isUrdu ? "ہائی ریزولوشن اے 4 فارمیٹ میں فوری اور مفت ڈاؤن لوڈ۔" : "HD standard vector layout for crisp paper printouts."}</p>
                </div>
              </div>
            </div>

            {/* Thank You Note (Styled Premium) */}
            <div className="border-t border-white/5 pt-4 text-center space-y-1 max-w-xs mx-auto relative z-10">
              <span className="text-[8px] font-black uppercase text-blue-400 tracking-widest font-inter">Thank you for using</span>
              <h5 className="text-sm font-black text-white uppercase tracking-wider bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent font-inter">
                FastCV.PK
              </h5>
              <p className="text-[9px] text-white/30 italic">
                "Crafting careers, one professional document at a time."
              </p>
            </div>
          </div>
        );
      }

      switch (type) {
        case "ats":
          return <ATSForm formData={formData} setFormData={setFormData} step={step} />;
        case "biodata":
          return <BiodataForm formData={formData} setFormData={setFormData} step={step} />;
        case "student":
          return <StudentForm formData={formData} setFormData={setFormData} step={step} />;
        case "freelancer":
          return <FreelancerForm formData={formData} setFormData={setFormData} step={step} />;
        case "global-pro":
          return <GlobalProForm formData={formData} setFormData={setFormData} step={step} />;
        default:
          return <div className="text-white">Template Form Not Found.</div>;
      }
    } catch (err) {
      console.error("Local Form render crash catch:", err);
      return (
        <div className="p-6 bg-red-950/20 border border-red-500/20 text-red-200 rounded-2xl text-center space-y-2">
          <p className="text-xs font-bold font-inter">⚠️ CV Form Rendering Exception Catch</p>
          <p className="text-[10px] text-textSecondary">Kuch ghalat ho gaya. Please refresh or reset details to proceed.</p>
        </div>
      );
    }
  };

  const renderTemplate = () => {
    try {
      // Pack current data
      const templateData = {
        personalInfo: formData.personalInfo,
        experience: formData.experience,
        education: formData.education,
        biodataEducation: formData.biodataEducation,
        projects: formData.projects,
        internships: formData.internships,
        skills: formData.skills,
        biodataReferences: formData.biodataReferences,
        generatedSummary: formData.generatedSummary,
        generatedObjective: formData.generatedObjective
      };

      switch (type) {
        case "ats":
          return <ATSTemplate data={templateData} hasWatermark={defaultWatermark} />;
        case "biodata":
          return <BiodataTemplate data={templateData} hasWatermark={false} />;
        case "student":
          return <StudentTemplate data={templateData} hasWatermark={false} />;
        case "freelancer":
          return <FreelancerTemplate data={templateData} hasWatermark={defaultWatermark} />;
        case "global-pro":
          return <GlobalProTemplate data={templateData} hasWatermark={defaultWatermark} />;
        default:
          return <div className="text-slate-800">Visual template load error.</div>;
      }
    } catch (err) {
      console.error("Local Template render crash catch:", err);
      return (
        <div className="p-8 bg-white border border-red-200 text-red-800 rounded-xl text-center space-y-2 max-w-sm">
          <p className="text-xs font-bold font-inter">⚠️ Preview Render Error</p>
          <p className="text-[10px] text-slate-500">Failed to render live document canvas. Verify fields are complete.</p>
        </div>
      );
    }
  };

  const isUrduCV = type === "biodata" || (type === "student" && formData.personalInfo.languageChoice === "ur");

  return (
    <div className="flex-1 w-full bg-[#0F172A] relative flex flex-col justify-start overflow-x-hidden">
      
      {/* Top Wizard Steps Bar */}
      <div className="w-full border-b border-white/5 bg-slate-950/40 py-4 px-4 sm:px-8">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/create" className="inline-flex items-center gap-1 text-xs text-textSecondary hover:text-white transition-colors self-start sm:self-auto">
            <ArrowLeft size={13} />
            {language === "ur" ? "پیچھے جائیں" : "Selection"}
          </Link>
          
          {/* Responsive Progress Steps Container */}
          <div className="flex flex-col items-center w-full sm:w-auto">
            {/* Mobile View (below md Breakpoint) */}
            <div className="md:hidden flex flex-col items-center w-full select-none">
              <div className="flex items-center justify-center gap-1 min-[360px]:gap-2">
                {[1, 2, 3, 4].map((sIdx) => {
                  const isActive = step === sIdx;
                  const isCompleted = step > sIdx;
                  return (
                    <React.Fragment key={sIdx}>
                      {sIdx > 1 && (
                        <div className="flex gap-0.5 items-center px-1">
                          <span className={`w-1 h-1 rounded-full ${step >= sIdx ? "bg-blue-500" : "bg-white/20"}`} />
                          <span className={`w-1 h-1 rounded-full ${step >= sIdx ? "bg-blue-500" : "bg-white/20"}`} />
                          <span className={`w-1 h-1 rounded-full ${step >= sIdx ? "bg-blue-500" : "bg-white/20"}`} />
                        </div>
                      )}
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black transition-all duration-300 ${
                          isActive
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-110"
                            : isCompleted
                            ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                            : "bg-white/5 text-textSecondary border border-white/5"
                        }`}
                      >
                        {isCompleted ? "✓" : sIdx}
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
              <div className="mt-2 text-[10px] font-black uppercase text-blue-400 tracking-widest animate-pulse">
                {step === 1 && getTranslation("personalInfo", language)}
                {step === 2 && getTranslation("experienceEducation", language)}
                {step === 3 && getTranslation("skillsDetails", language)}
                {step === 4 && getTranslation("previewDownload", language)}
              </div>
            </div>

            {/* Desktop View (md and above) */}
            <div className="hidden md:flex items-center gap-3 text-xs font-bold select-none">
              {[1, 2, 3, 4].map((sIdx) => {
                const isActive = step === sIdx;
                const isCompleted = step > sIdx;
                let stepLabel = "";
                if (sIdx === 1) stepLabel = getTranslation("personalInfo", language);
                if (sIdx === 2) stepLabel = getTranslation("experienceEducation", language);
                if (sIdx === 3) stepLabel = getTranslation("skillsDetails", language);
                if (sIdx === 4) stepLabel = getTranslation("previewDownload", language);

                return (
                  <React.Fragment key={sIdx}>
                    {sIdx > 1 && (
                      <span className={`w-6 h-[2px] rounded transition-colors duration-300 ${step >= sIdx ? "bg-blue-500/50" : "bg-white/10"}`} />
                    )}
                    <span
                      className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all duration-500 border ${
                        isActive
                          ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20 scale-105"
                          : isCompleted
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                          : "bg-white/5 border-transparent text-textSecondary"
                      }`}
                    >
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black ${
                        isActive ? "bg-white text-blue-600" : isCompleted ? "bg-emerald-400 text-emerald-950" : "bg-white/10"
                      }`}>
                        {isCompleted ? "✓" : sIdx}
                      </span>
                      {stepLabel}
                    </span>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Primary Builder Area (split column) */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 py-4 sm:py-8 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-4 md:gap-8 relative overflow-x-hidden">
        
        {/* Mobile Tab switchers */}
        <div className="md:hidden flex items-center justify-center bg-slate-900 border border-white/5 p-1 rounded-xl mb-2 w-full select-none">
          <button
            onClick={() => setActiveTab("form")}
            className={`flex-1 flex justify-center items-center gap-1.5 py-2.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "form" ? "bg-blue-600 text-white shadow-lg" : "text-textSecondary"
            }`}
          >
            <Edit3 size={14} />
            {getTranslation("switchTabForm", language)}
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`flex-1 flex justify-center items-center gap-1.5 py-2.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === "preview" ? "bg-blue-600 text-white shadow-lg" : "text-textSecondary"
            }`}
          >
            <Eye size={14} />
            {getTranslation("switchTabPreview", language)}
          </button>
        </div>
 
        {/* LEFT COLUMN: Input Form Panel */}
        <div className={`w-full md:w-1/2 flex flex-col gap-6 ${activeTab === "form" ? "block" : "hidden md:flex"}`}>
          <div className="glass-panel p-4 sm:p-6 rounded-2xl border-white/10 flex-1 flex flex-col justify-between w-full max-w-full">
            <div className="w-full max-w-full overflow-x-hidden">
              {/* Form loader */}
              {renderForm()}
            </div>
 
            {/* Form footer controls */}
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
              {step > 1 ? (
                <Button variant="secondary" onClick={handlePrevStep} className="gap-1 px-4 py-2 touch-btn">
                  <ArrowLeft size={14} />
                  {getTranslation("prevStep", language)}
                </Button>
              ) : (
                <div />
              )}
 
              {step < 4 ? (
                <Button onClick={handleNextStep} className="gap-1 px-5 py-2 touch-btn">
                  {getTranslation("nextStep", language)}
                  <ArrowRight size={14} />
                </Button>
              ) : (
                <Button
                  onClick={handleAIGenerate}
                  className="gap-1.5 px-6 py-2.5 touch-btn bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold"
                  isLoading={aiGenerating}
                >
                  <Sparkles size={15} />
                  {getTranslation("generateAICV", language)}
                </Button>
              )}
            </div>
          </div>
        </div>
 
        {/* RIGHT COLUMN: Live Print preview */}
        <div className={`w-full md:w-1/2 flex flex-col items-center ${activeTab === "preview" ? "block" : "hidden md:flex"}`}>
          <div className="sticky top-24 w-full flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-3 text-xs text-textSecondary px-1">
              <span className="font-semibold">{getTranslation("livePreview", language)}</span>
              {defaultWatermark && (
                <span className="text-[10px] text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded font-bold uppercase tracking-wide">
                  Watermarked Free Tier
                </span>
              )}
            </div>
 
            {/* Transform scaling wrapper to center and shrink standard A4 preview container */}
            <div className="w-full border border-white/5 bg-slate-900/50 rounded-2xl p-2 sm:p-4 overflow-hidden flex items-start justify-center shadow-inner max-h-[75vh]">
              <div className="origin-top scale-[0.38] min-[360px]:scale-[0.42] min-[400px]:scale-[0.46] min-[480px]:scale-[0.52] sm:scale-[0.55] lg:scale-[0.6] flex-shrink-0">
                {renderTemplate()}
              </div>
            </div>
          </div>
        </div>
 
      </div>

      {/* AI Generating Loading Overlay Modal */}
      {aiGenerating && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col justify-center items-center p-6 select-none animate-in fade-in duration-300">
          <div className="w-full max-w-md space-y-6 text-center">
            <div className="relative mx-auto w-16 h-16 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin" />
              <Sparkles size={24} className="text-blue-400 animate-pulse" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white font-inter">
                {getTranslation("aiGenerating", language)}
              </h3>
              <p className="text-xs text-textSecondary leading-relaxed">{aiStatusMessage}</p>
            </div>

            {/* Progress Bar container */}
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                style={{ width: `${aiProgress}%` }}
              />
            </div>
            
            <p className="text-[10px] text-white/30 uppercase font-mono font-bold tracking-widest">{aiProgress}% Completed</p>
          </div>
        </div>
      )}

    </div>
  );
}
