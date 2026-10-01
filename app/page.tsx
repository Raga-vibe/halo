import { SmoothScroll } from "@/components/landing/SmoothScroll";
import { Hero } from "@/components/hero/Hero";
import { PinnedScrollStory } from "@/components/landing/PinnedScrollStory";
import { BentoGrid } from "@/components/landing/BentoGrid";
import { NvidiaSpecSheet } from "@/components/landing/NvidiaSpecSheet";
import { FooterCTA } from "@/components/landing/FooterCTA";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-[#050506] text-white selection:bg-[#7CFFB2] selection:text-black overflow-x-hidden">
        {/* 1. Cinematic React Three Fiber Hero */}
        <Hero />

        {/* 2. Pinned Scroll Story (GSAP ScrollTrigger + Lenis) */}
        <PinnedScrollStory />

        {/* 3. Interactive Bento Grid with Mouse Spotlight & 3D Tilt */}
        <BentoGrid />

        {/* 4. NVIDIA Spec-Sheet Stat Reveal */}
        <NvidiaSpecSheet />

        {/* 5. Cinematic Minimal Footer CTA */}
        <FooterCTA />
      </main>
    </SmoothScroll>
  );
}
