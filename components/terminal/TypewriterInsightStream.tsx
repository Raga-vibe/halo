"use client";

import React, { useState, useEffect, useRef } from "react";
import { InsightItem } from "../../lib/types";

interface TypewriterInsightStreamProps {
  insights: InsightItem[];
}

export function TypewriterInsightStream({ insights }: TypewriterInsightStreamProps) {
  const [displayedText, setDisplayedText] = useState<Record<string, string>>({});
  const [isPaused, setIsPaused] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("ALL");
  const containerRef = useRef<HTMLDivElement>(null);

  // Typewriter effect on the latest incoming insight
  useEffect(() => {
    if (insights.length === 0) return;

    const latest = insights[0];
    const fullText = latest.detail;

    // If already typed, skip
    if (displayedText[latest.id] === fullText) return;

    let currentLength = 0;
    const interval = setInterval(() => {
      currentLength += 2;
      setDisplayedText((prev) => ({
        ...prev,
        [latest.id]: fullText.slice(0, currentLength),
      }));

      if (currentLength >= fullText.length) {
        clearInterval(interval);
      }
    }, 15);

    return () => clearInterval(interval);
  }, [insights]);

  // For older insights, ensure their full text is present
  useEffect(() => {
    setDisplayedText((prev) => {
      const next = { ...prev };
      insights.forEach((item, idx) => {
        if (idx > 0 && !next[item.id]) {
          next[item.id] = item.detail;
        }
      });
      return next;
    });
  }, [insights]);

  const categories = ["ALL", "ANOMALY", "VOLATILITY", "ORDERFLOW", "ONCHAIN"];

  const filteredInsights = insights.filter((item) => {
    if (selectedFilter === "ALL") return true;
    return item.category === selectedFilter;
  });

  return (
    <div className="flex flex-col h-full bg-[#0A0A0E] rounded-xl border border-white/[0.08] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.08] bg-[#0E0E12] text-[12px] font-mono">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#7CFFB2] animate-pulse" />
          <span className="font-semibold text-white tracking-tight">
            INTELLIGENCE STREAM
          </span>
          <span className="px-1.5 py-0.2 rounded bg-white/[0.06] text-[#7CFFB2] text-[10px]">
            SYNTHESIS
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="text-[11px] text-[#8A8F98] hover:text-white transition-colors"
          >
            {isPaused ? "RESUME" : "PAUSE"}
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 px-4 py-1.5 border-b border-white/[0.04] bg-[#0A0A0E] overflow-x-auto text-[10px] font-mono">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedFilter(cat)}
            className={`px-2 py-0.5 rounded transition-all ${
              selectedFilter === cat
                ? "bg-white/[0.12] text-white font-medium"
                : "text-[#8A8F98] hover:text-white hover:bg-white/[0.03]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Insight Feed */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 font-mono divide-y divide-white/[0.03]"
      >
        {filteredInsights.map((item, idx) => {
          const isLatest = idx === 0 && selectedFilter === "ALL";
          const currentDetail = displayedText[item.id] || (isLatest ? "" : item.detail);
          const isTyping = isLatest && currentDetail.length < item.detail.length;

          const levelColor =
            item.level === "critical"
              ? "text-[#FF5C5C] bg-[#FF5C5C]/10 border-[#FF5C5C]/30"
              : item.level === "warning"
              ? "text-[#FFD166] bg-[#FFD166]/10 border-[#FFD166]/30"
              : "text-[#7CFFB2] bg-[#7CFFB2]/10 border-[#7CFFB2]/30";

          return (
            <div key={item.id} className="pt-3 first:pt-0 flex flex-col gap-1.5 text-xs">
              {/* Badge & Timestamp */}
              <div className="flex items-center justify-between text-[11px] tabular-nums">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-1.5 py-0.5 rounded text-[9px] font-semibold border ${levelColor}`}
                  >
                    {item.category}
                  </span>
                  <span className="text-white font-medium">{item.symbol}</span>
                </div>
                <span className="text-[#8A8F98] text-[10px]">
                  {new Date(item.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </span>
              </div>

              {/* Headline */}
              <div className="text-white font-medium tracking-tight text-[13px] leading-snug">
                {item.headline}
              </div>

              {/* Plain-English Observation (Typewriter revealed) */}
              <div className="text-[#8A8F98] leading-relaxed text-[12px]">
                {currentDetail}
                {isTyping && (
                  <span className="inline-block w-1.5 h-3 ml-0.5 bg-[#7CFFB2] animate-cursor-blink align-middle" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
