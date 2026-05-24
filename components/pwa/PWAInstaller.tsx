"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { Smartphone, Download, X, Sparkles } from "lucide-react";

/**
 * Premium PWA installer component.
 * Intercepts Google Chrome's "beforeinstallprompt" and shows a beautiful
 * glassmorphic mobile download banner optimized for Android users.
 */
export default function PWAInstaller() {
  const { language } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  useEffect(() => {
    // ── Service Worker Registration ─────────────────────────────
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").then(
          (registration) => {
            console.log("PWA Service Worker registered with scope:", registration.scope);
          },
          (err) => {
            console.error("PWA Service Worker registration failed:", err);
          }
        );
      });
    }

    // ── Intercept Android / Chrome install prompt ───────────────
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent Chrome from showing its default prompt immediately
      e.preventDefault();
      // Save event so it can be triggered later
      setDeferredPrompt(e);
      // Show custom visual banner
      setShowInstallBanner(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // If already installed, hide the banner
    window.addEventListener("appinstalled", () => {
      setDeferredPrompt(null);
      setShowInstallBanner(false);
      console.log("FastCV PK Mobile App was successfully installed!");
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show native prompt
    deferredPrompt.prompt();

    // Wait for choice
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`PWA Installation outcome: ${outcome}`);

    // Reset prompt state
    setDeferredPrompt(null);
    setShowInstallBanner(false);
  };

  const handleDismiss = () => {
    setShowInstallBanner(false);
    // Remember dismissal for 2 days
    localStorage.setItem("fastcv_pwa_dismissed", Date.now().toString());
  };

  // Check if user dismissed it recently
  useEffect(() => {
    const lastDismissed = localStorage.getItem("fastcv_pwa_dismissed");
    if (lastDismissed) {
      const diff = Date.now() - parseInt(lastDismissed, 10);
      const twoDaysInMs = 2 * 24 * 60 * 60 * 1000;
      if (diff < twoDaysInMs) {
        setShowInstallBanner(false);
      }
    }
  }, [deferredPrompt]);

  if (!showInstallBanner) return null;

  const isUrdu = language === "ur";

  return (
    <div 
      className="fixed bottom-6 right-6 z-50 max-w-sm w-[90vw] md:w-[360px] rounded-2xl border border-blue-500/20 bg-slate-950/90 backdrop-blur-md p-5 shadow-[0_10px_35px_rgba(59,130,246,0.25)] select-none animate-in slide-in-from-bottom-12 duration-500"
      dir={isUrdu ? "rtl" : "ltr"}
    >
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-blue-500/10 blur-[40px] pointer-events-none" />
      
      {/* Close button */}
      <button 
        onClick={handleDismiss} 
        className="absolute top-3 right-3 text-textSecondary hover:text-white p-1 hover:bg-white/5 rounded-lg transition-all"
        aria-label="Close"
      >
        <X size={15} />
      </button>

      {/* Main Content */}
      <div className="flex gap-4">
        <div className="p-3 h-fit bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl text-white shadow-lg shadow-blue-500/10 flex-shrink-0 animate-bounce">
          <Smartphone size={20} />
        </div>
        
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-white flex items-center gap-1.5 font-inter">
            <span>FastCV PK App</span>
            <span className="inline-flex items-center gap-0.5 bg-blue-500/10 text-blue-400 text-[8px] font-black uppercase px-1.5 py-0.5 rounded border border-blue-500/20">
              <Sparkles size={8} className="animate-pulse" /> FREE
            </span>
          </h4>
          
          <p className="text-[11px] text-textSecondary leading-relaxed">
            {isUrdu 
              ? "اب فاسٹ سی وی کو ایک کلک میں موبائل ایپ کی طرح چلائیں۔ تیز ترین لوڈنگ اور شاندار تجربہ حاصل کریں۔"
              : "Install our dynamic mobile app instantly on your Android phone. Experience fast loading and offline features."
            }
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2">
        <button
          onClick={handleInstallClick}
          className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs font-extrabold py-2.5 shadow-md shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-wider"
        >
          <Download size={13} />
          {isUrdu ? "موبائل ایپ ڈاؤن لوڈ کریں" : "Download Mobile App"}
        </button>
        
        <button
          onClick={handleDismiss}
          className="rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 text-textSecondary hover:text-white text-xs font-semibold py-2.5 px-3 transition-colors uppercase"
        >
          {isUrdu ? "بند کریں" : "Later"}
        </button>
      </div>
    </div>
  );
}
