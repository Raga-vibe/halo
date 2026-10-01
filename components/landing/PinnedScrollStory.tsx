"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function PinnedScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const [activeBeat, setActiveBeat] = useState(0);

  const beats = [
    {
      index: "01",
      title: "See everything.",
      tag: "GLOBAL LIQUIDITY MATRIX",
      description:
        "Direct connection to Binance public WebSocket streams and cross-chain liquidity pipelines. Orderbook depth, aggregated volume deltas, and multi-asset price action converge onto a single plane of glass.",
      stats: [
        { label: "INGESTION LATENCY", val: "6.4ms" },
        { label: "STREAM INTEGRITY", val: "100%" },
        { label: "TICK VELOCITY", val: "14.2k/s" },
      ],
    },
    {
      index: "02",
      title: "Understand instantly.",
      tag: "STATISTICAL ANOMALY ENGINE",
      description:
        "Real-time continuous standard deviation and Z-score anomaly scanning. When volatility spikes or volume expands beyond 2.5σ, algorithmic synthesis turns raw figures into plain-English observations.",
      stats: [
        { label: "Z-SCORE THRESHOLD", val: "> 2.5σ" },
        { label: "ROLLING WINDOW", val: "20 / 50 Period" },
        { label: "SYNTHESIS DELAY", val: "< 12ms" },
      ],
    },
    {
      index: "03",
      title: "Move first.",
      tag: "EXECUTION TELEMETRY",
      description:
        "Sub-millisecond signal distribution and cross-asset correlation analysis. Identify divergence across Bitcoin, Ethereum, and high-beta ecosystems before the broader orderbook rebalances.",
      stats: [
        { label: "PEARSON CORRELATION", val: "Real-time" },
        { label: "SLIPPAGE ESTIMATE", val: "0.012%" },
        { label: "ORDER ROUTING", val: "Direct Socket" },
      ],
    },
  ];

  useEffect(() => {
    // Only pin on desktop (>= 1024px) for optimal touch scroll physics on mobile
    if (typeof window === "undefined" || window.innerWidth < 1024) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    const st = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "+=180%",
      pin: true,
      scrub: 0.6,
      anticipatePin: 1,
      onUpdate: (self) => {
        const p = self.progress;
        if (p < 0.33) setActiveBeat(0);
        else if (p < 0.66) setActiveBeat(1);
        else setActiveBeat(2);
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  const currentBeat = beats[activeBeat];

  return (
    <section
      id="story"
      ref={containerRef}
      className="relative w-full lg:h-screen py-20 lg:py-0 bg-[#050506] border-t border-white/[0.08] text-white flex flex-col justify-center px-6 sm:px-12 lg:px-16"
    >
      <div
        ref={pinWrapRef}
        className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
      >
        {/* Left Column: Story Copy & Narrative */}
        <div className="lg:col-span-6 flex flex-col items-start justify-center">
          {/* Beat Indicator Tabs */}
          <div className="flex items-center gap-2 mb-6">
            {beats.map((b, i) => (
              <button
                key={b.index}
                onClick={() => setActiveBeat(i)}
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono transition-all duration-300 ${
                  activeBeat === i
                    ? "bg-[#7CFFB2]/15 text-[#7CFFB2] border border-[#7CFFB2]/30"
                    : "bg-white/[0.03] text-[#8A8F98] border border-white/[0.06] hover:text-white"
                }`}
              >
                <span>{b.index}</span>
                <span className="hidden sm:inline font-semibold">{b.tag}</span>
              </button>
            ))}
          </div>

          {/* Monumental Headline */}
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-[-0.04em] text-white mb-6 transition-all duration-300">
            {currentBeat.title}
          </h2>

          {/* Body Paragraph */}
          <p className="text-[#8A8F98] text-base sm:text-lg leading-relaxed mb-8 max-w-xl transition-all duration-300">
            {currentBeat.description}
          </p>

          {/* Stat Specs */}
          <div className="grid grid-cols-3 gap-4 w-full pt-6 border-t border-white/[0.08] text-xs font-mono tabular-nums">
            {currentBeat.stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <span className="text-[#8A8F98] text-[10px] sm:text-[11px] uppercase tracking-wider">
                  {s.label}
                </span>
                <span className="text-white text-base sm:text-xl font-bold tracking-tight">
                  {s.val}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Live Interactive UI Assembly Showcase */}
        <div className="lg:col-span-6 relative w-full h-[380px] sm:h-[460px] rounded-2xl bg-[#0A0A0E] border border-white/[0.08] p-5 sm:p-6 overflow-hidden flex flex-col justify-between shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
          {/* Card Frame Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#7CFFB2] animate-pulse" />
              <span className="text-white font-medium tracking-tight">
                HALO CORE ARCHITECTURE
              </span>
            </div>
            <span className="text-[#7CFFB2] px-2 py-0.5 rounded bg-[#7CFFB2]/10 border border-[#7CFFB2]/20 text-[10px]">
              PHASE {currentBeat.index} / 03
            </span>
          </div>

          {/* Dynamic Content depending on active beat */}
          <div className="flex-1 py-4 flex flex-col justify-center">
            {activeBeat === 0 && (
              <div className="space-y-3 font-mono text-xs animate-in fade-in duration-300">
                <div className="text-[11px] text-[#8A8F98] flex justify-between">
                  <span>AGGREGATED ORDERBOOK DEPTH</span>
                  <span className="text-[#7CFFB2]">$84.2M SPREAD DEPTH</span>
                </div>
                {/* Simulated Orderbook Ladder */}
                <div className="space-y-1.5 tabular-nums">
                  {[
                    { price: "91,520.00", size: "14.28", type: "ask", pct: 85 },
                    { price: "91,480.50", size: "8.92", type: "ask", pct: 54 },
                    { price: "91,450.00", size: "26.40", type: "mid", pct: 100 },
                    { price: "91,420.00", size: "18.15", type: "bid", pct: 72 },
                    { price: "91,380.00", size: "32.04", type: "bid", pct: 92 },
                  ].map((row, i) => (
                    <div
                      key={i}
                      className="relative flex items-center justify-between px-3 py-1.5 rounded bg-white/[0.02] overflow-hidden"
                    >
                      <div
                        className={`absolute top-0 bottom-0 left-0 opacity-15 ${
                          row.type === "ask"
                            ? "bg-[#FF5C5C]"
                            : row.type === "mid"
                            ? "bg-[#7CFFB2]"
                            : "bg-[#7CFFB2]"
                        }`}
                        style={{ width: `${row.pct}%` }}
                      />
                      <span
                        className={
                          row.type === "ask"
                            ? "text-[#FF5C5C]"
                            : row.type === "mid"
                            ? "text-white font-bold"
                            : "text-[#7CFFB2]"
                        }
                      >
                        ${row.price}
                      </span>
                      <span className="text-[#8A8F98]">{row.size} BTC</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeBeat === 1 && (
              <div className="space-y-4 font-mono text-xs animate-in fade-in duration-300">
                <div className="p-3.5 rounded-lg bg-[#FF5C5C]/10 border border-[#FF5C5C]/30 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#FF5C5C] animate-ping" />
                    <div>
                      <div className="text-white font-semibold">
                        VOLUMETRIC ANOMALY TRIGGERED
                      </div>
                      <div className="text-[#8A8F98] text-[11px]">
                        Z-Score: +3.42σ above 20-period moving average
                      </div>
                    </div>
                  </div>
                  <span className="text-[#FF5C5C] font-bold text-sm">HIGH</span>
                </div>

                <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06] text-[#8A8F98] leading-relaxed text-[11px]">
                  <span className="text-[#7CFFB2] font-semibold">ANALYST SYNTHESIS:</span>{" "}
                  Sudden 1m taker buy concentration absorbed $18.4M liquidations.
                  Implied volatility spread expanding from 1.4% to 3.8%. High likelihood
                  of directional continuation.
                </div>
              </div>
            )}

            {activeBeat === 2 && (
              <div className="space-y-3 font-mono text-xs animate-in fade-in duration-300">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                    <div className="text-[#8A8F98] text-[10px]">TICK LATENCY</div>
                    <div className="text-xl font-bold text-[#7CFFB2] mt-1">4.2 ms</div>
                    <div className="text-[10px] text-white/40 mt-0.5">TLS 1.3 / TCP FASTOPEN</div>
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                    <div className="text-[#8A8F98] text-[10px]">CORRELATION DIVERGENCE</div>
                    <div className="text-xl font-bold text-white mt-1">r = +0.22</div>
                    <div className="text-[10px] text-[#7CFFB2] mt-0.5">SOL/BTC Decoupled</div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#7CFFB2]/10 border border-[#7CFFB2]/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7CFFB2]" />
                    <span className="text-white font-medium text-[11px]">
                      SIGNAL CONVERGENCE: READY
                    </span>
                  </div>
                  <span className="text-[#7CFFB2] font-mono text-[11px]">OPTIMAL ALPHA</span>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Card Telemetry Footer */}
          <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-[#8A8F98]">
            <span>NODE STATUS: SYNCHRONIZED</span>
            <span className="text-white/60">FPS: 60.0 LOCKED</span>
          </div>
        </div>
      </div>
    </section>
  );
}
