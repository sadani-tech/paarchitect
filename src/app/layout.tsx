import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { PageTransition } from "@/components/motion/PageTransition";
import { siteConfig } from "@/data/site";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Arsitektur, Interior & Visualisasi`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "arsitek Solo",
    "jasa arsitek Surakarta",
    "desain interior Jawa Tengah",
    "studio arsitektur",
    "visualisasi 3D arsitektur",
  ],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Arsitektur, Interior & Visualisasi`,
    description: siteConfig.description,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f4f2ee",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" data-scroll-behavior="smooth" className={`${display.variable} ${sans.variable}`}>
      <body>
        <MotionProvider>
          <Header />
          <PageTransition>{children}</PageTransition>
          <Footer />
          <CustomCursor />
        </MotionProvider>
      </body>
    </html>
  );
}
