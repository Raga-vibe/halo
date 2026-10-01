"use client";

import React from "react";
import { GlobalDeFiData } from "../../lib/types";

interface ProtocolTvlPanelProps {
  data: GlobalDeFiData;
}

export function ProtocolTvlPanel({ data }: ProtocolTvlPanelProps) {
  return (
    <div className="flex flex-col h-full bg-[#0A0A0E] rounded-xl border border-white/[0.08] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.08] bg-[#0E0E12] text-[12px] font-mono">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#7CFFB2]" />
          <span className="font-semibold text-white tracking-tight">
            DEFILLAMA ON-CHAIN LIQUIDITY
          </span>
        </div>

        {/* Status / Simulated Badge */}
        {data.isSimulated ? (
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#FFD166]/10 text-[#FFD166] border border-[#FFD166]/25">
            SIMULATED
          </span>
        ) : (
          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#7CFFB2]/10 text-[#7CFFB2] border border-[#7CFFB2]/20">
            LLAMA FEED VERIFIED
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col gap-4 flex-1 overflow-y-auto text-xs font-mono tabular-nums">
        {/* Total TVL Banner */}
        <div className="p-3 rounded-lg bg-[#101016] border border-white/[0.06] flex items-center justify-between">
          <div>
            <div className="text-[11px] text-[#8A8F98]">AGGREGATED ON-CHAIN TVL</div>
            <div className="text-xl font-bold text-white mt-0.5">
              ${(data.totalTvl / 1e9).toFixed(2)}B USD
            </div>
          </div>
          <span
            className={`px-2 py-1 rounded text-xs font-semibold ${
              data.tvlChange24h >= 0
                ? "text-[#7CFFB2] bg-[#7CFFB2]/10 border border-[#7CFFB2]/20"
                : "text-[#FF5C5C] bg-[#FF5C5C]/10 border border-[#FF5C5C]/20"
            }`}
          >
            {data.tvlChange24h >= 0 ? "+" : ""}
            {data.tvlChange24h}% 24h
          </span>
        </div>

        {/* Chain TVL Distribution */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-[11px] text-[#8A8F98]">
            <span>CHAIN TVL DOMINANCE</span>
            <span>TOP ECOSYSTEMS</span>
          </div>

          <div className="flex flex-col gap-1.5">
            {data.chainDistribution.slice(0, 5).map((chain) => (
              <div key={chain.name} className="flex flex-col gap-0.5">
                <div className="flex justify-between text-[11px]">
                  <span className="text-white/90">{chain.name}</span>
                  <span className="text-[#8A8F98]">
                    ${(chain.tvl / 1e9).toFixed(1)}B ({chain.share}%)
                  </span>
                </div>
                <div className="w-full bg-[#181822] h-1 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#7CFFB2]/70 transition-all duration-500"
                    style={{ width: `${Math.min(100, chain.share * 1.5)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Protocols Table */}
        <div className="flex flex-col gap-1.5 pt-2 border-t border-white/[0.06]">
          <div className="text-[11px] text-[#8A8F98] mb-1">LEADING PROTOCOLS</div>
          <div className="divide-y divide-white/[0.02]">
            {data.topProtocols.slice(0, 4).map((p) => (
              <div key={p.name} className="py-1.5 flex items-center justify-between">
                <div>
                  <div className="text-white font-medium text-[11px]">{p.name}</div>
                  <div className="text-[10px] text-[#8A8F98]">{p.category}</div>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium text-[11px]">
                    ${(p.tvl / 1e9).toFixed(2)}B
                  </div>
                  <div
                    className={`text-[10px] ${
                      p.change1d >= 0 ? "text-[#7CFFB2]" : "text-[#FF5C5C]"
                    }`}
                  >
                    {p.change1d >= 0 ? "+" : ""}
                    {p.change1d}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
