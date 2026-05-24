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

      <Card className="w-full max-w-md p-8 border-white/10 text-center relative z-10 select-none">
        <div className="mx-auto w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4 animate-pulse">
          <ShieldAlert size={22} />
        </div>
        
        <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest font-inter block mb-1">FastCV PK</span>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-widest font-mono bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">404</h1>

        <div className="space-y-1 mt-4">
          <h2 className="text-lg font-black text-white font-urdu leading-normal">
            یہ صفحہ نہیں ملا! 🔍
          </h2>
          <h3 className="text-xs font-bold text-slate-300 font-inter uppercase tracking-wide">
            This page does not exist
          </h3>
        </div>
        
        <p className="text-[11px] text-textSecondary leading-relaxed mt-4 mb-6">
          معذرت، جو لنک آپ نے اوپن کیا ہے وہ اب ویب سائٹ پر موجود نہیں ہے۔ آپ نیچے دیئے گئے بٹنز کے ذریعے ہوم پیج پر جا سکتے ہیں یا ابھی اپنی نئی سی وی بنا سکتے ہیں۔
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/" className="flex-1">
            <Button variant="secondary" className="w-full gap-1.5 py-3 text-xs text-blue-400 font-bold border-white/10 bg-white/5 uppercase tracking-wider font-inter">
              <ArrowLeft size={13} />
              Ghar Wapas Jao
            </Button>
          </Link>
          <Link href="/create" className="flex-1">
            <Button className="w-full gap-1.5 py-3 text-xs bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-wider font-inter shadow-md shadow-blue-500/20">
              CV Banao ⚡
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
