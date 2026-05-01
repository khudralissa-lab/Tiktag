"use client";

import { motion } from "framer-motion";
import { Sparkles, MessageSquare, User, Lightbulb } from "lucide-react";

const features = [
  {
    icon: User,
    title: "AI Bio Generator",
    desc: "Input your job title and tone — get a polished, professional bio instantly.",
    live: true,
  },
  {
    icon: MessageSquare,
    title: "Smart Message Suggestions",
    desc: "AI-crafted WhatsApp intro messages tailored to every new connection.",
    live: true,
  },
  {
    icon: Lightbulb,
    title: "Profile Improvement Assistant",
    desc: "Get personalized AI tips to make your profile perform better.",
    live: false,
  },
  {
    icon: Sparkles,
    title: "AI Menu & Help Assistant",
    desc: "Smart AI assistant for restaurant menus, FAQs, and customer interactions.",
    live: false,
  },
];

export default function AIReady() {
  return (
    <section
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
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium text-indigo-300 mb-6"
            style={{
              background: "rgba(99,102,241,0.09)",
              border: "1px solid rgba(99,102,241,0.2)",
            }}
          >
            <Sparkles className="w-3 h-3" />
            AI-Powered
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Intelligence built in
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            Tiktag uses AI to help you create better profiles, smarter messages, and sharper
            first impressions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-3">
          {features.map(({ icon: Icon, title, desc, live }, i) => (
            <motion.div
              key={title}
              className="p-6 rounded-2xl flex items-start gap-4"
              style={{
                background: "rgba(99,102,241,0.04)",
                border: "1px solid rgba(99,102,241,0.10)",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.09 }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: "rgba(99,102,241,0.14)",
                  border: "1px solid rgba(99,102,241,0.2)",
                }}
              >
                <Icon className="w-5 h-5 text-indigo-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <h3 className="text-white font-semibold text-sm">{title}</h3>
                  {!live && (
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-medium text-indigo-300"
                      style={{
                        background: "rgba(99,102,241,0.12)",
                        border: "1px solid rgba(99,102,241,0.2)",
                      }}
                    >
                      Soon
                    </span>
                  )}
                </div>
                <p className="text-white/38 text-sm leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
