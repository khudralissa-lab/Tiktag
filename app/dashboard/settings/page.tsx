"use client";

import { auth } from "@/lib/firebase";
import { isUsernameAvailable, updateUsername } from "@/lib/firestore";
import { motion } from "framer-motion";
import {
  ExternalLink, CheckCircle2, XCircle, Loader2,
  User, AtSign, Mail, CreditCard, Globe, Zap, ArrowRight, Check,
} from "lucide-react";
import BlockedBanner from "@/components/ui/BlockedBanner";
import PageSkeleton from "@/components/ui/PageSkeleton";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useDashboard } from "@/contexts/DashboardContext";
import { EXPERIENCE_OPTIONS, type UserType } from "@/lib/dashboardConfig";
import { Toast, useToast } from "@/components/ui/Toast";

const BASE_URL = "https://tiktag.pages.dev";
const spr = { type: "spring" as const, stiffness: 260, damping: 22 };

function validateUsername(value: string): string | null {
  if (!value) return "Username is required";
  if (value.length < 3) return "At least 3 characters";
  if (value.length > 30) return "Max 30 characters";
  if (!/^[a-z0-9_.-]+$/.test(value)) return "Only lowercase letters, numbers, _, . and -";
  return null;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", margin: "0 0 10px" }}>
      {children}
    </p>
  );
}

