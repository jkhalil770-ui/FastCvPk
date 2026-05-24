"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Scale, ArrowLeft, FileText, CheckCircle2, ShieldAlert } from "lucide-react";

export default function TermsPage() {
  const { language } = useLanguage();
  const isUrdu = language === "ur";

  return (
    <div className="flex-grow w-full bg-[#0F172A] relative py-16 px-4 sm:px-6 lg:px-8">
      <title>{isUrdu ? "شرائط و ضوابط — FastCV PK" : "Terms & Conditions — FastCV PK"}</title>
      <meta name="description" content="FastCV PK Terms of Service and Conditions. Understand watermark removal checkouts, manual NayaPay processing, and digital asset refund guidelines." />
      
      {/* Background radial neon glows */}
      <div className="absolute top-[20%] left-[-10%] w-[35vw] h-[35vw] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-4xl relative z-10 space-y-8">
        
        {/* Navigation back and header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-400 text-xs font-semibold">
              <Scale size={13} />
              {isUrdu ? "قوانین اور شرائط" : "Legal Terms"}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {isUrdu ? "شرائط و ضوابط (Terms & Conditions)" : "Terms & Conditions"}
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
            <Scale size={120} />
          </div>

          {isUrdu ? (
            /* ================= URDU VERSION ================= */
            <div className="space-y-8 text-right font-inter leading-relaxed text-slate-300">
              <div className="text-sm border-r-4 border-blue-500 pr-4 py-1 text-white font-semibold">
                FastCV PK کا استعمال کر کے، آپ نیچے دیئے گئے قوانین اور شرائط کو تسلیم کرتے ہیں۔ براہ کرم ان کو غور سے پڑھیں۔
              </div>

              {/* Section 1 */}
              <div className="space-y-3">
                <h2 className="text-lg font-black text-white flex items-center justify-start gap-2 border-b border-white/5 pb-2">
                  <span className="text-blue-400">1.</span> سروس کا استعمال (Acceptance of Terms)
                </h2>
                <p className="text-xs">
                  ہماری ویب سائٹ تمام پروفیشنلز، فری لانسرز، اور طالب علموں کو پیشہ ورانہ سی وی اور بائیو ڈیٹا فارمیٹ بنانے کی سہولت فراہم کرتی ہے۔ آپ صرف قانون کے دائرے میں رہ کر اس سروس کا استعمال کر سکتے ہیں اور کسی بھی دوسرے شخص کی جھوٹی یا غلط معلومات درج کرنے سے گریز کریں۔
                </p>
              </div>

              {/* Section 2 */}
              <div className="space-y-3">
                <h2 className="text-lg font-black text-white flex items-center justify-start gap-2 border-b border-white/5 pb-2">
                  <span className="text-blue-400">2.</span> ادائیگی اور واٹر مارک کا خاتمہ (Payments & Checkout)
                </h2>
                <p className="text-xs">
                  ہماری ویب سائٹ پر سی وی بنانا اور ڈاؤن لوڈ کرنا بنیادی طور پر مفت ہے۔ تاہم، پریمیم ڈیزائن حاصل کرنے اور واٹر مارک ہٹانے کے لیے Rs. 199 کی فیس مقرر ہے:
                </p>
                <ul className="list-disc pr-6 text-xs space-y-1.5">
                  <li>صارف کو ہمارے بتائے گئے نمبر پر فیس بھیجنے کے بعد اپنی ٹرانزیکشن آئی ڈی (Transaction ID) فارم میں درج کرنی ہوگی۔</li>
                  <li>آپ کی درخواست ہمارے ایڈمن پینل میں منتقل ہو جاتی ہے۔ ایڈمن آپ کے بھیجے گئے ٹرانزیکشن نمبر کی دستی تصدیق کرتا ہے۔</li>
                  <li>تصدیق مکمل ہونے پر، واٹر مارک ہمیشہ کے لیے ہٹا دیا جاتا ہے اور حتمی سی وی پی ڈی ایف فائل براہ راست آپ کے ای میل پر بھیج دی جاتی ہے۔</li>
                </ul>
              </div>

              {/* Section 3 */}
              <div className="space-y-3">
                <h2 className="text-lg font-black text-white flex items-center justify-start gap-2 border-b border-white/5 pb-2">
                  <span className="text-blue-400">3.</span> واپسی کی پالیسی (Refund Policy)
                </h2>
                <p className="text-xs">
                  چونکہ سی وی ایک ڈیجیٹل اور ڈاؤن لوڈ ایبل پروڈکٹ ہے، اس لیے ایک بار جب ایڈمن ٹرانزیکشن کی تصدیق کر کے واٹر مارک ہٹا دیتا ہے اور ای میل ڈسپیچ ہو جاتی ہے، تو وہ رقم واپس (Refund) نہیں کی جا سکتی۔
                </p>
              </div>

              {/* Section 4 */}
              <div className="space-y-3">
                <h2 className="text-lg font-black text-white flex items-center justify-start gap-2 border-b border-white/5 pb-2">
                  <span className="text-blue-400">4.</span> معلومات کی ذمہ داری (Limitation of Liability)
                </h2>
                <p className="text-xs">
                  FastCV PK آرٹیفیشل انٹیلیجنس کے ذریعے آپ کی سی وی کو بہتر بنانے کی تجاویز فراہم کرتا ہے۔ تاہم:
                </p>
                <ul className="list-disc pr-6 text-xs space-y-1.5">
                  <li>سی وی میں لکھی گئی تمام معلومات کی سچائی اور درستی کے ذمہ دار صرف آپ خود ہیں۔</li>
                  <li>نوکری کی درخواست دینے سے پہلے سی وی کی اسپیلنگ اور تفصیلات خود اچھی طرح چیک کریں۔ ہم کسی بھی قسم کی غلط بیانی یا نوکری نہ ملنے کے نقصان کے ذمہ دار نہیں ہوں گے۔</li>
                </ul>
              </div>

              {/* Section 5 */}
              <div className="space-y-3">
                <h2 className="text-lg font-black text-white flex items-center justify-start gap-2 border-b border-white/5 pb-2">
                  <span className="text-blue-400">5.</span> قوانین میں تبدیلی (Changes to Terms)
                </h2>
                <p className="text-xs">
                  ہم بغیر کسی پیشگی اطلاع کے ان شرائط و ضوابط میں رد و بدل کرنے کا حق محفوظ رکھتے ہیں۔ تمام صارفین پر ویب سائٹ کے استعمال کے وقت لاگو ہونے والی شرائط لاگو ہوں گی۔
                </p>
              </div>
            </div>
          ) : (
            /* ================= ENGLISH VERSION ================= */
            <div className="space-y-8 text-left font-inter leading-relaxed text-slate-300">
              <div className="text-sm border-l-4 border-blue-500 pl-4 py-1 text-white font-semibold">
                By accessing or generating files on FastCV PK, you implicitly agree to be bound by the following Terms & Conditions.
              </div>

              {/* Section 1 */}
              <div className="space-y-3">
                <h2 className="text-lg font-black text-white flex items-center gap-2 border-b border-white/5 pb-2">
                  <span className="text-blue-400">1.</span> Usage & Eligibility
                </h2>
                <p className="text-xs text-textSecondary">
                  FastCV PK offers professional resume template generator wizards to applicants, students, and matrimonials. You agree to utilize this portal only for lawful career-building processes and will not enter fraudulent credentials or impersonate others.
                </p>
              </div>

              {/* Section 2 */}
              <div className="space-y-3">
                <h2 className="text-lg font-black text-white flex items-center gap-2 border-b border-white/5 pb-2">
                  <span className="text-blue-400">2.</span> Checkout & Watermark Removal
                </h2>
                <p className="text-xs text-textSecondary">
                  While resume creation is free, premium watermark removal carries a set fee of Rs. 199:
                </p>
                <ul className="list-disc pl-6 text-xs space-y-1.5 text-textSecondary">
                  <li>Users submit their transaction reference number via the checkout screen after manually sending funds to NayaPay or EasyPaisa coordinates.</li>
                  <li>Proof entries are forwarded to our protected Admin review queue at `/admin`. Verification is performed manually.</li>
                  <li>Upon approval, watermarks are permanently deleted from your online resume profile, and a watermark-free PDF is dispatched to your registered email via Resend SMTP server streams.</li>
                </ul>
              </div>

              {/* Section 3 */}
              <div className="space-y-3">
                <h2 className="text-lg font-black text-white flex items-center gap-2 border-b border-white/5 pb-2">
                  <span className="text-blue-400">3.</span> Digital Refund Policy
                </h2>
                <p className="text-xs text-textSecondary">
                  Due to the nature of digital, downloadable, and instantly compiled layout assets, all payments are final. Once our admin verifies the transaction ID and dispatches the clean PDF to your email, **no refunds or chargebacks will be processed**.
                </p>
              </div>

              {/* Section 4 */}
              <div className="space-y-3">
                <h2 className="text-lg font-black text-white flex items-center gap-2 border-b border-white/5 pb-2">
                  <span className="text-blue-400">4.</span> Limitations of Liability
                </h2>
                <p className="text-xs text-textSecondary">
                  FastCV PK provides AI suggestions and professional formatting structures. However:
                </p>
                <ul className="list-disc pl-6 text-xs space-y-1.5 text-textSecondary">
                  <li>Users are solely responsible for fact-checking dates, companies, spellings, and accuracy in their CV documents.</li>
                  <li>FastCV PK is not liable for typographical errors or failures in securing employment, interviews, or career advancements.</li>
                </ul>
              </div>

              {/* Section 5 */}
              <div className="space-y-3">
                <h2 className="text-lg font-black text-white flex items-center gap-2 border-b border-white/5 pb-2">
                  <span className="text-blue-400">5.</span> Right of Amendment
                </h2>
                <p className="text-xs text-textSecondary">
                  We reserve the right to modify these terms of service without prior notice to comply with local financial laws in Pakistan. Continued usage of the site constitutes acceptance of updated legal parameters.
                </p>
              </div>
            </div>
          )}
        </Card>

        {/* Legal Disclaimer block */}
        <div className="glass-panel p-6 rounded-2xl border-white/5 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
              <ShieldAlert size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">
                {isUrdu ? "آئی ڈی کے درست ہونے کا اطمینان کر لیں" : "Verify Transaction ID carefully"}
              </h4>
              <p className="text-[10px] text-textSecondary">
                {isUrdu ? "غلط ٹرانزیکشن آئی ڈی درج کرنے سے تصدیق لیٹ ہو سکتی ہے۔" : "Entering incorrect payment IDs can delay manual email dispatch."}
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
