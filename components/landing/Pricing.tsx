"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "Free",
    desc: "For individuals getting started",
    features: [
      "1 smart profile",
      "Custom links",
      "QR code",
      "Basic analytics",
      "Share link",
    ],
    cta: "Start free",
    href: "/register",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "/mo",
    desc: "For professionals and creators",
    features: [
      "Everything in Starter",
      "Custom accent color",
      "Advanced analytics",
      "AI bio generator",
      "NFC card support",
      "Priority support",
    ],
    cta: "Get Pro",
    href: "/register",
    highlight: true,
  },
  {
    name: "Business",
    price: "$29",
    period: "/mo",
    desc: "For teams and companies",
    features: [
      "Everything in Pro",
      "Up to 10 team members",
      "Company branding",
      "Team analytics",
      "Bulk NFC orders",
      "Dedicated support",
    ],
    cta: "Contact Sales",
    href: "/register",
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-indigo-400 text-[11px] font-semibold tracking-[0.18em] uppercase mb-3">
            Pricing
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Simple, transparent pricing
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {plans.map(({ name, price, period, desc, features, cta, href, highlight }, i) => (
            <motion.div
              key={name}
              className="relative p-7 rounded-2xl flex flex-col"
              style={{
                background: highlight
                  ? "linear-gradient(180deg, rgba(99,102,241,0.11) 0%, rgba(99,102,241,0.04) 100%)"
                  : "rgba(255,255,255,0.02)",
                border: highlight
                  ? "1px solid rgba(99,102,241,0.32)"
                  : "1px solid rgba(255,255,255,0.05)",
                boxShadow: highlight ? "0 0 48px rgba(99,102,241,0.07)" : "none",
              }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 bg-indigo-500 rounded-full text-white text-[11px] font-semibold shadow-lg shadow-indigo-500/30">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-7">
                <p className="text-white/45 text-[11px] font-semibold uppercase tracking-widest mb-2">
                  {name}
                </p>
                <div className="flex items-end gap-0.5 mb-1.5">
                  <span className="text-white text-3xl font-bold">{price}</span>
                  {period && (
                    <span className="text-white/35 text-sm mb-1 ml-0.5">{period}</span>
                  )}
                </div>
                <p className="text-white/32 text-sm">{desc}</p>
              </div>

              <div className="space-y-2.5 flex-1 mb-8">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2.5">
                    <Check className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                    <span className="text-white/55 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                href={href}
                className={`w-full py-2.5 rounded-xl text-sm font-semibold text-center transition-all duration-200 ${
                  highlight
                    ? "bg-indigo-500 hover:bg-indigo-600 text-white"
                    : "bg-white/[0.05] hover:bg-white/[0.09] text-white/70 hover:text-white border border-white/[0.09]"
                }`}
              >
                {cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
