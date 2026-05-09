"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    label: "Personal",
    price: "Free",
    desc: "Your digital identity, activated.",
    features: [
      "1 smart profile",
      "Unlimited links",
      "QR code generation",
      "Basic analytics",
      "Share link",
    ],
    cta: "Start free",
    href: "/register",
    highlight: false,
    hardware: null,
  },
  {
    name: "Pro",
    label: "Professional",
    price: "$9",
    period: "/mo",
    desc: "For professionals who take presence seriously.",
    features: [
      "Everything in Starter",
      "Custom accent theme",
      "Advanced analytics dashboard",
      "AI bio generator",
      "AI message suggestions",
      "NFC card support",
      "Priority support",
    ],
    cta: "Get Pro",
    href: "/register",
    highlight: true,
    hardware: "1 Signature Card included",
  },
  {
    name: "Business",
    label: "Enterprise",
    price: "$29",
    period: "/mo",
    desc: "Scale identity across your entire team.",
    features: [
      "Everything in Pro",
      "Up to 10 team members",
      "Company branding & themes",
      "Team analytics command center",
      "Bulk NFC hardware orders",
      "White-label profile pages",
      "Dedicated account manager",
    ],
    cta: "Talk to Sales",
    href: "/register",
    highlight: false,
    hardware: "Custom hardware consultation",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" style={{ padding: "120px 24px" }}>
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
            Pricing
          </p>
          <h2
            style={{
              color: "rgba(255,255,255,0.94)",
              fontSize: "clamp(32px, 4.5vw, 52px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
            }}
          >
            Choose your identity.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {plans.map(({ name, label, price, period, desc, features, cta, href, highlight, hardware }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "relative",
                padding: "32px",
                borderRadius: 22,
                display: "flex",
                flexDirection: "column",
                background: highlight
                  ? "linear-gradient(180deg, rgba(139,92,246,0.1) 0%, rgba(99,102,241,0.04) 100%)"
                  : "rgba(255,255,255,0.018)",
                border: `1px solid ${highlight ? "rgba(139,92,246,0.3)" : "rgba(255,255,255,0.055)"}`,
                boxShadow: highlight ? "0 0 60px rgba(139,92,246,0.08)" : "none",
              }}
            >
              {highlight && (
                <div
                  style={{
                    position: "absolute",
                    top: -14,
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  <span
                    style={{
                      padding: "5px 16px",
                      borderRadius: 20,
                      background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
                      color: "white",
                      fontSize: 11,
                      fontWeight: 700,
                      boxShadow: "0 4px 16px rgba(139,92,246,0.4)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Most Popular
                  </span>
                </div>
              )}

              {highlight && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 1,
                    background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.6), transparent)",
                  }}
                />
              )}

              <div style={{ marginBottom: 28 }}>
                <p
                  style={{
                    color: highlight ? "rgba(167,139,250,0.7)" : "rgba(255,255,255,0.28)",
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    marginBottom: 12,
                  }}
                >
                  {label}
                </p>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 2, marginBottom: 6 }}>
                  <span style={{ color: "rgba(255,255,255,0.94)", fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1 }}>
                    {price}
                  </span>
                  {period && (
                    <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 14, marginBottom: 5 }}>{period}</span>
                  )}
                </div>
                <p style={{ color: "rgba(255,255,255,0.32)", fontSize: 13, lineHeight: 1.5 }}>{desc}</p>
              </div>

              {hardware && (
                <div
                  style={{
                    padding: "10px 14px",
                    borderRadius: 10,
                    background: "rgba(212,168,83,0.06)",
                    border: "1px solid rgba(212,168,83,0.18)",
                    marginBottom: 20,
                  }}
                >
                  <p style={{ color: "rgba(212,168,83,0.8)", fontSize: 11, fontWeight: 500 }}>
                    ✦ {hardware}
                  </p>
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1, marginBottom: 28 }}>
                {features.map((feature) => (
                  <div key={feature} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Check
                      className="flex-shrink-0"
                      style={{
                        width: 13,
                        height: 13,
                        color: highlight ? "#a78bfa" : "rgba(255,255,255,0.3)",
                      }}
                    />
                    <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 13 }}>{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                href={href}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "13px",
                  borderRadius: 14,
                  textAlign: "center",
                  fontSize: 14,
                  fontWeight: 600,
                  transition: "all 0.2s ease",
                  background: highlight
                    ? "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)"
                    : "rgba(255,255,255,0.05)",
                  color: highlight ? "white" : "rgba(255,255,255,0.6)",
                  border: highlight ? "none" : "1px solid rgba(255,255,255,0.08)",
                  boxShadow: highlight ? "0 4px 20px rgba(139,92,246,0.28)" : "none",
                }}
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
