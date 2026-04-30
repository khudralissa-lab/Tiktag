"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Link2, Phone, MessageCircle, Mail } from "lucide-react";
import type { CustomLink } from "@/types";

const TYPE_ICONS = {
  url: Link2,
  call: Phone,
  whatsapp: MessageCircle,
  email: Mail,
};

const TYPE_LABELS = { url: "URL", call: "Call", whatsapp: "WhatsApp", email: "Email" };

function newLink(): CustomLink {
  return { id: crypto.randomUUID(), label: "", url: "", type: "url" };
}

export default function LinksPage() {
  const { user } = useAuth();
  const { profile, loading, update } = useProfile(user?.uid);
  const [links, setLinks] = useState<CustomLink[]>([]);
  const [saving, setSaving] = useState(false);
  const [initialized, setInitialized] = useState(false);

  if (!initialized && profile) {
    setLinks(profile.links || []);
    setInitialized(true);
  }

  const addLink = () => setLinks((l) => [...l, newLink()]);

  const updateLink = (id: string, field: keyof CustomLink, value: string) =>
    setLinks((l) => l.map((lnk) => (lnk.id === id ? { ...lnk, [field]: value } : lnk)));

  const removeLink = (id: string) => setLinks((l) => l.filter((lnk) => lnk.id !== id));

  const handleSave = async () => {
    setSaving(true);
    await update({ links });
    setSaving(false);
  };

  if (loading) return <div className="p-8 text-white/30 text-sm">Loading…</div>;

  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-white">My Links</h1>
          <p className="text-white/40 text-sm mt-1">Add buttons to your public profile.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 rounded-xl text-white text-sm font-medium transition-colors"
        >
          {saving ? "Saving…" : "Save"}
        </button>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {links.map((link) => {
            const Icon = TYPE_ICONS[link.type];
            return (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="bg-white/3 border border-white/8 rounded-2xl p-4"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-2 flex-1">
                    <Icon className="w-4 h-4 text-white/30 shrink-0" />
                    <input
                      value={link.label}
                      onChange={(e) => updateLink(link.id, "label", e.target.value)}
                      placeholder="Button label"
                      className="flex-1 bg-transparent text-white text-sm focus:outline-none placeholder-white/20"
                    />
                  </div>
                  <select
                    value={link.type}
                    onChange={(e) => updateLink(link.id, "type", e.target.value)}
                    className="px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-white/60 text-xs focus:outline-none"
                  >
                    {Object.entries(TYPE_LABELS).map(([v, l]) => (
                      <option key={v} value={v}>{l}</option>
                    ))}
                  </select>
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
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white/60 text-xs focus:outline-none focus:border-indigo-500/40"
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <button
        onClick={addLink}
        className="mt-4 w-full py-3 border border-dashed border-white/15 rounded-2xl text-white/30 text-sm hover:border-white/30 hover:text-white/50 transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" /> Add Link
      </button>
    </div>
  );
}
