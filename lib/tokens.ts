/**
 * HALO Design Tokens
 * 
 * Aesthetic Thesis: Apple Restraint + NVIDIA Industrial Power.
 * Near-black canvas (#050506), ONE primary accent (Signal Green #7CFFB2),
 * 1px hairlines at 8% white, generous negative space, tabular figures.
 */

export const TOKENS = {
  colors: {
    // Canvas & Surfaces
    canvas: "#050506",
    canvasSub: "#0A0A0D",
    canvasPanel: "#0E0E12",
    canvasSurface: "#131318",
    canvasHover: "#181820",

    // Borders & Hairlines (8% white standard)
    borderHairline: "rgba(255, 255, 255, 0.08)",
    borderHairlineHover: "rgba(255, 255, 255, 0.16)",
    borderHairlineActive: "rgba(124, 255, 178, 0.35)",

    // The ONE Primary Accent
    signalGreen: "#7CFFB2",
    signalGreenMuted: "rgba(124, 255, 178, 0.12)",
    signalGreenGlow: "rgba(124, 255, 178, 0.3)",
    signalGreenBorder: "rgba(124, 255, 178, 0.25)",

    // Secondary Telemetry Colors (strictly for status & anomaly identification)
    signalRed: "#FF5C5C",
    signalRedMuted: "rgba(255, 92, 92, 0.12)",
    signalAmber: "#FFD166",
    signalAmberMuted: "rgba(255, 209, 102, 0.12)",

    // Typography & Content
    textPrimary: "#FFFFFF",
    textSecondary: "#8A8F98", // 17px body muted gray
    textTertiary: "#4A4D55",
    textQuaternary: "#26282E",
  },

  typography: {
    hero: {
      fontSize: "clamp(4.5rem, 9vw, 8.75rem)", // 72px to 140px
      lineHeight: "0.92",
      letterSpacing: "-0.04em",
      fontWeight: "600",
    },
    display: {
      fontSize: "clamp(2.5rem, 5vw, 4rem)",
      lineHeight: "1.05",
      letterSpacing: "-0.035em",
      fontWeight: "600",
    },
    sectionHeading: {
      fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
      lineHeight: "1.15",
      letterSpacing: "-0.03em",
      fontWeight: "550",
    },
    title: {
      fontSize: "1.25rem", // 20px
      lineHeight: "1.3",
      letterSpacing: "-0.02em",
      fontWeight: "500",
    },
    body: {
      fontSize: "1.0625rem", // 17px
      lineHeight: "1.6",
      letterSpacing: "-0.01em",
      fontWeight: "400",
    },
    caption: {
      fontSize: "0.8125rem", // 13px
      lineHeight: "1.4",
      letterSpacing: "0.01em",
      fontWeight: "450",
    },
    monoTelemetry: {
      fontFamily: "var(--font-geist-mono), monospace",
      fontVariantNumeric: "tabular-nums",
      letterSpacing: "-0.02em",
    },
  },

  motion: {
    // Apple standard exponential deceleration curve
    easeApple: "cubic-bezier(0.16, 1, 0.3, 1)",
    easePower: "cubic-bezier(0.25, 1, 0.5, 1)",
    durationFast: 0.25,
    durationMedium: 0.5,
    durationSlow: 0.85,
    durationCinematic: 1.4,
  },

  radius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    full: "9999px",
  },

  zIndex: {
    canvas: 0,
    scene: 1,
    base: 10,
    panels: 20,
    overlay: 30,
    navigation: 40,
    modal: 50,
    commandPalette: 60,
    toast: 70,
  }
} as const;

export type DesignTokens = typeof TOKENS;
