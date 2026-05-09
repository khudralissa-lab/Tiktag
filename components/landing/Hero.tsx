"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

function CinematicHeroCard() {
  return (
    <div
      style={{
        position: "relative",
        width: 440,
        perspective: "1600px",
      }}
    >
      {/* Atmospheric color glow behind card */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "110%",
          height: "80%",
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(88,28,235,0.12) 0%, rgba(139,92,246,0.05) 55%, transparent 100%)",
          filter: "blur(30px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Ground shadow */}
      <div
        style={{
          position: "absolute",
          bottom: -50,
          left: "50%",
          transform: "translateX(-50%)",
          width: "70%",
          height: 60,
          background: "radial-gradient(ellipse, rgba(0,0,0,0.95) 0%, transparent 70%)",
          filter: "blur(24px)",
          zIndex: 0,
        }}
      />

      {/* Ground reflection */}
      <div
        style={{
          position: "absolute",
          top: "100%",
          left: "8%",
          right: "8%",
          height: 70,
          background:
            "linear-gradient(145deg, #1c1c1e 0%, #111113 40%, #0d0d0f 70%, #161618 100%)",
          opacity: 0.055,
          transform: "scaleY(-1) rotateX(3deg)",
          filter: "blur(5px)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)",
          zIndex: 0,
          borderRadius: "0 0 22px 22px",
        }}
      />

      {/* The card */}
      <motion.div
        style={{
          width: 440,
          height: 276,
          borderRadius: 24,
          background:
            "linear-gradient(145deg, #1e1e22 0%, #131317 38%, #0d0d11 68%, #181820 100%)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: `
            0 100px 200px rgba(0,0,0,0.92),
            0 50px 100px rgba(0,0,0,0.85),
            0 20px 40px rgba(0,0,0,0.75),
            0 6px 12px rgba(0,0,0,0.65),
            0 0 120px rgba(88,28,235,0.09),
            0 80px 160px -60px rgba(40,20,120,0.35),
            inset 0 1px 0 rgba(255,255,255,0.09),
            inset 0 -1px 0 rgba(0,0,0,0.4)
          `,
          position: "relative",
          overflow: "hidden",
          transform: "rotateX(3deg) rotateY(-8deg)",
          zIndex: 1,
        }}
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Brushed surface texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(255,255,255,0) 0px, rgba(255,255,255,0) 1px, rgba(255,255,255,0.007) 1px, rgba(255,255,255,0.007) 2px)",
            backgroundSize: "100% 2px",
          }}
        />

        {/* Top specular highlight */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "42%",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.075) 0%, rgba(255,255,255,0.02) 50%, transparent 100%)",
            borderRadius: "24px 24px 0 0",
          }}
        />

        {/* Side light (left edge) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: "30%",
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.025) 0%, transparent 100%)",
          }}
        />

        {/* Animated shimmer sweep */}
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            width: "25%",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), rgba(255,255,255,0.02), transparent)",
            filter: "blur(6px)",
          }}
          animate={{ left: ["-25%", "115%"] }}
          transition={{ duration: 5, repeat: Infinity, repeatDelay: 3.5, ease: "easeInOut" }}
        />

        {/* Card content */}
        <div
          style={{
            position: "relative",
            padding: "30px 34px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <span
              style={{
                color: "rgba(255,255,255,0.78)",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.30em",
              }}
            >
              TIKTAG
            </span>
            {/* EMV Chip */}
            <div
              style={{
                width: 34,
                height: 27,
                borderRadius: 5,
                background:
                  "linear-gradient(135deg, #d4a853 0%, #b8882a 28%, #e8c468 50%, #a07025 72%, #d4a853 100%)",
                border: "0.5px solid rgba(212,168,83,0.4)",
                boxShadow:
                  "0 3px 8px rgba(0,0,0,0.6), 0 1px 2px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.22)",
                display: "flex",
                flexDirection: "column" as const,
                gap: 4,
                padding: "5px 5px",
                justifyContent: "center",
              }}
            >
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    height: 1,
                    background: "rgba(0,0,0,0.28)",
                    borderRadius: 1,
                  }}
                />
              ))}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <p
                style={{
                  color: "rgba(255,255,255,0.9)",
                  fontSize: 17,
                  fontWeight: 600,
                  letterSpacing: "0.01em",
                  marginBottom: 5,
                }}
              >
                Alex Johnson
              </p>
              <p
                style={{
                  color: "rgba(255,255,255,0.3)",
                  fontSize: 11,
                  letterSpacing: "0.05em",
                }}
              >
                Chief Design Officer
              </p>
            </div>
            <div style={{ opacity: 0.2 }}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M26 16c0 5.52-4.48 10-10 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M30 16C30 8.27 23.73 2 16 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M22 16c0 3.31-2.69 6-6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="16" cy="16" r="2" fill="white" />
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
    <section
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-20 px-6 overflow-hidden"
      style={{ background: "#020208" }}
    >
      {/* Layer 1: Deep violet atmospheric glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 85% 55% at 50% -8%, rgba(58,12,163,0.16) 0%, rgba(88,28,235,0.08) 42%, transparent 68%)",
        }}
      />

      {/* Layer 2: Bottom fog */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 100% 35% at 50% 100%, rgba(2,2,12,0.95) 0%, transparent 100%)",
        }}
      />

      {/* Layer 3: Subtle industrial grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.014) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.014) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          WebkitMaskImage:
            "radial-gradient(ellipse 100% 75% at 50% 15%, rgba(0,0,0,0.9) 0%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 100% 75% at 50% 15%, rgba(0,0,0,0.9) 0%, transparent 100%)",
        }}
      />

      {/* Layer 4: Studio vertical light beam */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 3,
          height: "55%",
          background:
            "linear-gradient(180deg, rgba(139,92,246,0.12) 0%, rgba(139,92,246,0.04) 70%, transparent 100%)",
          filter: "blur(10px)",
        }}
      />

      {/* Layer 5: Horizontal studio light line */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "44%",
          left: 0,
          right: 0,
          height: 1,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.06) 30%, rgba(99,102,241,0.05) 70%, transparent 100%)",
          filter: "blur(1px)",
        }}
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto w-full"
      >
        {/* Badge */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
          }}
          className="mb-8"
        >
          <span
            className="inline-flex items-center gap-2.5 rounded-full font-semibold"
            style={{
              padding: "6px 16px",
              color: "rgba(167,139,250,0.88)",
              background: "rgba(88,28,235,0.07)",
              border: "1px solid rgba(139,92,246,0.18)",
              fontSize: 11,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            <motion.span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "#8b5cf6",
                display: "inline-block",
              }}
              animate={{ boxShadow: ["0 0 6px rgba(139,92,246,0.8)", "0 0 14px rgba(139,92,246,1)", "0 0 6px rgba(139,92,246,0.8)"] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Identity Ecosystem · 2025
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 32 },
            visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] } },
          }}
          className="font-bold leading-[1.01]"
          style={{
            fontSize: "clamp(50px, 8.5vw, 88px)",
            letterSpacing: "-0.045em",
            marginBottom: 24,
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.93)" }}>The future of</span>
          <br />
          <span
            style={{
              background:
                "linear-gradient(135deg, #e8e0ff 0%, #c4b5fd 25%, #a78bfa 50%, #8b5cf6 72%, #7c3aed 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            digital presence.
          </span>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
          }}
          style={{
            color: "rgba(255,255,255,0.36)",
            maxWidth: 520,
            fontSize: 18,
            lineHeight: 1.7,
            letterSpacing: "0.005em",
            marginBottom: 48,
          }}
        >
          Premium NFC hardware meets intelligent software. Your identity,
          always on — crafted for those who know first impressions are everything.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
          }}
          className="flex flex-wrap items-center justify-center gap-3"
          style={{ marginBottom: 88 }}
        >
          <Link
            href="/register"
            className="group flex items-center gap-2.5 rounded-xl font-semibold transition-all duration-300"
            style={{
              padding: "14px 30px",
              background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
              boxShadow:
                "0 8px 32px rgba(139,92,246,0.35), 0 0 0 1px rgba(139,92,246,0.2), 0 0 60px rgba(139,92,246,0.08)",
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
              padding: "14px 30px",
              color: "rgba(255,255,255,0.42)",
              border: "1px solid rgba(255,255,255,0.07)",
              fontSize: 15,
              background: "rgba(255,255,255,0.018)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = "rgba(255,255,255,0.72)";
              el.style.background = "rgba(255,255,255,0.04)";
              el.style.borderColor = "rgba(255,255,255,0.12)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = "rgba(255,255,255,0.42)";
              el.style.background = "rgba(255,255,255,0.018)";
              el.style.borderColor = "rgba(255,255,255,0.07)";
            }}
          >
            Explore collections
          </a>
        </motion.div>

        {/* Hero card */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 56 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 0.12 },
            },
          }}
          className="relative flex items-center justify-center"
        >
          <CinematicHeroCard />

          {/* Floating data chip — left */}
          <motion.div
            className="absolute hidden lg:block"
            style={{ right: "calc(100% + 20px)", top: 24 }}
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              style={{
                padding: "13px 18px",
                borderRadius: 14,
                background: "rgba(6,6,16,0.94)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 24px 56px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)",
                minWidth: 128,
              }}
            >
              <p
                style={{
                  color: "rgba(255,255,255,0.28)",
                  fontSize: 9,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                NFC Taps Today
              </p>
              <p style={{ color: "white", fontSize: 26, fontWeight: 700, lineHeight: 1 }}>2,847</p>
              <p style={{ color: "#4ade80", fontSize: 10, marginTop: 5 }}>↑ 23% this week</p>
            </div>
          </motion.div>

          {/* Floating data chip — right */}
          <motion.div
            className="absolute hidden lg:block"
            style={{ left: "calc(100% + 20px)", bottom: 24 }}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              style={{
                padding: "13px 18px",
                borderRadius: 14,
                background: "rgba(6,6,16,0.94)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 24px 56px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)",
                minWidth: 128,
              }}
            >
              <p
                style={{
                  color: "rgba(255,255,255,0.28)",
                  fontSize: 9,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                Active Identities
              </p>
              <p style={{ color: "white", fontSize: 26, fontWeight: 700, lineHeight: 1 }}>12K+</p>
              <p style={{ color: "#a78bfa", fontSize: 10, marginTop: 5 }}>across 42 countries</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll pulse */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <motion.div
          style={{
            width: 1,
            height: 40,
            background:
              "linear-gradient(180deg, transparent, rgba(255,255,255,0.3), transparent)",
          }}
          animate={{ opacity: [0.2, 0.6, 0.2], scaleY: [1, 1.2, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
