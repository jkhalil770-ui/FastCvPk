import type { Metadata } from "next";
import { LanguageProvider } from "@/lib/LanguageContext";
import { ToastProvider } from "@/components/ui/Toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LanguageToggle from "@/components/layout/LanguageToggle";
import "./globals.css";

export const metadata: Metadata = {
  title: "FastCV PK — Pakistan's #1 Free CV & Biodata Maker 2026",
  description: "Create professional ATS-friendly CVs, Student Resumes, and beautiful Urdu Nastaliq Biodatas for free. Clean layouts, high-definition PDF download.",
  metadataBase: new URL("https://fastcvpk.online"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "FastCV PK — Pakistan's #1 Free CV & Biodata Maker 2026",
    description: "Create professional ATS-friendly CVs, Student Resumes, and beautiful Urdu Nastaliq Biodatas for free.",
    url: "https://fastcvpk.online",
    siteName: "FastCV PK",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "FastCV PK - Pakistan's Free CV & Biodata Maker",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FastCV PK — Pakistan's #1 Free CV & Biodata Maker",
    description: "Create professional ATS-friendly CVs and beautiful Urdu Nastaliq Biodatas for free.",
    images: ["/logo.png"],
  },
};

/**
 * Root Application Layout
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen flex flex-col bg-background">
        <ToastProvider>
          <LanguageProvider>
            {/* Navigation Header */}
            <Navbar />
            
            {/* Primary Main Container */}
            <main className="flex-1 flex flex-col">
              {children}
            </main>
            
            {/* Navigation Footer */}
            <Footer />
          </LanguageProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
