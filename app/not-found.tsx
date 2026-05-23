"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { getTranslation } from "@/lib/translations";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { ShieldAlert, ArrowLeft } from "lucide-react";

/**
 * Custom 404 Page (Not Found).
 */
export default function NotFoundPage() {
  const { language } = useLanguage();

  return (
    <div className="flex-grow w-full bg-[#0F172A] relative flex flex-col justify-center items-center py-20 px-4">
      {/* Background blur */}
      <div className="absolute top-[25%] left-[-10%] w-[35vw] h-[35vw] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      <Card className="w-full max-w-md p-8 border-white/10 text-center relative z-10">
        <div className="mx-auto w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6 animate-pulse">
          <ShieldAlert size={22} />
        </div>
        
        <h1 className="text-5xl font-black text-white tracking-widest font-mono">404</h1>

        <h2 className={`text-lg font-bold text-white mt-4 ${language === "ur" ? "font-urdu" : "font-inter"}`}>
          {language === "ur" ? "صفحہ نہیں ملا!" : "Page Not Found"}
        </h2>
        
        <p className={`text-xs text-textSecondary leading-relaxed mt-2 mb-6 ${language === "ur" ? "font-urdu" : "font-inter"}`}>
          {language === "ur" 
            ? "معذرت، جو صفحہ آپ تلاش کر رہے ہیں وہ وجود نہیں رکھتا یا اسے منتقل کر دیا گیا ہے۔" 
            : "Apologies, the terminal page you are requesting does not exist or has been moved."}
        </p>

        <Link href="/" className="inline-block w-full">
          <Button className="w-full gap-2 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold">
            <ArrowLeft size={15} />
            {getTranslation("backToHome", language)}
          </Button>
        </Link>
      </Card>
    </div>
  );
}
