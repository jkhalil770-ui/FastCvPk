import type { Metadata } from "next";
import LandingPage from "./page-client";

export const metadata: Metadata = {
  title: "FastCV PK | Free ATS Resume Builder & Urdu Nastaliq Biodata Maker",
  description: "Build a 100% ATS-compliant CV or stunning Urdu Nastaliq Biodata for free. Instant HD PDF download. AI-powered description writer. No watermark. Start building now!",
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
    title: "FastCV PK | Free ATS Resume Builder & Urdu Nastaliq Biodata Maker",
    description: "Build a 100% ATS-compliant CV or stunning Urdu Nastaliq Biodata for free. Instant HD PDF download. AI-powered writer. No watermark.",
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
    title: "FastCV PK | Free ATS Resume Builder & Urdu Nastaliq Biodata Maker",
    description: "Build a 100% ATS-compliant CV or stunning Urdu Nastaliq Biodata for free. Instant HD PDF download. AI-powered writer. No watermark.",
    images: ["/logo.png"],
  },
};

export default function Home() {
  return <LandingPage />;
}
