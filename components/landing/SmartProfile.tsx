"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const capabilities = [
  {
    title: "Always current.",
    desc: "Update once. Every card, QR, and tap reflects the latest version instantly — everywhere, always.",
  },
  {
    title: "Frictionless connections.",
    desc: "One tap delivers call, WhatsApp, email, and every link. No typing, no friction, no lost cards.",
  },
  {
    title: "Professionally crafted.",
    desc: "AI-generated bio, custom theme, and a profile that evolves with your career — not static.",
  },
];

function CinematicPhone() {
  return (
    <div style={{ position: "relative", width: 220, perspective: "1400px" }}>
      {/* Atmospheric glow */}
      <div style={{
        position: "absolute",
        top: "10%", bottom: "-10%", left: "-30%", right: "-30%",
        background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(88,28,235,0.12) 0%, transparent 70%)",
        filter: "blur(28px)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      {/* Ground shadow */}
      <div style={{
        position: "absolute",
        bottom: -48,
        left: "50%",
        transform: "translateX(-50%)",
        width: "60%",
        height: 56,
        background: "radial-gradient(ellipse, rgba(0,0,0,0.95) 0%, transparent 70%)",
        filter: "blur(22px)",
        zIndex: 0,
      }} />

      {/* Phone body */}
      <motion.div
        style={{
          width: 220,
          height: 440,
          borderRadius: 44,
          background: "linear-gradient(180deg, #141418 0%, #0c0c10 60%, #0a0a0e 100%)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: `
            0 80px 160px rgba(0,0,0,0.88),
            0 40px 80px rgba(0,0,0,0.82),
            0 15px 30px rgba(0,0,0,0.72),
            0 0 80px rgba(88,28,235,0.08),
            0 80px 160px -60px rgba(50,20,140,0.3),
            inset 0 1px 0 rgba(255,255,255,0.08),
            inset 0 -1px 0 rgba(0,0,0,0.4)
          `,
          transform: "rotateX(2deg) rotateY(6deg)",
          position: "relative",
          overflow: "hidden",
          zIndex: 1,
        }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Brushed texture */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0) 0px, rgba(255,255,255,0) 1px, rgba(255,255,255,0.006) 1px, rgba(255,255,255,0.006) 2px)",
          backgroundSize: "100% 2px",
        }} />

        {/* Top specular */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: "30%",
          background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 100%)",
          borderRadius: "44px 44px 0 0",
        }} />

        {/* Dynamic island */}
        <div style={{
          position: "absolute",
          top: 12,
          left: "50%",
          transform: "translateX(-50%)",
          width: 88,
          height: 26,
          background: "#000",
          borderRadius: 20,
          zIndex: 10,
          boxShadow: "0 0 0 1px rgba(255,255,255,0.06)",
        }} />

        {/* Profile accent gradient */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: 180,
          background: "linear-gradient(180deg, rgba(88,28,235,0.14) 0%, transparent 100%)",
        }} />

        {/* Screen content */}
        <div style={{
          position: "relative",
          paddingTop: 48,
          paddingLeft: 16,
          paddingRight: 16,
          paddingBottom: 20,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
          {/* Avatar */}
          <motion.div
            animate={{ scale: [1, 1.025, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: 68,
              height: 68,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 55%, #4f46e5 100%)",
              boxShadow: "0 10px 28px rgba(139,92,246,0.45)",
              marginBottom: 9,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 8,
            }}
          >
            <span style={{ color: "white", fontWeight: 700, fontSize: 18 }}>AJ</span>
          </motion.div>

          <p style={{ color: "rgba(255,255,255,0.92)", fontSize: 14, fontWeight: 600, marginBottom: 2 }}>
            Alex Johnson
          </p>
          <p style={{ color: "rgba(255,255,255,0.36)", fontSize: 10, marginBottom: 1 }}>Chief Design Officer</p>
          <p style={{ color: "rgba(255,255,255,0.18)", fontSize: 9, marginBottom: 16 }}>Dubai, UAE</p>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: 5, width: "100%", marginBottom: 12 }}>
            {[
              { l: "Call", bg: "rgba(74,222,128,0.1)", border: "rgba(74,222,128,0.2)", color: "#4ade80" },
              { l: "Chat", bg: "rgba(139,92,246,0.12)", border: "rgba(139,92,246,0.22)", color: "#a78bfa" },
              { l: "Mail", bg: "rgba(255,255,255,0.03)", border: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.36)" },
            ].map(({ l, bg, border, color }) => (
              <div key={l} style={{
                flex: 1, height: 34, borderRadius: 11,
                background: bg, border: `1px solid ${border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ color, fontSize: 9, fontWeight: 600 }}>{l}</span>
              </div>
            ))}
          </div>

          {/* Link buttons */}
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 5 }}>
            {[
              { label: "Portfolio", hl: true },
              { label: "LinkedIn" },
              { label: "Instagram" },
              { label: "Dribbble" },
              { label: "Save Contact" },
            ].map(({ label, hl }) => (
              <div key={label} style={{
                height: 34, borderRadius: 11,
                background: hl ? "rgba(139,92,246,0.14)" : "rgba(255,255,255,0.028)",
                border: `1px solid ${hl ? "rgba(139,92,246,0.26)" : "rgba(255,255,255,0.05)"}`,
                display: "flex",
                alignItems: "center",
                paddingLeft: 11, paddingRight: 11,
                justifyContent: "space-between",
              }}>
                <span style={{
                  color: hl ? "rgba(167,139,250,0.88)" : "rgba(255,255,255,0.35)",
                  fontSize: 10,
                  fontWeight: hl ? 500 : 400,
                }}>
                  {label}
                </span>
                {hl && <span style={{ color: "rgba(139,92,246,0.5)", fontSize: 9 }}>→</span>}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Ground reflection */}
      <div style={{
        position: "absolute",
        top: 442,
        left: "10%", right: "10%",
        height: 88,
        background: "linear-gradient(180deg, #141418 0%, #0a0a0e 100%)",
        opacity: 0.05,
        transform: "scaleY(-1) rotateX(-1deg) rotateY(6deg)",
        filter: "blur(4px)",
        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)",
        maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)",
        borderRadius: "0 0 44px 44px",
        zIndex: 0,
      }} />
    </div>
  );
}

