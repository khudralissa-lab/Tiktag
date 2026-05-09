"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const capabilities = [
  {
    title: "Always current.",
    desc: "Update your profile once. Every card, every tap, every QR scan shows the latest version — instantly, everywhere.",
  },
  {
    title: "Frictionless connections.",
    desc: "One tap delivers call, WhatsApp, email, and every link. No typing, no searching, no lost cards.",
  },
  {
    title: "Professionally crafted.",
    desc: "AI-generated bio, custom theme, and a profile that evolves with your career — not stuck on a printed card.",
  },
];

function PremiumPhoneMockup() {
  return (
    <div
      style={{
        width: 220,
        height: 440,
        borderRadius: 44,
        background: "linear-gradient(180deg, #141416 0%, #0a0a0c 100%)",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow:
          "0 60px 120px rgba(0,0,0,0.75), 0 0 0 0.5px rgba(255,255,255,0.04), 0 0 60px rgba(139,92,246,0.07), inset 0 1px 0 rgba(255,255,255,0.06)",
        position: "relative",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 90,
          height: 28,
          background: "#0a0a0c",
          borderRadius: "0 0 18px 18px",
          zIndex: 10,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 180,
          background: "linear-gradient(180deg, rgba(139,92,246,0.12) 0%, transparent 100%)",
        }}
      />

      <div
        style={{
          position: "relative",
          paddingTop: 36,
          paddingBottom: 20,
          paddingLeft: 16,
          paddingRight: 16,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <motion.div
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 60%, #4f46e5 100%)",
            boxShadow: "0 12px 32px rgba(139,92,246,0.45)",
            marginBottom: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 4,
          }}
        >
          <span style={{ color: "white", fontWeight: 700, fontSize: 18 }}>AJ</span>
        </motion.div>

        <p style={{ color: "rgba(255,255,255,0.92)", fontSize: 15, fontWeight: 600, marginBottom: 3 }}>
          Alex Johnson
        </p>
        <p style={{ color: "rgba(255,255,255,0.38)", fontSize: 11, marginBottom: 2 }}>Chief Design Officer</p>
        <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 10, marginBottom: 18 }}>Dubai, UAE</p>

        <div style={{ display: "flex", gap: 6, width: "100%", marginBottom: 14 }}>
          {[
            { label: "Call", bg: "rgba(74,222,128,0.12)", border: "rgba(74,222,128,0.2)", color: "#4ade80" },
            { label: "Chat", bg: "rgba(139,92,246,0.14)", border: "rgba(139,92,246,0.22)", color: "#a78bfa" },
            { label: "Mail", bg: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.38)" },
          ].map(({ label, bg, border, color }) => (
            <div
              key={label}
              style={{
                flex: 1,
                height: 36,
                borderRadius: 12,
                background: bg,
                border: `1px solid ${border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ color, fontSize: 10, fontWeight: 600 }}>{label}</span>
            </div>
          ))}
        </div>

        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 6 }}>
          {[
            { label: "Portfolio", highlight: true },
            { label: "LinkedIn" },
            { label: "Instagram" },
            { label: "Dribbble" },
            { label: "Save Contact" },
          ].map(({ label, highlight }) => (
            <div
              key={label}
              style={{
                height: 36,
                borderRadius: 12,
                background: highlight ? "rgba(139,92,246,0.16)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${highlight ? "rgba(139,92,246,0.28)" : "rgba(255,255,255,0.055)"}`,
                display: "flex",
                alignItems: "center",
                paddingLeft: 12,
                paddingRight: 12,
                justifyContent: "space-between",
              }}
            >
              <span style={{ color: highlight ? "rgba(167,139,250,0.9)" : "rgba(255,255,255,0.38)", fontSize: 11, fontWeight: highlight ? 500 : 400 }}>
                {label}
              </span>
              {highlight && (
                <span style={{ color: "rgba(139,92,246,0.5)", fontSize: 9 }}>→</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SmartProfile() {
  return (
    <section style={{ padding: "120px 24px" }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            className="flex justify-center order-2 md:order-1"
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  bottom: -60,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 200,
                  height: 80,
                  background: "radial-gradient(ellipse, rgba(139,92,246,0.2) 0%, transparent 70%)",
                  filter: "blur(24px)",
                  pointerEvents: "none",
                }}
              />
              <PremiumPhoneMockup />

              <motion.div
                style={{
                  position: "absolute",
                  top: 80,
                  right: -80,
                  padding: "10px 14px",
                  borderRadius: 12,
                  background: "rgba(10,10,12,0.92)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(16px)",
                  boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
                  minWidth: 100,
                }}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <p style={{ color: "rgba(255,255,255,0.28)", fontSize: 8, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 4 }}>
                  Profile Views
                </p>
                <p style={{ color: "white", fontSize: 20, fontWeight: 700, lineHeight: 1 }}>847</p>
                <p style={{ color: "#4ade80", fontSize: 9, marginTop: 3 }}>↑ 12% today</p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="order-1 md:order-2"
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              style={{
                color: "rgba(139,92,246,0.8)",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              Smart Profile
            </p>
            <h2
              style={{
                color: "rgba(255,255,255,0.94)",
                fontSize: "clamp(28px, 3.5vw, 44px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                marginBottom: 20,
              }}
            >
              Your presence,
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #c4b5fd, #a78bfa, #8b5cf6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                perfected.
              </span>
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.38)",
                fontSize: 16,
                lineHeight: 1.7,
                marginBottom: 40,
                maxWidth: 420,
              }}
            >
              Not a link in bio. An intelligent digital identity that evolves, adapts, and makes every interaction count.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 40 }}>
              {capabilities.map(({ title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                  style={{ display: "flex", gap: 16, alignItems: "flex-start" }}
                >
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
                      flexShrink: 0,
                      marginTop: 6,
                      boxShadow: "0 0 8px rgba(139,92,246,0.5)",
                    }}
                  />
                  <div>
                    <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 14, fontWeight: 600, marginBottom: 4 }}>
                      {title}
                    </p>
                    <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, lineHeight: 1.6 }}>{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link
              href="/register"
              className="group inline-flex items-center gap-2 font-medium transition-colors duration-200"
              style={{ color: "rgba(167,139,250,0.8)", fontSize: 14 }}
            >
              Create your profile
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
