"use client";

import { motion } from "framer-motion";
import type { Theme } from "@/lib/themes";

export interface Tab {
  id: string;
  label: string;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  theme: Theme;
}

export default function TabNavigation({ tabs, activeTab, onChange, theme }: TabNavigationProps) {
  const isLight = theme.category === "light";
  const pillBg = isLight ? `${theme.accent}16` : `${theme.accent}22`;
  const activeColor = theme.accent;
  const inactiveColor = isLight ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.32)";
  const barBg = isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.04)";
  const barBorder = isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)";

  return (
    <div
      className="sticky top-0 z-40 px-4 py-2.5"
      style={{
        background: `${theme.background}ee`,
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: `1px solid ${barBorder}`,
      }}
    >
      <div
        className="flex gap-0.5 p-1 rounded-[18px] overflow-x-auto"
        style={{
          background: barBg,
          border: `1px solid ${barBorder}`,
          scrollbarWidth: "none",
        }}
      >
        {tabs.map((tab) => {
          const active = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className="relative flex-1 min-w-0 px-3 py-2 rounded-[14px] text-[13px] font-semibold transition-colors shrink-0 whitespace-nowrap"
              style={{ color: active ? activeColor : inactiveColor }}
            >
              {active && (
                <motion.div
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-[14px]"
                  style={{
                    background: pillBg,
                    boxShadow: `0 2px 12px ${theme.accent}18`,
                  }}
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
