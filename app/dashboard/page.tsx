"use client";

import { auth } from "@/lib/firebase";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAnalyticsEvents } from "@/lib/firestore";
import { profileCompletion } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Eye, MousePointer, QrCode, User, Link2, Wifi,
  Copy, ExternalLink, CheckCircle2,
  ArrowRight, Check, BarChart2, Globe, Zap,
  Activity, Smartphone, BookUser,
} from "lucide-react";
import BlockedBanner from "@/components/ui/BlockedBanner";
import PageSkeleton from "@/components/ui/PageSkeleton";
import type { AnalyticsEvent } from "@/types";
import { useDashboard } from "@/contexts/DashboardContext";
import { statsByRole, quickActionsByRole, EXPERIENCE_OPTIONS, type UserType } from "@/lib/dashboardConfig";
import { useToast, Toast } from "@/components/ui/Toast";

const BASE_URL = "https://tiktag.pages.dev";
const spr = { type: "spring" as const, stiffness: 260, damping: 22 };

// ─── Helpers ─────────────────────────────────────────────────────────────────

function timeAgo(ts: number): string {
  const d = Date.now() - ts;
  const m = Math.floor(d / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function eventLabel(e: AnalyticsEvent): string {
  if (e.type === "view") return "Profile viewed";
  const t = (e.target ?? "").toLowerCase();
  if (t.includes("save")) return "Contact saved";
  if (t.includes("whatsapp")) return "WhatsApp tapped";
  if (t.includes("call")) return "Call initiated";
  if (t.includes("email")) return "Email tapped";
  return "Link clicked";
}

function sourceLabel(s: string): { text: string; color: string; bg: string } {
  if (s === "nfc")  return { text: "NFC",    color: "#a78bfa", bg: "rgba(139,92,246,0.12)" };
  if (s === "qr")   return { text: "QR",     color: "#60a5fa", bg: "rgba(59,130,246,0.12)" };
  return              { text: "Direct", color: "rgba(255,255,255,0.4)", bg: "rgba(255,255,255,0.06)" };
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function StatCard({ label, value, icon: Icon, color, delay }: {
  label: string; value: number; icon: React.ElementType; color: string; delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...spr, delay }}
      style={{
        padding: "20px",
        borderRadius: 16,
        background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.016) 100%)",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 8px 28px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)",
        position: "relative", overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1.5,
        background: `linear-gradient(90deg, ${color}80, ${color}20)`,
      }} />
      <div style={{
        width: 34, height: 34, borderRadius: 10,
        background: `${color}14`, border: `1px solid ${color}22`,
        display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14,
      }}>
        <Icon size={15} style={{ color }} />
      </div>
      <p style={{ color: "rgba(255,255,255,0.94)", fontSize: 28, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1, margin: "0 0 4px" }}>
        {value > 0 ? value.toLocaleString() : "—"}
      </p>
      <p style={{ color: "rgba(255,255,255,0.32)", fontSize: 12, margin: 0 }}>{label}</p>
    </motion.div>
  );
}

