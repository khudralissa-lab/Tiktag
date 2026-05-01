"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { motion } from "framer-motion";
import { Save, CheckCircle2 } from "lucide-react";
import { THEME_LIST, getTheme } from "@/lib/themes";

export default function ThemePage() {
  const { user } = useAuth();
  const { profile, loading, update } = useProfile(user?.uid);
  const [selected, setSelected] = useState("midnight");
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

  if (loading) return <div className="p-8 text-white/30 text-sm">Loading…</div>;

  const currentTheme = getTheme(selected);

  return (
    <div className="p-8 max-w-2xl">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <h1 className="text-2xl font-semibold text-white mb-1">Theme</h1>
        <p className="text-white/35 text-sm">Choose the look of your public profile.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.08 }}
        className="mt-8"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {THEME_LIST.map((theme) => {
            const active = selected === theme.key;
            return (
              <button
                key={theme.key}
                onClick={() => setSelected(theme.key)}
                className="relative p-4 rounded-2xl text-left transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: `1px solid ${active ? theme.accent : "rgba(255,255,255,0.06)"}`,
                  boxShadow: active ? `0 0 0 1px ${theme.accent}40` : "none",
                }}
              >
                <div
                  className="w-full h-14 rounded-xl mb-3"
                  style={{ background: theme.preview }}
                />
                <p className="text-white text-xs font-medium">{theme.name}</p>
                <div className="flex items-center gap-1 mt-1.5">
                  <div className="w-3 h-3 rounded-full border border-white/10" style={{ background: theme.background }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: theme.accent }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: theme.surface }} />
                </div>
                {active && (
                  <CheckCircle2
                    className="absolute top-3 right-3 w-4 h-4"
                    style={{ color: theme.accent }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Live preview */}
        <div
          className="mt-6 p-5 rounded-2xl"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p className="text-[11px] text-white/38 uppercase tracking-widest font-medium mb-4">Preview</p>
          <div
            className="rounded-2xl p-5 max-w-[200px] mx-auto transition-all duration-500"
            style={{ background: currentTheme.background, border: `1px solid ${currentTheme.border}` }}
          >
            <div className="flex flex-col items-center gap-2 mb-4">
              <div
                className="w-12 h-12 rounded-full"
                style={{ background: `${currentTheme.accent}22`, border: `2px solid ${currentTheme.accent}` }}
              />
              <div className="text-center">
                <div className="w-20 h-2.5 rounded mx-auto" style={{ background: currentTheme.text, opacity: 0.8 }} />
                <div className="w-14 h-1.5 rounded mt-1.5 mx-auto" style={{ background: currentTheme.subtext, opacity: 0.6 }} />
              </div>
            </div>
            <div className="space-y-1.5">
              {[0, 1].map((i) => (
                <div
                  key={i}
                  className="w-full h-8 rounded-lg"
                  style={{ background: currentTheme.buttonBg, border: `1px solid ${currentTheme.border}` }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-medium transition-all disabled:opacity-50"
            style={{ background: saved ? "#10b981" : "#6366f1" }}
          >
            <Save className="w-4 h-4" />
            {saved ? "Saved!" : saving ? "Saving…" : "Save Theme"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
