"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { getTranslation } from "@/lib/translations";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

import { 
  Layout, 
  Sparkles, 
  ArrowRight,
  Briefcase, 
  User, 
  GraduationCap, 
  Laptop
} from "lucide-react";

/**
 * Visual Gallery for available resume template structures (/templates).
 */
export default function TemplatesGalleryPage() {
  const { language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 550);
    return () => clearTimeout(t);
  }, []);

  const filterCategories = ["All", "ATS", "Biodata", "Student", "Freelancer"];

  const templatesList = [
    {
      id: "ats",
      name: "Standard Corporate ATS",
      category: "ATS",
      badgeType: "free",
      langRule: "English Only",
      icon: Briefcase,
      features: ["Single column parser", "Bold headings", "Keyword targeted"]
    },
    {
      id: "biodata",
      name: "Traditional Urdu Biodata",
      category: "Biodata",
      badgeType: "free",
      langRule: "Urdu Nastaliq",
      icon: User,
      features: ["matrimonial proposals", "religion CNIC support", "RTL tables"]
    },
    {
      id: "student",
      name: "Fresher Academic Template",
      category: "Student",
      badgeType: "free",
      langRule: "English or Urdu",
      icon: GraduationCap,
      features: ["Latest first schooling", "Academic projects list", "Internship details"]
    },
    {
      id: "freelancer",
      name: "Remote Freelancer Specialist",
      category: "Freelancer",
      badgeType: "free",
      langRule: "English Only",
      icon: Laptop,
      features: ["Tag layout stacks", "Website portfolio grids", "Project case studies"]
    },
    {
      id: "global-pro",
      name: "Premium Global Pro Specialist",
      category: "Freelancer",
      badgeType: "global",
      langRule: "English Only",
      icon: Sparkles,
      features: ["LinkedIn & GitHub focused", "Expected salary USD", "Timezone & remote settings"]
    }
  ];

  // Filtering
  const filteredTemplates = templatesList.filter(
    (tpl) => activeFilter === "All" || tpl.category === activeFilter
  );

  return (
    <div className="flex-grow w-full bg-[#0F172A] relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <title>{language === "ur" ? "سی وی ڈیزائنز اور ٹیمپلیٹس — FastCV PK" : "Resume Templates & CV Designs — FastCV PK"}</title>
      <meta name="description" content="Browse our selection of free and premium templates for Pakistan's job market. Choose from ATS-friendly, student CVs, matrimonial Biodata, and freelancer layouts." />
      {/* Background neon glows */}
      <div className="absolute top-[10%] left-[-10%] w-[35vw] h-[35vw] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-6xl relative z-10 space-y-12">
        
        {/* Title */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-400 text-xs font-semibold mb-2">
            <Layout size={13} />
            {language === "ur" ? "پیشہ ورانہ سی وی ٹیمپلیٹس" : "FastCV PK Resume Library"}
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {language === "ur" ? "بہترین اور جدید ڈیزائنز" : "Browse Professional Layouts"}
          </h1>
          <p className="text-xs sm:text-sm text-textSecondary max-w-xl mx-auto leading-relaxed">
            Select an expert structure approved by local Pakistani and global recruiters. Toggle layouts instantly based on target career specifications.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-2 justify-center select-none bg-slate-900/40 p-3 border border-white/5 rounded-2xl max-w-lg mx-auto backdrop-blur-md">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                activeFilter === cat
                  ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/10"
                  : "bg-white/5 border-white/5 text-textSecondary hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skeleton Loaders for Polish 5 */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="glass-panel rounded-2xl p-6 sm:p-8 border-white/5 space-y-5 animate-pulse">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white/5" />
                  <div className="w-20 h-5 rounded bg-white/5" />
                </div>
                <div className="h-6 rounded bg-white/5 w-2/3" />
                <div className="space-y-2 pt-2">
                  <div className="h-4 rounded bg-white/5 w-full" />
                  <div className="h-4 rounded bg-white/5 w-5/6" />
                  <div className="h-4 rounded bg-white/5 w-4/5" />
                </div>
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="w-16 h-5 rounded bg-white/5" />
                  <div className="w-24 h-8 rounded bg-white/5" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Visual Templates Grid for Polish 3 */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-500">
            {filteredTemplates.map((tpl) => {
              const Icon = tpl.icon;
              return (
                <Link 
                  key={tpl.id}
                  href={`/create/${tpl.id}`}
                  className={`template-card${tpl.id === 'global-pro' ? ' global-pro-card' : ''} glass-panel rounded-2xl border border-white/5 flex flex-col justify-between group bg-slate-900/20 backdrop-blur-md overflow-hidden`}
                  style={{ transformOrigin: 'center' }}
                >
                  {/* Visual Premium Miniature A4 Preview Thumbnail */}
                  <div className="preview-thumbnail w-full h-[200px] bg-slate-950/60 border-b border-white/5 overflow-hidden relative flex items-center justify-center shadow-inner select-none">
                    {/* Grid overlays */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />
                    
                    {/* Realistic mini-A4 sheet */}
                    <div className={`w-[360px] h-[510px] bg-white rounded shadow-lg p-5 flex flex-col text-[10px] text-slate-800 leading-tight transition-transform duration-500 origin-center scale-[0.35] ${
                      tpl.id === "global-pro" ? "!scale-[0.48] group-hover:!scale-[0.52] !origin-top mt-2" : "group-hover:scale-[0.38]"
                    }`}>
                      {tpl.id === "ats" && (
                        <div className="w-full h-full flex flex-col font-sans relative text-left">
                          {/* Name & Title */}
                          <div className="text-center mb-3">
                            <span className="text-[20px] font-black text-slate-900 leading-tight">Ahmed Raza</span>
                            <span className="block text-[9px] font-bold text-blue-600 uppercase tracking-wider mt-1">Software Engineer</span>
                            <span className="block text-[6.5px] text-slate-500 mt-1">ahmed.raza@email.com  |  +92 300 1234567  |  Lahore</span>
                          </div>
                          
                          {/* Accent divider line */}
                          <div className="h-[2px] bg-blue-600 w-full mb-3" />

                          {/* Summary Section */}
                          <div className="mb-3">
                            <span className="block text-[9.5px] font-bold text-slate-900 border-b border-slate-200 pb-0.5 mb-1.5 uppercase">Professional Summary</span>
                            <span className="block text-[6.5px] text-slate-600 leading-normal">
                              Software engineer with 5 years experience building highly scalable web systems in React and Node.js. 
                              Cut application response times by 40% and served 20,000+ daily active users at Systems Ltd.
                            </span>
                          </div>

                          {/* Experience Section */}
                          <div className="mb-3">
                            <span className="block text-[9.5px] font-bold text-slate-900 border-b border-slate-200 pb-0.5 mb-1.5 uppercase">Work Experience</span>
                            <div className="mb-1">
                              <div className="flex justify-between items-baseline mb-0.5">
                                <span className="text-[8px] font-bold text-slate-800">Software Engineer — Systems Limited</span>
                                <span className="text-[7px] text-slate-500 font-bold">2021 - Present</span>
                              </div>
                              <span className="block text-[6.5px] text-slate-600 leading-normal">
                                • Led developer team to design high-performance responsive customer dashboard.<br />
                                • Optimized database indexing, reducing search execution latency by 30%.
                              </span>
                            </div>
                          </div>

                          {/* Skills Section */}
                          <div>
                            <span className="block text-[9.5px] font-bold text-slate-900 border-b border-slate-200 pb-0.5 mb-1.5 uppercase">Key Skills</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {['React', 'Next.js', 'Node.js', 'TypeScript', 'SQL'].map(sk => (
                                <span key={sk} className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 text-slate-700 text-[6px] font-bold rounded-md">{sk}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {tpl.id === "biodata" && (
                        <div className="w-full h-full flex flex-col font-serif bg-[#FCFBF7] border-2 border-emerald-600 p-4 relative text-right">
                          {/* Bismillah */}
                          <span className="text-[7.5px] text-emerald-600 text-center font-bold mb-1 leading-none">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
                          
                          {/* Header */}
                          <div className="text-center mb-2">
                            <span className="text-[18px] text-emerald-800 font-extrabold block leading-tight">محمد علی</span>
                            <span className="text-[8px] text-slate-500 font-bold block mt-1">سوانح حیات (بائیو ڈیٹا)</span>
                          </div>

                          {/* Divider */}
                          <div className="h-[1.5px] bg-emerald-600 w-2/3 mx-auto mb-3" />

                          {/* Personal Details */}
                          <div className="mb-3">
                            <span className="block text-[10px] font-bold text-emerald-700 border-b border-emerald-100 pb-0.5 mb-2 text-right">ذاتی تفصیلات</span>
                            <div className="space-y-1 text-[7px] text-slate-700">
                              <div className="flex justify-end gap-1"><span className="font-bold text-slate-900">محمد علی</span><span className="text-slate-500">:مکمل نام</span></div>
                              <div className="flex justify-end gap-1"><span className="font-bold text-slate-900">احمد علی</span><span className="text-slate-500">:والد کا نام</span></div>
                              <div className="flex justify-end gap-1"><span className="font-bold text-slate-900">15 جنوری 1998</span><span className="text-slate-500">:تاریخ پیدائش</span></div>
                              <div className="flex justify-end gap-1"><span className="font-bold text-slate-900">35201-1234567-9</span><span className="text-slate-500">:شناختی کارڈ</span></div>
                              <div className="flex justify-end gap-1"><span className="font-bold text-slate-900">اسلام</span><span className="text-slate-500">:مذہب</span></div>
                            </div>
                          </div>

                          {/* Education Table */}
                          <div className="mb-1">
                            <span className="block text-[10px] font-bold text-emerald-700 border-b border-emerald-100 pb-0.5 mb-2 text-right">تعلیمی کوائف</span>
                            <div className="border border-slate-200 rounded overflow-hidden text-[6px]">
                              <div className="flex bg-emerald-50 border-b border-slate-200 text-emerald-800 font-bold py-1">
                                <span className="w-1/4 text-center">سال</span>
                                <span className="w-1/4 text-center">نمبر</span>
                                <span className="w-1/2 text-center">بورڈ / یونیورسٹی</span>
                              </div>
                              <div className="flex border-b border-slate-100 py-1 bg-white">
                                <span className="w-1/4 text-center">2020</span>
                                <span className="w-1/4 text-center">3.6 CGPA</span>
                                <span className="w-1/2 text-center">جامعہ پنجاب</span>
                              </div>
                              <div className="flex py-1 bg-white">
                                <span className="w-1/4 text-center">2016</span>
                                <span className="w-1/4 text-center">88%</span>
                                <span className="w-1/2 text-center">لاہور بورڈ</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {tpl.id === "student" && (
                        <div className="w-full h-full flex flex-col font-sans relative text-left">
                          {/* Blue top line */}
                          <div className="absolute top-[-20px] left-[-20px] right-[-20px] h-[4px] bg-blue-600" />
                          
                          {/* Name and Degree */}
                          <div className="mb-3 mt-1">
                            <span className="text-[19px] font-black text-slate-900 leading-tight block">Ayesha Malik</span>
                            <span className="text-[8.5px] font-bold text-blue-600 block mt-0.5">BS Computer Science @ FAST NUCES</span>
                            <span className="text-[6.5px] text-slate-500 block mt-1">ayesha@email.com  |  +92 321 9876543  |  Islamabad</span>
                          </div>

                          <div className="h-[1px] bg-slate-200 w-full mb-3" />

                          {/* Objective */}
                          <div className="mb-3">
                            <span className="block text-[9.5px] font-bold text-blue-600 uppercase mb-1">Career Objective</span>
                            <span className="block text-[6.5px] text-slate-600 leading-normal">
                              Ambitious CS graduate from FAST NUCES eager to contribute skills in frontend development and modern API building.
                            </span>
                          </div>

                          {/* Education */}
                          <div className="mb-3">
                            <span className="block text-[9.5px] font-bold text-blue-600 uppercase mb-1">Education Profile</span>
                            <div className="mb-1">
                              <div className="flex justify-between items-baseline mb-0.5">
                                <span className="text-[7.5px] font-bold text-slate-800">FAST NUCES, Islamabad</span>
                                <span className="text-[6.5px] text-slate-400 font-bold">2020 - 2024</span>
                              </div>
                              <span className="block text-[6.8px] text-slate-600">BS Computer Science (GPA: 3.8 / 4.0)</span>
                            </div>
                          </div>

                          {/* Projects */}
                          <div className="mb-3">
                            <span className="block text-[9.5px] font-bold text-blue-600 uppercase mb-1">Academic Projects</span>
                            <div>
                              <span className="block text-[7.5px] font-bold text-slate-800">E-Commerce Web Application</span>
                              <span className="block text-[6.5px] text-slate-600 leading-normal">
                                • Developed dynamic checkout system using React and Firebase.<br />
                                • Implemented full security rules for customer dashboard.
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {tpl.id === "freelancer" && (
                        <div className="w-full h-full flex flex-col font-sans relative text-left">
                          {/* Top banner stripe */}
                          <div className="absolute top-[-20px] left-[-20px] right-[-20px] h-[4px] bg-[#0B2545]" />
                          
                          {/* Left accented header */}
                          <div className="border-l-[3px] border-[#0B2545] pl-3 mb-3 mt-1">
                            <span className="text-[19px] font-black text-slate-900 leading-tight block">Usman Ali</span>
                            <span className="text-[9px] font-bold text-[#0B2545] uppercase tracking-wider block mt-0.5">Full Stack Freelancer</span>
                            <span className="text-[6.8px] text-slate-500 block mt-1">fiverr.com/usman_ali  |  github.com/usman-ali  |  Karachi</span>
                          </div>

                          {/* Profiles Grid */}
                          <div className="flex justify-between gap-2 mb-3">
                            {/* Services */}
                            <div className="bg-slate-50 border border-slate-200/60 p-2 rounded w-1/2 flex flex-col">
                              <span className="text-[7.5px] font-bold text-slate-800 mb-1 border-b border-slate-200 pb-0.5 uppercase">Services Offered</span>
                              <span className="text-[6.2px] text-slate-600 leading-relaxed">
                                • Custom Web Apps<br />
                                • UI/UX Design Pro<br />
                                • API Integration
                              </span>
                            </div>
                            {/* Tech Stack */}
                            <div className="bg-blue-50/40 border border-blue-100 p-2 rounded w-1/2 flex flex-col">
                              <span className="text-[7.5px] font-bold text-slate-800 mb-1 border-b border-blue-200 pb-0.5 uppercase">Tech Stack & Tools</span>
                              <div className="flex flex-wrap gap-0.5 mt-0.5">
                                {['React', 'NextJS', 'Tailwind', 'NodeJS'].map(t => (
                                  <span key={t} className="px-1 py-0.2 bg-white border border-blue-100 text-[#0B2545] text-[5.5px] font-bold rounded">{t}</span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Projects */}
                          <div>
                            <span className="block text-[9px] font-bold text-[#0B2545] border-b border-slate-200 pb-0.5 mb-1.5 uppercase">Notable Freelance Projects</span>
                            <div>
                              <div className="flex justify-between items-baseline mb-0.5">
                                <span className="text-[7.5px] font-bold text-slate-800">SaaS Platform Design</span>
                                <span className="text-[6px] text-blue-600 font-bold">Client (US)</span>
                              </div>
                              <span className="block text-[6.5px] text-slate-600">Built responsive web page, yielding 30% conversion uplift.</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {tpl.id === "global-pro" && (
                        <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
                          {/* Exact user-provided Global Pro CV preview image */}
                          <img
                            src="/images/globalavatar.png"
                            alt="Global Pro CV Template — Ayesha Khan"
                            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.06]"
                          />
                          {/* Premium overlay gradient at bottom */}
                          <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-slate-950/75 to-transparent pointer-events-none" />
                          {/* Global Pro badge overlay */}
                          <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-purple-600/90 text-white text-[9px] font-black uppercase tracking-wider backdrop-blur-sm border border-purple-400/30 shadow-lg">
                            🌍 Global Pro
                          </div>
                        </div>
                      )}

                    </div>
                  </div>

                  {/* Content (Padded) */}
                  <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow w-full">
                    <div className="w-full">
                      {/* Header line with badge */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-blue-400 group-hover:scale-105 transition-transform duration-300">
                          <Icon size={18} />
                        </div>
                        
                        {/* Styled Badges with glows on hover */}
                        {tpl.badgeType === "free" && (
                          <span className="inline-flex px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wide border bg-emerald-500/10 text-emerald-400 border-emerald-500/20 group-hover:shadow-[0_0_12px_rgba(52,211,153,0.4)] group-hover:border-emerald-400 transition-all duration-300">
                            Free
                          </span>
                        )}
                        {tpl.badgeType === "premium" && (
                          <span className="inline-flex px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wide border bg-[#D97706]/10 text-[#D97706] border-[#D97706]/20 group-hover:shadow-[0_0_12px_rgba(217,119,6,0.4)] group-hover:border-[#D97706] transition-all duration-300">
                            Premium
                          </span>
                        )}
                        {tpl.badgeType === "global" && (
                          <span className="inline-flex px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wide border bg-purple-500/10 text-purple-400 border-purple-500/20 group-hover:shadow-[0_0_12px_rgba(168,85,247,0.4)] group-hover:border-purple-400 transition-all duration-300">
                            🌍 Global Pro
                          </span>
                        )}
                      </div>

                      <h2 className="text-lg font-black text-white group-hover:text-blue-400 transition-colors duration-300">
                        {tpl.name}
                      </h2>
                      
                      {/* Features listing */}
                      <ul className="mt-4 space-y-2 text-xs text-textSecondary">
                        {tpl.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-2">
                            <Sparkles size={11} className="text-blue-400 animate-pulse" />
                            <span className="capitalize">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8 pt-4 w-full border-t border-white/5 flex items-center justify-between gap-4">
                      <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded uppercase font-semibold">
                        {tpl.langRule}
                      </span>
                      
                      <Button className="px-5 py-2.5 text-xs font-extrabold rounded-xl bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1.5 touch-btn transition-all duration-200 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] shadow-md shadow-blue-500/10 group-hover:bg-blue-500">
                        {language === "ur" ? "سی وی بنائیں" : "Use Template"}
                        <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
