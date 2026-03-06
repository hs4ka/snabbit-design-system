// ─────────────────────────────────────────────
// Snabbit Design System — Design Tokens
// Source: Figma file BrCo1KNl2tkj2yW6GUjife
// Semantic tokens: names are based on usage, not color value.
// ─────────────────────────────────────────────

// ── Colors ───────────────────────────────────

export const colors = {
  // Background
  bg: {
    primary:   "#FFFFFF",
    secondary: "#FAFAFA",
    tertiary:  "#F0F0F0",
  },

  // Text
  text: {
    primary:   "#303030",
    secondary: "#828282",
    tertiary:  "#ABABAB",
  },

  // Accent
  accent: {
    primary: "#F70F79",
    light:   "#FFF3F8",
  },

  // Stroke
  stroke: {
    primary:   "#F70F79",
    secondary: "#F0F0F0",
  },

  // Status
  status: {
    orange: { dark: "#E16614", light: "#FFE6D5" },
    blue:   { dark: "#3559E9", light: "#D5E2FF" },
    red:    { dark: "#E93544", light: "#FFD5D8" },
    green:  { dark: "#178C4E", light: "#D0FBE9" },
    yellow: { dark: "#C99A2C", light: "#FFEFCC" },
  },
} as const;

// ── Typography ───────────────────────────────

export const fontFamily = "'Instrument Sans', sans-serif";

// letterSpacing 0.2 in Figma = 0.2% = 0.002em
export const typeStyles = {
  // Bold
  bold24: { fontWeight: 700, fontSize: 24, lineHeight: 30, letterSpacing: 0          },
  bold20: { fontWeight: 700, fontSize: 20, lineHeight: 26, letterSpacing: 0          },
  bold16: { fontWeight: 700, fontSize: 16, lineHeight: 20, letterSpacing: "0.002em"  },
  bold14: { fontWeight: 700, fontSize: 14, lineHeight: 20, letterSpacing: "0.002em"  },

  // Semibold
  semibold16: { fontWeight: 600, fontSize: 16, lineHeight: 20, letterSpacing: "0.002em" },
  semibold14: { fontWeight: 600, fontSize: 14, lineHeight: 20, letterSpacing: 0         },
  semibold13: { fontWeight: 600, fontSize: 13, lineHeight: 16, letterSpacing: 0         },

  // Medium
  medium14: { fontWeight: 500, fontSize: 14, lineHeight: 20, letterSpacing: 0 },
  medium12: { fontWeight: 500, fontSize: 12, lineHeight: 16, letterSpacing: 0 },
  medium11: { fontWeight: 500, fontSize: 11, lineHeight: 14, letterSpacing: 0 },
} as const;

// ── Radii ────────────────────────────────────

export const radius = {
  0:    0,
  2:    2,
  4:    4,
  8:    8,
  10:   10,
  12:   12,
  16:   16,
  20:   20,
  24:   24,
  full: 999,
} as const;

// ── Shadows ───────────────────────────────────
// Figma: "Extra Small", "Small", "Medium", "Large"
// Pixel values rounded from Figma's fractional units (base ≈ 1.13px).

export const shadows = {
  xs: [
    "0 0 0 1px rgba(51,51,51,0.04)",
    "0 1px 2px 0px rgba(51,51,51,0.04)",
    "0 2px 5px 0px rgba(51,51,51,0.04)",
    "0 5px 9px -2px rgba(51,51,51,0.06)",
  ].join(", "),

  sm: [
    "0 0 0 1px rgba(51,51,51,0.04)",
    "0 1px 3px -2px rgba(51,51,51,0.16)",
    "0 6px 6px -3px rgba(51,51,51,0.08)",
    "0 14px 7px -7px rgba(51,51,51,0.02)",
    "0 18px 9px -9px rgba(51,51,51,0.01)",
  ].join(", "),

  md: [
    "0 0 0 1px rgba(51,51,51,0.04)",
    "0 1px 1px 1px rgba(51,51,51,0.04)",
    "0 3px 3px -2px rgba(51,51,51,0.02)",
    "0 7px 7px -3px rgba(51,51,51,0.04)",
    "0 14px 14px -7px rgba(51,51,51,0.04)",
    "0 27px 27px -14px rgba(51,51,51,0.04)",
    "0 54px 54px -27px rgba(51,51,51,0.04)",
  ].join(", "),

  lg: [
    "0 0 0 1px rgba(51,51,51,0.04)",
    "0 1px 1px 1px rgba(51,51,51,0.04)",
    "0 3px 3px -2px rgba(51,51,51,0.02)",
    "0 7px 7px -3px rgba(51,51,51,0.04)",
    "0 14px 14px -7px rgba(51,51,51,0.04)",
    "0 27px 27px -14px rgba(51,51,51,0.04)",
    "0 54px 54px -27px rgba(51,51,51,0.04)",
    "0 109px 109px -36px rgba(51,51,51,0.06)",
  ].join(", "),
} as const;
