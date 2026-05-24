"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { Smartphone, Download, X, Sparkles, HelpCircle } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

/**
 * Premium PWA installer component.
 * Integrates native beforeinstallprompt interception with a permanent visible
 * bottom banner for mobile browsers (with guidance prompts for Safari and Chrome mobile).
 */
export default function PWAInstaller() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  
  // Mobile specific banner states (Fix for Android/iOS where event doesn't fire)
  const [showMobileBanner, setShowMobileBanner] = useState(false);
  const [timerFired, setTimerFired] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [deviceType, setDeviceType] = useState<"android" | "ios" | "other">("other");
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    // ── Force Cache Clearing on first load of version 3 ────────
    if (typeof window !== "undefined" && "caches" in window) {
      const forceCleared = localStorage.getItem("fastcv_cache_v3_cleared");
      if (forceCleared !== "true") {
        caches.keys().then((names) => {
          return Promise.all(names.map((name) => caches.delete(name)));
        }).then(() => {
          localStorage.setItem("fastcv_cache_v3_cleared", "true");
          console.log("PWA Caches successfully cleared programmatically!");
          window.location.reload(); // force reload to fetch fresh content
        });
      }
    }

    // ── Detect Device and Screen Size ───────────────────────────
    if (typeof window !== "undefined") {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      checkMobile();
      window.addEventListener("resize", checkMobile);

      const ua = navigator.userAgent.toLowerCase();
      if (/iphone|ipad|ipod/.test(ua)) {
        setDeviceType("ios");
      } else if (/android/.test(ua)) {
        setDeviceType("android");
      }

      return () => window.removeEventListener("resize", checkMobile);
    }
  }, []);

  useEffect(() => {
    // ── Service Worker Registration (Next.js Hydration Safe) ────
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const registerSW = () => {
        navigator.serviceWorker.register("/sw.js").then(
          (registration) => {
            console.log("PWA Service Worker registered with scope:", registration.scope);
          },
          (err) => {
            console.error("PWA Service Worker registration failed:", err);
          }
        );
      };

      if (document.readyState === "complete") {
        registerSW();
      } else {
        window.addEventListener("load", registerSW);
      }
    }

    // ── Intercept Android / Chrome install prompt ───────────────
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Check if user dismissed desktop version recently
      const lastDismissed = localStorage.getItem("fastcv_pwa_dismissed");
      let dismissedRecently = false;
      if (lastDismissed) {
        const diff = Date.now() - parseInt(lastDismissed, 10);
        const twoDaysInMs = 2 * 24 * 60 * 60 * 1000;
        if (diff < twoDaysInMs) {
          dismissedRecently = true;
        }
      }
      
      if (!dismissedRecently) {
        setShowInstallBanner(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    window.addEventListener("appinstalled", () => {
      setDeferredPrompt(null);
      setShowInstallBanner(false);
      setShowMobileBanner(false);
      console.log("FastCV PK Mobile App was successfully installed!");
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  // ── Mobile 5 Seconds Delay Banner ────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;

    const timer = setTimeout(() => {
      setTimerFired(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!timerFired) return;

    // Check if mobile banner was dismissed permanently
    const permanentlyDismissed = localStorage.getItem("fastcv_pwa_permanently_dismissed");
    if (permanentlyDismissed === "true") return;

    // Check if already running in standalone mode
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches || (navigator as any).standalone;
    if (isStandalone) return;

    if (isMobile) {
      setShowMobileBanner(true);
    }
  }, [timerFired, isMobile]);

  // ── Installer Action Handlers ────────────────────────────────
  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`PWA Installation outcome: ${outcome}`);
      setDeferredPrompt(null);
      setShowInstallBanner(false);
      setShowMobileBanner(false);
    } else {
      // Native prompt not supported or hasn't fired — show step by step overlay
      setShowInstructions(true);
    }
  };

  const handleDismissDesktop = () => {
    setShowInstallBanner(false);
    localStorage.setItem("fastcv_pwa_dismissed", Date.now().toString());
  };

  const handleDismissMobile = () => {
    setShowMobileBanner(false);
    localStorage.setItem("fastcv_pwa_permanently_dismissed", "true");
    toast(
      language === "ur" ? "بینر بند کر دیا گیا" : "Banner Dismissed",
      "info",
      language === "ur" ? "آپ بعد میں مینو سے ایپ انسٹال کر سکتے ہیں۔" : "You can install the app manually anytime from the browser settings."
    );
  };

  const isUrdu = language === "ur";

  return (
    <>
      {/* ── 1. Desktop / Captured Prompt Banner (Floating bottom right) ── */}
      {showInstallBanner && !isMobile && (
        <div 
          className="fixed bottom-6 right-6 z-50 max-w-sm w-[90vw] md:w-[360px] rounded-2xl border border-blue-500/20 bg-slate-950/90 backdrop-blur-md p-5 shadow-[0_10px_35px_rgba(59,130,246,0.25)] select-none animate-in slide-in-from-bottom-12 duration-500"
          dir={isUrdu ? "rtl" : "ltr"}
        >
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-blue-500/10 blur-[40px] pointer-events-none" />
          <button 
            onClick={handleDismissDesktop} 
            className="absolute top-3 right-3 text-textSecondary hover:text-white p-1 hover:bg-white/5 rounded-lg transition-all"
            aria-label="Close"
          >
            <X size={15} />
          </button>

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

          <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2">
            <button
              onClick={handleInstallClick}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs font-extrabold py-2.5 shadow-md shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-wider font-inter"
            >
              <Download size={13} />
              {isUrdu ? "موبائل ایپ ڈاؤن لوڈ کریں" : "Download Mobile App"}
            </button>
            <button
              onClick={handleDismissDesktop}
              className="rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 text-textSecondary hover:text-white text-xs font-semibold py-2.5 px-3 transition-colors uppercase font-inter"
            >
              {isUrdu ? "بند کریں" : "Later"}
            </button>
          </div>
        </div>
      )}

      {/* ── 2. Permanent Visible Bottom Mobile Banner (Fixed bottom of screen) ── */}
      {showMobileBanner && (
        <div 
          className="fixed bottom-0 left-0 right-0 z-40 bg-[#090D1A] border-t border-blue-500/20 p-4 flex flex-col space-y-3 shadow-[0_-8px_30px_rgba(0,0,0,0.6)] md:hidden animate-in slide-in-from-bottom duration-500 select-none"
          dir={isUrdu ? "rtl" : "ltr"}
        >
          <button 
            onClick={handleDismissMobile} 
            className="absolute top-2 right-2 text-textSecondary hover:text-white p-1"
            aria-label="Close"
          >
            <X size={16} className="text-white/40 hover:text-white" />
          </button>

          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600 rounded-lg text-white shadow-lg shadow-blue-500/10 flex-shrink-0 animate-pulse">
              <Smartphone size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs sm:text-sm font-bold text-white leading-normal truncate">
                {isUrdu ? "فاسٹ سی وی موبائل ایپ انسٹال کریں" : "FastCV PK App Install Karein"}
              </h4>
              <p className="text-[10px] sm:text-xs text-blue-400/90 font-medium truncate mt-0.5">
                {isUrdu ? "تیز ترین رسائی، آف لائن کام کرتی ہے" : "Faster access, works offline"}
              </p>
            </div>
            
            <button
              onClick={handleInstallClick}
              className="flex-shrink-0 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-black py-2 px-3.5 shadow-md shadow-blue-500/20 active:scale-95 transition-all uppercase tracking-wider font-inter"
            >
              {isUrdu ? "انسٹال" : "Install"}
            </button>
          </div>
        </div>
      )}

      {/* ── 3. Step-by-Step Installation Guidance Dialog ── */}
      {showInstructions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 select-none animate-in fade-in duration-300">
          <div 
            className="w-full max-w-sm rounded-2xl border border-blue-500/20 bg-slate-900 p-6 shadow-2xl space-y-4"
            dir={isUrdu ? "rtl" : "ltr"}
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h3 className="text-sm font-black text-white flex items-center gap-2 font-inter">
                <HelpCircle size={16} className="text-blue-400" />
                {isUrdu ? "ایپ کیسے انسٹال کریں؟" : "How to Install App"}
              </h3>
              <button 
                onClick={() => setShowInstructions(false)} 
                className="text-textSecondary hover:text-white p-1 rounded-lg"
              >
                <X size={15} />
              </button>
            </div>

            <div className="space-y-4 text-xs text-textSecondary leading-relaxed font-inter">
              {deviceType === "ios" ? (
                // iOS Safari Guidance
                <div className="space-y-3">
                  <p className="text-white font-semibold">Apple iPhone / Safari ke liye:</p>
                  <ol className="list-decimal pl-4 space-y-2 text-[11px]">
                    <li>Safari browser ke bottom mian share button <span className="text-blue-400 font-bold">[↑]</span> par tap karein.</li>
                    <li>Niche scroll karein aur <span className="text-white font-bold">"Add to Home Screen"</span> / <span className="text-white font-bold">"ہوم اسکرین پر شامل کریں"</span> select karein.</li>
                    <li>Top right par <span className="text-blue-400 font-bold">"Add"</span> button dabayein. FastCV PK app aap ke phone par chal jayegi!</li>
                  </ol>
                </div>
              ) : (
                // Android Chrome / Standard Guidance
                <div className="space-y-3">
                  <p className="text-white font-semibold">Android Phone / Chrome ke liye:</p>
                  <ol className="list-decimal pl-4 space-y-2 text-[11px]">
                    <li>Browser ke top right corner par three dots <span className="text-white font-bold">[⋮]</span> menu par tap karein.</li>
                    <li>List mein <span className="text-white font-bold">"Install app"</span> / <span className="text-white font-bold">"Add to Home screen"</span> par tap karein.</li>
                    <li>Aane wale prompt par <span className="text-blue-400 font-bold">"Install"</span> button par tap kar ke confirm karein.</li>
                  </ol>
                </div>
              )}
            </div>

            <button
              onClick={() => {
                setShowInstructions(false);
                setShowMobileBanner(false);
              }}
              className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-2.5 shadow-md shadow-blue-500/10 active:scale-95 transition-all uppercase"
            >
              {isUrdu ? "سمجھ آگیا" : "Got It"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
