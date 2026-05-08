"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone, MessageCircle, Mail, UserPlus,
  Globe, MapPin, Building2, Share2, QrCode,
  ChevronRight, Link2, Download, ExternalLink, ChevronDown,
} from "lucide-react";
import { trackProfileView, trackButtonClick } from "@/lib/analytics";
import { generateVCard, downloadVCard } from "@/lib/utils";
import { getTheme } from "@/lib/themes";
import type { UserProfile, CustomLink } from "@/types";

// ─── Brand SVG paths ─────────────────────────────────────────────────────────

const PLATFORM_PATHS: Record<string, string> = {
  linkedin:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  instagram:
    "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z",
  facebook:
    "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  xTwitter:
    "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.73-8.835L1.254 2.25H8.08l4.26 5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  youtube:
    "M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z",
  tiktok:
    "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
};

const PLATFORM_COLORS: Record<string, string> = {
  linkedin: "#0a66c2",
  instagram: "#e1306c",
  facebook: "#1877f2",
  xTwitter: "#1d9bf0",
  youtube: "#ff0000",
  tiktok: "#fe2c55",
};

const PLATFORM_LABELS: Record<string, string> = {
  linkedin: "LinkedIn",
  instagram: "Instagram",
  facebook: "Facebook",
  xTwitter: "X",
  youtube: "YouTube",
  tiktok: "TikTok",
};

