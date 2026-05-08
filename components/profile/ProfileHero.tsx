"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, MessageCircle, MapPin, UserPlus, Share2, Calendar } from "lucide-react";
import { GrainOverlay, AmbientOrb, spr } from "./shared";
import { trackButtonClick } from "@/lib/analytics";
import type { UserProfile } from "@/types";
import type { Theme } from "@/lib/themes";

interface ProfileHeroProps {
  profile: UserProfile;
  theme: Theme;
  onSaveContact: () => void;
  onShare: () => void;
  onTabChange: (tab: string) => void;
}

export default function ProfileHero({
  profile,
  theme,
  onSaveContact,
  onShare,
  onTabChange,
}: ProfileHeroProps) {
  const hasCover = !!profile.coverPhotoUrl;
  const isLight = theme.category === "light";

  const handleAction = (label: string, href: string) => {
    trackButtonClick(profile.uid, label);
    window.location.href = href;
  };

  const quickActions = [
    ...(profile.phone    ? [{ label: "Call",      href: `tel:${profile.phone}`,                                  icon: <Phone         className="w-3.5 h-3.5" /> }] : []),
    ...(profile.whatsapp ? [{ label: "WhatsApp",  href: `https://wa.me/${profile.whatsapp.replace(/\D/g, "")}`, icon: <MessageCircle className="w-3.5 h-3.5" /> }] : []),
    { label: "Share", href: "", icon: <Share2 className="w-3.5 h-3.5" />, onClick: onShare },
  ].slice(0, 3);

  return (
    <div style={{ background: theme.background }}>
      {/* ── Cover ─────────────────────────────────── */}
      <div className="relative w-full overflow-hidden" style={{ height: 180 }}>
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
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to bottom, rgba(0,0,0,0) 40%, ${theme.background} 100%)`,
              }}
            />
            <GrainOverlay opacity={0.03} />
          </>
        ) : (
          <>
            <div className="absolute inset-0" style={{ background: theme.surface }} />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle, ${theme.accent}1a 1px, transparent 1px)`,
                backgroundSize: "28px 28px",
                opacity: 0.5,
              }}
            />
            <AmbientOrb color={`${theme.accent}55`} x="5%"  y="0%"   w={320} h={220} duration={9}   />
            <AmbientOrb color={`${theme.accent}35`} x="55%"  y="20%"  w={260} h={200} duration={11}  delay={2} />
            <motion.div
              className="absolute inset-0"
              animate={{ opacity: [0.15, 0.38, 0.15] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ background: `radial-gradient(ellipse 85% 70% at 50% 0%, ${theme.accent}28 0%, transparent 65%)` }}
            />
            <div
              className="absolute top-0 left-0 right-0 h-[1.5px]"
              style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}70 50%, transparent)` }}
            />
            {profile.displayName && (
              <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden">
                <span
                  className="font-black uppercase leading-none"
                  style={{ fontSize: "clamp(120px, 45vw, 220px)", color: `${theme.accent}07`, letterSpacing: "-0.06em" }}
                >
                  {profile.displayName[0]}
                </span>
              </div>
            )}
            <div
              className="absolute inset-x-0 bottom-0 h-20"
              style={{ background: `linear-gradient(to bottom, transparent, ${theme.background})` }}
            />
            <GrainOverlay opacity={0.042} />
          </>
        )}
      </div>

      {/* ── Identity ──────────────────────────────── */}
      <div className="px-5 pb-6 text-center" style={{ background: theme.background }}>
        {/* Avatar */}
        <div className="flex justify-center" style={{ marginTop: -52 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ ...spr, delay: 0.05 }}
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div
                className="relative flex items-center justify-center overflow-hidden"
                style={{
                  width: 104, height: 104, borderRadius: "50%",
                  border: `3.5px solid ${theme.background}`,
                  background: `${theme.accent}18`,
                  boxShadow: [
                    `0 0 0 1.5px ${theme.accent}55`,
                    `0 0 0 7px ${theme.accent}12`,
                    `0 24px 64px rgba(0,0,0,0.65)`,
                    `0 0 100px ${theme.accent}22`,
                  ].join(", "),
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
                  <span className="font-bold select-none" style={{ fontSize: 40, color: theme.accent }}>
                    {profile.displayName?.[0]?.toUpperCase() || "?"}
                  </span>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Name + Title */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spr, delay: 0.1 }}
          className="mt-3"
        >
          <h1
            className="font-black leading-tight"
            style={{
              fontSize: "clamp(24px, 7vw, 32px)",
              color: theme.text,
              letterSpacing: "-0.03em",
              textShadow: isLight ? "none" : "0 2px 24px rgba(0,0,0,0.25)",
            }}
          >
            {profile.displayName || "—"}
          </h1>

          {profile.title && (
            <p className="mt-2 font-semibold" style={{ fontSize: 15, color: theme.accent, opacity: 0.9 }}>
              {profile.title}
            </p>
          )}

          {/* Badges row */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2.5">
            {profile.location && (
              <span
                className="inline-flex items-center gap-1 rounded-full px-2.5 py-1"
                style={{
                  fontSize: 11, fontWeight: 500,
                  background: `${theme.accent}12`,
                  border: `1px solid ${theme.accent}25`,
                  color: theme.subtext,
                }}
              >
                <MapPin className="w-2.5 h-2.5 shrink-0" style={{ color: theme.accent }} />
                {profile.location}
              </span>
            )}
            {profile.companyName && (
              <span
                className="inline-flex items-center gap-1 rounded-full px-2.5 py-1"
                style={{
                  fontSize: 11, fontWeight: 500,
                  background: `${theme.accent}12`,
                  border: `1px solid ${theme.accent}25`,
                  color: theme.subtext,
                }}
              >
                {profile.companyName}
              </span>
            )}
          </div>

          {/* Bio preview — 2 lines max, full bio is in About tab */}
          {profile.bio && (
            <p
              className="mt-3 mx-auto max-w-[360px]"
              style={{
                fontSize: 14,
                lineHeight: 1.75,
                color: theme.subtext,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical" as const,
                overflow: "hidden",
              }}
            >
              {profile.bio}
            </p>
          )}
        </motion.div>

        {/* ── CTAs ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spr, delay: 0.16 }}
          className="mt-5 space-y-2.5"
        >
          {/* Save Contact */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.008 }}
            onClick={onSaveContact}
            className="relative w-full flex items-center justify-center gap-2.5 rounded-[18px] font-semibold text-white overflow-hidden"
            style={{
              padding: "16px 24px",
              fontSize: 16,
              letterSpacing: "-0.015em",
              background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent}cc)`,
              boxShadow: `0 12px 40px ${theme.accent}40, 0 1px 0 rgba(255,255,255,0.18) inset`,
            }}
          >
            <motion.div
              className="absolute inset-0"
              style={{ background: "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.15) 50%, transparent 80%)" }}
              animate={{ x: ["-100%", "120%"] }}
              transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }}
            />
            <UserPlus className="w-[17px] h-[17px] shrink-0 relative z-10" />
            <span className="relative z-10">Save Contact</span>
          </motion.button>

          {/* Booking */}
          {profile.bookingUrl && (
            <motion.a
              href={profile.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackButtonClick(profile.uid, "Book a Meeting")}
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.008 }}
              className="w-full flex items-center justify-center gap-2.5 rounded-[18px] font-semibold"
              style={{
                padding: "14px 24px",
                fontSize: 15,
                color: theme.accent,
                background: `${theme.accent}0e`,
                border: `1.5px solid ${theme.accent}30`,
              }}
            >
              <Calendar className="w-4 h-4 shrink-0" />
              Book a Meeting
            </motion.a>
          )}

          {/* Quick actions row */}
          <div className="flex gap-2">
            {quickActions.map(({ label, href, icon, onClick }) => {
              const isWA = label === "WhatsApp";
              return (
                <motion.button
                  key={label}
                  whileTap={{ scale: 0.93 }}
                  whileHover={{ scale: 1.03 }}
                  onClick={onClick ?? (() => handleAction(label, href))}
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-[14px] font-semibold"
                  style={{
                    padding: "11px 8px",
                    fontSize: 12.5,
                    color: isWA ? "#25d366" : theme.subtext,
                    background: isWA
                      ? "rgba(37,211,102,0.10)"
                      : (isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.05)"),
                    border: isWA
                      ? "1px solid rgba(37,211,102,0.28)"
                      : `1px solid ${theme.border}`,
                  }}
                >
                  <span style={{ color: isWA ? "#25d366" : theme.accent }}>{icon}</span>
                  {label}
                </motion.button>
              );
            })}
          </div>

          {/* About tab hint if bio is truncated */}
          {profile.bio && profile.bio.length > 120 && (
            <button
              onClick={() => onTabChange("about")}
              className="text-xs transition-opacity hover:opacity-70"
              style={{ color: theme.accent, opacity: 0.6 }}
            >
              Read full bio →
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