function IdentityCard({ profile }: { profile: Record<string, unknown> | null }) {
  const initials = typeof profile?.displayName === "string"
    ? profile.displayName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "—";

  const links = (Array.isArray(profile?.links) ? profile.links as Array<{ label: string; enabled?: boolean }> : [])
    .filter((l) => l.enabled !== false)
    .slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ ...spr, delay: 0.2 }}
      style={{ display: "flex", justifyContent: "center" }}
    >
      <div style={{
        width: 196, height: 356, borderRadius: 36,
        background: "linear-gradient(180deg, #0e0e1c 0%, #0a0a16 60%, #080812 100%)",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 60px 120px rgba(0,0,0,0.8), 0 24px 48px rgba(0,0,0,0.6), 0 0 60px rgba(88,28,235,0.07), inset 0 1px 0 rgba(255,255,255,0.08)",
        position: "relative", overflow: "hidden", flexShrink: 0,
      }}>
        <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", width: 68, height: 18, background: "#000", borderRadius: 14, zIndex: 10 }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 130, background: "linear-gradient(180deg, rgba(88,28,235,0.12) 0%, transparent 100%)" }} />

        <div style={{ paddingTop: 40, paddingLeft: 12, paddingRight: 12, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: 56, height: 56, borderRadius: "50%",
              background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 8px 24px rgba(139,92,246,0.4)", marginBottom: 8, overflow: "hidden",
            }}
          >
            {profile?.photoURL ? (
              <img src={profile.photoURL as string} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <span style={{ color: "white", fontWeight: 700, fontSize: 15 }}>{initials}</span>
            )}
          </motion.div>

          <p style={{ color: "rgba(255,255,255,0.92)", fontSize: 11.5, fontWeight: 600, marginBottom: 1, textAlign: "center" }}>
            {typeof profile?.displayName === "string" ? profile.displayName : "Your Name"}
          </p>
          <p style={{ color: "rgba(255,255,255,0.32)", fontSize: 9, marginBottom: 2 }}>
            {typeof profile?.title === "string" ? profile.title : "Your Title"}
          </p>
          {typeof profile?.location === "string" && profile.location && (
            <p style={{ color: "rgba(255,255,255,0.18)", fontSize: 8, marginBottom: 10 }}>{profile.location}</p>
          )}

          <div style={{ display: "flex", gap: 4, width: "100%", marginBottom: 7, marginTop: 6 }}>
            {[
              { l: "Call", bg: "rgba(74,222,128,0.1)", color: "#4ade80" },
              { l: "Chat", bg: "rgba(139,92,246,0.12)", color: "#a78bfa" },
              { l: "Mail", bg: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.28)" },
            ].map(({ l, bg, color }) => (
              <div key={l} style={{
                flex: 1, height: 26, borderRadius: 7,
                background: bg, border: "1px solid rgba(255,255,255,0.06)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ color, fontSize: 7.5, fontWeight: 600 }}>{l}</span>
              </div>
            ))}
          </div>

          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 3 }}>
            {links.length > 0 ? links.map((link) => (
              <div key={link.label} style={{
                height: 24, borderRadius: 7,
                background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.14)",
                display: "flex", alignItems: "center", paddingLeft: 8, paddingRight: 8, justifyContent: "space-between",
              }}>
                <span style={{ color: "rgba(167,139,250,0.75)", fontSize: 8 }}>{link.label}</span>
                <span style={{ color: "rgba(139,92,246,0.4)", fontSize: 7 }}>→</span>
              </div>
            )) : ["Portfolio", "LinkedIn", "Contact"].map((l, idx) => (
              <div key={l} style={{
                height: 24, borderRadius: 7,
                background: idx === 0 ? "rgba(139,92,246,0.08)" : "rgba(255,255,255,0.025)",
                border: `1px solid ${idx === 0 ? "rgba(139,92,246,0.14)" : "rgba(255,255,255,0.04)"}`,
                display: "flex", alignItems: "center", paddingLeft: 8,
              }}>
                <span style={{ color: idx === 0 ? "rgba(167,139,250,0.7)" : "rgba(255,255,255,0.2)", fontSize: 8 }}>{l}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          position: "absolute", bottom: 0, left: "10%", right: "10%", height: 40,
          background: "linear-gradient(180deg, rgba(139,92,246,0.04) 0%, transparent 100%)",
          pointerEvents: "none",
        }} />
      </div>
    </motion.div>
  );
}

