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
    cardGradient: "linear-gradient(145deg, #1c1c1e 0%, #111113 40%, #0d0d0f 70%, #161618 100%)",
    cardBorder: "rgba(255,255,255,0.09)",
    cardReflection: "rgba(255,255,255,0.06)",
    textColor: "rgba(255,255,255,0.88)",
    subColor: "rgba(255,255,255,0.32)",
    pattern: false,
  },
  {
    id: "carbon",
    name: "Carbon",
    desc: "Woven carbon fibre",
    cardGradient: "linear-gradient(145deg, #111 0%, #0d0d0d 100%)",
    cardBorder: "rgba(255,255,255,0.1)",
    cardReflection: "rgba(255,255,255,0.03)",
    textColor: "rgba(255,255,255,0.85)",
    subColor: "rgba(255,255,255,0.3)",
    pattern: true,
  },
  {
    id: "chrome",
    name: "Chrome",
    desc: "Mirror steel",
    cardGradient: "linear-gradient(145deg, #d4d4d8 0%, #e8e8ec 22%, #b4b4b8 44%, #f0f0f4 66%, #c8c8cc 88%, #dcdce0 100%)",
    cardBorder: "rgba(255,255,255,0.35)",
    cardReflection: "rgba(255,255,255,0.45)",
    textColor: "rgba(30,30,35,0.9)",
    subColor: "rgba(30,30,35,0.45)",
    pattern: false,
  },
  {
    id: "arctic",
    name: "Arctic White",
    desc: "Pearl ceramic",
    cardGradient: "linear-gradient(145deg, #f5f5f7 0%, #fafafa 30%, #f0f0f2 60%, #ffffff 85%, #ededef 100%)",
    cardBorder: "rgba(200,200,210,0.35)",
    cardReflection: "rgba(255,255,255,0.7)",
    textColor: "rgba(20,20,25,0.88)",
    subColor: "rgba(20,20,25,0.38)",
    pattern: false,
  },
  {
    id: "aurora",
    name: "Aurora",
    desc: "Deep violet holo",
    cardGradient: "linear-gradient(145deg, #1a1035 0%, #0f0927 35%, #1e153d 70%, #130c28 100%)",
    cardBorder: "rgba(139,92,246,0.28)",
    cardReflection: "rgba(139,92,246,0.08)",
    textColor: "rgba(255,255,255,0.88)",
    subColor: "rgba(200,180,255,0.4)",
    pattern: false,
  },
];

const accents = [
  { id: "gold", name: "Gold", color: "#d4a853", chipGrad: "linear-gradient(135deg, #d4a853, #b8882a, #e2b96a)" },
  { id: "silver", name: "Silver", color: "#c0c0c8", chipGrad: "linear-gradient(135deg, #d0d0d8, #a8a8b0, #e0e0e8)" },
  { id: "violet", name: "Violet", color: "#8b5cf6", chipGrad: "linear-gradient(135deg, #8b5cf6, #6d28d9, #a78bfa)" },
  { id: "obsidian", name: "Obsidian", color: "#3a3a3c", chipGrad: "linear-gradient(135deg, #3a3a3c, #1c1c1e, #4a4a4c)" },
  { id: "rose", name: "Rose Gold", color: "#e8a0b0", chipGrad: "linear-gradient(135deg, #e8a0b0, #c87890, #f0b8c8)" },
];

