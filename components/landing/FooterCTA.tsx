"use client";

import React from "react";
import Link from "next/link";
import { MagneticCTA } from "../hero/MagneticCTA";

export function FooterCTA() {
  return (
    <footer className="relative w-full bg-[#050506] border-t border-white/[0.08] pt-24 pb-16 px-6 sm:px-12 lg:px-16 text-white overflow-hidden">
      {/* Background Soft Ambient Green Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse_at_bottom,rgba(124,255,178,0.06),transparent_70%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Monolithic Status Node */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur text-xs font-mono text-[#8A8F98] mb-8">
          <span className="w-2 h-2 rounded-full bg-[#7CFFB2] animate-pulse" />
          <span>ALL SYSTEMS NOMINAL</span>
          <span className="text-white/30">&bull;</span>
          <span className="text-[#7CFFB2]">WEBSOCKET PIPELINE READY</span>
        </div>

        {/* Monumental Headline */}
        <h2 className="text-5xl sm:text-7xl lg:text-8xl font-semibold tracking-[-0.04em] text-white max-w-4xl mb-8">
          The market moves.
          <br />
          Move first.
        </h2>

        {/* Body */}
        <p className="text-[#8A8F98] text-base sm:text-lg max-w-xl mb-10 leading-relaxed">
          Launch the live terminal in under 8 milliseconds. Direct WebSocket feed,
          statistical anomaly engine, and correlation matrices with zero sign-up.
        </p>

        {/* Magnetic CTA */}
        <div className="mb-20">
          <MagneticCTA href="/terminal">
            Launch Live Terminal
          </MagneticCTA>
        </div>

        {/* Apple-style Micro Footer */}
        <div className="w-full pt-10 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#8A8F98]">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-white">HALO</span>
            <span>&bull;</span>
            <span className="text-[#7CFFB2]">BUILT BY RAGA CRYPT</span>
            <span>&bull;</span>
            <span>INSTITUTIONAL MARKET INTELLIGENCE</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/terminal" className="hover:text-white transition-colors">
              Terminal
            </Link>
            <Link href="#story" className="hover:text-white transition-colors">
              Architecture
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              Source
            </a>
            <span className="text-white/40">RELEASE 2.4.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
