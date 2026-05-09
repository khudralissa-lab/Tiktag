"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

const materials = [
  {
    id: "void",
    name: "Void Black",
    desc: "Matte obsidian",
    swatch: "linear-gradient(145deg, #1e1e22, #111, #0d0d11)",
    card: {
      gradient: "linear-gradient(145deg, #1e1e22 0%, #131317 38%, #0d0d11 68%, #181820 100%)",
      border: "rgba(255,255,255,0.1)",
      topLight: "rgba(255,255,255,0.075)",
      textColor: "rgba(255,255,255,0.88)",
      subColor: "rgba(255,255,255,0.32)",
      glow: "rgba(88,28,235,0.12)",
      pattern: false,
    },
  },
  {
    id: "carbon",
    name: "Carbon",
    desc: "Woven carbon fibre",
    swatch: "linear-gradient(145deg, #111, #0d0d0d, #141414)",
    card: {
      gradient: "linear-gradient(145deg, #111114 0%, #0d0d10 40%, #0a0a0d 70%, #141418 100%)",
      border: "rgba(255,255,255,0.1)",
      topLight: "rgba(255,255,255,0.045)",
      textColor: "rgba(255,255,255,0.85)",
      subColor: "rgba(255,255,255,0.3)",
      glow: "rgba(60,60,80,0.12)",
      pattern: true,
    },
  },
  {
    id: "chrome",
    name: "Chrome",
    desc: "Mirror steel",
    swatch: "linear-gradient(145deg, #d0d0d8, #e8e8f0, #b4b4bc, #f0f0f8)",
    card: {
      gradient: "linear-gradient(145deg, #d0d0d8 0%, #e8e8f0 20%, #b4b4bc 42%, #f0f0f8 64%, #c4c4cc 82%, #dcdce4 100%)",
      border: "rgba(255,255,255,0.4)",
      topLight: "rgba(255,255,255,0.5)",
      textColor: "rgba(30,30,38,0.9)",
      subColor: "rgba(30,30,38,0.42)",
      glow: "rgba(200,200,220,0.1)",
      pattern: false,
    },
  },
  {
    id: "arctic",
    name: "Arctic White",
    desc: "Pearl ceramic",
    swatch: "linear-gradient(145deg, #f5f5f7, #fafafa, #f0f0f2, #ffffff)",
    card: {
      gradient: "linear-gradient(145deg, #f5f5f7 0%, #fafafa 28%, #f0f0f2 58%, #ffffff 82%, #ededef 100%)",
      border: "rgba(200,200,210,0.4)",
      topLight: "rgba(255,255,255,0.7)",
      textColor: "rgba(20,20,28,0.88)",
      subColor: "rgba(20,20,28,0.38)",
      glow: "rgba(220,220,240,0.08)",
      pattern: false,
    },
  },
  {
    id: "aurora",
    name: "Aurora",
    desc: "Deep violet holo",
    swatch: "linear-gradient(145deg, #1a1038, #0f0928, #1e153e)",
    card: {
      gradient: "linear-gradient(145deg, #1a1038 0%, #0f0928 35%, #1e153e 68%, #130c2c 100%)",
      border: "rgba(139,92,246,0.3)",
      topLight: "rgba(139,92,246,0.1)",
      textColor: "rgba(255,255,255,0.88)",
      subColor: "rgba(200,180,255,0.4)",
      glow: "rgba(88,28,235,0.15)",
      pattern: false,
    },
  },
];

const accents = [
  { id: "gold", name: "Gold", color: "#d4a853", chipGrad: "linear-gradient(135deg, #d4a853, #b8882a, #e8c468, #a07025, #d4a853)" },
  { id: "silver", name: "Silver", color: "#c0c0c8", chipGrad: "linear-gradient(135deg, #d0d0d8, #a8a8b0, #e0e0e8, #909098)" },
  { id: "violet", name: "Violet", color: "#8b5cf6", chipGrad: "linear-gradient(135deg, #8b5cf6, #6d28d9, #a78bfa, #5b21b6)" },
  { id: "obsidian", name: "Obsidian", color: "#3a3a42", chipGrad: "linear-gradient(135deg, #3a3a42, #1c1c22, #4a4a52, #0d0d12)" },
  { id: "rose", name: "Rose Gold", color: "#e8a0b0", chipGrad: "linear-gradient(135deg, #e8a0b0, #c87890, #f0b8c8, #b06878)" },
];

