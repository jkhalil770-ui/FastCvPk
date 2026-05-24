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
    <nav className="sticky top-0 z-30 w-full border-b border-white/8 bg-slate-950/90 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.05)]">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer-btn {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .login-btn-glow {
          background: linear-gradient(135deg, #3B82F6 0%, #6366F1 50%, #8B5CF6 100%);
          background-size: 200% auto;
          animation: shimmer-btn 3s linear infinite;
          box-shadow: 0 0 20px rgba(99,102,241,0.4), 0 0 40px rgba(99,102,241,0.1);
          transition: all 0.3s ease;
        }
        .login-btn-glow:hover {
          box-shadow: 0 0 30px rgba(99,102,241,0.6), 0 0 60px rgba(99,102,241,0.2);
          transform: translateY(-1px) scale(1.02);
        }
        .login-btn-glow:active {
          transform: translateY(0) scale(0.98);
        }
        .user-pill {
          background: linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(99,102,241,0.1) 100%);
          border: 1px solid rgba(99,102,241,0.25);
          backdrop-filter: blur(12px);
        }
        .logout-btn {
          background: linear-gradient(135deg, rgba(239,68,68,0.08) 0%, rgba(220,38,38,0.12) 100%);
          border: 1px solid rgba(239,68,68,0.2);
          transition: all 0.25s ease;
        }
        .logout-btn:hover {
          background: linear-gradient(135deg, rgba(239,68,68,0.18) 0%, rgba(220,38,38,0.22) 100%);
          border-color: rgba(239,68,68,0.4);
          box-shadow: 0 0 15px rgba(239,68,68,0.15);
          transform: translateY(-1px);
        }
      `}} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand Logo on the left */}
          <div className="flex items-center gap-1 sm:gap-3 flex-shrink min-w-0">
            <Link href="/" className="flex items-center gap-1 sm:gap-2.5 group flex-shrink min-w-0">
              <img 
                src="/logo.png" 
                alt="FastCV PK Logo" 
                className="h-8 w-8 sm:h-10 sm:w-10 object-contain rounded-md shadow-[0_0_15px_rgba(59,130,246,0.3)] group-hover:scale-105 transition-all duration-300 flex-shrink-0" 
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

          {/* Desktop Action Buttons — VIP Premium Style */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2">
                {/* User pill */}
                <div className="user-pill flex items-center gap-2 rounded-full px-3 py-1.5">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="avatar" className="w-6 h-6 rounded-full object-cover ring-2 ring-indigo-500/30" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-[10px] font-black">
                      {(user.displayName || user.email || "U")[0].toUpperCase()}
                    </div>
                  )}
                  <span className="text-xs font-semibold text-white/90 max-w-[90px] truncate">
                    {user.displayName?.split(" ")[0] || user.email?.split("@")[0]}
                  </span>
                </div>
                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="logout-btn flex items-center gap-1.5 rounded-full text-red-300/80 text-xs font-semibold px-3 py-1.5"
                >
                  <LogOut size={12} />
                  {getTranslation("logout", language)}
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="login-btn-glow flex items-center gap-2 rounded-full text-white text-xs font-bold px-5 py-2"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#fff" fillOpacity="0.9"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#fff" fillOpacity="0.9"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#fff" fillOpacity="0.9"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#fff" fillOpacity="0.9"/>
                </svg>
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
                <div className="user-pill flex items-center gap-2 rounded-full px-3 py-1.5">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="avatar" className="w-6 h-6 rounded-full object-cover ring-2 ring-indigo-500/30" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-[10px] font-black">
                      {(user.displayName || user.email || "U")[0].toUpperCase()}
                    </div>
                  )}
                  <span className="text-xs font-semibold text-white/90 max-w-[130px] truncate">
                    {user.displayName || user.email}
                  </span>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="logout-btn flex items-center gap-1.5 rounded-full text-red-300/80 text-xs font-semibold px-3 py-1.5"
                >
                  <LogOut size={13} />
                  {getTranslation("logout", language)}
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  handleLogin();
                  setMobileMenuOpen(false);
                }}
                className="login-btn-glow flex items-center justify-center gap-2 w-full rounded-full text-white font-bold py-3 text-sm"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#fff" fillOpacity="0.9"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#fff" fillOpacity="0.9"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#fff" fillOpacity="0.9"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#fff" fillOpacity="0.9"/>
                </svg>
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
