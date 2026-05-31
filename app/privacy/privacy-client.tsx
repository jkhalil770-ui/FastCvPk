"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { ShieldCheck, ArrowLeft, Lock, FileText, CheckCircle2 } from "lucide-react";

export default function PrivacyPolicyPage() {
  const { language } = useLanguage();
  const isUrdu = language === "ur";

  return (
    <div className="flex-grow w-full bg-[#0F172A] relative py-16 px-4 sm:px-6 lg:px-8">
      <title>{isUrdu ? "پرائیویسی پالیسی — FastCV PK" : "Privacy Policy — FastCV PK"}</title>
      <meta name="description" content="FastCV PK Privacy Policy. Learn how we protect your personal credentials, Firebase database records, and secure Gemini AI parsing." />
      
      {/* Background radial neon glows */}
      <div className="absolute top-[20%] left-[-10%] w-[35vw] h-[35vw] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-4xl relative z-10 space-y-8">
        
        {/* Navigation back and header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-400 text-xs font-semibold">
              <ShieldCheck size={13} />
              {isUrdu ? "پرائیویسی پالیسی" : "Security & Privacy"}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {isUrdu ? "پرائیویسی پالیسی (Privacy Policy)" : "Privacy Policy"}
            </h1>
            <p className="text-xs text-textSecondary">
              {isUrdu ? "آخری ترمیم: 24 مئی 2026" : "Last Updated: May 24, 2026"}
            </p>
          </div>
          
          <Link href="/">
            <Button variant="secondary" className="gap-1.5 text-xs touch-btn py-2">
              <ArrowLeft size={13} />
              {isUrdu ? "ہوم پیج" : "Back to Home"}
            </Button>
          </Link>
        </div>

        {/* Dynamic content card wrapper */}
        <Card className="p-6 sm:p-10 border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 text-white/5 pointer-events-none">
            <Lock size={120} />
          </div>

          {isUrdu ? (
            /* ================= URDU VERSION ================= */
            <div className="space-y-8 text-right font-inter leading-relaxed text-slate-300">
              <div className="text-sm border-r-4 border-blue-500 pr-4 py-1 text-white font-semibold">
                FastCV PK پر آپ کا ڈیٹا اور پرائیویسی ہمارے لیے انتہائی اہم ہیں۔ ہم جدید ترین حفاظتی اقدامات کے تحت آپ کی معلومات کو محفوظ رکھتے ہیں۔
              </div>

              {/* Section 1 */}
              <div className="space-y-3">
                <h2 className="text-lg font-black text-white flex items-center justify-start gap-2 border-b border-white/5 pb-2">
                  <span className="text-blue-400">1.</span> معلومات جو ہم جمع کرتے ہیں (Data Collection)
                </h2>
                <p className="text-xs">
                  جب آپ ہماری سروس پر سی وی یا بائیو ڈیٹا تیار کرتے ہیں، تو ہم درج ذیل معلومات حاصل کرتے ہیں تاکہ آپ کی فائل بہتر طریقے سے جنریٹ ہو سکے:
                </p>
                <ul className="list-disc pr-6 text-xs space-y-1.5">
                  <li><strong>ذاتی معلومات:</strong> پورا نام، ای میل، فون نمبر، پتہ، تعلیمی ریکارڈ، ملازمت کا تجربہ، اور مہارتیں۔</li>
                  <li><strong>ادائیگی کا ثبوت:</strong> جب آپ واٹر مارک ہٹانے کے لیے ادائیگی کرتے ہیں تو آپ کا نام، ای میل، اور ٹرانزیکشن آئی ڈی (NayaPay/EasyPaisa) ہمارے ایڈمن پینل میں محفوظ ہوتی ہے۔</li>
                  <li><strong>فائلز اور تصاویر:</strong> آپ کی اپ لوڈ کردہ تصاویر (اگر آپ گلوبل پرو ٹیمپلیٹ استعمال کریں)۔</li>
                </ul>
              </div>

              {/* Section 2 */}
              <div className="space-y-3">
                <h2 className="text-lg font-black text-white flex items-center justify-start gap-2 border-b border-white/5 pb-2">
                  <span className="text-blue-400">2.</span> گوگل فائر بیس کی حفاظت (Firebase Database)
                </h2>
                <p className="text-xs">
                  آپ کا تمام ڈیٹا گوگل فائر بیس (Google Firebase Firestore) کے محفوظ سرورز پر اسٹور ہوتا ہے۔ ہم آپ کی سی وی کو آپ کے ڈیش بورڈ میں محفوظ رکھتے ہیں تاکہ آپ کسی بھی وقت دوبارہ لاگ ان کر کے اسے ایڈٹ یا ڈاؤن لوڈ کر سکیں۔ آپ کا ڈیٹا مکمل طور پر نجی رہتا ہے اور اسے کسی تیسرے فریق کو فروخت نہیں کیا جاتا۔
                </p>
              </div>

              {/* Section 3 */}
              <div className="space-y-3">
                <h2 className="text-lg font-black text-white flex items-center justify-start gap-2 border-b border-white/5 pb-2">
                  <span className="text-blue-400">3.</span> آرٹیفیشل انٹیلیجنس اور جیمنائی اے آئی (Gemini AI usage)
                </h2>
                <p className="text-xs">
                  پیشہ ورانہ خلاصہ (Professional Summary) اور ملازمت کی ذمہ داریوں کو بہتر بنانے کے لیے ہم گوگل جیمنائی اے آئی (Google Gemini API) کو تفصیلات بھیجتے ہیں۔ یہ عمل محفوظ سرور-ٹو-سرور پراکسی کے ذریعے ہوتا ہے اور جیمنائی اے آئی آپ کے اس ڈیٹا کو اپنا ماڈل ٹرین کرنے کے لیے استعمال نہیں کرتا۔
                </p>
              </div>

              {/* Section 4 */}
              <div className="space-y-3">
                <h2 className="text-lg font-black text-white flex items-center justify-start gap-2 border-b border-white/5 pb-2">
                  <span className="text-blue-400">4.</span> آپ کے حقوق اور ڈیٹا ڈیلیشن (Your Rights & Deletion)
                </h2>
                <p className="text-xs">
                  آپ کو اپنے ڈیٹا پر مکمل کنٹرول حاصل ہے:
                </p>
                <ul className="list-disc pr-6 text-xs space-y-1.5">
                  <li>آپ کسی بھی وقت ڈیش بورڈ میں جا کر اپنی تیار کردہ سی وی کو ایڈٹ کر سکتے ہیں۔</li>
                  <li>آپ سنگل کلک کے ذریعے اپنے ڈیش بورڈ سے اپنی سی وی کو ہمیشہ کے لیے حذف (Delete) کر سکتے ہیں جس کے بعد وہ ہمارے فائر بیس ڈیٹابیس سے بھی فوری طور پر مٹ جاتی ہے۔</li>
                </ul>
              </div>

              {/* Section 5 */}
              <div className="space-y-3">
                <h2 className="text-lg font-black text-white flex items-center justify-start gap-2 border-b border-white/5 pb-2">
                  <span className="text-blue-400">5.</span> رابطہ کریں (Contact Us)
                </h2>
                <p className="text-xs">
                  اگر آپ کے پاس پرائیویسی یا ڈیٹا سیکیورٹی کے حوالے سے کوئی سوال ہے، تو بلا جھجھک ہم سے ای میل پر رابطہ کریں:
                  <br />
                  <span className="text-blue-400 font-mono block mt-1">fastcvpk.online@gmail.com</span>
                </p>
              </div>
            </div>
          ) : (
            /* ================= ENGLISH VERSION ================= */
            <div className="space-y-8 text-left font-inter leading-relaxed text-slate-300">
              <div className="text-sm border-l-4 border-blue-500 pl-4 py-1 text-white font-semibold">
                Your data and privacy are of utmost importance at FastCV PK. We maintain state-of-the-art security measures to keep your personal records protected at all times.
              </div>

              {/* Section 1 */}
              <div className="space-y-3">
                <h2 className="text-lg font-black text-white flex items-center gap-2 border-b border-white/5 pb-2">
                  <span className="text-blue-400">1.</span> Information We Collect
                </h2>
                <p className="text-xs text-textSecondary">
                  When you create a professional CV or Biodata using FastCV PK, we collect the following metrics to generate high-definition layout assets:
                </p>
                <ul className="list-disc pl-6 text-xs space-y-1.5 text-textSecondary">
                  <li><strong>Personal & Career Information:</strong> Full name, email, phone number, address, class programs, working experience, project titles, and technical/soft skills.</li>
                  <li><strong>Payment Verification:</strong> Upon requesting watermark removal, we process and store your name, email address, and manual transaction ID (e.g. NayaPay) to assist in admin review.</li>
                  <li><strong>Uploaded Media:</strong> Custom profile photos (if utilizing templates supporting images like Global Pro).</li>
                </ul>
              </div>

              {/* Section 2 */}
              <div className="space-y-3">
                <h2 className="text-lg font-black text-white flex items-center gap-2 border-b border-white/5 pb-2">
                  <span className="text-blue-400">2.</span> Google Firebase Storage
                </h2>
                <p className="text-xs text-textSecondary">
                  All generated configurations and details are securely synced to our encrypted Google Firebase Firestore databases. This enables users to log back in using Google Auth and access, edit, or delete their records dynamically. We do not sell or lease user information to third-party ad networks under any circumstances.
                </p>
              </div>

              {/* Section 3 */}
              <div className="space-y-3">
                <h2 className="text-lg font-black text-white flex items-center gap-2 border-b border-white/5 pb-2">
                  <span className="text-blue-400">3.</span> AI Optimization & Processing
                </h2>
                <p className="text-xs text-textSecondary">
                  When clicking "Expand with AI", your professional summary and keywords are securely tunneled to the Google Gemini API. This operates under serverless proxy route parameters. The Gemini models do not reuse your private data or resume contents to train public algorithms.
                </p>
              </div>

              {/* Section 4 */}
              <div className="space-y-3">
                <h2 className="text-lg font-black text-white flex items-center gap-2 border-b border-white/5 pb-2">
                  <span className="text-blue-400">4.</span> User Rights & Data Deletion
                </h2>
                <p className="text-xs text-textSecondary">
                  You maintain full, absolute control over your CV documents:
                </p>
                <ul className="list-disc pl-6 text-xs space-y-1.5 text-textSecondary">
                  <li>You can edit your CV information step-by-step through our live previews.</li>
                  <li>You can delete your resume from the dashboard at any time. Clicking "Delete" initiates an instant, permanent database purge from our Firestore collection, leaving zero logs behind.</li>
                </ul>
              </div>

              {/* Section 5 */}
              <div className="space-y-3">
                <h2 className="text-lg font-black text-white flex items-center gap-2 border-b border-white/5 pb-2">
                  <span className="text-blue-400">5.</span> Contact Support
                </h2>
                <p className="text-xs text-textSecondary">
                  If you have queries regarding our data retention rules or security configurations, reach out to our primary mailbox:
                  <br />
                  <span className="text-blue-400 font-mono block mt-1">fastcvpk.online@gmail.com</span>
                </p>
              </div>
            </div>
          )}
        </Card>

        {/* Call to action at bottom */}
        <div className="glass-panel p-6 rounded-2xl border-white/5 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="p-3 bg-green-500/10 text-green-400 rounded-xl border border-green-500/20">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">
                {isUrdu ? "محفوظ اور تصدیق شدہ ویب سائٹ" : "Secure Connection Guaranteed"}
              </h4>
              <p className="text-[10px] text-textSecondary">
                {isUrdu ? "ہم کبھی بھی آپ کا بینک کارڈ یا پاس ورڈ نہیں مانگتے۔" : "FastCV PK never collects bank card PINs or passwords."}
              </p>
            </div>
          </div>
          <Link href="/create">
            <Button className="px-6 py-2.5 text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-xl">
              {isUrdu ? "سی وی بنائیں ✨" : "Create My CV Now ✨"}
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}
