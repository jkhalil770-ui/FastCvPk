"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { getTranslation } from "@/lib/translations";
import { useToast } from "@/components/ui/Toast";

/**
 * Premium Dark Glassmorphic Footer for SEO and navigation.
 */
export function Footer() {
  const { language } = useLanguage();
  const { toast } = useToast();

  const showSocialsToast = () => {
    toast(
      "🚀 Coming Soon!",
      "info",
      language === "ur" ? "Jald aa raha hai" : "Jald aa raha hai",
      2000
    );
  };

  return (
    <footer className="w-full border-t border-white/5 bg-slate-950/40 mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info & Tagline */}
          <div className="space-y-4">
            <span className="bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-lg font-extrabold text-transparent tracking-wider">
              {getTranslation("brandName", language)}
            </span>
            <p className="text-xs text-textSecondary leading-relaxed">
              {getTranslation("tagline", language)}
            </p>
            <p className="text-[10px] text-textSecondary/50 font-inter">
              © 2026 FastCV PK - All Rights Reserved.
            </p>
            <p className="text-[10px] text-textSecondary/70 font-inter">
              Contact: fastcvpk.online@gmail.com
            </p>
            <div className="flex items-center gap-3 text-xs text-blue-400 font-semibold font-inter pt-1">
              <button onClick={showSocialsToast} className="hover:text-white transition-colors outline-none cursor-pointer">Facebook</button>
              <span className="text-white/10">|</span>
              <button onClick={showSocialsToast} className="hover:text-white transition-colors outline-none cursor-pointer">Instagram</button>
              <span className="text-white/10">|</span>
              <button onClick={showSocialsToast} className="hover:text-white transition-colors outline-none cursor-pointer">LinkedIn</button>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">
              {language === "ur" ? "ضروری لنکس" : "Quick Links"}
            </h4>
            <ul className="space-y-2 text-xs text-textSecondary">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  {getTranslation("home", language)}
                </Link>
              </li>
              <li>
                <Link href="/templates" className="hover:text-white transition-colors">
                  {getTranslation("templates", language)}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  {getTranslation("blog", language)}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  {language === "ur" ? "پرائیویسی پالیسی" : "Privacy Policy"}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  {language === "ur" ? "شرائط و ضوابط" : "Terms & Conditions"}
                </Link>
              </li>
            </ul>
          </div>

          {/* CV Formats Column */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">
              {language === "ur" ? "سی وی فارمیٹس" : "CV Formats"}
            </h4>
            <ul className="space-y-2 text-xs text-textSecondary">
              <li>
                <Link href="/create/ats" className="hover:text-white transition-colors">
                  {getTranslation("atsCvName", language)}
                </Link>
              </li>
              <li>
                <Link href="/create/biodata" className="hover:text-white transition-colors">
                  {getTranslation("biodataName", language)}
                </Link>
              </li>
              <li>
                <Link href="/create/student" className="hover:text-white transition-colors">
                  {getTranslation("studentCvName", language)}
                </Link>
              </li>
              <li>
                <Link href="/create/freelancer" className="hover:text-white transition-colors">
                  {getTranslation("freelancerCvName", language)}
                </Link>
              </li>
            </ul>
          </div>

          {/* SEO Description Column */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white">
              {language === "ur" ? "پاکستان کا نمبر 1 میکر" : "Pakistan's #1 CV Maker"}
            </h4>
            <p className="text-[11px] text-textSecondary/70 leading-relaxed font-inter">
              FastCV PK offers professional Resume and Matrimonial Biodata generators tailored for students, freelancers, and corporate job seekers in Karachi, Lahore, Islamabad, and across Pakistan. Free downloads with high quality prints.
            </p>
          </div>

        </div>
        
        {/* Bottom border separator */}
        <div className="border-t border-white/5 mt-8 pt-8 text-center text-[10px] text-textSecondary/40 font-inter">
          © 2026 FastCV PK — Made with ❤️ in Pakistan
        </div>
      </div>
    </footer>
  );
}
export default Footer;
