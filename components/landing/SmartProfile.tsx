"use client";

import { motion } from "framer-motion";
import { User, Phone, Link2, Download, Share2, QrCode, Palette } from "lucide-react";

const features = [
  { icon: User, title: "Digital Profile", desc: "Name, title, bio, and photo" },
  { icon: Phone, title: "Contact Buttons", desc: "Call, WhatsApp, Email" },
  { icon: Link2, title: "Social Links", desc: "All your profiles, one place" },
  { icon: Download, title: "Save Contact", desc: "One-tap vCard download" },
  { icon: Share2, title: "Share Link", desc: "Shareable URL anywhere" },
  { icon: QrCode, title: "QR Code", desc: "Auto-generated & downloadable" },
  { icon: Palette, title: "Custom Theme", desc: "Accent color per profile" },
];

export default function SmartProfile() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-indigo-400 text-[11px] font-semibold tracking-[0.18em] uppercase mb-3">
              Smart Profile
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4 leading-tight">
              Everything about you, in one link
            </h2>
            <p className="text-white/40 text-base leading-relaxed mb-8">
              Your Tiktag profile is a powerful digital identity — not just a link in bio. It
              updates instantly, tracks every interaction, and works from any device.
            </p>

            <div className="grid grid-cols-2 gap-2.5">
              {features.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex items-start gap-3 p-3.5 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      background: "rgba(99,102,241,0.10)",
                      border: "1px solid rgba(99,102,241,0.15)",
                    }}
                  >
                    <Icon className="w-3.5 h-3.5 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold leading-tight">{title}</p>
                    <p className="text-white/32 text-[11px] mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div
              className="w-52 h-[420px] rounded-[3rem] relative overflow-hidden"
              style={{
                background: "linear-gradient(180deg, #141414 0%, #0a0a0a 100%)",
                border: "1px solid rgba(255,255,255,0.09)",
                boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(99,102,241,0.06)",
              }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-b-2xl z-10" />
              <div
                className="absolute top-0 left-0 right-0 h-48"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(99,102,241,0.14) 0%, transparent 100%)",
                }}
              />
              <div className="relative pt-10 pb-6 px-4 h-full flex flex-col items-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-2 mt-1"
                  style={{
                    background: "linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)",
                    boxShadow: "0 8px 24px rgba(99,102,241,0.35)",
                  }}
                >
                  <span className="text-white font-semibold">AJ</span>
                </div>
                <p className="text-white font-semibold text-sm">Alex Johnson</p>
                <p className="text-white/40 text-xs mb-0.5">Product Designer</p>
                <p className="text-white/22 text-[10px] mb-5">Dubai, UAE</p>

                <div className="flex gap-1.5 w-full mb-4">
                  {[
                    { l: "Call", c: "bg-green-500/15 border-green-500/20 text-green-400" },
                    { l: "Chat", c: "bg-indigo-500/15 border-indigo-500/25 text-indigo-400" },
                    { l: "Mail", c: "bg-white/[0.04] border-white/[0.07] text-white/40" },
                  ].map(({ l, c }) => (
                    <div
                      key={l}
                      className={`flex-1 h-9 rounded-xl border flex items-center justify-center text-[10px] font-medium ${c}`}
                    >
                      {l}
                    </div>
                  ))}
                </div>

                <div className="w-full space-y-2">
                  {["Portfolio", "LinkedIn", "Instagram", "Twitter", "Save Contact"].map(
                    (label, i) => (
                      <div
                        key={label}
                        className={`h-8 rounded-xl flex items-center px-3 border ${
                          i === 0
                            ? "bg-indigo-500/20 border-indigo-500/30"
                            : "bg-white/[0.03] border-white/[0.06]"
                        }`}
                      >
                        <span
                          className={`text-[11px] ${
                            i === 0 ? "text-indigo-300" : "text-white/42"
                          }`}
                        >
                          {label}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
