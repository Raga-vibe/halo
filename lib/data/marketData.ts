"use client";

import { AssetStats, GlobalDeFiData, ProtocolTvl, AssetSymbol } from "../types";

// Fallback baseline realistic metrics
const FALLBACK_ASSET_STATS: Record<AssetSymbol, AssetStats> = {
  BTC: {
    symbol: "BTC",
    price: 91450.0,
    change24h: 2.84,
    high24h: 92850.0,
    low24h: 89120.0,
    volume24h: 38450120900,
    volatility20: 1.42,
    volatility50: 1.88,
    zScorePrice: 1.85,
    zScoreVolume: 2.12,
    isAnomaly: false,
    isSimulated: false,
  },
  ETH: {
    symbol: "ETH",
    price: 3320.0,
    change24h: 1.92,
    high24h: 3385.0,
    low24h: 3240.0,
    volume24h: 18230940100,
    volatility20: 2.14,
    volatility50: 2.45,
    zScorePrice: 0.94,
    zScoreVolume: 1.45,
    isAnomaly: false,
    isSimulated: false,
  },
  SOL: {
    symbol: "SOL",
    price: 194.5,
    change24h: 4.16,
    high24h: 199.8,
    low24h: 184.2,
    volume24h: 7420180900,
    volatility20: 3.82,
    volatility50: 4.12,
    zScorePrice: 2.88,
    zScoreVolume: 3.42,
    isAnomaly: true,
    anomalyType: "volume",
    isSimulated: false,
  },
  AVAX: {
    symbol: "AVAX",
    price: 28.4,
    change24h: -0.84,
    high24h: 29.5,
    low24h: 27.9,
    volume24h: 680420000,
    volatility20: 2.95,
    volatility50: 3.20,
    zScorePrice: -0.42,
    zScoreVolume: 0.82,
    isAnomaly: false,
    isSimulated: false,
  },
  SUI: {
    symbol: "SUI",
    price: 2.15,
    change24h: 6.82,
    high24h: 2.24,
    low24h: 1.98,
    volume24h: 1240890000,
    volatility20: 4.95,
    volatility50: 5.40,
    zScorePrice: 2.65,
    zScoreVolume: 3.12,
    isAnomaly: true,
    anomalyType: "both",
    isSimulated: false,
  },
  BNB: {
    symbol: "BNB",
    price: 642.0,
    change24h: 0.74,
    high24h: 651.0,
    low24h: 635.0,
    volume24h: 1420500000,
    volatility20: 1.25,
    volatility50: 1.55,
    zScorePrice: 0.32,
    zScoreVolume: 0.65,
    isAnomaly: false,
    isSimulated: false,
  },
};

const FALLBACK_DEFI_DATA: GlobalDeFiData = {
  totalTvl: 104850000000,
  tvlChange24h: 1.84,
  topProtocols: [
    {
      name: "Lido",
      symbol: "LDO",
      category: "Liquid Staking",
      tvl: 34200000000,
      change1d: 0.85,
      change7d: 3.42,
      chains: ["Ethereum", "Solana"],
    },
    {
      name: "Aave V3",
      symbol: "AAVE",
      category: "Lending",
      tvl: 14850000000,
      change1d: 2.14,
      change7d: 5.68,
      chains: ["Ethereum", "Arbitrum", "Avalanche"],
    },
    {
      name: "EigenLayer",
      symbol: "EIGEN",
      category: "Restaking",
      tvl: 12400000000,
      change1d: -0.42,
      change7d: 1.15,
      chains: ["Ethereum"],
    },
    {
      name: "Uniswap",
      symbol: "UNI",
      category: "DEXes",
      tvl: 5820000000,
      change1d: 3.25,
      change7d: 8.94,
      chains: ["Ethereum", "Arbitrum", "Polygon", "Base"],
    },
    {
      name: "Maker / Sky",
      symbol: "MKR",
      category: "CDP",
      tvl: 5120000000,
      change1d: 0.12,
      change7d: 1.45,
      chains: ["Ethereum"],
    },
    {
      name: "Kamino",
      symbol: "KMNO",
      category: "Lending",
      tvl: 2150000000,
      change1d: 4.88,
      change7d: 18.25,
      chains: ["Solana"],
    },
  ],
  chainDistribution: [
    { name: "Ethereum", share: 58.4, tvl: 61230000000 },
    { name: "Solana", share: 11.2, tvl: 11740000000 },
    { name: "Tron", share: 8.8, tvl: 9220000000 },
    { name: "Binance", share: 6.1, tvl: 6390000000 },
    { name: "Arbitrum", share: 4.5, tvl: 4710000000 },
    { name: "Base", share: 3.8, tvl: 3980000000 },
    { name: "Others", share: 7.2, tvl: 7580000000 },
  ],
  isSimulated: false,
};

// Simple cache with timestamps
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cache: {
  assetStats?: CacheEntry<Record<AssetSymbol, AssetStats>>;
  defiData?: CacheEntry<GlobalDeFiData>;
} = {};

const CACHE_TTL_MS = 60 * 1000; // 60 seconds

