"use client";

import React, { useEffect, useRef, useState } from "react";

interface SpecItem {
  number: string;
  unit: string;
  title: string;
  specNote: string;
  fillPct: number;
}

export function NvidiaSpecSheet() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fill bars smoothly on mount
    const timer = setTimeout(() => setIsVisible(true), 300);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const specs: SpecItem[] = [
    {
      number: "8.2",
      unit: "ms",
      title: "INGESTION LATENCY",
      specNote: "99.9th percentile raw WebSocket socket tick latency direct to GPU canvas",
      fillPct: 96,
    },
    {
      number: "14.2",
      unit: "B+",
      title: "24H AGGREGATED DEPTH",
      specNote: "Multi-venue orderbook liquidity tracked across spot and perpetual contracts",
      fillPct: 88,
    },
    {
      number: "99.99",
      unit: "%",
      title: "TELEMETRY UPTIME",
      specNote: "Continuous pipeline availability with automated simulation fallback",
      fillPct: 100,
    },
    {
      number: "1,280",
      unit: "+",
      title: "ON-CHAIN PROTOCOLS",
      specNote: "DeFiLlama indexing layer querying cross-chain TVL across 24 Layer 1/2 chains",
      fillPct: 92,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-28 sm:py-36 bg-[#050506] border-t border-white/[0.08] px-6 sm:px-12 lg:px-16 text-white overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* NVIDIA Spec Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pb-12 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-[#7CFFB2] mb-4">
              <span>HARDWARE-GRADE TELEMETRY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.04em] text-white">
              System Specifications
            </h2>
          </div>
          <div className="font-mono text-xs text-[#8A8F98] text-left sm:text-right">
            <div>ARCHITECTURE: HALO CORE v2.4</div>
            <div className="text-[#7CFFB2]">BENCHMARK: VALIDATED</div>
          </div>
        </div>

        {/* Spec Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/[0.08] border-b border-white/[0.08]">
          {specs.map((item, idx) => (
            <div
              key={item.title}
              className={`py-12 sm:py-16 ${
                idx % 2 === 0 ? "md:pr-12" : "md:pl-12"
              } flex flex-col justify-between`}
            >
              {/* Category Title */}
              <div className="font-mono text-xs text-[#8A8F98] tracking-wider uppercase mb-6 flex items-center justify-between">
                <span>{item.title}</span>
                <span className="text-white/40">SPEC // 0{idx + 1}</span>
              </div>

              {/* Giant NVIDIA Spec Numbers */}
              <div className="flex items-baseline gap-1 font-mono tabular-nums font-semibold mb-6">
                <span className="text-6xl sm:text-7xl lg:text-8xl tracking-[-0.05em] text-white">
                  {item.number}
                </span>
                <span className="text-2xl sm:text-3xl lg:text-4xl text-[#7CFFB2] tracking-tight">
                  {item.unit}
                </span>
              </div>

              {/* Animated Spec Telemetry Bar */}
              <div className="w-full h-2 bg-[#121218] rounded-full overflow-hidden mb-6 relative">
                <div
                  className="h-full bg-[#7CFFB2] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    width: isVisible ? `${item.fillPct}%` : "0%",
                    boxShadow: "0 0 12px rgba(124, 255, 178, 0.4)",
                  }}
                />
              </div>

              {/* Spec Note */}
              <p className="text-[#8A8F98] text-sm sm:text-base leading-relaxed">
                {item.specNote}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
