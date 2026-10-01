"use client";

import { AssetSymbol, TradeTick } from "../types";

export type ConnectionStatus = "connecting" | "live" | "reconnecting" | "simulated";

type TickCallback = (tick: TradeTick) => void;
type StatusCallback = (status: ConnectionStatus, latencyMs: number) => void;

class BinanceStreamManager {
  private ws: WebSocket | null = null;
  private subscribers: Set<TickCallback> = new Set();
  private statusSubscribers: Set<StatusCallback> = new Set();
  private status: ConnectionStatus = "connecting";
  private latencyMs: number = 6.4;
  private reconnectAttempts = 0;
  private simulationInterval: NodeJS.Timeout | null = null;
  private lastPrices: Record<AssetSymbol, number> = {
    BTC: 91450.0,
    ETH: 3320.0,
    SOL: 194.5,
    AVAX: 28.4,
    SUI: 2.15,
    BNB: 642.0,
  };
  private isDestroyed = false;

  constructor() {
    if (typeof window !== "undefined") {
      this.connect();
    }
  }

  public subscribe(cb: TickCallback): () => void {
    this.subscribers.add(cb);
    return () => {
      this.subscribers.delete(cb);
    };
  }

  public onStatusChange(cb: StatusCallback): () => void {
    this.statusSubscribers.add(cb);
    cb(this.status, this.latencyMs);
    return () => {
      this.statusSubscribers.delete(cb);
    };
  }

  public getStatus(): { status: ConnectionStatus; latencyMs: number } {
    return { status: this.status, latencyMs: this.latencyMs };
  }

  public getLastPrice(symbol: AssetSymbol): number {
    return this.lastPrices[symbol] || 0;
  }

  private setStatus(status: ConnectionStatus, latency = this.latencyMs) {
    this.status = status;
    this.latencyMs = latency;
    this.statusSubscribers.forEach((cb) => cb(status, latency));
  }

  private connect() {
    if (this.isDestroyed || typeof window === "undefined") return;

    this.setStatus("connecting");

    const endpoint =
      "wss://stream.binance.com:9443/stream?streams=btcusdt@trade/ethusdt@trade/solusdt@trade";

    try {
      this.ws = new WebSocket(endpoint);

      const connectionTimeout = setTimeout(() => {
        if (this.ws && this.ws.readyState !== WebSocket.OPEN) {
          console.warn("[HALO] Binance WebSocket connection timed out, failing over to simulated feed.");
          this.ws.close();
          this.startSimulation();
        }
      }, 5000);

      this.ws.onopen = () => {
        clearTimeout(connectionTimeout);
        this.stopSimulation();
        this.reconnectAttempts = 0;
        this.setStatus("live", Math.floor(6 + Math.random() * 5));
      };

      this.ws.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          if (!payload.data || payload.data.e !== "trade") return;

          const d = payload.data;
          let symbol: AssetSymbol = "BTC";
          if (d.s === "ETHUSDT") symbol = "ETH";
          if (d.s === "SOLUSDT") symbol = "SOL";

          const price = parseFloat(d.p);
          const size = parseFloat(d.q);
          const timestamp = d.T;
          const isBuyerMaker = d.m;

          this.lastPrices[symbol] = price;

          // Latency calculation
          const now = Date.now();
          const latency = Math.max(4, Math.min(180, now - d.E));
          this.latencyMs = latency;
          this.setStatus("live", latency);

          const tick: TradeTick = {
            symbol,
            price,
            size,
            timestamp,
            isBuyerMaker,
            id: String(d.t),
          };

          this.subscribers.forEach((cb) => cb(tick));
        } catch {
          // Ignore parsing anomalies
        }
      };

      this.ws.onerror = () => {
        if (this.status !== "simulated") {
          this.startSimulation();
        }
      };

      this.ws.onclose = () => {
        if (this.isDestroyed) return;
        this.reconnectAttempts++;
        if (this.reconnectAttempts <= 3) {
          this.setStatus("reconnecting");
          setTimeout(() => this.connect(), 2000 * this.reconnectAttempts);
        } else {
          this.startSimulation();
        }
      };
    } catch {
      this.startSimulation();
    }
  }

  private startSimulation() {
    if (this.simulationInterval) return;
    this.setStatus("simulated", 1.8);

    const symbols: AssetSymbol[] = ["BTC", "ETH", "SOL", "AVAX", "SUI", "BNB"];

    this.simulationInterval = setInterval(() => {
      // Pick random symbol
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];
      const currentPrice = this.lastPrices[symbol];

      // Realistic Brownian drift with occasional micro-jumps
      const isBurst = Math.random() < 0.05;
      const volatility = isBurst ? 0.0035 : 0.0006;
      const delta = (Math.random() - 0.495) * currentPrice * volatility;
      const newPrice = Math.round((currentPrice + delta) * 100) / 100;
      this.lastPrices[symbol] = newPrice;

      // Realistic lot sizes
      let size = 0;
      if (symbol === "BTC") size = Math.round((0.02 + Math.random() * 2.8) * 1000) / 1000;
      else if (symbol === "ETH") size = Math.round((0.2 + Math.random() * 15.0) * 100) / 100;
      else if (symbol === "SOL") size = Math.round((2.0 + Math.random() * 120.0) * 10) / 10;
      else size = Math.round((10 + Math.random() * 500) * 10) / 10;

      const isBuyerMaker = Math.random() > 0.52;

      const tick: TradeTick = {
        symbol,
        price: newPrice,
        size,
        timestamp: Date.now(),
        isBuyerMaker,
        id: `sim-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      };

      this.subscribers.forEach((cb) => cb(tick));
    }, 180);
  }

  private stopSimulation() {
    if (this.simulationInterval) {
      clearInterval(this.simulationInterval);
      this.simulationInterval = null;
    }
  }

  public destroy() {
    this.isDestroyed = true;
    this.stopSimulation();
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.subscribers.clear();
    this.statusSubscribers.clear();
  }
}

let instance: BinanceStreamManager | null = null;

export function getBinanceStream(): BinanceStreamManager {
  if (!instance) {
    instance = new BinanceStreamManager();
  }
  return instance;
}
