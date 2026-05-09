"use client";

import { motion } from "framer-motion";

const scenes = [
  {
    number: "01",
    label: "The Tap",
    title: "One touch. Everything shared.",
    desc: "Hold your phone near the card. In under a second, your complete digital identity appears — no app required, no friction, no limit.",
    visual: (
      <div style={{ position: "relative", height: 180, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            width: 80,
            height: 50,
            borderRadius: 8,
            background: "linear-gradient(145deg, #1c1c1e, #111)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 12px 32px rgba(0,0,0,0.6)",
            position: "relative",
            zIndex: 2,
          }}
        >
          <div style={{ position: "absolute", bottom: 6, right: 6, opacity: 0.3 }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M11 7c0 2.2-1.8 4-4 4" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M13 7C13 3.69 10.31 1 7 1" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
              <circle cx="7" cy="7" r="1" fill="white" />
            </svg>
          </div>
        </div>

        <motion.div
          style={{
            position: "absolute",
            width: 56,
            height: 96,
            borderRadius: 10,
            background: "linear-gradient(180deg, #141414 0%, #0a0a0a 100%)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.7)",
            zIndex: 3,
            left: "50%",
          }}
          animate={{ x: ["-80%", "-60%"] }}
          transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        >
          <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 20, height: 4, background: "black", borderRadius: "0 0 4px 4px" }} />
          <div style={{ padding: 8, paddingTop: 12 }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "linear-gradient(135deg, #8b5cf6, #6366f1)", margin: "0 auto 4px" }} />
            <div style={{ width: "100%", height: 1.5, background: "rgba(255,255,255,0.06)", borderRadius: 1, marginBottom: 3 }} />
            <div style={{ width: "80%", height: 1.5, background: "rgba(255,255,255,0.04)", borderRadius: 1 }} />
          </div>
        </motion.div>

        <motion.div
          style={{
            position: "absolute",
            width: 64,
            height: 64,
            borderRadius: "50%",
            border: "1.5px solid rgba(139,92,246,0.35)",
            zIndex: 1,
          }}
          animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.div
          style={{
            position: "absolute",
            width: 64,
            height: 64,
            borderRadius: "50%",
            border: "1px solid rgba(139,92,246,0.2)",
            zIndex: 1,
          }}
          animate={{ scale: [1, 2.2], opacity: [0.4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
        />
      </div>
    ),
  },
  {
    number: "02",
    label: "The Experience",
    title: "Your presence, beautifully delivered.",
    desc: "A full intelligent profile loads instantly — links, contact actions, portfolio, AI-powered bio. A complete experience, not just a name and number.",
    visual: (
      <div style={{ height: 180, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            width: 90,
            height: 152,
            borderRadius: 14,
            background: "linear-gradient(180deg, #111 0%, #0a0a0a 100%)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 24px 60px rgba(0,0,0,0.75), 0 0 40px rgba(139,92,246,0.08)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 22, height: 4, background: "black", borderRadius: "0 0 5px 5px" }} />
          <div style={{ paddingTop: 12, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #8b5cf6, #6366f1)", marginBottom: 4, boxShadow: "0 4px 12px rgba(139,92,246,0.4)" }} />
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 7, fontWeight: 600, marginBottom: 1 }}>Alex Johnson</p>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 6, marginBottom: 8 }}>CDO · Dubai</p>
            <div style={{ display: "flex", gap: 3, width: "80%", marginBottom: 6 }}>
              {["Call", "Chat"].map((l) => (
                <div key={l} style={{ flex: 1, height: 14, borderRadius: 4, background: "rgba(139,92,246,0.18)", border: "1px solid rgba(139,92,246,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "rgba(167,139,250,0.8)", fontSize: 5.5 }}>{l}</span>
                </div>
              ))}
            </div>
            {["Portfolio", "LinkedIn", "Save"].map((l, i) => (
              <div
                key={l}
                style={{
                  width: "80%",
                  height: 12,
                  borderRadius: 4,
                  background: i === 0 ? "rgba(139,92,246,0.18)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${i === 0 ? "rgba(139,92,246,0.25)" : "rgba(255,255,255,0.05)"}`,
                  marginBottom: 3,
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: 5,
                }}
              >
                <span style={{ color: i === 0 ? "rgba(167,139,250,0.8)" : "rgba(255,255,255,0.3)", fontSize: 5.5 }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    number: "03",
    label: "The Intelligence",
    title: "Every interaction, measured and understood.",
    desc: "Real-time analytics track every tap, scan, and click. Know who engaged, how they found you, and what drove the connection — all in your dashboard.",
    visual: (
      <div style={{ height: 180, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 180, position: "relative" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 6 }}>
            {[
              { label: "Taps", val: "2.8K", color: "#8b5cf6" },
              { label: "Clicks", val: "1.2K", color: "#6366f1" },
            ].map(({ label, val, color }) => (
              <div
                key={label}
                style={{
                  padding: "10px 12px",
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 8, marginBottom: 3 }}>{label}</p>
                <p style={{ color, fontSize: 16, fontWeight: 700, lineHeight: 1 }}>{val}</p>
              </div>
            ))}
          </div>
          <div
            style={{
              padding: "12px",
              borderRadius: 10,
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 40 }}>
              {[35, 55, 42, 78, 60, 90, 70].map((h, i) => (
                <motion.div
                  key={i}
                  style={{
                    flex: 1,
                    borderRadius: 2,
                    background: "linear-gradient(180deg, rgba(139,92,246,0.6), rgba(99,102,241,0.2))",
                    height: `${h}%`,
                  }}
                  initial={{ scaleY: 0, originY: "100%" }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

export default function CinematicScene() {
  return (
    <section style={{ padding: "120px 24px" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center"
          style={{ marginBottom: 72 }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <p
            style={{
              color: "rgba(139,92,246,0.8)",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            The ritual
          </p>
          <h2
            style={{
              color: "rgba(255,255,255,0.94)",
              fontSize: "clamp(32px, 4.5vw, 52px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
            }}
          >
            Three moments. One ecosystem.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {scenes.map(({ number, label, title, desc, visual }, i) => (
            <motion.div
              key={number}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              style={{
                borderRadius: 20,
                overflow: "hidden",
                background: "rgba(255,255,255,0.015)",
                border: "1px solid rgba(255,255,255,0.055)",
              }}
            >
              <div
                style={{
                  padding: "32px 28px 20px",
                  background: "rgba(255,255,255,0.01)",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                }}
              >
                {visual}
              </div>

              <div style={{ padding: "24px 28px 28px" }}>
                <div className="flex items-center gap-3 mb-3">
                  <span
                    style={{
                      color: "rgba(255,255,255,0.15)",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      fontFamily: "monospace",
                    }}
                  >
                    {number}
                  </span>
                  <span
                    style={{
                      color: "rgba(139,92,246,0.75)",
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                    }}
                  >
                    {label}
                  </span>
                </div>
                <h3
                  style={{
                    color: "rgba(255,255,255,0.9)",
                    fontSize: 16,
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.35,
                    marginBottom: 10,
                  }}
                >
                  {title}
                </h3>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, lineHeight: 1.65 }}>{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
