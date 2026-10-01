"use client";

import React, { useState, useEffect, useRef } from "react";
import { AssetSymbol, Timeframe } from "../../lib/types";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAsset: (asset: AssetSymbol) => void;
  onSelectTimeframe: (tf: Timeframe) => void;
  onToggleLayout?: (layout: string) => void;
}

interface CommandItem {
  id: string;
  category: "ASSET" | "TIMEFRAME" | "VIEW" | "SYSTEM";
  title: string;
  subtitle?: string;
  badge?: string;
  action: () => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  onSelectAsset,
  onSelectTimeframe,
  onToggleLayout,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Global Cmd+K / Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const allCommands: CommandItem[] = [
    // Assets
    {
      id: "asset-btc",
      category: "ASSET",
      title: "Bitcoin (BTC/USDT)",
      subtitle: "Switch primary chart to Bitcoin spot/perp",
      badge: "HOT",
      action: () => {
        onSelectAsset("BTC");
        onClose();
      },
    },
    {
      id: "asset-eth",
      category: "ASSET",
      title: "Ethereum (ETH/USDT)",
      subtitle: "Switch primary chart to Ethereum",
      action: () => {
        onSelectAsset("ETH");
        onClose();
      },
    },
    {
      id: "asset-sol",
      category: "ASSET",
      title: "Solana (SOL/USDT)",
      subtitle: "High-beta anomaly detection active",
      badge: "ANOMALY",
      action: () => {
        onSelectAsset("SOL");
        onClose();
      },
    },
    {
      id: "asset-avax",
      category: "ASSET",
      title: "Avalanche (AVAX/USDT)",
      subtitle: "Subnet cross-chain liquidity tracking",
      action: () => {
        onSelectAsset("AVAX");
        onClose();
      },
    },
    {
      id: "asset-sui",
      category: "ASSET",
      title: "Sui Network (SUI/USDT)",
      subtitle: "Dual volume/price surge",
      badge: "SURGE",
      action: () => {
        onSelectAsset("SUI");
        onClose();
      },
    },
    {
      id: "asset-bnb",
      category: "ASSET",
      title: "BNB (BNB/USDT)",
      subtitle: "Ecosystem liquidity anchor",
      action: () => {
        onSelectAsset("BNB");
        onClose();
      },
    },

    // Timeframes
    {
      id: "tf-1m",
      category: "TIMEFRAME",
      title: "Set Timeframe: 1 Minute (1m)",
      subtitle: "Ultra-high-frequency tick aggregation",
      action: () => {
        onSelectTimeframe("1m");
        onClose();
      },
    },
    {
      id: "tf-5m",
      category: "TIMEFRAME",
      title: "Set Timeframe: 5 Minutes (5m)",
      subtitle: "Microstructure scalping view",
      action: () => {
        onSelectTimeframe("5m");
        onClose();
      },
    },
    {
      id: "tf-15m",
      category: "TIMEFRAME",
      title: "Set Timeframe: 15 Minutes (15m)",
      subtitle: "Standard intraday session",
      action: () => {
        onSelectTimeframe("15m");
        onClose();
      },
    },
    {
      id: "tf-1h",
      category: "TIMEFRAME",
      title: "Set Timeframe: 1 Hour (1h)",
      subtitle: "Multi-session directional drift",
      action: () => {
        onSelectTimeframe("1h");
        onClose();
      },
    },
    {
      id: "tf-1d",
      category: "TIMEFRAME",
      title: "Set Timeframe: 1 Day (1d)",
      subtitle: "Macro structure & key levels",
      action: () => {
        onSelectTimeframe("1d");
        onClose();
      },
    },

    // Views
    {
      id: "view-default",
      category: "VIEW",
      title: "Reset Bento Workspace",
      subtitle: "Restore standard institutional 4-panel view",
      action: () => {
        onToggleLayout?.("default");
        onClose();
      },
    },
    {
      id: "view-chart-focus",
      category: "VIEW",
      title: "Maximize Chart Screen",
      subtitle: "Expand lightweight-charts to full viewport",
      action: () => {
        onToggleLayout?.("chart-focus");
        onClose();
      },
    },
    {
      id: "sys-reconnect",
      category: "SYSTEM",
      title: "Restart Binance WebSocket Pipeline",
      subtitle: "Re-negotiate TLS handshake with stream.binance.com",
      action: () => {
        window.location.reload();
      },
    },
  ];

  const filteredCommands = allCommands.filter((cmd) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q) ||
      cmd.subtitle?.toLowerCase().includes(q)
    );
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev === 0 ? filteredCommands.length - 1 : prev - 1
      );
    } else if (e.key === "Enter" && filteredCommands[selectedIndex]) {
      e.preventDefault();
      filteredCommands[selectedIndex].action();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-[#0D0D11] border border-white/[0.12] rounded-xl shadow-[0_24px_64px_rgba(0,0,0,0.8)] overflow-hidden font-mono text-xs animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.08] bg-[#121217]">
          <svg
            className="w-4 h-4 text-[#7CFFB2]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command, asset (BTC, SOL), or timeframe (1m, 1h)..."
            className="flex-1 bg-transparent text-white placeholder-[#8A8F98]/50 text-sm focus:outline-none"
          />
          <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/[0.08] text-[10px] text-[#8A8F98]">
            ESC
          </kbd>
        </div>

        {/* Command List */}
        <div className="max-h-80 overflow-y-auto divide-y divide-white/[0.02] p-1">
          {filteredCommands.length === 0 ? (
            <div className="py-12 px-4 text-center text-[#8A8F98]">
              <div className="text-white/40 mb-1">No matching commands found</div>
              <div className="text-[11px]">
                Try searching for &quot;BTC&quot;, &quot;SOL&quot;, &quot;5m&quot;, or &quot;Matrix&quot;
              </div>
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={cmd.id}
                  onClick={cmd.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-[#7CFFB2]/10 text-white border border-[#7CFFB2]/30"
                      : "text-white/80 hover:bg-white/[0.03] border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-white/[0.06] text-[#8A8F98]">
                      {cmd.category}
                    </span>
                    <div>
                      <div className="font-medium text-[13px] text-white flex items-center gap-2">
                        {cmd.title}
                        {cmd.badge && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-[#7CFFB2] text-black">
                            {cmd.badge}
                          </span>
                        )}
                      </div>
                      {cmd.subtitle && (
                        <div className="text-[11px] text-[#8A8F98]">
                          {cmd.subtitle}
                        </div>
                      )}
                    </div>
                  </div>

                  {isSelected && (
                    <span className="text-[#7CFFB2] text-[11px] flex items-center gap-1">
                      <span>Execute</span>
                      <span>↵</span>
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts hint */}
        <div className="px-4 py-2 border-t border-white/[0.08] bg-[#0E0E12] flex items-center justify-between text-[10px] text-[#8A8F98]">
          <div className="flex items-center gap-3">
            <span>&uarr;&darr; Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span className="text-[#7CFFB2]">HALO COMMAND BUS</span>
        </div>
      </div>
    </div>
  );
}
