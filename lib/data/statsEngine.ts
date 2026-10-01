import { CandleData, Timeframe, AssetSymbol, CorrelationMatrixData, AnomalyFlag } from "../types";

// Generate realistic starting candle series
export function generateCandles(
  basePrice: number,
  timeframe: Timeframe,
  count = 120
): CandleData[] {
  const candles: CandleData[] = [];
  const now = Math.floor(Date.now() / 1000);

  let intervalSec = 60;
  if (timeframe === "5m") intervalSec = 300;
  if (timeframe === "15m") intervalSec = 900;
  if (timeframe === "1h") intervalSec = 3600;
  if (timeframe === "4h") intervalSec = 14400;
  if (timeframe === "1d") intervalSec = 86400;

  let currentPrice = basePrice * 0.94;
  const startTime = now - count * intervalSec;

  for (let i = 0; i < count; i++) {
    const time = startTime + i * intervalSec;

    // Macro market trend + random drift
    const trend = (i / count) * 0.08;
    const wave = Math.sin((i / 15) * Math.PI) * 0.015;
    const randomShock = (Math.random() - 0.485) * 0.012;

    const open = currentPrice;
    const delta = open * (trend * 0.05 + wave + randomShock);
    const close = Math.round((open + delta) * 100) / 100;

    const wickHigh = Math.random() * Math.abs(delta) * 1.5 + open * 0.003;
    const wickLow = Math.random() * Math.abs(delta) * 1.5 + open * 0.003;

    const high = Math.round(Math.max(open, close) + wickHigh) * 100 / 100;
    const low = Math.round(Math.min(open, close) - wickLow) * 100 / 100;

    // Volume with occasional heavy volume spikes
    const isVolumeSurge = Math.random() < 0.08;
    const baseVolume = (basePrice * 180) / (intervalSec / 60);
    const volume = Math.round(
      baseVolume * (isVolumeSurge ? 4.5 + Math.random() * 3.5 : 0.6 + Math.random() * 0.8)
    );

    // Occasional statistical anomaly injected for realistic detection
    let anomaly: AnomalyFlag | undefined = undefined;
    if (isVolumeSurge && Math.abs(delta / open) > 0.015) {
      anomaly = {
        type: "both",
        zScorePrice: Math.round((2.6 + Math.random() * 1.4) * 10) / 10,
        zScoreVolume: Math.round((3.2 + Math.random() * 2.1) * 10) / 10,
        severity: "high",
        message: "Dual anomaly: Volumetric liquidation squeeze detected",
      };
    } else if (isVolumeSurge) {
      anomaly = {
        type: "volume",
        zScorePrice: 1.2,
        zScoreVolume: Math.round((3.0 + Math.random() * 1.5) * 10) / 10,
        severity: "medium",
        message: "Volume surge 3.1σ above 20-period moving average",
      };
    }

    candles.push({
      time,
      open,
      high,
      low,
      close,
      volume,
      anomaly,
    });

    currentPrice = close;
  }

  return candles;
}

// Compute rolling standard deviation (volatility) in %
export function calculateRollingVolatility(prices: number[], windowSize = 20): number {
  if (prices.length < windowSize) return 1.5;

  const slice = prices.slice(-windowSize);
  const returns: number[] = [];
  for (let i = 1; i < slice.length; i++) {
    returns.push(Math.log(slice[i] / slice[i - 1]));
  }

  const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
  const variance =
    returns.reduce((acc, r) => acc + Math.pow(r - mean, 2), 0) / (returns.length - 1);
  const stdDev = Math.sqrt(variance);

  // Annualized or scaled to percentage
  return Math.round(stdDev * Math.sqrt(365 * 24) * 100 * 10) / 10;
}

// Calculate real Z-score of recent observation against window
export function calculateZScore(values: number[], targetVal: number): number {
  if (values.length < 5) return 0;

  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const variance =
    values.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / (values.length - 1);
  const stdDev = Math.sqrt(variance);

  if (stdDev === 0) return 0;
  return Math.round(((targetVal - mean) / stdDev) * 100) / 100;
}

// Compute Pearson correlation matrix between assets
export function calculateCorrelationMatrix(
  assetPriceHistory: Record<AssetSymbol, number[]>
): CorrelationMatrixData {
  const assets: AssetSymbol[] = ["BTC", "ETH", "SOL", "AVAX", "SUI", "BNB"];
  const matrix = {} as Record<AssetSymbol, Record<AssetSymbol, number>>;

  for (const a1 of assets) {
    matrix[a1] = {} as Record<AssetSymbol, number>;
    for (const a2 of assets) {
      if (a1 === a2) {
        matrix[a1][a2] = 1.0;
        continue;
      }

      const p1 = assetPriceHistory[a1] || [];
      const p2 = assetPriceHistory[a2] || [];
      const n = Math.min(p1.length, p2.length);

      if (n < 10) {
        // Fallback realistic correlation coefficients
        const defaults: Record<string, number> = {
          "BTC-ETH": 0.88,
          "BTC-SOL": 0.74,
          "BTC-AVAX": 0.68,
          "BTC-SUI": 0.54,
          "BTC-BNB": 0.81,
          "ETH-SOL": 0.79,
          "ETH-AVAX": 0.75,
          "ETH-SUI": 0.58,
          "ETH-BNB": 0.77,
          "SOL-AVAX": 0.72,
          "SOL-SUI": 0.69,
          "SOL-BNB": 0.65,
          "AVAX-SUI": 0.61,
          "AVAX-BNB": 0.62,
          "SUI-BNB": 0.51,
        };
        const key1 = `${a1}-${a2}`;
        const key2 = `${a2}-${a1}`;
        matrix[a1][a2] = defaults[key1] || defaults[key2] || 0.65;
        continue;
      }

      // Real Pearson calculation
      const r1: number[] = [];
      const r2: number[] = [];
      for (let i = 1; i < n; i++) {
        r1.push((p1[i] - p1[i - 1]) / p1[i - 1]);
        r2.push((p2[i] - p2[i - 1]) / p2[i - 1]);
      }

      const mean1 = r1.reduce((a, b) => a + b, 0) / r1.length;
      const mean2 = r2.reduce((a, b) => a + b, 0) / r2.length;

      let num = 0;
      let den1 = 0;
      let den2 = 0;

      for (let i = 0; i < r1.length; i++) {
        const d1 = r1[i] - mean1;
        const d2 = r2[i] - mean2;
        num += d1 * d2;
        den1 += d1 * d1;
        den2 += d2 * d2;
      }

      const denom = Math.sqrt(den1 * den2);
      const corr = denom === 0 ? 0 : Math.round((num / denom) * 100) / 100;
      matrix[a1][a2] = Math.max(-1, Math.min(1, corr));
    }
  }

  return { assets, matrix };
}
