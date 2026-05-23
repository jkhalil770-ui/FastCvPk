"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { getTranslation } from "@/lib/translations";
import { Briefcase, User, GraduationCap, Laptop, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

/**
 * CV Type Selection Page (/create).
 */
export default function CVSelectionPage() {
  const { language } = useLanguage();

  const selectionCards = [
    {
      id: "ats",
      nameKey: "atsCvName",
      tagKey: "atsCvTag",
      badgeKey: "watermarkBadge",
      descKey: "atsCvDesc",
      icon: Briefcase,
      badgeVariant: "warning" as const,
      langRules: "English Only (ATS Compliant)",
      langRulesUr: "صرف انگریزی (اے ٹی ایس تعمیل)",
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
      langRules: "Urdu Nastaliq Script Only",
      langRulesUr: "صرف اردو نستعلیق رسم الخط",
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
      langRules: "User Chooses English or Urdu",
      langRulesUr: "انگریزی یا اردو (آپ کی پسند)",
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
      langRules: "English Only (Freelancer Optimized)",
      langRulesUr: "صرف انگریزی (فریلانسرز کے لیے)",
      color: "from-cyan-600/30 to-cyan-500/10",
      border: "border-cyan-500/20"
    }
  ];

  return (
    <div className="flex-1 w-full bg-[#0F172A] relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
      <title>{language === "ur" ? "سی وی بنانا شروع کریں — FastCV PK" : "Create Your CV & Resume Online — FastCV PK"}</title>
      <meta name="description" content="Create your professional CV or Biodata instantly. Choose an ATS-friendly, student, freelancer, or wedding Biodata template, and auto-fill it with AI." />
      {/* Background neon elements */}
      <div className="absolute top-[10%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[35vw] h-[35vw] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-5xl relative z-10">
        
        {/* Back Link */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-1.5 text-xs text-textSecondary hover:text-white transition-colors mb-8 touch-btn font-semibold"
        >
          <ArrowLeft size={14} />
          {getTranslation("backToHome", language)}
        </Link>

        {/* Title */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {getTranslation("selectCvTitle", language)}
          </h1>
          <p className="text-xs sm:text-sm text-textSecondary max-w-xl mx-auto leading-relaxed">
            {getTranslation("selectCvSub", language)}
          </p>
        </div>

        {/* Selection Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {selectionCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className={`rounded-2xl border ${card.border} bg-gradient-to-br ${card.color} p-6 sm:p-8 flex flex-col justify-between hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300 relative group`}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                      <Icon size={22} className="text-blue-400" />
                    </div>
                    <span className="text-[10px] font-semibold text-textSecondary tracking-wider bg-white/5 px-2.5 py-1 rounded-full border border-white/10 uppercase font-inter">
                      {getTranslation(card.tagKey, language)}
                    </span>
                  </div>

                  {/* Title & Badge */}
                  <h2 className="text-xl font-bold text-white mt-6 flex items-center gap-2">
                    {getTranslation(card.nameKey, language)}
                  </h2>

                  <div className="mt-2.5 flex flex-wrap gap-2">
                    <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${
                      card.badgeVariant === "success" 
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    }`}>
                      {getTranslation(card.badgeKey, language)}
                    </span>
                    <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 tracking-wide font-inter">
                      {language === "ur" ? card.langRulesUr : card.langRules}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-xs sm:text-sm text-textSecondary leading-relaxed">
                    {getTranslation(card.descKey, language)}
                  </p>
                </div>

                {/* Card Action footer */}
                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-textSecondary">
                    <Sparkles size={12} className="text-blue-400" />
                    <span>Gemini Expanded</span>
                  </div>
                  
                  <Link href={`/create/${card.id}`}>
                    <button className="flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 shadow-md hover:shadow-blue-500/20 transition-all uppercase tracking-wider group-hover:scale-[1.03]">
                      {language === "ur" ? "سی وی بنائیں" : "Build Now"}
                      <ArrowRight size={13} />
                    </button>
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
