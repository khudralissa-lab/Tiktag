"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { type LucideIcon, ArrowLeft, Rocket } from "lucide-react";

const spr = { type: "spring" as const, stiffness: 260, damping: 22 };

export default function ComingSoonPage({
  title,
  description,
  icon: Icon,
  accentColor = "#8b5cf6",
}: {
  title: string;
  description: string;
  icon?: LucideIcon;
  accentColor?: string;
}) {
  const PageIcon = Icon ?? Rocket;

  return (
    <div style={{ padding: "32px 28px 64px", maxWidth: 640, position: "relative" }}>
      {/* Atmospheric glow */}
      <div style={{
        position: "absolute", top: 0, left: "5%", right: "40%", height: 240,
        zIndex: 0, pointerEvents: "none",
        background: `radial-gradient(ellipse 70% 50% at 30% 0%, ${accentColor}10 0%, transparent 70%)`,
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spr }}
        >
          <Link
            href="/dashboard"
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              color: "rgba(255,255,255,0.32)", fontSize: 12, fontWeight: 500,
              textDecoration: "none", marginBottom: 32,
            }}
          >
            <ArrowLeft size={13} />
            Back to Overview
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...spr, delay: 0.06 }}
          style={{
            padding: "48px 40px",
            borderRadius: 24,
            background: "linear-gradient(180deg, rgba(255,255,255,0.038) 0%, rgba(255,255,255,0.016) 100%)",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: "0 16px 48px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Top accent line */}
          <div style={{
            position: "absolute", top: 0, left: "20%", right: "20%", height: 1,
            background: `linear-gradient(90deg, transparent, ${accentColor}50, transparent)`,
          }} />

          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spr, delay: 0.12 }}
            style={{
              width: 64, height: 64, borderRadius: 18, margin: "0 auto 24px",
              background: `${accentColor}18`, border: `1px solid ${accentColor}28`,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: `0 8px 32px ${accentColor}18`,
            }}
          >
            <PageIcon size={28} style={{ color: accentColor }} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spr, delay: 0.16 }}
            style={{
              color: "rgba(255,255,255,0.94)", fontSize: 22, fontWeight: 700,
              letterSpacing: "-0.03em", marginBottom: 12,
            }}
          >
            {title}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spr, delay: 0.2 }}
            style={{
              color: "rgba(255,255,255,0.38)", fontSize: 14, lineHeight: 1.65,
              maxWidth: 380, margin: "0 auto 32px",
            }}
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.28 }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
          >
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "6px 14px", borderRadius: 20,
              background: `${accentColor}14`, border: `1px solid ${accentColor}22`,
            }}>
              <div style={{
                width: 6, height: 6, borderRadius: "50%",
                background: accentColor,
                boxShadow: `0 0 8px ${accentColor}`,
                animation: "pulse 2s ease-in-out infinite",
              }} />
              <span style={{ color: accentColor, fontSize: 11, fontWeight: 600, letterSpacing: "0.06em" }}>
                Coming soon for this experience
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  );
}
