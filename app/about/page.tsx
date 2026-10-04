"use client";

import React from "react";
import Link from "next/link";
import { MagneticCTA } from "@/components/hero/MagneticCTA";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#050506] text-white flex flex-col font-sans selection:bg-[#7CFFB2] selection:text-black">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 w-full bg-[#08080B]/95 backdrop-blur border-b border-white/[0.08] px-6 sm:px-12 py-3 flex items-center justify-between text-xs font-mono">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-white tracking-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7CFFB2] rounded"
        >
          <div className="w-5 h-5 rounded-full border border-[#7CFFB2]/60 flex items-center justify-center bg-[#7CFFB2]/10">
            <div className="w-2 h-2 rounded-full bg-[#7CFFB2]" />
          </div>
          <span className="font-semibold text-lg tracking-[-0.04em] text-white">
            HALO
          </span>
          <span className="hidden sm:inline text-[11px] text-[#7CFFB2] px-2 py-0.5 rounded bg-[#7CFFB2]/10 border border-[#7CFFB2]/20">
            ABOUT
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/terminal"
            className="px-3.5 py-1.5 rounded-full text-[13px] font-medium text-black bg-[#7CFFB2] hover:bg-[#8affbe] transition-colors"
          >
            Launch Terminal
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 sm:px-12 py-16 sm:py-24">
        {/* Header Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-[#7CFFB2] mb-6">
          <span>MISSION & ARCHITECTURE</span>
          <span className="text-white/30">&bull;</span>
          <span>BUILT BY RAGA CRYPT</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-[-0.04em] text-white mb-8">
          Built for minds that move markets.
        </h1>

        <p className="text-[#8A8F98] text-lg sm:text-xl leading-relaxed max-w-3xl mb-16">
          HALO was conceived and engineered by <strong className="text-white">Raga crypt</strong> to solve a fundamental deficiency in modern crypto interfaces: the gap between overwhelming raw exchange data and actionable institutional insight.
        </p>

        {/* Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="p-8 rounded-2xl bg-[#09090D] border border-white/[0.08] flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs text-[#7CFFB2] tracking-wider uppercase mb-3">
                01 // DIRECT WEBSOCKET INGESTION
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">
                Zero Middlemen. Sub-8ms Latency.
              </h3>
              <p className="text-[#8A8F98] text-sm leading-relaxed">
                Most web-based analytics platforms funnel ticks through centralized caching servers that introduce hundreds of milliseconds of lag. HALO establishes direct, unmoderated WebSocket connections straight from your browser to exchange matching engines, streaming raw trades at the speed of the global orderbook.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/[0.06] font-mono text-xs text-white/50">
              PIPELINE: BINANCE RAW TRADE WEBSOCKET
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-[#09090D] border border-white/[0.08] flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs text-[#7CFFB2] tracking-wider uppercase mb-3">
                02 // STATISTICAL ANOMALY ENGINE
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">
                Algorithmic Rigor Over Hype.
              </h3>
              <p className="text-[#8A8F98] text-sm leading-relaxed">
                Raw prices mean nothing without mathematical context. HALO continuously computes real-time rolling volatility windows (20 and 50 period) and evaluates Z-scores (Z = (X - &mu;) / &sigma;) for price acceleration and volume surges. When an observation exceeds 2.5&sigma;, it is flagged as a high-probability institutional flow anomaly.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/[0.06] font-mono text-xs text-white/50">
              ALGORITHM: ROLLING GAUSSIAN Z-SCORE
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-[#09090D] border border-white/[0.08] flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs text-[#7CFFB2] tracking-wider uppercase mb-3">
                03 // CROSS-ASSET PEARSON CORRELATION
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">
                Multi-Asset Dependency Mapping.
              </h3>
              <p className="text-[#8A8F98] text-sm leading-relaxed">
                Crypto markets move in systemic waves and sudden idiosyncratic divergences. HALO calculates continuous Pearson correlation coefficients (r) across Bitcoin, Ethereum, Solana, and emerging ecosystem tokens, allowing operators to spot decoupling events in real time.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/[0.06] font-mono text-xs text-white/50">
              METRIC: REAL-TIME PEARSON MATRIX
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-[#09090D] border border-white/[0.08] flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs text-[#7CFFB2] tracking-wider uppercase mb-3">
                04 // APPLE RESTRAINT & NVIDIA POWER
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">
                Flawless Aesthetic Discipline.
              </h3>
              <p className="text-[#8A8F98] text-sm leading-relaxed">
                Zero purple-blue gradients, zero emojis, zero stock assets. A near-black canvas (`#050506`), ONE accent (Signal Green `#7CFFB2`) applied strictly for status and alpha indicators, 1px hairlines at 8% white, and tabular figures for every number.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/[0.06] font-mono text-xs text-white/50">
              DESIGN: 60FPS WEBGEL + GEIST MONO
            </div>
          </div>
        </div>

        {/* Creator Statement */}
        <div className="p-8 sm:p-10 rounded-2xl bg-white/[0.02] border border-white/[0.08] mb-20">
          <div className="font-mono text-xs text-[#7CFFB2] tracking-wider uppercase mb-3">
            CREATOR STATEMENT
          </div>
          <blockquote className="text-xl sm:text-2xl font-medium text-white leading-relaxed mb-6">
            &ldquo;We wanted a terminal that feels like a piece of high-precision aerospace machinery. No cartoonish hype, no delayed charts, no bloated dashboards. Just pure mathematical signal and hardware-grade execution speed.&rdquo;
          </blockquote>
          <div className="font-mono text-xs text-[#8A8F98]">
            &mdash; <span className="text-white font-semibold">Raga crypt</span>, Lead Product Designer & Creative Engineer
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-12 border-t border-white/[0.08]">
          <div>
            <h4 className="text-xl font-semibold text-white mb-1">
              Ready to experience HALO?
            </h4>
            <p className="text-[#8A8F98] text-sm">
              Live market telemetry running directly in your browser.
            </p>
          </div>
          <MagneticCTA href="/terminal">
            Launch Live Terminal
          </MagneticCTA>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/[0.08] py-8 px-6 sm:px-12 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#8A8F98]">
        <div>HALO &bull; BUILT BY RAGA CRYPT &bull; 2026</div>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          <Link href="/terminal" className="hover:text-white transition-colors">Terminal</Link>
        </div>
      </footer>
    </div>
  );
}
