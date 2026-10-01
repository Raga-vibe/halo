export type AssetSymbol = "BTC" | "ETH" | "SOL" | "AVAX" | "SUI" | "BNB";

export interface TradeTick {
  symbol: AssetSymbol;
  price: number;
  size: number;
  timestamp: number;
  isBuyerMaker: boolean; // true = sell taker, false = buy taker
  id: string;
}

export type Timeframe = "1m" | "5m" | "15m" | "1h" | "4h" | "1d";

export interface AnomalyFlag {
  type: "price" | "volume" | "both";
  zScorePrice: number;
  zScoreVolume: number;
  severity: "low" | "medium" | "high";
  message: string;
}

export interface CandleData {
  time: number; // Unix timestamp in seconds for lightweight-charts
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  anomaly?: AnomalyFlag;
}

export interface AssetStats {
  symbol: AssetSymbol;
  price: number;
  change24h: number;
  high24h: number;
  low24h: number;
  volume24h: number;
  volatility20: number; // in %
  volatility50: number; // in %
  zScorePrice: number;
  zScoreVolume: number;
  isAnomaly: boolean;
  anomalyType?: "price" | "volume" | "both";
  isSimulated: boolean;
}

export interface CorrelationMatrixData {
  assets: AssetSymbol[];
  matrix: Record<AssetSymbol, Record<AssetSymbol, number>>;
}

export interface ProtocolTvl {
  name: string;
  symbol: string;
  category: string;
  tvl: number;
  change1d: number;
  change7d: number;
  chains: string[];
}

export interface GlobalDeFiData {
  totalTvl: number;
  tvlChange24h: number;
  topProtocols: ProtocolTvl[];
  chainDistribution: { name: string; share: number; tvl: number }[];
  isSimulated: boolean;
}

export interface InsightItem {
  id: string;
  timestamp: number;
  symbol: AssetSymbol | "GLOBAL";
  category: "VOLATILITY" | "ANOMALY" | "CORRELATION" | "ORDERFLOW" | "ONCHAIN";
  level: "info" | "warning" | "critical";
  headline: string;
  detail: string;
}
