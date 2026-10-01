"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export function MagneticCTA({
  children,
  href,
  className = "",
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Subtle magnetic pull (Apple restraint - not hyperactive)
    setPosition({
      x: distanceX * 0.22,
      y: distanceY * 0.22,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      animate={{ x: position.x, y: position.y }}
      transition={{
        type: "spring",
        stiffness: 250,
        damping: 18,
        mass: 0.2,
      }}
      className="inline-block"
    >
      <Link
        ref={buttonRef}
        href={href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`group relative inline-flex items-center gap-3.5 px-8 py-4 rounded-full bg-[#0E0E12] text-white text-[15px] font-medium tracking-tight border border-white/[0.12] hover:border-[#7CFFB2]/50 hover:bg-[#14141A] transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7CFFB2] focus-visible:outline-offset-2 ${className}`}
      >
        {/* Subtle radial inner glow on hover */}
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_center,rgba(124,255,178,0.15),transparent_70%)] pointer-events-none" />

        {/* Signal green pulse dot */}
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7CFFB2] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7CFFB2]" />
        </span>

        <span className="relative z-10 text-white font-medium">{children}</span>

        {/* Minimal keyboard indicator */}
        <span className="relative z-10 ml-1 px-1.5 py-0.5 text-[11px] font-mono tabular-nums text-[#8A8F98] bg-white/[0.06] rounded border border-white/[0.08] group-hover:text-white group-hover:border-white/[0.18] transition-colors">
          ↵
        </span>

        {/* Arrow chevron */}
        <svg
          className="relative z-10 w-4 h-4 text-[#8A8F98] group-hover:text-[#7CFFB2] group-hover:translate-x-0.5 transition-all duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Link>
    </motion.div>
  );
}
