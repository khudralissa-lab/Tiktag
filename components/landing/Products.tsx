"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface CardSpec {
  gradient: string;
  border: string;
  topLight: string;
  sideLight?: string;
  pattern?: boolean;
  glowColor: string;
  glowTint: string;
  textColor?: string;
  subColor?: string;
  chipColor?: string;
}

interface HardwareCardProps extends CardSpec {
  width: number;
  height: number;
  tiltX?: number;
  tiltY?: number;
  name?: string;
  role?: string;
  delay?: number;
}

function HardwareCard({
  width, height,
  gradient, border, topLight, sideLight, pattern,
  glowColor, glowTint,
  textColor = "rgba(255,255,255,0.88)",
  subColor = "rgba(255,255,255,0.32)",
  chipColor = "linear-gradient(135deg, #d4a853 0%, #b8882a 30%, #e8c468 52%, #a07025 72%, #d4a853 100%)",
  tiltX = 4, tiltY = -12,
  name, role,
  delay = 0,
}: HardwareCardProps) {
  const r = height * 0.085;
  const fontSize = Math.max(9, Math.floor(width * 0.027));
  const nameSize = Math.max(12, Math.floor(width * 0.038));
  const px = Math.floor(width * 0.083);
  const py = Math.floor(height * 0.115);

  return (
    <div style={{ position: "relative", width, perspective: "1600px" }}>
      {/* Atmospheric glow */}
      <div
        style={{
          position: "absolute",
          top: "-20%", bottom: "-20%", left: "-15%", right: "-15%",
          background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${glowColor} 0%, transparent 70%)`,
          filter: "blur(32px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Ground shadow */}
      <div
        style={{
          position: "absolute",
          bottom: -56,
          left: "50%",
          transform: "translateX(-50%)",
          width: "65%",
          height: 64,
          background: `radial-gradient(ellipse, rgba(0,0,0,0.95) 0%, ${glowTint} 50%, transparent 100%)`,
          filter: "blur(28px)",
          zIndex: 0,
        }}
      />

      {/* Main card */}
      <motion.div
        style={{
          width,
          height,
          borderRadius: r,
          background: gradient,
          border: `1px solid ${border}`,
          boxShadow: `
            0 80px 160px rgba(0,0,0,0.92),
            0 40px 80px rgba(0,0,0,0.85),
            0 16px 32px rgba(0,0,0,0.75),
            0 5px 10px rgba(0,0,0,0.6),
            0 80px 160px -50px ${glowTint},
            inset 0 1px 0 ${topLight},
            inset 0 -1px 0 rgba(0,0,0,0.35)
          `,
          transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
          position: "relative",
          overflow: "hidden",
          zIndex: 1,
        }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 7 + delay, repeat: Infinity, ease: "easeInOut", delay }}
      >
        {/* Brushed texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(255,255,255,0) 0px, rgba(255,255,255,0) 1px, rgba(255,255,255,0.007) 1px, rgba(255,255,255,0.007) 2px)",
            backgroundSize: "100% 2px",
          }}
        />

        {/* Pattern (carbon) */}
        {pattern && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "repeating-linear-gradient(45deg, rgba(255,255,255,0.022) 0px, rgba(255,255,255,0.022) 1px, transparent 1px, transparent 5px), repeating-linear-gradient(-45deg, rgba(255,255,255,0.022) 0px, rgba(255,255,255,0.022) 1px, transparent 1px, transparent 5px)",
            }}
          />
        )}

        {/* Top specular */}
        <div
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: "44%",
            background: `linear-gradient(180deg, ${topLight} 0%, rgba(255,255,255,0.018) 55%, transparent 100%)`,
            borderRadius: `${r}px ${r}px 0 0`,
          }}
        />

        {/* Side light */}
        {sideLight && (
          <div
            style={{
              position: "absolute",
              top: 0, left: 0, bottom: 0,
              width: "28%",
              background: `linear-gradient(90deg, ${sideLight} 0%, transparent 100%)`,
            }}
          />
        )}

        {/* Shimmer sweep */}
        <motion.div
          style={{
            position: "absolute",
            top: 0, bottom: 0,
            width: "22%",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.045), rgba(255,255,255,0.02), transparent)",
            filter: "blur(6px)",
          }}
          animate={{ left: ["-22%", "115%"] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatDelay: 3 + delay,
            ease: "easeInOut",
            delay: delay * 0.5,
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            padding: `${py}px ${px}px`,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <span
              style={{
                color: textColor,
                fontSize,
                fontWeight: 700,
                letterSpacing: "0.28em",
                opacity: 0.8,
              }}
            >
              TIKTAG
            </span>
            {/* Chip */}
            <div
              style={{
                width: Math.floor(width * 0.08),
                height: Math.floor(height * 0.115),
                borderRadius: 4,
                background: chipColor,
                border: "0.5px solid rgba(212,168,83,0.35)",
                boxShadow: "0 2px 6px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.18)",
                display: "flex",
                flexDirection: "column" as const,
                gap: 3,
                padding: "4px 4px",
                justifyContent: "center",
              }}
            >
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ height: 1, background: "rgba(0,0,0,0.22)", borderRadius: 1 }} />
              ))}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              {name && (
                <p style={{ color: textColor, fontSize: nameSize, fontWeight: 600, letterSpacing: "0.01em", marginBottom: 4 }}>
                  {name}
                </p>
              )}
              {role && (
                <p style={{ color: subColor, fontSize: Math.max(9, Math.floor(width * 0.025)), letterSpacing: "0.04em" }}>
                  {role}
                </p>
              )}
            </div>
            <div style={{ opacity: 0.18 }}>
              <svg width={Math.floor(width * 0.075)} height={Math.floor(width * 0.075)} viewBox="0 0 28 28" fill="none">
                <path d="M22 14c0 4.4-3.6 8-8 8" stroke={textColor} strokeWidth="1.4" strokeLinecap="round" />
                <path d="M26 14C26 7.37 20.63 2 14 2" stroke={textColor} strokeWidth="1.4" strokeLinecap="round" />
                <path d="M18 14c0 2.2-1.8 4-4 4" stroke={textColor} strokeWidth="1.4" strokeLinecap="round" />
                <circle cx="14" cy="14" r="1.6" fill={textColor} />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Ground reflection */}
      <div
        style={{
          position: "absolute",
          top: height + 2,
          left: "8%",
          right: "8%",
          height: Math.floor(height * 0.22),
          background: gradient,
          opacity: 0.055,
          transform: `scaleY(-1) rotateX(${-tiltX * 0.5}deg) rotateY(${tiltY}deg)`,
          filter: "blur(4px)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)",
          borderRadius: `0 0 ${r}px ${r}px`,
          zIndex: 0,
        }}
      />
    </div>
  );
}

const VOID: CardSpec = {
  gradient: "linear-gradient(145deg, #1e1e22 0%, #131317 38%, #0d0d11 68%, #181820 100%)",
  border: "rgba(255,255,255,0.1)",
  topLight: "rgba(255,255,255,0.075)",
  sideLight: "rgba(255,255,255,0.022)",
  glowColor: "rgba(88,28,235,0.1)",
  glowTint: "rgba(40,20,100,0.3)",
};

const CHROME: CardSpec = {
  gradient: "linear-gradient(145deg, #d0d0d8 0%, #e8e8f0 20%, #b4b4bc 42%, #f0f0f8 64%, #c4c4cc 82%, #dcdce4 100%)",
  border: "rgba(255,255,255,0.4)",
  topLight: "rgba(255,255,255,0.5)",
  sideLight: "rgba(255,255,255,0.15)",
  glowColor: "rgba(200,200,220,0.1)",
  glowTint: "rgba(160,160,200,0.18)",
  textColor: "rgba(30,30,38,0.9)",
  subColor: "rgba(30,30,38,0.42)",
  chipColor: "linear-gradient(135deg, #3a3a40 0%, #1c1c20 30%, #4a4a52 52%, #111116 72%, #3a3a40 100%)",
};

const AURORA: CardSpec = {
  gradient: "linear-gradient(145deg, #1a1038 0%, #0f0928 35%, #1e153e 68%, #130c2c 100%)",
  border: "rgba(139,92,246,0.3)",
  topLight: "rgba(139,92,246,0.1)",
  sideLight: "rgba(139,92,246,0.05)",
  glowColor: "rgba(88,28,235,0.14)",
  glowTint: "rgba(80,40,180,0.28)",
};

const AMBER: CardSpec = {
  gradient: "linear-gradient(145deg, #1a1208 0%, #221808 35%, #1c1408 68%, #201a08 100%)",
  border: "rgba(245,158,11,0.22)",
  topLight: "rgba(245,158,11,0.06)",
  glowColor: "rgba(180,100,0,0.1)",
  glowTint: "rgba(160,80,0,0.2)",
  chipColor: "linear-gradient(135deg, #c87028 0%, #a05018 30%, #e08838 52%, #885010 72%, #c87028 100%)",
};

const CARBON: CardSpec = {
  gradient: "linear-gradient(145deg, #111114 0%, #0d0d10 40%, #0a0a0d 70%, #141418 100%)",
  border: "rgba(255,255,255,0.1)",
  topLight: "rgba(255,255,255,0.045)",
  pattern: true,
  glowColor: "rgba(60,60,80,0.1)",
  glowTint: "rgba(20,20,40,0.35)",
};

const TEAL: CardSpec = {
  gradient: "linear-gradient(145deg, #0c1c22 0%, #081418 35%, #0e2028 68%, #080f14 100%)",
  border: "rgba(34,211,238,0.22)",
  topLight: "rgba(34,211,238,0.06)",
  glowColor: "rgba(10,120,140,0.1)",
  glowTint: "rgba(10,80,100,0.25)",
};

const products = [
  {
    spec: VOID,
    collection: "Business",
    collectionColor: "#94a3b8",
    name: "Signature Card",
    desc: "The professional standard. Precision-crafted matte obsidian finish with NFC embedded at the core. Your complete identity in a single tap.",
    tag: "Most Popular",
    size: "hero" as const,
    tiltX: 3, tiltY: -8,
    name_card: "Alex Johnson",
    role_card: "Chief Design Officer",
  },
  {
    spec: CHROME,
    collection: "Luxury",
    collectionColor: "#d4a853",
    name: "Mirror Chrome",
    desc: "Precision-machined stainless steel with mirror polish. A card that carries weight — literally and figuratively.",
    tag: "Limited Edition",
    size: "feature" as const,
    tiltX: 4, tiltY: -14,
    name_card: "Sarah Chen",
    role_card: "CEO",
  },
  {
    spec: AURORA,
    collection: "Creator",
    collectionColor: "#8b5cf6",
    name: "Aurora Edition",
    desc: "Deep violet holographic surface that shifts with light. For the identities that refuse to blend in.",
    tag: null,
    size: "feature" as const,
    tiltX: 4, tiltY: 12,
    name_card: "Mia Khalil",
    role_card: "Creative Director",
  },
  {
    spec: AMBER,
    collection: "Restaurant",
    collectionColor: "#f59e0b",
    name: "Table Stand",
    desc: "Instant menu, reviews, Wi-Fi. One tap at every table.",
    tag: "New",
    size: "mini" as const,
    tiltX: 3, tiltY: -10,
  },
  {
    spec: CARBON,
    collection: "Creator",
    collectionColor: "#8b5cf6",
    name: "Carbon Sticker",
    desc: "Woven carbon fibre. Ultra-thin. Weatherproof. Anywhere.",
    tag: null,
    size: "mini" as const,
    tiltX: 3, tiltY: -10,
  },
  {
    spec: TEAL,
    collection: "Enterprise",
    collectionColor: "#22d3ee",
    name: "Event Badge",
    desc: "NFC-powered conference badges. Logged every handshake.",
    tag: null,
    size: "mini" as const,
    tiltX: 3, tiltY: -10,
  },
];

export default function ProductShowcase() {
  const hero = products[0];
  const [feat1, feat2] = products.slice(1, 3);
  const minis = products.slice(3);

  return (
    <section
      id="products"
      style={{ padding: "120px 24px", background: "#03030a" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center"
          style={{ marginBottom: 80 }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <p style={{
            color: "rgba(139,92,246,0.75)",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            marginBottom: 18,
          }}>
            The collection
          </p>
          <h2 style={{
            color: "rgba(255,255,255,0.93)",
            fontSize: "clamp(32px, 4.5vw, 54px)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1.06,
            marginBottom: 18,
          }}>
            Hardware built to last.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.32)", fontSize: 17, maxWidth: 440, margin: "0 auto", lineHeight: 1.65 }}>
            Every material, finish, and form factor — precision-engineered for the identity it carries.
          </p>
        </motion.div>

        {/* Hero product stage */}
        <motion.div
          className="relative flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
          style={{
            marginBottom: 80,
            padding: "56px 40px",
            borderRadius: 28,
            background: "rgba(255,255,255,0.012)",
            border: "1px solid rgba(255,255,255,0.05)",
            overflow: "hidden",
          }}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Stage ambient */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 70% 80% at 35% 50%, rgba(40,20,100,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          <div className="flex-shrink-0 flex justify-center" style={{ zIndex: 1 }}>
            <HardwareCard
              {...hero.spec}
              width={400}
              height={250}
              tiltX={hero.tiltX}
              tiltY={hero.tiltY}
              name={hero.name_card}
              role={hero.role_card}
              delay={0}
            />
          </div>

          <div style={{ flex: 1, zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <span style={{ color: hero.collectionColor, fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                {hero.collection}
              </span>
              {hero.tag && (
                <span style={{
                  padding: "3px 10px",
                  borderRadius: 20,
                  background: "rgba(139,92,246,0.1)",
                  border: "1px solid rgba(139,92,246,0.2)",
                  color: "#a78bfa",
                  fontSize: 9,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                }}>
                  {hero.tag}
                </span>
              )}
            </div>
            <h3 style={{
              color: "rgba(255,255,255,0.93)",
              fontSize: "clamp(24px, 3vw, 36px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              marginBottom: 16,
              lineHeight: 1.1,
            }}>
              {hero.name}
            </h3>
            <p style={{ color: "rgba(255,255,255,0.36)", fontSize: 15, lineHeight: 1.7, marginBottom: 28, maxWidth: 380 }}>
              {hero.desc}
            </p>
            <a
              href="#configurator"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                color: "rgba(167,139,250,0.8)",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              Configure yours <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>

        {/* Feature row 1: Card left, text right */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 items-center"
          style={{ marginBottom: 64 }}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex justify-center">
            <HardwareCard
              {...feat1.spec}
              width={320}
              height={200}
              tiltX={feat1.tiltX}
              tiltY={feat1.tiltY}
              name={feat1.name_card}
              role={feat1.role_card}
              delay={0.4}
            />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span style={{ color: feat1.collectionColor, fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                {feat1.collection}
              </span>
              {feat1.tag && (
                <span style={{
                  padding: "3px 10px",
                  borderRadius: 20,
                  background: `${feat1.collectionColor}14`,
                  border: `1px solid ${feat1.collectionColor}30`,
                  color: feat1.collectionColor,
                  fontSize: 9,
                  fontWeight: 600,
                }}>
                  {feat1.tag}
                </span>
              )}
            </div>
            <h3 style={{ color: "rgba(255,255,255,0.92)", fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 12, lineHeight: 1.15 }}>
              {feat1.name}
            </h3>
            <p style={{ color: "rgba(255,255,255,0.36)", fontSize: 14, lineHeight: 1.7 }}>{feat1.desc}</p>
          </div>
        </motion.div>

        {/* Feature row 2: Text left, card right */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 items-center"
          style={{ marginBottom: 64 }}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="order-2 md:order-1">
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span style={{ color: feat2.collectionColor, fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                {feat2.collection}
              </span>
            </div>
            <h3 style={{ color: "rgba(255,255,255,0.92)", fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 12, lineHeight: 1.15 }}>
              {feat2.name}
            </h3>
            <p style={{ color: "rgba(255,255,255,0.36)", fontSize: 14, lineHeight: 1.7 }}>{feat2.desc}</p>
          </div>
          <div className="flex justify-center order-1 md:order-2">
            <HardwareCard
              {...feat2.spec}
              width={320}
              height={200}
              tiltX={feat2.tiltX}
              tiltY={feat2.tiltY}
              name={feat2.name_card}
              role={feat2.role_card}
              delay={0.6}
            />
          </div>
        </motion.div>

        {/* Mini product grid */}
        <div style={{
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
          marginBottom: 56,
        }} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {minis.map(({ spec, collection, collectionColor, name, desc, tag, tiltX, tiltY }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                borderRadius: 18,
                overflow: "hidden",
                background: "rgba(255,255,255,0.014)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div style={{ padding: "28px 24px 16px", display: "flex", justifyContent: "center" }}>
                <HardwareCard
                  {...spec}
                  width={240}
                  height={150}
                  tiltX={tiltX}
                  tiltY={tiltY}
                  delay={i * 0.3}
                />
              </div>
              <div style={{ padding: "8px 24px 24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ color: collectionColor, fontSize: 8, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}>
                    {collection}
                  </span>
                  {tag && (
                    <span style={{
                      padding: "2px 7px",
                      borderRadius: 20,
                      background: `${collectionColor}14`,
                      border: `1px solid ${collectionColor}28`,
                      color: collectionColor,
                      fontSize: 8,
                      fontWeight: 600,
                    }}>
                      {tag}
                    </span>
                  )}
                </div>
                <h3 style={{ color: "rgba(255,255,255,0.88)", fontSize: 14, fontWeight: 600, letterSpacing: "-0.01em", marginBottom: 5 }}>
                  {name}
                </h3>
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, lineHeight: 1.55 }}>{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