export default function SmartProfile() {
  return (
    <section style={{ padding: "120px 24px", background: "#030311" }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Phone */}
          <motion.div
            className="flex justify-center order-2 md:order-1"
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{ position: "relative" }}>
              <CinematicPhone />

              {/* Floating stat chip */}
              <motion.div
                style={{
                  position: "absolute",
                  top: 90,
                  right: -88,
                  padding: "12px 16px",
                  borderRadius: 13,
                  background: "rgba(5,5,16,0.94)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 20px 48px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)",
                  minWidth: 108,
                }}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <p style={{ color: "rgba(255,255,255,0.26)", fontSize: 8, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 5 }}>
                  Views Today
                </p>
                <p style={{ color: "white", fontSize: 22, fontWeight: 700, lineHeight: 1 }}>847</p>
                <p style={{ color: "#4ade80", fontSize: 9, marginTop: 4 }}>↑ 12% today</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            className="order-1 md:order-2"
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p style={{
              color: "rgba(139,92,246,0.75)",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              marginBottom: 20,
            }}>
              Smart Profile
            </p>
            <h2 style={{
              color: "rgba(255,255,255,0.93)",
              fontSize: "clamp(28px, 3.5vw, 46px)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.08,
              marginBottom: 20,
            }}>
              Your presence,
              <br />
              <span style={{
                background: "linear-gradient(135deg, #e2d9f3, #c4b5fd, #a78bfa, #8b5cf6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                perfected.
              </span>
            </h2>
            <p style={{
              color: "rgba(255,255,255,0.35)",
              fontSize: 16,
              lineHeight: 1.72,
              marginBottom: 44,
              maxWidth: 400,
            }}>
              Not a link in bio. An intelligent digital identity that evolves, adapts,
              and makes every interaction count.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 44 }}>
              {capabilities.map(({ title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                  style={{ display: "flex", gap: 16, alignItems: "flex-start" }}
                >
                  <div style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
                    flexShrink: 0,
                    marginTop: 6,
                    boxShadow: "0 0 10px rgba(139,92,246,0.55)",
                  }} />
                  <div>
                    <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 14, fontWeight: 600, marginBottom: 4 }}>
                      {title}
                    </p>
                    <p style={{ color: "rgba(255,255,255,0.34)", fontSize: 13, lineHeight: 1.65 }}>{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link
              href="/register"
              className="group inline-flex items-center gap-2 font-medium transition-colors duration-200"
              style={{ color: "rgba(167,139,250,0.75)", fontSize: 14 }}
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
