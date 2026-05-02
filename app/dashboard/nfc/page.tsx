"use client";

import { useState } from "react";
import { useProfile } from "@/hooks/useProfile";
import { auth } from "@/lib/firebase";
import { motion } from "framer-motion";
import { Copy, CheckCircle2, ExternalLink, Package, CreditCard, Zap } from "lucide-react";
import BlockedBanner from "@/components/ui/BlockedBanner";
import Link from "next/link";

const STATUS_STEPS = [
  { key: "not_ordered", icon: Package, label: "Order Card", desc: "Get your TikTag NFC card" },
  { key: "ordered", icon: CreditCard, label: "Card Shipped", desc: "Your card is on the way" },
  { key: "activated", icon: Zap, label: "Activated", desc: "Card is live and working" },
];

export default function NFCPage() {
  const user = auth.currentUser;
  const { profile, loading, error, retry, update } = useProfile(user?.uid);
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);

  if (loading) return <div className="p-8 text-white/30 text-sm">Loading…</div>;

  const profileUrl = profile?.username ? `https://tiktag.io/u/${profile.username}` : null;
  const status = profile?.nfcStatus || "not_ordered";
  const stepIndex = STATUS_STEPS.findIndex((s) => s.key === status);

  const copyLink = () => {
    if (!profileUrl) return;
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const setStatus = async (s: "not_ordered" | "ordered" | "activated") => {
    setSaving(true);
    await update({ nfcStatus: s, updatedAt: Date.now() });
    setSaving(false);
  };

  return (
    <div className="p-8 max-w-2xl">
      {error && <BlockedBanner errorType={error} onRetry={retry} />}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <h1 className="text-2xl font-semibold text-white mb-1">NFC Setup</h1>
        <p className="text-white/35 text-sm">Program your TikTag card to tap-to-share your profile.</p>
      </motion.div>

      {/* Status tracker */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.08 }}
        className="mt-8 px-4"
      >
        <div className="flex items-start">
          {STATUS_STEPS.map((step, i) => {
            const active = i <= stepIndex;
            const Icon = step.icon;
            return (
              <div key={step.key} className="flex-1 flex flex-col items-center">
                <div className="flex items-center w-full">
                  {i > 0 && (
                    <div
                      className="flex-1 h-px"
                      style={{ background: i <= stepIndex ? "#6366f1" : "rgba(255,255,255,0.08)" }}
                    />
                  )}
                  <button
                    onClick={() => setStatus(step.key as "not_ordered" | "ordered" | "activated")}
                    disabled={saving}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                    style={{
                      background: active ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${active ? "#6366f1" : "rgba(255,255,255,0.08)"}`,
                    }}
                  >
                    <Icon
                      className="w-4 h-4"
                      style={{ color: active ? "#818cf8" : "rgba(255,255,255,0.2)" }}
                    />
                  </button>
                  {i < STATUS_STEPS.length - 1 && (
                    <div
                      className="flex-1 h-px"
                      style={{ background: i < stepIndex ? "#6366f1" : "rgba(255,255,255,0.08)" }}
                    />
                  )}
                </div>
                <p
                  className="text-xs mt-2 font-medium"
                  style={{ color: active ? "#a5b4fc" : "rgba(255,255,255,0.2)" }}
                >
                  {step.label}
                </p>
                <p className="text-[10px] mt-0.5 text-center" style={{ color: "rgba(255,255,255,0.15)" }}>
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* URL to program */}
      {profileUrl && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.16 }}
          className="mt-8"
        >
          <label className="block text-[11px] text-white/38 mb-2 uppercase tracking-widest font-medium">
            URL to Program on Card
          </label>
          <div
            className="flex items-center gap-2 px-4 py-3 rounded-xl"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <p className="flex-1 text-indigo-300 text-sm truncate">{profileUrl}</p>
            <button onClick={copyLink} className="shrink-0 text-white/40 hover:text-white transition-colors">
              {copied ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            </button>
            <Link
              href={`/u/${profile?.username}`}
              target="_blank"
              className="shrink-0 text-white/40 hover:text-white transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      )}

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.22 }}
        className="mt-8 space-y-3"
      >
        <label className="block text-[11px] text-white/38 uppercase tracking-widest font-medium">
          How to Program Your Card
        </label>
        {[
          "Download an NFC writing app (e.g. NFC Tools on iOS/Android)",
          "Open the app and select 'Write' then 'Add a Record'",
          "Choose 'URL/URI' and paste your profile URL above",
          "Hold your phone near the NFC card to write",
          "Test by tapping another phone to the card — it should open your profile",
        ].map((step, i) => (
          <div key={i} className="flex items-start gap-3">
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
              style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.25)" }}
            >
              <span className="text-[10px] text-indigo-400 font-semibold">{i + 1}</span>
            </div>
            <p className="text-white/45 text-sm">{step}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
