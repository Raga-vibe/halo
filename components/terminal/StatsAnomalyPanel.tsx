"use client";

import React from "react";
import { AssetStats } from "../../lib/types";

interface StatsAnomalyPanelProps {
  stats: AssetStats;
}

export function StatsAnomalyPanel({ stats }: StatsAnomalyPanelProps) {
  const isPriceAnomaly = Math.abs(stats.zScorePrice) >= 2.5;
  const isVolumeAnomaly = stats.zScoreVolume >= 3.0;
  const hasAnomaly = isPriceAnomaly || isVolumeAnomaly || stats.isAnomaly;

  return (
    <div className="flex flex-col h-full bg-[#0A0A0E] rounded-xl border border-white/[0.08] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.08] bg-[#0E0E12] text-[12px] font-mono">
        <div className="flex items-center gap-2">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              hasAnomaly ? "bg-[#FF5C5C] animate-ping" : "bg-[#7CFFB2]"
            }`}
          />
          <span className="font-semibold text-white tracking-tight">
            STATISTICAL ANOMALY ENGINE
          </span>
        </div>
        {hasAnomaly ? (
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#FF5C5C]/15 text-[#FF5C5C] border border-[#FF5C5C]/30 animate-pulse">
            CRITICAL ANOMALY
          </span>
        ) : (
          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#7CFFB2]/10 text-[#7CFFB2] border border-[#7CFFB2]/20">
            NOMINAL
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col gap-4 flex-1 overflow-y-auto text-xs font-mono tabular-nums">
        {/* Z-Scores Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Price Velocity Z-Score */}
          <div
            className={`p-3 rounded-lg border transition-all ${
              isPriceAnomaly
                ? "bg-[#FF5C5C]/10 border-[#FF5C5C]/40 shadow-[0_0_15px_rgba(255,92,92,0.15)]"
                : "bg-[#101016] border-white/[0.06]"
            }`}
          >
            <div className="flex items-center justify-between text-[#8A8F98] text-[11px] mb-1">
              <span>Z-PRICE (&sigma;)</span>
              <span className="text-[10px]">TH: 2.50&sigma;</span>
            </div>
            <div
              className={`text-xl font-bold tracking-tight ${
                isPriceAnomaly
                  ? "text-[#FF5C5C]"
                  : Math.abs(stats.zScorePrice) > 1.5
                  ? "text-[#FFD166]"
                  : "text-white"
              }`}
            >
              {stats.zScorePrice > 0 ? "+" : ""}
              {stats.zScorePrice.toFixed(2)}&sigma;
            </div>
            {/* Visual Bar Meter */}
            <div className="w-full bg-[#181822] h-1.5 rounded-full mt-2 overflow-hidden relative">
              <div
                className={`h-full transition-all duration-500 ${
                  isPriceAnomaly ? "bg-[#FF5C5C]" : "bg-[#7CFFB2]"
                }`}
                style={{
                  width: `${Math.min(100, (Math.abs(stats.zScorePrice) / 3.5) * 100)}%`,
                }}
              />
            </div>
          </div>

          {/* Volume Surge Z-Score */}
          <div
            className={`p-3 rounded-lg border transition-all ${
              isVolumeAnomaly
                ? "bg-[#FF5C5C]/10 border-[#FF5C5C]/40 shadow-[0_0_15px_rgba(255,92,92,0.15)]"
                : "bg-[#101016] border-white/[0.06]"
            }`}
          >
            <div className="flex items-center justify-between text-[#8A8F98] text-[11px] mb-1">
              <span>Z-VOLUME (&sigma;)</span>
              <span className="text-[10px]">TH: 3.00&sigma;</span>
            </div>
            <div
              className={`text-xl font-bold tracking-tight ${
                isVolumeAnomaly
                  ? "text-[#FF5C5C]"
                  : stats.zScoreVolume > 2.0
                  ? "text-[#FFD166]"
                  : "text-white"
              }`}
            >
              +{stats.zScoreVolume.toFixed(2)}&sigma;
            </div>
            <div className="w-full bg-[#181822] h-1.5 rounded-full mt-2 overflow-hidden relative">
              <div
                className={`h-full transition-all duration-500 ${
                  isVolumeAnomaly ? "bg-[#FF5C5C]" : "bg-[#7CFFB2]"
                }`}
                style={{
                  width: `${Math.min(100, (stats.zScoreVolume / 4.0) * 100)}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Volatility Metrics */}
        <div className="p-3 rounded-lg bg-[#101016] border border-white/[0.06] flex flex-col gap-2.5">
          <div className="flex items-center justify-between text-[11px] text-[#8A8F98]">
            <span>ROLLING VOLATILITY WINDOW</span>
            <span className="text-white/40">ANNUALIZED</span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <div className="text-[11px] text-[#8A8F98]">20-Period (&sigma;20)</div>
              <div className="text-base font-semibold text-white mt-0.5">
                {stats.volatility20.toFixed(2)}%
              </div>
            </div>
            <div>
              <div className="text-[11px] text-[#8A8F98]">50-Period (&sigma;50)</div>
              <div className="text-base font-semibold text-white mt-0.5">
                {stats.volatility50.toFixed(2)}%
              </div>
            </div>
          </div>
        </div>

        {/* 24h Summary Telemetry */}
        <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-white/[0.06]">
          <div className="flex flex-col gap-1 p-2 rounded bg-white/[0.02]">
            <span className="text-[#8A8F98]">24H HIGH</span>
            <span className="text-white font-medium">${stats.high24h.toLocaleString()}</span>
          </div>
          <div className="flex flex-col gap-1 p-2 rounded bg-white/[0.02]">
            <span className="text-[#8A8F98]">24H LOW</span>
            <span className="text-white font-medium">${stats.low24h.toLocaleString()}</span>
          </div>
          <div className="flex flex-col gap-1 p-2 rounded bg-white/[0.02] col-span-2">
            <div className="flex justify-between items-center">
              <span className="text-[#8A8F98]">24H VOLUME</span>
              <span className="text-white font-medium">
                ${(stats.volume24h / 1e9).toFixed(2)}B USD
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
