import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HALO — Institutional Market & On-Chain Intelligence Terminal | Built by Raga crypt",
  description:
    "Real-time market telemetry, Binance WebSocket tick feeds, statistical anomaly detection, and deep on-chain liquidity intelligence. Built by Raga crypt with Apple restraint and NVIDIA power.",
};

export const viewport: Viewport = {
  themeColor: "#050506",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark bg-[#050506] text-white`}
    >
      <body className="min-h-screen bg-[#050506] text-white selection:bg-[#7CFFB2] selection:text-black antialiased relative">
        <div className="fixed inset-0 pointer-events-none z-[999] bg-noise" />
        {children}
      </body>
    </html>
  );
}
