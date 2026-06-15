"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  getRedirectResult,
} from "firebase/auth";
import { useToast } from "@/components/ui/Toast";
import { useLanguage } from "@/lib/LanguageContext";
import { Eye, EyeOff, Mail, Lock, ShieldAlert, User, Check, AlertCircle, Loader } from "lucide-react";

function generateCaptcha() {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  return { question: `${a} + ${b}`, answer: a + b };
}

function calculatePasswordStrength(pw: string) {
  if (!pw) return { score: 0, text: "", color: "bg-transparent" };
  if (pw.length < 6) return { score: 1, text: "Weak", color: "bg-red-500" };
  if (pw.length >= 8 && /\d/.test(pw)) return { score: 3, text: "Strong", color: "bg-emerald-500" };
  return { score: 2, text: "Medium", color: "bg-yellow-500" };
}

function SignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") || "/dashboard";
  const { toast } = useToast();
  const { language } = useLanguage();

  const [step, setStep] = useState(1); // 1: Form, 2: Verify Email, 3: Success

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Verification Step State
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Handle Firebase redirect result
    const checkRedirect = async () => {
      try {
        const res = await getRedirectResult(auth);
        if (res) {
          setLoading(true);
          await syncUserToDatabase(
            res.user.uid,
            res.user.email || "",
            res.user.displayName || ""
          );
          setStep(3);
          setTimeout(() => router.push(returnUrl), 2000);
        }
      } catch (error: any) {
        console.error("Redirect signup error:", error);
        setLoading(false);
        if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
          return;
        }
        triggerShake();
        toast("Signup Failed", "error", error.message);
      }
    };
    checkRedirect();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => setResendTimer(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const pwStrength = calculatePasswordStrength(password);

  const syncUserToDatabase = async (uid: string, userEmail: string, userName: string) => {
    try {
      await setDoc(
        doc(db, "users", uid),
        {
          uid,
          name: userName || userEmail.split("@")[0],
          email: userEmail,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          role: "user"
        },
        { merge: true }
      );
    } catch (dbErr) {
      console.error("Firestore sync failed:", dbErr);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });

      // Detect mobile device
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

      if (isMobile) {
        await signInWithRedirect(auth, provider);
      } else {
        const res = await signInWithPopup(auth, provider);
        await syncUserToDatabase(
          res.user.uid,
          res.user.email || "",
          res.user.displayName || ""
        );

        // Google accounts are auto-verified
        setStep(3);
        setTimeout(() => router.push(returnUrl), 2000);
      }
    } catch (error: any) {
      console.error(error);
      setLoading(false);
      if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
        return; // Suppress error if user just closed the popup
      }
      triggerShake();
      toast("Signup Failed", "error", error.message);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const newErrors: Record<string, string> = {};

    if (!name) newErrors.name = "Required";
    if (!email) newErrors.email = "Required";
    if (!password) newErrors.password = "Required";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!agreeTerms) newErrors.terms = "You must agree to terms";
    if (parseInt(captchaInput) !== captcha.answer) {
      newErrors.captcha = "Wrong answer";
      setCaptcha(generateCaptcha());
      setCaptchaInput("");
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      triggerShake();
      return;
    }

    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await syncUserToDatabase(res.user.uid, res.user.email || "", name);
      
      // Send verification email
      await sendEmailVerification(res.user);
      
      setResendTimer(60);
      setLoading(false);
      setStep(2); // Move to Verify step
    } catch (error: any) {
      console.error(error);
      triggerShake();
      setLoading(false);
      
      if (error.code === "auth/email-already-in-use") {
        setErrors({ email: language === "ur" ? "یہ ای میل پہلے سے موجود ہے۔" : "Email already in use." });
      } else if (error.code === "auth/weak-password") {
        setErrors({ password: language === "ur" ? "پاسورڈ بہت کمزور ہے۔" : "Password is too weak." });
      } else {
        toast("Error", "error", error.message);
      }
    }
  };

  const handleResendVerification = async () => {
    if (resendTimer > 0) return;
    const currentUser = auth.currentUser;
    if (currentUser) {
      try {
        await sendEmailVerification(currentUser);
        setResendTimer(60);
        toast("Email Sent", "success", "Verification email has been resent.");
      } catch (err: any) {
        toast("Error", "error", err.message);
      }
    }
  };

  const handleCheckVerification = async () => {
    setLoading(true);
    const currentUser = auth.currentUser;
    if (currentUser) {
      try {
        // Force refresh user token to get updated emailVerified status
        await currentUser.reload();
        if (currentUser.emailVerified) {
          setLoading(false);
          setStep(3); // Success!
          setTimeout(() => router.push(returnUrl), 2000);
        } else {
          setLoading(false);
          triggerShake();
          toast(
            language === "ur" ? "ای میل ابھی تصدیق نہیں ہوئی۔" : "Email not verified yet.", 
            "error",
            language === "ur" ? "براہ کرم لنک پر کلک کریں۔" : "Please click the link in your email first."
          );
        }
      } catch (e: any) {
        setLoading(false);
        console.error(e);
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col md:flex-row bg-[#0B1120] relative overflow-hidden">
      {/* LEFT COLUMN: BRANDING & PREVIEWS */}
      <div className="hidden md:flex w-1/2 relative flex-col justify-center items-center p-12 overflow-hidden border-r border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[30%] right-[20%] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
          <div className="absolute bottom-[10%] left-[20%] w-[300px] h-[300px] bg-indigo-600/20 rounded-full blur-[100px] mix-blend-screen animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="relative z-10 text-center max-w-lg mx-auto">
          <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-4 tracking-tight drop-shadow-2xl">
            Join Pakistan's #1<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              CV Maker Platform
            </span>
          </h1>
          <p className="text-2xl font-urdu text-blue-200/80 mb-12">
            ہزاروں کامیاب امیدواروں میں شامل ہوں
          </p>

          <div className="relative h-[250px] w-full flex justify-center items-center">
             {/* Abstract UI Elements */}
             <div className="absolute right-10 top-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-transparent border border-blue-500/30 rounded-2xl animate-float" style={{ animationDuration: '6s' }}></div>
             <div className="absolute left-10 bottom-0 w-40 h-24 bg-gradient-to-tr from-indigo-500/20 to-transparent border border-indigo-500/30 rounded-full animate-float" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
             <div className="z-10 bg-slate-800/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl flex items-center gap-4 animate-in zoom-in duration-1000">
               <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                 <Check className="text-emerald-400" size={24} />
               </div>
               <div className="text-left">
                 <div className="text-white font-bold">100% Free Access</div>
                 <div className="text-slate-400 text-sm">Create, Edit, Download</div>
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: SIGNUP FLOW */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-4 md:p-8 relative z-10 overflow-y-auto">
        <div 
          className={`w-full max-w-[420px] bg-[#0F172A]/90 backdrop-blur-2xl border border-blue-500/20 rounded-3xl p-8 sm:p-10 shadow-[0_32px_64px_rgba(0,0,0,0.5)] transform transition-all duration-400 ${shake ? "animate-shake border-red-500/50 shadow-[0_0_40px_rgba(239,68,68,0.2)]" : ""} translate-y-0 opacity-100`}
        >
          {/* Mobile Progress Dots */}
          <div className="md:hidden flex justify-center gap-2 mb-6">
            {[1, 2, 3].map(i => (
              <div key={i} className={`h-2 rounded-full transition-all ${step >= i ? 'w-6 bg-blue-500' : 'w-2 bg-slate-700'}`} />
            ))}
          </div>

          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="text-center mb-6">
                <h2 className="text-[28px] font-bold text-white leading-tight">Create Account</h2>
                <p className="text-textSecondary mt-1 font-urdu text-[16px]">اکاؤنٹ بنائیں</p>
              </div>

              {/* Google Auth */}
              <button
                type="button"
                onClick={handleGoogle}
                disabled={loading}
                className="w-full h-[52px] flex items-center justify-center gap-3 bg-white text-[#1a1a1a] font-bold rounded-xl border border-slate-200 hover:scale-[1.01] hover:shadow-[0_8px_20px_rgba(255,255,255,0.1)] transition-all active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 mb-6"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>

              <div className="flex items-center gap-4 mb-6 opacity-60">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-500"></div>
                <span className="text-xs font-medium text-slate-300 uppercase tracking-widest">OR</span>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-slate-500"></div>
              </div>

              <form onSubmit={handleSignupSubmit} className="space-y-4">
                {/* Full Name */}
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-400 transition-colors">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    className={`w-full h-[52px] bg-slate-900/50 border ${errors.name ? 'border-red-500/50' : 'border-slate-700/50'} rounded-xl pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all`}
                    disabled={loading}
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1 ml-1">{errors.name}</p>}
                </div>

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
                    className={`w-full h-[52px] bg-slate-900/50 border ${errors.email ? 'border-red-500/50' : 'border-slate-700/50'} rounded-xl pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all`}
                    disabled={loading}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1 ml-1">{errors.email}</p>}
                </div>

                {/* Password Field */}
                <div className="space-y-1">
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-400 transition-colors">
                      <Lock size={18} />
                    </div>
                    <input
                      type={showPw ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      className={`w-full h-[52px] bg-slate-900/50 border ${errors.password ? 'border-red-500/50' : 'border-slate-700/50'} rounded-xl pl-12 pr-12 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all`}
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw(!showPw)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                    >
                      {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {/* Strength Bar */}
                  {password.length > 0 && (
                    <div className="flex gap-1 h-1.5 mt-2 px-1">
                      {[1, 2, 3].map(i => (
                        <div key={i} className={`flex-1 rounded-full transition-colors ${pwStrength.score >= i ? pwStrength.color : 'bg-slate-700'}`} />
                      ))}
                    </div>
                  )}
                  {errors.password && <p className="text-red-400 text-xs mt-1 ml-1">{errors.password}</p>}
                </div>

                {/* Confirm Password Field */}
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-400 transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPw ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    className={`w-full h-[52px] bg-slate-900/50 border ${errors.confirmPassword ? 'border-red-500/50' : 'border-slate-700/50'} rounded-xl pl-12 pr-12 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all`}
                    disabled={loading}
                  />
                  {confirmPassword.length > 0 && confirmPassword === password && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400 animate-in zoom-in">
                      <Check size={18} />
                    </div>
                  )}
                  {errors.confirmPassword && <p className="text-red-400 text-xs mt-1 ml-1">{errors.confirmPassword}</p>}
                </div>

                {/* CAPTCHA */}
                <div className="flex items-center justify-between gap-4">
                  <div className="w-1/2 flex items-center gap-2 bg-slate-900/50 border border-slate-700/50 rounded-xl p-1.5 focus-within:border-blue-500 transition-colors">
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
                  {errors.captcha && <p className="text-red-400 text-xs flex-1">{errors.captcha}</p>}
                </div>

                {/* Terms */}
                <label className="flex items-start gap-3 mt-4 cursor-pointer group">
                  <div className="relative flex items-center mt-0.5">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="peer appearance-none w-5 h-5 rounded bg-slate-900 border border-slate-600 checked:bg-blue-500 checked:border-blue-500 transition-all cursor-pointer"
                      disabled={loading}
                    />
                    <Check size={14} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                      I agree to Terms & Privacy Policy
                    </span>
                    <span className="text-xs text-slate-500 font-urdu mt-0.5">میں شرائط و ضوابط سے متفق ہوں</span>
                  </div>
                </label>
                {errors.terms && <p className="text-red-400 text-xs ml-8">{errors.terms}</p>}

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
                        Create Account <span className="opacity-50 font-light px-1">|</span> <span className="font-urdu font-medium text-lg">اکاؤنٹ بنائیں</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Footer */}
              <div className="mt-6 text-center border-t border-white/10 pt-6">
                <Link 
                  href={`/login?returnUrl=${encodeURIComponent(returnUrl)}`}
                  className="group inline-flex flex-col items-center hover:opacity-80 transition-opacity"
                >
                  <span className="text-sm text-textSecondary group-hover:text-white transition-colors">
                    Already have account? <span className="text-blue-400 font-semibold ml-1">Sign In →</span>
                  </span>
                  <span className="font-urdu text-sm text-slate-400 mt-1">
                    پہلے سے اکاؤنٹ ہے؟ <span className="text-blue-400 font-medium">سائن ان کریں</span>
                  </span>
                </Link>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in slide-in-from-right-8 fade-in duration-500 text-center py-4">
              <div className="w-24 h-24 bg-blue-500/10 border border-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                <div className="absolute inset-0 rounded-full bg-blue-400/20 animate-ping opacity-75" style={{ animationDuration: '3s' }}></div>
                <Mail className="text-blue-400 w-10 h-10 relative z-10" />
              </div>
              
              <h2 className="text-[28px] font-bold text-white mb-2">Check Your Email</h2>
              <p className="text-textSecondary font-urdu text-[16px] mb-6">اپنی ای میل چیک کریں</p>

              <div className="bg-slate-900/50 border border-white/5 rounded-xl p-4 mb-8">
                <p className="text-sm text-slate-300 mb-1">We sent a verification link to:</p>
                <p className="text-blue-400 font-medium">{email}</p>
                <div className="w-full h-px bg-white/5 my-3"></div>
                <p className="text-sm text-slate-400 font-urdu">ہم نے تصدیقی لنک بھیجا ہے</p>
              </div>

              <p className="text-sm text-slate-300 mb-2">Click the link in the email to verify your account.</p>
              <p className="text-xs text-slate-500 font-urdu mb-8">اکاؤنٹ تصدیق کیلئے ای میل میں دیئے گئے لنک پر کلک کریں۔</p>

              <div className="space-y-4">
                <button
                  onClick={handleCheckVerification}
                  disabled={loading}
                  className="w-full h-[52px] bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transform transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:pointer-events-none"
                >
                  {loading ? <Loader className="animate-spin" size={20} /> : "I've Verified — Continue →"}
                </button>

                <button
                  onClick={handleResendVerification}
                  disabled={resendTimer > 0}
                  className="w-full h-[52px] bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex flex-col items-center justify-center"
                >
                  <span className="text-sm">{resendTimer > 0 ? `Resend in ${resendTimer}s` : "Didn't receive? Resend Email"}</span>
                  {resendTimer === 0 && <span className="text-xs text-slate-500 font-urdu mt-0.5">نہیں ملی؟ دوبارہ بھیجیں</span>}
                </button>
              </div>

              <button
                onClick={() => setStep(1)}
                className="mt-8 text-xs text-slate-500 hover:text-slate-300 transition-colors"
              >
                Use different email
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="py-12 flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
              <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 relative">
                 <div className="absolute inset-0 rounded-full border border-emerald-500/30 animate-ping" style={{ animationDuration: '2s' }}></div>
                 <div className="w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.6)] animate-bounce" style={{ animationDuration: '2s' }}>
                   <Check size={32} strokeWidth={3} />
                 </div>
              </div>
              <h2 className="text-[28px] font-bold text-white mb-2">Account Created! 🎉</h2>
              <p className="text-emerald-400 font-urdu text-[18px] mb-6">اکاؤنٹ بن گیا!</p>
              
              <p className="text-slate-300 mb-1">Welcome to FastCV PK, {name || "User"}!</p>
              <p className="text-slate-400 font-urdu mb-8">FastCV PK میں خوش آمدید، {name || "صارف"}!</p>

              <div className="flex items-center gap-2 text-blue-400 text-sm bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full">
                <Loader className="animate-spin w-4 h-4" />
                Redirecting to dashboard...
              </div>
            </div>
          )}
        </div>
      </div>
      
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

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0B1120] flex items-center justify-center text-white"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" /></div>}>
      <SignupContent />
    </Suspense>
  );
}
