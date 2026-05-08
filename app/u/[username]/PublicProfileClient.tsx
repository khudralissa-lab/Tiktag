"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone, MessageCircle, Mail, UserPlus,
  Globe, MapPin, Building2, Share2, QrCode,
  ChevronRight, Link2, Download, ExternalLink,
} from "lucide-react";
import { trackProfileView, trackButtonClick } from "@/lib/analytics";
import { generateVCard, downloadVCard } from "@/lib/utils";
import { getTheme } from "@/lib/themes";
import type { UserProfile, CustomLink } from "@/types";

// ─── Platform brand icons ────────────────────────────────────────────────────

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
    case "call":      return `tel:${link.url}`;
    case "whatsapp":  return `https://wa.me/${link.url.replace(/\D/g, "")}`;
    case "email":     return `mailto:${link.url}`;
    default:          return link.url;
  }
}

// ─── Inline QR (dark on white for the profile card) ─────────────────────────

function ProfileQR({ url, username }: { url: string; username: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!ref.current || !url) return;
    import("qrcode").then((mod) => {
      (mod.default as typeof import("qrcode")).toCanvas(ref.current!, url, {
        width: 200,
        margin: 2,
        color: { dark: "#111111", light: "#ffffff" },
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
        className="flex items-center gap-1.5 text-[11px] text-gray-400 hover:text-gray-600 transition-colors"
      >
        <Download className="w-3 h-3" /> Download
      </button>
    </div>
  );
}

// ─── Loading skeleton ────────────────────────────────────────────────────────

function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-black">
      <div className="w-full h-72 animate-pulse" style={{ background: "rgba(255,255,255,0.04)" }} />
      <div className="max-w-[480px] mx-auto px-5">
        <div className="-mt-16 flex justify-center mb-6 relative z-10">
          <div
            className="w-32 h-32 rounded-full animate-pulse"
            style={{ background: "rgba(255,255,255,0.08)", border: "4px solid #000" }}
          />
        </div>
        <div className="flex flex-col items-center gap-3 mb-10">
          <div className="h-9 w-52 rounded-xl animate-pulse" style={{ background: "rgba(255,255,255,0.07)" }} />
          <div className="h-5 w-40 rounded-lg animate-pulse" style={{ background: "rgba(255,255,255,0.05)" }} />
        </div>
        <div className="space-y-3">
          <div className="h-[58px] rounded-2xl animate-pulse" style={{ background: "rgba(255,255,255,0.05)" }} />
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-[76px] rounded-2xl animate-pulse" style={{ background: "rgba(255,255,255,0.04)" }} />
            ))}
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
    <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4 px-6 text-center">
      <div
        className="w-20 h-20 rounded-3xl flex items-center justify-center mb-2"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <QrCode className="w-8 h-8 text-white/20" />
      </div>
      <p className="text-white text-xl font-semibold">Profile not found</p>
      <p className="text-white/35 text-sm max-w-xs leading-relaxed">
        This link may be inactive or the username has changed.
      </p>
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

  // Build social list
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

  // Contact action tiles
  const contactTiles: { label: string; href: string; icon: React.ReactNode }[] = [
    ...(profile.phone
      ? [{ label: "Call", href: `tel:${profile.phone}`, icon: <Phone className="w-[22px] h-[22px]" style={{ color: theme.accent }} /> }]
      : []),
    ...(profile.whatsapp
      ? [{ label: "WhatsApp", href: `https://wa.me/${profile.whatsapp.replace(/\D/g, "")}`, icon: <MessageCircle className="w-[22px] h-[22px]" style={{ color: "#25d366" }} /> }]
      : []),
    ...(profile.email
      ? [{ label: "Email", href: `mailto:${profile.email}`, icon: <Mail className="w-[22px] h-[22px]" style={{ color: theme.accent }} /> }]
      : []),
  ];

  // Secondary action row (LinkedIn / Website)
  const secondaryTiles: { label: string; href: string; icon: React.ReactNode }[] = [
    ...(profile.linkedin
      ? [{ label: "LinkedIn", href: profile.linkedin, icon: <PlatformSvg platform="linkedin" size={16} /> }]
      : []),
    ...(profile.website
      ? [{ label: "Website", href: profile.website, icon: <Globe className="w-4 h-4 shrink-0" style={{ color: theme.accent }} /> }]
      : []),
  ];

  const tilesGrid = (n: number) =>
    n === 1 ? "grid-cols-1" : n === 2 ? "grid-cols-2" : "grid-cols-3";

  return (
    <div className="min-h-screen" style={{ background: theme.background }}>

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <div className="relative w-full h-72 overflow-hidden">
        {hasCover ? (
          <>
            <Image
              src={profile.coverPhotoUrl!}
              alt="Cover"
              fill
              className="object-cover"
              priority
              unoptimized
            />
            {/* cinematic gradient fade */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to bottom,
                  rgba(0,0,0,0.06) 0%,
                  rgba(0,0,0,0.22) 45%,
                  ${theme.background} 100%)`,
              }}
            />
          </>
        ) : (
          /* No cover: atmospheric radial glow */
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 110% 90% at 50% 0%, ${theme.accent}28 0%, transparent 60%),
                radial-gradient(ellipse 60% 50% at 85% 85%, ${theme.accent}10 0%, transparent 55%),
                ${theme.surface}`,
            }}
          />
        )}
      </div>

      {/* ── CONTENT ───────────────────────────────────────────────────── */}
      <div className="max-w-[480px] mx-auto px-5 pb-24">

        {/* Avatar — overlapping hero */}
        <motion.div
          className="flex justify-center -mt-16 mb-5 relative z-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div
            className="relative w-32 h-32 rounded-full overflow-hidden flex items-center justify-center"
            style={{
              border: `4px solid ${theme.background}`,
              boxShadow: `0 0 0 2px ${theme.accent}50,
                          0 12px 48px rgba(0,0,0,0.55),
                          0 0 80px ${theme.accent}18`,
              background: `${theme.accent}15`,
            }}
          >
            {profile.photoURL ? (
              <Image
                src={profile.photoURL}
                alt={profile.displayName || "Profile"}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <span className="text-4xl font-bold" style={{ color: theme.accent }}>
                {profile.displayName?.[0]?.toUpperCase() || "?"}
              </span>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
        >

          {/* ── IDENTITY ─────────────────────────────────────────────── */}
          <div className="text-center mb-9">
            <h1
              className="font-bold tracking-tight leading-tight"
              style={{ fontSize: "clamp(26px,7vw,34px)", color: theme.text }}
            >
              {profile.displayName || "—"}
            </h1>

            {profile.title && (
              <p className="text-[16px] mt-2 font-medium" style={{ color: theme.subtext }}>
                {profile.title}
              </p>
            )}

            {profile.location && (
              <span
                className="inline-flex items-center gap-1.5 text-xs mt-3.5 px-3.5 py-1.5 rounded-full"
                style={{
                  background: `${theme.accent}12`,
                  border: `1px solid ${theme.accent}28`,
                  color: theme.subtext,
                }}
              >
                <MapPin className="w-3 h-3 shrink-0" style={{ color: theme.accent }} />
                {profile.location}
              </span>
            )}

            {profile.bio && (
              <p
                className="mt-5 leading-[1.85] max-w-sm mx-auto"
                style={{ fontSize: "15px", color: theme.subtext }}
              >
                {profile.bio}
              </p>
            )}
          </div>

          {/* ── ACTION ZONE ──────────────────────────────────────────── */}
          <div className="space-y-3 mb-9">

            {/* Primary CTA */}
            <motion.button
              whileTap={{ scale: 0.985 }}
              onClick={handleSaveContact}
              className="w-full flex items-center justify-center gap-3 rounded-2xl font-semibold text-white"
              style={{
                padding: "17px 24px",
                fontSize: "16px",
                letterSpacing: "-0.01em",
                background: `linear-gradient(135deg, ${theme.accent} 0%, ${theme.accent}d8 100%)`,
                boxShadow: `0 6px 28px ${theme.accent}42, 0 1px 0 rgba(255,255,255,0.12) inset`,
              }}
            >
              <UserPlus className="w-5 h-5 shrink-0" />
              Save Contact
            </motion.button>

            {/* Contact tiles */}
            {contactTiles.length > 0 && (
              <div className={`grid gap-2.5 ${tilesGrid(contactTiles.length)}`}>
                {contactTiles.map(({ label, href, icon }) => (
                  <motion.button
                    key={label}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleAction(label, href)}
                    className="flex flex-col items-center gap-2 rounded-2xl font-medium transition-opacity hover:opacity-80"
                    style={{
                      padding: "15px 12px",
                      background: theme.buttonBg,
                      border: `1px solid ${theme.border}`,
                      color: theme.text,
                      fontSize: "12px",
                    }}
                  >
                    {icon}
                    {label}
                  </motion.button>
                ))}
              </div>
            )}

            {/* LinkedIn / Website */}
            {secondaryTiles.length > 0 && (
              <div className={`grid gap-2.5 ${tilesGrid(secondaryTiles.length)}`}>
                {secondaryTiles.map(({ label, href, icon }) => (
                  <motion.button
                    key={label}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAction(label, href)}
                    className="flex items-center justify-center gap-2.5 rounded-2xl font-medium transition-opacity hover:opacity-80"
                    style={{
                      padding: "14px 20px",
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
          </div>

          {/* ── COMPANY CARD ─────────────────────────────────────────── */}
          {profile.companyName && (
            <div
              className="rounded-2xl mb-9 overflow-hidden"
              style={{
                background: theme.surface,
                border: `1px solid ${theme.border}`,
                boxShadow: `0 4px 24px rgba(0,0,0,0.18)`,
              }}
            >
              <div className="p-5">
                <div className="flex items-center gap-4">
                  {/* Logo */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden"
                    style={{
                      background: theme.buttonBg,
                      border: `1px solid ${theme.border}`,
                    }}
                  >
                    {profile.companyLogoUrl ? (
                      <Image
                        src={profile.companyLogoUrl}
                        alt={profile.companyName}
                        width={56}
                        height={56}
                        className="w-full h-full object-contain p-1.5"
                        unoptimized
                      />
                    ) : (
                      <Building2 className="w-6 h-6" style={{ color: theme.subtext }} />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-bold leading-tight truncate"
                      style={{ fontSize: "16px", color: theme.text }}
                    >
                      {profile.companyName}
                    </p>
                    {profile.companyIndustry && (
                      <p className="text-xs font-medium mt-1" style={{ color: theme.accent }}>
                        {profile.companyIndustry}
                      </p>
                    )}
                    {profile.companyWebsite && !profile.companyIndustry && (
                      <p
                        className="text-xs mt-1 truncate"
                        style={{ color: theme.subtext }}
                      >
                        {profile.companyWebsite.replace(/^https?:\/\//, "")}
                      </p>
                    )}
                  </div>
                </div>

                {profile.companyDescription && (
                  <p
                    className="text-sm leading-relaxed mt-4"
                    style={{ color: theme.subtext }}
                  >
                    {profile.companyDescription}
                  </p>
                )}
              </div>

              {/* Visit website CTA strip */}
              {profile.companyWebsite && (
                <a
                  href={profile.companyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackButtonClick(profile.uid, "Company Website")}
                  className="flex items-center justify-between transition-opacity hover:opacity-70"
                  style={{
                    padding: "13px 20px",
                    borderTop: `1px solid ${theme.border}`,
                    color: theme.accent,
                    fontSize: "13px",
                    fontWeight: 500,
                  }}
                >
                  <span>Visit Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          )}

          {/* ── SOCIAL ICONS ─────────────────────────────────────────── */}
          {allSocials.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 mb-9">
              {allSocials.map(({ platform, url }) => {
                const brandColor = PLATFORM_COLORS[platform] || theme.accent;
                return (
                  <motion.a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackButtonClick(profile.uid, platform)}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.91 }}
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      background: `${brandColor}1e`,
                      border: `1px solid ${brandColor}38`,
                      color: brandColor,
                      boxShadow: `0 2px 14px ${brandColor}22`,
                    }}
                    aria-label={platform}
                  >
                    <PlatformSvg platform={platform} size={19} />
                  </motion.a>
                );
              })}
            </div>
          )}

          {/* ── CUSTOM LINKS ─────────────────────────────────────────── */}
          {enabledLinks.length > 0 && (
            <div className="space-y-2.5 mb-9">
              {enabledLinks.map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleAction(link.label, getLinkHref(link))}
                  className="w-full flex items-center gap-4 rounded-2xl text-left transition-opacity hover:opacity-80"
                  style={{
                    padding: "16px 20px",
                    background: theme.buttonBg,
                    border: `1px solid ${theme.border}`,
                  }}
                >
                  {link.type === "call"
                    ? <Phone className="w-5 h-5 shrink-0" style={{ color: theme.accent }} />
                    : link.type === "whatsapp"
                      ? <MessageCircle className="w-5 h-5 shrink-0" style={{ color: "#25d366" }} />
                      : link.type === "email"
                        ? <Mail className="w-5 h-5 shrink-0" style={{ color: theme.accent }} />
                        : <Link2 className="w-5 h-5 shrink-0" style={{ color: theme.accent }} />
                  }
                  <span
                    className="flex-1 font-medium"
                    style={{ fontSize: "15px", color: theme.text }}
                  >
                    {link.label}
                  </span>
                  <ChevronRight
                    className="w-4 h-4 shrink-0"
                    style={{ color: theme.subtext, opacity: 0.45 }}
                  />
                </motion.button>
              ))}
            </div>
          )}

          {/* ── FOOTER ACTIONS ───────────────────────────────────────── */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleShare}
              className="flex items-center gap-2 rounded-xl font-medium transition-opacity hover:opacity-75"
              style={{
                padding: "10px 20px",
                background: theme.buttonBg,
                border: `1px solid ${theme.border}`,
                color: theme.subtext,
                fontSize: "13px",
              }}
            >
              <Share2 className="w-4 h-4" />
              Share
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowQR((v) => !v)}
              className="flex items-center gap-2 rounded-xl font-medium transition-all hover:opacity-80"
              style={{
                padding: "10px 20px",
                background: showQR ? `${theme.accent}16` : theme.buttonBg,
                border: `1px solid ${showQR ? `${theme.accent}38` : theme.border}`,
                color: showQR ? theme.accent : theme.subtext,
                fontSize: "13px",
              }}
            >
              <QrCode className="w-4 h-4" />
              QR Code
            </motion.button>
          </div>

          {/* ── QR CARD ──────────────────────────────────────────────── */}
          <AnimatePresence>
            {showQR && (
              <motion.div
                initial={{ opacity: 0, y: 14, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.97 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="mb-9 rounded-3xl overflow-hidden bg-white"
                style={{
                  boxShadow:
                    "0 24px 64px rgba(0,0,0,0.35), 0 4px 16px rgba(0,0,0,0.18)",
                }}
              >
                <div className="px-6 pt-6 pb-1">
                  <p className="text-center text-[11px] font-bold text-gray-400 uppercase tracking-[0.12em]">
                    Scan to Connect
                  </p>
                </div>
                <div className="flex justify-center px-6 py-4">
                  <ProfileQR
                    url={profileUrl}
                    username={profile.username || "profile"}
                  />
                </div>
                <div className="px-6 pb-5">
                  <p className="text-center text-[11px] text-gray-400 truncate">
                    {profileUrl}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Watermark */}
          <p
            className="text-center text-xs mt-6 pb-4"
            style={{ color: `${theme.subtext}40` }}
          >
            Powered by{" "}
            <span style={{ color: theme.accent, opacity: 0.55 }}>TikTag</span>
          </p>

        </motion.div>
      </div>
    </div>
  );
}
