import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, Great_Vibes } from "next/font/google";
import "./globals.css";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import Layout from "@/components/Layout";

const heading = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const script = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FamBam 2026 | Ibukun & Ayobami",
  description:
    "Together with our families, we invite you to celebrate the wedding of Ibukun & Ayobami, November 19 & 20, 2026, Marrakech, Morocco. #FamBam2026",
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/icon.svg",
    apple: "/icons/icon.svg",
  },
  openGraph: {
    title: "FamBam 2026 | Ibukun & Ayobami",
    description:
      "Together with our families, we invite you to celebrate our wedding, November 19 & 20, 2026, Marrakech, Morocco.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FAF8F5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${heading.variable} ${body.variable} ${script.variable} font-body bg-ivory text-charcoal antialiased overflow-x-hidden`}
      >
        <Layout>{children}</Layout>
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