function LiveCardPreview({
  material,
  accent,
}: {
  material: (typeof materials)[0];
  accent: (typeof accents)[0];
}) {
  return (
    <motion.div
      key={`${material.id}-${accent.id}`}
      initial={{ opacity: 0, scale: 0.97, rotateY: -8 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        width: "100%",
        maxWidth: 360,
        height: 226,
        borderRadius: 22,
        background: material.cardGradient,
        border: `1px solid ${material.cardBorder}`,
        boxShadow: `0 60px 120px rgba(0,0,0,0.7), 0 0 0 0.5px rgba(255,255,255,0.03), inset 0 1px 0 ${material.cardReflection}`,
        position: "relative",
        overflow: "hidden",
        transformStyle: "preserve-3d",
      }}
    >
      {material.pattern && (
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
          height: "38%",
          background: `linear-gradient(180deg, ${material.cardReflection} 0%, transparent 100%)`,
          borderRadius: "22px 22px 0 0",
        }}
      />

      {material.id === "aurora" && (
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            width: 120,
            background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.07), rgba(99,102,241,0.04), transparent)",
            filter: "blur(8px)",
          }}
          animate={{ left: ["-120px", "480px"] }}
          transition={{ duration: 4, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
        />
      )}

      <div
        style={{
          position: "relative",
          padding: "26px 30px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <span
            style={{
              color: material.textColor,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.26em",
            }}
          >
            TIKTAG
          </span>
          <div
            style={{
              width: 32,
              height: 25,
              borderRadius: 5,
              background: accent.chipGrad,
              border: `0.5px solid ${accent.color}50`,
              boxShadow: `0 2px 6px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.2)`,
              display: "flex",
              flexDirection: "column",
              gap: 4,
              padding: "5px 5px",
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
            <p style={{ color: material.textColor, fontSize: 16, fontWeight: 600, letterSpacing: "0.01em", marginBottom: 4 }}>
              Your Name
            </p>
            <p style={{ color: material.subColor, fontSize: 11, letterSpacing: "0.04em" }}>
              Your Title
            </p>
          </div>
          <div style={{ opacity: 0.22 }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M22 14c0 4.4-3.6 8-8 8" stroke={material.id === "chrome" || material.id === "arctic" ? "#333" : "white"} strokeWidth="1.4" strokeLinecap="round" />
              <path d="M26 14C26 7.37 20.63 2 14 2" stroke={material.id === "chrome" || material.id === "arctic" ? "#333" : "white"} strokeWidth="1.4" strokeLinecap="round" />
              <path d="M18 14c0 2.2-1.8 4-4 4" stroke={material.id === "chrome" || material.id === "arctic" ? "#333" : "white"} strokeWidth="1.4" strokeLinecap="round" />
              <circle cx="14" cy="14" r="1.6" fill={material.id === "chrome" || material.id === "arctic" ? "#333" : "white"} />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProductConfigurator() {
  const [selectedMaterial, setSelectedMaterial] = useState(materials[0]);
  const [selectedAccent, setSelectedAccent] = useState(accents[0]);

  return (
    <section
      id="configurator"
      style={{ padding: "120px 24px" }}
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
            Identity Studio
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
            Configure your card.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 17, maxWidth: 420, margin: "0 auto" }}>
            Choose your material, accent, and make it unmistakably yours.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
            className="space-y-8"
          >
            <div>
              <p
                style={{
                  color: "rgba(255,255,255,0.28)",
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginBottom: 14,
                }}
              >
                Material
              </p>
              <div className="flex flex-col gap-2">
                {materials.map((mat) => (
                  <button
                    key={mat.id}
                    onClick={() => setSelectedMaterial(mat)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      padding: "12px 16px",
                      borderRadius: 12,
                      background: selectedMaterial.id === mat.id ? "rgba(139,92,246,0.08)" : "rgba(255,255,255,0.018)",
                      border: `1px solid ${selectedMaterial.id === mat.id ? "rgba(139,92,246,0.28)" : "rgba(255,255,255,0.055)"}`,
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.2s ease",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 24,
                        borderRadius: 7,
                        background: mat.cardGradient,
                        border: `1px solid ${mat.cardBorder}`,
                        flexShrink: 0,
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      {mat.pattern && (
                        <div style={{
                          position: "absolute", inset: 0,
                          backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 4px), repeating-linear-gradient(-45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 4px)",
                        }} />
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ color: "rgba(255,255,255,0.82)", fontSize: 13, fontWeight: 500 }}>{mat.name}</p>
                      <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, marginTop: 1 }}>{mat.desc}</p>
                    </div>
                    {selectedMaterial.id === mat.id && (
                      <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#a78bfa" }} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p
                style={{
                  color: "rgba(255,255,255,0.28)",
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginBottom: 14,
                }}
              >
                Chip accent
              </p>
              <div className="flex gap-2 flex-wrap">
                {accents.map((acc) => (
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
                      background: selectedAccent.id === acc.id ? "rgba(139,92,246,0.08)" : "rgba(255,255,255,0.018)",
                      border: `1px solid ${selectedAccent.id === acc.id ? "rgba(139,92,246,0.28)" : "rgba(255,255,255,0.055)"}`,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <div
                      style={{
                        width: 24,
                        height: 18,
                        borderRadius: 4,
                        background: acc.chipGrad,
                        border: "0.5px solid rgba(255,255,255,0.12)",
                      }}
                    />
                    <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 9 }}>{acc.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <Link
              href="/register"
              className="group flex items-center gap-2.5 rounded-xl font-semibold transition-all duration-300"
              style={{
                padding: "14px 28px",
                background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
                boxShadow: "0 8px 32px rgba(139,92,246,0.28)",
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

          <motion.div
            className="flex flex-col items-center justify-center"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.1 }}
          >
            <div
              style={{
                width: "100%",
                padding: "48px 32px",
                borderRadius: 24,
                background: "rgba(255,255,255,0.01)",
                border: "1px solid rgba(255,255,255,0.04)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 28,
              }}
            >
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    bottom: -40,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 260,
                    height: 70,
                    background: "radial-gradient(ellipse, rgba(139,92,246,0.18) 0%, transparent 70%)",
                    filter: "blur(20px)",
                    pointerEvents: "none",
                  }}
                />
                <AnimatePresence mode="wait">
                  <LiveCardPreview
                    key={`${selectedMaterial.id}-${selectedAccent.id}`}
                    material={selectedMaterial}
                    accent={selectedAccent}
                  />
                </AnimatePresence>
              </div>

              <div style={{ textAlign: "center" }}>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, fontWeight: 500 }}>
                  {selectedMaterial.name} · {selectedAccent.name} Chip
                </p>
                <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 12, marginTop: 4 }}>
                  NFC-embedded · Custom engraving available
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
