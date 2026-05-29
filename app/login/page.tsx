"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useToast } from "@/components/ui/Toast";
import { useLanguage } from "@/lib/LanguageContext";
import { Eye, EyeOff, Mail, Lock, ShieldAlert, Loader } from "lucide-react";

function generateCaptcha() {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  return { question: `${a} + ${b}`, answer: a + b };
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") || "/dashboard";
  const { toast } = useToast();
  const { language } = useLanguage();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [shake, setShake] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Card animation state
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Carousel timer
    const interval = setInterval(() => {
      setActiveCard(prev => (prev + 1) % 3);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const syncUserToDatabase = async (uid: string, userEmail: string, name: string) => {
    try {
      await setDoc(
        doc(db, "users", uid),
        {
          uid,
          name: name || userEmail.split("@")[0],
          email: userEmail,
          updatedAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        },
        { merge: true }
      );
    } catch (dbErr) {
      console.error("Firestore sync failed:", dbErr);
    }
  };

  const showSuccessAndRedirect = (name?: string) => {
    setSuccess(true);
    toast(
      language === "ur" ? "کامیابی سے لاگ ان ہوئے ✓" : "Login successful! ✓",
      "success",
      language === "ur" ? "منتقل کیا جا رہا ہے..." : "Redirecting..."
    );
    setTimeout(() => {
      router.push(returnUrl);
    }, 1200);
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const res = await signInWithPopup(auth, provider);
      
      await syncUserToDatabase(
        res.user.uid,
        res.user.email || "",
        res.user.displayName || ""
      );

      showSuccessAndRedirect(res.user.displayName || "");
    } catch (error: any) {
      console.error(error);
      setLoading(false);
      if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
        return; // Suppress error if user just closed the popup
      }
      triggerShake();
      toast(
        language === "ur" ? "لاگ ان ناکام" : "Login Failed", 
        "error", 
        error.message
      );
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const newErrors: Record<string, string> = {};

    if (!email) newErrors.email = "Required";
    if (!password) newErrors.password = "Required";
    if (parseInt(captchaInput) !== captcha.answer) {
      newErrors.captcha = "Wrong answer";
      triggerShake();
      setCaptcha(generateCaptcha());
      setCaptchaInput("");
      setErrors(newErrors);
      return;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      triggerShake();
      return;
    }

    setLoading(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      await syncUserToDatabase(res.user.uid, res.user.email || "", res.user.displayName || "");
      showSuccessAndRedirect(res.user.displayName || "");
    } catch (error: any) {
      console.error(error);
      triggerShake();
      setLoading(false);
      
      if (error.code === "auth/wrong-password" || error.code === "auth/invalid-credential") {
        setErrors({ password: language === "ur" ? "غلط پاسورڈ۔ دوبارہ کوشش کریں۔" : "Incorrect password. Try again." });
      } else if (error.code === "auth/user-not-found") {
        setErrors({ email: language === "ur" ? "اس ای میل پر کوئی اکاؤنٹ نہیں۔" : "No account found with this email." });
      } else {
        toast("Error", "error", error.message);
      }
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setErrors({ email: language === "ur" ? "پاسورڈ ری سیٹ کے لئے ای میل درج کریں۔" : "Enter email to reset password." });
      triggerShake();
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      toast(
        language === "ur" ? "ای میل بھیج دی گئی" : "Email Sent",
        "success",
        language === "ur" ? "پاسورڈ ری سیٹ لنک ای میل کر دیا گیا ہے۔" : "Password reset link sent to your email."
      );
    } catch (error: any) {
      console.error(error);
      toast("Error", "error", error.message);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col md:flex-row bg-[#0B1120] relative overflow-hidden">
      {/* LEFT COLUMN: BRANDING & PREVIEWS (Hidden on Mobile) */}
      <div className="hidden md:flex w-1/2 relative flex-col justify-center items-center p-12 overflow-hidden border-r border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[20%] left-[20%] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
          <div className="absolute bottom-[20%] right-[20%] w-[300px] h-[300px] bg-purple-600/20 rounded-full blur-[100px] mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="relative z-10 text-center max-w-lg mx-auto">
          <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-4 tracking-tight drop-shadow-2xl">
            Pakistan ka #1<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              Free CV Maker
            </span>
          </h1>
          <p className="text-2xl font-urdu text-blue-200/80 mb-12">
            پاکستان کا نمبر ون مفت سی وی میکر
          </p>

          <div className="relative h-[280px] w-full flex justify-center items-center perspective-1000">
            {/* Card 1 - ATS */}
            <div className={`absolute w-[200px] h-[260px] bg-white rounded-xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${activeCard === 0 ? 'opacity-100 scale-100 translate-y-0 rotate-0 z-20' : activeCard === 1 ? 'opacity-0 scale-95 -translate-y-8 -rotate-3 z-0' : 'opacity-0 scale-95 translate-y-8 rotate-3 z-0'}`}>
              <div className="w-full h-full flex flex-col font-sans text-left p-4">
                <div className="text-center mb-3">
                  <span className="text-[16px] font-black text-slate-900 leading-tight block">Ayesha Malik</span>
                  <span className="text-[7px] font-bold text-blue-600 uppercase tracking-wider mt-0.5 block">Marketing Manager</span>
                </div>
                <div className="h-[2px] bg-blue-600 w-full mb-3" />
                <div className="mb-3">
                  <span className="block text-[8px] font-bold text-slate-900 border-b border-slate-200 pb-0.5 mb-1.5 uppercase">Summary</span>
                  <div className="space-y-1 mt-1.5">
                    <div className="h-1.5 bg-slate-200 w-full rounded"></div>
                    <div className="h-1.5 bg-slate-200 w-5/6 rounded"></div>
                    <div className="h-1.5 bg-slate-200 w-4/5 rounded"></div>
                  </div>
                </div>
                <div className="mb-3">
                  <span className="block text-[8px] font-bold text-slate-900 border-b border-slate-200 pb-0.5 mb-1.5 uppercase">Experience</span>
                  <div className="space-y-1 mt-1.5">
                    <div className="h-1.5 bg-slate-200 w-3/4 rounded"></div>
                    <div className="h-1.5 bg-slate-200 w-full rounded"></div>
                    <div className="h-1.5 bg-slate-200 w-5/6 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Card 2 - Global Pro */}
            <div className={`absolute w-[200px] h-[260px] bg-slate-900 rounded-xl border border-blue-500/40 shadow-[0_20px_50px_rgba(59,130,246,0.3)] overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${activeCard === 1 ? 'opacity-100 scale-100 translate-y-0 rotate-0 z-20' : activeCard === 2 ? 'opacity-0 scale-95 -translate-y-8 -rotate-3 z-0' : 'opacity-0 scale-95 translate-y-8 rotate-3 z-0'}`}>
              <img src="/images/globalavatar.png" alt="Global Pro" className="w-full h-full object-cover object-top" />
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-950 to-transparent"></div>
              <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-purple-600/90 text-white text-[8px] font-black uppercase tracking-wider backdrop-blur-sm border border-purple-400/30">
                🌍 Global Pro
              </div>
            </div>

            {/* Card 3 - Biodata */}
            <div className={`absolute w-[200px] h-[260px] bg-[#FCFBF7] rounded-xl border border-emerald-600/60 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] text-right ${activeCard === 2 ? 'opacity-100 scale-100 translate-y-0 rotate-0 z-20' : activeCard === 0 ? 'opacity-0 scale-95 -translate-y-8 -rotate-3 z-0' : 'opacity-0 scale-95 translate-y-8 rotate-3 z-0'}`}>
              <div className="p-4 h-full flex flex-col relative">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-5 pointer-events-none"></div>
                <span className="text-[7px] text-emerald-600 text-center font-bold mb-1.5 block">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
                <div className="text-center mb-2">
                  <span className="text-[16px] text-emerald-800 font-extrabold block leading-tight">عثمان طارق</span>
                  <span className="text-[7px] text-slate-500 font-bold block mt-0.5">سوانح حیات (بائیو ڈیٹا)</span>
                </div>
                <div className="h-[1.5px] bg-emerald-600 w-2/3 mx-auto mb-3" />
                <div className="mb-3">
                  <div className="flex justify-end gap-2 mb-1.5"><span className="text-[7px] text-slate-700">والد کا نام:</span><span className="text-[7px] font-bold text-emerald-800">طارق محمود</span></div>
                  <div className="flex justify-end gap-2 mb-1.5"><span className="text-[7px] text-slate-700">تاریخ پیدائش:</span><span className="text-[7px] font-bold text-emerald-800">1995-08-14</span></div>
                  <div className="flex justify-end gap-2 mb-1.5"><span className="text-[7px] text-slate-700">شہر:</span><span className="text-[7px] font-bold text-emerald-800">لاہور، پاکستان</span></div>
                </div>
                <div className="bg-emerald-50 border border-emerald-100 rounded px-2 py-1.5 text-[7px] text-emerald-700 font-medium text-center mt-auto shadow-sm">
                  مزید تفصیلات...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: LOGIN FORM */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-4 md:p-8 relative z-10">
        <div 
          className={`w-full max-w-[420px] bg-[#0F172A]/90 backdrop-blur-2xl border border-blue-500/20 rounded-3xl p-8 sm:p-10 shadow-[0_32px_64px_rgba(0,0,0,0.5)] transform transition-all duration-400 ${shake ? "animate-shake border-red-500/50 shadow-[0_0_40px_rgba(239,68,68,0.2)]" : ""} translate-y-0 opacity-100 animate-in slide-in-from-bottom-8`}
        >
          {success ? (
            <div className="py-12 flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
                <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Login Successful!</h2>
              <p className="text-emerald-400 font-urdu text-lg">کامیابی سے لاگ ان ہو گئے</p>
              <div className="mt-8 flex items-center gap-2 text-textSecondary text-sm">
                <Loader className="animate-spin w-4 h-4" />
                Redirecting...
              </div>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <img src="/logo.png" alt="FastCV PK" className="w-10 h-10 mx-auto mb-4 drop-shadow-[0_0_15px_rgba(59,130,246,0.4)]" />
                <h2 className="text-[28px] font-bold text-white leading-tight">Welcome Back</h2>
                <p className="text-textSecondary mt-1 font-urdu text-[16px]">دوبارہ خوش آمدید</p>
              </div>

              {/* Google Auth */}
              <button
                type="button"
                onClick={handleGoogle}
                disabled={loading}
                className="w-full h-[52px] flex items-center justify-center gap-3 bg-white text-[#1a1a1a] font-bold rounded-xl border border-slate-200 hover:scale-[1.01] hover:shadow-[0_8px_20px_rgba(255,255,255,0.1)] transition-all active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>

              <div className="flex items-center gap-4 my-6 opacity-60">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-500"></div>
                <span className="text-xs font-medium text-slate-300 uppercase tracking-widest">OR</span>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-slate-500"></div>
              </div>

              {/* Form */}
              <form onSubmit={handleEmailLogin} className="space-y-4">
                
                {/* Email Field */}
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-400 transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={`w-full h-[52px] bg-slate-900/50 border ${errors.email ? 'border-red-500/50' : 'border-slate-700/50'} rounded-xl pl-12 pr-4 text-white placeholder-transparent focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all peer`}
                    disabled={loading}
                  />
                  <label className="absolute left-12 -top-2.5 bg-[#0F172A] px-1 text-xs text-slate-400 peer-focus:text-blue-400 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-slate-500 peer-focus:-top-2.5 peer-focus:text-xs transition-all pointer-events-none">
                    Email Address
                  </label>
                  {errors.email && <p className="text-red-400 text-xs mt-1 ml-1">{errors.email}</p>}
                </div>

                {/* Password Field */}
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-400 transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className={`w-full h-[52px] bg-slate-900/50 border ${errors.password ? 'border-red-500/50' : 'border-slate-700/50'} rounded-xl pl-12 pr-12 text-white placeholder-transparent focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all peer`}
                    disabled={loading}
                  />
                  <label className="absolute left-12 -top-2.5 bg-[#0F172A] px-1 text-xs text-slate-400 peer-focus:text-blue-400 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-slate-500 peer-focus:-top-2.5 peer-focus:text-xs transition-all pointer-events-none">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  >
                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  {errors.password && <p className="text-red-400 text-xs mt-1 ml-1">{errors.password}</p>}
                </div>

                {/* CAPTCHA & Forgot Password row */}
                <div className="flex items-center justify-between gap-4 pt-1">
                  <div className="flex-1 flex items-center gap-2 bg-slate-900/50 border border-slate-700/50 rounded-xl p-1.5 focus-within:border-blue-500 transition-colors">
                    <div className="bg-slate-800 rounded-lg p-2 text-slate-300 flex items-center gap-1.5">
                      <ShieldAlert size={14} className="text-blue-400" />
                      <span className="text-xs font-bold tracking-widest whitespace-nowrap">{captcha.question} =</span>
                    </div>
                    <input
                      type="number"
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      placeholder="?"
                      className="w-full bg-transparent text-white text-sm focus:outline-none placeholder-slate-600 px-1"
                      disabled={loading}
                    />
                  </div>
                  <button 
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-xs text-blue-400 hover:text-blue-300 text-right whitespace-nowrap transition-colors flex flex-col items-end"
                  >
                    <span>Forgot Password?</span>
                    <span className="font-urdu text-textSecondary opacity-70">پاسورڈ بھول گئے؟</span>
                  </button>
                </div>
                {errors.captcha && <p className="text-red-400 text-xs ml-1">{errors.captcha}</p>}

                {/* Submit */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-[52px] bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transform transition-all hover:scale-[1.01] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:pointer-events-none"
                  >
                    {loading ? (
                      <Loader className="animate-spin" size={20} />
                    ) : (
                      <>
                        Sign In <span className="opacity-50 font-light px-1">|</span> <span className="font-urdu font-medium text-lg">سائن ان</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Footer */}
              <div className="mt-8 text-center border-t border-white/10 pt-6">
                <Link 
                  href={`/signup?returnUrl=${encodeURIComponent(returnUrl)}`}
                  className="group inline-flex flex-col items-center hover:opacity-80 transition-opacity"
                >
                  <span className="text-sm text-textSecondary group-hover:text-white transition-colors">
                    Don't have account? <span className="text-blue-400 font-semibold ml-1">Sign Up →</span>
                  </span>
                  <span className="font-urdu text-sm text-slate-400 mt-1">
                    اکاؤنٹ نہیں؟ <span className="text-blue-400 font-medium">سائن اپ کریں</span>
                  </span>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Global Animations Addendum */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0% { transform: translateY(0px) rotate(var(--rotate, 0deg)); }
          50% { transform: translateY(-15px) rotate(var(--rotate, 0deg)); }
          100% { transform: translateY(0px) rotate(var(--rotate, 0deg)); }
        }
        .animate-float {
          animation: float ease-in-out infinite;
        }
      `}} />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0B1120] flex items-center justify-center text-white"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" /></div>}>
      <LoginContent />
    </Suspense>
  );
}
