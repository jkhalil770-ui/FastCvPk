import type { Metadata } from "next";
import TemplatesGalleryPage from "./templates-client";

export const metadata: Metadata = {
  title: "Professional Resume Templates & CV Designs — FastCV PK",
  description: "Browse our expert selection of free and premium templates for Pakistan and India's job markets. Choose from ATS-friendly CVs, matrimonial Biodatas, and remote freelancer layouts.",
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
    title: "Professional Resume Templates & CV Designs — FastCV PK",
    description: "Browse our expert selection of free and premium templates. Choose from ATS-friendly CVs, matrimonial Biodatas, and remote freelancer layouts.",
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
    title: "Professional Resume Templates & CV Designs — FastCV PK",
    description: "Choose from ATS-friendly, student CVs, matrimonial Biodatas, and remote freelancer layouts.",
    images: ["/images/global-pro-preview.png"],
  },
};

export default function TemplatesPage() {
  return <TemplatesGalleryPage />;
}
