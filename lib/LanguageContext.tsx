"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, getPersistedLanguage, setPersistedLanguage } from "./translations";

interface LanguageContextProps {
  language: Language;
  toggleLanguage: () => void;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  // Load language settings from client side on mount
  useEffect(() => {
    setLanguage(getPersistedLanguage());
  }, []);

  const toggleLanguage = () => {
    const nextLang: Language = language === "en" ? "ur" : "en";
    setLanguage(nextLang);
    setPersistedLanguage(nextLang);
  };

  const dir = language === "ur" ? "rtl" : "ltr";

  // Dynamic document direction binding
  useEffect(() => {
    document.documentElement.dir = dir;
    if (language === "ur") {
      document.documentElement.classList.add("font-urdu");
    } else {
      document.documentElement.classList.remove("font-urdu");
    }
  }, [language, dir]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, dir }}>
      <div dir={dir} className={language === "ur" ? "font-urdu" : "font-inter"}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
