"use client";

import { motion } from "framer-motion";

interface MaterialCardProps {
  gradient: string;
  border: string;
  reflection: string;
  shimmer?: string;
  pattern?: boolean;
}

function MaterialCard({ gradient, border, reflection, shimmer, pattern }: MaterialCardProps) {
  return (
    <div
      style={{
        width: "100%",
        height: 120,
        borderRadius: 14,
        background: gradient,
        border: `1px solid ${border}`,
        boxShadow: "0 20px 50px rgba(0,0,0,0.65), inset 0 1px 0 " + reflection,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {pattern && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 5px), repeating-linear-gradient(-45deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 5px)",
          }}
        />
      )}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "40%",
          background: `linear-gradient(180deg, ${shimmer || "rgba(255,255,255,0.04)"} 0%, transparent 100%)`,
          borderRadius: "14px 14px 0 0",
        }}
      />
      <div style={{ position: "absolute", bottom: 10, right: 12, opacity: 0.2 }}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M18 11c0 3.87-3.13 7-7 7" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M20 11C20 5.48 15.52 1 10 1" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M15 11c0 2.21-1.79 4-4 4" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
          <circle cx="11" cy="11" r="1.4" fill="white" />
        </svg>
      </div>
      <div style={{ position: "absolute", top: 10, left: 12 }}>
        <span
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: 7,
            fontWeight: 700,
            letterSpacing: "0.24em",
          }}
        >
          TIKTAG
        </span>
      </div>
    </div>
  );
}

const products = [
  {
    collection: "Business",
    collectionColor: "#94a3b8",
    name: "Signature Card",
    desc: "The professional standard. Matte-finished, NFC-embedded, instantly shareable.",
    tag: "Most Popular",
    card: {
      gradient: "linear-gradient(145deg, #1c1c1e 0%, #111113 40%, #0d0d0f 70%, #161618 100%)",
      border: "rgba(255,255,255,0.09)",
      reflection: "rgba(255,255,255,0.06)",
    },
    large: true,
  },
  {
    collection: "Luxury",
    collectionColor: "#d4a853",
    name: "Metal Edition",
    desc: "Precision-machined brushed titanium. Weight that speaks before you do.",
    tag: "Limited",
    card: {
      gradient: "linear-gradient(145deg, #c8c8d0 0%, #e8e8f0 25%, #b0b0b8 50%, #d8d8e0 75%, #c0c0c8 100%)",
      border: "rgba(255,255,255,0.35)",
      reflection: "rgba(255,255,255,0.4)",
      shimmer: "rgba(255,255,255,0.2)",
    },
    large: false,
  },
  {
    collection: "Creator",
    collectionColor: "#8b5cf6",
    name: "Aurora Card",
    desc: "Deep violet holographic finish. For the identities that refuse to blend in.",
    tag: null,
    card: {
      gradient: "linear-gradient(145deg, #1a1035 0%, #0f0927 35%, #1e153d 70%, #130c28 100%)",
      border: "rgba(139,92,246,0.28)",
      reflection: "rgba(139,92,246,0.08)",
    },
    large: false,
  },
  {
    collection: "Restaurant",
    collectionColor: "#f59e0b",
    name: "Table Stand",
    desc: "Instant menu, reviews, and Wi-Fi sharing. One tap at every table.",
    tag: "New",
    card: {
      gradient: "linear-gradient(145deg, #1a1208 0%, #241808 40%, #1a1208 100%)",
      border: "rgba(245,158,11,0.22)",
      reflection: "rgba(245,158,11,0.05)",
    },
    large: false,
  },
  {
    collection: "Creator",
    collectionColor: "#8b5cf6",
    name: "Carbon Sticker",
    desc: "Ultra-thin, weatherproof. Stick it on anything and share from anywhere.",
    tag: null,
    card: {
      gradient: "linear-gradient(145deg, #111 0%, #0d0d0d 100%)",
      border: "rgba(255,255,255,0.1)",
      reflection: "rgba(255,255,255,0.03)",
      pattern: true,
    },
    large: false,
  },
  {
    collection: "Enterprise",
    collectionColor: "#22d3ee",
    name: "Event Badge",
    desc: "Smart networking at scale. NFC-powered conference badges that log every handshake.",
    tag: null,
    card: {
      gradient: "linear-gradient(145deg, #0d1a1e 0%, #081214 40%, #0f1f24 100%)",
      border: "rgba(34,211,238,0.2)",
      reflection: "rgba(34,211,238,0.04)",
    },
    large: false,
  },
];

export default function ProductShowcase() {
  const featured = products[0];
  const rest = products.slice(1);

  return (
    <section
      id="products"
      style={{ padding: "120px 24px", background: "rgba(255,255,255,0.008)" }}
    >
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
            The collection
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
            Hardware built for the future.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 17, maxWidth: 480, margin: "0 auto" }}>
            Every material, finish, and form factor — designed with precision and purpose.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <motion.div
            className="md:col-span-5"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            style={{
              borderRadius: 22,
              overflow: "hidden",
              background: "rgba(255,255,255,0.018)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div style={{ padding: "32px 28px 20px" }}>
              <MaterialCard {...featured.card} />
            </div>
            <div style={{ padding: "0 28px 32px" }}>
              <div className="flex items-center gap-2.5 mb-3">
                <span
                  style={{
                    color: featured.collectionColor,
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}
                >
                  {featured.collection}
                </span>
                {featured.tag && (
                  <span
                    style={{
                      padding: "2px 8px",
                      borderRadius: 20,
                      background: "rgba(139,92,246,0.12)",
                      border: "1px solid rgba(139,92,246,0.22)",
                      color: "#a78bfa",
                      fontSize: 9,
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                    }}
                  >
                    {featured.tag}
                  </span>
                )}
              </div>
              <h3
                style={{
                  color: "rgba(255,255,255,0.92)",
                  fontSize: 22,
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  marginBottom: 8,
                }}
              >
                {featured.name}
              </h3>
              <p style={{ color: "rgba(255,255,255,0.38)", fontSize: 14, lineHeight: 1.6 }}>{featured.desc}</p>
            </div>
          </motion.div>

          <div className="md:col-span-7 grid grid-cols-2 gap-4">
            {rest.map(({ collection, collectionColor, name, desc, tag, card }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  borderRadius: 18,
                  overflow: "hidden",
                  background: "rgba(255,255,255,0.018)",
                  border: "1px solid rgba(255,255,255,0.055)",
                }}
              >
                <div style={{ padding: "20px 18px 12px" }}>
                  <MaterialCard {...card} />
                </div>
                <div style={{ padding: "0 18px 20px" }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      style={{
                        color: collectionColor,
                        fontSize: 8,
                        fontWeight: 700,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                      }}
                    >
                      {collection}
                    </span>
                    {tag && (
                      <span
                        style={{
                          padding: "1.5px 6px",
                          borderRadius: 20,
                          background: `${collectionColor}15`,
                          border: `1px solid ${collectionColor}30`,
                          color: collectionColor,
                          fontSize: 8,
                          fontWeight: 600,
                        }}
                      >
                        {tag}
                      </span>
                    )}
                  </div>
                  <h3
                    style={{
                      color: "rgba(255,255,255,0.88)",
                      fontSize: 14,
                      fontWeight: 600,
                      letterSpacing: "-0.01em",
                      marginBottom: 4,
                    }}
                  >
                    {name}
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.32)", fontSize: 11, lineHeight: 1.55 }}>{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
