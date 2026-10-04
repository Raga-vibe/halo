"use client";

import React from "react";
import Link from "next/link";

export default function PrivacyPage() {
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
            PRIVACY
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
          <span>LEGAL & DATA ETHICS</span>
          <span className="text-white/30">&bull;</span>
          <span>LAST UPDATED: OCTOBER 2026</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-semibold font-sans tracking-[-0.035em] text-white mb-4">
          Privacy Policy
        </h1>
        <p className="text-[#8A8F98] text-sm sm:text-base leading-relaxed mb-12 font-sans">
          HALO was engineered by <strong className="text-white">Raga crypt</strong> with a strict principle of zero-custody, zero-tracking, and zero personal data capture.
        </p>

        <div className="space-y-10 text-[#8A8F98] leading-relaxed divide-y divide-white/[0.06]">
          <section className="pt-6 first:pt-0">
            <h2 className="text-base sm:text-lg font-semibold text-white font-sans mb-3">
              1. Zero Personal Data Collection
            </h2>
            <p className="mb-2">
              HALO does not require account creation, email registration, wallet signatures, or authentication to operate. We do not collect, harvest, store, or sell any personally identifiable information (PII).
            </p>
            <p>
              You interact with HALO anonymously and without session profiling.
            </p>
          </section>

          <section className="pt-8">
            <h2 className="text-base sm:text-lg font-semibold text-white font-sans mb-3">
              2. Client-Side WebSocket & API Architecture
            </h2>
            <p className="mb-2">
              All live market data streams and telemetry feeds are queried directly from your web browser to public decentralized and exchange endpoints:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-white/80 my-3">
              <li>
                <strong className="text-white">Binance Public WebSocket:</strong> Direct TLS connection to <code>wss://stream.binance.com:9443</code> for raw public trade executions.
              </li>
              <li>
                <strong className="text-white">CoinGecko Public API:</strong> Standard public endpoint queries for global 24h market metrics.
              </li>
              <li>
                <strong className="text-white">DeFiLlama Public API:</strong> Public aggregate TVL and chain volume endpoints.
              </li>
            </ul>
            <p>
              Your IP address is transmitted directly to these public third-party endpoints as required by standard internet TCP/IP routing. HALO operates zero intermediate logging proxies.
            </p>
          </section>

          <section className="pt-8">
            <h2 className="text-base sm:text-lg font-semibold text-white font-sans mb-3">
              3. Cookies & Local Browser Storage
            </h2>
            <p className="mb-2">
              HALO does not use advertising cookies, third-party analytics pixels, or behavioral cross-site trackers.
            </p>
            <p>
              We may utilize your browser&apos;s local storage strictly to remember your client-side UI preferences (such as selected timeframe, layout density, and audio/visual toggles). This data never leaves your local device.
            </p>
          </section>

          <section className="pt-8">
            <h2 className="text-base sm:text-lg font-semibold text-white font-sans mb-3">
              4. Non-Custodial Architecture
            </h2>
            <p>
              HALO is an information display and statistical telemetry interface. It never requests private keys, seed phrases, or wallet connection permissions. Never enter private keys or sensitive credentials into any web application.
            </p>
          </section>

          <section className="pt-8">
            <h2 className="text-base sm:text-lg font-semibold text-white font-sans mb-3">
              5. Creator Contact & Inquiries
            </h2>
            <p>
              HALO is developed and maintained by <strong className="text-white">Raga crypt</strong>. For inquiries, architectural audits, or feedback, refer to the official repository.
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
          <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          <Link href="/terminal" className="hover:text-white transition-colors">Terminal</Link>
        </div>
      </footer>
    </div>
  );
}
