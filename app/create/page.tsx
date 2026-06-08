import type { Metadata } from "next";
import CVSelectionPage from "./create-client";

export const metadata: Metadata = {
  title: "Build Your ATS CV & Urdu Biodata Online | FastCV PK",
  description: "Create a professional job-winning CV or beautiful Urdu Nastaliq Biodata in minutes. Use Gemini AI to auto-fill description text. Start for free now!",
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
    title: "Build Your ATS CV & Urdu Biodata Online | FastCV PK",
    description: "Create a professional job-winning CV or beautiful Urdu Nastaliq Biodata in minutes. Use Gemini AI to auto-fill description text. Start for free now!",
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
    title: "Build Your ATS CV & Urdu Biodata Online | FastCV PK",
    description: "Create a professional job-winning CV or beautiful Urdu Nastaliq Biodata in minutes. Use Gemini AI to auto-fill description text. Start for free now!",
    images: ["/logo.png"],
  },
};

export default function SelectionPage() {
  return <CVSelectionPage />;
}
