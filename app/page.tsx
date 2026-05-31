import type { Metadata } from "next";
import LandingPage from "./page-client";

export const metadata: Metadata = {
  title: "FastCV PK — Pakistan's #1 Free Online CV & Biodata Maker",
  description: "Create professional ATS-friendly CVs, Student Resumes, and beautiful Urdu Nastaliq Biodatas for free with FastCV PK. Expand details using Gemini AI and download high-definition print-ready PDFs.",
  alternates: {
    canonical: "https://fastcvpk.online/",
  },
  keywords: [
    "CV Builder Pakistan",
    "Resume Builder Pakistan",
    "Online CV Maker Pakistan",
    "Free CV Maker Pakistan",
    "Resume Generator Pakistan",
    "ATS Resume Builder",
    "CV Builder India",
    "Resume Builder India",
    "Online Resume Maker India",
    "ATS Friendly Resume",
    "Freshers CV",
    "Professional Resume Builder",
    "CV Template Pakistan",
    "Resume Template India",
    "Matrimonial Biodata Pakistan",
    "Urdu Nastaliq Biodata Maker",
    "CV banana",
    "CV banana free",
    "Biodata banana"
  ],
  openGraph: {
    title: "FastCV PK — Pakistan's #1 Free Online CV & Biodata Maker",
    description: "Create professional ATS-friendly CVs, Student Resumes, and beautiful Urdu Nastaliq Biodatas for free. AI-powered and instantly downloadable in PDF.",
    url: "https://fastcvpk.online",
    siteName: "FastCV PK",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "FastCV PK Logo",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FastCV PK — Pakistan's #1 Free Online CV & Biodata Maker",
    description: "Create professional ATS-friendly CVs, Student Resumes, and beautiful Urdu Nastaliq Biodatas for free.",
    images: ["/logo.png"],
  },
};

export default function Home() {
  return <LandingPage />;
}
