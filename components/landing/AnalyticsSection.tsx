"use client";

import { motion } from "framer-motion";
import { Eye, MousePointer, Smartphone, QrCode } from "lucide-react";

const metrics = [
  { icon: Eye, label: "Profile Views", value: "2,847", change: "+12%" },
  { icon: MousePointer, label: "Link Clicks", value: "1,203", change: "+8%" },
  { icon: Smartphone, label: "NFC Taps", value: "389", change: "+24%" },
  { icon: QrCode, label: "QR Scans", value: "651", change: "+16%" },
];

const bars = [40, 58, 44, 76, 52, 88, 68];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function AnalyticsSection() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-indigo-400 text-[11px] font-semibold tracking-[0.18em] uppercase mb-3">
            Analytics
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Know exactly who&apos;s engaging
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            Real-time insights on every view, tap, scan, and click — broken down by source and
            link.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {metrics.map(({ icon: Icon, label, value, change }, i) => (
            <motion.div
              key={label}
              className="p-5 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="flex items-center justify-between mb-3">
                <Icon className="w-4 h-4 text-white/25" />
                <span className="text-green-400 text-[11px] font-semibold">{change}</span>
              </div>
              <p className="text-white text-2xl font-bold mb-0.5">{value}</p>
              <p className="text-white/32 text-xs">{label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="p-6 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-white text-sm font-semibold">Profile Views</p>
              <p className="text-white/28 text-xs mt-0.5">Last 7 days</p>
            </div>
            <div className="flex gap-4">
              {[
                { label: "NFC", color: "bg-indigo-400" },
                { label: "QR", color: "bg-violet-400" },
                { label: "Direct", color: "bg-white/25" },
              ].map(({ label, color }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${color}`} />
                  <span className="text-white/35 text-xs">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-end gap-2 h-24">
            {bars.map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-sm"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(99,102,241,0.55) 0%, rgba(99,102,241,0.15) 100%)",
                  height: `${h}%`,
                }}
                initial={{ scaleY: 0, originY: "bottom" }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              />
            ))}
          </div>
          <div className="flex gap-2 mt-2.5">
            {days.map((d) => (
              <p key={d} className="flex-1 text-center text-white/20 text-[10px]">
                {d}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
