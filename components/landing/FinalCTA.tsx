"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section style={{ padding: "100px 24px 120px", background: "#020208" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          style={{
            position: "relative",
            textAlign: "center",
            padding: "80px 40px",
            borderRadius: 32,
            overflow: "hidden",
            background: "linear-gradient(180deg, rgba(139,92,246,0.07) 0%, rgba(88,28,235,0.03) 50%, rgba(0,0,0,0) 100%)",
            border: "1px solid rgba(139,92,246,0.18)",
            boxShadow: "0 0 120px rgba(88,28,235,0.1), 0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(139,92,246,0.12)",
          }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 80% 65% at 50% -5%, rgba(139,92,246,0.24) 0%, rgba(99,102,241,0.09) 50%, transparent 75%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 1,
              background: "linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.5) 35%, rgba(99,102,241,0.5) 65%, transparent 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
              WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 80%)",
              maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 80%)",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            <motion.p
              style={{
                color: "rgba(167,139,250,0.7)",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                marginBottom: 20,
              }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Begin today
            </motion.p>

            <motion.h2
              style={{
                color: "rgba(255,255,255,0.95)",
                fontSize: "clamp(36px, 5.5vw, 64px)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 1.06,
                marginBottom: 20,
              }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              Shape your presence.
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #e2d9f3 0%, #c4b5fd 28%, #a78bfa 55%, #8b5cf6 80%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Now.
              </span>
            </motion.h2>

            <motion.p
              style={{
                color: "rgba(255,255,255,0.35)",
                fontSize: 18,
                lineHeight: 1.65,
                maxWidth: 440,
                margin: "0 auto 48px",
              }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Join over 12,000 professionals and businesses who've elevated how they connect with the world.
            </motion.p>

            <motion.div
              style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <Link
                href="/register"
                className="group flex items-center gap-2.5 rounded-xl font-semibold transition-all duration-300"
                style={{
                  padding: "15px 32px",
                  background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
                  boxShadow: "0 8px 40px rgba(139,92,246,0.35), 0 0 0 1px rgba(139,92,246,0.15)",
                  color: "white",
                  fontSize: 16,
                }}
              >
                Create your identity
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <a
                href="mailto:hello@tiktag.io"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "15px 32px",
                  borderRadius: 12,
                  color: "rgba(255,255,255,0.45)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  fontSize: 16,
                  fontWeight: 500,
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)";
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                Talk to us
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
