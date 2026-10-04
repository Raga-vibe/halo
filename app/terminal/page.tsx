"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  AssetSymbol,
  Timeframe,
  AssetStats,
  GlobalDeFiData,
  InsightItem,
  CorrelationMatrixData,
  TradeTick,
} from "../../lib/types";
import { getBinanceStream, ConnectionStatus } from "../../lib/data/binanceWebSocket";
import { fetchMarketStats, fetchDeFiData } from "../../lib/data/marketData";
import {
  calculateRollingVolatility,
  calculateZScore,
  calculateCorrelationMatrix,
} from "../../lib/data/statsEngine";
import { generateLiveInsights } from "../../lib/data/insightGenerator";

import { CandleChart } from "../../components/terminal/CandleChart";
import { OrderBookTape } from "../../components/terminal/OrderBookTape";
import { StatsAnomalyPanel } from "../../components/terminal/StatsAnomalyPanel";
import { CorrelationHeatmap } from "../../components/terminal/CorrelationHeatmap";
import { TypewriterInsightStream } from "../../components/terminal/TypewriterInsightStream";
import { ProtocolTvlPanel } from "../../components/terminal/ProtocolTvlPanel";
import { CommandPalette } from "../../components/terminal/CommandPalette";

export default function TerminalPage() {
  const [selectedAsset, setSelectedAsset] = useState<AssetSymbol>("BTC");
  const [timeframe, setTimeframe] = useState<Timeframe>("1m");
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [layoutMode, setLayoutMode] = useState<"default" | "chart-focus">("default");

  // Connection State
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("connecting");
  const [latencyMs, setLatencyMs] = useState(6.4);

  // Market & Telemetry Data
  const [assetStats, setAssetStats] = useState<Record<AssetSymbol, AssetStats>>({} as any);
  const [defiData, setDefiData] = useState<GlobalDeFiData | null>(null);
  const [insights, setInsights] = useState<InsightItem[]>([]);
  const [correlationData, setCorrelationData] = useState<CorrelationMatrixData>({
    assets: ["BTC", "ETH", "SOL", "AVAX", "SUI", "BNB"],
    matrix: {} as any,
  });

  // Price history cache for rolling statistical computations
  const [priceHistory, setPriceHistory] = useState<Record<AssetSymbol, number[]>>({
    BTC: [90800, 91100, 91250, 91400, 91380, 91450],
    ETH: [3290, 3305, 3315, 3310, 3325, 3320],
    SOL: [188, 190.5, 192, 193.4, 194.1, 194.5],
    AVAX: [28.1, 28.2, 28.5, 28.3, 28.4],
    SUI: [2.05, 2.08, 2.12, 2.14, 2.15],
    BNB: [638, 639, 641, 642],
  });

  // 1. Initial market stats and DeFi fetch
  useEffect(() => {
    let isSubscribed = true;

    async function loadInitialData() {
      const stats = await fetchMarketStats();
      const defi = await fetchDeFiData();
      if (!isSubscribed) return;

      setAssetStats(stats);
      setDefiData(defi);

      const generatedInsights = generateLiveInsights(stats, defi);
      setInsights(generatedInsights);

      const initialCorr = calculateCorrelationMatrix(priceHistory);
      setCorrelationData(initialCorr);
    }

    loadInitialData();

    // Re-poll every 60s
    const pollInterval = setInterval(() => {
      fetchMarketStats().then((stats) => {
        if (isSubscribed) setAssetStats(stats);
      });
      fetchDeFiData().then((defi) => {
        if (isSubscribed) setDefiData(defi);
      });
    }, 60000);

    return () => {
      isSubscribed = false;
      clearInterval(pollInterval);
    };
  }, []);

  // 2. Connect to Binance WebSocket
  useEffect(() => {
    const stream = getBinanceStream();

    const unsubStatus = stream.onStatusChange((status, latency) => {
      setConnectionStatus(status);
      setLatencyMs(latency);
    });

    const unsubTicks = stream.subscribe((tick: TradeTick) => {
      // Update real-time price & history
      setPriceHistory((prev) => {
        const existing = prev[tick.symbol] || [tick.price];
        const next = [...existing.slice(-80), tick.price];
        return { ...prev, [tick.symbol]: next };
      });

      setAssetStats((prev) => {
        const curr = prev[tick.symbol];
        if (!curr) return prev;

        const updatedHistory = (priceHistory[tick.symbol] || []).concat(tick.price);
        const rollingVol = calculateRollingVolatility(updatedHistory, 20);
        const zScorePrice = calculateZScore(updatedHistory, tick.price);

        return {
          ...prev,
          [tick.symbol]: {
            ...curr,
            price: tick.price,
            volatility20: rollingVol,
            zScorePrice: zScorePrice,
            isAnomaly: Math.abs(zScorePrice) > 2.5 || curr.zScoreVolume > 3.0,
          },
        };
      });
    });

    return () => {
      unsubStatus();
      unsubTicks();
    };
  }, [priceHistory]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      } else if (e.key === "?") {
        setIsHelpOpen((prev) => !prev);
      } else if (e.key === "1") {
        setSelectedAsset("BTC");
      } else if (e.key === "2") {
        setSelectedAsset("ETH");
      } else if (e.key === "3") {
        setSelectedAsset("SOL");
      } else if (e.key === "4") {
        setSelectedAsset("AVAX");
      } else if (e.key === "5") {
        setSelectedAsset("SUI");
      } else if (e.key === "6") {
        setSelectedAsset("BNB");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const currentStats = assetStats[selectedAsset] || {
    symbol: selectedAsset,
    price: selectedAsset === "BTC" ? 91450 : selectedAsset === "ETH" ? 3320 : 194.5,
    change24h: 2.84,
    high24h: 92850,
    low24h: 89120,
    volume24h: 38450120900,
    volatility20: 1.42,
    volatility50: 1.88,
    zScorePrice: 1.85,
    zScoreVolume: 2.12,
    isAnomaly: false,
    isSimulated: connectionStatus === "simulated",
  };

  const assetList: AssetSymbol[] = ["BTC", "ETH", "SOL", "AVAX", "SUI", "BNB"];

  return (
    <div className="min-h-screen bg-[#050506] text-white flex flex-col font-sans selection:bg-[#7CFFB2] selection:text-black">
      {/* Terminal Top Navbar */}
      <header className="sticky top-0 z-40 w-full bg-[#08080B]/95 backdrop-blur border-b border-white/[0.08] px-3 sm:px-4 py-2 flex items-center justify-between text-xs font-mono">
        {/* Left: Brand & Asset Tabs */}
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar py-1">
          <Link
            href="/"
            className="flex items-center gap-2 pr-2 border-r border-white/[0.08] text-white font-semibold tracking-tight text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7CFFB2] rounded shrink-0"
          >
            <div className="w-4 h-4 rounded-full border border-[#7CFFB2]/60 flex items-center justify-center bg-[#7CFFB2]/10">
              <div className="w-1.5 h-1.5 rounded-full bg-[#7CFFB2]" />
            </div>
            <span>HALO</span>
            <span className="hidden xl:inline text-[10px] font-mono text-[#7CFFB2] px-1.5 py-0.2 rounded bg-[#7CFFB2]/10 border border-[#7CFFB2]/20">
              BY RAGA CRYPT
            </span>
          </Link>

          {/* Quick Asset Selector Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {assetList.map((sym, idx) => {
              const stat = assetStats[sym];
              const isSelected = sym === selectedAsset;
              return (
                <button
                  key={sym}
                  onClick={() => setSelectedAsset(sym)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-1 rounded-lg border transition-all tabular-nums shrink-0 whitespace-nowrap text-[11px] sm:text-xs ${
                    isSelected
                      ? "bg-[#14141B] border-[#7CFFB2]/50 text-white shadow-sm"
                      : "bg-white/[0.02] border-white/[0.06] text-[#8A8F98] hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <span className="font-semibold text-white">{sym}</span>
                  <span className="hidden sm:inline text-white/80">
                    ${stat ? stat.price.toLocaleString(undefined, { maximumFractionDigits: 2 }) : "..."}
                  </span>
                  <span
                    className={`text-[10px] ${
                      (stat?.change24h || 0) >= 0 ? "text-[#7CFFB2]" : "text-[#FF5C5C]"
                    }`}
                  >
                    {(stat?.change24h || 0) >= 0 ? "+" : ""}
                    {stat?.change24h || 0}%
                  </span>
                  <span className="hidden md:inline text-[9px] text-[#8A8F98]/60 px-1 py-0.2 rounded bg-black/30">
                    {idx + 1}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Search / Cmd+K / Status */}
        <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-3 shrink-0">
          {/* Cmd+K trigger button */}
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="flex items-center gap-2 px-2 sm:px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.18] text-[#8A8F98] hover:text-white transition-all text-[11px]"
          >
            <svg className="w-3.5 h-3.5 text-[#7CFFB2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="hidden md:inline">Search</span>
            <kbd className="hidden sm:inline px-1.5 py-0.2 text-[10px] rounded bg-white/[0.06] text-white/60">
              ⌘K
            </kbd>
          </button>

          {/* Connection Status Pill */}
          <div
            className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-1 rounded-full border text-[10px] sm:text-[11px] tabular-nums shrink-0 ${
              connectionStatus === "live"
                ? "bg-[#7CFFB2]/10 border-[#7CFFB2]/30 text-[#7CFFB2]"
                : connectionStatus === "simulated"
                ? "bg-[#FFD166]/10 border-[#FFD166]/30 text-[#FFD166]"
                : "bg-white/[0.04] border-white/[0.08] text-[#8A8F98]"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                connectionStatus === "live"
                  ? "bg-[#7CFFB2] animate-pulse"
                  : connectionStatus === "simulated"
                  ? "bg-[#FFD166]"
                  : "bg-white/40"
              }`}
            />
            <span className="font-semibold uppercase tracking-wider">
              {connectionStatus === "live"
                ? "LIVE"
                : connectionStatus === "simulated"
                ? "SIM"
                : "CONNECTING"}
            </span>
            <span className="text-white/40 hidden xs:inline">|</span>
            <span className="text-white/80 hidden xs:inline">{latencyMs}ms</span>
          </div>

          {/* Help Shortcut Button */}
          <button
            onClick={() => setIsHelpOpen(true)}
            className="w-6 h-6 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#8A8F98] hover:text-white transition-colors text-[11px]"
            title="Keyboard shortcuts (?)"
          >
            ?
          </button>
        </div>
      </header>

      {/* Main Bento Workspace */}
      <main className="flex-1 p-3 sm:p-4 lg:p-5 flex flex-col gap-4 max-w-[1920px] mx-auto w-full">
        {/* Layout Mode: Default 4-Panel Bento */}
        {layoutMode === "default" && (
          <>
            {/* Top Row: Primary Chart (2/3) + OrderBook Tape (1/3) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-[500px] lg:h-[540px]">
              <div className="lg:col-span-8 h-full">
                <CandleChart
                  symbol={selectedAsset}
                  currentPrice={currentStats.price}
                  timeframe={timeframe}
                  onTimeframeChange={setTimeframe}
                />
              </div>

              <div className="lg:col-span-4 h-full">
                <OrderBookTape currentSymbol={selectedAsset} />
              </div>
            </div>

            {/* Middle Row: Statistical Anomaly Engine (1/2) + Correlation Heatmap (1/2) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-[320px]">
              <div className="lg:col-span-6 h-full">
                <StatsAnomalyPanel stats={currentStats} />
              </div>

              <div className="lg:col-span-6 h-full">
                <CorrelationHeatmap
                  data={correlationData}
                  selectedAsset={selectedAsset}
                  onSelectAsset={setSelectedAsset}
                />
              </div>
            </div>

            {/* Bottom Row: Typewriter Intelligence Stream (7/12) + DeFiLlama TVL Panel (5/12) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-[320px]">
              <div className="lg:col-span-7 h-full">
                <TypewriterInsightStream insights={insights} />
              </div>

              <div className="lg:col-span-5 h-full">
                {defiData ? (
                  <ProtocolTvlPanel data={defiData} />
                ) : (
                  <div className="h-full bg-[#0A0A0E] rounded-xl border border-white/[0.08] p-6 flex items-center justify-center text-[#8A8F98] text-xs font-mono">
                    Querying DeFiLlama protocols...
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Layout Mode: Chart Focus */}
        {layoutMode === "chart-focus" && (
          <div className="h-[calc(100vh-120px)] w-full">
            <CandleChart
              symbol={selectedAsset}
              currentPrice={currentStats.price}
              timeframe={timeframe}
              onTimeframeChange={setTimeframe}
            />
          </div>
        )}
      </main>

      {/* Terminal Compact Status Footer */}
      <footer className="w-full border-t border-white/[0.08] px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-[11px] text-[#8A8F98] bg-[#07070A]">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-white">HALO TERMINAL</span>
          <span className="text-white/20">&bull;</span>
          <span className="text-[#7CFFB2]">BUILT BY RAGA CRYPT</span>
          <span className="text-white/20">&bull;</span>
          <span className="text-white/50">SUB-8MS WEBSOCKET PIPELINE</span>
        </div>
        <div className="flex items-center gap-4 text-white/60">
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
        </div>
      </footer>

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectAsset={setSelectedAsset}
        onSelectTimeframe={setTimeframe}
        onToggleLayout={(l) => setLayoutMode(l as any)}
      />

      {/* Keyboard Shortcuts Modal */}
      {isHelpOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsHelpOpen(false)}
        >
          <div
            className="w-full max-w-md bg-[#0D0D11] border border-white/[0.12] rounded-xl p-6 font-mono text-xs shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="font-semibold text-white text-sm">KEYBOARD SHORTCUTS</div>
              <button
                onClick={() => setIsHelpOpen(false)}
                className="text-[#8A8F98] hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3">
              <div className="flex justify-between items-center text-[#8A8F98]">
                <span>Command Palette</span>
                <kbd className="px-2 py-1 rounded bg-white/[0.08] text-white">⌘K / Ctrl+K</kbd>
              </div>
              <div className="flex justify-between items-center text-[#8A8F98]">
                <span>Select Asset (BTC - BNB)</span>
                <kbd className="px-2 py-1 rounded bg-white/[0.08] text-white">1 - 6</kbd>
              </div>
              <div className="flex justify-between items-center text-[#8A8F98]">
                <span>Toggle Shortcuts Help</span>
                <kbd className="px-2 py-1 rounded bg-white/[0.08] text-white">?</kbd>
              </div>
              <div className="flex justify-between items-center text-[#8A8F98]">
                <span>Close Modals</span>
                <kbd className="px-2 py-1 rounded bg-white/[0.08] text-white">ESC</kbd>
              </div>
            </div>

            <button
              onClick={() => setIsHelpOpen(false)}
              className="w-full py-2 bg-[#14141B] hover:bg-[#1A1A24] border border-white/[0.08] rounded-lg text-white font-medium transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
