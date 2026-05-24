"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/LanguageContext";
import { getTranslation } from "@/lib/translations";
import { auth } from "@/lib/firebase";
import LanguageToggle from "@/components/layout/LanguageToggle";
import { onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useToast } from "@/components/ui/Toast";
import { Menu, X, User, LogOut, LayoutDashboard, Shield } from "lucide-react";

/**
 * Sticky Glassmorphic responsive navigation header.
 */
export function Navbar() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const pathname = usePathname();
  
  const [user, setUser] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");

  useEffect(() => {
    // Monitor environment Admin Email settings
    setAdminEmail(process.env.NEXT_PUBLIC_ADMIN_EMAIL || "");

    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      setUser(usr);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      toast(
        language === "ur" ? "لاگ ان کامیاب!" : "Logged in successfully!",
        "success",
        language === "ur" ? `خوش آمدید، ${res.user.displayName}` : `Welcome back, ${res.user.displayName}`
      );
    } catch (error: any) {
      console.error(error);
      toast(
        language === "ur" ? "لاگ ان ناکام!" : "Authentication Failed!",
        "error",
        error.message
      );
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast(
        language === "ur" ? "لاگ آؤٹ ہو گیا!" : "Signed out successfully!",
        "success"
      );
    } catch (err: any) {
      console.error(err);
    }
  };

  const isAdmin = user && user.email && adminEmail && (
    user.email === adminEmail || 
    adminEmail.split(",").map((e: string) => e.trim().toLowerCase()).includes(user.email.toLowerCase())
  );

  // Navigation Links array
  const navLinks = [
    { href: "/", labelKey: "home" },
    { href: "/templates", labelKey: "templates" },
    { href: "/blog", labelKey: "blog" },
  ];

  return (
    <nav className="sticky top-0 z-30 w-full border-b border-white/5 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand Logo on the left */}
          <div className="flex items-center gap-1 sm:gap-3 flex-shrink min-w-0">
            <Link href="/" className="flex items-center gap-1 sm:gap-2.5 group flex-shrink min-w-0">
              <img 
                src="/logo.png" 
                alt="FastCV PK Logo" 
                className="h-8 sm:h-10 w-auto object-contain rounded-md shadow-[0_0_15px_rgba(59,130,246,0.3)] group-hover:scale-105 transition-all duration-300 flex-shrink-0" 
              />
              <span className="bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-sm sm:text-xl font-extrabold text-transparent tracking-wider truncate max-w-[80px] min-[360px]:max-w-[120px] sm:max-w-none">
                {getTranslation("brandName", language)}
              </span>
            </Link>
            <div className="flex-shrink-0 scale-90 sm:scale-100 origin-left">
              <LanguageToggle />
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    active ? "text-blue-400" : "text-textSecondary hover:text-white"
                  }`}
                >
                  {getTranslation(link.labelKey, language)}
                </Link>
              );
            })}
            
            {/* Dashboard / Admin links if user is authenticated */}
            {user && (
              <Link
                href="/dashboard"
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                  pathname === "/dashboard" ? "text-blue-400" : "text-textSecondary hover:text-white"
                }`}
              >
                <LayoutDashboard size={15} />
                {getTranslation("dashboard", language)}
              </Link>
            )}

            {isAdmin && (
              <Link
                href="/admin"
                className={`flex items-center gap-1.5 text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors`}
              >
                <Shield size={15} />
                {getTranslation("admin", language)}
              </Link>
            )}
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 border border-white/5">
                  <User size={14} className="text-blue-400" />
                  <span className="text-xs font-semibold text-white max-w-[100px] truncate">
                    {user.displayName || user.email}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 rounded-lg border border-red-500/20 bg-red-950/20 hover:bg-red-950/50 text-red-200 text-xs font-semibold touch-btn px-3 py-1.5 transition-colors"
                >
                  <LogOut size={13} />
                  {getTranslation("logout", language)}
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="flex items-center gap-1.5 rounded-lg border border-blue-500/20 bg-blue-950/30 hover:bg-blue-950/60 text-blue-300 text-xs font-semibold touch-btn px-4 py-2 transition-all duration-300 active:scale-95"
              >
                <User size={13} />
                {getTranslation("login", language)}
              </button>
            )}
          </div>

          {/* Mobile Hamburguer Toggle Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-textSecondary hover:text-white hover:bg-white/5 touch-btn"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/5 bg-slate-950 px-4 py-3 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-base font-medium text-textSecondary hover:text-white hover:bg-white/5"
            >
              {getTranslation(link.labelKey, language)}
            </Link>
          ))}
          
          {user && (
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-base font-medium text-textSecondary hover:text-white hover:bg-white/5"
            >
              <LayoutDashboard size={16} />
              {getTranslation("dashboard", language)}
            </Link>
          )}

          {isAdmin && (
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-base font-medium text-amber-400 hover:bg-white/5"
            >
              <Shield size={16} />
              {getTranslation("admin", language)}
            </Link>
          )}

          <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
            {user ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 border border-white/5 rounded-lg text-xs text-white max-w-[200px] truncate">
                  <User size={13} className="text-blue-400" />
                  {user.displayName || user.email}
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-1 text-red-400 hover:text-red-300 text-sm font-semibold"
                >
                  <LogOut size={14} />
                  {getTranslation("logout", language)}
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  handleLogin();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-1.5 w-full rounded-lg border border-blue-500/20 bg-blue-950/40 text-blue-300 touch-btn py-2 text-sm font-semibold"
              >
                <User size={15} />
                {getTranslation("login", language)}
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
export default Navbar;
