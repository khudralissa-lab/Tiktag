"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MessageSquare } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="relative text-center p-12 md:p-16 rounded-3xl overflow-hidden"
          style={{
            background: "rgba(99,102,241,0.05)",
            border: "1px solid rgba(99,102,241,0.18)",
          }}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% -10%, rgba(99,102,241,0.18) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10">
            <p className="text-indigo-400 text-[11px] font-semibold tracking-[0.18em] uppercase mb-4">
              Get started today
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4 leading-tight">
              Your identity should be as
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #a5b4fc 0%, #818cf8 50%, #6366f1 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                smart as your business.
              </span>
            </h2>
            <p className="text-white/38 text-lg mb-10 max-w-md mx-auto">
              Join thousands of professionals and businesses who tap smarter with Tiktag.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/register"
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-white text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                  boxShadow: "0 8px 32px rgba(99,102,241,0.35)",
                }}
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="mailto:hello@tiktag.io"
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-white/55 text-sm font-medium border border-white/[0.09] hover:text-white hover:bg-white/[0.04] transition-all duration-200"
              >
                <MessageSquare className="w-4 h-4" />
                Talk to Sales
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