function QuickAction({ href, icon: Icon, label, desc, color, delay }: {
  href: string; icon: React.ElementType; label: string; desc: string; color: string; delay: number;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spr, delay }}>
      <Link href={href} style={{
        display: "flex", alignItems: "center", gap: 12, padding: "13px 14px",
        borderRadius: 14, textDecoration: "none",
        background: "linear-gradient(180deg, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0.014) 100%)",
        border: "1px solid rgba(255,255,255,0.065)",
        boxShadow: "0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)",
        transition: "border-color 0.15s, box-shadow 0.15s",
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10, flexShrink: 0,
          background: `${color}14`, border: `1px solid ${color}22`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon size={15} style={{ color }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ color: "rgba(255,255,255,0.82)", fontSize: 13, fontWeight: 600, margin: 0, letterSpacing: "-0.01em" }}>{label}</p>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, margin: "2px 0 0" }}>{desc}</p>
        </div>
        <ArrowRight size={13} style={{ color: "rgba(255,255,255,0.18)", flexShrink: 0 }} />
      </Link>
    </motion.div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const uid = auth.currentUser?.uid;
  const { profile, loading, error, retry, userType, update } = useDashboard();
  const { message: toastMsg, show: showToast, dismiss: dismissToast } = useToast();

  const [stats, setStats] = useState({ views: 0, clicks: 0, qr: 0, saves: 0, nfc: 0 });
  const [recentEvents, setRecentEvents] = useState<AnalyticsEvent[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!uid) return;
    getAnalyticsEvents(uid, 30).then((events: AnalyticsEvent[]) => {
      setStats({
        views:  events.filter((e) => e.type === "view").length,
        clicks: events.filter((e) => e.type === "click").length,
        qr:     events.filter((e) => e.source === "qr").length,
        saves:  events.filter((e) => e.type === "click" && (e.target ?? "").toLowerCase().includes("save")).length,
        nfc:    events.filter((e) => e.source === "nfc").length,
      });
      setRecentEvents([...events].sort((a, b) => b.timestamp - a.timestamp).slice(0, 6));
    });
  }, [uid]);

  if (loading) return <PageSkeleton rows={6} />;

  const firstName  = profile?.displayName?.split(" ")[0] ?? "there";
  const completion = profile ? profileCompletion(profile) : 0;
  const profileUrl = profile?.username ? `${BASE_URL}/u/${profile.username}` : null;
  const hour       = new Date().getHours();
  const timeGreet  = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const copyLink = () => {
    if (!profileUrl) return;
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSwitchExperience = async (type: UserType) => {
    if (type === userType) return;
    await update({ userType: type });
    showToast(`Switched to ${type.charAt(0).toUpperCase() + type.slice(1)} mode`);
  };

  // Role-adaptive config
  const roleStats   = statsByRole[userType] ?? statsByRole.personal;
  const roleActions = quickActionsByRole[userType] ?? quickActionsByRole.personal;

  const statItems = roleStats.map((s) => ({
    label: s.label,
    value: stats[s.dataKey],
    icon:  s.icon,
    color: s.color,
  }));

  const checklist = [
    { label: "Upload a profile photo",   done: !!profile?.photoURL,                                                                              href: "/dashboard/profile"  },
    { label: "Set your display name",    done: !!profile?.displayName,                                                                           href: "/dashboard/profile"  },
    { label: "Add a job title",          done: !!profile?.title,                                                                                  href: "/dashboard/profile"  },
    { label: "Write your bio",           done: !!profile?.bio,                                                                                   href: "/dashboard/profile"  },
    { label: "Add phone or WhatsApp",    done: !!(profile?.phone || profile?.whatsapp),                                                          href: "/dashboard/contact"  },
    { label: "Claim your username",      done: !!profile?.username,                                                                              href: "/dashboard/settings" },
    { label: "Connect a social account", done: !!(profile?.linkedin || profile?.instagram || profile?.facebook || profile?.tiktok || profile?.youtube || profile?.xTwitter), href: "/dashboard/social" },
    { label: "Add a custom link",        done: (profile?.links?.length ?? 0) > 0,                                                               href: "/dashboard/links"    },
  ];
  const checklistDone = checklist.filter((c) => c.done).length;
  const allDone = checklistDone === checklist.length;

  return (
    <div style={{ padding: "32px 28px 48px", maxWidth: 1040, position: "relative" }}>
      {/* Atmospheric glow */}
      <div style={{
        position: "absolute", top: 0, left: "20%", right: "20%", height: 320, zIndex: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(88,28,235,0.07) 0%, transparent 70%)",
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        {error && <BlockedBanner errorType={error} onRetry={retry} />}

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spr }}
          style={{ marginBottom: 28, display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}
        >
          <div>
            <p style={{ color: "rgba(139,92,246,0.65)", fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", margin: "0 0 6px" }}>
              {userType.charAt(0).toUpperCase() + userType.slice(1)} Dashboard
            </p>
            <h1 style={{ color: "rgba(255,255,255,0.94)", fontSize: "clamp(22px, 2.5vw, 30px)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.1, margin: 0 }}>
              {timeGreet}, {firstName}.
            </h1>
            <p style={{ color: "rgba(255,255,255,0.28)", fontSize: 13, margin: "5px 0 0" }}>
              {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            </p>
          </div>

          {profileUrl && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
              <button
                onClick={copyLink}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "8px 14px", borderRadius: 10, cursor: "pointer",
                  background: copied ? "rgba(74,222,128,0.1)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${copied ? "rgba(74,222,128,0.25)" : "rgba(255,255,255,0.07)"}`,
                  color: copied ? "#4ade80" : "rgba(255,255,255,0.42)",
                  fontSize: 12, fontWeight: 500, transition: "all 0.2s",
                }}
              >
                {copied ? <CheckCircle2 size={13} /> : <Copy size={13} />}
                {copied ? "Copied!" : "Copy link"}
              </button>
              <Link href={`/u/${profile?.username}`} target="_blank" style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "8px 14px", borderRadius: 10, textDecoration: "none",
                background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.22)",
                color: "rgba(167,139,250,0.85)", fontSize: 12, fontWeight: 500,
              }}>
                <Globe size={13} />
                View profile
              </Link>
            </div>
          )}
        </motion.div>

        {/* ── Experience Mode Switcher ── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spr, delay: 0.03 }}
          style={{ marginBottom: 20 }}
        >
          <p style={{ color: "rgba(255,255,255,0.18)", fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", margin: "0 0 8px" }}>
            Experience Mode
          </p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {EXPERIENCE_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              const active = userType === opt.type;
              return (
                <button
                  key={opt.type}
                  onClick={() => handleSwitchExperience(opt.type)}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "6px 13px", borderRadius: 20, cursor: "pointer",
                    background: active ? `${opt.color}18` : "rgba(255,255,255,0.03)",
                    border: `1px solid ${active ? `${opt.color}45` : "rgba(255,255,255,0.07)"}`,
                    color: active ? opt.color : "rgba(255,255,255,0.38)",
                    fontSize: 12, fontWeight: active ? 600 : 450,
                    transition: "all 0.18s",
                    boxShadow: active ? `0 0 14px ${opt.glow}` : "none",
                  }}
                >
                  <Icon size={12} />
                  {opt.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Stats row (role-adaptive) ── */}
        <motion.div
          key={userType}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spr, delay: 0.04 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6"
        >
          {statItems.map((s, i) => (
            <StatCard key={s.label} {...s} delay={0.05 + i * 0.06} />
          ))}
        </motion.div>

        {/* ── Body: identity preview + quick actions ── */}
        <div className="grid grid-cols-1 md:grid-cols-[244px_1fr] gap-5 mb-5" style={{ alignItems: "start" }}>
          {/* Identity preview card */}
          <motion.div
            initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ ...spr, delay: 0.18 }}
            style={{
              padding: "24px", borderRadius: 20,
              background: "linear-gradient(180deg, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0.014) 100%)",
              border: "1px solid rgba(255,255,255,0.065)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", minWidth: 196 }}>
              <p style={{ color: "rgba(255,255,255,0.28)", fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", margin: 0 }}>
                Your Profile
              </p>
              {profileUrl && (
                <Link href={`/u/${profile?.username}`} target="_blank" style={{ color: "rgba(167,139,250,0.55)", fontSize: 10, textDecoration: "none", display: "flex", alignItems: "center", gap: 3 }}>
                  <ExternalLink size={10} />
                  Live
                </Link>
              )}
            </div>
            <IdentityCard profile={profile as Record<string, unknown> | null} />

            <div style={{ width: "100%", minWidth: 196 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Zap size={12} style={{ color: completion >= 100 ? "#4ade80" : "#8b5cf6" }} />
                  <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 11, fontWeight: 500 }}>Identity Strength</span>
                </div>
                <span style={{ color: completion >= 100 ? "#4ade80" : "#8b5cf6", fontSize: 14, fontWeight: 700, letterSpacing: "-0.03em" }}>{completion}%</span>
              </div>
              <div style={{ height: 4, borderRadius: 4, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${completion}%` }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
                  style={{
                    height: "100%", borderRadius: 4,
                    background: completion >= 100 ? "linear-gradient(90deg, #4ade80, #22c55e)" : "linear-gradient(90deg, #8b5cf6, #a78bfa)",
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* Right: role-adaptive quick actions */}
          <div>
            <motion.p
              key={`qa-label-${userType}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.22 }}
              style={{ color: "rgba(255,255,255,0.2)", fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 10 }}
            >
              Quick Access
            </motion.p>
            <motion.div
              key={`qa-grid-${userType}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spr, delay: 0.24 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2"
            >
              {roleActions.map((a, i) => (
                <QuickAction key={a.href} {...a} delay={0.24 + i * 0.05} />
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── Bottom row: checklist + activity ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Setup checklist */}
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spr, delay: 0.32 }}
            style={{
              borderRadius: 18,
              background: "linear-gradient(180deg, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0.014) 100%)",
              border: "1px solid rgba(255,255,255,0.065)",
              boxShadow: "0 8px 28px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)",
              overflow: "hidden",
            }}
          >
            {!allDone ? (
              <>
                <div style={{ padding: "18px 20px 14px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                    <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: 600, margin: 0 }}>Setup Checklist</p>
                    <span style={{ color: "rgba(255,255,255,0.32)", fontSize: 12 }}>{checklistDone}/{checklist.length}</span>
                  </div>
                  <div style={{ height: 3, borderRadius: 3, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                    <div style={{
                      height: "100%", borderRadius: 3, transition: "width 0.7s ease",
                      width: `${(checklistDone / checklist.length) * 100}%`,
                      background: "linear-gradient(90deg, #8b5cf6, #a78bfa)",
                    }} />
                  </div>
                </div>
                <div style={{ padding: "6px 8px" }}>
                  {checklist.map(({ label, done, href }, i) => (
                    <motion.div key={label} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ ...spr, delay: 0.36 + i * 0.03 }}>
                      <Link href={href} style={{
                        display: "flex", alignItems: "center", gap: 10,
                        padding: "8px 10px", borderRadius: 10, textDecoration: "none", transition: "background 0.15s",
                      }}>
                        <div style={{
                          width: 18, height: 18, borderRadius: "50%", flexShrink: 0,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          background: done ? "rgba(74,222,128,0.15)" : "transparent",
                          border: done ? "1px solid rgba(74,222,128,0.28)" : "1px solid rgba(255,255,255,0.14)",
                        }}>
                          {done && <Check size={10} style={{ color: "#4ade80" }} />}
                        </div>
                        <span style={{
                          fontSize: 12.5, flex: 1,
                          color: done ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.58)",
                          textDecoration: done ? "line-through" : "none",
                        }}>{label}</span>
                        {!done && <ArrowRight size={11} style={{ color: "rgba(255,255,255,0.18)", flexShrink: 0 }} />}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              <div style={{ padding: "28px 24px" }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12, marginBottom: 16,
                  background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <CheckCircle2 size={20} style={{ color: "#4ade80" }} />
                </div>
                <p style={{ color: "rgba(255,255,255,0.88)", fontSize: 14, fontWeight: 600, marginBottom: 6 }}>Profile complete</p>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>
                  Your digital identity is fully built. Share your link and get discovered.
                </p>
                {profileUrl && (
                  <Link href={`/u/${profile?.username}`} target="_blank" style={{
                    display: "inline-flex", alignItems: "center", gap: 5,
                    color: "#4ade80", fontSize: 12.5, fontWeight: 600, textDecoration: "none",
                  }}>
                    <ExternalLink size={12} /> View your live profile
                  </Link>
                )}
              </div>
            )}
          </motion.div>

          {/* Activity feed */}
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spr, delay: 0.38 }}
            style={{
              borderRadius: 18,
              background: "linear-gradient(180deg, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0.014) 100%)",
              border: "1px solid rgba(255,255,255,0.065)",
              boxShadow: "0 8px 28px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "18px 20px 14px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", gap: 8 }}>
              <Activity size={13} style={{ color: "rgba(255,255,255,0.35)" }} />
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: 600, margin: 0 }}>Recent Activity</p>
            </div>
            {recentEvents.length === 0 ? (
              <div style={{ padding: "32px 24px", textAlign: "center" }}>
                <Smartphone size={28} style={{ color: "rgba(255,255,255,0.1)", margin: "0 auto 12px" }} />
                <p style={{ color: "rgba(255,255,255,0.28)", fontSize: 13, margin: 0 }}>No activity yet.</p>
                <p style={{ color: "rgba(255,255,255,0.18)", fontSize: 12, margin: "4px 0 0" }}>Share your profile link to start tracking.</p>
              </div>
            ) : (
              <div style={{ padding: "6px 8px" }}>
                {recentEvents.map((evt, i) => {
                  const src = sourceLabel(evt.source);
                  return (
                    <motion.div
                      key={`${evt.timestamp}-${i}`}
                      initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ ...spr, delay: 0.42 + i * 0.04 }}
                      style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 10px", borderRadius: 10 }}
                    >
                      <div style={{
                        width: 30, height: 30, borderRadius: 9, flexShrink: 0,
                        background: evt.type === "view" ? "rgba(139,92,246,0.1)" : "rgba(74,222,128,0.1)",
                        border: evt.type === "view" ? "1px solid rgba(139,92,246,0.16)" : "1px solid rgba(74,222,128,0.16)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        {evt.type === "view"
                          ? <Eye size={13} style={{ color: "#a78bfa" }} />
                          : <MousePointer size={13} style={{ color: "#4ade80" }} />
                        }
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ color: "rgba(255,255,255,0.72)", fontSize: 12.5, fontWeight: 500, margin: 0 }}>{eventLabel(evt)}</p>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                          <span style={{
                            padding: "1px 6px", borderRadius: 20,
                            background: src.bg, color: src.color,
                            fontSize: 9, fontWeight: 600, letterSpacing: "0.04em",
                          }}>{src.text}</span>
                          <span style={{ color: "rgba(255,255,255,0.22)", fontSize: 10 }}>{timeAgo(evt.timestamp)}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>

        {/* ── NFC banner (contextual per role) ── */}
        {profile && profile.nfcStatus !== "activated" && userType !== "enterprise" && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spr, delay: 0.48 }} style={{ marginTop: 20 }}>
            <Link href="/dashboard/nfc" style={{
              display: "flex", alignItems: "center", gap: 14,
              padding: "16px 20px", borderRadius: 16, textDecoration: "none",
              background: "linear-gradient(135deg, rgba(34,211,238,0.05) 0%, rgba(99,102,241,0.04) 100%)",
              border: "1px solid rgba(34,211,238,0.14)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              transition: "border-color 0.2s",
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: 11, flexShrink: 0,
                background: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.18)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <BookUser size={17} style={{ color: "#22d3ee" }} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ color: "rgba(255,255,255,0.82)", fontSize: 13, fontWeight: 600, margin: 0 }}>
                  {userType === "business" || userType === "restaurant"
                    ? profile.nfcStatus === "ordered" ? "Your NFC cards are on the way" : "Activate your NFC cards"
                    : profile.nfcStatus === "ordered" ? "Your NFC card is on its way" : "Get your NFC card"
                  }
                </p>
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, margin: "2px 0 0" }}>
                  {profile.nfcStatus === "ordered"
                    ? "We're crafting your card. It will arrive shortly."
                    : userType === "events"
                      ? "Smart NFC badges for your attendees. One tap to connect."
                      : "One tap to share your complete identity. No app needed."
                  }
                </p>
              </div>
              <ArrowRight size={14} style={{ color: "rgba(34,211,238,0.5)", flexShrink: 0 }} />
            </Link>
          </motion.div>
        )}
      </div>

      <Toast message={toastMsg} onDismiss={dismissToast} />
    </div>
  );
}
