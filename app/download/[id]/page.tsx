"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";
import { getTranslation } from "@/lib/translations";
import { db, auth } from "@/lib/firebase";
import { doc, getDoc, setDoc, collection } from "firebase/firestore";
import { useToast } from "@/components/ui/Toast";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import { downloadCVAsPDF } from "@/lib/pdf-generator";

// Import templates
import ATSTemplate from "@/components/cv-templates/ATSTemplate";
import BiodataTemplate from "@/components/cv-templates/BiodataTemplate";
import StudentTemplate from "@/components/cv-templates/StudentTemplate";
import FreelancerTemplate from "@/components/cv-templates/FreelancerTemplate";

import { 
  Download, 
  Share2, 
  Check, 
  Copy, 
  CreditCard,
  MessageCircle, 
  RotateCcw,
  Sparkles,
  ArrowLeft,
  Loader
} from "lucide-react";

/**
 * Terminal CV Download Page (/download/[id]).
 */
export default function CVDownloadPage() {
  const { id } = useParams();
  const router = useRouter();
  const { language } = useLanguage();
  const { toast } = useToast();

  const [cv, setCv] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [pdfPrinting, setPdfPrinting] = useState(false);

  // Payment Modal controllers
  const [payModalOpen, setPayModalOpen] = useState(false);
  const [payStep, setPayStep] = useState(1);
  const [payName, setPayName] = useState("");
  const [payTxnId, setPayTxnId] = useState("");
  const [payEmail, setPayEmail] = useState("");
  const [submittingPayment, setSubmittingPayment] = useState(false);

  // Easypaisa info parameters
  const easypaisaNumber = "03416338812";

  useEffect(() => {
    const fetchCV = async () => {
      try {
        if (!id) return;
        
        let cvData = null;
        
        try {
          const cvDoc = await getDoc(doc(db, "cvs", id as string));
          if (cvDoc.exists()) {
            cvData = cvDoc.data();
          }
        } catch (dbErr) {
          console.warn("Firestore read failed, checking sessionStorage fallback:", dbErr);
        }

        // FALLBACK: Check sessionStorage if Firestore failed or didn't have the data
        if (!cvData) {
          const localData = sessionStorage.getItem(`cv_${id}`);
          if (localData) {
            try {
              cvData = JSON.parse(localData);
            } catch (e) {
              console.error("Failed to parse sessionStorage data", e);
            }
          }
        }

        if (cvData) {
          setCv(cvData);
        } else {
          toast("CV document not found", "error", "Please check your URL or generate a new CV.");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCV();
  }, [id, toast]);

  const handleDownload = async () => {
    if (!auth.currentUser) {
      toast(
        language === "ur" ? "لاگ ان لازمی ہے!" : "Login Required!",
        "warning",
        language === "ur" 
          ? "سی وی ڈاؤن لوڈ کرنے کے لیے پہلے اوپر دائیں کونے سے لاگ ان کریں۔" 
          : "Please log in using the button in the top right to download your CV."
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setPdfPrinting(true);
    toast(
      language === "ur" ? "پی ڈی ایف تیار ہو رہا ہے..." : "Generating PDF...",
      "info",
      language === "ur" ? "براہ کرم پرنٹ ہونے تک انتظار کریں۔" : "Capturing elements at 300 DPI high-definition scale."
    );

    try {
      const filename = cv.formData?.fullName ? `${cv.formData.fullName.replace(/\s+/g, "_")}_CV` : "MyCV";
      const success = await downloadCVAsPDF("cv-print-area", filename);
      if (success) {
        toast(
          language === "ur" ? "پی ڈی ایف ڈاؤن لوڈ ہو گیا!" : "Downloaded successfully!",
          "success"
        );
      } else {
        throw new Error("Canvas render failure");
      }
    } catch (error) {
      console.error(error);
      toast("PDF export failed", "error", "Please try again or use desktop Chrome browser.");
    } finally {
      setPdfPrinting(false);
    }
  };

  // Submit manual NayaPay proof
  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!payName || !payTxnId || !payEmail) {
      toast("All details are required!", "warning");
      return;
    }

    setSubmittingPayment(true);
    try {
      const paymentId = "pay-" + Math.random().toString(36).substring(2, 12);
      const paymentRecord = {
        id: paymentId,
        cvId: id,
        name: payName,
        transactionId: payTxnId,
        email: payEmail,
        status: "pending",
        submittedAt: new Date()
      };

      const payRef = doc(collection(db, "payments"), paymentId);
      await setDoc(payRef, paymentRecord);

      setPayStep(3);
      toast(
        language === "ur" ? "رسید جمع ہو گئی!" : "Verification Submitted!",
        "success",
        language === "ur" ? "ہماری ٹیم 24 گھنٹے میں آپ کو ای میل کر دے گی۔" : "We will review details and send the clean PDF to your email."
      );
    } catch (err: any) {
      console.error(err);
      toast("Submission failed", "error", err.message);
    } finally {
      setSubmittingPayment(false);
    }
  };

  const copyCVLink = () => {
    const url = `${window.location.origin}/download/${id}`;
    navigator.clipboard.writeText(url);
    toast(
      language === "ur" ? "لنک کاپی ہو گیا!" : "Link copied to clipboard!",
      "success"
    );
  };

  const copyEasypaisaNumber = () => {
    navigator.clipboard.writeText(easypaisaNumber);
    toast(
      language === "ur" ? "نمبر کاپی ہو گیا!" : "Easypaisa number copied!",
      "success"
    );
  };

  if (loading) {
    return (
      <div className="flex-1 w-full bg-[#0F172A] flex flex-col justify-center items-center p-8">
        <Loader size={36} className="text-blue-500 animate-spin" />
        <p className="text-xs text-textSecondary mt-3">Loading CV details...</p>
      </div>
    );
  }

  if (!cv) {
    return (
      <div className="flex-1 w-full bg-[#0F172A] flex flex-col justify-center items-center p-8 text-center">
        <h2 className="text-xl font-bold text-white mb-2">CV Not Found</h2>
        <p className="text-xs text-textSecondary mb-6">The document was deleted or does not exist.</p>
        <Link href="/create">
          <Button> {language === "ur" ? "پہلی سی وی بنائیں" : "Create New CV"} </Button>
        </Link>
      </div>
    );
  }

  // Choose visual template
  const renderTemplate = () => {
    const templateData = {
      personalInfo: cv.formData,
      experience: cv.generatedContent?.experience || [],
      education: cv.generatedContent?.education || [],
      biodataEducation: cv.generatedContent?.biodataEducation || {},
      projects: cv.generatedContent?.projects || [],
      internships: cv.generatedContent?.internships || [],
      skills: cv.generatedContent?.skills || {},
      biodataReferences: cv.generatedContent?.biodataReferences || [],
      generatedSummary: cv.generatedContent?.summary || "",
      generatedObjective: cv.generatedContent?.summary || ""
    };

    switch (cv.cvType) {
      case "ats":
        return <ATSTemplate data={templateData} hasWatermark={cv.hasWatermark} />;
      case "biodata":
        return <BiodataTemplate data={templateData} hasWatermark={false} />;
      case "student":
        return <StudentTemplate data={templateData} hasWatermark={false} />;
      case "freelancer":
        return <FreelancerTemplate data={templateData} hasWatermark={cv.hasWatermark} />;
      default:
        return <div>Template load error.</div>;
    }
  };

  // Determine standard categories
  const isTypeA = cv.cvType === "biodata" || cv.cvType === "student";

  return (
    <div className="flex-1 w-full bg-[#0F172A] relative py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        
        {/* Navigation back helper */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/create" className="inline-flex items-center gap-1 text-xs text-textSecondary hover:text-white transition-colors">
            <ArrowLeft size={14} />
            {language === "ur" ? "نیا سی وی بنائیں" : "Create New CV"}
          </Link>
          <span className="text-xs font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full capitalize font-inter">
            {cv.cvType} Layout
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* LEFT: Live scaling preview card */}
          <div className="w-full lg:w-3/5 flex flex-col items-center">
            <div className="w-full border border-white/5 bg-slate-900/50 rounded-2xl p-4 overflow-hidden flex items-start justify-center shadow-2xl max-h-[85vh]">
              <div className="origin-top scale-[0.48] sm:scale-[0.6] lg:scale-[0.68] flex-shrink-0">
                {renderTemplate()}
              </div>
            </div>
          </div>

          {/* RIGHT: Export & Upgrade panels */}
          <div className="w-full lg:w-2/5 space-y-6">
            
            {/* Primary Action Card */}
            <div className="glass-panel p-6 rounded-2xl border-white/10 space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles size={18} className="text-blue-400" />
                {getTranslation("downloadReady", language)}
              </h2>

              <p className="text-xs text-textSecondary leading-relaxed">
                {isTypeA 
                  ? "Your Student/Biodata CV is 100% Free with No Watermarks. Enjoy high-resolution printing!"
                  : "Your professional ATS/Freelancer CV is generated. You can download the watermark version for free, or remove it for only Rs. 199."}
              </p>

              {isTypeA ? (
                <Button
                  onClick={handleDownload}
                  isLoading={pdfPrinting}
                  className="w-full gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                >
                  <Download size={16} />
                  {getTranslation("downloadFreePDF", language)}
                </Button>
              ) : (
                <div className="space-y-3">
                  <Button
                    onClick={handleDownload}
                    isLoading={pdfPrinting}
                    variant="secondary"
                    className="w-full gap-2 text-textSecondary hover:text-white"
                  >
                    <Download size={16} />
                    {getTranslation("downloadFreeWithWatermark", language)}
                  </Button>
                  
                  {cv.hasWatermark && (
                    <>
                      <div className="border-t border-white/5 my-4 pt-4 flex items-center justify-between text-xs text-textSecondary">
                        <span>Remove Watermark:</span>
                        <strong className="text-white">Rs. 199 (One-Time)</strong>
                      </div>

                      <Button
                        onClick={() => {
                          setPayStep(1);
                          setPayModalOpen(true);
                        }}
                        className="w-full gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                      >
                        <CreditCard size={16} />
                        {getTranslation("removeWatermarkPrem", language)}
                      </Button>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Sharing Social Tray */}
            <div className="glass-panel p-6 rounded-2xl border-white/10 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Share2 size={15} className="text-blue-400" />
                {getTranslation("shareTitle", language)}
              </h3>
              
              <div className="grid grid-cols-3 gap-2">
                <a
                  href={`https://api.whatsapp.com/send?text=Aap%20bhi%20apna%20professional%20CV%20free%20banaein%20FastCV%20PK%20pe!%20Link:%20https://fastcvpk.online/download/${id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center py-2.5 rounded-lg bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 text-green-400 text-[10px] font-bold gap-1 transition-colors"
                >
                  <MessageCircle size={15} />
                  WA
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=https://fastcvpk.online/download/${id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center py-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 text-blue-400 text-[10px] font-bold gap-1 transition-colors"
                >
                  <svg className="w-[15px] h-[15px] fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  FB
                </a>
                <button
                  onClick={copyCVLink}
                  className="flex flex-col items-center justify-center py-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white text-[10px] font-bold gap-1 transition-colors"
                >
                  <Copy size={15} />
                  {language === "ur" ? "لنک کاپی" : "Copy"}
                </button>
              </div>
            </div>

            {/* Dashboard Redirect info */}
            <div className="glass-panel p-6 rounded-2xl border-white/5 flex items-center justify-between text-xs text-textSecondary">
              <span className="flex items-center gap-1">
                <RotateCcw size={13} />
                Want to edit details?
              </span>
              <button 
                onClick={() => router.push(`/create/${cv.cvType}`)} 
                className="text-blue-400 font-bold hover:underline"
              >
                Go Back to Form
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Manual Easypaisa payment modal */}
      <Modal
        isOpen={payModalOpen}
        onClose={() => setPayModalOpen(false)}
        title={language === "ur" ? "پریمیم سی وی انلاک کریں" : "Unlock Clean Premium CV"}
        isUrdu={language === "ur"}
      >
        {payStep === 1 && (
          <div className="space-y-4 text-center">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {language === "ur" ? "ایزی پیسہ سے 199 روپے بھیجیں" : "Easypaisa se Rs. 199 bhejein"}
            </h4>
            
            {/* Show QR code image */}
            <div className="flex justify-center my-3 bg-white p-2 rounded-xl border border-white/10 max-w-[200px] mx-auto shadow-md">
              <Image 
                src="/payment-qr.png" 
                alt="Easypaisa Payment QR" 
                width={180} 
                height={180} 
                className="rounded-lg object-contain"
              />
            </div>
            
            {/* Account details below QR */}
            <div className="glass-panel p-4 rounded-xl border-white/10 space-y-2 text-left text-xs max-w-sm mx-auto">
              <div className="flex justify-between items-center">
                <span className="text-textSecondary">Account Number:</span>
                <strong className="text-white font-mono text-sm">{easypaisaNumber}</strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-textSecondary">Account Title:</span>
                <strong className="text-white">Muhammad Junaid Khalil</strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-textSecondary">Account Bank:</span>
                <strong className="text-blue-400">Easypaisa Account</strong>
              </div>
            </div>

            <div className="flex gap-3 pt-2 max-w-sm mx-auto">
              <Button onClick={copyEasypaisaNumber} variant="secondary" className="flex-1 text-xs py-2 gap-1.5 font-inter">
                <Copy size={13} />
                Copy Number
              </Button>
              <Button onClick={() => setPayStep(2)} className="flex-1 text-xs py-2 font-inter bg-blue-600 hover:bg-blue-500">
                Proceed to Confirm
              </Button>
            </div>
          </div>
        )}

        {payStep === 2 && (
          <form onSubmit={handlePaymentSubmit} className="space-y-4 max-w-sm mx-auto">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider text-center">
              {language === "ur" ? "ادائیگی کی تصدیق کریں" : "Confirm Payment"}
            </h4>
            
            <Input
              label="Aapka Naam"
              value={payName}
              onChange={(e) => setPayName(e.target.value)}
              required
            />
            <Input
              label="Transaction ID"
              value={payTxnId}
              onChange={(e) => setPayTxnId(e.target.value)}
              placeholder="e.g. 1045938294 or Txn ID"
              required
            />
            <div>
              <Input
                label="Email Address"
                type="email"
                value={payEmail}
                onChange={(e) => setPayEmail(e.target.value)}
                required
              />
              <p className="text-[10px] text-textSecondary italic mt-[-8px] pl-1">
                Clean CV is email pe bheji jaayegi
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={() => setPayStep(1)} variant="secondary" className="flex-1 py-2.5 text-xs">
                Back
              </Button>
              <Button type="submit" isLoading={submittingPayment} className="flex-1 py-2.5 text-xs bg-blue-600 hover:bg-blue-500 font-bold">
                Maine Payment Kar Di ✓
              </Button>
            </div>
          </form>
        )}

        {payStep === 3 && (
          <div className="text-center space-y-4 py-4 max-w-sm mx-auto">
            <div className="mx-auto w-12 h-12 bg-success/10 border border-success/20 rounded-full flex items-center justify-center text-success mb-2">
              <Check size={24} />
            </div>
            
            <h4 className="text-base font-bold text-white">
              Shukriya! Aapki payment verify ho rahi hai.
            </h4>
            <p className="text-xs text-textSecondary leading-relaxed">
              Clean CV 2-4 ghante mein aapki email pe aa jaayegi.
            </p>

            <div className="pt-4 flex flex-col gap-2">
              <a
                href={`https://wa.me/923416338812?text=Assalam%20o%20Alaikum,%20Maine%20FastCV%20watermark%20hatane%20ki%20payment%20submit%20ki%20hai.%20CV%20ID:%20${id}.%20Transaction%20ID:%20${payTxnId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex justify-center items-center gap-1.5 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold py-3 text-xs shadow-lg shadow-green-500/10 transition-colors"
              >
                <MessageCircle size={15} />
                WhatsApp: 03416338812
              </a>
              <Button onClick={() => setPayModalOpen(false)} variant="ghost" className="w-full text-xs">
                Close Window
              </Button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
}
