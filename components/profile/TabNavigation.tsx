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
  const pillBg = isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.11)";
  const activeColor = theme.text;
  const inactiveColor = isLight ? "rgba(0,0,0,0.38)" : "rgba(255,255,255,0.38)";
  const barBg = isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.04)";
  const barBorder = isLight ? "rgba(0,0,0,0.07)" : "rgba(255,255,255,0.07)";

  return (
    <div
      className="sticky top-0 z-40 px-4 py-2"
      style={{
        background: `${theme.background}e6`,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: `1px solid ${barBorder}`,
      }}
    >
      <div
        className="flex gap-0.5 p-1 rounded-[16px] overflow-x-auto"
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
              className="relative flex-1 min-w-0 px-3 py-1.5 rounded-xl text-[12.5px] font-semibold transition-colors shrink-0 whitespace-nowrap"
              style={{ color: active ? activeColor : inactiveColor }}
            >
              {active && (
                <motion.div
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-xl"
                  style={{ background: pillBg }}
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
