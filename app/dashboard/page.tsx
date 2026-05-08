"use client";

import { useProfile } from "@/hooks/useProfile";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAnalyticsEvents } from "@/lib/firestore";
import { profileCompletion } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Eye, MousePointer, QrCode, User, Link2, Nfc,
  Copy, ExternalLink, CheckCircle2, Palette, BookUser,
  ArrowRight, Check, TrendingUp, Zap, Globe,
} from "lucide-react";
import BlockedBanner from "@/components/ui/BlockedBanner";
import PageSkeleton from "@/components/ui/PageSkeleton";
import type { AnalyticsEvent } from "@/types";

const BASE_URL = "https://tiktag.pages.dev";
const spr = { type: "spring" as const, stiffness: 260, damping: 22 };

function StatCard({ label, value, icon: Icon, accent, delay }: {
  label: string; value: number; icon: React.ComponentType<{ className?: string }>;
  accent: string; delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...spr, delay }}
      className="rounded-[18px] p-5"
      style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-3" style={{ background: accent }}>
        <Icon className="w-4 h-4 text-white/80" />
      </div>
      <p className="text-[28px] font-bold text-white tracking-tight leading-none">
        {value > 0 ? value.toLocaleString() : "—"}
      </p>
      <p className="text-white/38 text-[12px] font-medium mt-1.5">{label}</p>
    </motion.div>
  );
}

function QuickAction({ href, icon: Icon, label, desc, accent, delay }: {
  href: string; icon: React.ComponentType<{ className?: string }>;
  label: string; desc: string; accent: string; delay: number;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spr, delay }}>
      <Link
        href={href}
        className="group flex items-start gap-3.5 p-4 rounded-[16px] transition-all duration-200 hover:border-white/[0.1]"
        style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.055)" }}
      >
        <div className="w-9 h-9 rounded-[11px] flex items-center justify-center shrink-0" style={{ background: accent }}>
          <Icon className="w-4 h-4 text-white/80" />
        </div>
        <div className="flex-1 min-w-0 pt-0.5">
          <p className="text-white/82 text-[13.5px] font-semibold">{label}</p>
          <p className="text-white/30 text-[12px] mt-0.5 leading-snug">{desc}</p>
        </div>
        <ArrowRight className="w-3.5 h-3.5 text-white/0 group-hover:text-white/28 transition-colors mt-1 shrink-0" />
      </Link>
    </motion.div>
  );
}

