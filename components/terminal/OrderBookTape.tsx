"use client";

import React, { useEffect, useState, useRef } from "react";
import { TradeTick, AssetSymbol } from "../../lib/types";
import { getBinanceStream } from "../../lib/data/binanceWebSocket";

interface OrderBookTapeProps {
  currentSymbol: AssetSymbol;
}

export function OrderBookTape({ currentSymbol }: OrderBookTapeProps) {
  const [ticks, setTicks] = useState<TradeTick[]>([]);
  const [buyVolume, setBuyVolume] = useState(148200);
  const [sellVolume, setSellVolume] = useState(139400);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stream = getBinanceStream();
    const unsubscribe = stream.subscribe((tick: TradeTick) => {
      if (tick.symbol !== currentSymbol) return;

      setTicks((prev) => {
        const next = [tick, ...prev.slice(0, 48)];
        return next;
      });

      if (!tick.isBuyerMaker) {
        setBuyVolume((b) => b + tick.size * tick.price);
      } else {
        setSellVolume((s) => s + tick.size * tick.price);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [currentSymbol]);

  const totalVol = buyVolume + sellVolume || 1;
  const buyRatio = Math.round((buyVolume / totalVol) * 100);
  const sellRatio = 100 - buyRatio;

  return (
    <div className="flex flex-col h-full bg-[#0A0A0E] rounded-xl border border-white/[0.08] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.08] bg-[#0E0E12] text-[12px] font-mono">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#7CFFB2] animate-pulse" />
          <span className="font-semibold text-white tracking-tight">LIVE TRADE TAPE</span>
        </div>
        <span className="text-[#8A8F98] text-[11px] tabular-nums">
          {ticks.length} TICKS CACHED
        </span>
      </div>

      {/* Table Headers */}
      <div className="grid grid-cols-4 px-4 py-1.5 border-b border-white/[0.04] text-[10px] font-mono tracking-wider text-[#8A8F98] uppercase">
        <span>Time</span>
        <span className="text-right">Price</span>
        <span className="text-right">Size</span>
        <span className="text-right">Side</span>
      </div>

      {/* Scrolling Ticks List */}
      <div
        ref={listRef}
        className="flex-1 overflow-y-auto divide-y divide-white/[0.02] text-[11px] font-mono tabular-nums select-none"
      >
        {ticks.length === 0 ? (
          <div className="flex items-center justify-center h-36 text-[#8A8F98] text-xs">
            Connecting to Binance stream...
          </div>
        ) : (
          ticks.map((tick, idx) => {
            const isBuy = !tick.isBuyerMaker;
            const date = new Date(tick.timestamp);
            const timeStr = `${String(date.getHours()).padStart(2, "0")}:${String(
              date.getMinutes()
            ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}.${String(
              date.getMilliseconds()
            ).padStart(3, "0")}`;

            return (
              <div
                key={tick.id || idx}
                className={`grid grid-cols-4 px-4 py-1 items-center transition-colors duration-200 ${
                  idx === 0
                    ? isBuy
                      ? "bg-[#7CFFB2]/10"
                      : "bg-[#FF5C5C]/10"
                    : "hover:bg-white/[0.02]"
                }`}
              >
                <span className="text-[#8A8F98]">{timeStr}</span>
                <span
                  className={`text-right font-medium ${
                    isBuy ? "text-[#7CFFB2]" : "text-[#FF5C5C]"
                  }`}
                >
                  ${tick.price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
                <span className="text-right text-white/90">
                  {tick.size.toLocaleString(undefined, {
                    minimumFractionDigits: 3,
                    maximumFractionDigits: 3,
                  })}
                </span>
                <span className="text-right">
                  <span
                    className={`inline-block px-1.5 py-0.2 rounded text-[9px] font-semibold tracking-wider ${
                      isBuy
                        ? "text-[#7CFFB2] bg-[#7CFFB2]/10 border border-[#7CFFB2]/20"
                        : "text-[#FF5C5C] bg-[#FF5C5C]/10 border border-[#FF5C5C]/20"
                    }`}
                  >
                    {isBuy ? "BUY" : "SELL"}
                  </span>
                </span>
              </div>
            );
          })
        )}
      </div>

      {/* Taker Volume Delta Bar */}
      <div className="p-3 border-t border-white/[0.08] bg-[#0E0E12] flex flex-col gap-1.5 text-[11px] font-mono tabular-nums">
        <div className="flex items-center justify-between text-[#8A8F98]">
          <span className="text-[#7CFFB2]">BUY VOL: {buyRatio}%</span>
          <span className="text-[#FF5C5C]">SELL VOL: {sellRatio}%</span>
        </div>
        <div className="w-full h-1.5 bg-[#14141A] rounded-full overflow-hidden flex">
          <div
            className="h-full bg-[#7CFFB2] transition-all duration-300"
            style={{ width: `${buyRatio}%` }}
          />
          <div
            className="h-full bg-[#FF5C5C] transition-all duration-300"
            style={{ width: `${sellRatio}%` }}
          />
        </div>
      </div>
    </div>
  );
}
