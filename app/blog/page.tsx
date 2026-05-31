import type { Metadata } from "next";
import BlogListingPage from "./blog-client";

export const metadata: Metadata = {
  title: "Professional Resume Writing Tips & Career Guides — FastCV PK",
  description: "Read FastCV PK's expert career guides. Learn ATS optimization checklists, professional CV-making formatting, matrimonial Biodata guidelines, and local hiring trends in Pakistan & India.",
  alternates: {
    canonical: "https://fastcvpk.online/blog",
  },
  keywords: [
    "CV Kaise Banate Hain",
    "ATS Friendly CV Kya Hota Hai",
    "Student CV Guide Pakistan",
    "Matrimonial Biodata Writing Format",
    "Freelancer CV Tips",
    "Resume Writing Tips",
    "Online CV Maker Guide",
    "Job Application Advice",
    "Pakistan Employability Checklist"
  ],
  openGraph: {
    title: "Professional Resume Writing Tips & Career Guides — FastCV PK",
    description: "Learn ATS optimization checklists, professional CV-making formatting, matrimonial Biodata guidelines, and local hiring trends in Pakistan & India.",
    url: "https://fastcvpk.online/blog",
    siteName: "FastCV PK",
    images: [
      {
        url: "/images/blog-cv-guide.jpg",
        width: 800,
        height: 500,
        alt: "FastCV PK Career Hub & CV Guide",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Resume Writing Tips & Career Guides — FastCV PK",
    description: "Read FastCV PK's expert guides on ATS CVs, matrimony Biodatas, and student resumes.",
    images: ["/images/blog-cv-guide.jpg"],
  },
};

export default function BlogHubPage() {
  return <BlogListingPage />;
}
