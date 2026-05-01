"use client";

import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAnalyticsEvents } from "@/lib/firestore";
import { profileCompletion } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  ArrowRight, Eye, MousePointer, QrCode, User,
  Link2, Nfc, Copy, ExternalLink, CheckCircle2, Palette,
} from "lucide-react";
import BlockedBanner from "@/components/ui/BlockedBanner";
import type { AnalyticsEvent } from "@/types";

export default function DashboardPage() {
  const { user } = useAuth();
  const { profile, loading, error, retry } = useProfile(user?.uid);
  const [stats, setStats] = useState({ views: 0, clicks: 0, qr: 0 });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!user) return;
    getAnalyticsEvents(user.uid, 30).then((events: AnalyticsEvent[]) => {
      const views = events.filter((e) => e.type === "view").length;
      const clicks = events.filter((e) => e.type === "click").length;
      const qr = events.filter((e) => e.source === "qr").length;
      setStats({ views, clicks, qr });
    });
  }, [user]);

  if (loading) return <div className="p-8 text-white/30 text-sm">Loading…</div>;
  if (error) return <BlockedBanner onRetry={retry} />;

  const firstName = profile?.displayName?.split(" ")[0] || "there";
  const completion = profile ? profileCompletion(profile) : 0;
  const profileUrl = profile?.username ? `/u/${profile.username}` : null;

  const copyLink = () => {
    if (!profileUrl) return;
    navigator.clipboard.writeText(`${window.location.origin}${profileUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-8 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <h1 className="text-2xl font-semibold text-white">Hey, {firstName} 👋</h1>
        <p className="text-white/35 text-sm mt-1">Here&apos;s your Tiktag overview.</p>
      </motion.div>

      {profileUrl && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.07 }}
          className="mt-5 p-4 rounded-2xl flex items-center justify-between gap-4"
          style={{ background: "rgba(99,102,241,0.07)", border: "1px solid rgba(99,102,241,0.18)" }}
        >
          <div>
            <p className="text-white/38 text-[11px] mb-0.5">Your public profile</p>
            <p className="text-indigo-300 text-sm font-medium">tiktag.io{profileUrl}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={copyLink}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/45 hover:text-white transition-colors"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
            <Link
              href={profileUrl}
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
              style={{ background: "rgba(99,102,241,0.1)" }}
            >
              <ExternalLink className="w-3.5 h-3.5" /> View
            </Link>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.11 }}
        className="mt-4 p-4 rounded-2xl"
        style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="flex items-center justify-between mb-2">
          <p className="text-white/45 text-xs font-medium">Profile completion</p>
          <p className="text-white text-sm font-semibold">{completion}%</p>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${completion}%`,
              background: completion >= 100
                ? "linear-gradient(90deg,#10b981,#059669)"
                : "linear-gradient(90deg,#6366f1,#818cf8)",
            }}
          />
        </div>
        {completion < 100 && (
          <p className="text-white/22 text-xs mt-2">
            Add more details to stand out.{" "}
            <Link href="/dashboard/profile" className="text-indigo-400 hover:text-indigo-300">Complete →</Link>
          </p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.15 }}
        className="mt-4 grid grid-cols-3 gap-3"
      >
        {[
          { label: "Profile Views", value: stats.views, icon: Eye },
          { label: "Link Clicks", value: stats.clicks, icon: MousePointer },
          { label: "QR Scans", value: stats.qr, icon: QrCode },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="flex items-center gap-2 mb-2">
              <Icon className="w-3.5 h-3.5 text-white/22" />
              <span className="text-white/32 text-[11px]">{label}</span>
            </div>
            <p className="text-2xl font-semibold text-white">{value || "—"}</p>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.2 }}
        className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3"
      >
        {[
          { href: "/dashboard/profile", icon: User, label: "Edit Profile", desc: "Name, bio, photos", accent: "rgba(99,102,241,0.12)" },
          { href: "/dashboard/links", icon: Link2, label: "Manage Links", desc: "Add or edit links", accent: "rgba(16,185,129,0.12)" },
          { href: "/dashboard/qr", icon: QrCode, label: "QR Code", desc: "Download your QR", accent: "rgba(59,130,246,0.12)" },
          { href: "/dashboard/nfc", icon: Nfc, label: "NFC Setup", desc: "Program your card", accent: "rgba(217,119,6,0.12)" },
          { href: "/dashboard/theme", icon: Palette, label: "Theme", desc: "Customize look", accent: "rgba(139,92,246,0.12)" },
          { href: "/dashboard/analytics", icon: Eye, label: "Analytics", desc: "Views & clicks", accent: "rgba(236,72,153,0.12)" },
        ].map(({ href, icon: Icon, label, desc, accent }) => (
          <Link
            key={href}
            href={href}
            className="group p-4 rounded-2xl flex items-start gap-3 transition-colors duration-200 hover:border-white/[0.09]"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: accent }}>
              <Icon className="w-3.5 h-3.5 text-white/65" />
            </div>
            <div>
              <p className="text-white text-xs font-medium">{label}</p>
              <p className="text-white/28 text-[11px] mt-0.5">{desc}</p>
            </div>
            <ArrowRight className="w-3 h-3 text-white/0 group-hover:text-white/25 transition-colors ml-auto shrink-0 mt-1" />
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
