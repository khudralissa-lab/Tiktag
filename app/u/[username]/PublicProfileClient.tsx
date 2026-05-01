"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Phone, MessageCircle, Mail, UserPlus, Link2, QrCode,
  Globe, MapPin, Building2, Share2,
} from "lucide-react";
import { trackProfileView, trackButtonClick } from "@/lib/analytics";
import { generateVCard, downloadVCard } from "@/lib/utils";
import { getTheme } from "@/lib/themes";
import QRCodeDisplay from "@/components/profile/QRCodeDisplay";
import type { UserProfile, CustomLink } from "@/types";

const SOCIAL_LABELS: Record<string, string> = {
  linkedin: "in",
  instagram: "Ig",
  facebook: "Fb",
  tiktok: "Tt",
  youtube: "Yt",
  xTwitter: "𝕏",
};

const SOCIAL_COLORS: Record<string, string> = {
  linkedin: "#0a66c2",
  instagram: "#e1306c",
  facebook: "#1877f2",
  tiktok: "#010101",
  youtube: "#ff0000",
  xTwitter: "#000000",
};

function getLinkHref(link: CustomLink): string {
  switch (link.type) {
    case "call": return `tel:${link.url}`;
    case "whatsapp": return `https://wa.me/${link.url.replace(/\D/g, "")}`;
    case "email": return `mailto:${link.url}`;
    default: return link.url;
  }
}

function SocialButton({
  platform,
  url,
  uid,
  accent,
}: {
  platform: string;
  url: string;
  uid: string;
  accent: string;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackButtonClick(uid, platform)}
      className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold transition-all hover:scale-105"
      style={{
        background: `${SOCIAL_COLORS[platform] || accent}18`,
        border: `1px solid ${SOCIAL_COLORS[platform] || accent}30`,
        color: SOCIAL_COLORS[platform] || accent,
      }}
    >
      {SOCIAL_LABELS[platform] || "🔗"}
    </a>
  );
}

