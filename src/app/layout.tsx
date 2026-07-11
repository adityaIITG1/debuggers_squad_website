import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/components/cart/CartProvider";
import { ScrollMotion } from "@/components/motion/ScrollMotion";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.debuggerssquad.com"),
  title: {
    default: "Debuggers Squad | NeuroPulseAI, Healthtech & Neurotechnology",
    template: "%s | Debuggers Squad",
  },
  description:
    "Debuggers Squad is a Udyam/MSME registered micro enterprise from India founded by Aditya Kumar Singh, with Prakriti Jaiswal as co-founder, building affordable healthtech, neurotechnology, embedded electronics, AI-enabled healthcare software, and rehabilitation-feedback innovations including NeuroPulseAI.",
  keywords: [
    "Debuggers Squad",
    "NeuroPulseAI",
    "Aditya Kumar Singh",
    "Prakriti Jaiswal",
    "IIT Guwahati",
    "Udyam MSME registered micro enterprise",
    "healthtech India",
    "neurotechnology India",
    "EMG rehabilitation feedback prototype",
    "AI healthcare software",
    "embedded electronics",
    "Evolothon 1.0",
  ],
  alternates: {
    canonical: "https://www.debuggerssquad.com",
  },
  openGraph: {
    title: "Debuggers Squad | NeuroPulseAI, Healthtech & Neurotechnology",
    description:
      "Udyam/MSME registered Indian micro enterprise building affordable healthtech, neurotechnology, embedded electronics, AI-enabled healthcare software, and NeuroPulseAI rehabilitation-feedback innovation.",
    url: "https://www.debuggerssquad.com",
    siteName: "Debuggers Squad",
    images: [
      {
        url: "/images/neuropulseai/gallery/debuggers-squad-logo.jpeg",
        width: 1200,
        height: 630,
        alt: "Debuggers Squad logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Debuggers Squad | NeuroPulseAI",
    description:
      "Indian healthtech and neurotechnology micro enterprise behind NeuroPulseAI.",
    images: ["/images/neuropulseai/gallery/debuggers-squad-logo.jpeg"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Debuggers Squad",
  alternateName: "Debuggers Squad Trust & Legal Status",
  url: "https://www.debuggerssquad.com",
  logo: "https://www.debuggerssquad.com/images/neuropulseai/gallery/debuggers-squad-logo.jpeg",
  email: "debuggerssquad@gmail.com",
  founder: {
    "@type": "Person",
    name: "Aditya Kumar Singh",
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: "IIT Guwahati",
    },
  },
  member: [
    {
      "@type": "Person",
      name: "Prakriti Jaiswal",
      jobTitle: "Co-founder",
    },
  ],
  description:
    "Debuggers Squad is a Udyam/MSME registered micro enterprise from India focused on affordable healthtech, neurotechnology, embedded electronics, AI-enabled healthcare software, and rehabilitation-feedback innovation.",
  knowsAbout: [
    "NeuroPulseAI",
    "healthtech",
    "neurotechnology",
    "embedded electronics",
    "AI-enabled healthcare software",
    "EMG rehabilitation-feedback prototype",
    "biosignal visualization",
    "physiotherapy learning",
  ],
  award: "Best Category Award winner at Evolothon 1.0",
  owns: {
    "@type": "Product",
    name: "NeuroPulseAI",
    description:
      "Portable single-channel EMG rehabilitation-feedback prototype for education, research, physiotherapy learning, biosignal visualization, and rehabilitation technology demonstrations.",
    category: "Educational healthtech prototype",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
        <CartProvider>
          <ScrollMotion />
          <Navbar />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />
          <Toaster theme="light" position="bottom-right" />
        </CartProvider>
      </body>
    </html>
  );
}
