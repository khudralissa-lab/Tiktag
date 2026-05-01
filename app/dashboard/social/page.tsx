"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { motion } from "framer-motion";
import { Save } from "lucide-react";

const SOCIALS = [
  { key: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/in/username" },
  { key: "instagram", label: "Instagram", placeholder: "https://instagram.com/username" },
  { key: "facebook", label: "Facebook", placeholder: "https://facebook.com/username" },
  { key: "tiktok", label: "TikTok", placeholder: "https://tiktok.com/@username" },
  { key: "youtube", label: "YouTube", placeholder: "https://youtube.com/@channel" },
  { key: "xTwitter", label: "X / Twitter", placeholder: "https://x.com/username" },
];

const cls = "w-full px-4 py-3 rounded-xl text-white text-sm placeholder:text-white/20 focus:outline-none transition-colors";
const st = { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" };

export default function SocialPage() {
  const { user } = useAuth();
  const { profile, loading, update } = useProfile(user?.uid);
  const [form, setForm] = useState<Record<string, string>>({
    linkedin: "", instagram: "", facebook: "", tiktok: "", youtube: "", xTwitter: "",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (profile) setForm({
      linkedin: profile.linkedin || "",
      instagram: profile.instagram || "",
      facebook: profile.facebook || "",
      tiktok: profile.tiktok || "",
      youtube: profile.youtube || "",
      xTwitter: profile.xTwitter || "",
    });
  }, [profile]);

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSave = async () => {
    setSaving(true);
    await update({ ...form, updatedAt: Date.now() });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  if (loading) return <div className="p-8 text-white/30 text-sm">Loading…</div>;

  return (
    <div className="p-8 max-w-2xl">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <h1 className="text-2xl font-semibold text-white mb-1">Social Links</h1>
        <p className="text-white/35 text-sm">Social media profiles shown as icons on your public profile.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.08 }} className="mt-8 space-y-4">
        {SOCIALS.map(({ key, label, placeholder }) => (
          <div key={key}>
            <label className="block text-[11px] text-white/40 mb-1.5 font-medium uppercase tracking-widest">{label}</label>
            <input
              value={form[key]}
              onChange={set(key)}
              className={cls}
              style={{
                ...st,
                borderColor: form[key] ? "rgba(99,102,241,0.3)" : "rgba(255,255,255,0.08)",
              }}
              placeholder={placeholder}
            />
          </div>
        ))}

        <div className="pt-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-medium transition-all disabled:opacity-50"
            style={{ background: saved ? "#10b981" : "#6366f1" }}
          >
            <Save className="w-4 h-4" />
            {saved ? "Saved!" : saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
