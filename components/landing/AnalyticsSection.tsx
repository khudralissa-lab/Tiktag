"use client";

import { motion } from "framer-motion";

const metrics = [
  { label: "Total Taps", value: "2,847", change: "+23%", color: "#8b5cf6", up: true },
  { label: "Profile Views", value: "8,204", change: "+12%", color: "#6366f1", up: true },
  { label: "Link Clicks", value: "3,119", change: "+8%", color: "#a78bfa", up: true },
  { label: "Saves", value: "641", change: "+31%", color: "#22d3ee", up: true },
];

const bars = [28, 45, 38, 72, 55, 88, 68];
const days = ["M", "T", "W", "T", "F", "S", "S"];

const sources = [
  { label: "NFC Tap", pct: 48, color: "#8b5cf6" },
  { label: "QR Scan", pct: 31, color: "#6366f1" },
  { label: "Direct", pct: 21, color: "rgba(255,255,255,0.22)" },
];

export default function AnalyticsSection() {
  return (
    <section style={{ padding: "120px 24px", background: "rgba(255,255,255,0.008)" }}>
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
            Identity Intelligence
          </p>
          <h2
            style={{
              color: "rgba(255,255,255,0.94)",
              fontSize: "clamp(32px, 4.5vw, 52px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
              marginBottom: 16,
            }}
          >
            Every tap tells a story.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 17, maxWidth: 460, margin: "0 auto" }}>
            Real-time intelligence on who's engaging, where they come from, and what drives the connection.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {metrics.map(({ label, value, change, color, up }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              style={{
                padding: "20px",
                borderRadius: 18,
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.055)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: `linear-gradient(90deg, ${color}60, ${color}20)`,
                }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: color,
                    boxShadow: `0 0 8px ${color}70`,
                  }}
                />
                <span
                  style={{
                    color: up ? "#4ade80" : "#f87171",
                    fontSize: 11,
                    fontWeight: 600,
                  }}
                >
                  {change}
                </span>
              </div>
              <p style={{ color: "white", fontSize: 26, fontWeight: 700, lineHeight: 1, marginBottom: 4 }}>
                {value}
              </p>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, letterSpacing: "0.02em" }}>{label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-3">
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{
              padding: "24px",
              borderRadius: 18,
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.055)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
              <div>
                <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 13, fontWeight: 600, marginBottom: 3 }}>
                  Engagement Overview
                </p>
                <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 11 }}>Last 7 days · All sources</p>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                {sources.map(({ label, color }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: color }} />
                    <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 10 }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 96, marginBottom: 10 }}>
              {bars.map((h, i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, height: "100%" }}>
                  <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end" }}>
                    <motion.div
                      style={{
                        width: "100%",
                        borderRadius: 4,
                        background: i === 5
                          ? "linear-gradient(180deg, rgba(139,92,246,0.85) 0%, rgba(99,102,241,0.4) 100%)"
                          : "linear-gradient(180deg, rgba(139,92,246,0.42) 0%, rgba(99,102,241,0.15) 100%)",
                        height: `${h}%`,
                      }}
                      initial={{ scaleY: 0, originY: "100%" }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {days.map((d, i) => (
                <p key={i} style={{ flex: 1, textAlign: "center", color: "rgba(255,255,255,0.18)", fontSize: 10 }}>
                  {d}
                </p>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.22 }}
            style={{
              padding: "24px",
              borderRadius: 18,
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.055)",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <div>
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 13, fontWeight: 600, marginBottom: 3 }}>
                Traffic Sources
              </p>
              <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 11 }}>This month</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {sources.map(({ label, pct, color }) => (
                <div key={label}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 12 }}>{label}</span>
                    <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: 600 }}>{pct}%</span>
                  </div>
                  <div
                    style={{
                      height: 4,
                      borderRadius: 4,
                      background: "rgba(255,255,255,0.06)",
                      overflow: "hidden",
                    }}
                  >
                    <motion.div
                      style={{
                        height: "100%",
                        borderRadius: 4,
                        background: `linear-gradient(90deg, ${color}, ${color}80)`,
                        width: `${pct}%`,
                      }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: "auto",
                padding: "14px",
                borderRadius: 12,
                background: "rgba(139,92,246,0.06)",
                border: "1px solid rgba(139,92,246,0.14)",
              }}
            >
              <p style={{ color: "rgba(167,139,250,0.7)", fontSize: 10, marginBottom: 4 }}>Top city this week</p>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 15, fontWeight: 600 }}>Dubai, UAE</p>
              <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 10, marginTop: 2 }}>431 interactions</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
