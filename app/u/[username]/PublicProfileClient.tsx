"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone, MessageCircle, Mail, UserPlus,
  Globe, MapPin, Building2, Share2, QrCode, Link2,
  ExternalLink, ChevronRight,
} from "lucide-react";
import { trackProfileView, trackButtonClick } from "@/lib/analytics";
import { generateVCard, downloadVCard } from "@/lib/utils";
import { getTheme } from "@/lib/themes";
import QRCodeDisplay from "@/components/profile/QRCodeDisplay";
import type { UserProfile, CustomLink } from "@/types";

// ─── Brand SVG icons (24×24, fill="currentColor") ───────────────────────────

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

function PlatformSvg({ platform, size = 16 }: { platform: string; size?: number }) {
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
    case "call": return `tel:${link.url}`;
    case "whatsapp": return `https://wa.me/${link.url.replace(/\D/g, "")}`;
    case "email": return `mailto:${link.url}`;
    default: return link.url;
  }
}

function getLinkIcon(type: CustomLink["type"], accent: string) {
  const cls = "w-4 h-4 shrink-0";
  const style = { color: accent };
  switch (type) {
    case "call": return <Phone className={cls} style={style} />;
    case "whatsapp": return <MessageCircle className={cls} style={{ color: "#25d366" }} />;
    case "email": return <Mail className={cls} style={style} />;
    default: return <Link2 className={cls} style={style} />;
  }
}

// ─── Loading skeleton ────────────────────────────────────────────────────────

