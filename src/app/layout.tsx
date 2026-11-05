import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Navlinks from "@/components/NavLinks";
import Marquee from "@/components/Marquee";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bazar Dor | বাজার দর",
  description: "আজকের বাজারের দাম এক নজরে",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F0F5F0]/40">
        {/* Top-Right Toast Notification Container */}
        <Toaster position="top-right" reverseOrder={false} />

        <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
          <Navbar />
          <Suspense fallback={<div className="h-10 bg-gray-50 animate-pulse" />}>
            <Navlinks />
          </Suspense>
        </header>

        <Suspense fallback={<div className="h-8 bg-gray-100 animate-pulse" />}>
          <Marquee />
        </Suspense>

        <main className="min-h-240 flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}