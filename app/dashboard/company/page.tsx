"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { motion } from "framer-motion";
import { Save } from "lucide-react";
import BlockedBanner from "@/components/ui/BlockedBanner";

const cls = "w-full px-4 py-3 rounded-xl text-white text-sm placeholder:text-white/20 focus:outline-none transition-colors";
const st = { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" };

export default function CompanyPage() {
  const { user } = useAuth();
  const { profile, loading, error, retry, update } = useProfile(user?.uid);
  const [form, setForm] = useState({ companyName: "", companyLogoUrl: "", companyWebsite: "" });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (profile) setForm({
      companyName: profile.companyName || "",
      companyLogoUrl: profile.companyLogoUrl || "",
      companyWebsite: profile.companyWebsite || "",
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
        <h1 className="text-2xl font-semibold text-white mb-1">Company Details</h1>
        <p className="text-white/35 text-sm">Your company information shown below your name on the profile.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.08 }} className="mt-8 space-y-5">
        <div>
          <label className="block text-[11px] text-white/40 mb-1.5 font-medium uppercase tracking-widest">Company Name</label>
          <input value={form.companyName} onChange={set("companyName")} className={cls} style={st} placeholder="Acme Inc." />
        </div>

        <div>
          <label className="block text-[11px] text-white/40 mb-1.5 font-medium uppercase tracking-widest">Company Logo URL</label>
          <input value={form.companyLogoUrl} onChange={set("companyLogoUrl")} className={cls} style={st} placeholder="https://example.com/logo.png" />
          {form.companyLogoUrl && (
            <div className="mt-2 flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={form.companyLogoUrl} alt="Logo preview" className="w-10 h-10 rounded-lg object-contain" style={{ background: "rgba(255,255,255,0.08)" }} />
              <p className="text-white/30 text-xs">Logo preview</p>
            </div>
          )}
        </div>

        <div>
          <label className="block text-[11px] text-white/40 mb-1.5 font-medium uppercase tracking-widest">Company Website</label>
          <input value={form.companyWebsite} onChange={set("companyWebsite")} className={cls} style={st} placeholder="https://acmeinc.com" />
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
