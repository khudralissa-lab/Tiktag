"use client";

import { motion } from "framer-motion";

const collections = [
  {
    id: "creator",
    name: "Creator",
    desc: "For artists, designers & influencers",
    accent: "#8b5cf6",
    glow: "rgba(139,92,246,0.15)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M3 15L9 3l6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5.5 10.5h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "business",
    name: "Business",
    desc: "Corporate identity & networking",
    accent: "#94a3b8",
    glow: "rgba(148,163,184,0.12)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="6" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "restaurant",
    name: "Restaurant",
    desc: "Menus, reviews & hospitality",
    accent: "#f59e0b",
    glow: "rgba(245,158,11,0.12)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 2v14M5 4c0 2.5 2 4 4 4s4-1.5 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "luxury",
    name: "Luxury",
    desc: "Ultra-premium metal & bespoke",
    accent: "#d4a853",
    glow: "rgba(212,168,83,0.14)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 2l1.8 5.4H17l-4.5 3.3 1.7 5.3L9 13l-5.2 3 1.7-5.3L1 7.4h6.2L9 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "enterprise",
    name: "Enterprise",
    desc: "Teams, scale & white-label",
    accent: "#22d3ee",
    glow: "rgba(34,211,238,0.1)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="2" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="10" y="2" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="2" y="10" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="10" y="10" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
];

export default function CollectionsStrip() {
  return (
    <section
      id="collections"
      style={{ borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)", padding: "56px 24px" }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="text-center mb-10"
          style={{
            color: "rgba(255,255,255,0.22)",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Five collections. One ecosystem.
        </motion.p>

        <div className="flex flex-wrap items-stretch justify-center gap-3">
          {collections.map(({ id, name, desc, accent, glow, icon }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="group cursor-default"
              style={{
                padding: "20px 24px",
                borderRadius: 16,
                background: "rgba(255,255,255,0.015)",
                border: "1px solid rgba(255,255,255,0.055)",
                minWidth: 160,
                flex: "1 1 160px",
                maxWidth: 220,
                transition: "all 0.3s ease",
              }}
              whileHover={{
                backgroundColor: glow,
                borderColor: `${accent}30`,
              }}
            >
              <div
                className="flex items-center justify-center mb-4"
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: `${accent}14`,
                  border: `1px solid ${accent}22`,
                  color: accent,
                }}
              >
                {icon}
              </div>
              <p style={{ color: "rgba(255,255,255,0.88)", fontSize: 13, fontWeight: 600, marginBottom: 4 }}>
                {name}
              </p>
              <p style={{ color: "rgba(255,255,255,0.32)", fontSize: 11, lineHeight: 1.5 }}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
