import type { Metadata } from "next";
import CVSelectionPage from "./create-client";

export const metadata: Metadata = {
  title: "Create Your CV & Resume Online — FastCV PK",
  description: "Create your professional CV or matrimonial Biodata instantly. Choose an ATS-friendly, student, freelancer, or wedding Biodata template, and auto-fill details using Gemini AI.",
  alternates: {
    canonical: "https://fastcvpk.online/create",
  },
  keywords: [
    "CV Builder Selection",
    "Create CV Online Free",
    "ATS Resume Maker Online",
    "Urdu Nastaliq Biodata Builder",
    "Fresher Student CV Builder",
    "Freelancer CV Builder Online",
    "Online Resume Selection",
    "Gemini AI Resume Builder"
  ],
  openGraph: {
    title: "Create Your CV & Resume Online — FastCV PK",
    description: "Create your professional CV or matrimonial Biodata instantly. Choose an ATS-friendly, student, freelancer, or wedding Biodata template, and auto-fill details using Gemini AI.",
    url: "https://fastcvpk.online/create",
    siteName: "FastCV PK",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "FastCV PK Resume Builder Selection",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Create Your CV & Resume Online — FastCV PK",
    description: "Create your professional CV or matrimonial Biodata instantly. Choose an ATS-friendly, student, freelancer, or wedding Biodata template.",
    images: ["/logo.png"],
  },
};

export default function SelectionPage() {
  return <CVSelectionPage />;
}