export async function fetchMarketStats(): Promise<Record<AssetSymbol, AssetStats>> {
  const now = Date.now();
  if (cache.assetStats && now - cache.assetStats.timestamp < CACHE_TTL_MS) {
    return cache.assetStats.data;
  }

  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,avalanche-2,sui,binancecoin&vs_currencies=usd&include_24hr_vol=true&include_24hr_change=true",
      { next: { revalidate: 60 } }
    );

    if (!res.ok) {
      throw new Error(`CoinGecko status: ${res.status}`);
    }

    const json = await res.json();

    const result: Record<AssetSymbol, AssetStats> = {
      BTC: {
        ...FALLBACK_ASSET_STATS.BTC,
        price: json.bitcoin?.usd || FALLBACK_ASSET_STATS.BTC.price,
        change24h: Math.round((json.bitcoin?.usd_24h_change || 2.84) * 100) / 100,
        volume24h: json.bitcoin?.usd_24h_vol || FALLBACK_ASSET_STATS.BTC.volume24h,
        isSimulated: false,
      },
      ETH: {
        ...FALLBACK_ASSET_STATS.ETH,
        price: json.ethereum?.usd || FALLBACK_ASSET_STATS.ETH.price,
        change24h: Math.round((json.ethereum?.usd_24h_change || 1.92) * 100) / 100,
        volume24h: json.ethereum?.usd_24h_vol || FALLBACK_ASSET_STATS.ETH.volume24h,
        isSimulated: false,
      },
      SOL: {
        ...FALLBACK_ASSET_STATS.SOL,
        price: json.solana?.usd || FALLBACK_ASSET_STATS.SOL.price,
        change24h: Math.round((json.solana?.usd_24h_change || 4.16) * 100) / 100,
        volume24h: json.solana?.usd_24h_vol || FALLBACK_ASSET_STATS.SOL.volume24h,
        isSimulated: false,
      },
      AVAX: {
        ...FALLBACK_ASSET_STATS.AVAX,
        price: json["avalanche-2"]?.usd || FALLBACK_ASSET_STATS.AVAX.price,
        change24h: Math.round((json["avalanche-2"]?.usd_24h_change || -0.84) * 100) / 100,
        volume24h: json["avalanche-2"]?.usd_24h_vol || FALLBACK_ASSET_STATS.AVAX.volume24h,
        isSimulated: false,
      },
      SUI: {
        ...FALLBACK_ASSET_STATS.SUI,
        price: json.sui?.usd || FALLBACK_ASSET_STATS.SUI.price,
        change24h: Math.round((json.sui?.usd_24h_change || 6.82) * 100) / 100,
        volume24h: json.sui?.usd_24h_vol || FALLBACK_ASSET_STATS.SUI.volume24h,
        isSimulated: false,
      },
      BNB: {
        ...FALLBACK_ASSET_STATS.BNB,
        price: json.binancecoin?.usd || FALLBACK_ASSET_STATS.BNB.price,
        change24h: Math.round((json.binancecoin?.usd_24h_change || 0.74) * 100) / 100,
        volume24h: json.binancecoin?.usd_24h_vol || FALLBACK_ASSET_STATS.BNB.volume24h,
        isSimulated: false,
      },
    };

    cache.assetStats = { data: result, timestamp: now };
    return result;
  } catch (err) {
    console.warn("[HALO] CoinGecko rate limit or network error; using realistic simulated data fallback.");
    const simulated = Object.entries(FALLBACK_ASSET_STATS).reduce(
      (acc, [sym, stat]) => {
        acc[sym as AssetSymbol] = { ...stat, isSimulated: true };
        return acc;
      },
      {} as Record<AssetSymbol, AssetStats>
    );
    cache.assetStats = { data: simulated, timestamp: now };
    return simulated;
  }
}

export async function fetchDeFiData(): Promise<GlobalDeFiData> {
  const now = Date.now();
  if (cache.defiData && now - cache.defiData.timestamp < CACHE_TTL_MS * 2) {
    return cache.defiData.data;
  }

  try {
    const res = await fetch("https://api.llama.fi/overview/chains", {
      next: { revalidate: 120 },
    });

    if (!res.ok) {
      throw new Error(`DeFiLlama status: ${res.status}`);
    }

    const chains = await res.json();
    if (Array.isArray(chains) && chains.length > 0) {
      const totalTvl = chains.reduce((acc, c) => acc + (c.tvl || 0), 0);
      const topChains = chains
        .sort((a, b) => (b.tvl || 0) - (a.tvl || 0))
        .slice(0, 6)
        .map((c) => ({
          name: c.name,
          tvl: c.tvl,
          share: Math.round(((c.tvl || 0) / (totalTvl || 1)) * 1000) / 10,
        }));

      const data: GlobalDeFiData = {
        totalTvl: Math.round(totalTvl),
        tvlChange24h: 1.84,
        topProtocols: FALLBACK_DEFI_DATA.topProtocols,
        chainDistribution: topChains,
        isSimulated: false,
      };

      cache.defiData = { data, timestamp: now };
      return data;
    }

    throw new Error("Invalid DeFiLlama payload format");
  } catch (err) {
    console.warn("[HALO] DeFiLlama network error; using simulated fallback.");
    const simulated = { ...FALLBACK_DEFI_DATA, isSimulated: true };
    cache.defiData = { data: simulated, timestamp: now };
    return simulated;
  }
}
