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
  const pillBg = isLight
    ? `linear-gradient(135deg, ${theme.accent}22, ${theme.accent}14)`
    : `linear-gradient(135deg, ${theme.accent}32, ${theme.accent}1c)`;
  const activeColor = theme.accent;
  const inactiveColor = isLight ? "rgba(0,0,0,0.32)" : "rgba(255,255,255,0.30)";

  return (
    <div
      className="sticky top-0 z-40 px-4 py-3"
      style={{
        background: isLight ? `${theme.background}c8` : `${theme.background}b5`,
        backdropFilter: "blur(48px)",
        WebkitBackdropFilter: "blur(48px)",
        borderBottom: `1px solid ${theme.accent}12`,
      }}
    >
      <div
        className="flex gap-0.5 p-1 rounded-[20px] overflow-x-auto"
        style={{
          background: isLight
            ? "linear-gradient(135deg, rgba(0,0,0,0.06), rgba(0,0,0,0.03))"
            : "linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.025))",
          border: `1px solid ${theme.accent}22`,
          boxShadow: [
            "inset 0 1px 0 rgba(255,255,255,0.07)",
            "inset 0 -1px 0 rgba(0,0,0,0.18)",
            "0 4px 24px rgba(0,0,0,0.22)",
          ].join(", "),
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
                    border: `1px solid ${theme.accent}45`,
                    boxShadow: [
                      `0 2px 28px ${theme.accent}38`,
                      "0 1px 0 rgba(255,255,255,0.16) inset",
                      "0 -1px 0 rgba(0,0,0,0.15) inset",
                    ].join(", "),
                  }}
                  transition={{ type: "spring", stiffness: 440, damping: 34 }}
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
