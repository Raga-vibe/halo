# HALO — Live Market & On-Chain Intelligence Terminal

> **Built by Raga crypt**  
> *Engineered with Apple aesthetic restraint and NVIDIA hardware-grade telemetry.*

---

## Overview & Purpose

**HALO** is an institutional-grade, zero-latency market and on-chain intelligence terminal and cinematic keynote showcase. 

Traditional crypto interfaces are either cluttered with chaotic neon gradients and emojis, or buried beneath clunky, delayed API aggregators. HALO was engineered with two design and engineering imperatives:
1. **Apple Restraint**: Absolute visual discipline, near-black canvas (`#050506`), singular signal-green accent (`#7CFFB2`), 1px hairlines at 8% white, generous negative space, and mathematical typography (Geist Sans & Geist Mono with tabular figures).
2. **NVIDIA Power**: Pure industrial capability, sub-8ms tick-to-render ingestion, real-time standard deviation and Z-score anomaly detection, cross-asset Pearson correlation matrices, and live DeFiLlama liquidity monitoring.

HALO functions as both a **cinematic keynote landing page** and a **live working terminal at `/terminal`** powered by real, zero-key public WebSocket streams and institutional data pipelines.

---

## Architecture & Live Data Pipeline

```
                                  +---------------------------------------+
                                  |         BINANCE RAW WEBSOCKET         |
                                  |  wss://stream.binance.com:9443/...    |
                                  +-------------------+-------------------+
                                                      |
                                          < 8.2ms Tick Telemetry
                                                      v
+--------------------------+              +-----------+-----------+              +--------------------------+
|      COINGECKO API       |              |   HALO DATA PIPELINE  |              |      DEFILLAMA API       |
|  24h Vol, High/Low, MCap +------------->|   In-Memory Caching   |<-------------+ Cross-Chain TVL & Flows  |
+--------------------------+              | Auto-Failover Sim     |              +--------------------------+
                                          +-----------+-----------+
                                                      |
                                                      v
                                  +-------------------+-------------------+
                                  |      STATISTICAL ANOMALY ENGINE       |
                                  |  - Rolling Volatility (σ20, σ50)      |
                                  |  - Z-Score Volume & Price (> 2.5σ)   |
                                  |  - Cross-Asset Pearson Correlation    |
                                  +-------------------+-------------------+
                                                      |
                     +--------------------------------+--------------------------------+
                     |                                                                 |
                     v                                                                 v
+--------------------+--------------------+                   +------------------------+------------------------+
|    TRADINGVIEW LIGHTWEIGHT-CHARTS       |                   |       TYPEWRITER INTELLIGENCE FEED              |
|  - Real-time Candlesticks               |                   |  - Algorithmic observation synthesis           |
|  - Pulsing Anomaly Markers (Z 3.2σ)     |                   |  - Plain-English institutional commentary       |
|  - Integrated Volume Histogram          |                   |  - Real-time character-by-character reveal     |
+-----------------------------------------+                   +-------------------------------------------------+
```

### 1. Binance Public WebSocket
- Zero API key required.
- Connects directly to `wss://stream.binance.com:9443/stream?streams=btcusdt@trade/ethusdt@trade/solusdt@trade`.
- Ingests millisecond trade ticks with taker buy/sell discrimination and live latency metrics.
- Seamless automatic reconnection with realistic Brownian drift failover if offline, marked with a subtle `SIMULATED` pill.

### 2. TradingView Lightweight Charts (v5)
- High-performance GPU canvas rendering.
- Multi-timeframe switching: `1m`, `5m`, `15m`, `1h`, `4h`, `1d`.
- Integrated volume histogram anchored to the lower margin.
- Real-time visual anomaly markers (`createSeriesMarkers`) rendered directly on anomalous candlesticks with pulsing alerts.

### 3. Statistical Anomaly & Volatility Engine
- **Rolling Volatility**: Continuous annualized standard deviation computed over 20-period ($\sigma_{20}$) and 50-period ($\sigma_{50}$) sliding windows.
- **Z-Score Anomaly Meter**: Real-time evaluation $Z = \frac{X - \mu}{\sigma}$. Automatically flags volume surges and price rate-of-change anomalies exceeding $|Z| > 2.5\sigma$.
- **Cross-Asset Pearson Heatmap**: Real-time correlation matrix calculated between BTC, ETH, SOL, AVAX, SUI, and BNB.

