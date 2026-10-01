"use client";

import React, { useState } from "react";
import { AssetSymbol, CorrelationMatrixData } from "../../lib/types";

interface CorrelationHeatmapProps {
  data: CorrelationMatrixData;
  selectedAsset: AssetSymbol;
  onSelectAsset: (asset: AssetSymbol) => void;
}

export function CorrelationHeatmap({
  data,
  selectedAsset,
  onSelectAsset,
}: CorrelationHeatmapProps) {
  const [hoveredPair, setHoveredPair] = useState<{
    a1: AssetSymbol;
    a2: AssetSymbol;
    value: number;
  } | null>(null);

  const getColor = (val: number, isDiag: boolean) => {
    if (isDiag) return "bg-white/[0.08] text-white";
    if (val >= 0.8) return "bg-[#7CFFB2]/25 text-[#7CFFB2] border border-[#7CFFB2]/40";
    if (val >= 0.6) return "bg-[#7CFFB2]/15 text-[#7CFFB2]/90 border border-[#7CFFB2]/20";
    if (val >= 0.4) return "bg-white/[0.06] text-white/80";
    if (val >= 0.2) return "bg-[#FFD166]/10 text-[#FFD166]/80";
    return "bg-[#FF5C5C]/15 text-[#FF5C5C]";
  };

  return (
    <div className="flex flex-col h-full bg-[#0A0A0E] rounded-xl border border-white/[0.08] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.08] bg-[#0E0E12] text-[12px] font-mono">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#7CFFB2]" />
          <span className="font-semibold text-white tracking-tight">
            CROSS-ASSET CORRELATION MATRIX
          </span>
        </div>
        <span className="text-[#8A8F98] text-[11px]">PEARSON (r)</span>
      </div>

      <div className="p-4 flex flex-col gap-3 flex-1 overflow-x-auto text-[11px] font-mono tabular-nums">
        {/* Matrix Grid Table */}
        <div className="min-w-[280px]">
          {/* Header Row */}
          <div className="grid grid-cols-7 gap-1.5 pb-2 text-center text-[#8A8F98]">
            <span className="text-left font-medium text-white/40">PAIR</span>
            {data.assets.map((a) => (
              <button
                key={a}
                onClick={() => onSelectAsset(a)}
                className={`font-medium transition-colors hover:text-[#7CFFB2] ${
                  a === selectedAsset ? "text-[#7CFFB2] font-bold" : ""
                }`}
              >
                {a}
              </button>
            ))}
          </div>

          {/* Rows */}
          {data.assets.map((rowAsset) => (
            <div
              key={rowAsset}
              className="grid grid-cols-7 gap-1.5 py-1 items-center text-center"
            >
              <button
                onClick={() => onSelectAsset(rowAsset)}
                className={`text-left font-medium transition-colors hover:text-[#7CFFB2] ${
                  rowAsset === selectedAsset
                    ? "text-[#7CFFB2] font-bold"
                    : "text-[#8A8F98]"
                }`}
              >
                {rowAsset}
              </button>

              {data.assets.map((colAsset) => {
                const val = data.matrix[rowAsset]?.[colAsset] ?? 1.0;
                const isDiag = rowAsset === colAsset;
                const isHovered =
                  hoveredPair?.a1 === rowAsset && hoveredPair?.a2 === colAsset;

                return (
                  <div
                    key={`${rowAsset}-${colAsset}`}
                    onMouseEnter={() =>
                      setHoveredPair({ a1: rowAsset, a2: colAsset, value: val })
                    }
                    onMouseLeave={() => setHoveredPair(null)}
                    onClick={() => onSelectAsset(colAsset)}
                    className={`py-1.5 px-0.5 rounded cursor-pointer transition-all duration-150 flex items-center justify-center font-medium ${getColor(
                      val,
                      isDiag
                    )} ${isHovered ? "ring-1 ring-white" : ""}`}
                  >
                    {isDiag ? "1.00" : val > 0 ? `+${val.toFixed(2)}` : val.toFixed(2)}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Hover Readout / Detail Footer */}
        <div className="mt-auto pt-3 border-t border-white/[0.06] text-[11px] text-[#8A8F98] flex items-center justify-between">
          {hoveredPair ? (
            <div className="flex items-center gap-2 text-white">
              <span className="text-[#7CFFB2]">
                {hoveredPair.a1} &harr; {hoveredPair.a2}:
              </span>
              <span>r = {hoveredPair.value > 0 ? `+${hoveredPair.value.toFixed(2)}` : hoveredPair.value.toFixed(2)}</span>
              <span className="text-[#8A8F98]">
                {hoveredPair.value > 0.75
                  ? "(Tight Co-movement)"
                  : hoveredPair.value > 0.4
                  ? "(Moderate Correlation)"
                  : "(Idiosyncratic Divergence)"}
              </span>
            </div>
          ) : (
            <span className="text-white/40">Hover over any cell for statistical dependency</span>
          )}
        </div>
      </div>
    </div>
  );
}
