"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const capabilities = [
  {
    title: "Unified team identity",
    desc: "Every employee gets a smart card and live profile — all under your brand. Update any detail from a single admin dashboard.",
    color: "#8b5cf6",
  },
  {
    title: "Command-level analytics",
    desc: "See exactly who your team is connecting with. Track which profiles drive the most leads and conversions — by person, by event, by region.",
    color: "#6366f1",
  },
  {
    title: "White-label hardware",
    desc: "Bulk-order NFC cards, stands, and badges with your exact branding. From 10 to 10,000 — crafted to specification.",
    color: "#22d3ee",
  },
];

const teamMembers = [
  { initials: "SC", name: "Sarah Chen", role: "CEO", grad: "from-violet-600 to-purple-800", taps: "847", trend: "+18%" },
  { initials: "AJ", name: "Alex Johnson", role: "Design Lead", grad: "from-indigo-600 to-blue-800", taps: "612", trend: "+9%" },
  { initials: "MT", name: "Mike Torres", role: "Sales Director", grad: "from-blue-600 to-cyan-800", taps: "533", trend: "+24%" },
  { initials: "NA", name: "Nour Al-Rashid", role: "Partnerships", grad: "from-fuchsia-600 to-purple-800", taps: "421", trend: "+15%" },
];

export default function ForBusinesses() {
  return (
    <section style={{ padding: "120px 24px", background: "#05050f", position: "relative", overflow: "hidden" }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              style={{
                color: "rgba(34,211,238,0.8)",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              Enterprise
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
              Built for teams.
              <br />
              <span style={{ color: "rgba(255,255,255,0.42)" }}>Designed for scale.</span>
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.38)",
                fontSize: 16,
                lineHeight: 1.7,
                marginBottom: 40,
                maxWidth: 400,
              }}
            >
              From 5-person startups to global enterprises — give every person in your organization a professional smart identity that reflects your brand.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 40 }}>
              {capabilities.map(({ title, desc, color }, i) => (
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
                      background: color,
                      flexShrink: 0,
                      marginTop: 6,
                      boxShadow: `0 0 8px ${color}60`,
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
              style={{ color: "rgba(103,232,249,0.75)", fontSize: 14 }}
            >
              Talk to our enterprise team
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              style={{
                borderRadius: 22,
                background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.016) 100%)",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "0 24px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.05)",
                padding: "28px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div>
                  <p style={{ color: "rgba(255,255,255,0.22)", fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 3 }}>
                    Team Command Center
                  </p>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, fontWeight: 500 }}>Acme Corporation</p>
                </div>
                <div
                  style={{
                    padding: "5px 10px",
                    borderRadius: 8,
                    background: "rgba(74,222,128,0.08)",
                    border: "1px solid rgba(74,222,128,0.18)",
                  }}
                >
                  <span style={{ color: "#4ade80", fontSize: 10, fontWeight: 600 }}>● Live</span>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
                {teamMembers.map(({ initials, name, role, grad, taps, trend }, i) => (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 14px",
                      borderRadius: 12,
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.055)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div
                        className={`w-9 h-9 rounded-full bg-gradient-to-br ${grad} flex items-center justify-center flex-shrink-0`}
                      >
                        <span style={{ color: "white", fontSize: 10, fontWeight: 700 }}>{initials}</span>
                      </div>
                      <div>
                        <p style={{ color: "rgba(255,255,255,0.82)", fontSize: 12, fontWeight: 500 }}>{name}</p>
                        <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 10, marginTop: 1 }}>{role}</p>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, fontWeight: 600 }}>{taps}</p>
                      <p style={{ color: "#4ade80", fontSize: 9, marginTop: 1 }}>↑ {trend}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                {[
                  { label: "Team", value: "4", color: "#8b5cf6" },
                  { label: "Total Taps", value: "2.4K", color: "#6366f1" },
                  { label: "This Month", value: "+18%", color: "#22d3ee" },
                ].map(({ label, value, color }) => (
                  <div
                    key={label}
                    style={{
                      padding: "14px",
                      borderRadius: 12,
                      background: "rgba(139,92,246,0.05)",
                      border: "1px solid rgba(139,92,246,0.1)",
                      textAlign: "center",
                    }}
                  >
                    <p style={{ color, fontSize: 20, fontWeight: 700, lineHeight: 1, marginBottom: 4 }}>{value}</p>
                    <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 9 }}>{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
