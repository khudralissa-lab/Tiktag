"use client";

import { motion } from "framer-motion";
import {
  CreditCard,
  Tag,
  Layers,
  Star,
  Share2,
  Wifi,
  BadgeCheck,
  Box,
} from "lucide-react";

const products = [
  {
    icon: CreditCard,
    title: "NFC Business Cards",
    desc: "Tap to share your full profile instantly",
  },
  {
    icon: Tag,
    title: "NFC Table Tags",
    desc: "Perfect for menus, reviews, and Wi-Fi sharing",
  },
  {
    icon: Layers,
    title: "NFC Stickers",
    desc: "Stick on anything, share everywhere",
  },
  {
    icon: Star,
    title: "Review Tags",
    desc: "Drive Google and social reviews effortlessly",
  },
  {
    icon: Share2,
    title: "Social Media Tags",
    desc: "One tap to follow all your social profiles",
  },
  {
    icon: Wifi,
    title: "Wi-Fi Tags",
    desc: "Instant Wi-Fi connection, no passwords needed",
  },
  {
    icon: BadgeCheck,
    title: "Event Badges",
    desc: "Smart networking at conferences and events",
  },
  {
    icon: Box,
    title: "Custom NFC Products",
    desc: "Branded NFC products for your business",
  },
];

export default function Products() {
  return (
    <section
      id="products"
      className="py-28 px-6"
      style={{ background: "rgba(255,255,255,0.01)" }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-indigo-400 text-[11px] font-semibold tracking-[0.18em] uppercase mb-3">
            Products
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            NFC for every use case
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {products.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              className="group p-5 rounded-2xl cursor-default transition-colors duration-300"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{
                borderColor: "rgba(99,102,241,0.25)",
                backgroundColor: "rgba(99,102,241,0.04)",
              }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: "rgba(99,102,241,0.09)",
                  border: "1px solid rgba(99,102,241,0.14)",
                }}
              >
                <Icon className="w-4 h-4 text-indigo-400" />
              </div>
              <h3 className="text-white text-xs font-semibold mb-1 leading-tight">{title}</h3>
              <p className="text-white/32 text-[11px] leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
