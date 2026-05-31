import type { Metadata } from "next";
import TermsPage from "./terms-client";

export const metadata: Metadata = {
  title: "Terms & Conditions — FastCV PK",
  description: "FastCV PK Terms of Service and Conditions. Understand watermark removal checkouts, manual NayaPay/EasyPaisa verification guidelines, and digital asset refund rules.",
  alternates: {
    canonical: "https://fastcvpk.online/terms",
  },
  openGraph: {
    title: "Terms & Conditions — FastCV PK",
    description: "FastCV PK Terms of Service and Conditions. Understand watermark removal checkouts, manual NayaPay/EasyPaisa verification guidelines, and digital asset refund rules.",
    url: "https://fastcvpk.online/terms",
    siteName: "FastCV PK",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "FastCV PK Terms and Conditions",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions — FastCV PK",
    description: "FastCV PK Terms of Service and Conditions. Understand watermark removal checkouts, manual NayaPay/EasyPaisa verification guidelines, and digital asset refund rules.",
    images: ["/logo.png"],
  },
};

export default function TermsHubPage() {
  return <TermsPage />;
}
