import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import dynamic from "next/dynamic";

const FloatingAIChat = dynamic(
  () => import("@/components/FloatingAiChat").then((mod) => ({ default: mod.FloatingAIChat }))
);

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "NeuralGuru - AI Learning Dashboard",
  description: "Personalized AI-powered learning platform with adaptive practice, progress tracking, and expert tutoring",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-blue-600 focus:rounded-lg focus:shadow-lg focus:ring-2 focus:ring-blue-600"
        >
          Skip to main content
        </a>
        <Navbar />
        <div className="min-h-screen bg-[#FAF7F2]">
          <main id="main-content" className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto" tabIndex={-1}>
            {children}
          </main>
        </div>
        <FloatingAIChat />
      </body>
    </html>
  );
}
