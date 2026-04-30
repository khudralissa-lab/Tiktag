"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { motion } from "framer-motion";
import { Save, Sparkles } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();
  const { profile, loading, update } = useProfile(user?.uid);
  const [form, setForm] = useState({ displayName: "", title: "", bio: "", phone: "", whatsapp: "", accentColor: "#6366f1" });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiJob, setAiJob] = useState("");
  const [aiStyle, setAiStyle] = useState("professional");

  useEffect(() => {
    if (profile) setForm({
      displayName: profile.displayName || "",
      title: profile.title || "",
      bio: profile.bio || "",
      phone: profile.phone || "",
      whatsapp: profile.whatsapp || "",
      accentColor: profile.accentColor || "#6366f1",
    });
  }, [profile]);

  const handleSave = async () => {
    setSaving(true);
    await update(form);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleGenerateBio = async () => {
    if (!aiJob) return;
    setAiLoading(true);
    try {
      const res = await fetch("/api/ai/bio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ job: aiJob, style: aiStyle }),
      });
      const { bio } = await res.json();
      setForm((f) => ({ ...f, bio }));
    } catch {
      // silent fail
    } finally {
      setAiLoading(false);
    }
  };

  if (loading) return <div className="p-8 text-white/30 text-sm">Loading…</div>;

  return (
    <div className="p-8 max-w-2xl">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-semibold text-white">My Profile</h1>
        <p className="text-white/40 text-sm mt-1">Edit your public profile information.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mt-8 space-y-5"
      >
        <div>
          <label className="block text-xs text-white/40 mb-1.5">Full Name</label>
          <input
            value={form.displayName}
            onChange={(e) => setForm((f) => ({ ...f, displayName: e.target.value }))}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500/60 transition-colors"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-xs text-white/40 mb-1.5">Title / Role</label>
          <input
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500/60 transition-colors"
            placeholder="Product Designer at Acme"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs text-white/40">Bio</label>
            <span className="text-xs text-indigo-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> AI Generator
            </span>
          </div>
          <textarea
            value={form.bio}
            onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
            rows={4}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500/60 transition-colors resize-none"
            placeholder="Tell the world what you do…"
          />
          <div className="mt-2 flex gap-2">
            <input
              value={aiJob}
              onChange={(e) => setAiJob(e.target.value)}
              placeholder="Your job title"
              className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-xs focus:outline-none focus:border-indigo-500/60"
            />
            <select
              value={aiStyle}
              onChange={(e) => setAiStyle(e.target.value)}
              className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-xs focus:outline-none"
            >
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
              <option value="creative">Creative</option>
            </select>
            <button
              onClick={handleGenerateBio}
              disabled={aiLoading || !aiJob}
              className="px-3 py-2 bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/30 rounded-lg text-indigo-300 text-xs disabled:opacity-40 transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              {aiLoading ? "…" : "Generate"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-white/40 mb-1.5">Phone</label>
            <input
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500/60 transition-colors"
              placeholder="+1 234 567 8900"
            />
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5">WhatsApp</label>
            <input
              value={form.whatsapp}
              onChange={(e) => setForm((f) => ({ ...f, whatsapp: e.target.value }))}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500/60 transition-colors"
              placeholder="+1 234 567 8900"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-white/40 mb-1.5">Accent Color</label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={form.accentColor}
              onChange={(e) => setForm((f) => ({ ...f, accentColor: e.target.value }))}
              className="w-10 h-10 rounded-lg border border-white/10 bg-transparent cursor-pointer"
            />
            <span className="text-white/40 text-xs">{form.accentColor}</span>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-3 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 rounded-xl text-white text-sm font-medium transition-colors"
        >
          <Save className="w-4 h-4" />
          {saved ? "Saved!" : saving ? "Saving…" : "Save Changes"}
        </button>
      </motion.div>
    </div>
  );
}