function StudioCardPreview({
  material,
  accent,
}: {
  material: (typeof materials)[0];
  accent: (typeof accents)[0];
}) {
  const c = material.card;
  const isDark = material.id !== "arctic" && material.id !== "chrome";

  return (
    <motion.div
      key={`${material.id}-${accent.id}`}
      initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      exit={{ opacity: 0, scale: 0.96, rotateY: 6 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: "relative", width: 380, perspective: "1400px" }}
    >
      {/* Glow behind card */}
      <div style={{
        position: "absolute",
        inset: "-25%",
        background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${c.glow} 0%, transparent 70%)`,
        filter: "blur(28px)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      {/* Ground shadow */}
      <div style={{
        position: "absolute",
        bottom: -52,
        left: "50%",
        transform: "translateX(-50%)",
        width: "60%",
        height: 60,
        background: "radial-gradient(ellipse, rgba(0,0,0,0.95) 0%, transparent 70%)",
        filter: "blur(24px)",
        zIndex: 0,
      }} />

      {/* Card */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: 380,
          height: 238,
          borderRadius: 22,
          background: c.gradient,
          border: `1px solid ${c.border}`,
          boxShadow: `
            0 80px 160px rgba(0,0,0,0.88),
            0 40px 80px rgba(0,0,0,0.82),
            0 15px 30px rgba(0,0,0,0.72),
            0 80px 160px -50px ${c.glow.replace("0.15", "0.4").replace("0.12", "0.35").replace("0.1", "0.3")},
            inset 0 1px 0 ${c.topLight},
            inset 0 -1px 0 rgba(0,0,0,0.3)
          `,
          transform: "rotateX(3deg) rotateY(-8deg)",
          position: "relative",
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        {/* Brushed texture */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0) 0px, rgba(255,255,255,0) 1px, rgba(255,255,255,0.007) 1px, rgba(255,255,255,0.007) 2px)",
          backgroundSize: "100% 2px",
        }} />

        {/* Carbon pattern */}
        {c.pattern && (
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.022) 0px, rgba(255,255,255,0.022) 1px, transparent 1px, transparent 5px), repeating-linear-gradient(-45deg, rgba(255,255,255,0.022) 0px, rgba(255,255,255,0.022) 1px, transparent 1px, transparent 5px)",
          }} />
        )}

        {/* Top specular */}
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "44%",
          background: `linear-gradient(180deg, ${c.topLight} 0%, rgba(255,255,255,0.018) 55%, transparent 100%)`,
          borderRadius: "22px 22px 0 0",
        }} />

        {/* Aurora shimmer */}
        {material.id === "aurora" && (
          <motion.div
            style={{
              position: "absolute", top: 0, bottom: 0,
              width: "22%",
              background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.07), rgba(99,102,241,0.04), transparent)",
              filter: "blur(6px)",
            }}
            animate={{ left: ["-22%", "115%"] }}
            transition={{ duration: 4, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }}
          />
        )}

        {/* Shimmer */}
        <motion.div
          style={{
            position: "absolute", top: 0, bottom: 0,
            width: "20%",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.045), rgba(255,255,255,0.02), transparent)",
            filter: "blur(5px)",
          }}
          animate={{ left: ["-20%", "115%"] }}
          transition={{ duration: 5, repeat: Infinity, repeatDelay: 4, ease: "easeInOut", delay: 1 }}
        />

        {/* Content */}
        <div style={{
          position: "relative",
          padding: "28px 30px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <span style={{ color: c.textColor, fontSize: 10, fontWeight: 700, letterSpacing: "0.28em", opacity: 0.8 }}>
              TIKTAG
            </span>
            <div style={{
              width: 32,
              height: 25,
              borderRadius: 5,
              background: accent.chipGrad,
              border: `0.5px solid ${accent.color}50`,
              boxShadow: `0 2px 6px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.2)`,
              display: "flex",
              flexDirection: "column" as const,
              gap: 4,
              padding: "5px 5px",
              justifyContent: "center",
            }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ height: 1, background: isDark ? "rgba(0,0,0,0.22)" : "rgba(255,255,255,0.22)", borderRadius: 1 }} />
              ))}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <p style={{ color: c.textColor, fontSize: 16, fontWeight: 600, letterSpacing: "0.01em", marginBottom: 4 }}>
                Your Name
              </p>
              <p style={{ color: c.subColor, fontSize: 11, letterSpacing: "0.04em" }}>
                Your Title
              </p>
            </div>
            <div style={{ opacity: 0.2 }}>
              <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
                <path d="M22 14c0 4.4-3.6 8-8 8" stroke={isDark ? "white" : "#333"} strokeWidth="1.4" strokeLinecap="round" />
                <path d="M26 14C26 7.37 20.63 2 14 2" stroke={isDark ? "white" : "#333"} strokeWidth="1.4" strokeLinecap="round" />
                <path d="M18 14c0 2.2-1.8 4-4 4" stroke={isDark ? "white" : "#333"} strokeWidth="1.4" strokeLinecap="round" />
                <circle cx="14" cy="14" r="1.6" fill={isDark ? "white" : "#333"} />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Ground reflection */}
      <div style={{
        position: "absolute",
        top: 240,
        left: "8%", right: "8%",
        height: 60,
        background: c.gradient,
        opacity: 0.055,
        transform: "scaleY(-1) rotateX(-1.5deg) rotateY(-8deg)",
        filter: "blur(4px)",
        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)",
        maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)",
        borderRadius: "0 0 22px 22px",
        zIndex: 0,
      }} />
    </motion.div>
  );
}

export default function ProductConfigurator() {
  const [selectedMaterial, setSelectedMaterial] = useState(materials[0]);
  const [selectedAccent, setSelectedAccent] = useState(accents[0]);

  return (
    <section
      id="configurator"
      style={{ padding: "120px 24px", background: "#04040d" }}
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
          <p style={{
            color: "rgba(139,92,246,0.75)",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            marginBottom: 18,
          }}>
            Identity Studio
          </p>
          <h2 style={{
            color: "rgba(255,255,255,0.93)",
            fontSize: "clamp(32px, 4.5vw, 54px)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1.06,
            marginBottom: 18,
          }}>
            Configure your card.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.32)", fontSize: 17, maxWidth: 400, margin: "0 auto", lineHeight: 1.65 }}>
            Choose your material, accent, and make it unmistakably yours.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
            className="space-y-8"
          >
            {/* Material */}
            <div>
              <p style={{
                color: "rgba(255,255,255,0.26)",
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                marginBottom: 14,
              }}>
                Material
              </p>
              <div className="flex flex-col gap-2">
                {materials.map((mat) => {
                  const active = selectedMaterial.id === mat.id;
                  return (
                    <button
                      key={mat.id}
                      onClick={() => setSelectedMaterial(mat)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        padding: "12px 16px",
                        borderRadius: 12,
                        background: active ? "rgba(139,92,246,0.08)" : "rgba(255,255,255,0.016)",
                        border: `1px solid ${active ? "rgba(139,92,246,0.28)" : "rgba(255,255,255,0.05)"}`,
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "all 0.2s ease",
                        width: "100%",
                      }}
                    >
                      <div style={{
                        width: 40,
                        height: 27,
                        borderRadius: 7,
                        background: mat.swatch,
                        border: `1px solid ${mat.card.border}`,
                        flexShrink: 0,
                        position: "relative",
                        overflow: "hidden",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
                      }}>
                        {mat.card.pattern && (
                          <div style={{
                            position: "absolute", inset: 0,
                            backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 4px), repeating-linear-gradient(-45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 4px)",
                          }} />
                        )}
                        <div style={{
                          position: "absolute",
                          top: 0, left: 0, right: 0,
                          height: "45%",
                          background: `linear-gradient(180deg, ${mat.card.topLight} 0%, transparent 100%)`,
                          borderRadius: "7px 7px 0 0",
                        }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ color: "rgba(255,255,255,0.82)", fontSize: 13, fontWeight: 500 }}>{mat.name}</p>
                        <p style={{ color: "rgba(255,255,255,0.28)", fontSize: 11, marginTop: 1 }}>{mat.desc}</p>
                      </div>
                      {active && <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#a78bfa" }} />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Accent */}
            <div>
              <p style={{
                color: "rgba(255,255,255,0.26)",
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                marginBottom: 14,
              }}>
                Chip accent
              </p>
              <div className="flex gap-2 flex-wrap">
                {accents.map((acc) => {
                  const active = selectedAccent.id === acc.id;
                  return (
                    <button
                      key={acc.id}
                      onClick={() => setSelectedAccent(acc)}
                      title={acc.name}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 6,
                        padding: "10px 14px",
                        borderRadius: 12,
                        background: active ? "rgba(139,92,246,0.08)" : "rgba(255,255,255,0.016)",
                        border: `1px solid ${active ? "rgba(139,92,246,0.28)" : "rgba(255,255,255,0.05)"}`,
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <div style={{
                        width: 28,
                        height: 22,
                        borderRadius: 5,
                        background: acc.chipGrad,
                        border: "0.5px solid rgba(255,255,255,0.12)",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)",
                      }} />
                      <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 9 }}>{acc.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <Link
              href="/register"
              className="group flex items-center gap-2.5 rounded-xl font-semibold transition-all duration-300"
              style={{
                padding: "14px 28px",
                background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
                boxShadow: "0 8px 32px rgba(139,92,246,0.3), 0 0 0 1px rgba(139,92,246,0.15)",
                color: "white",
                fontSize: 15,
                display: "inline-flex",
                width: "fit-content",
              }}
            >
              Reserve yours
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          {/* Studio preview */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.1 }}
          >
            <div
              style={{
                width: "100%",
                padding: "56px 32px 48px",
                borderRadius: 24,
                background: "rgba(255,255,255,0.012)",
                border: "1px solid rgba(255,255,255,0.045)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 28,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Studio vignette */}
              <div style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 40%, rgba(2,2,10,0.6) 100%)",
                pointerEvents: "none",
              }} />

              {/* Studio ceiling light */}
              <div style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: 3,
                height: "40%",
                background: "linear-gradient(180deg, rgba(139,92,246,0.12), transparent)",
                filter: "blur(8px)",
                pointerEvents: "none",
              }} />

              <div style={{ position: "relative", zIndex: 1 }}>
                <AnimatePresence mode="wait">
                  <StudioCardPreview
                    key={`${selectedMaterial.id}-${selectedAccent.id}`}
                    material={selectedMaterial}
                    accent={selectedAccent}
                  />
                </AnimatePresence>
              </div>

              <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, fontWeight: 500 }}>
                  {selectedMaterial.name} · {selectedAccent.name} Chip
                </p>
                <p style={{ color: "rgba(255,255,255,0.22)", fontSize: 11, marginTop: 4 }}>
                  NFC-embedded · Precision engraved · Custom logo available
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