function FieldRow({ icon: Icon, label, children, accent = "#8b5cf6" }: {
  icon: React.ElementType; label: string; children: React.ReactNode; accent?: string;
}) {
  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: 14, padding: "16px 18px",
      borderBottom: "1px solid rgba(255,255,255,0.042)",
    }}>
      <div style={{
        width: 34, height: 34, borderRadius: 10, flexShrink: 0, marginTop: 1,
        background: `${accent}14`, border: `1px solid ${accent}22`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon size={14} style={{ color: accent }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 5px" }}>
          {label}
        </p>
        {children}
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const user = auth.currentUser;
  const { profile, loading, error, retry, update, userType } = useDashboard();
  const toast = useToast();

  const [username, setUsername] = useState("");
  const [checking, setChecking] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved" | "error">("idle");
  const [saveError, setSaveError] = useState("");
  const [switchingType, setSwitchingType] = useState<UserType | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (profile?.username) setUsername(profile.username);
  }, [profile]);

  const handleUsernameChange = (value: string) => {
    const lower = value.toLowerCase();
    setUsername(lower);
    setAvailable(null);
    setSaveStatus("idle");

    if (debounceRef.current) clearTimeout(debounceRef.current);

    const validationError = validateUsername(lower);
    if (validationError || lower === profile?.username) return;

    setChecking(true);
    debounceRef.current = setTimeout(async () => {
      const ok = await isUsernameAvailable(lower);
      setChecking(false);
      setAvailable(ok);
    }, 500);
  };

  const handleSave = async () => {
    if (!user?.uid || !profile) return;
    const validationError = validateUsername(username);
    if (validationError) return;

    const isNew = username !== profile.username;
    if (isNew && available === false) return;

    setSaving(true);
    setSaveStatus("idle");
    try {
      await updateUsername(user.uid, profile.username ?? "", username);
      profile.username = username;
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2500);
    } catch (err) {
      console.error("[TikTag] Username save failed:", err);
      setSaveError("Failed to save. Try again.");
      setSaveStatus("error");
    } finally {
      setSaving(false);
    }
  };

  const handleExperienceSwitch = async (newType: UserType) => {
    if (newType === userType || switchingType) return;
    setSwitchingType(newType);
    try {
      await update({ userType: newType });
      toast.show(`Switched to ${newType.charAt(0).toUpperCase() + newType.slice(1)} experience`);
    } catch {
      // silent — profile update shows errors via BlockedBanner
    } finally {
      setSwitchingType(null);
    }
  };

  if (loading) return <PageSkeleton rows={4} />;

  const validationError = validateUsername(username);
  const isChanged = username !== (profile?.username ?? "");
  const canSave = !validationError && !saving && (!isChanged || available === true);
  const profileUrl = profile?.username ? `${BASE_URL}/u/${profile.username}` : null;

  return (
    <div style={{ padding: "32px 28px 64px", maxWidth: 680, position: "relative" }}>
      {/* Atmospheric glow */}
      <div style={{
        position: "absolute", top: 0, left: "10%", right: "40%", height: 240, zIndex: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 70% 50% at 30% 0%, rgba(88,28,235,0.06) 0%, transparent 70%)",
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        {error && <BlockedBanner errorType={error} onRetry={retry} />}

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spr }} style={{ marginBottom: 32 }}>
          <p style={{ color: "rgba(139,92,246,0.65)", fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", margin: "0 0 6px" }}>
            Account Settings
          </p>
          <h1 style={{ color: "rgba(255,255,255,0.94)", fontSize: "clamp(22px, 2.5vw, 28px)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.1, margin: 0 }}>
            Settings
          </h1>
          <p style={{ color: "rgba(255,255,255,0.28)", fontSize: 13, margin: "5px 0 0" }}>
            Manage your experience, identity, and account preferences.
          </p>
        </motion.div>

        {/* ── Experience Mode section ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spr, delay: 0.06 }} style={{ marginBottom: 24 }}>
          <SectionLabel>Experience Mode</SectionLabel>
          <div style={{
            borderRadius: 18,
            background: "linear-gradient(180deg, rgba(255,255,255,0.038) 0%, rgba(255,255,255,0.016) 100%)",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
            padding: "16px",
            overflow: "hidden",
          }}>
            <p style={{ color: "rgba(255,255,255,0.32)", fontSize: 12, lineHeight: 1.55, margin: "0 0 14px" }}>
              Choose the experience that matches your use case. Your sidebar, overview, and tools adapt instantly.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {EXPERIENCE_OPTIONS.map((opt, i) => {
                const active = userType === opt.type;
                const switching = switchingType === opt.type;
                const Icon = opt.icon;

                return (
                  <motion.button
                    key={opt.type}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...spr, delay: 0.1 + i * 0.04 }}
                    onClick={() => handleExperienceSwitch(opt.type)}
                    disabled={!!switchingType}
                    whileHover={{ scale: active ? 1 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      padding: "14px 12px",
                      borderRadius: 14,
                      border: active
                        ? `1px solid ${opt.color}40`
                        : "1px solid rgba(255,255,255,0.06)",
                      background: active
                        ? `linear-gradient(135deg, ${opt.color}18, ${opt.color}08)`
                        : "rgba(255,255,255,0.026)",
                      boxShadow: active
                        ? `0 4px 20px ${opt.color}18, inset 0 1px 0 ${opt.color}20`
                        : "none",
                      cursor: switchingType ? "default" : "pointer",
                      textAlign: "left",
                      position: "relative",
                      overflow: "hidden",
                      transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
                      opacity: switchingType && !active && switchingType !== opt.type ? 0.5 : 1,
                    }}
                  >
                    {/* Active check */}
                    {active && (
                      <div style={{
                        position: "absolute", top: 8, right: 8,
                        width: 16, height: 16, borderRadius: 6,
                        background: `${opt.color}28`, border: `1px solid ${opt.color}40`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <Check size={9} style={{ color: opt.color }} />
                      </div>
                    )}

                    {/* Spinner while switching */}
                    {switching && (
                      <div style={{
                        position: "absolute", top: 8, right: 8,
                        width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <Loader2 size={12} style={{ color: opt.color, animation: "spin 1s linear infinite" }} />
                      </div>
                    )}

                    <div style={{
                      width: 30, height: 30, borderRadius: 9, marginBottom: 10,
                      background: `${opt.color}18`, border: `1px solid ${opt.color}24`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Icon size={14} style={{ color: opt.color }} />
                    </div>
                    <p style={{
                      color: active ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.68)",
                      fontSize: 12, fontWeight: 600, margin: "0 0 2px",
                      letterSpacing: "-0.01em",
                    }}>
                      {opt.label}
                    </p>
                    <p style={{
                      color: active ? "rgba(255,255,255,0.38)" : "rgba(255,255,255,0.24)",
                      fontSize: 10, lineHeight: 1.4, margin: 0,
                    }}>
                      {opt.desc}
                    </p>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ── Identity section ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spr, delay: 0.14 }} style={{ marginBottom: 20 }}>
          <SectionLabel>Identity</SectionLabel>
          <div style={{
            borderRadius: 18,
            background: "linear-gradient(180deg, rgba(255,255,255,0.038) 0%, rgba(255,255,255,0.016) 100%)",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
            overflow: "hidden",
          }}>
            <FieldRow icon={AtSign} label="Username" accent="#8b5cf6">
              <div style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "9px 12px", borderRadius: 10,
                background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.07)",
              }}>
                <span style={{ color: "rgba(255,255,255,0.22)", fontSize: 13, fontWeight: 500, flexShrink: 0 }}>@</span>
                <input
                  value={username}
                  onChange={(e) => handleUsernameChange(e.target.value)}
                  placeholder="your-username"
                  style={{
                    flex: 1, background: "transparent", border: "none", outline: "none",
                    color: "rgba(255,255,255,0.88)", fontSize: 13, fontWeight: 500, minWidth: 0,
                  }}
                />
                {checking && <Loader2 size={14} style={{ color: "rgba(255,255,255,0.3)", flexShrink: 0, animation: "spin 1s linear infinite" }} />}
                {!checking && isChanged && !validationError && available === true && (
                  <CheckCircle2 size={14} style={{ color: "#4ade80", flexShrink: 0 }} />
                )}
                {!checking && isChanged && !validationError && available === false && (
                  <XCircle size={14} style={{ color: "#f87171", flexShrink: 0 }} />
                )}
              </div>
              {validationError && username && (
                <p style={{ color: "rgba(248,113,113,0.8)", fontSize: 11, marginTop: 6 }}>{validationError}</p>
              )}
              {!checking && isChanged && !validationError && available === false && (
                <p style={{ color: "rgba(248,113,113,0.8)", fontSize: 11, marginTop: 6 }}>Username already taken</p>
              )}
              {!checking && isChanged && !validationError && available === true && (
                <p style={{ color: "rgba(74,222,128,0.75)", fontSize: 11, marginTop: 6 }}>Username available</p>
              )}
            </FieldRow>

            <FieldRow icon={Globe} label="Public Profile URL" accent="#6366f1">
              {profileUrl ? (
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: "rgba(167,139,250,0.75)", fontSize: 13, fontWeight: 500, wordBreak: "break-all" }}>
                    {profileUrl}
                  </span>
                  <a href={`/u/${profile?.username}`} target="_blank" style={{ color: "rgba(139,92,246,0.5)", flexShrink: 0 }}>
                    <ExternalLink size={13} />
                  </a>
                </div>
              ) : (
                <p style={{ color: "rgba(255,255,255,0.22)", fontSize: 13 }}>
                  Claim a username to get your public profile link.
                </p>
              )}
            </FieldRow>
          </div>
        </motion.div>

        {/* ── Account section ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spr, delay: 0.2 }} style={{ marginBottom: 20 }}>
          <SectionLabel>Account</SectionLabel>
          <div style={{
            borderRadius: 18,
            background: "linear-gradient(180deg, rgba(255,255,255,0.038) 0%, rgba(255,255,255,0.016) 100%)",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
            overflow: "hidden",
          }}>
            <FieldRow icon={Mail} label="Email Address" accent="#60a5fa">
              <p style={{ color: "rgba(255,255,255,0.72)", fontSize: 13, fontWeight: 500, margin: 0 }}>{user?.email ?? "—"}</p>
              <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 11, margin: "3px 0 0" }}>Managed by your sign-in provider.</p>
            </FieldRow>

            <FieldRow icon={CreditCard} label="Current Plan" accent="#f59e0b">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                <div>
                  <p style={{ color: "rgba(255,255,255,0.82)", fontSize: 13, fontWeight: 600, margin: 0, textTransform: "capitalize" }}>
                    {profile?.plan ?? "Free"}
                  </p>
                  <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 11, margin: "3px 0 0" }}>
                    {profile?.plan === "pro" ? "Full access to all features." : "Core features included."}
                  </p>
                </div>
                {(!profile?.plan || profile.plan === "free") && (
                  <div style={{
                    display: "flex", alignItems: "center", gap: 5,
                    padding: "6px 12px", borderRadius: 8,
                    background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)",
                    color: "#fbbf24", fontSize: 11, fontWeight: 600,
                  }}>
                    <Zap size={11} />
                    Upgrade
                  </div>
                )}
              </div>
            </FieldRow>
          </div>
        </motion.div>

        {/* ── Save button ── */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spr, delay: 0.26 }} style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={handleSave}
            disabled={!canSave}
            style={{
              display: "flex", alignItems: "center", gap: 7,
              padding: "11px 24px", borderRadius: 12, cursor: canSave ? "pointer" : "default",
              background: saveStatus === "saved"
                ? "rgba(74,222,128,0.15)"
                : canSave
                  ? "linear-gradient(135deg, #8b5cf6, #6366f1)"
                  : "rgba(255,255,255,0.05)",
              border: saveStatus === "saved"
                ? "1px solid rgba(74,222,128,0.28)"
                : canSave
                  ? "1px solid rgba(139,92,246,0.3)"
                  : "1px solid rgba(255,255,255,0.07)",
              boxShadow: canSave && saveStatus !== "saved" ? "0 8px 28px rgba(139,92,246,0.28)" : "none",
              color: saveStatus === "saved" ? "#4ade80" : canSave ? "white" : "rgba(255,255,255,0.28)",
              fontSize: 13, fontWeight: 600, transition: "all 0.2s",
              opacity: saving ? 0.7 : 1,
            }}
          >
            {saving ? (
              <><Loader2 size={13} style={{ animation: "spin 1s linear infinite" }} /> Saving…</>
            ) : saveStatus === "saved" ? (
              <><CheckCircle2 size={13} /> Saved!</>
            ) : (
              "Save Changes"
            )}
          </button>
          {saveStatus === "error" && (
            <p style={{ color: "rgba(248,113,113,0.8)", fontSize: 12 }}>{saveError}</p>
          )}
        </motion.div>

        {/* ── More ── */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} style={{ marginTop: 40 }}>
          <SectionLabel>More</SectionLabel>
          <Link href="/dashboard/profile" style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "14px 18px", borderRadius: 14, textDecoration: "none",
            background: "linear-gradient(180deg, rgba(255,255,255,0.028) 0%, rgba(255,255,255,0.01) 100%)",
            border: "1px solid rgba(255,255,255,0.055)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
          }}>
            <div style={{
              width: 34, height: 34, borderRadius: 10, flexShrink: 0,
              background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.18)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <User size={14} style={{ color: "#a78bfa" }} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: "rgba(255,255,255,0.78)", fontSize: 13, fontWeight: 600, margin: 0 }}>Edit Profile</p>
              <p style={{ color: "rgba(255,255,255,0.28)", fontSize: 11, margin: "2px 0 0" }}>Name, bio, photo, links and more</p>
            </div>
            <ArrowRight size={13} style={{ color: "rgba(255,255,255,0.2)", flexShrink: 0 }} />
          </Link>
        </motion.div>
      </div>

      <Toast message={toast.message} onDismiss={toast.dismiss} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
