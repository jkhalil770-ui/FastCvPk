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
                  className="glass-panel rounded-2xl p-6 sm:p-8 border-white/5 hover:border-blue-500/30 hover:shadow-[0_15px_40px_rgba(59,130,246,0.15)] transition-all duration-300 flex flex-col justify-between group hover:scale-[1.02] cursor-pointer"
                >
                  <div className="w-full">
                    {/* Header line with badge */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-blue-400 group-hover:scale-105 transition-transform duration-300">
                        <Icon size={20} />
                      </div>
                      
                      {/* Styled Badges for Polish 3 */}
                      {tpl.badgeType === "free" && (
                        <span className="inline-flex px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wide border bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                          Free
                        </span>
                      )}
                      {tpl.badgeType === "premium" && (
                        <span className="inline-flex px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wide border bg-[#D97706]/10 text-[#D97706] border-[#D97706]/20">
                          Premium
                        </span>
                      )}
                      {tpl.badgeType === "global" && (
                        <span className="inline-flex px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wide border bg-purple-500/10 text-purple-400 border-purple-500/20">
                          🌍 Global Pro
                        </span>
                      )}
                    </div>

                    {/* Premium Miniature CSS CV Preview Thumbnail */}
                    <div className="w-full h-44 rounded-xl bg-slate-950/60 border border-white/5 p-4 mb-5 overflow-hidden relative flex items-center justify-center group-hover:border-blue-500/20 transition-all duration-300 shadow-inner select-none">
                      {/* Grid overlays */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:10px_10px]" />
                      
                      {/* Realistic mini-A4 sheet */}
                      <div className="w-[110px] h-[146px] bg-white rounded shadow-lg p-2 relative flex flex-col text-[3px] text-slate-800 leading-tight transition-transform duration-300 group-hover:scale-105 origin-center">
                        {tpl.id === "ats" && (
                          <div className="w-full h-full flex flex-col font-sans">
                            {/* Header */}
                            <div className="w-2/3 h-1 bg-slate-900 rounded mb-0.5" />
                            <div className="w-1/3 h-0.5 bg-slate-400 rounded mb-2" />
                            {/* Summary */}
                            <div className="w-full h-0.5 bg-slate-300 rounded mb-0.5" />
                            <div className="w-5/6 h-0.5 bg-slate-300 rounded mb-2" />
                            {/* Section 1 */}
                            <div className="w-1/4 h-1 bg-slate-900 rounded mb-1" />
                            <div className="w-full border-t border-slate-200 pt-1 space-y-1">
                              <div className="flex justify-between">
                                <div className="w-1/2 h-0.5 bg-slate-700 rounded" />
                                <div className="w-1/6 h-0.5 bg-slate-400 rounded" />
                              </div>
                              <div className="w-5/6 h-0.5 bg-slate-300 rounded" />
                              <div className="w-4/5 h-0.5 bg-slate-300 rounded" />
                            </div>
                          </div>
                        )}

                        {tpl.id === "biodata" && (
                          <div className="w-full h-full flex flex-col font-serif bg-[#FCFBF7] border border-[#F3EFE0] relative p-1">
                            {/* Floral top accent */}
                            <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-600" />
                            {/* Islamic symbol or centered text */}
                            <div className="w-1/2 h-1 bg-amber-600 rounded mx-auto mt-1 mb-1.5" />
                            {/* Grid details */}
                            <div className="space-y-1 pt-1 border-t border-amber-200/50">
                              <div className="flex justify-between px-0.5">
                                <div className="w-1/3 h-0.5 bg-slate-500 rounded" />
                                <div className="w-1/2 h-0.5 bg-slate-800 rounded" />
                              </div>
                              <div className="flex justify-between px-0.5">
                                <div className="w-1/3 h-0.5 bg-slate-500 rounded" />
                                <div className="w-1/2 h-0.5 bg-slate-800 rounded" />
                              </div>
                              <div className="flex justify-between px-0.5">
                                <div className="w-1/3 h-0.5 bg-slate-500 rounded" />
                                <div className="w-1/2 h-0.5 bg-slate-800 rounded" />
                              </div>
                            </div>
                          </div>
                        )}

                        {tpl.id === "student" && (
                          <div className="w-full h-full flex flex-col font-sans">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-2">
                              <div>
                                <div className="w-10 h-1 bg-slate-900 rounded" />
                                <div className="w-6 h-0.5 bg-slate-400 rounded mt-0.5" />
                              </div>
                              <div className="w-3 h-3 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 font-bold text-[3px]">🎓</div>
                            </div>
                            {/* Education */}
                            <div className="w-1/3 h-1 bg-blue-600 rounded mb-1" />
                            <div className="space-y-0.5 mb-2 pl-1 border-l border-blue-500/20">
                              <div className="w-full h-0.5 bg-slate-700 rounded" />
                              <div className="w-4/5 h-0.5 bg-slate-400 rounded" />
                            </div>
                            {/* Projects */}
                            <div className="w-1/3 h-1 bg-blue-600 rounded mb-1" />
                            <div className="space-y-0.5 pl-1 border-l border-blue-500/20">
                              <div className="w-full h-0.5 bg-slate-700 rounded" />
                              <div className="w-5/6 h-0.5 bg-slate-300 rounded" />
                            </div>
                          </div>
                        )}

                        {tpl.id === "freelancer" && (
                          <div className="w-full h-full flex font-sans">
                            {/* Left Column */}
                            <div className="w-1/3 border-r border-slate-100 pr-1 mr-1 flex flex-col pt-0.5">
                              <div className="w-4 h-4 rounded-full bg-slate-200 mb-1 mx-auto" />
                              <div className="w-full h-0.5 bg-slate-600 rounded mb-0.5" />
                              <div className="w-2/3 h-0.5 bg-slate-400 rounded mb-1.5" />
                              <div className="flex flex-wrap gap-0.5">
                                <span className="px-0.5 py-0.2 bg-blue-50 text-blue-600 text-[2px] font-bold rounded">JS</span>
                                <span className="px-0.5 py-0.2 bg-blue-50 text-blue-600 text-[2px] font-bold rounded">React</span>
                              </div>
                            </div>
                            {/* Right Column */}
                            <div className="w-2/3 flex flex-col pt-0.5">
                              <div className="w-full h-1 bg-slate-900 rounded mb-0.5" />
                              <div className="w-1/2 h-0.5 bg-slate-400 rounded mb-2" />
                              <div className="grid grid-cols-2 gap-0.5">
                                <div className="border border-slate-100 p-0.5 rounded flex flex-col">
                                  <div className="w-full h-0.5 bg-slate-600 rounded" />
                                  <div className="w-2/3 h-0.5 bg-slate-300 rounded mt-0.5" />
                                </div>
                                <div className="border border-slate-100 p-0.5 rounded flex flex-col">
                                  <div className="w-full h-0.5 bg-slate-600 rounded" />
                                  <div className="w-2/3 h-0.5 bg-slate-300 rounded mt-0.5" />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {tpl.id === "global-pro" && (
                          <div className="w-full h-full flex flex-col font-sans">
                            {/* Header with image */}
                            <div className="flex justify-between items-center mb-1.5 pb-1 border-b border-slate-100">
                              <div className="flex items-center gap-1">
                                <div className="w-4 h-4 rounded-full bg-slate-200 border border-[#3B82F6] flex items-center justify-center overflow-hidden text-[2px]">🧑‍💻</div>
                                <div>
                                  <div className="w-10 h-0.8 bg-slate-900 rounded" />
                                  <div className="w-6 h-0.5 bg-[#3B82F6] rounded mt-0.2" />
                                </div>
                              </div>
                              <div className="flex gap-0.5">
                                <span className="px-0.5 py-0.2 bg-purple-50 text-purple-600 text-[2px] font-bold rounded scale-90">USD</span>
                              </div>
                            </div>
                            {/* Summary */}
                            <div className="w-full h-0.5 bg-slate-300 rounded mb-0.5" />
                            <div className="w-4/5 h-0.5 bg-slate-300 rounded mb-2" />
                            {/* Job list */}
                            <div className="space-y-0.5 pl-1 border-l-2 border-purple-500">
                              <div className="flex justify-between">
                                <div className="w-2/3 h-0.5 bg-slate-800 rounded" />
                                <div className="w-1/6 h-0.5 bg-slate-400 rounded" />
                              </div>
                              <div className="w-5/6 h-0.5 bg-slate-300 rounded" />
                            </div>
                          </div>
                        )}
                      </div>
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
                    
                    <Button className="px-5 py-2.5 text-xs font-extrabold rounded-xl bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1.5 touch-btn transition-all group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] shadow-md shadow-blue-500/10">
                      {language === "ur" ? "سی وی بنائیں" : "Use Template"}
                      <ArrowRight size={13} />
                    </Button>
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
