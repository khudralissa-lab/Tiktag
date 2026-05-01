"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

function NFCCard() {
  return (
    <div
      className="relative w-52 h-32 rounded-2xl overflow-hidden flex-shrink-0"
      style={{
        background: "linear-gradient(135deg, #1e1b4b 0%, #0f0f23 100%)",
        border: "1px solid rgba(99,102,241,0.25)",
        boxShadow: "0 24px 64px rgba(99,102,241,0.15)",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, rgba(99,102,241,0.12) 0%, transparent 60%)",
        }}
      />
      <div className="relative p-5 h-full flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-white font-bold text-[11px] tracking-[0.22em] opacity-80">
            TIKTAG
          </span>
          <div
            className="w-5 h-5 rounded-md flex items-center justify-center"
            style={{
              background: "rgba(99,102,241,0.2)",
              border: "1px solid rgba(99,102,241,0.3)",
            }}
          >
            <Zap className="w-3 h-3 text-indigo-400" />
          </div>
        </div>
        <div>
          <p className="text-white text-sm font-semibold">Alex Johnson</p>
          <p className="text-white/40 text-[11px] mt-0.5">Product Designer</p>
        </div>
      </div>
      <div className="absolute bottom-3 right-3 opacity-20">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M22 14c0 4.4-3.6 8-8 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M26 14c0 6.6-5.4 12-12 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M18 14c0 2.2-1.8 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

function PhoneMockup() {
  return (
    <div
      className="relative w-44 h-[340px] rounded-[2.75rem] overflow-hidden flex-shrink-0"
      style={{
        background: "linear-gradient(180deg, #141414 0%, #0a0a0a 100%)",
        border: "1px solid rgba(255,255,255,0.10)",
        boxShadow:
          "0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.03), 0 0 60px rgba(99,102,241,0.06)",
      }}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-b-2xl z-10" />
      <div className="pt-8 pb-4 px-4 h-full flex flex-col items-center">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mb-2 mt-1"
          style={{
            background: "linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)",
            boxShadow: "0 8px 24px rgba(99,102,241,0.35)",
          }}
        >
          <span className="text-white font-semibold text-sm">AJ</span>
        </div>
        <p className="text-white font-semibold text-xs mb-0.5">Alex Johnson</p>
        <p className="text-white/40 text-[10px] mb-4">Product Designer · Dubai</p>

        <div className="flex gap-1.5 w-full mb-4">
          {[
            { label: "Call", style: "bg-green-500/15 border-green-500/20" },
            { label: "Chat", style: "bg-indigo-500/15 border-indigo-500/25" },
            { label: "Mail", style: "bg-white/[0.05] border-white/[0.08]" },
          ].map(({ label, style }) => (
            <div
              key={label}
              className={`flex-1 h-8 rounded-xl ${style} border flex items-center justify-center`}
            >
              <span className="text-white/55 text-[9px] font-medium">{label}</span>
            </div>
          ))}
        </div>

        <div className="w-full space-y-1.5">
          {[
            { label: "Portfolio", accent: true },
            { label: "LinkedIn", accent: false },
            { label: "Instagram", accent: false },
            { label: "Save Contact", accent: false },
          ].map(({ label, accent }) => (
            <div
              key={label}
              className={`h-7 rounded-xl flex items-center px-3 border ${
                accent
                  ? "bg-indigo-500/20 border-indigo-500/30"
                  : "bg-white/[0.03] border-white/[0.06]"
              }`}
            >
              <span
                className={`text-[10px] ${accent ? "text-indigo-300" : "text-white/45"}`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function QRMockup() {
  const pattern = [
    1,1,1,0,1,0,1,1,1,
    1,0,1,0,1,0,1,0,1,
    1,0,1,0,0,1,1,0,1,
    0,0,0,1,0,0,0,0,0,
    1,1,0,1,1,1,0,1,0,
    0,0,0,0,1,0,0,0,1,
    1,1,1,0,0,1,1,1,1,
    1,0,1,0,1,0,1,0,1,
    1,1,1,0,1,0,1,1,1,
  ];

  return (
    <div
      className="w-[84px] h-[84px] rounded-xl flex-shrink-0 flex items-center justify-center"
      style={{ background: "rgba(255,255,255,0.94)", padding: "9px" }}
    >
      <div
        className="w-full h-full grid"
        style={{ gridTemplateColumns: "repeat(9, 1fr)", gap: "1.5px" }}
      >
        {pattern.map((cell, i) => (
          <div
            key={i}
            style={{
              aspectRatio: "1",
              backgroundColor: cell ? "#0a0a0a" : "transparent",
              borderRadius: "1px",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-6 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% -10%, rgba(99,102,241,0.14) 0%, transparent 70%)",
        }}
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto w-full"
      >
        <motion.div variants={fadeUp} className="mb-8">
          <span
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium text-indigo-300"
            style={{
              background: "rgba(99,102,241,0.09)",
              border: "1px solid rgba(99,102,241,0.22)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            NFC · QR · Digital Identity Platform
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 leading-[1.04]"
        >
          Tap.{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #a5b4fc 0%, #818cf8 40%, #6366f1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Connect.
          </span>{" "}
          Grow.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-white/45 text-lg md:text-xl max-w-2xl leading-relaxed mb-10"
        >
          Tiktag turns NFC products and QR links into smart digital experiences
          for people, brands, and businesses.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="flex flex-wrap items-center justify-center gap-3 mb-20"
        >
          <Link
            href="/register"
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
              boxShadow: "0 8px 32px rgba(99,102,241,0.35)",
            }}
          >
            Create your Tiktag
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#products"
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-white/60 text-sm font-medium transition-all duration-200 hover:text-white hover:bg-white/[0.05]"
            style={{ border: "1px solid rgba(255,255,255,0.09)" }}
          >
            Explore Products
          </a>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="relative flex items-end justify-center gap-5 md:gap-8"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(99,102,241,0.12) 0%, transparent 70%)",
            }}
          />

          <motion.div
            className="hidden sm:block"
            initial={{ opacity: 0, x: -24, rotate: -5 }}
            animate={{ opacity: 1, x: 0, rotate: -5 }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginBottom: "48px" }}
          >
            <NFCCard />
          </motion.div>

          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <PhoneMockup />
          </motion.div>

          <motion.div
            className="hidden sm:block"
            initial={{ opacity: 0, x: 24, rotate: 5 }}
            animate={{ opacity: 1, x: 0, rotate: 5 }}
            transition={{ delay: 0.6, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginBottom: "72px" }}
          >
            <QRMockup />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
