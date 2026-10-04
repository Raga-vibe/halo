"use client";

import React from "react";
import Link from "next/link";

export default function TermsPage() {
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
            TERMS
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/terminal"
            className="px-3.5 py-1.5 rounded-full text-[13px] font-medium text-black bg-[#7CFFB2] hover:bg-[#8affbe] transition-colors"
          >
            Terminal
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 sm:px-12 py-16 sm:py-24 font-mono text-xs sm:text-sm">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] text-[#7CFFB2] mb-6">
          <span>LEGAL & TERMS OF SERVICE</span>
          <span className="text-white/30">&bull;</span>
          <span>LAST UPDATED: OCTOBER 2026</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-semibold font-sans tracking-[-0.035em] text-white mb-4">
          Terms of Service
        </h1>
        <p className="text-[#8A8F98] text-sm sm:text-base leading-relaxed mb-12 font-sans">
          These Terms of Service govern your access to and use of HALO, an open telemetry and market intelligence interface engineered by <strong className="text-white">Raga crypt</strong>.
        </p>

        <div className="space-y-10 text-[#8A8F98] leading-relaxed divide-y divide-white/[0.06]">
          <section className="pt-6 first:pt-0">
            <h2 className="text-base sm:text-lg font-semibold text-white font-sans mb-3">
              1. Non-Financial Advice Disclaimer
            </h2>
            <p className="mb-3">
              HALO is an analytical software tool designed solely for information, research, and technical observation. Nothing displayed within this application &mdash; including price charts, statistical anomalies, Z-score flags, rolling volatility indicators, correlation heatmaps, or typewriter insight feeds &mdash; constitutes financial, investment, legal, tax, or trading advice.
            </p>
            <p>
              Digital asset markets carry significant financial risk and severe volatility. You are solely responsible for your own trading and investment decisions. Never risk capital you cannot afford to lose.
            </p>
          </section>

          <section className="pt-8">
            <h2 className="text-base sm:text-lg font-semibold text-white font-sans mb-3">
              2. Data Sources & Telemetry Integrity
            </h2>
            <p className="mb-3">
              Market feeds, order books, and protocol metrics are retrieved directly in real time from public third-party APIs and WebSocket endpoints (including Binance, CoinGecko, and DeFiLlama). HALO does not guarantee the continuous availability, accuracy, timeliness, or completeness of third-party market data.
            </p>
            <p>
              When a third-party upstream data provider experiences outages, throttling, or rate limits, HALO provides mathematical simulation fallbacks clearly badged as simulated.
            </p>
          </section>

          <section className="pt-8">
            <h2 className="text-base sm:text-lg font-semibold text-white font-sans mb-3">
              3. Non-Custodial & No Transaction Execution
            </h2>
            <p className="mb-3">
              HALO is strictly a telemetry viewer and mathematical analytics workstation. HALO does not execute orders, hold user custody, process payments, route trades, or manage digital asset funds.
            </p>
            <p>
              HALO will never request access to your private cryptographic keys, seed phrases, or custodial exchange API secret keys.
            </p>
          </section>

          <section className="pt-8">
            <h2 className="text-base sm:text-lg font-semibold text-white font-sans mb-3">
              4. Intellectual Property & Attribution
            </h2>
            <p className="mb-3">
              HALO, including its interface design, visual shaders, 3D particle terrain architectures, and custom mathematical indicators, was designed and authored by <strong className="text-white">Raga crypt</strong>.
            </p>
            <p>
              Open-source distributions must maintain original copyright notices and creator attribution to Raga crypt in all deployments, forks, and distributions.
            </p>
          </section>

          <section className="pt-8">
            <h2 className="text-base sm:text-lg font-semibold text-white font-sans mb-3">
              5. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted under applicable law, HALO, its developers, and Raga crypt shall not be liable for any direct, indirect, incidental, punitive, or consequential damages resulting from your use of, or inability to use, this interface, including without limitation trading losses, missed opportunities, server downtime, or inaccurate data feeds.
            </p>
          </section>
        </div>

        {/* Back Link */}
        <div className="mt-16 pt-8 border-t border-white/[0.08]">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#7CFFB2] hover:underline"
          >
            &larr; Return to HALO Terminal
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/[0.08] py-8 px-6 sm:px-12 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#8A8F98]">
        <div>HALO &bull; BUILT BY RAGA CRYPT &bull; 2026</div>
        <div className="flex items-center gap-6">
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
          <Link href="/terminal" className="hover:text-white transition-colors">Terminal</Link>
        </div>
      </footer>
    </div>
  );
}
