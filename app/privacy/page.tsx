import type { Metadata } from "next";
import PrivacyPolicyPage from "./privacy-client";

export const metadata: Metadata = {
  title: "Privacy Policy — FastCV PK",
  description: "FastCV PK Privacy Policy. Learn how we safeguard your personal credentials, secure Firebase Firestore database records, and securely parse summaries using Gemini AI.",
  alternates: {
    canonical: "https://fastcvpk.online/privacy",
  },
  openGraph: {
    title: "Privacy Policy — FastCV PK",
    description: "FastCV PK Privacy Policy. Learn how we safeguard your personal credentials, secure Firebase database records, and securely parse summaries using Gemini AI.",
    url: "https://fastcvpk.online/privacy",
    siteName: "FastCV PK",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "FastCV PK Privacy Policy",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy — FastCV PK",
    description: "FastCV PK Privacy Policy. Learn how we safeguard your personal credentials, secure Firebase database records, and securely parse summaries using Gemini AI.",
    images: ["/logo.png"],
  },
};

export default function PrivacyPage() {
  return <PrivacyPolicyPage />;
}
