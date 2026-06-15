import type { Metadata } from "next";
import { LanguageProvider } from "@/lib/LanguageContext";
import { ToastProvider } from "@/components/ui/Toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LanguageToggle from "@/components/layout/LanguageToggle";
import PWAInstaller from "@/components/pwa/PWAInstaller";
import "./globals.css";

export const metadata: Metadata = {
  title: "FastCV PK | Free ATS Resume Builder & Urdu Nastaliq Biodata Maker",
  description: "Build a 100% ATS-compliant CV or stunning Urdu Nastaliq Biodata for free. Instant HD PDF download. AI-powered description writer. No watermark. Start building now!",
  manifest: "/manifest.json",
  metadataBase: new URL("https://fastcvpk.online"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
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
        alt: "FastCV PK - Pakistan's Free CV & Biodata Maker",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FastCV PK | Free ATS Resume Builder & Urdu Nastaliq Biodata Maker",
    description: "Build a 100% ATS-compliant CV or stunning Urdu Nastaliq Biodata for free. Instant HD PDF download. AI-powered writer.",
    images: ["/logo.png"],
  },
  keywords: [
    "fastcv",
    "fastcvpk",
    "fastcvpk.online",
    "cv banana",
    "cv banana free",
    "biodata banana",
    "resume maker pakistan",
    "free cv maker urdu",
    "ats cv pakistan",
    "ats friendly cv maker",
    "pakistan resume builder",
    "cv maker online",
    "job cv maker"
  ],
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
  // JSON-LD Structured Data Schema for Search Engine crawlers
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://fastcvpk.online/#organization",
        "name": "FastCV PK",
        "url": "https://fastcvpk.online",
        "logo": "https://fastcvpk.online/logo.png",
        "description": "Pakistan's #1 Free Online CV & Biodata Maker.",
        "sameAs": []
      },
      {
        "@type": "WebSite",
        "@id": "https://fastcvpk.online/#website",
        "url": "https://fastcvpk.online",
        "name": "FastCV PK",
        "description": "Create professional ATS-friendly CVs, Student Resumes, and beautiful Urdu Nastaliq Biodatas for free.",
        "publisher": {
          "@id": "https://fastcvpk.online/#organization"
        }
      },
      {
        "@type": "WebApplication",
        "@id": "https://fastcvpk.online/#webapp",
        "url": "https://fastcvpk.online",
        "name": "FastCV PK",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "All",
        "browserRequirements": "Requires HTML5",
        "offers": {
          "@type": "Offer",
          "price": "0.00",
          "priceCurrency": "PKR"
        }
      }
    ]
  };

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="dns-prefetch" href="https://generativelanguage.googleapis.com" />
        <link rel="dns-prefetch" href="https://firestore.googleapis.com" />
        <link rel="preload" href="/logo.png" as="image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
