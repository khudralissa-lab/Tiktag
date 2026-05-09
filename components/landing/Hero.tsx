"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

function PremiumCard() {
  return (
    <div className="relative" style={{ width: 360, height: 226 }}>
      <div
        style={{
          position: "absolute",
          bottom: -48,
          left: "50%",
          transform: "translateX(-50%)",
          width: 280,
          height: 80,
          background: "radial-gradient(ellipse, rgba(139,92,246,0.22) 0%, transparent 70%)",
          filter: "blur(28px)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: 360,
          height: 226,
          borderRadius: 22,
          background: "linear-gradient(145deg, #1c1c1e 0%, #111113 40%, #0d0d0f 70%, #161618 100%)",
          border: "1px solid rgba(255,255,255,0.09)",
          boxShadow:
            "0 80px 160px rgba(0,0,0,0.85), 0 0 0 0.5px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06), 0 0 80px rgba(139,92,246,0.08)",
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
            height: "38%",
            background: "linear-gradient(180deg, rgba(255,255,255,0.045) 0%, transparent 100%)",
            borderRadius: "22px 22px 0 0",
          }}
        />

        <motion.div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            width: 100,
            background:
              "linear-gradient(90deg, transparent, rgba(139,92,246,0.055), rgba(99,102,241,0.035), transparent)",
            filter: "blur(6px)",
          }}
          animate={{ left: ["-100px", "460px"] }}
          transition={{ duration: 4, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }}
        />

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
                color: "rgba(255,255,255,0.82)",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.28em",
              }}
            >
              TIKTAG
            </span>
            <div
              style={{
                width: 32,
                height: 25,
                borderRadius: 5,
                background:
                  "linear-gradient(135deg, #d4a853 0%, #b8882a 30%, #e2b96a 55%, #a07025 75%, #d4a853 100%)",
                border: "0.5px solid rgba(212,168,83,0.35)",
                boxShadow: "0 2px 6px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.18)",
                display: "flex",
                flexDirection: "column" as const,
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
              <p
                style={{
                  color: "rgba(255,255,255,0.9)",
                  fontSize: 16,
                  fontWeight: 600,
                  letterSpacing: "0.01em",
                  marginBottom: 4,
                }}
              >
                Alex Johnson
              </p>
              <p style={{ color: "rgba(255,255,255,0.32)", fontSize: 11, letterSpacing: "0.04em" }}>
                Chief Design Officer
              </p>
            </div>
            <div style={{ opacity: 0.22 }}>
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                <path d="M24 15c0 4.97-4.03 9-9 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M28 15C28 7.82 22.18 2 15 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M20 15c0 2.76-2.24 5-5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="15" cy="15" r="1.8" fill="white" />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-16 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "130%",
            height: "70%",
            background:
              "radial-gradient(ellipse 80% 60% at 50% -5%, rgba(88,28,235,0.10) 0%, rgba(139,92,246,0.055) 45%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            WebkitMaskImage:
              "radial-gradient(ellipse 90% 70% at 50% 10%, black 20%, transparent 100%)",
            maskImage:
              "radial-gradient(ellipse 90% 70% at 50% 10%, black 20%, transparent 100%)",
          }}
        />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto w-full"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
          }}
          className="mb-8"
        >
          <span
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-[11px] font-semibold"
            style={{
              color: "rgba(167,139,250,0.9)",
              background: "rgba(139,92,246,0.07)",
              border: "1px solid rgba(139,92,246,0.18)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "#8b5cf6",
                boxShadow: "0 0 8px rgba(139,92,246,0.9)",
                display: "inline-block",
              }}
            />
            Identity Ecosystem · 2025
          </span>
        </motion.div>

        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 28 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] } },
          }}
          className="font-bold leading-[1.02] mb-6"
          style={{
            fontSize: "clamp(48px, 8.5vw, 86px)",
            letterSpacing: "-0.04em",
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.94)" }}>The future of</span>
          <br />
          <span
            style={{
              background:
                "linear-gradient(135deg, #e2d9f3 0%, #c4b5fd 28%, #a78bfa 55%, #8b5cf6 80%, #7c3aed 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            digital presence.
          </span>
        </motion.h1>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
          }}
          style={{
            color: "rgba(255,255,255,0.38)",
            maxWidth: 520,
            fontSize: 18,
            lineHeight: 1.7,
            marginBottom: 44,
          }}
        >
          Premium NFC hardware meets intelligent software. Your identity,
          always on — crafted for those who know first impressions are everything.
        </motion.p>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
          }}
          className="flex flex-wrap items-center justify-center gap-3 mb-24"
        >
          <Link
            href="/register"
            className="group flex items-center gap-2.5 rounded-xl font-semibold transition-all duration-300"
            style={{
              padding: "13px 28px",
              background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
              boxShadow: "0 8px 32px rgba(139,92,246,0.32), 0 0 0 1px rgba(139,92,246,0.18)",
              color: "white",
              fontSize: 15,
            }}
          >
            Begin your journey
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
          <a
            href="#collections"
            className="flex items-center gap-2 rounded-xl font-medium transition-all duration-300"
            style={{
              padding: "13px 28px",
              color: "rgba(255,255,255,0.45)",
              border: "1px solid rgba(255,255,255,0.08)",
              fontSize: 15,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
              (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)";
            }}
          >
            Explore collections
          </a>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 48 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
            },
          }}
          className="relative flex items-center justify-center"
        >
          <PremiumCard />

          <motion.div
            className="absolute hidden lg:block"
            style={{ left: -100, top: 20 }}
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              style={{
                padding: "12px 16px",
                borderRadius: 14,
                background: "rgba(10,10,12,0.92)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(16px)",
                boxShadow: "0 20px 48px rgba(0,0,0,0.55)",
                minWidth: 120,
              }}
            >
              <p
                style={{
                  color: "rgba(255,255,255,0.3)",
                  fontSize: 9,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  marginBottom: 5,
                }}
              >
                NFC Taps Today
              </p>
              <p style={{ color: "white", fontSize: 24, fontWeight: 700, lineHeight: 1 }}>2,847</p>
              <p style={{ color: "#4ade80", fontSize: 10, marginTop: 4 }}>↑ 23% this week</p>
            </div>
          </motion.div>

          <motion.div
            className="absolute hidden lg:block"
            style={{ right: -108, bottom: 20 }}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              style={{
                padding: "12px 16px",
                borderRadius: 14,
                background: "rgba(10,10,12,0.92)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(16px)",
                boxShadow: "0 20px 48px rgba(0,0,0,0.55)",
                minWidth: 120,
              }}
            >
              <p
                style={{
                  color: "rgba(255,255,255,0.3)",
                  fontSize: 9,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  marginBottom: 5,
                }}
              >
                Active Identities
              </p>
              <p style={{ color: "white", fontSize: 24, fontWeight: 700, lineHeight: 1 }}>12K+</p>
              <p style={{ color: "#a78bfa", fontSize: 10, marginTop: 4 }}>across 42 countries</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
      >
        <motion.div
          style={{
            width: 1,
            height: 36,
            background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.35), transparent)",
          }}
          animate={{ opacity: [0.25, 0.65, 0.25] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
