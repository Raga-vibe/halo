"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MagneticCTA } from "./MagneticCTA";

const ParticleScene = dynamic(
  () => import("./ParticleScene").then((mod) => mod.ParticleScene),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-[#050506]" />,
  }
);

export function Hero() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }
      if (e.key === "t" || e.key === "T") {
        router.push("/terminal");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return (
    <section className="relative w-full min-h-screen lg:h-screen flex flex-col justify-between overflow-hidden bg-[#050506] px-5 sm:px-10 lg:px-16 pt-5 pb-6">
      {/* 3D React-Three-Fiber Interactive Particle Scene */}
      <ParticleScene />

      {/* Top Navigation */}
      <header className="relative z-20 flex items-center justify-between w-full max-w-7xl mx-auto py-2">
        {/* Brand Lockup */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-white tracking-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7CFFB2] rounded-md"
          >
            <div className="w-5 h-5 rounded-full border border-[#7CFFB2]/60 flex items-center justify-center bg-[#7CFFB2]/10">
              <div className="w-2 h-2 rounded-full bg-[#7CFFB2]" />
            </div>
            <span className="font-semibold text-lg tracking-[-0.04em] text-white">
              HALO
            </span>
          </Link>

          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-[11px] font-mono tabular-nums text-[#8A8F98]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7CFFB2] animate-pulse" />
            <span className="hidden xs:inline text-[#8A8F98]">FEED</span>
            <span className="text-white font-medium">LIVE</span>
          </div>
        </div>

        {/* Live Mini Ticker */}
        <div className="hidden lg:flex items-center gap-6 text-[13px] font-mono tabular-nums">
          <div className="flex items-center gap-2 text-[#8A8F98]">
            <span className="text-white/50">BTC/USDT</span>
            <span className="text-white font-medium">$91,420.50</span>
            <span className="text-[#7CFFB2] text-[11px]">+2.84%</span>
          </div>
          <div className="h-3 w-px bg-white/[0.08]" />
          <div className="flex items-center gap-2 text-[#8A8F98]">
            <span className="text-white/50">ETH/USDT</span>
            <span className="text-white font-medium">$3,312.80</span>
            <span className="text-[#7CFFB2] text-[11px]">+1.92%</span>
          </div>
          <div className="h-3 w-px bg-white/[0.08]" />
          <div className="flex items-center gap-2 text-[#8A8F98]">
            <span className="text-white/50">SOL/USDT</span>
            <span className="text-white font-medium">$194.45</span>
            <span className="text-[#7CFFB2] text-[11px]">+4.16%</span>
          </div>
        </div>

        {/* Nav Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="#story"
            className="hidden sm:inline-block text-[13px] text-[#8A8F98] hover:text-white transition-colors duration-200"
          >
            Capabilities
          </Link>
          <Link
            href="/terminal"
            className="relative px-3.5 py-1.5 rounded-full text-[13px] font-medium text-black bg-[#7CFFB2] hover:bg-[#8affbe] transition-colors duration-200 tracking-tight flex items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            <span>Terminal</span>
            <span className="font-mono text-[10px] px-1 py-0.2 bg-black/20 rounded">
              T
            </span>
          </Link>
        </div>
      </header>

      {/* Hero Centerpiece */}
      <div className="relative z-10 w-full max-w-7xl mx-auto my-auto flex flex-col items-start justify-center pt-8 pb-8">
        {/* Subhead Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#7CFFB2]" />
          <span className="text-[11px] sm:text-[12px] font-mono tracking-wide uppercase text-[#8A8F98]">
            Next-Gen Market Intelligence
          </span>
          <span className="text-[11px] font-mono text-white/30">|</span>
          <span className="text-[11px] sm:text-[12px] font-mono text-[#7CFFB2]">v2.4 Live</span>
        </div>

        {/* The One Monumental Line of Copy (112px-140px on large desktop) */}
        <h1 className="text-white font-semibold text-[40px] sm:text-[68px] md:text-[90px] lg:text-[112px] xl:text-[128px] leading-[0.93] tracking-[-0.04em] max-w-5xl mb-6 selection:bg-[#7CFFB2] selection:text-black">
          The terminal for minds that move markets.
        </h1>

        {/* 17px Muted Gray Body Copy */}
        <p className="text-[#8A8F98] text-[15px] sm:text-[17px] leading-[1.6] max-w-xl mb-8 tracking-[-0.01em]">
          Institutional-grade orderbook depth, microsecond Binance tick telemetry,
          real-time statistical anomaly flags, and multi-asset correlation matrices.
          Engineered for algorithmic speed and human intuition.
        </p>

        {/* Magnetic CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <MagneticCTA href="/terminal">
            Launch Live Terminal
          </MagneticCTA>

          <span className="text-[12px] font-mono text-[#8A8F98]/70 pl-1">
            Direct Binance WebSocket &bull; Zero API Key
          </span>
        </div>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="relative z-10 w-full max-w-7xl mx-auto pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] sm:text-[12px] font-mono tabular-nums text-[#8A8F98]">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7CFFB2]" />
            <span className="text-white/40">ENGINE:</span>
            <span className="text-white">HALO HYPER-TICK</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-white/40">LATENCY:</span>
            <span className="text-[#7CFFB2]">&lt; 8.2ms</span>
          </div>
          <div className="hidden md:flex items-center gap-1.5">
            <span className="text-white/40">PIPELINE:</span>
            <span className="text-white">BINANCE + LLAMA</span>
          </div>
        </div>

        <div className="flex items-center justify-between w-full sm:w-auto gap-6 text-[#8A8F98]">
          <div className="flex items-center gap-1.5">
            <span className="text-white/40">ANOMALY:</span>
            <span className="text-white font-medium">Z-SCORE &gt; 2.5&sigma;</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-white/40">SCROLL</span>
            <svg
              className="w-3 h-3 text-[#7CFFB2] animate-bounce"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
