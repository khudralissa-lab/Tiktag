"use client";

import { motion } from "framer-motion";
import { UserCircle2, Link2, BarChart3 } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserCircle2,
    title: "Create your smart profile",
    description:
      "Set up your digital identity with links, contact info, social media, and your custom theme in minutes.",
  },
  {
    number: "02",
    icon: Link2,
    title: "Connect it to NFC or QR",
    description:
      "Link your profile to an NFC card, sticker, or tag — or share via a simple QR code or URL anywhere.",
  },
  {
    number: "03",
    icon: BarChart3,
    title: "Share and track interactions",
    description:
      "Every tap and scan is logged. See who viewed your profile, what they clicked, and where they came from.",
  },
];

export default function HowItWorks() {
  return (
    <section id="features" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-indigo-400 text-[11px] font-semibold tracking-[0.18em] uppercase mb-3">
            How it works
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Three steps to smarter networking
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 relative">
          <div
            className="hidden md:block absolute top-[38px] left-[calc(16.67%+20px)] right-[calc(16.67%+20px)] h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent)",
            }}
          />

          {steps.map(({ number, icon: Icon, title, description }, i) => (
            <motion.div
              key={number}
              className="relative p-7 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: "rgba(99,102,241,0.10)",
                    border: "1px solid rgba(99,102,241,0.18)",
                  }}
                >
                  <Icon className="w-5 h-5 text-indigo-400" />
                </div>
                <span className="text-white/18 text-xs font-mono font-bold tracking-widest">
                  {number}
                </span>
              </div>
              <h3 className="text-white font-semibold text-base mb-2 leading-snug">{title}</h3>
              <p className="text-white/38 text-sm leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
