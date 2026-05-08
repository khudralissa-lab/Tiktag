export type ThemeKey =
  | "midnight" | "white" | "titanium" | "electric" | "desert" | "emerald"
  | "founder" | "luxuryBlack" | "creative" | "neon" | "estate" | "tech";

export interface Theme {
  key: ThemeKey;
  name: string;
  tagline: string;
  category: "dark" | "light";
  background: string;
  surface: string;
  text: string;
  subtext: string;
  accent: string;
  border: string;
  buttonBg: string;
  preview: string;
}

export const THEMES: Record<ThemeKey, Theme> = {
  midnight: {
    key: "midnight",
    name: "Midnight Black",
    tagline: "Classic and refined.",
    category: "dark",
    background: "#000000",
    surface: "#0d0d0d",
    text: "#ffffff",
    subtext: "rgba(255,255,255,0.45)",
    accent: "#6366f1",
    border: "rgba(255,255,255,0.07)",
    buttonBg: "rgba(255,255,255,0.05)",
    preview: "linear-gradient(135deg,#000 0%,#1a1a2e 100%)",
  },
  white: {
    key: "white",
    name: "Pure White",
    tagline: "Clean and minimal.",
    category: "light",
    background: "#f7f7f7",
    surface: "#ffffff",
    text: "#0a0a0a",
    subtext: "rgba(0,0,0,0.45)",
    accent: "#6366f1",
    border: "rgba(0,0,0,0.07)",
    buttonBg: "rgba(0,0,0,0.04)",
    preview: "linear-gradient(135deg,#fff 0%,#f0f0ff 100%)",
  },
  titanium: {
    key: "titanium",
    name: "Titanium Gray",
    tagline: "Industrial precision.",
    category: "dark",
    background: "#111111",
    surface: "#1c1c1c",
    text: "#e8e8e8",
    subtext: "rgba(232,232,232,0.45)",
    accent: "#a3a3a3",
    border: "rgba(255,255,255,0.06)",
    buttonBg: "rgba(255,255,255,0.04)",
    preview: "linear-gradient(135deg,#111 0%,#2a2a2a 100%)",
  },
  electric: {
    key: "electric",
    name: "Electric Blue",
    tagline: "Tech-forward energy.",
    category: "dark",
    background: "#040e24",
    surface: "#0a1837",
    text: "#ddeeff",
    subtext: "rgba(221,238,255,0.45)",
    accent: "#3b82f6",
    border: "rgba(59,130,246,0.15)",
    buttonBg: "rgba(59,130,246,0.07)",
    preview: "linear-gradient(135deg,#040e24 0%,#0a2050 100%)",
  },
  desert: {
    key: "desert",
    name: "Desert Gold",
    tagline: "Warmth and ambition.",
    category: "dark",
    background: "#110e06",
    surface: "#1c1810",
    text: "#f5e6c0",
    subtext: "rgba(245,230,192,0.45)",
    accent: "#d97706",
    border: "rgba(217,119,6,0.18)",
    buttonBg: "rgba(217,119,6,0.07)",
    preview: "linear-gradient(135deg,#110e06 0%,#2a1e08 100%)",
  },
  emerald: {
    key: "emerald",
    name: "Emerald Tech",
    tagline: "Growth and momentum.",
    category: "dark",
    background: "#050f0b",
    surface: "#0a1c14",
    text: "#ccf2e3",
    subtext: "rgba(204,242,227,0.45)",
    accent: "#10b981",
    border: "rgba(16,185,129,0.15)",
    buttonBg: "rgba(16,185,129,0.07)",
    preview: "linear-gradient(135deg,#050f0b 0%,#0a2018 100%)",
  },
  founder: {
    key: "founder",
    name: "Founder",
    tagline: "Built for visionaries.",
    category: "dark",
    background: "#08091a",
    surface: "#0e1029",
    text: "#f0ecff",
    subtext: "rgba(240,236,255,0.45)",
    accent: "#c8a56a",
    border: "rgba(200,165,106,0.16)",
    buttonBg: "rgba(200,165,106,0.07)",
    preview: "linear-gradient(135deg,#08091a 0%,#1a1440 100%)",
  },
  luxuryBlack: {
    key: "luxuryBlack",
    name: "Luxury Black",
    tagline: "Zero compromise.",
    category: "dark",
    background: "#000000",
    surface: "#0a0a0a",
    text: "#f8f8f8",
    subtext: "rgba(248,248,248,0.40)",
    accent: "#d4d4d4",
    border: "rgba(255,255,255,0.08)",
    buttonBg: "rgba(255,255,255,0.04)",
    preview: "linear-gradient(135deg,#000 0%,#1c1c1c 100%)",
  },
  creative: {
    key: "creative",
    name: "Creative Director",
    tagline: "Art direction meets identity.",
    category: "dark",
    background: "#0d0618",
    surface: "#150a28",
    text: "#f5f0ff",
    subtext: "rgba(245,240,255,0.42)",
    accent: "#d946ef",
    border: "rgba(217,70,239,0.18)",
    buttonBg: "rgba(217,70,239,0.07)",
    preview: "linear-gradient(135deg,#0d0618 0%,#2d1060 100%)",
  },
  neon: {
    key: "neon",
    name: "Neon Subtle",
    tagline: "Future-forward without the noise.",
    category: "dark",
    background: "#0a0c0f",
    surface: "#111418",
    text: "#e8f4f8",
    subtext: "rgba(232,244,248,0.42)",
    accent: "#00d9f5",
    border: "rgba(0,217,245,0.14)",
    buttonBg: "rgba(0,217,245,0.06)",
    preview: "linear-gradient(135deg,#0a0c0f 0%,#00192a 100%)",
  },
  estate: {
    key: "estate",
    name: "Real Estate Elite",
    tagline: "Premium properties. Premium presence.",
    category: "light",
    background: "#f4f2ee",
    surface: "#ffffff",
    text: "#1a1a1a",
    subtext: "rgba(26,26,26,0.48)",
    accent: "#2d5a2d",
    border: "rgba(45,90,45,0.12)",
    buttonBg: "rgba(45,90,45,0.05)",
    preview: "linear-gradient(135deg,#f4f2ee 0%,#e8efe8 100%)",
  },
  tech: {
    key: "tech",
    name: "Tech Minimal",
    tagline: "Clean. Fast. Trusted.",
    category: "light",
    background: "#f8fafc",
    surface: "#ffffff",
    text: "#0f172a",
    subtext: "rgba(15,23,42,0.48)",
    accent: "#2563eb",
    border: "rgba(37,99,235,0.12)",
    buttonBg: "rgba(37,99,235,0.05)",
    preview: "linear-gradient(135deg,#f8fafc 0%,#e8f0fe 100%)",
  },
};

export const THEME_LIST = Object.values(THEMES);

export function getTheme(key?: string): Theme {
  return THEMES[(key as ThemeKey) ?? "midnight"] ?? THEMES.midnight;
}