function ProfileSkeleton() {
  const pulse = "animate-pulse rounded-xl";
  return (
    <div className="min-h-screen bg-black">
      <div className="w-full h-52 bg-white/[0.05] animate-pulse" />
      <div className="max-w-[390px] mx-auto px-5 -mt-14">
        <div className="w-28 h-28 rounded-full bg-white/[0.08] animate-pulse mb-4 border-2 border-white/10" />
        <div className="flex flex-col items-center gap-2 mb-8">
          <div className={`h-6 w-44 bg-white/[0.07] ${pulse}`} />
          <div className={`h-4 w-32 bg-white/[0.05] ${pulse}`} />
          <div className={`h-3 w-24 bg-white/[0.04] ${pulse} mt-1`} />
        </div>
        <div className="space-y-2">
          <div className={`h-12 w-full bg-white/[0.05] ${pulse}`} />
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => <div key={i} className={`h-16 bg-white/[0.04] ${pulse}`} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

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
    <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-3 px-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center mb-2">
        <QrCode className="w-7 h-7 text-white/20" />
      </div>
      <p className="text-white font-medium">Profile not found</p>
      <p className="text-white/35 text-sm">This link may be inactive or the username has changed.</p>
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

  const socialEntries = (
    ["linkedin", "instagram", "facebook", "xTwitter", "tiktok", "youtube"] as const
  )
    .map((key) => ({ platform: key as string, url: profile[key] ?? "" }))
    .filter((s) => !!s.url);

  const legacySocials = (profile.socials || []).filter(
    (s) => !socialEntries.find((e) => e.platform === s.platform.toLowerCase())
  );

  const enabledLinks = (profile.links || []).filter((l) => l.enabled !== false);
  const hasCover = !!profile.coverPhotoUrl;

  const btnBase: React.CSSProperties = {
    background: theme.buttonBg,
    border: `1px solid ${theme.border}`,
    color: theme.text,
  };

  return (
    <div className="min-h-screen flex flex-col items-center" style={{ background: theme.background }}>

      {/* ── Cover photo ─────────────────────────────── */}
      {hasCover && (
        <div className="w-full h-52 relative shrink-0">
          <Image
            src={profile.coverPhotoUrl!}
            alt="Cover"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(to bottom, transparent 40%, ${theme.background} 100%)` }}
          />
        </div>
      )}

      {/* ── Profile content ─────────────────────────── */}
      <div
        className="w-full max-w-[390px] px-5 pb-20"
        style={{ marginTop: hasCover ? "-3.5rem" : "3rem" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >

          {/* ── Avatar + identity ─────────────────────── */}
          <div className="flex flex-col items-center text-center mb-7">
            <div
              className="w-28 h-28 rounded-full overflow-hidden flex items-center justify-center mb-4 shrink-0"
              style={{
                border: `3px solid ${theme.accent}`,
                background: `${theme.accent}18`,
                boxShadow: `0 0 0 6px ${theme.accent}12`,
              }}
            >
              {profile.photoURL ? (
                <Image
                  src={profile.photoURL}
                  alt={profile.displayName || "Profile"}
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              ) : (
                <span className="text-3xl font-bold" style={{ color: theme.accent }}>
                  {profile.displayName?.[0]?.toUpperCase() || "?"}
                </span>
              )}
            </div>

            <h1 className="text-2xl font-bold leading-tight" style={{ color: theme.text }}>
              {profile.displayName || "—"}
            </h1>

            {profile.title && (
              <p className="text-sm mt-1" style={{ color: theme.subtext }}>
                {profile.title}
              </p>
            )}

            {profile.location && (
              <span
                className="inline-flex items-center gap-1 text-xs mt-2 px-2.5 py-1 rounded-full"
                style={{ background: `${theme.accent}12`, color: theme.subtext }}
              >
                <MapPin className="w-3 h-3" />
                {profile.location}
              </span>
            )}

            {profile.bio && (
              <p
                className="text-sm mt-4 leading-relaxed max-w-[300px]"
                style={{ color: theme.subtext }}
              >
                {profile.bio}
              </p>
            )}
          </div>

          {/* ── Action buttons ────────────────────────── */}
          <div className="space-y-2.5 mb-5">

            {/* Save Contact — always primary CTA */}
            <button
              onClick={handleSaveContact}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl text-sm font-semibold transition-opacity hover:opacity-85 active:scale-[0.98]"
              style={{
                background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent}cc)`,
                color: "#fff",
                boxShadow: `0 4px 20px ${theme.accent}30`,
              }}
            >
              <UserPlus className="w-4 h-4" />
              Save Contact
            </button>

            {/* Call / WhatsApp / Email — icon-tile row */}
            {(profile.phone || profile.whatsapp || profile.email) && (
              <div className="flex gap-2">
                {profile.phone && (
                  <button
                    onClick={() => handleAction("Call", `tel:${profile.phone}`)}
                    className="flex-1 flex flex-col items-center gap-1.5 py-3.5 rounded-2xl text-xs font-medium transition-opacity hover:opacity-80 active:scale-[0.97]"
                    style={btnBase}
                  >
                    <Phone className="w-5 h-5" style={{ color: theme.accent }} />
                    Call
                  </button>
                )}
                {profile.whatsapp && (
                  <button
                    onClick={() => handleAction("WhatsApp", `https://wa.me/${profile.whatsapp.replace(/\D/g, "")}`)}
                    className="flex-1 flex flex-col items-center gap-1.5 py-3.5 rounded-2xl text-xs font-medium transition-opacity hover:opacity-80 active:scale-[0.97]"
                    style={btnBase}
                  >
                    <MessageCircle className="w-5 h-5" style={{ color: "#25d366" }} />
                    WhatsApp
                  </button>
                )}
                {profile.email && (
                  <button
                    onClick={() => handleAction("Email", `mailto:${profile.email}`)}
                    className="flex-1 flex flex-col items-center gap-1.5 py-3.5 rounded-2xl text-xs font-medium transition-opacity hover:opacity-80 active:scale-[0.97]"
                    style={btnBase}
                  >
                    <Mail className="w-5 h-5" style={{ color: theme.accent }} />
                    Email
                  </button>
                )}
              </div>
            )}

            {/* LinkedIn / Website — secondary row */}
            {(profile.linkedin || profile.website) && (
              <div className="flex gap-2">
                {profile.linkedin && (
                  <button
                    onClick={() => handleAction("LinkedIn", profile.linkedin!)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-medium transition-opacity hover:opacity-80 active:scale-[0.97]"
                    style={btnBase}
                  >
                    <PlatformSvg platform="linkedin" size={15} />
                    <span style={{ color: theme.text }}>LinkedIn</span>
                  </button>
                )}
                {profile.website && (
                  <button
                    onClick={() => handleAction("Website", profile.website!)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-medium transition-opacity hover:opacity-80 active:scale-[0.97]"
                    style={btnBase}
                  >
                    <Globe className="w-4 h-4" style={{ color: theme.accent }} />
                    <span style={{ color: theme.text }}>Website</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* ── Company card ──────────────────────────── */}
          {profile.companyName && (
            <div
              className="flex items-center gap-3 p-3.5 rounded-2xl mb-5"
              style={{ background: theme.surface, border: `1px solid ${theme.border}` }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 overflow-hidden"
                style={{ background: theme.buttonBg }}
              >
                {profile.companyLogoUrl ? (
                  <Image
                    src={profile.companyLogoUrl}
                    alt={profile.companyName}
                    width={40}
                    height={40}
                    className="w-full h-full object-contain"
                    unoptimized
                  />
                ) : (
                  <Building2 className="w-5 h-5" style={{ color: theme.subtext }} />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold truncate" style={{ color: theme.text }}>
                  {profile.companyName}
                </p>
                {profile.companyWebsite && (
                  <a
                    href={profile.companyWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackButtonClick(profile.uid, "Company Website")}
                    className="text-xs truncate block mt-0.5 hover:opacity-70 transition-opacity"
                    style={{ color: theme.accent }}
                  >
                    {profile.companyWebsite.replace(/^https?:\/\//, "")}
                  </a>
                )}
              </div>
              <ExternalLink className="w-4 h-4 shrink-0" style={{ color: theme.subtext }} />
            </div>
          )}

          {/* ── Social platform icons ─────────────────── */}
          {(socialEntries.length > 0 || legacySocials.length > 0) && (
            <div className="flex flex-wrap justify-center gap-2.5 mb-5">
              {socialEntries.map(({ platform, url }) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackButtonClick(profile.uid, platform)}
                  className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                  style={{
                    background: `${PLATFORM_COLORS[platform] || theme.accent}18`,
                    border: `1px solid ${PLATFORM_COLORS[platform] || theme.accent}30`,
                    color: PLATFORM_COLORS[platform] || theme.accent,
                  }}
                  aria-label={platform}
                >
                  <PlatformSvg platform={platform} size={17} />
                </a>
              ))}
              {legacySocials.map((s) => {
                const p = s.platform.toLowerCase();
                return (
                  <a
                    key={s.id}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackButtonClick(profile.uid, p)}
                    className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                    style={{
                      background: `${PLATFORM_COLORS[p] || theme.accent}18`,
                      border: `1px solid ${PLATFORM_COLORS[p] || theme.accent}30`,
                      color: PLATFORM_COLORS[p] || theme.accent,
                    }}
                    aria-label={p}
                  >
                    <PlatformSvg platform={p} size={17} />
                  </a>
                );
              })}
            </div>
          )}

          {/* ── Custom links ──────────────────────────── */}
          {enabledLinks.length > 0 && (
            <div className="space-y-2 mb-5">
              {enabledLinks.map((link) => (
                <motion.button
                  key={link.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAction(link.label, getLinkHref(link))}
                  className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm transition-opacity hover:opacity-80"
                  style={btnBase}
                >
                  {getLinkIcon(link.type, theme.accent)}
                  <span className="flex-1 text-left font-medium" style={{ color: theme.text }}>
                    {link.label}
                  </span>
                  <ChevronRight className="w-4 h-4 shrink-0" style={{ color: theme.subtext }} />
                </motion.button>
              ))}
            </div>
          )}

          {/* ── Footer actions ────────────────────────── */}
          <div className="flex items-center justify-center gap-6 mt-4 mb-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 text-xs transition-opacity hover:opacity-60"
              style={{ color: theme.subtext }}
            >
              <Share2 className="w-3.5 h-3.5" />
              Share
            </button>
            <button
              onClick={() => setShowQR((v) => !v)}
              className="flex items-center gap-1.5 text-xs transition-opacity hover:opacity-60"
              style={{ color: theme.subtext }}
            >
              <QrCode className="w-3.5 h-3.5" />
              {showQR ? "Hide QR" : "Show QR"}
            </button>
          </div>

          <AnimatePresence>
            {showQR && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex justify-center overflow-hidden mt-3"
              >
                <div className="p-4 rounded-2xl bg-white shadow-lg">
                  <QRCodeDisplay url={profileUrl} username={profile.username} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-center text-xs mt-10" style={{ color: `${theme.subtext}44` }}>
            Powered by TikTag
          </p>

        </motion.div>
      </div>
    </div>
  );
}
