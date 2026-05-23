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

  const filterCategories = ["All", "ATS", "Biodata", "Student", "Freelancer"];

  const templatesList = [
    {
      id: "ats",
      name: "Standard Corporate ATS",
      category: "ATS",
      freeStatus: "watermarkBadge",
      langRule: "English Only",
      icon: Briefcase,
      features: ["Single column parser", "Bold headings", "Keyword targeted"]
    },
    {
      id: "biodata",
      name: "Traditional Urdu Biodata",
      category: "Biodata",
      freeStatus: "freeBadge",
      langRule: "Urdu Nastaliq",
      icon: User,
      features: ["matrimonial proposals", "religion CNIC support", "RTL tables"]
    },
    {
      id: "student",
      name: "Fresher Academic Template",
      category: "Student",
      freeStatus: "freeBadge",
      langRule: "English or Urdu",
      icon: GraduationCap,
      features: ["Latest first schooling", "Academic projects list", "Internship details"]
    },
    {
      id: "freelancer",
      name: "Remote Freelancer Specialist",
      category: "Freelancer",
      freeStatus: "watermarkBadge",
      langRule: "English Only",
      icon: Laptop,
      features: ["Tag layout stacks", "Website portfolio grids", "Project case studies"]
    }
  ];

  // Filtering
  const filteredTemplates = templatesList.filter(
    (tpl) => activeFilter === "All" || tpl.category === activeFilter
  );

  return (
    <div className="flex-grow w-full bg-[#0F172A] relative py-16 px-4 sm:px-6 lg:px-8">
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

        {/* Visual Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredTemplates.map((tpl) => {
            const Icon = tpl.icon;
            return (
              <div 
                key={tpl.id}
                className="glass-panel rounded-2xl p-6 sm:p-8 border-white/5 hover:border-blue-500/20 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-blue-400">
                      <Icon size={22} />
                    </div>
                    <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${
                      tpl.freeStatus === "freeBadge"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    }`}>
                      {getTranslation(tpl.freeStatus, language)}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-white mt-6">{tpl.name}</h2>
                  
                  {/* Features listing */}
                  <ul className="mt-4 space-y-2 text-xs text-textSecondary">
                    {tpl.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2">
                        <Sparkles size={11} className="text-blue-400" />
                        <span className="capitalize">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded uppercase font-semibold">
                    {tpl.langRule}
                  </span>
                  
                  <Link href={`/create/${tpl.id}`}>
                    <Button className="px-4 py-2 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1.5 touch-btn transition-transform group-hover:scale-[1.02]">
                      {language === "ur" ? "سی وی بنائیں" : "Use Template"}
                      <ArrowRight size={13} />
                    </Button>
                  </Link>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
