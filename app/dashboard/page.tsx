"use client";

import { useProfile } from "@/hooks/useProfile";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAnalyticsEvents } from "@/lib/firestore";
import { profileCompletion } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  ArrowRight, Eye, MousePointer, QrCode, User,
  Link2, Nfc, Copy, ExternalLink, CheckCircle2, Palette,
  BookUser, Check,
} from "lucide-react";
import BlockedBanner from "@/components/ui/BlockedBanner";
import PageSkeleton from "@/components/ui/PageSkeleton";
import type { AnalyticsEvent } from "@/types";

const BASE_URL = "https://tiktag.pages.dev";

export default function DashboardPage() {
  const uid = auth.currentUser?.uid;
  const { profile, loading, error, retry } = useProfile(uid);
  const [stats, setStats] = useState({ views: 0, clicks: 0, qr: 0, saves: 0 });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!uid) return;
    getAnalyticsEvents(uid, 30).then((events: AnalyticsEvent[]) => {
      const views = events.filter((e) => e.type === "view").length;
      const clicks = events.filter((e) => e.type === "click").length;
      const qr = events.filter((e) => e.source === "qr").length;
      const saves = events.filter((e) => e.type === "click" && e.target?.toLowerCase().includes("save")).length;
      setStats({ views, clicks, qr, saves });
    });
  }, [uid]);

  if (loading) return <PageSkeleton rows={5} />;

  const firstName = profile?.displayName?.split(" ")[0] || "there";
  const completion = profile ? profileCompletion(profile) : 0;
  const profileUrl = profile?.username ? `${BASE_URL}/u/${profile.username}` : null;

  const copyLink = () => {
    if (!profileUrl) return;
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const checklist = [
    { label: "Add a profile photo", done: !!profile?.photoURL, href: "/dashboard/profile" },
    { label: "Set your display name", done: !!profile?.displayName, href: "/dashboard/profile" },
    { label: "Add a job title", done: !!profile?.title, href: "/dashboard/profile" },
    { label: "Write your bio", done: !!profile?.bio, href: "/dashboard/profile" },
    { label: "Add phone or WhatsApp", done: !!(profile?.phone || profile?.whatsapp), href: "/dashboard/contact" },
    { label: "Set your username", done: !!profile?.username, href: "/dashboard/settings" },
    { label: "Connect a social link", done: !!(profile?.linkedin || profile?.instagram || profile?.facebook || profile?.tiktok || profile?.youtube || profile?.xTwitter), href: "/dashboard/social" },
    { label: "Add a custom link", done: (profile?.links?.length ?? 0) > 0, href: "/dashboard/links" },
  ];
  const checklistDone = checklist.filter((c) => c.done).length;
  const allDone = checklistDone === checklist.length;

  return (
    <div className="p-4 md:p-8 max-w-4xl">
      {error && <BlockedBanner errorType={error} onRetry={retry} />}

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <h1 className="text-2xl font-semibold text-white">Hey, {firstName} 👋</h1>
        <p className="text-white/35 text-sm mt-1">Here&apos;s your TikTag overview.</p>
      </motion.div>

      {/* Profile link banner */}
      {profileUrl && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.07 }}
          className="mt-5 p-4 rounded-2xl flex items-center justify-between gap-4 flex-wrap"
          style={{ background: "rgba(99,102,241,0.07)", border: "1px solid rgba(99,102,241,0.18)" }}
        >
          <div className="min-w-0">
            <p className="text-white/38 text-[11px] mb-0.5">Your public profile</p>
            <p className="text-indigo-300 text-sm font-medium truncate">{profileUrl}</p>
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
              href={`/u/${profile?.username}`}
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
              style={{ background: "rgba(99,102,241,0.1)" }}
            >
              <ExternalLink className="w-3.5 h-3.5" /> View
            </Link>
          </div>
        </motion.div>
      )}

      {/* Profile completion */}
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

      {/* Stats grid */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.15 }}
        className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3"
      >
        {[
          { label: "Profile Views", value: stats.views, icon: Eye },
          { label: "Link Clicks", value: stats.clicks, icon: MousePointer },
          { label: "QR Scans", value: stats.qr, icon: QrCode },
          { label: "Contact Saves", value: stats.saves, icon: BookUser },
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

      {/* Quick actions */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.2 }}
        className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3"
      >
        {[
          { href: "/dashboard/profile", icon: User, label: "Edit Profile", desc: "Name, bio, photos", accent: "rgba(99,102,241,0.12)" },
          { href: "/dashboard/links", icon: Link2, label: "Manage Links", desc: "Add or edit links", accent: "rgba(16,185,129,0.12)" },
          { href: "/dashboard/qr", icon: QrCode, label: "QR Studio", desc: "Download your QR", accent: "rgba(59,130,246,0.12)" },
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
            <div className="min-w-0">
              <p className="text-white text-xs font-medium">{label}</p>
              <p className="text-white/28 text-[11px] mt-0.5">{desc}</p>
            </div>
            <ArrowRight className="w-3 h-3 text-white/0 group-hover:text-white/25 transition-colors ml-auto shrink-0 mt-1" />
          </Link>
        ))}
      </motion.div>

      {/* Onboarding checklist */}
      {!allDone && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.25 }}
          className="mt-4 rounded-2xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div className="px-5 py-4 border-b border-white/[0.04] flex items-center justify-between">
            <div>
              <p className="text-white text-sm font-medium">Getting started</p>
              <p className="text-white/35 text-xs mt-0.5">{checklistDone} of {checklist.length} complete</p>
            </div>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-indigo-300"
              style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.2)" }}>
              {checklistDone}
            </div>
          </div>
          <div className="p-2">
            {checklist.map(({ label, done, href }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.03] transition-colors group"
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                  done
                    ? "bg-green-500/20 border border-green-500/30"
                    : "border border-white/[0.12] group-hover:border-white/[0.2]"
                }`}>
                  {done && <Check className="w-3 h-3 text-green-400" />}
                </div>
                <span className={`text-[13px] transition-colors ${done ? "text-white/30 line-through" : "text-white/60 group-hover:text-white/80"}`}>
                  {label}
                </span>
                {!done && <ArrowRight className="w-3 h-3 text-white/0 group-hover:text-white/30 transition-colors ml-auto shrink-0" />}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
