"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Link2, Phone, MessageCircle, Mail, Save, GripVertical } from "lucide-react";
import BlockedBanner from "@/components/ui/BlockedBanner";
import type { CustomLink } from "@/types";

const TYPE_ICONS = { url: Link2, call: Phone, whatsapp: MessageCircle, email: Mail };
const TYPE_LABELS = { url: "URL", call: "Call", whatsapp: "WhatsApp", email: "Email" };

function newLink(): CustomLink {
  return { id: crypto.randomUUID(), label: "", url: "", type: "url", enabled: true };
}

export default function LinksPage() {
  const { user } = useAuth();
  const { profile, loading, error, retry, update } = useProfile(user?.uid);
  const [links, setLinks] = useState<CustomLink[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    if (profile) setLinks(profile.links || []);
  }, [profile]);

  const addLink = () => setLinks((l) => [...l, newLink()]);

  const updateLink = (id: string, field: keyof CustomLink, value: string | boolean) =>
    setLinks((l) => l.map((lnk) => (lnk.id === id ? { ...lnk, [field]: value } : lnk)));

  const removeLink = (id: string) => setLinks((l) => l.filter((lnk) => lnk.id !== id));

  const handleSave = async () => {
    setSaving(true);
    await update({ links, updatedAt: Date.now() });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  if (loading) return <div className="p-8 text-white/30 text-sm">Loading…</div>;

  return (
    <div className="p-8 max-w-2xl">
      {error && <BlockedBanner errorType={error} onRetry={retry} />}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <div className="flex items-start justify-between mb-1">
          <h1 className="text-2xl font-semibold text-white">Custom Links</h1>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-medium transition-all disabled:opacity-50 mt-1"
            style={{ background: saved ? "#10b981" : "#6366f1" }}
          >
            <Save className="w-4 h-4" />
            {saved ? "Saved!" : saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
        <p className="text-white/35 text-sm">Add buttons to your public profile.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.08 }} className="mt-8">
        <div className="space-y-3">
          <AnimatePresence>
            {links.map((link) => {
              const Icon = TYPE_ICONS[link.type];
              const enabled = link.enabled !== false;
              return (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl p-4 transition-opacity"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: `1px solid ${enabled ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)"}`,
                    opacity: enabled ? 1 : 0.5,
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <GripVertical className="w-4 h-4 text-white/15 shrink-0 cursor-grab" />
                    <Icon className="w-4 h-4 text-white/30 shrink-0" />
                    <input
                      value={link.label}
                      onChange={(e) => updateLink(link.id, "label", e.target.value)}
                      placeholder="Button label"
                      className="flex-1 bg-transparent text-white text-sm focus:outline-none placeholder:text-white/20"
                    />
                    <select
                      value={link.type}
                      onChange={(e) => updateLink(link.id, "type", e.target.value)}
                      className="px-2 py-1 rounded-lg text-white/60 text-xs focus:outline-none"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}
                    >
                      {Object.entries(TYPE_LABELS).map(([v, l]) => (
                        <option key={v} value={v}>{l}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => updateLink(link.id, "enabled", !enabled)}
                      title={enabled ? "Disable" : "Enable"}
                      className="relative rounded-full shrink-0 transition-colors"
                      style={{
                        width: "2rem", height: "1.125rem",
                        background: enabled ? "rgba(99,102,241,0.7)" : "rgba(255,255,255,0.10)",
                      }}
                    >
                      <div
                        className="absolute top-0.5 w-3.5 h-3.5 rounded-full bg-white transition-all duration-200"
                        style={{ left: enabled ? "calc(100% - 0.875rem - 0.125rem)" : "0.125rem" }}
                      />
                    </button>
                    <button onClick={() => removeLink(link.id)} className="text-white/20 hover:text-red-400 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <input
                    value={link.url}
                    onChange={(e) => updateLink(link.id, "url", e.target.value)}
                    placeholder={
                      link.type === "call" ? "+1234567890"
                      : link.type === "whatsapp" ? "+1234567890"
                      : link.type === "email" ? "you@example.com"
                      : "https://example.com"
                    }
                    className="w-full px-3 py-2 rounded-lg text-white/60 text-xs focus:outline-none"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <button
          onClick={addLink}
          className="mt-4 w-full py-3 rounded-2xl text-white/30 text-sm hover:text-white/50 transition-colors flex items-center justify-center gap-2"
          style={{ border: "1px dashed rgba(255,255,255,0.12)" }}
        >
          <Plus className="w-4 h-4" /> Add Link
        </button>
      </motion.div>
    </div>
  );
}
