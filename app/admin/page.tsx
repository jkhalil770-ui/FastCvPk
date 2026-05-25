"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { db, auth } from "@/lib/firebase";
import { 
  collection, 
  query, 
  getDocs, 
  doc, 
  getDoc,
  updateDoc 
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useLanguage } from "@/lib/LanguageContext";
import { getTranslation } from "@/lib/translations";
import { useToast } from "@/components/ui/Toast";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { exportCVToPDF } from "@/lib/pdf-generator";

// Import templates for hidden clean rendering
import ATSTemplate from "@/components/cv-templates/ATSTemplate";
import BiodataTemplate from "@/components/cv-templates/BiodataTemplate";
import StudentTemplate from "@/components/cv-templates/StudentTemplate";
import FreelancerTemplate from "@/components/cv-templates/FreelancerTemplate";
import GlobalProTemplate from "@/components/cv-templates/GlobalProTemplate";

import { 
  ShieldCheck, 
  Users, 
  DollarSign, 
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Loader,
  Search,
  MessageSquare,
  Star
} from "lucide-react";

/**
 * Protected Admin Portal (/admin) for review and email dispatching.
 */
export default function AdminDashboard() {
  const { language } = useLanguage();
  const { toast } = useToast();

  const [user, setUser] = useState<any>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const [pendingPayments, setPendingPayments] = useState<any[]>([]);
  const [approvedPayments, setApprovedPayments] = useState<any[]>([]);
  const [loadingList, setLoadingList] = useState(false);
  const [approvingId, setApprovingId] = useState<string | null>(null);
  
  // Hidden printing template state
  const [printCvData, setPrintCvData] = useState<any>(null);
  const [printCvType, setPrintCvType] = useState<string>("");

  // Feedback tab state
  const [activeTab, setActiveTab] = useState<"payments" | "feedback">("payments");
  const [feedbackList, setFeedbackList] = useState<any[]>([]);
  const [loadingFeedback, setLoadingFeedback] = useState(false);

  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || process.env.ADMIN_EMAIL || "";

  // Auth check
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      setUser(usr);
      setLoadingAuth(false);
      
      const isApprovedAdmin = usr && usr.email && adminEmail && (
        usr.email === adminEmail || 
        adminEmail.split(",").map((e: string) => e.trim().toLowerCase()).includes(usr.email.toLowerCase())
      );
      setIsAdmin(!!isApprovedAdmin);
      
      if (isApprovedAdmin) {
        fetchPayments();
        fetchFeedback();
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchFeedback = async () => {
    setLoadingFeedback(true);
    try {
      const snap = await getDocs(collection(db, "feedback"));
      const items: any[] = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
        formattedDate: d.data().createdAt?.seconds
          ? new Date(d.data().createdAt.seconds * 1000).toLocaleString("en-PK", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })
          : "—"
      }));
      // Sort by newest first
      items.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
      setFeedbackList(items);
    } catch (err) {
      console.error("Error fetching feedback:", err);
    } finally {
      setLoadingFeedback(false);
    }
  };

  const fetchPayments = async () => {
    setLoadingList(true);
    try {
      const snap = await getDocs(collection(db, "payments"));
      const pending: any[] = [];
      const approved: any[] = [];

      for (const paymentDoc of snap.docs) {
        const item = paymentDoc.data();
        let cvType = "ATS"; // fallback default
        
        try {
          if (item.cvId) {
            const cvSnap = await getDoc(doc(db, "cvs", item.cvId));
            if (cvSnap.exists()) {
              cvType = cvSnap.data().cvType || "ATS";
            }
          }
        } catch (cvErr) {
          console.error("Error fetching CV type for admin: ", cvErr);
        }

        const formatted = {
          ...item,
          cvType: cvType.toUpperCase(),
          formattedDate: item.submittedAt?.seconds
            ? new Date(item.submittedAt.seconds * 1000).toLocaleString()
            : new Date().toLocaleString()
        };

        if (item.status === "pending") {
          pending.push(formatted);
        } else if (item.status === "approved") {
          approved.push(formatted);
        }
      }

      setPendingPayments(pending);
      setApprovedPayments(approved);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingList(false);
    }
  };

  // Process approval flow: Hidden print -> PDF Blob -> Base64 -> Route request
  const handleApprove = async (payRecord: any) => {
    setApprovingId(payRecord.id);
    toast("Loading CV Configuration...", "info", "Fetching document fields from Firestore.");

    try {
      // 1. Fetch CV details
      const cvDoc = await getDoc(doc(db, "cvs", payRecord.cvId));
      if (!cvDoc.exists()) {
        throw new Error("CV configuration was deleted by the user.");
      }
      
      const cvData = cvDoc.data();

      // 2. Prepare hidden render states
      setPrintCvType(cvData.cvType);
      
      const templateData = {
        personalInfo: cvData.formData,
        experience: cvData.generatedContent?.experience || [],
        education: cvData.generatedContent?.education || [],
        biodataEducation: cvData.generatedContent?.biodataEducation || {},
        projects: cvData.generatedContent?.projects || [],
        internships: cvData.generatedContent?.internships || [],
        skills: cvData.generatedContent?.skills || {},
        biodataReferences: cvData.generatedContent?.biodataReferences || [],
        generatedSummary: cvData.generatedContent?.summary || "",
        generatedObjective: cvData.generatedContent?.summary || ""
      };
      
      setPrintCvData(templateData);

      // Give browser a short window to paint the hidden node
      await new Promise((resolve) => setTimeout(resolve, 800));

      toast("Rendering clean PDF...", "info", "Capturing high-density canvas without watermarks.");

      // 3. Call PDF capture helper (watermark is false!)
      const blob = await exportCVToPDF("admin-print-node", {
        filename: "CleanCV",
        hasWatermark: false
      });

      if (!blob) {
        throw new Error("Failed to compile clean A4 layout.");
      }

      // 4. Convert printed Blob to base64
      toast("Encrypting file buffer...", "info", "Processing base64 stream for email transmission.");
      
      const base64Promise = new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const raw = reader.result as string;
          resolve(raw.split(",")[1]); // Strip dataUrl header prefix
        };
        reader.onerror = () => reject(new Error("File conversion error"));
      });

      const pdfBase64 = await base64Promise;

      toast("Updating database records...", "info", "Applying approval configurations on client side.");

      // 5. Atomic client-side updates (authenticated under Admin session)
      const payRef = doc(db, "payments", payRecord.id);
      await updateDoc(payRef, {
        status: "approved",
        approvedAt: new Date()
      });

      const cvRef = doc(db, "cvs", payRecord.cvId);
      await updateDoc(cvRef, {
        hasWatermark: false
      });

      toast("Submitting email queue...", "info", "Sending watermark-free PDF to candidate via Resend.");

      // 6. Call the safe email endpoint
      const response = await fetch("/api/send-cv-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": process.env.NEXT_PUBLIC_ADMIN_API_SECRET || ""
        },
        body: JSON.stringify({
          email: payRecord.email,
          name: payRecord.name,
          pdfBase64
        }),
      });


      const res = await response.json();
      if (res.error) throw new Error(res.error);

      toast("Payment approved successfully!", "success", `Clean CV has been dispatched to ${payRecord.email}`);
      
      // Reload collections
      fetchPayments();

    } catch (err: any) {
      console.error(err);
      toast("Approval failed", "error", err.message || "Unknown compile error.");
    } finally {
      setApprovingId(null);
      setPrintCvData(null);
      setPrintCvType("");
    }
  };

  const handleReject = async (payId: string) => {
    if (!confirm("Are you sure you want to reject this payment claim?")) return;

    try {
      await updateDoc(doc(db, "payments", payId), {
        status: "rejected"
      });
      toast("Payment rejected", "warning", "Claim has been marked rejected in history.");
      fetchPayments();
    } catch (err: any) {
      toast("Rejection failed", "error", err.message);
    }
  };

  if (loadingAuth) {
    return (
      <div className="flex-grow w-full bg-[#0F172A] flex justify-center items-center p-8">
        <Loader size={36} className="text-blue-500 animate-spin" />
      </div>
    );
  }

  // Deny access if unauthenticated or not matching admin settings
  if (!isAdmin) {
    return (
      <div className="flex-grow w-full bg-[#0F172A] flex flex-col justify-center items-center p-8 text-center">
        <div className="mx-auto w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 mb-4 animate-bounce">
          <XCircle size={24} />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Access Denied</h2>
        <p className="text-xs text-textSecondary max-w-sm mb-6 leading-relaxed">
          Admin portal requires developer authentication profiles. Please log in using the approved administrator email.
        </p>
        <Link href="/">
          <Button variant="secondary">Back to Safety</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-grow w-full bg-[#0F172A] relative py-12 px-4 sm:px-6 lg:px-8">
      <title>Admin Dashboard — FastCV PK</title>
      <meta name="robots" content="noindex, nofollow" />
      
      {/* Hidden print element used specifically to render clean templates for admin emails */}
      {printCvData && (
        <div className="fixed top-[-9999px] left-[-9999px] z-[-50] bg-white">
          <div id="admin-print-node">
            {printCvType === "ats" && <ATSTemplate data={printCvData} hasWatermark={false} />}
            {printCvType === "global-pro" && <GlobalProTemplate data={printCvData} hasWatermark={false} />}
            {printCvType === "biodata" && <BiodataTemplate data={printCvData} hasWatermark={false} />}
            {printCvType === "student" && <StudentTemplate data={printCvData} hasWatermark={false} />}
            {printCvType === "freelancer" && <FreelancerTemplate data={printCvData} hasWatermark={false} />}
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl relative z-10 space-y-8">
        
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <ShieldCheck size={24} className="text-amber-500" />
              {getTranslation("admin", language)} Dashboard
            </h1>
            <p className="text-xs text-textSecondary mt-1">Review manual transactions and trigger PDF email notifications.</p>
          </div>
          <Button
            variant="secondary"
            onClick={() => { fetchPayments(); fetchFeedback(); }}
            className="px-3.5 py-1.5 text-xs gap-1.5 touch-btn"
          >
            Refresh All
          </Button>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 border-b border-white/10 pb-0">
          <button
            onClick={() => setActiveTab("payments")}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-t-lg border-b-2 transition-all duration-200 ${
              activeTab === "payments"
                ? "border-blue-500 text-white bg-blue-500/10"
                : "border-transparent text-textSecondary hover:text-white hover:bg-white/5"
            }`}
          >
            <DollarSign size={14} />
            Payments ({pendingPayments.length + approvedPayments.length})
          </button>
          <button
            onClick={() => setActiveTab("feedback")}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-t-lg border-b-2 transition-all duration-200 ${
              activeTab === "feedback"
                ? "border-blue-500 text-white bg-blue-500/10"
                : "border-transparent text-textSecondary hover:text-white hover:bg-white/5"
            }`}
          >
            <MessageSquare size={14} />
            Feedback ({feedbackList.length})
          </button>
        </div>

        {activeTab === "payments" && (
        <>
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-5 rounded-xl border-white/5 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-amber-500/10 text-amber-400">
              <Clock size={20} />
            </div>
            <div>
              <span className="text-2xl font-black text-white block">{pendingPayments.length}</span>
              <span className="text-xs text-textSecondary">Pending Approvals</span>
            </div>
          </div>
          <div className="glass-panel p-5 rounded-xl border-white/5 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-green-500/10 text-green-400">
              <CheckCircle size={20} />
            </div>
            <div>
              <span className="text-2xl font-black text-white block">{approvedPayments.length}</span>
              <span className="text-xs text-textSecondary">Approved Payments</span>
            </div>
          </div>
          <div className="glass-panel p-5 rounded-xl border-white/5 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400">
              <DollarSign size={20} />
            </div>
            <div>
              <span className="text-2xl font-black text-white block">Rs. {approvedPayments.length * 199}</span>
              <span className="text-xs text-textSecondary">Aggregated Earnings</span>
            </div>
          </div>
        </div>

        {/* PENDING TABLE */}
        <Card className="p-6 border-white/10">
          <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <Clock size={16} className="text-amber-400 animate-pulse" />
            {getTranslation("pendingPayments", language)}
          </h2>

          {loadingList ? (
            <div className="h-32 flex items-center justify-center">
              <Loader size={24} className="text-blue-500 animate-spin" />
            </div>
          ) : pendingPayments.length === 0 ? (
            <p className="text-xs text-textSecondary italic text-center py-8">No payments pending verification.</p>
          ) : (
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left text-xs text-textSecondary border-collapse">
                <thead>
                  <tr className="border-b border-white/5 text-white font-bold">
                    <th className="pb-3 pr-4">Name</th>
                    <th className="pb-3 pr-4">Transaction ID</th>
                    <th className="pb-3 pr-4">Email</th>
                    <th className="pb-3 pr-4">CV Type</th>
                    <th className="pb-3 pr-4">Time</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingPayments.map((pay) => (
                    <tr key={pay.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-3 pr-4 text-white font-semibold">{pay.name}</td>
                      <td className="py-3 pr-4 text-amber-400 font-bold font-mono">{pay.transactionId}</td>
                      <td className="py-3 pr-4 font-mono">{pay.email}</td>
                      <td className="py-3 pr-4">
                        <Link href={`/download/${pay.cvId}`} target="_blank" className="text-blue-400 hover:underline flex items-center gap-1">
                          <FileText size={11} /> {pay.cvType} (Open)
                        </Link>
                      </td>
                      <td className="py-3 pr-4 text-[10px]">{pay.formattedDate}</td>
                      <td className="py-3 text-right flex justify-end gap-2">
                        <Button
                          onClick={() => handleApprove(pay)}
                          isLoading={approvingId === pay.id}
                          className="px-2.5 py-1 text-[10px] bg-green-600 hover:bg-green-500 touch-btn font-bold rounded"
                        >
                          Approve
                        </Button>
                        <button
                          onClick={() => handleReject(pay.id)}
                          className="px-2 py-1 bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 rounded font-semibold text-[10px] touch-btn"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        {/* APPROVED LIST */}
        <Card className="p-6 border-white/5 bg-slate-900/40">
          <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <CheckCircle size={16} className="text-green-400" />
            {getTranslation("approvedPayments", language)}
          </h2>

          {loadingList ? (
            <div className="h-32 flex items-center justify-center">
              <Loader size={24} className="text-blue-500 animate-spin" />
            </div>
          ) : approvedPayments.length === 0 ? (
            <p className="text-xs text-textSecondary italic text-center py-8">No approved payments found.</p>
          ) : (
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left text-[11px] text-textSecondary/80 border-collapse">
                <thead>
                  <tr className="border-b border-white/5 text-white font-semibold">
                    <th className="pb-2 pr-4">Name</th>
                    <th className="pb-2 pr-4">Transaction ID</th>
                    <th className="pb-2 pr-4">Email</th>
                    <th className="pb-2 pr-4">CV Type</th>
                    <th className="pb-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {approvedPayments.map((pay) => (
                    <tr key={pay.id} className="border-b border-white/5 opacity-70">
                      <td className="py-2.5 pr-4 text-white">{pay.name}</td>
                      <td className="py-2.5 pr-4 font-mono font-bold text-green-400">{pay.transactionId}</td>
                      <td className="py-2.5 pr-4 font-mono">{pay.email}</td>
                      <td className="py-2.5 pr-4">
                        <Link href={`/download/${pay.cvId}`} target="_blank" className="text-blue-400 hover:underline">
                          {pay.cvType} (PDF)
                        </Link>
                      </td>
                      <td className="py-2.5 text-right text-green-400 font-bold">APPROVED</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
        </>
        )}

        {/* ======== FEEDBACK TAB ======== */}
        {activeTab === "feedback" && (
          <>
            {/* Feedback metrics row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-panel p-5 rounded-xl border-white/5 flex items-center gap-4">
                <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <span className="text-2xl font-black text-white block">{feedbackList.length}</span>
                  <span className="text-xs text-textSecondary">Total Feedback</span>
                </div>
              </div>
              <div className="glass-panel p-5 rounded-xl border-white/5 flex items-center gap-4 md:col-span-2">
                <div className="p-3 rounded-lg bg-amber-500/10 text-amber-400">
                  <Star size={20} fill="#F59E0B" stroke="#F59E0B" />
                </div>
                <div>
                  {feedbackList.length > 0 ? (
                    <>
                      <span className="text-2xl font-black text-white block">
                        {(feedbackList.reduce((sum, f) => sum + (f.rating || 0), 0) / feedbackList.length).toFixed(1)} ⭐
                      </span>
                      <span className="text-xs text-textSecondary block">Average Rating</span>
                      <span className="text-xs text-blue-300 font-urdu block leading-normal">
                        اوسط ریٹنگ: {(feedbackList.reduce((sum, f) => sum + (f.rating || 0), 0) / feedbackList.length).toFixed(1)} ⭐
                      </span>
                    </>
                  ) : (
                    <span className="text-sm text-textSecondary">No feedback yet</span>
                  )}
                </div>
              </div>
            </div>

            {/* Feedback Table */}
            <Card className="p-6 border-white/5 bg-slate-900/40">
              <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <MessageSquare size={16} className="text-blue-400" />
                All User Feedback
              </h2>

              {loadingFeedback ? (
                <div className="h-32 flex items-center justify-center">
                  <Loader size={24} className="text-blue-500 animate-spin" />
                </div>
              ) : feedbackList.length === 0 ? (
                <p className="text-xs text-textSecondary italic text-center py-8">No feedback submitted yet. Share the platform to get feedback!</p>
              ) : (
                <div className="overflow-x-auto w-full">
                  <table className="w-full text-left text-xs text-textSecondary border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-white font-bold">
                        <th className="pb-3 pr-4 min-w-[120px]">Name</th>
                        <th className="pb-3 pr-4">Rating</th>
                        <th className="pb-3 pr-4 min-w-[120px]">CV Type</th>
                        <th className="pb-3 pr-4 min-w-[200px]">Message</th>
                        <th className="pb-3 text-right min-w-[100px]">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {feedbackList.map((fb) => (
                        <tr key={fb.id} className="border-b border-white/5 hover:bg-white/5 transition-colors align-top">
                          <td className="py-3 pr-4">
                            <span className="text-white font-semibold block">{fb.name || "—"}</span>
                            {fb.email && (
                              <span className="text-[10px] text-textSecondary font-mono block mt-0.5">{fb.email}</span>
                            )}
                          </td>
                          <td className="py-3 pr-4">
                            <div className="flex gap-0.5">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <span
                                  key={s}
                                  className="text-sm"
                                  style={{ color: (fb.rating || 0) >= s ? "#F59E0B" : "#374151" }}
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                            <span className="text-[10px] text-amber-500 font-bold mt-0.5 block">{fb.rating}/5</span>
                          </td>
                          <td className="py-3 pr-4">
                            <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 text-[10px] font-semibold border border-blue-500/20">
                              {fb.cvType || "—"}
                            </span>
                          </td>
                          <td className="py-3 pr-4 max-w-[260px]">
                            <p className="text-xs text-white/80 leading-relaxed line-clamp-3">{fb.message || "—"}</p>
                          </td>
                          <td className="py-3 text-right">
                            <span className="text-[10px] text-textSecondary">{fb.formattedDate}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </>
        )}

      </div>
    </div>
  );
}
