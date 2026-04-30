"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Mail, UserPlus, Link2, QrCode, X } from "lucide-react";
import { trackProfileView, trackButtonClick } from "@/lib/analytics";
import { generateVCard, downloadVCard } from "@/lib/utils";
import QRCodeDisplay from "@/components/profile/QRCodeDisplay";
import type { UserProfile, CustomLink } from "@/types";

const SOCIAL_ICONS: Record<string, string> = {
  twitter: "𝕏",
  instagram: "📸",
  linkedin: "💼",
  github: "⌨️",
  youtube: "▶️",
  tiktok: "🎵",
};

function getLinkHref(link: CustomLink): string {
  switch (link.type) {
    case "call": return `tel:${link.url}`;
    case "whatsapp": return `https://wa.me/${link.url.replace(/\D/g, "")}`;
    case "email": return `mailto:${link.url}`;
    default: return link.url;
  }
}

export default function PublicProfileClient({ profile }: { profile: UserProfile }) {
  const [showQR, setShowQR] = useState(false);
  const accent = profile.accentColor || "#6366f1";
  const profileUrl = typeof window !== "undefined" ? window.location.href : `https://tapid.com/u/${profile.username}`;

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
    });
    downloadVCard(vcard, profile.displayName);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        {/* Avatar */}
        <div className="flex flex-col items-center mb-6">
          <div
            className="w-24 h-24 rounded-full mb-4 flex items-center justify-center text-3xl font-bold border-2"
            style={{ borderColor: accent, background: `${accent}22` }}
          >
            {profile.photoURL ? (
              <Image src={profile.photoURL} alt={profile.displayName} width={96} height={96} className="rounded-full object-cover w-full h-full" />
            ) : (
              profile.displayName?.[0]?.toUpperCase() || "?"
            )}
          </div>
          <h1 className="text-xl font-semibold text-white text-center">{profile.displayName}</h1>
          {profile.title && <p className="text-white/50 text-sm text-center mt-0.5">{profile.title}</p>}
          {profile.bio && <p className="text-white/40 text-sm text-center mt-3 leading-relaxed">{profile.bio}</p>}
        </div>

        {/* Core action buttons */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {profile.phone && (
            <button
              onClick={() => handleAction("Call", `tel:${profile.phone}`)}
              className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm hover:bg-white/8 transition-colors"
            >
              <Phone className="w-4 h-4" style={{ color: accent }} />
              Call
            </button>
          )}
          {profile.whatsapp && (
            <button
              onClick={() => handleAction("WhatsApp", `https://wa.me/${profile.whatsapp.replace(/\D/g, "")}`)}
              className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm hover:bg-white/8 transition-colors"
            >
              <MessageCircle className="w-4 h-4" style={{ color: accent }} />
              WhatsApp
            </button>
          )}
          {profile.email && (
            <button
              onClick={() => handleAction("Email", `mailto:${profile.email}`)}
              className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm hover:bg-white/8 transition-colors"
            >
              <Mail className="w-4 h-4" style={{ color: accent }} />
              Email
            </button>
          )}
          <button
            onClick={handleSaveContact}
            className="flex items-center justify-center gap-2 py-3 rounded-xl text-white text-sm transition-colors"
            style={{ background: `${accent}22`, border: `1px solid ${accent}44` }}
          >
            <UserPlus className="w-4 h-4" style={{ color: accent }} />
            Save Contact
          </button>
        </div>

        {/* Custom links */}
        {profile.links?.length > 0 && (
          <div className="space-y-2 mb-4">
            {profile.links.map((link) => (
              <motion.button
                key={link.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAction(link.label, getLinkHref(link))}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm hover:bg-white/8 transition-colors"
              >
                <Link2 className="w-4 h-4 text-white/30" />
                {link.label}
              </motion.button>
            ))}
          </div>
        )}

        {/* Socials */}
        {profile.socials?.length > 0 && (
          <div className="flex justify-center gap-3 mb-6">
            {profile.socials.map((s) => (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackButtonClick(profile.uid, s.platform)}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg hover:bg-white/10 transition-colors"
              >
                {SOCIAL_ICONS[s.platform.toLowerCase()] || "🔗"}
              </a>
            ))}
          </div>
        )}

        {/* QR toggle */}
        <button
          onClick={() => setShowQR((v) => !v)}
          className="w-full flex items-center justify-center gap-2 py-2.5 text-white/30 text-xs hover:text-white/50 transition-colors"
        >
          <QrCode className="w-3.5 h-3.5" />
          {showQR ? "Hide QR" : "Show QR Code"}
        </button>

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
        <p className="text-center text-white/15 text-xs mt-8">Powered by TapID</p>
      </motion.div>
    </div>
  );
}
