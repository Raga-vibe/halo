"use client";

import React, { useRef, useState } from "react";

interface BentoCardProps {
  title: string;
  category: string;
  description: string;
  className?: string;
  children?: React.ReactNode;
}

export function BentoCard({
  title,
  category,
  description,
  className = "",
  children,
}: BentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x, y });

    // Subtle 3D tilt (Apple-grade restrained physics)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5.0; // max 5 deg tilt
    const rotateY = ((x - centerX) / centerX) * 5.0;

    setTilt({ rotateX, rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
    setMousePos({ x: -200, y: -200 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
      }}
      className={`group relative rounded-2xl bg-[#09090D] border border-white/[0.08] hover:border-white/[0.18] p-6 sm:p-7 flex flex-col justify-between overflow-hidden transition-colors duration-300 ${className}`}
    >
      {/* Mouse-following spotlight radial glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(124, 255, 178, 0.09), transparent 80%)`,
        }}
      />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between font-mono text-xs mb-4">
        <span className="text-[#7CFFB2] text-[11px] font-semibold tracking-wider uppercase">
          {category}
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-white/[0.2] group-hover:bg-[#7CFFB2] transition-colors" />
      </div>

      {/* Center Interactive Visual Area */}
      <div className="relative z-10 my-4 flex-1 flex flex-col justify-center">
        {children}
      </div>

      {/* Bottom Text Content */}
      <div className="relative z-10 mt-4 pt-4 border-t border-white/[0.06]">
        <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-white mb-2 group-hover:text-white transition-colors">
          {title}
        </h3>
        <p className="text-[#8A8F98] text-[14px] sm:text-[15px] leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