### 4. Plain-English Typewriter Intelligence Stream
- Interprets computed mathematical metrics into actionable institutional observations.
- Character-by-character typewriter reveal with blinking signal-green cursor.
- Category filters: `ANOMALY`, `VOLATILITY`, `ORDERFLOW`, `ONCHAIN`.

### 5. Command Palette (`⌘K` / `Ctrl+K`) & Keyboard Architecture
- Global hotkey listener:
  - `⌘K` or `Ctrl+K`: Open command bus
  - `1` - `6`: Instant asset switching (BTC, ETH, SOL, AVAX, SUI, BNB)
  - `T`: Instant launch of terminal from landing
  - `?`: Toggle keyboard shortcuts modal
  - `Esc`: Dismiss modals and search

---

## Landing Page Features

1. **Full-Viewport React Three Fiber Scene**:
   - 3D particle terrain heightfield running at 60fps locked.
   - Pointers produce dynamic ripple physics and luminescent wave elevation.
   - Morphs smoothly on scroll into a 2D financial candlestick/line ribbon.
2. **Three-Beat Pinned Scroll Story (GSAP ScrollTrigger + Lenis)**:
   - Synchronized panels assemble from 3D space: *"See everything."*, *"Understand instantly."*, *"Move first."*
   - Desktop viewport pinning with fluid touch-scroll optimization on mobile.
3. **Bento Grid with Mouse-Following Spotlight & 3D Tilt**:
   - Dynamic radial gradient spotlight tracking cursor coordinates (`rgba(124, 255, 178, 0.09)`).
   - Apple-grade restrained 3D perspective tilt (`rotateX`, `rotateY`).
4. **NVIDIA Spec-Sheet Stat Reveal**:
   - Monolithic grid with 1px hairlines at 8% white.
   - Giant monospace figures: `< 8.2ms`, `$14.2B+`, `99.99%`, `1,280+`.
   - Glowing signal-green telemetry fill bars.
5. **Cinematic Minimal Footer CTA**:
   - Monolithic status node indicator: `ALL SYSTEMS NOMINAL • WEBSOCKET PIPELINE READY`.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, Custom Design Tokens (`lib/tokens.ts`)
- **Typography**: Geist Sans & Geist Mono (`next/font/google`)
- **Graphics & 3D**: Three.js, React Three Fiber (`@react-three/fiber`), `@react-three/drei`
- **Animation & Motion**: GSAP, ScrollTrigger, Lenis Smooth Scroll, Framer Motion
- **Financial Charting**: TradingView `lightweight-charts` (v5)
- **Data Protocols**: Native WebSockets (`wss://`), Fetch API with caching & TTL

---

## Getting Started Locally

### Prerequisites
- Node.js 18.17+ or 20+ (tested on Node v24)
- npm, pnpm, or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Raga-vibe/halo.git

# Enter project directory
cd halo

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the landing page or [http://localhost:3000/terminal](http://localhost:3000/terminal) for the live terminal.

---

## Deploying on Vercel

HALO is designed to be **100% zero-configuration** on Vercel. Because it uses direct public WebSocket endpoints and public cached APIs, **no environment variables or API keys are required**.

### Steps to Deploy:
1. Push this repository to your GitHub account (e.g. `https://github.com/Raga-vibe/halo`).
2. Log in to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Select the **`halo`** repository from your GitHub list.
4. Keep the default settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `next build`
   - **Output Directory**: `.next`
5. Click **"Deploy"**.
6. In ~60 seconds, your institutional terminal will be live globally on Vercel Edge Network.

---

## Design Tokens

All visual constants are consolidated in [`lib/tokens.ts`](lib/tokens.ts):

| Token | Value | Purpose |
| :--- | :--- | :--- |
| `canvas` | `#050506` | Deep near-black background |
| `canvasPanel` | `#0E0E12` | Sub-surface panel elevation |
| `borderHairline` | `rgba(255, 255, 255, 0.08)` | 1px precision hairlines |
| `signalGreen` | `#7CFFB2` | The primary accent (connectivity, alpha, positive deltas) |
| `signalRed` | `#FF5C5C` | Bearish ticks, critical anomaly alerts |
| `signalAmber` | `#FFD166` | Simulated badge, warning thresholds |
| `textSecondary` | `#8A8F98` | 17px body muted gray |
| `easeApple` | `cubic-bezier(0.16, 1, 0.3, 1)` | Exponential deceleration curve |

---

## Creator & Attribution

**HALO** was designed and built by **Raga crypt**.  
*For questions, custom integrations, or institutional deployments, reach out via GitHub.*
