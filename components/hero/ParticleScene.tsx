"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ scrollProgress }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.Points>(null!);
  const { mouse, viewport } = useThree();

  const isMobile = viewport.width < 9;
  const cols = isMobile ? 65 : 105;
  const rows = isMobile ? 45 : 70;
  const count = cols * rows;

  // Soft circular glowing particle texture
  const particleTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(255, 255, 255, 1)");
    grad.addColorStop(0.3, "rgba(255, 255, 255, 0.8)");
    grad.addColorStop(0.7, "rgba(255, 255, 255, 0.2)");
    grad.addColorStop(1, "rgba(255, 255, 255, 0)");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  const { terrainPositions, chartPositions, colors } = useMemo(() => {
    const terrain = new Float32Array(count * 3);
    const chart = new Float32Array(count * 3);
    const colsArray = new Float32Array(count * 3);

    const baseColor = new THREE.Color("#181B22");
    const midGreen = new THREE.Color("#2E7E52");
    const signalGreen = new THREE.Color("#7CFFB2");

    // Dynamic market chart trajectory
    const chartTrajectory: number[] = [];
    for (let c = 0; c < cols; c++) {
      const norm = c / (cols - 1);
      const cycle = Math.sin(norm * Math.PI * 3.2) * 1.8;
      const micro = Math.cos(norm * 16.0) * 0.35;
      const trend = norm * 2.4 - 1.2;
      chartTrajectory.push(cycle + micro + trend);
    }

    let idx = 0;
    // On desktop, offset terrain center to the right (xOffset ~ 3.5)
    // On mobile, center it but push it lower on Y
    const xOffset = isMobile ? 0 : 3.8;
    const spreadX = isMobile ? 12 : 18;
    const spreadZ = isMobile ? 10 : 15;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const u = (j / (cols - 1)) * 2 - 1; // -1 to 1
        const v = (i / (rows - 1)) * 2 - 1; // -1 to 1

        const x = xOffset + u * (spreadX / 2);
        const z = -2 + v * (spreadZ / 2);

        // Mathematical multi-frequency elevation
        const wave1 = Math.sin(u * 4.2 + v * 3.0) * 1.2;
        const wave2 = Math.cos(u * 2.1 - v * 4.2) * 0.8;
        const wave3 = Math.sin(u * 9.0) * 0.3;
        const y = isMobile
          ? -2.8 + wave1 * 0.45 + wave2 * 0.35
          : wave1 + wave2 + wave3 - 0.2;

        terrain[idx * 3] = x;
        terrain[idx * 3 + 1] = y;
        terrain[idx * 3 + 2] = z;

        // Financial chart target line
        const chartY = chartTrajectory[j] + (isMobile ? -1.0 : 0.2);
        const ribbonSpread = v * 0.5;
        chart[idx * 3] = (isMobile ? 0 : 2.5) + u * (spreadX * 0.42);
        chart[idx * 3 + 1] = chartY + ribbonSpread * 0.3;
        chart[idx * 3 + 2] = -2 + ribbonSpread * 0.4;

        // Color computation: signal green on wave crests and near chart
        const crestFactor = Math.max(0, Math.min(1, (y + 0.2) / 2.2));
        const col = baseColor.clone().lerp(midGreen, crestFactor).lerp(signalGreen, crestFactor * crestFactor);

        colsArray[idx * 3] = col.r;
        colsArray[idx * 3 + 1] = col.g;
        colsArray[idx * 3 + 2] = col.b;

        idx++;
      }
    }

    return {
      terrainPositions: terrain,
      chartPositions: chart,
      colors: colsArray,
    };
  }, [cols, rows, count, isMobile]);

  const currentPositions = useMemo(() => {
    return new Float32Array(terrainPositions);
  }, [terrainPositions]);

  const targetMouse = useRef({ x: 0, y: 0 });
  const mouseInfluence = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    const geom = meshRef.current.geometry;
    const posAttr = geom.attributes.position as THREE.BufferAttribute;
    const colorAttr = geom.attributes.color as THREE.BufferAttribute;

    targetMouse.current.x = mouse.x * (viewport.width / 2);
    targetMouse.current.y = mouse.y * (viewport.height / 2);

    mouseInfluence.current.x += (targetMouse.current.x - mouseInfluence.current.x) * 0.07;
    mouseInfluence.current.y += (targetMouse.current.y - mouseInfluence.current.y) * 0.07;

    const p = THREE.MathUtils.clamp(scrollProgress, 0, 1);
    const easeP = p * p * (3 - 2 * p);

    const positions = posAttr.array as Float32Array;
    const colorData = colorAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      const baseTerrainX = terrainPositions[i3];
      const baseTerrainY =
        terrainPositions[i3 + 1] +
        Math.sin(time * 1.3 + baseTerrainX * 0.35) * 0.35 +
        Math.cos(time * 0.85 + terrainPositions[i3 + 2] * 0.45) * 0.22;
      const baseTerrainZ = terrainPositions[i3 + 2];

      const baseChartX = chartPositions[i3];
      const baseChartY =
        chartPositions[i3 + 1] + Math.sin(time * 2.2 + baseChartX * 0.5) * 0.08;
      const baseChartZ = chartPositions[i3 + 2];

      let targetX = THREE.MathUtils.lerp(baseTerrainX, baseChartX, easeP);
      let targetY = THREE.MathUtils.lerp(baseTerrainY, baseChartY, easeP);
      let targetZ = THREE.MathUtils.lerp(baseTerrainZ, baseChartZ, easeP);

      // Mouse ripple elevation
      const dx = targetX - mouseInfluence.current.x;
      const dy = targetY - mouseInfluence.current.y;
      const distSq = dx * dx + dy * dy;
      const radiusSq = 14.0;

      if (distSq < radiusSq) {
        const factor = 1 - distSq / radiusSq;
        const impulse = factor * factor * (1.6 - easeP * 0.8);
        targetY += impulse;
        targetZ += impulse * 0.35;

        colorData[i3] = THREE.MathUtils.lerp(colors[i3], 0.486, factor * 0.9);
        colorData[i3 + 1] = THREE.MathUtils.lerp(colors[i3 + 1], 1.0, factor * 0.9);
        colorData[i3 + 2] = THREE.MathUtils.lerp(colors[i3 + 2], 0.698, factor * 0.9);
      } else {
        colorData[i3] = colors[i3];
        colorData[i3 + 1] = colors[i3 + 1];
        colorData[i3 + 2] = colors[i3 + 2];
      }

      positions[i3] = targetX;
      positions[i3 + 1] = targetY;
      positions[i3 + 2] = targetZ;
    }

    posAttr.needsUpdate = true;
    colorAttr.needsUpdate = true;

    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      mouse.x * 0.5,
      0.04
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      (isMobile ? 2.5 : 3.8) - easeP * 1.5 + mouse.y * 0.4,
      0.04
    );
    state.camera.lookAt(isMobile ? 0 : 2.0, (isMobile ? -0.8 : 0) + easeP * 0.3, -2);
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[currentPositions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.08 : 0.095}
        vertexColors
        transparent
        opacity={0.88}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        map={particleTexture || undefined}
        sizeAttenuation
      />
    </points>
  );
}

export function ParticleScene() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const progress = Math.min(1, Math.max(0, scrollY / (vh * 1.1)));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 3.8, 9.5], fov: 46 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        className="w-full h-full pointer-events-auto"
      >
        <color attach="background" args={["#050506"]} />
        <ambientLight intensity={0.4} />
        <Particles scrollProgress={scrollProgress} />
      </Canvas>
      {/* Soft gradient bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050506] via-[#050506]/75 to-transparent pointer-events-none" />
      {/* High-end vignette keeping left headline pristine */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_20%_45%,rgba(5,5,6,0.92)_0%,rgba(5,5,6,0.5)_50%,transparent_100%)] pointer-events-none" />
    </div>
  );
}
