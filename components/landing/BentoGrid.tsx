"use client";

import React from "react";
import { BentoCard } from "./BentoCard";

export function BentoGrid() {
  return (
    <section className="relative w-full py-28 sm:py-36 bg-[#050506] border-t border-white/[0.08] px-6 sm:px-12 lg:px-16 text-white">
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-start max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-[11px] font-mono text-[#7CFFB2] mb-4">
            <span>ENGINEERED ARCHITECTURE</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.035em] text-white mb-6">
            Institutional power.
            <br />
            Sub-millisecond clarity.
          </h2>
          <p className="text-[#8A8F98] text-base sm:text-lg leading-relaxed">
            Every layer of HALO is synthesized for precision. Zero noise, zero bloated abstractions.
            Hardware-accelerated mathematical models paired with direct raw socket feeds.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Direct Ingestion WebSocket (Spans 2 cols on lg) */}
          <BentoCard
            category="DATA PIPELINE"
            title="Direct Binance WebSocket Ingestion"
            description="Bypasses third-party data aggregators with direct public socket streams for BTC, ETH, and SOL. Measured tick-to-render latency under 8.2 milliseconds."
            className="lg:col-span-2 min-h-[360px]"
          >
            <div className="p-4 rounded-xl bg-[#0F0F14] border border-white/[0.06] font-mono text-xs space-y-2.5">
              <div className="flex items-center justify-between text-[#8A8F98] text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7CFFB2] animate-pulse" />
                  <span>wss://stream.binance.com:9443</span>
                </div>
                <span className="text-[#7CFFB2]">CONNECTED &bull; 4.8ms</span>
              </div>
              <div className="grid grid-cols-3 gap-3 pt-2 text-center tabular-nums">
                <div className="p-2 rounded bg-white/[0.02]">
                  <div className="text-[10px] text-[#8A8F98]">THROUGHPUT</div>
                  <div className="text-white font-bold text-sm mt-0.5">18.4k ticks/s</div>
                </div>
                <div className="p-2 rounded bg-white/[0.02]">
                  <div className="text-[10px] text-[#8A8F98]">PACKET LOSS</div>
                  <div className="text-[#7CFFB2] font-bold text-sm mt-0.5">0.000%</div>
                </div>
                <div className="p-2 rounded bg-white/[0.02]">
                  <div className="text-[10px] text-[#8A8F98]">TLS CIPHER</div>
                  <div className="text-white font-bold text-sm mt-0.5">AES-256-GCM</div>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Card 2: Z-Score Anomaly Engine */}
          <BentoCard
            category="MATHEMATICAL RIGOR"
            title="Z-Score Anomaly Radar"
            description="Computes standard deviations in rolling windows to flag extreme volumetric and price spikes exceeding 2.5σ threshold limits."
            className="min-h-[360px]"
          >
            <div className="p-4 rounded-xl bg-[#0F0F14] border border-white/[0.06] font-mono text-xs flex flex-col items-center justify-center gap-3">
              <div className="relative w-full h-20 flex items-center justify-center">
                {/* Visual Normal Bell Curve Wireframe */}
                <svg className="w-full h-full text-[#7CFFB2]" viewBox="0 0 200 60" fill="none">
                  <path
                    d="M 10 55 C 60 55, 80 50, 100 8 C 120 50, 140 55, 190 55"
                    stroke="rgba(255, 255, 255, 0.2)"
                    strokeWidth="1.5"
                  />
                  {/* Highlighted anomaly tail */}
                  <path
                    d="M 140 55 C 160 55, 175 55, 190 55"
                    stroke="#FF5C5C"
                    strokeWidth="3"
                  />
                  <line x1="140" y1="10" x2="140" y2="55" stroke="#FF5C5C" strokeDasharray="3 3" />
                </svg>
              </div>
              <div className="flex items-center justify-between w-full text-[11px] text-[#8A8F98]">
                <span>&mu; - 3&sigma;</span>
                <span className="text-white font-semibold">Mean (&mu;)</span>
                <span className="text-[#FF5C5C] font-semibold">&mu; + 2.5&sigma; [FLAG]</span>
              </div>
            </div>
          </BentoCard>

          {/* Card 3: Cross-Asset Pearson Heatmap */}
          <BentoCard
            category="CORRELATION"
            title="Cross-Asset Dependency"
            description="Dynamic Pearson correlation coefficients track co-movement and decoupling between Bitcoin, Ethereum, and emerging ecosystem tokens."
            className="min-h-[360px]"
          >
            <div className="p-3 rounded-xl bg-[#0F0F14] border border-white/[0.06] font-mono text-[10px] space-y-1.5 tabular-nums">
              <div className="flex justify-between text-[#8A8F98]">
                <span>PAIR</span>
                <span>PEARSON (r)</span>
                <span>STATE</span>
              </div>
              {[
                { pair: "BTC / ETH", r: "+0.88", state: "Coupled", col: "text-[#7CFFB2]" },
                { pair: "BTC / SOL", r: "+0.74", state: "Aligned", col: "text-[#7CFFB2]" },
                { pair: "SOL / SUI", r: "+0.69", state: "Dynamic", col: "text-[#7CFFB2]" },
                { pair: "BTC / AVAX", r: "+0.28", state: "Divergent", col: "text-[#FFD166]" },
              ].map((row) => (
                <div key={row.pair} className="flex justify-between py-1 border-t border-white/[0.04]">
                  <span className="text-white font-medium">{row.pair}</span>
                  <span className={row.col}>{row.r}</span>
                  <span className="text-[#8A8F98]">{row.state}</span>
                </div>
              ))}
            </div>
          </BentoCard>

          {/* Card 4: Typewriter Intelligence Stream (Spans 2 cols on lg) */}
          <BentoCard
            category="ANALYST FEED"
            title="Typewriter Intelligence Stream"
            description="Translates complex mathematical volatility, liquidation pressure, and correlation decay into plain-English observations in real time."
            className="lg:col-span-2 min-h-[360px]"
          >
            <div className="p-4 rounded-xl bg-[#0F0F14] border border-white/[0.06] font-mono text-xs space-y-2">
              <div className="flex items-center gap-2 text-[#7CFFB2] text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7CFFB2] animate-pulse" />
                <span>INTELLIGENCE RADAR ACTIVE</span>
              </div>
              <p className="text-white/90 leading-relaxed text-[13px]">
                &ldquo;BTC 1m volume surged to <span className="text-[#FF5C5C] font-semibold">+3.42&sigma;</span> above baseline ($18.4M burst). Buy-side delta dominating 68%. Implied volatility spread expanding from 1.4% to 3.8% — directional breakout continuation probable.&rdquo;
                <span className="inline-block w-1.5 h-3 ml-1 bg-[#7CFFB2] animate-cursor-blink" />
              </p>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}
