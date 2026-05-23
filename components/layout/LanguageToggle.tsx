"use client";

import React, { useEffect, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

/**
 * Fixed top-right premium Language Toggling switch.
 */
export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center">
        <div className="w-[54px] h-[30px] rounded-full border border-white/5 bg-slate-900/90 backdrop-blur-md animate-pulse" />
      </div>
    );
  }

  return (
    <div className="transition-all duration-300 flex items-center justify-center">
      <button
        onClick={toggleLanguage}
        className="flex items-center justify-center min-w-[54px] px-3 py-1.5 rounded-full border border-white/10 bg-slate-900/90 backdrop-blur-md text-[10px] font-bold text-white shadow-lg transition-all duration-300 hover:border-blue-500/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] active:scale-95 touch-btn select-none"
      >
        {language === "en" ? (
          <span className="font-urdu leading-normal animate-in fade-in zoom-in duration-300">
            اردو
          </span>
        ) : (
          <span className="font-inter tracking-wider animate-in fade-in zoom-in duration-300">
            EN
          </span>
        )}
      </button>
    </div>
  );
}
export default LanguageToggle;
