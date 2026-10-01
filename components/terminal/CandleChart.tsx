"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  createChart,
  ColorType,
  IChartApi,
  CandlestickSeries,
  HistogramSeries,
  createSeriesMarkers,
  SeriesMarker,
  Time,
} from "lightweight-charts";
import { CandleData, Timeframe, AssetSymbol, AnomalyFlag } from "../../lib/types";
import { generateCandles } from "../../lib/data/statsEngine";

interface CandleChartProps {
  symbol: AssetSymbol;
  currentPrice: number;
  timeframe: Timeframe;
  onTimeframeChange: (tf: Timeframe) => void;
  anomaliesOnly?: boolean;
}

export function CandleChart({
  symbol,
  currentPrice,
  timeframe,
  onTimeframeChange,
}: CandleChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<any>(null);
  const volumeSeriesRef = useRef<any>(null);

  const [activeCandle, setActiveCandle] = useState<CandleData | null>(null);
  const [activeAnomaly, setActiveAnomaly] = useState<AnomalyFlag | null>(null);
  const [candles, setCandles] = useState<CandleData[]>([]);

  const timeframes: Timeframe[] = ["1m", "5m", "15m", "1h", "4h", "1d"];

  // Initialize or re-generate candles when symbol or timeframe changes
  useEffect(() => {
    const initialCandles = generateCandles(currentPrice || 91450, timeframe, 120);
    setCandles(initialCandles);
    if (initialCandles.length > 0) {
      setActiveCandle(initialCandles[initialCandles.length - 1]);
    }
  }, [symbol, timeframe]);

  // Real-time tick update to the latest candle
  useEffect(() => {
    if (!currentPrice || candles.length === 0 || !candleSeriesRef.current) return;

    setCandles((prev) => {
      if (prev.length === 0) return prev;
      const last = { ...prev[prev.length - 1] };
      last.close = currentPrice;
      last.high = Math.max(last.high, currentPrice);
      last.low = Math.min(last.low, currentPrice);
      last.volume += Math.floor(Math.random() * 5 + 1);

      const updated = [...prev.slice(0, -1), last];
      try {
        candleSeriesRef.current?.update({
          time: last.time as Time,
          open: last.open,
          high: last.high,
          low: last.low,
          close: last.close,
        });
      } catch {
        // Safe update
      }
      return updated;
    });
  }, [currentPrice]);

  // Create Lightweight Charts instance
  useEffect(() => {
    if (!chartContainerRef.current) return;

    const container = chartContainerRef.current;
    container.innerHTML = "";

    const chart = createChart(container, {
      width: container.clientWidth,
      height: container.clientHeight,
      layout: {
        background: { type: ColorType.Solid, color: "#0A0A0E" },
        textColor: "#8A8F98",
        fontFamily: "var(--font-geist-mono), monospace",
        fontSize: 11,
      },
      grid: {
        vertLines: { color: "rgba(255, 255, 255, 0.04)" },
        horzLines: { color: "rgba(255, 255, 255, 0.04)" },
      },
      crosshair: {
        vertLine: {
          color: "rgba(124, 255, 178, 0.4)",
          width: 1,
          style: 3,
          labelBackgroundColor: "#14141A",
        },
        horzLine: {
          color: "rgba(124, 255, 178, 0.4)",
          width: 1,
          style: 3,
          labelBackgroundColor: "#14141A",
        },
      },
      rightPriceScale: {
        borderColor: "rgba(255, 255, 255, 0.08)",
        scaleMargins: {
          top: 0.1,
          bottom: 0.22,
        },
      },
      timeScale: {
        borderColor: "rgba(255, 255, 255, 0.08)",
        timeVisible: true,
        secondsVisible: timeframe === "1m",
      },
    });

    chartRef.current = chart;

    // Candlestick series using v5 addSeries API
    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#7CFFB2",
      downColor: "#FF5C5C",
      borderVisible: false,
      wickUpColor: "#7CFFB2",
      wickDownColor: "#FF5C5C",
    });
    candleSeriesRef.current = candleSeries;

    // Volume histogram series using v5 addSeries API
    const volumeSeries = chart.addSeries(HistogramSeries, {
      priceFormat: {
        type: "volume",
      },
      priceScaleId: "",
    });
    volumeSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });
    volumeSeriesRef.current = volumeSeries;

    // Load initial data
    if (candles.length > 0) {
      candleSeries.setData(
        candles.map((c) => ({
          time: c.time as Time,
          open: c.open,
          high: c.high,
          low: c.low,
          close: c.close,
        }))
      );

      volumeSeries.setData(
        candles.map((c) => ({
          time: c.time as Time,
          value: c.volume,
          color:
            c.close >= c.open
              ? "rgba(124, 255, 178, 0.25)"
              : "rgba(255, 92, 92, 0.25)",
        }))
      );

      // Add Anomaly Markers directly onto candlestick bars
      const markers: SeriesMarker<Time>[] = [];
      candles.forEach((c) => {
        if (c.anomaly) {
          const isHigh = c.anomaly.severity === "high";
          markers.push({
            time: c.time as Time,
            position: c.close >= c.open ? "aboveBar" : "belowBar",
            color: isHigh ? "#FF5C5C" : "#FFD166",
            shape: c.close >= c.open ? "arrowDown" : "arrowUp",
            text: `Z ${c.anomaly.zScoreVolume}σ`,
          });
        }
      });

      if (markers.length > 0) {
        try {
          createSeriesMarkers(candleSeries, markers);
        } catch {
          // Markers fallback
        }
      }
    }

    // Crosshair hover listener
    chart.subscribeCrosshairMove((param) => {
      if (!param.time || !param.point) {
        if (candles.length > 0) {
          setActiveCandle(candles[candles.length - 1]);
          setActiveAnomaly(null);
        }
        return;
      }

      const match = candles.find((c) => c.time === param.time);
      if (match) {
        setActiveCandle(match);
        setActiveAnomaly(match.anomaly || null);
      }
    });

    const handleResize = () => {
      if (container && chart) {
        chart.applyOptions({
          width: container.clientWidth,
          height: container.clientHeight,
        });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [candles, timeframe]);

  return (
    <div className="flex flex-col h-full w-full bg-[#0A0A0E] rounded-xl border border-white/[0.08] overflow-hidden">
      {/* Chart Control Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.08] bg-[#0E0E12] text-[12px] font-mono tabular-nums">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white tracking-tight">{symbol}/USDT</span>
            <span className="px-1.5 py-0.5 rounded bg-white/[0.06] text-[#7CFFB2] text-[11px]">
              PERP
            </span>
          </div>

          {activeCandle && (
            <div className="hidden sm:flex items-center gap-3 text-[#8A8F98]">
              <span>
                O <span className="text-white">${activeCandle.open.toLocaleString()}</span>
              </span>
              <span>
                H <span className="text-white">${activeCandle.high.toLocaleString()}</span>
              </span>
              <span>
                L <span className="text-white">${activeCandle.low.toLocaleString()}</span>
              </span>
              <span>
                C{" "}
                <span
                  className={
                    activeCandle.close >= activeCandle.open
                      ? "text-[#7CFFB2]"
                      : "text-[#FF5C5C]"
                  }
                >
                  ${activeCandle.close.toLocaleString()}
                </span>
              </span>
              <span>
                Vol{" "}
                <span className="text-white">
                  {(activeCandle.volume / 1000).toFixed(1)}k
                </span>
              </span>
            </div>
          )}
        </div>

        {/* Timeframe Selectors */}
        <div className="flex items-center gap-1 bg-[#14141A] p-0.5 rounded-lg border border-white/[0.08]">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => onTimeframeChange(tf)}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all ${
                timeframe === tf
                  ? "bg-[#7CFFB2] text-black shadow-sm font-semibold"
                  : "text-[#8A8F98] hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Active Anomaly Banner */}
      {activeAnomaly && (
        <div className="flex items-center justify-between px-4 py-1.5 bg-[#FF5C5C]/10 border-b border-[#FF5C5C]/25 text-[11px] font-mono animate-pulse">
          <div className="flex items-center gap-2 text-[#FF5C5C]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5C5C]" />
            <span className="font-semibold uppercase tracking-wider">
              {activeAnomaly.severity} ANOMALY:
            </span>
            <span>{activeAnomaly.message}</span>
          </div>
          <span className="text-white/60">
            Z-Vol: +{activeAnomaly.zScoreVolume}&sigma; | Z-Price: +{activeAnomaly.zScorePrice}&sigma;
          </span>
        </div>
      )}

      {/* Lightweight-charts Canvas Mount */}
      <div className="relative flex-1 w-full min-h-[360px]" ref={chartContainerRef}>
        <div className="absolute right-4 bottom-8 pointer-events-none text-white/[0.03] font-bold text-6xl tracking-tighter select-none">
          HALO
        </div>
      </div>
    </div>
  );
}
