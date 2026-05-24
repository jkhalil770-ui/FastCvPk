"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/LanguageContext";
import { getTranslation } from "@/lib/translations";
import { db, auth } from "@/lib/firebase";
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  deleteDoc, 
  doc, 
  orderBy 
} from "firebase/firestore";
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useToast } from "@/components/ui/Toast";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import GridSkeleton from "@/components/ui/Skeleton";

import { 
  FileText, 
  Plus, 
  Download, 
  Trash2, 
  Share2, 
  Edit3, 
  Calendar,
  Sparkles,
  User,
  Key,
  ShieldAlert
} from "lucide-react";

/**
 * User Dashboard Page (/dashboard). Provides full CRUD interface for saved items.
 */
export default function UserDashboard() {
  const router = useRouter();
  const { language } = useLanguage();
  const { toast } = useToast();

  const [user, setUser] = useState<any>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [cvList, setCvList] = useState<any[]>([]);
  const [fetchingCvs, setFetchingCvs] = useState(false);
  const [stats, setStats] = useState({ totalCvs: 0, downloads: 0 });

  // Monitor Auth Changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      setUser(usr);
      setLoadingAuth(false);
      if (usr) {
        fetchUserCVs(usr.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchUserCVs = async (uid: string) => {
    setFetchingCvs(true);
    try {
      const items: any[] = [];
      let totalDownloads = 0;

      // 1. Fetch from Firestore
      try {
        const q = query(
          collection(db, "cvs"), 
          where("userId", "==", uid)
        );
        const snap = await getDocs(q);
        snap.forEach((doc) => {
          const item = doc.data();
          items.push({
            ...item,
            formattedDate: item.createdAt?.seconds 
              ? new Date(item.createdAt.seconds * 1000).toLocaleDateString()
              : new Date().toLocaleDateString()
          });
          totalDownloads += item.downloadCount || 0;
        });
      } catch (firestoreErr) {
        console.warn("Firestore fetch failed, checking local storage:", firestoreErr);
      }

      // 2. Fetch from SessionStorage (fallback for CVs that failed to save to Firestore)
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key && key.startsWith("cv_")) {
          try {
            const localData = JSON.parse(sessionStorage.getItem(key) || "");
            // Only add if not already fetched from Firestore
            if (!items.find(item => item.id === localData.id)) {
              items.push({
                ...localData,
                formattedDate: new Date().toLocaleDateString()
              });
              totalDownloads += localData.downloadCount || 0;
            }
          } catch (e) {
            console.error("Failed to parse local cv", e);
          }
        }
      }

      // Sort items by date descending (newest first)
      items.sort((a, b) => new Date(b.formattedDate).getTime() - new Date(a.formattedDate).getTime());

      setCvList(items);
      setStats({ totalCvs: items.length, downloads: totalDownloads });
    } catch (err) {
      console.error(err);
    } finally {
      setFetchingCvs(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast(
        language === "ur" ? "لاگ ان کامیاب!" : "Login Successful!",
        "success"
      );
    } catch (err: any) {
      toast("Login failed", "error", err.message);
    }
  };

  const handleDelete = async (cvId: string) => {
    if (!confirm(language === "ur" ? "کیا آپ واقعی حذف کرنا چاہتے ہیں؟" : "Are you sure you want to delete this CV?")) {
      return;
    }

    try {
      await deleteDoc(doc(db, "cvs", cvId));
      setCvList((prev) => prev.filter((item) => item.id !== cvId));
      setStats((prev) => ({ ...prev, totalCvs: Math.max(prev.totalCvs - 1, 0) }));
      toast(
        language === "ur" ? "کامیابی سے حذف ہو گیا!" : "Deleted successfully!",
        "success"
      );
    } catch (err: any) {
      console.error(err);
      toast("Deletion failed", "error", err.message);
    }
  };

  const shareCV = (cvId: string) => {
    const url = `${window.location.origin}/download/${cvId}`;
    navigator.clipboard.writeText(url);
    toast(
      language === "ur" ? "لنک کاپی ہو گیا!" : "Link copied to clipboard!",
      "success",
      "Share it with companies or matrimonial coordinators."
    );
  };

  if (loadingAuth) {
    return (
      <div className="flex-grow w-full bg-[#0F172A] flex flex-col justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  // RENDER LOGIN SCREEN IF NOT AUTHENTICATED
  if (!user) {
    return (
      <div className="flex-grow w-full bg-[#0F172A] relative flex flex-col justify-center items-center py-16 px-4">
        {/* Glowing backdrop elements */}
        <div className="absolute top-[20%] left-[-10%] w-[35vw] h-[35vw] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
        
        <Card className="w-full max-w-md p-8 border-white/10 text-center relative z-10">
          <div className="mx-auto w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6">
            <ShieldAlert size={22} />
          </div>
          
          <h2 className="text-xl font-bold text-white mb-2">
            {language === "ur" ? "لاگ ان کرنا ضروری ہے" : "Authentication Required"}
          </h2>
          <p className="text-xs text-textSecondary leading-relaxed mb-6">
            Please log in with Google to access your FastCV PK dashboard, where you can save and edit your resumes online.
          </p>

          <Button 
            onClick={handleGoogleLogin} 
            className="w-full gap-2 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold"
          >
            <User size={16} />
            Log In with Google
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-grow w-full bg-[#0F172A] relative py-12 px-4 sm:px-6 lg:px-8">
      <title>{language === "ur" ? "ڈیش بورڈ — FastCV PK" : "Candidate Dashboard — FastCV PK"}</title>
      <meta name="description" content="Access your saved ATS-friendly resumes and custom matrimonial Biodata on FastCV PK." />
      <div className="mx-auto max-w-7xl relative z-10 space-y-8">
        
        {/* Header strip */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <Sparkles size={20} className="text-blue-400" />
              {language === "ur" ? "آپ کا ڈیش بورڈ" : "User Dashboard"}
            </h1>
            <p className="text-xs text-textSecondary mt-1 leading-relaxed">
              Manage your saved English CVs and Urdu Nastaliq Biodatas.
            </p>
          </div>
          
          <Link href="/create">
            <Button className="gap-1.5 px-5 py-2 text-xs bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/10 transition-all active:scale-95">
              <Plus size={15} />
              {getTranslation("firstCvBtn", language)}
            </Button>
          </Link>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-panel p-5 rounded-xl border-white/5 flex flex-col justify-center">
            <span className="text-2xl font-black text-white">{stats.totalCvs}</span>
            <span className="text-xs text-textSecondary mt-1">{getTranslation("totalCvs", language)}</span>
          </div>
          <div className="glass-panel p-5 rounded-xl border-white/5 flex flex-col justify-center">
            <span className="text-2xl font-black text-white">{stats.downloads}</span>
            <span className="text-xs text-textSecondary mt-1">{getTranslation("totalDownloads", language)}</span>
          </div>
        </div>

        {/* CV Grid list */}
        {fetchingCvs ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="glass-panel p-6 rounded-xl border-white/5 space-y-5 animate-pulse">
                <div className="flex items-center justify-between">
                  <div className="w-16 h-5 rounded bg-white/5" />
                  <div className="w-20 h-4 rounded bg-white/5" />
                </div>
                <div className="h-5 rounded bg-white/5 w-2/3" />
                <div className="h-3.5 rounded bg-white/5 w-1/2" />
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded bg-white/5" />
                    <div className="w-8 h-8 rounded bg-white/5" />
                    <div className="w-8 h-8 rounded bg-white/5" />
                  </div>
                  <div className="w-24 h-8 rounded bg-white/5" />
                </div>
              </div>
            ))}
          </div>
        ) : cvList.length === 0 ? (
          <div className="glass-panel p-12 rounded-2xl border-white/5 text-center flex flex-col items-center justify-center">
            <div className="p-4 bg-white/5 border border-white/10 rounded-full text-textSecondary mb-4">
              <FileText size={30} />
            </div>
            <h3 className="text-base font-bold text-white mb-1">
              {getTranslation("dashboardEmpty", language)}
            </h3>
            <p className="text-xs text-textSecondary max-w-sm mb-6 leading-relaxed">
              Create a resume with automated AI writer suggestions and download premium A4 PDFs instantly.
            </p>
            <Link href="/create">
              <Button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6">
                {language === "ur" ? "پہلی سی وی بنائیں" : "Create First CV"}
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cvList.map((item) => (
              <div 
                key={item.id} 
                className="glass-panel p-6 rounded-xl border-white/5 hover:border-blue-500/20 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="bg-blue-500/10 text-blue-400 text-[10px] font-bold border border-blue-500/20 px-2 py-0.5 rounded uppercase tracking-wider font-inter">
                      {item.cvType}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-textSecondary font-mono">
                      <Calendar size={11} />
                      {item.formattedDate}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mt-4">{item.formData?.fullName || "Saved CV"}</h3>
                  <p className="text-xs text-textSecondary mt-1 leading-relaxed">{item.formData?.profTitle || "Details filled"}</p>
                </div>

                {/* Dashboard Action Panel */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => router.push(`/create/${item.cvType}`)}
                      className="p-2 rounded bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 text-white transition-colors touch-btn"
                      title="Edit details"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      onClick={() => shareCV(item.id)}
                      className="p-2 rounded bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 text-blue-400 transition-colors touch-btn"
                      title="Copy sharing URL"
                    >
                      <Share2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 rounded bg-red-500/10 border border-red-500/10 hover:bg-red-500/20 hover:border-red-500/20 text-red-400 transition-colors touch-btn"
                      title="Delete document"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <Link href={`/download/${item.id}`}>
                    <Button variant="secondary" className="px-3.5 py-1.5 text-xs text-blue-400 gap-1 rounded-lg">
                      <Download size={13} />
                      {language === "ur" ? "ڈاؤن لوڈ" : "Download"}
                    </Button>
                  </Link>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
