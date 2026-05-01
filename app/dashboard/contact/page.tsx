"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { motion } from "framer-motion";
import { Save } from "lucide-react";
import BlockedBanner from "@/components/ui/BlockedBanner";

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1.5">
        <label className="text-[11px] text-white/40 font-medium uppercase tracking-widest">{label}</label>
        {hint && <span className="text-[10px] text-white/20">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

const cls = "w-full px-4 py-3 rounded-xl text-white text-sm placeholder:text-white/20 focus:outline-none transition-colors";
const st = { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" };

export default function ContactPage() {
  const { user } = useAuth();
  const { profile, loading, error, retry, update } = useProfile(user?.uid);
  const [form, setForm] = useState({ phone: "", whatsapp: "", website: "" });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (profile) setForm({
      phone: profile.phone || "",
      whatsapp: profile.whatsapp || "",
      website: profile.website || "",
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
      {error && <BlockedBanner errorType={error} onRetry={retry} />}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <h1 className="text-2xl font-semibold text-white mb-1">Contact Details</h1>
        <p className="text-white/35 text-sm">How people can reach you directly from your profile.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.08 }} className="mt-8 space-y-5">
        <Field label="Phone" hint="Shown as Call button">
          <input value={form.phone} onChange={set("phone")} className={cls} style={st} placeholder="+1 234 567 8900" />
        </Field>

        <Field label="WhatsApp" hint="Opens WhatsApp chat">
          <input value={form.whatsapp} onChange={set("whatsapp")} className={cls} style={st} placeholder="+1 234 567 8900" />
        </Field>

        <Field label="Website" hint="Shown as Website button">
          <input value={form.website} onChange={set("website")} className={cls} style={st} placeholder="https://yourwebsite.com" />
        </Field>

        <div
          className="p-4 rounded-xl"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p className="text-white/40 text-xs mb-1">Email</p>
          <p className="text-white/70 text-sm">{user?.email}</p>
          <p className="text-white/20 text-[11px] mt-1">Your account email is shown as the Email button on your profile.</p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-medium transition-all disabled:opacity-50"
          style={{ background: saved ? "#10b981" : "#6366f1" }}
        >
          <Save className="w-4 h-4" />
          {saved ? "Saved!" : saving ? "Saving…" : "Save Changes"}
        </button>
      </motion.div>
    </div>
  );
}
