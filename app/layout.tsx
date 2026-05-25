import type { Metadata } from "next";
import { LanguageProvider } from "@/lib/LanguageContext";
import { ToastProvider } from "@/components/ui/Toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LanguageToggle from "@/components/layout/LanguageToggle";
import PWAInstaller from "@/components/pwa/PWAInstaller";
import "./globals.css";

export const metadata: Metadata = {
  title: "FastCV PK — Pakistan's #1 Free CV & Biodata Maker 2026",
  description: "Create professional ATS-friendly CVs, Student Resumes, and beautiful Urdu Nastaliq Biodatas for free. Clean layouts, high-definition PDF download.",
  manifest: "/manifest.json",
  metadataBase: new URL("https://fastcvpk.online"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
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
  keywords: ["cv banana free", "biodata banana", "resume maker pakistan", "free cv maker urdu", "ats cv pakistan"],
  other: {
    "geo.region": "PK",
    "geo.placename": "Pakistan",
  }
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
      <head>
        <link rel="dns-prefetch" href="https://generativelanguage.googleapis.com" />
        <link rel="dns-prefetch" href="https://firestore.googleapis.com" />
        <link rel="preload" href="/logo.png" as="image" />
      </head>
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

            {/* PWA Mobile App Installer Banner */}
            <PWAInstaller />
          </LanguageProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
