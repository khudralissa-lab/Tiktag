"use client";

import { useState, useEffect } from "react";
import { useProfile } from "@/hooks/useProfile";
import { auth } from "@/lib/firebase";
import { motion } from "framer-motion";
import { Save, CheckCircle2, Palette } from "lucide-react";
import BlockedBanner from "@/components/ui/BlockedBanner";
import PageSkeleton from "@/components/ui/PageSkeleton";
import { THEME_LIST, getTheme } from "@/lib/themes";

const spr = { type: "spring" as const, stiffness: 260, damping: 22 };
type Filter = "all" | "dark" | "light";

export default function ThemePage() {
  const user = auth.currentUser;
  const { profile, loading, error, retry, update } = useProfile(user?.uid);
  const [selected, setSelected] = useState("midnight");
  const [filter, setFilter] = useState<Filter>("all");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (profile) setSelected(profile.theme || "midnight");
  }, [profile]);

  const handleSave = async () => {
    setSaving(true);
    await update({ theme: selected, updatedAt: Date.now() });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  if (loading) return <PageSkeleton rows={4} />;

  const currentTheme = getTheme(selected);
  const filteredThemes = THEME_LIST.filter((t) =>
    filter === "all" ? true : t.category === filter
  );

  return (
    <div className="p-5 md:p-8 max-w-5xl">
      {error && <BlockedBanner errorType={error} onRetry={retry} />}

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={spr} className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div
            className="w-8 h-8 rounded-[10px] flex items-center justify-center"
            style={{ background: "rgba(99,102,241,0.18)", border: "1px solid rgba(99,102,241,0.25)" }}
          >
            <Palette className="w-4 h-4 text-indigo-400" />
          </div>
          <h1 className="text-[22px] font-bold text-white tracking-[-0.025em]">Theme Engine</h1>
        </div>
        <p className="text-white/35 text-sm">Choose the visual identity for your public profile.</p>
      </motion.div>

      {/* Filter tabs */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...spr, delay: 0.06 }}
        className="mb-6"
      >
        <div
          className="inline-flex gap-1 p-1 rounded-xl"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          {(["all", "dark", "light"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-4 py-1.5 rounded-lg text-[12.5px] font-medium transition-all capitalize"
              style={
                filter === f
                  ? { background: "#6366f1", color: "#fff" }
                  : { color: "rgba(255,255,255,0.38)" }
              }
            >
              {f === "all" ? "All Themes" : f === "dark" ? "Dark" : "Light"}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Theme grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {filteredThemes.map((theme, i) => {
          const active = selected === theme.key;
          return (
            <motion.button
              key={theme.key}
              onClick={() => setSelected(theme.key)}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spr, delay: 0.08 + i * 0.04 }}
              whileHover={{ y: -3, scale: 1.005 }}
              whileTap={{ scale: 0.98 }}
              className="relative text-left rounded-[20px] overflow-hidden transition-shadow"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: `1px solid ${active ? theme.accent : "rgba(255,255,255,0.06)"}`,
                boxShadow: active
                  ? `0 0 0 1px ${theme.accent}40, 0 8px 32px ${theme.accent}18`
                  : "none",
              }}
            >
              {/* Gradient preview swatch */}
              <div className="w-full h-[88px] relative overflow-hidden" style={{ background: theme.preview }}>
                <div className="absolute inset-0 flex items-end p-3.5 gap-2">
                  <div
                    className="w-7 h-7 rounded-full shrink-0"
                    style={{
                      background: theme.accent,
                      boxShadow: `0 4px 18px ${theme.accent}70`,
                    }}
                  />
                  <div className="flex flex-col gap-1 flex-1">
                    <div className="h-1.5 rounded-full w-3/4" style={{ background: theme.text, opacity: 0.35 }} />
                    <div className="h-1.5 rounded-full w-1/2" style={{ background: theme.text, opacity: 0.18 }} />
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-0.5">
                  <p className="text-white/88 text-[13.5px] font-semibold leading-tight">{theme.name}</p>
                  {active && (
                    <CheckCircle2 className="w-[15px] h-[15px] shrink-0 ml-1" style={{ color: theme.accent }} />
                  )}
                </div>
                <p className="text-white/30 text-[11.5px] leading-snug mt-0.5">{theme.tagline}</p>
                <div className="flex items-center gap-1.5 mt-3">
                  <div
                    className="w-3.5 h-3.5 rounded-full"
                    style={{ background: theme.background, border: "1px solid rgba(255,255,255,0.10)" }}
                  />
                  <div className="w-3.5 h-3.5 rounded-full" style={{ background: theme.accent }} />
                  <div
                    className="w-3.5 h-3.5 rounded-full"
                    style={{ background: theme.surface, border: "1px solid rgba(255,255,255,0.08)" }}
                  />
                  <span
                    className="ml-1.5 text-[9.5px] font-bold uppercase tracking-[0.12em] px-1.5 py-0.5 rounded-[4px]"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      color: "rgba(255,255,255,0.22)",
                    }}
                  >
                    {theme.category}
                  </span>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Live preview — phone frame */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...spr, delay: 0.22 }}
        className="rounded-[20px] p-6 mb-6"
        style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        <p className="text-[11px] text-white/38 uppercase tracking-widest font-medium mb-6">Live Preview</p>
        <div className="flex items-center justify-center">
          {/* Phone shell */}
          <div
            className="relative rounded-[32px] overflow-hidden transition-all duration-700"
            style={{
              width: 220,
              background: currentTheme.background,
              border: `6px solid rgba(255,255,255,0.06)`,
              boxShadow: `0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.05)`,
            }}
          >
            {/* Cover */}
            <div className="relative h-[72px] overflow-hidden" style={{ background: currentTheme.surface }}>
              <div
                className="absolute inset-0 transition-all duration-700"
                style={{ background: `linear-gradient(180deg, ${currentTheme.accent}28 0%, ${currentTheme.surface} 70%)` }}
              />
              <motion.div
                className="absolute inset-0"
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ background: `radial-gradient(ellipse 90% 100% at 50% -10%, ${currentTheme.accent}40 0%, transparent 75%)` }}
              />
              <div className="absolute top-0 inset-x-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${currentTheme.accent}70 50%, transparent)` }} />
            </div>

            {/* Avatar */}
            <div className="flex flex-col items-center px-4 pb-4">
              <div className="relative flex items-center justify-center" style={{ marginTop: -22 }}>
                <motion.div
                  className="absolute rounded-full"
                  animate={{ opacity: [0.4, 0.9, 0.4], scale: [0.9, 1.3, 0.9] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  style={{ inset: -8, background: `radial-gradient(circle, ${currentTheme.accent}35 0%, transparent 70%)`, borderRadius: "50%" }}
                />
                <div
                  className="w-[44px] h-[44px] rounded-full transition-all duration-700 relative z-10"
                  style={{
                    background: `${currentTheme.accent}22`,
                    border: `2.5px solid ${currentTheme.background}`,
                    boxShadow: `0 0 0 1.5px ${currentTheme.accent}55, 0 8px 24px rgba(0,0,0,0.5)`,
                  }}
                />
              </div>

              {/* Name + title */}
              <div className="w-[68px] h-[8px] rounded mt-2.5 transition-all duration-700" style={{ background: currentTheme.text, opacity: 0.75 }} />
              <div className="w-[48px] h-[6px] rounded mt-1.5 transition-all duration-700" style={{ background: currentTheme.accent, opacity: 0.65 }} />

              {/* Tab bar pill */}
              <div
                className="w-full flex gap-0.5 p-0.5 rounded-[10px] mt-4 mb-3 transition-all duration-700"
                style={{ background: currentTheme.surface, border: `1px solid ${currentTheme.border}` }}
              >
                {["About", "Links", "Contact"].map((label, i) => (
                  <div
                    key={label}
                    className="flex-1 py-1 rounded-[8px] flex items-center justify-center transition-all duration-700"
                    style={{
                      background: i === 0 ? `${currentTheme.accent}28` : "transparent",
                      boxShadow: i === 0 ? `0 1px 8px ${currentTheme.accent}20` : "none",
                    }}
                  >
                    <span style={{ fontSize: 6, fontWeight: 600, color: i === 0 ? currentTheme.accent : `${currentTheme.subtext}55` }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA button */}
              <div
                className="w-full h-[28px] rounded-[8px] mb-2 transition-all duration-700"
                style={{ background: `linear-gradient(135deg, ${currentTheme.accent}, ${currentTheme.accent}cc)`, boxShadow: `0 4px 16px ${currentTheme.accent}35` }}
              />

              {/* Link rows */}
              {[0, 1].map((i) => (
                <div
                  key={i}
                  className="w-full h-[22px] rounded-[7px] mb-1.5 transition-all duration-700"
                  style={{ background: currentTheme.buttonBg, border: `1px solid ${currentTheme.border}`, opacity: 1 - i * 0.25 }}
                />
              ))}
            </div>

            {/* Watermark */}
            <div className="text-center pb-3" style={{ fontSize: 6, color: `${currentTheme.subtext}30` }}>
              TikTag
            </div>
          </div>
        </div>

        {/* Theme name + tagline */}
        <div className="text-center mt-5">
          <p className="text-white/75 text-[13.5px] font-semibold transition-all duration-500">{currentTheme.name}</p>
          <p className="text-white/30 text-[11px] mt-0.5 transition-all duration-500">{currentTheme.tagline}</p>
        </div>
      </motion.div>

      {/* Save */}
      <button
        onClick={handleSave}
        disabled={saving}
        className="flex items-center gap-2 px-6 py-3 rounded-[14px] text-white text-sm font-semibold transition-all duration-300 disabled:opacity-50"
        style={{ background: saved ? "#10b981" : "#6366f1" }}
      >
        <Save className="w-4 h-4" />
        {saved ? "Theme Applied!" : saving ? "Saving…" : "Apply Theme"}
      </button>
    </div>
  );
}
