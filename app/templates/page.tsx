import type { Metadata } from "next";
import TemplatesGalleryPage from "./templates-client";

export const metadata: Metadata = {
  title: "Free ATS CV Templates & Urdu Biodata Designs | FastCV PK",
  description: "Choose from our premium library of 100% free ATS-friendly CV templates and Urdu Nastaliq Biodata designs. Download instantly in HD PDF. No watermarks.",
  alternates: {
    canonical: "https://fastcvpk.online/templates",
  },
  keywords: [
    "CV Template Pakistan",
    "Resume Template India",
    "ATS Resume Templates",
    "Matrimonial Biodata Format",
    "Urdu Biodata Template",
    "Student Resume Designs",
    "Freelancer CV Layouts",
    "Professional CV Designs",
    "ATS Friendly Templates"
  ],
  openGraph: {
    title: "Free ATS CV Templates & Urdu Biodata Designs | FastCV PK",
    description: "Choose from our premium library of 100% free ATS-friendly CV templates and Urdu Nastaliq Biodata designs. Download instantly in HD PDF.",
    url: "https://fastcvpk.online/templates",
    siteName: "FastCV PK",
    images: [
      {
        url: "/images/global-pro-preview.png",
        width: 800,
        height: 600,
        alt: "FastCV PK Premium Resume Gallery",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free ATS CV Templates & Urdu Biodata Designs | FastCV PK",
    description: "Choose from our premium library of 100% free ATS-friendly CV templates and Urdu Nastaliq Biodata designs.",
    images: ["/images/global-pro-preview.png"],
  },
};

export default function TemplatesPage() {
  return <TemplatesGalleryPage />;
}
