export type ThemeKey = "midnight" | "white" | "titanium" | "electric" | "desert" | "emerald";

export interface Theme {
  key: ThemeKey;
  name: string;
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
    background: "#050f0b",
    surface: "#0a1c14",
    text: "#ccf2e3",
    subtext: "rgba(204,242,227,0.45)",
    accent: "#10b981",
    border: "rgba(16,185,129,0.15)",
    buttonBg: "rgba(16,185,129,0.07)",
    preview: "linear-gradient(135deg,#050f0b 0%,#0a2018 100%)",
  },
};

export const THEME_LIST = Object.values(THEMES);

export function getTheme(key?: string): Theme {
  return THEMES[(key as ThemeKey) ?? "midnight"] ?? THEMES.midnight;
}
