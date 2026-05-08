"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone, MessageCircle, Mail, UserPlus, Share2, Copy, Check,
  QrCode, Download, ChevronDown, Calendar,
} from "lucide-react";
import { spr } from "./shared";
import { trackButtonClick } from "@/lib/analytics";
import { generateVCard, downloadVCard } from "@/lib/utils";
import type { UserProfile } from "@/types";
import type { Theme } from "@/lib/themes";

interface ContactActionsProps {
  profile: UserProfile;
  theme: Theme;
  profileUrl: string;
  onSaveContact: () => void;
}

function ProfileQR({ url, username }: { url: string; username: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!ref.current || !url) return;
    import("qrcode").then((mod) => {
      (mod.default as typeof import("qrcode")).toCanvas(ref.current!, url, {
        width: 220,
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
    <div className="flex flex-col items-center gap-3 py-2">
      <div
        className="rounded-[22px] overflow-hidden bg-white p-5"
        style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.40)" }}
      >
        <canvas ref={ref} className="block rounded-xl" />
      </div>
      <button
        onClick={download}
        className="flex items-center gap-1.5 text-[12px] font-medium transition-opacity hover:opacity-60"
        style={{ color: "rgba(255,255,255,0.35)" }}
      >
        <Download className="w-3.5 h-3.5" />
        Save QR Code
      </button>
    </div>
  );
}

export default function ContactActions({
  profile,
  theme,
  profileUrl,
  onSaveContact,
}: ContactActionsProps) {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const isLight = theme.category === "light";
  const tileStyle = {
    background: theme.buttonBg,
    border: `1px solid ${theme.border}`,
    boxShadow: "0 2px 14px rgba(0,0,0,0.10)",
  };

  const handleAction = (label: string, href: string) => {
    trackButtonClick(profile.uid, label);
    window.location.href = href;
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    trackButtonClick(profile.uid, "Copy Link");
  };

  const handleShare = () => {
    trackButtonClick(profile.uid, "Share");
    if (navigator.share) {
      navigator.share({ title: profile.displayName, url: profileUrl });
    } else {
      handleCopy();
    }
  };

  const contactActions: { label: string; href: string; icon: React.ReactNode; color: string }[] = [
    ...(profile.phone    ? [{ label: "Call",     href: `tel:${profile.phone}`,                                  icon: <Phone         className="w-5 h-5" />, color: theme.accent }] : []),
    ...(profile.whatsapp ? [{ label: "WhatsApp", href: `https://wa.me/${profile.whatsapp.replace(/\D/g, "")}`, icon: <MessageCircle className="w-5 h-5" />, color: "#25d366"   }] : []),
    ...(profile.email    ? [{ label: "Email",    href: `mailto:${profile.email}`,                               icon: <Mail          className="w-5 h-5" />, color: theme.accent }] : []),
  ];

  const gridCols =
    contactActions.length === 1 ? "grid-cols-1"
    : contactActions.length === 2 ? "grid-cols-2"
    : "grid-cols-3";

  return (
    <div className="space-y-3">
      {/* Contact tiles */}
      {contactActions.length > 0 && (
        <motion.div
          className={`grid gap-3 ${gridCols}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spr, delay: 0.04 }}
        >
          {contactActions.map(({ label, href, icon, color }, i) => (
            <motion.button
              key={label}
              whileTap={{ scale: 0.93 }}
              whileHover={{ y: -3, scale: 1.012 }}
              onClick={() => handleAction(label, href)}
              className="flex flex-col items-center gap-2.5 rounded-[18px] font-medium"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spr, delay: 0.06 + i * 0.06 }}
              style={{ ...tileStyle, padding: "18px 12px", fontSize: 13, color: theme.text }}
            >
              <span style={{ color }}>{icon}</span>
              {label}
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Save contact */}
      <motion.button
        whileTap={{ scale: 0.975 }}
        whileHover={{ scale: 1.006 }}
        onClick={onSaveContact}
        className="relative w-full flex items-center justify-center gap-2.5 rounded-[18px] font-semibold text-white overflow-hidden"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...spr, delay: 0.12 }}
        style={{
          padding: "16px 24px",
          fontSize: 15.5,
          letterSpacing: "-0.015em",
          background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent}cc)`,
          boxShadow: `0 10px 36px ${theme.accent}38`,
        }}
      >
        <UserPlus className="w-4 h-4 shrink-0" />
        Save Contact
      </motion.button>

      {/* Booking */}
      {profile.bookingUrl && (
        <motion.a
          href={profile.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackButtonClick(profile.uid, "Book a Meeting")}
          whileTap={{ scale: 0.975 }}
          whileHover={{ scale: 1.006 }}
          className="w-full flex items-center justify-center gap-2.5 rounded-[18px] font-semibold"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spr, delay: 0.15 }}
          style={{
            padding: "14px 24px",
            fontSize: 15,
            color: theme.accent,
            background: `${theme.accent}0e`,
            border: `1.5px solid ${theme.accent}28`,
          }}
        >
          <Calendar className="w-4 h-4 shrink-0" />
          Book a Meeting
        </motion.a>
      )}

      {/* Share + Copy row */}
      <motion.div
        className="grid grid-cols-2 gap-3"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...spr, delay: 0.18 }}
      >
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleShare}
          className="flex items-center justify-center gap-2 rounded-[16px] font-medium"
          style={{ ...tileStyle, padding: "13px", fontSize: 13.5, color: theme.subtext }}
        >
          <Share2 className="w-4 h-4" />
          Share
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleCopy}
          className="flex items-center justify-center gap-2 rounded-[16px] font-medium transition-colors"
          style={{
            ...tileStyle,
            padding: "13px",
            fontSize: 13.5,
            color: copied ? (isLight ? "#059669" : "#10b981") : theme.subtext,
          }}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copied!" : "Copy Link"}
        </motion.button>
      </motion.div>

      {/* QR Code section */}
      <motion.div
        className="rounded-[20px] overflow-hidden"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...spr, delay: 0.22 }}
        style={{ border: `1px solid ${theme.border}` }}
      >
        <button
          onClick={() => setShowQR((v) => !v)}
          className="w-full flex items-center justify-between px-5 py-4 transition-opacity hover:opacity-75"
          style={{
            background: theme.buttonBg,
            color: theme.subtext,
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          <div className="flex items-center gap-2.5">
            <QrCode className="w-4 h-4" style={{ color: theme.accent }} />
            QR Code
          </div>
          <motion.div animate={{ rotate: showQR ? 180 : 0 }} transition={{ duration: 0.22 }}>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </button>

        <AnimatePresence>
          {showQR && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className="overflow-hidden"
              style={{ background: theme.surface, borderTop: `1px solid ${theme.border}` }}
            >
              <div className="flex flex-col items-center px-6 py-8 gap-2">
                <p
                  className="font-black uppercase mb-2"
                  style={{ fontSize: 9, letterSpacing: "0.22em", color: `${theme.subtext}50` }}
                >
                  Scan to Connect
                </p>
                {profile.displayName && (
                  <p className="font-bold mb-4" style={{ fontSize: 15, color: theme.text, letterSpacing: "-0.015em" }}>
                    {profile.displayName}
                  </p>
                )}
                <ProfileQR url={profileUrl} username={profile.username || "profile"} />
                <p className="mt-3 truncate max-w-[240px]" style={{ fontSize: 10, color: `${theme.subtext}30` }}>
                  {profileUrl}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