export default function PublicProfileClient({ profile }: { profile: UserProfile }) {
  const [showQR, setShowQR] = useState(false);
  const theme = getTheme(profile.theme);
  const profileUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://tiktag.io/u/${profile.username}`;

  useEffect(() => {
    trackProfileView(profile.uid);
  }, [profile.uid]);

  const handleAction = (label: string, href: string) => {
    trackButtonClick(profile.uid, label);
    window.open(href, "_blank", "noopener");
  };

  const handleSaveContact = () => {
    trackButtonClick(profile.uid, "Save Contact");
    const vcard = generateVCard({
      displayName: profile.displayName,
      title: profile.title,
      email: profile.email,
      phone: profile.phone,
      whatsapp: profile.whatsapp,
      website: profile.website || profile.companyWebsite,
      companyName: profile.companyName,
      location: profile.location,
    });
    downloadVCard(vcard, profile.displayName);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: profile.displayName, url: profileUrl });
    } else {
      navigator.clipboard.writeText(profileUrl);
    }
  };

  // Build socials list from individual fields
  const socialEntries: { platform: string; url: string }[] = (
    ["linkedin", "instagram", "facebook", "tiktok", "youtube", "xTwitter"] as const
  )
    .map((key) => ({ platform: key as string, url: profile[key] ?? "" }))
    .filter((s) => !!s.url);

  // Also include legacy socials array
  const legacySocials = (profile.socials || []).filter(
    (s) => !socialEntries.find((e) => e.platform === s.platform.toLowerCase())
  );

  const enabledLinks = (profile.links || []).filter((l) => l.enabled !== false);

  return (
    <div
      className="min-h-screen flex flex-col items-center"
      style={{ background: theme.background }}
    >
      {/* Cover photo */}
      {profile.coverPhotoUrl && (
        <div className="w-full h-36 relative shrink-0">
          <Image
            src={profile.coverPhotoUrl}
            alt="Cover"
            fill
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(to bottom, transparent 50%, ${theme.background} 100%)` }}
          />
        </div>
      )}

      <div
        className="w-full max-w-sm px-4 pb-16"
        style={{ marginTop: profile.coverPhotoUrl ? "-2rem" : "3rem" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          {/* Avatar + identity */}
          <div className="flex flex-col items-center mb-6">
            <div
              className="w-24 h-24 rounded-full mb-4 flex items-center justify-center text-3xl font-bold overflow-hidden"
              style={{
                border: `2px solid ${theme.accent}`,
                background: `${theme.accent}18`,
                color: theme.accent,
              }}
            >
              {profile.photoURL ? (
                <Image
                  src={profile.photoURL}
                  alt={profile.displayName}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              ) : (
                profile.displayName?.[0]?.toUpperCase() || "?"
              )}
            </div>

            <h1 className="text-xl font-semibold text-center" style={{ color: theme.text }}>
              {profile.displayName}
            </h1>
            {profile.title && (
              <p className="text-sm text-center mt-0.5" style={{ color: theme.subtext }}>
                {profile.title}
              </p>
            )}

            {/* Location + website row */}
            {(profile.location || profile.website) && (
              <div className="flex items-center gap-3 mt-2">
                {profile.location && (
                  <span className="flex items-center gap-1 text-xs" style={{ color: theme.subtext }}>
                    <MapPin className="w-3 h-3" /> {profile.location}
                  </span>
                )}
                {profile.website && (
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackButtonClick(profile.uid, "Website")}
                    className="flex items-center gap-1 text-xs transition-opacity hover:opacity-70"
                    style={{ color: theme.accent }}
                  >
                    <Globe className="w-3 h-3" />
                    {profile.website.replace(/^https?:\/\//, "")}
                  </a>
                )}
              </div>
            )}

            {profile.bio && (
              <p className="text-sm text-center mt-3 leading-relaxed" style={{ color: theme.subtext }}>
                {profile.bio}
              </p>
            )}
          </div>

          {/* Company section */}
          {profile.companyName && (
            <div
              className="flex items-center gap-3 p-3 rounded-2xl mb-4"
              style={{ background: theme.surface, border: `1px solid ${theme.border}` }}
            >
              {profile.companyLogoUrl ? (
                <Image
                  src={profile.companyLogoUrl}
                  alt={profile.companyName}
                  width={36}
                  height={36}
                  className="w-9 h-9 rounded-lg object-contain shrink-0"
                  style={{ background: theme.buttonBg }}
                />
              ) : (
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: theme.buttonBg }}
                >
                  <Building2 className="w-4 h-4" style={{ color: theme.subtext }} />
                </div>
              )}
              <div className="min-w-0">
                <p className="text-sm font-medium truncate" style={{ color: theme.text }}>
                  {profile.companyName}
                </p>
                {profile.companyWebsite && (
                  <a
                    href={profile.companyWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackButtonClick(profile.uid, "Company Website")}
                    className="text-xs truncate block hover:opacity-70 transition-opacity"
                    style={{ color: theme.accent }}
                  >
                    {profile.companyWebsite.replace(/^https?:\/\//, "")}
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Contact action buttons */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            {profile.phone && (
              <button
                onClick={() => handleAction("Call", `tel:${profile.phone}`)}
                className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm transition-all hover:opacity-80"
                style={{ background: theme.buttonBg, border: `1px solid ${theme.border}`, color: theme.text }}
              >
                <Phone className="w-4 h-4" style={{ color: theme.accent }} />
                Call
              </button>
            )}
            {profile.whatsapp && (
              <button
                onClick={() => handleAction("WhatsApp", `https://wa.me/${profile.whatsapp.replace(/\D/g, "")}`)}
                className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm transition-all hover:opacity-80"
                style={{ background: theme.buttonBg, border: `1px solid ${theme.border}`, color: theme.text }}
              >
                <MessageCircle className="w-4 h-4" style={{ color: "#25d366" }} />
                WhatsApp
              </button>
            )}
            {profile.email && (
              <button
                onClick={() => handleAction("Email", `mailto:${profile.email}`)}
                className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm transition-all hover:opacity-80"
                style={{ background: theme.buttonBg, border: `1px solid ${theme.border}`, color: theme.text }}
              >
                <Mail className="w-4 h-4" style={{ color: theme.accent }} />
                Email
              </button>
            )}
            <button
              onClick={handleSaveContact}
              className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm transition-all hover:opacity-80"
              style={{
                background: `${theme.accent}18`,
                border: `1px solid ${theme.accent}35`,
                color: theme.accent,
              }}
            >
              <UserPlus className="w-4 h-4" />
              Save Contact
            </button>
          </div>

          {/* Custom links */}
          {enabledLinks.length > 0 && (
            <div className="space-y-2 mb-4">
              {enabledLinks.map((link) => (
                <motion.button
                  key={link.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAction(link.label, getLinkHref(link))}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm transition-all hover:opacity-80"
                  style={{ background: theme.buttonBg, border: `1px solid ${theme.border}`, color: theme.text }}
                >
                  <Link2 className="w-4 h-4" style={{ color: theme.subtext }} />
                  {link.label}
                </motion.button>
              ))}
            </div>
          )}

          {/* Social icons */}
          {(socialEntries.length > 0 || legacySocials.length > 0) && (
            <div className="flex flex-wrap justify-center gap-2 mb-5">
              {socialEntries.map(({ platform, url }) => (
                <SocialButton
                  key={platform}
                  platform={platform}
                  url={url}
                  uid={profile.uid}
                  accent={theme.accent}
                />
              ))}
              {legacySocials.map((s) => (
                <SocialButton
                  key={s.id}
                  platform={s.platform.toLowerCase()}
                  url={s.url}
                  uid={profile.uid}
                  accent={theme.accent}
                />
              ))}
            </div>
          )}

          {/* Bottom actions row */}
          <div className="flex items-center justify-center gap-4 mt-2">
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
              {showQR ? "Hide QR" : "QR Code"}
            </button>
          </div>

          {showQR && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 flex justify-center"
            >
              <QRCodeDisplay url={profileUrl} username={profile.username} />
            </motion.div>
          )}

          {/* Footer */}
          <p className="text-center text-xs mt-10" style={{ color: `${theme.subtext}55` }}>
            Powered by TikTag
          </p>
        </motion.div>
      </div>
    </div>
  );
}