export default function DashboardPage() {
  const uid = auth.currentUser?.uid;
  const { profile, loading, error, retry } = useProfile(uid);
  const [stats, setStats] = useState({ views: 0, clicks: 0, qr: 0, saves: 0 });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!uid) return;
    getAnalyticsEvents(uid, 30).then((events: AnalyticsEvent[]) => {
      setStats({
        views:  events.filter((e) => e.type === "view").length,
        clicks: events.filter((e) => e.type === "click").length,
        qr:     events.filter((e) => e.source === "qr").length,
        saves:  events.filter((e) => e.type === "click" && e.target?.toLowerCase().includes("save")).length,
      });
    });
  }, [uid]);

  if (loading) return <PageSkeleton rows={6} />;

  const firstName  = profile?.displayName?.split(" ")[0] || "there";
  const completion = profile ? profileCompletion(profile) : 0;
  const profileUrl = profile?.username ? `${BASE_URL}/u/${profile.username}` : null;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const copyLink = () => {
    if (!profileUrl) return;
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const checklist = [
    { label: "Upload a profile photo",   done: !!profile?.photoURL,                                                                                                      href: "/dashboard/profile"  },
    { label: "Set your display name",    done: !!profile?.displayName,                                                                                                    href: "/dashboard/profile"  },
    { label: "Add a job title",          done: !!profile?.title,                                                                                                          href: "/dashboard/profile"  },
    { label: "Write your bio",           done: !!profile?.bio,                                                                                                            href: "/dashboard/profile"  },
    { label: "Add phone or WhatsApp",    done: !!(profile?.phone || profile?.whatsapp),                                                                                   href: "/dashboard/contact"  },
    { label: "Claim your username",      done: !!profile?.username,                                                                                                       href: "/dashboard/settings" },
    { label: "Connect a social account", done: !!(profile?.linkedin || profile?.instagram || profile?.facebook || profile?.tiktok || profile?.youtube || profile?.xTwitter), href: "/dashboard/social" },
    { label: "Add a custom link",        done: (profile?.links?.length ?? 0) > 0,                                                                                         href: "/dashboard/links"   },
  ];
  const checklistDone = checklist.filter((c) => c.done).length;
  const allDone       = checklistDone === checklist.length;

  const statItems = [
    { label: "Profile Views",  value: stats.views,  icon: Eye,          accent: "rgba(99,102,241,0.25)" },
    { label: "Link Clicks",    value: stats.clicks, icon: MousePointer, accent: "rgba(16,185,129,0.22)" },
    { label: "QR Scans",       value: stats.qr,     icon: QrCode,       accent: "rgba(59,130,246,0.22)" },
    { label: "Contact Saves",  value: stats.saves,  icon: BookUser,     accent: "rgba(217,119,6,0.22)"  },
  ];

  const actions = [
    { href: "/dashboard/profile",   icon: User,       label: "Edit Profile", desc: "Name, bio, photos",      accent: "rgba(99,102,241,0.22)"  },
    { href: "/dashboard/links",     icon: Link2,      label: "Manage Links", desc: "Add or reorder links",   accent: "rgba(16,185,129,0.22)"  },
    { href: "/dashboard/qr",        icon: QrCode,     label: "QR Studio",    desc: "Design & export QR",     accent: "rgba(59,130,246,0.22)"  },
    { href: "/dashboard/nfc",       icon: Nfc,        label: "NFC Setup",    desc: "Program your NFC card",  accent: "rgba(217,119,6,0.22)"   },
    { href: "/dashboard/theme",     icon: Palette,    label: "Appearance",   desc: "Themes & style",         accent: "rgba(139,92,246,0.22)"  },
    { href: "/dashboard/analytics", icon: TrendingUp, label: "Analytics",    desc: "Views, clicks & scans",  accent: "rgba(236,72,153,0.22)"  },
  ];

  return (
    <div className="p-5 md:p-8 max-w-5xl">
      {error && <BlockedBanner errorType={error} onRetry={retry} />}

      {/* ─── Header ────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...spr }}
        className="mb-7 flex items-start justify-between gap-4 flex-wrap"
      >
        <div>
          <h1 className="text-[26px] font-bold text-white tracking-[-0.03em] leading-tight">
            {greeting}, {firstName}
          </h1>
          <p className="text-white/35 text-sm mt-1 font-medium">
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
        </div>
        {profileUrl && (
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={copyLink}
              className="flex items-center gap-1.5 px-3 py-2 rounded-[10px] text-[12.5px] font-medium transition-all"
              style={{
                background: copied ? "rgba(16,185,129,0.12)" : "rgba(255,255,255,0.05)",
                border: `1px solid ${copied ? "rgba(16,185,129,0.28)" : "rgba(255,255,255,0.08)"}`,
                color: copied ? "#34d399" : "rgba(255,255,255,0.45)",
              }}
            >
              {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied!" : "Copy link"}
            </button>
            <Link
              href={`/u/${profile?.username}`}
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-2 rounded-[10px] text-[12.5px] font-medium transition-all hover:opacity-85"
              style={{
                background: "rgba(99,102,241,0.14)",
                border: "1px solid rgba(99,102,241,0.25)",
                color: "#a5b4fc",
              }}
            >
              <Globe className="w-3.5 h-3.5" />
              View profile
            </Link>
          </div>
        )}
      </motion.div>

      {/* ─── Stats ─────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {statItems.map((s, i) => (
          <StatCard key={s.label} {...s} delay={0.04 + i * 0.05} />
        ))}
      </div>

      {/* ─── Identity strength ─────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...spr, delay: 0.22 }}
        className="mb-5 rounded-[18px] p-5"
        style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(99,102,241,0.2)" }}>
              <Zap className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <div>
              <p className="text-white/82 text-[13.5px] font-semibold">Identity Strength</p>
              <p className="text-white/30 text-[11.5px]">
                {completion < 100 ? "Keep building your profile" : "Your profile is fully complete"}
              </p>
            </div>
          </div>
          <span className="text-[22px] font-bold tracking-tight"
            style={{ color: completion >= 100 ? "#10b981" : "#6366f1" }}>
            {completion}%
          </span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
          <motion.div
            className="h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${completion}%` }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            style={{
              background: completion >= 100
                ? "linear-gradient(90deg, #10b981, #059669)"
                : "linear-gradient(90deg, #6366f1, #818cf8)",
            }}
          />
        </div>
      </motion.div>

      {/* ─── Actions + Checklist ─────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.28 }}
            className="text-[10.5px] font-bold uppercase tracking-[0.14em] mb-3"
            style={{ color: "rgba(255,255,255,0.22)" }}
          >
            Quick Access
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {actions.map((a, i) => (
              <QuickAction key={a.href} {...a} delay={0.3 + i * 0.04} />
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          {!allDone ? (
            <>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.32 }}
                className="text-[10.5px] font-bold uppercase tracking-[0.14em] mb-3"
                style={{ color: "rgba(255,255,255,0.22)" }}
              >
                Setup Checklist
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spr, delay: 0.34 }}
                className="rounded-[18px] overflow-hidden"
                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-white/72 text-[13px] font-semibold">Getting started</p>
                    <span className="text-white/40 text-[12px] font-medium">{checklistDone}/{checklist.length}</span>
                  </div>
                  <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${(checklistDone / checklist.length) * 100}%`,
                        background: "linear-gradient(90deg, #6366f1, #818cf8)",
                      }}
                    />
                  </div>
                </div>
                <div className="p-2">
                  {checklist.map(({ label, done, href }, i) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ ...spr, delay: 0.38 + i * 0.03 }}
                    >
                      <Link
                        href={href}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-[10px] hover:bg-white/[0.03] transition-colors group"
                      >
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all"
                          style={
                            done
                              ? { background: "rgba(16,185,129,0.22)", border: "1px solid rgba(16,185,129,0.3)" }
                              : { border: "1px solid rgba(255,255,255,0.15)" }
                          }
                        >
                          {done && <Check className="w-3 h-3 text-emerald-400" />}
                        </div>
                        <span className={`text-[12.5px] transition-colors flex-1 ${done ? "text-white/25 line-through" : "text-white/58 group-hover:text-white/80"}`}>
                          {label}
                        </span>
                        {!done && <ArrowRight className="w-3 h-3 text-white/0 group-hover:text-white/28 transition-colors shrink-0" />}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </>
          ) : (
            <>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.32 }}
                className="text-[10.5px] font-bold uppercase tracking-[0.14em] mb-3"
                style={{ color: "rgba(255,255,255,0.22)" }}
              >
                Profile Status
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spr, delay: 0.34 }}
                className="rounded-[18px] p-5"
                style={{
                  background: "linear-gradient(135deg, rgba(16,185,129,0.08), rgba(5,150,105,0.05))",
                  border: "1px solid rgba(16,185,129,0.18)",
                }}
              >
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(16,185,129,0.18)" }}>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
                <p className="text-white/88 text-[14px] font-semibold mb-1">Profile complete</p>
                <p className="text-white/35 text-[12.5px] leading-relaxed">
                  Your digital identity is fully set up. Share your link and start getting discovered.
                </p>
                {profileUrl && (
                  <Link
                    href={`/u/${profile?.username}`}
                    target="_blank"
                    className="inline-flex items-center gap-1.5 mt-4 text-emerald-400 text-[12.5px] font-semibold hover:text-emerald-300 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    View your profile
                  </Link>
                )}
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