function PlatformSvg({ platform, size = 18 }: { platform: string; size?: number }) {
  const d = PLATFORM_PATHS[platform];
  if (!d) return <Globe width={size} height={size} />;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

function getLinkHref(link: CustomLink): string {
  switch (link.type) {
    case "call":     return `tel:${link.url}`;
    case "whatsapp": return `https://wa.me/${link.url.replace(/\D/g, "")}`;
    case "email":    return `mailto:${link.url}`;
    default:         return link.url;
  }
}

// ─── Inline QR renderer (dark on white) ─────────────────────────────────────

function ProfileQR({ url, username }: { url: string; username: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!ref.current || !url) return;
    import("qrcode").then((mod) => {
      (mod.default as typeof import("qrcode")).toCanvas(ref.current!, url, {
        width: 224,
        margin: 2,
        color: { dark: "#0a0a0a", light: "#ffffff" },
      });
    });
  }, [url]);
  const download = () => {
    if (!ref.current) return;
    const a = document.createElement("a");
    a.download = `tiktag-${username}.png`;
    a.href = ref.current.toDataURL();
    a.click();
  };
  return (
    <div className="flex flex-col items-center gap-3">
      <canvas ref={ref} className="rounded-xl block" />
      <button
        onClick={download}
        className="flex items-center gap-1.5 transition-colors"
        style={{ fontSize: "11px", color: "rgba(0,0,0,0.35)" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(0,0,0,0.65)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(0,0,0,0.35)")}
      >
        <Download className="w-3 h-3" /> Download PNG
      </button>
    </div>
  );
}

// ─── Skeleton ────────────────────────────────────────────────────────────────

function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-black">
      <div className="w-full h-[320px] animate-pulse" style={{ background: "rgba(255,255,255,0.04)" }} />
      <div className="max-w-[560px] mx-auto px-6 md:px-10">
        <div className="-mt-[76px] flex justify-center mb-8 relative z-10">
          <div className="w-[152px] h-[152px] rounded-full animate-pulse"
            style={{ background: "rgba(255,255,255,0.08)", border: "4px solid #000" }} />
        </div>
        <div className="flex flex-col items-center gap-3 mb-9">
          <div className="h-9 w-52 rounded-xl animate-pulse" style={{ background: "rgba(255,255,255,0.07)" }} />
          <div className="h-5 w-36 rounded-lg animate-pulse" style={{ background: "rgba(255,255,255,0.05)" }} />
          <div className="h-4 w-64 rounded-lg animate-pulse mt-2" style={{ background: "rgba(255,255,255,0.04)" }} />
          <div className="h-4 w-48 rounded-lg animate-pulse" style={{ background: "rgba(255,255,255,0.03)" }} />
        </div>
        <div className="space-y-3">
          <div className="h-[62px] rounded-2xl animate-pulse" style={{ background: "rgba(255,255,255,0.06)" }} />
          <div className="grid grid-cols-3 gap-3">
            {[0,1,2].map((i) => (
              <div key={i} className="h-[82px] rounded-2xl animate-pulse" style={{ background: "rgba(255,255,255,0.04)", opacity: 1 - i * 0.15 }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Fade-in-on-scroll section wrapper ──────────────────────────────────────

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Thin rule between major sections ────────────────────────────────────────

function Rule({ color }: { color: string }) {
  return (
    <div className="flex items-center gap-3 my-10">
      <div className="flex-1 h-px" style={{ background: color }} />
      <div className="w-1 h-1 rounded-full" style={{ background: color, opacity: 1.5 }} />
      <div className="flex-1 h-px" style={{ background: color }} />
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────

const BIO_LIMIT = 140;

export default function PublicProfileClient({
  username,
  profile: initialProfile,
}: {
  username?: string;
  profile?: UserProfile;
}) {
  const [profile, setProfile] = useState<UserProfile | null>(initialProfile ?? null);
  const [notFound, setNotFound] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [bioExpanded, setBioExpanded] = useState(false);

  useEffect(() => {
    if (profile || !username) return;
    import("@/lib/firestore").then(({ getProfileByUsername }) =>
      getProfileByUsername(username)
        .then((p) => { if (p) setProfile(p as UserProfile); else setNotFound(true); })
        .catch(() => setNotFound(true))
    );
  }, [username, profile]);

  const profileUid = profile?.uid;
  useEffect(() => {
    if (!profileUid) return;
    trackProfileView(profileUid);
  }, [profileUid]);

  if (notFound) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center" style={{ background: "#050505" }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="w-20 h-20 rounded-[28px] flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <QrCode className="w-9 h-9" style={{ color: "rgba(255,255,255,0.18)" }} />
        </div>
        <p className="text-white text-xl font-semibold tracking-tight">Profile not found</p>
        <p className="text-sm max-w-[260px] leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
          This link may be inactive or the username has changed.
        </p>
      </motion.div>
    </div>
  );

  if (!profile) return <ProfileSkeleton />;

  const theme = getTheme(profile.theme);
  const profileUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://tiktag.pages.dev/u/${profile.username}`;

  const handleAction = (label: string, href: string) => {
    trackButtonClick(profile.uid, label);
    window.location.href = href;
  };

  const handleSaveContact = () => {
    trackButtonClick(profile.uid, "Save Contact");
    downloadVCard(
      generateVCard({
        displayName: profile.displayName,
        title: profile.title,
        email: profile.email,
        phone: profile.phone,
        whatsapp: profile.whatsapp,
        website: profile.website || profile.companyWebsite,
        companyName: profile.companyName,
        location: profile.location,
      }),
      profile.displayName
    );
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: profile.displayName, url: profileUrl });
    } else {
      navigator.clipboard.writeText(profileUrl);
    }
  };

  const socialEntries = (["linkedin", "instagram", "facebook", "xTwitter", "tiktok", "youtube"] as const)
    .map((key) => ({ platform: key as string, url: profile[key] ?? "" }))
    .filter((s) => !!s.url);
  const legacySocials = (profile.socials || []).filter(
    (s) => !socialEntries.find((e) => e.platform === s.platform.toLowerCase())
  );
  const allSocials = [
    ...socialEntries,
    ...legacySocials.map((s) => ({ platform: s.platform.toLowerCase(), url: s.url })),
  ];

  const enabledLinks = (profile.links || []).filter((l) => l.enabled !== false);
  const hasCover = !!profile.coverPhotoUrl;
  const longBio = !!profile.bio && profile.bio.length > BIO_LIMIT;
  const bioText = longBio && !bioExpanded ? profile.bio!.slice(0, BIO_LIMIT) + "…" : profile.bio;

  const contactTiles: { label: string; href: string; icon: React.ReactNode }[] = [
    ...(profile.phone    ? [{ label: "Call",      href: `tel:${profile.phone}`,                                           icon: <Phone         className="w-5 h-5" style={{ color: theme.accent }} /> }] : []),
    ...(profile.whatsapp ? [{ label: "WhatsApp",  href: `https://wa.me/${profile.whatsapp.replace(/\D/g, "")}`,           icon: <MessageCircle className="w-5 h-5" style={{ color: "#25d366" }} /> }] : []),
    ...(profile.email    ? [{ label: "Email",     href: `mailto:${profile.email}`,                                        icon: <Mail          className="w-5 h-5" style={{ color: theme.accent }} /> }] : []),
  ];

  const secondaryTiles: { label: string; href: string; icon: React.ReactNode }[] = [
    ...(profile.linkedin ? [{ label: "LinkedIn", href: profile.linkedin, icon: <PlatformSvg platform="linkedin" size={16} /> }] : []),
    ...(profile.website  ? [{ label: "Website",  href: profile.website,  icon: <Globe className="w-4 h-4 shrink-0" style={{ color: theme.accent }} /> }] : []),
  ];

  const tilesCols = (n: number) => n === 1 ? "grid-cols-1" : n === 2 ? "grid-cols-2" : "grid-cols-3";

  return (
    <div className="min-h-screen" style={{ background: theme.background }}>

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <div className="relative w-full overflow-hidden" style={{ height: "320px" }}>
        {hasCover ? (
          <>
            <Image src={profile.coverPhotoUrl!} alt="Cover" fill className="object-cover" priority unoptimized />
            {/* 3-layer cinematic gradient */}
            <div className="absolute inset-0" style={{
              background: `linear-gradient(to bottom,
                rgba(0,0,0,0.05) 0%,
                rgba(0,0,0,0.18) 40%,
                rgba(0,0,0,0.55) 75%,
                ${theme.background} 100%)`,
            }} />
          </>
        ) : (
          <>
            {/* Base surface */}
            <div className="absolute inset-0" style={{ background: theme.surface }} />
            {/* Radial accent glow */}
            <div className="absolute inset-0" style={{
              background: `radial-gradient(ellipse 130% 100% at 50% -10%, ${theme.accent}30 0%, transparent 58%),
                           radial-gradient(ellipse 70% 60% at 80% 90%, ${theme.accent}0d 0%, transparent 55%)`,
            }} />
            {/* Animated breathing glow */}
            <motion.div
              className="absolute inset-0"
              animate={{ opacity: [0.25, 0.55, 0.25] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{
                background: `radial-gradient(ellipse 70% 55% at 50% 0%, ${theme.accent}22 0%, transparent 60%)`,
              }}
            />
            {/* Top accent edge line */}
            <div className="absolute top-0 left-0 right-0 h-px" style={{
              background: `linear-gradient(90deg, transparent 0%, ${theme.accent}55 35%, ${theme.accent}70 50%, ${theme.accent}55 65%, transparent 100%)`,
            }} />
            {/* Large faint monogram fills the empty space */}
            {profile.displayName && (
              <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden">
                <span className="font-black uppercase leading-none"
                  style={{ fontSize: "clamp(160px, 50vw, 260px)", color: `${theme.accent}07`, letterSpacing: "-0.06em" }}>
                  {profile.displayName[0]}
                </span>
              </div>
            )}
          </>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════
          CONTENT CONTAINER
      ══════════════════════════════════════════════════════ */}
      <div className="max-w-[560px] mx-auto px-6 md:px-10 pb-32">

        {/* ── Avatar ────────────────────────────────────── */}
        <motion.div
          className="flex justify-center -mt-[76px] mb-8 relative z-10"
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <div
            className="relative overflow-hidden flex items-center justify-center"
            style={{
              width: 152, height: 152, borderRadius: "50%",
              border: `4px solid ${theme.background}`,
              boxShadow: `0 0 0 1.5px ${theme.accent}55,
                          0 16px 56px rgba(0,0,0,0.65),
                          0 0 100px ${theme.accent}16`,
              background: `${theme.accent}18`,
            }}
          >
            {profile.photoURL ? (
              <Image src={profile.photoURL} alt={profile.displayName || "Profile"} fill className="object-cover" unoptimized />
            ) : (
              <span className="font-bold select-none" style={{ fontSize: 54, color: theme.accent }}>
                {profile.displayName?.[0]?.toUpperCase() || "?"}
              </span>
            )}
          </div>
        </motion.div>

        {/* ── Identity ──────────────────────────────────── */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1
            className="font-bold tracking-tight leading-[1.1]"
            style={{ fontSize: "clamp(30px, 7.5vw, 38px)", color: theme.text, letterSpacing: "-0.025em" }}
          >
            {profile.displayName || "—"}
          </h1>

          {profile.title && (
            <p className="mt-3 font-medium" style={{ fontSize: "16px", color: theme.subtext }}>
              {profile.title}
            </p>
          )}

          {profile.location && (
            <div className="flex justify-center mt-4">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5"
                style={{
                  fontSize: "11.5px",
                  background: `${theme.accent}12`,
                  border: `1px solid ${theme.accent}28`,
                  color: theme.subtext,
                }}
              >
                <MapPin className="w-3 h-3 shrink-0" style={{ color: theme.accent }} />
                {profile.location}
              </span>
            </div>
          )}

          {profile.bio && (
            <div className="mt-6 mb-1">
              <p
                className="max-w-sm mx-auto"
                style={{ fontSize: "15px", lineHeight: "1.85", color: theme.subtext }}
              >
                {bioText}
              </p>
              {longBio && (
                <button
                  onClick={() => setBioExpanded((v) => !v)}
                  className="inline-flex items-center gap-1 mt-2 transition-opacity hover:opacity-70"
                  style={{ fontSize: "12px", color: theme.accent }}
                >
                  {bioExpanded ? "Show less" : "Show more"}
                  <motion.span animate={{ rotate: bioExpanded ? 180 : 0 }} transition={{ duration: 0.25 }}>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </motion.span>
                </button>
              )}
            </div>
          )}
        </motion.div>

        {/* ── Action Zone ───────────────────────────────── */}
        <motion.div
          className="mt-10 space-y-3"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Primary CTA */}
          <motion.button
            whileTap={{ scale: 0.982 }}
            onClick={handleSaveContact}
            className="w-full flex items-center justify-center gap-3 rounded-[18px] font-semibold text-white"
            style={{
              padding: "20px 28px",
              fontSize: "17px",
              letterSpacing: "-0.015em",
              background: `linear-gradient(135deg, ${theme.accent} 0%, ${theme.accent}cc 100%)`,
              boxShadow: `0 8px 32px ${theme.accent}40, 0 1px 0 rgba(255,255,255,0.14) inset, 0 -1px 0 rgba(0,0,0,0.1) inset`,
            }}
          >
            <UserPlus className="w-[18px] h-[18px] shrink-0" />
            Save Contact
          </motion.button>

          {/* Contact tiles */}
          {contactTiles.length > 0 && (
            <div className={`grid gap-3 ${tilesCols(contactTiles.length)}`}>
              {contactTiles.map(({ label, href, icon }) => (
                <motion.button
                  key={label}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAction(label, href)}
                  className="flex flex-col items-center gap-[9px] rounded-[16px] font-medium transition-opacity hover:opacity-80"
                  style={{
                    padding: "18px 14px",
                    background: theme.buttonBg,
                    border: `1px solid ${theme.border}`,
                    color: theme.text,
                    fontSize: "13px",
                    letterSpacing: "0.01em",
                  }}
                >
                  {icon}
                  {label}
                </motion.button>
              ))}
            </div>
          )}

          {/* Secondary tiles */}
          {secondaryTiles.length > 0 && (
            <div className={`grid gap-3 ${tilesCols(secondaryTiles.length)}`}>
              {secondaryTiles.map(({ label, href, icon }) => (
                <motion.button
                  key={label}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAction(label, href)}
                  className="flex items-center justify-center gap-2.5 rounded-[16px] font-medium transition-opacity hover:opacity-80"
                  style={{
                    padding: "16px 24px",
                    background: theme.buttonBg,
                    border: `1px solid ${theme.border}`,
                    color: theme.text,
                    fontSize: "14px",
                  }}
                >
                  <span style={{ color: label === "LinkedIn" ? "#0a66c2" : theme.accent }}>
                    {icon}
                  </span>
                  {label}
                </motion.button>
              ))}
            </div>
          )}
        </motion.div>

        {/* ══════════════════════════════════════════════
            COMPANY SECTION
        ══════════════════════════════════════════════ */}
        {profile.companyName && (
          <>
            <Rule color={theme.border} />
            <Reveal>
              <motion.div
                whileHover={{ scale: 1.005 }}
                transition={{ duration: 0.2 }}
                className="rounded-[22px] overflow-hidden"
                style={{
                  background: `linear-gradient(145deg, ${theme.accent}09 0%, transparent 55%), ${theme.surface}`,
                  border: `1px solid ${theme.border}`,
                  boxShadow: `0 4px 28px rgba(0,0,0,0.18), 0 1px 0 rgba(255,255,255,0.03) inset`,
                }}
              >
                {/* Accent top edge */}
                <div className="h-[2px]" style={{
                  background: `linear-gradient(90deg, transparent, ${theme.accent}50, transparent)`,
                }} />

                <div className="p-7">
                  <div className="flex items-start gap-4">
                    {/* Logo */}
                    <div
                      className="flex-shrink-0 rounded-[16px] overflow-hidden flex items-center justify-center"
                      style={{
                        width: 68, height: 68,
                        background: theme.buttonBg,
                        border: `1px solid ${theme.border}`,
                        boxShadow: `0 2px 12px rgba(0,0,0,0.2)`,
                      }}
                    >
                      {profile.companyLogoUrl ? (
                        <Image src={profile.companyLogoUrl} alt={profile.companyName} width={68} height={68}
                          className="w-full h-full object-contain p-2" unoptimized />
                      ) : (
                        <Building2 className="w-6 h-6" style={{ color: theme.subtext }} />
                      )}
                    </div>

                    {/* Company info */}
                    <div className="flex-1 min-w-0 pt-0.5">
                      <p className="font-bold leading-tight" style={{ fontSize: "17px", color: theme.text, letterSpacing: "-0.02em" }}>
                        {profile.companyName}
                      </p>
                      {profile.companyIndustry && (
                        <span
                          className="inline-flex items-center mt-1.5 rounded-full px-2.5 py-0.5"
                          style={{
                            fontSize: "10.5px",
                            fontWeight: 600,
                            background: `${theme.accent}16`,
                            border: `1px solid ${theme.accent}30`,
                            color: theme.accent,
                            letterSpacing: "0.02em",
                          }}
                        >
                          {profile.companyIndustry}
                        </span>
                      )}
                    </div>
                  </div>

                  {profile.companyDescription && (
                    <p className="mt-4 leading-relaxed" style={{ fontSize: "13.5px", color: theme.subtext, lineHeight: 1.75 }}>
                      {profile.companyDescription}
                    </p>
                  )}

                  {profile.companyWebsite && !profile.companyDescription && (
                    <div className="mt-3 flex items-center gap-1.5" style={{ color: theme.subtext, fontSize: "12px" }}>
                      <Globe className="w-3 h-3 shrink-0" />
                      <span className="truncate">{profile.companyWebsite.replace(/^https?:\/\//, "")}</span>
                    </div>
                  )}
                </div>

                {/* Visit website CTA */}
                {profile.companyWebsite && (
                  <a
                    href={profile.companyWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackButtonClick(profile.uid, "Company Website")}
                    className="flex items-center justify-between px-5 py-3.5 transition-opacity hover:opacity-70"
                    style={{ borderTop: `1px solid ${theme.border}`, color: theme.accent, fontSize: "13px", fontWeight: 500 }}
                  >
                    <span>Visit Website</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  </a>
                )}
              </motion.div>
            </Reveal>
          </>
        )}

        {/* ══════════════════════════════════════════════
            SOCIAL PRESENCE
        ══════════════════════════════════════════════ */}
        {allSocials.length > 0 && (
          <>
            <Rule color={theme.border} />
            <Reveal>
              <div className="flex flex-col items-center gap-6">
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em]" style={{ color: `${theme.subtext}60` }}>
                  Find me online
                </p>
                {/* Social pods grid — max 3 per row */}
                <div
                  className="grid gap-x-8 gap-y-7 w-full"
                  style={{
                    gridTemplateColumns: allSocials.length <= 2
                      ? `repeat(${allSocials.length}, auto)`
                      : "repeat(3, auto)",
                    justifyContent: "center",
                  }}
                >
                  {allSocials.map(({ platform, url }, i) => {
                    const brandColor = PLATFORM_COLORS[platform] || theme.accent;
                    const label = PLATFORM_LABELS[platform] || platform;
                    return (
                      <motion.div
                        key={platform}
                        className="flex flex-col items-center gap-2"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.04 + i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <motion.a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackButtonClick(profile.uid, platform)}
                          whileHover={{ scale: 1.12, y: -3 }}
                          whileTap={{ scale: 0.9 }}
                          className="flex items-center justify-center rounded-full"
                          style={{
                            width: 60, height: 60,
                            background: `${brandColor}1c`,
                            border: `1.5px solid ${brandColor}35`,
                            color: brandColor,
                            boxShadow: `0 3px 16px ${brandColor}25`,
                          }}
                          aria-label={label}
                        >
                          <PlatformSvg platform={platform} size={22} />
                        </motion.a>
                        <span className="font-medium" style={{ fontSize: "10.5px", color: `${theme.subtext}80`, letterSpacing: "0.01em" }}>
                          {label}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </>
        )}

        {/* ══════════════════════════════════════════════
            CUSTOM LINKS
        ══════════════════════════════════════════════ */}
        {enabledLinks.length > 0 && (
          <>
            <Rule color={theme.border} />
            <div className="space-y-2.5">
              {enabledLinks.map((link, i) => (
                <Reveal key={link.id} delay={i * 0.05}>
                  <motion.button
                    whileTap={{ scale: 0.985 }}
                    onClick={() => handleAction(link.label, getLinkHref(link))}
                    className="w-full flex items-center gap-4 rounded-[16px] text-left group transition-all hover:opacity-85"
                    style={{
                      padding: "18px 24px",
                      background: theme.buttonBg,
                      border: `1px solid ${theme.border}`,
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${theme.accent}14`, border: `1px solid ${theme.accent}22` }}
                    >
                      {link.type === "call"     ? <Phone className="w-4 h-4" style={{ color: theme.accent }} />
                      : link.type === "whatsapp" ? <MessageCircle className="w-4 h-4" style={{ color: "#25d366" }} />
                      : link.type === "email"    ? <Mail className="w-4 h-4" style={{ color: theme.accent }} />
                      :                            <Link2 className="w-4 h-4" style={{ color: theme.accent }} />}
                    </div>
                    <span className="flex-1 font-medium" style={{ fontSize: "15px", color: theme.text }}>
                      {link.label}
                    </span>
                    <ChevronRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5" style={{ color: theme.subtext, opacity: 0.4 }} />
                  </motion.button>
                </Reveal>
              ))}
            </div>
          </>
        )}

        {/* ══════════════════════════════════════════════
            CONNECT / QR SECTION
        ══════════════════════════════════════════════ */}
        <Rule color={theme.border} />
        <Reveal>
          <div className="rounded-[22px] overflow-hidden" style={{
            background: theme.surface,
            border: `1px solid ${theme.border}`,
          }}>
            {/* Share + QR toggle row */}
            <div className="grid grid-cols-2" style={{ borderBottom: `1px solid ${theme.border}` }}>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleShare}
                className="flex items-center justify-center gap-2.5 transition-opacity hover:opacity-75"
                style={{
                  padding: "19px",
                  color: theme.subtext,
                  fontSize: "13.5px",
                  fontWeight: 500,
                  borderRight: `1px solid ${theme.border}`,
                }}
              >
                <Share2 className="w-[15px] h-[15px]" />
                Share Profile
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowQR((v) => !v)}
                className="flex items-center justify-center gap-2.5 transition-all hover:opacity-80"
                style={{
                  padding: "19px",
                  background: showQR ? `${theme.accent}14` : "transparent",
                  color: showQR ? theme.accent : theme.subtext,
                  fontSize: "13.5px",
                  fontWeight: 500,
                }}
              >
                <QrCode className="w-[15px] h-[15px]" />
                Scan QR Code
              </motion.button>
            </div>

            {/* QR reveal */}
            <AnimatePresence>
              {showQR && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col items-center px-6 py-8 gap-5">
                    {/* White QR card */}
                    <div
                      className="rounded-[22px] overflow-hidden bg-white"
                      style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.3), 0 4px 20px rgba(0,0,0,0.15)" }}
                    >
                      <div className="px-6 pt-5 pb-1">
                        <p className="text-center font-bold text-gray-400 uppercase"
                          style={{ fontSize: "10px", letterSpacing: "0.15em" }}>
                          Scan to Connect
                        </p>
                      </div>
                      <div className="flex justify-center px-6 py-3">
                        <ProfileQR url={profileUrl} username={profile.username || "profile"} />
                      </div>
                      <div className="px-6 pb-5">
                        <p className="text-center truncate" style={{ fontSize: "10.5px", color: "rgba(0,0,0,0.3)" }}>
                          {profileUrl}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>

        {/* Watermark */}
        <p className="text-center mt-8 pb-2" style={{ fontSize: "11px", color: `${theme.subtext}35` }}>
          Powered by <span style={{ color: theme.accent, opacity: 0.5 }}>TikTag</span>
        </p>

      </div>
    </div>
  );
}
