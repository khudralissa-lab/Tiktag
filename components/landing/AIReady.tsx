"use client";

import { motion } from "framer-motion";

const capabilities = [
  {
    tag: "Identity",
    title: "AI Bio Generator",
    desc: "Input your role and tone. Receive a polished, professional bio in seconds — crafted to make every first impression count.",
    output: [
      { role: "you", text: "Title: Senior Product Designer. Tone: Confident, minimal." },
      { role: "ai", text: "Shaping digital experiences with precision and restraint. 8 years at the intersection of form and function — turning complex systems into intuitive products people love to use." },
    ],
    live: true,
  },
  {
    tag: "Connection",
    title: "Smart Message Engine",
    desc: "AI-crafted WhatsApp opening messages tailored to the context of your meeting — sector, seniority, and intent.",
    output: [
      { role: "you", text: "Meeting: Dubai Design Week. Contact: Creative Director." },
      { role: "ai", text: "Great connecting at DDW — your work on spatial systems was genuinely inspiring. I'd love to explore a potential collaboration." },
    ],
    live: true,
  },
  {
    tag: "Optimization",
    title: "Profile Intelligence",
    desc: "Your profile is continuously analyzed. AI surfaces actionable insights to increase engagement, click-throughs, and saves.",
    output: null,
    live: false,
    preview: [
      { icon: "↑", text: "Adding a video intro could increase profile saves by 34%", color: "#4ade80" },
      { icon: "⚡", text: "Your WhatsApp CTA is your highest-converting link", color: "#a78bfa" },
      { icon: "◎", text: "Peak engagement window: Tue–Thu, 9–11AM GST", color: "#60a5fa" },
    ],
  },
];

function TerminalBlock({ lines }: { lines: { role: string; text: string }[] }) {
  return (
    <div
      style={{
        borderRadius: 10,
        background: "rgba(0,0,0,0.5)",
        border: "1px solid rgba(255,255,255,0.06)",
        padding: "14px 16px",
        marginTop: 16,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      {lines.map(({ role, text }, i) => (
        <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <span
            style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              flexShrink: 0,
              marginTop: 1,
              color: role === "ai" ? "rgba(139,92,246,0.7)" : "rgba(255,255,255,0.3)",
              fontFamily: "monospace",
              minWidth: 20,
            }}
          >
            {role === "ai" ? "AI" : "→"}
          </span>
          <p
            style={{
              color: role === "ai" ? "rgba(255,255,255,0.78)" : "rgba(255,255,255,0.38)",
              fontSize: 12,
              lineHeight: 1.6,
              fontFamily: role === "you" ? "monospace" : "inherit",
            }}
          >
            {text}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function IntelligenceSection() {
  return (
    <section style={{ padding: "120px 24px" }}>
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
            Neural Identity Layer
          </p>
          <h2
            style={{
              color: "rgba(255,255,255,0.94)",
              fontSize: "clamp(32px, 4.5vw, 52px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
              marginBottom: 16,
            }}
          >
            Intelligence, built in.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 17, maxWidth: 460, margin: "0 auto" }}>
            AI doesn't live in a separate tab. It shapes every word, every connection, every impression.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {capabilities.map(({ tag, title, desc, output, live, preview }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                padding: "28px",
                borderRadius: 20,
                background: "rgba(139,92,246,0.035)",
                border: "1px solid rgba(139,92,246,0.1)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <span
                  style={{
                    padding: "3px 10px",
                    borderRadius: 20,
                    background: "rgba(139,92,246,0.12)",
                    border: "1px solid rgba(139,92,246,0.2)",
                    color: "rgba(167,139,250,0.8)",
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  {tag}
                </span>
                {!live && (
                  <span
                    style={{
                      padding: "3px 8px",
                      borderRadius: 20,
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.28)",
                      fontSize: 9,
                      fontWeight: 600,
                    }}
                  >
                    Coming soon
                  </span>
                )}
              </div>

              <h3
                style={{
                  color: "rgba(255,255,255,0.9)",
                  fontSize: 17,
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  marginBottom: 10,
                }}
              >
                {title}
              </h3>
              <p style={{ color: "rgba(255,255,255,0.36)", fontSize: 13, lineHeight: 1.65, marginBottom: "auto" }}>
                {desc}
              </p>

              {output && <TerminalBlock lines={output} />}

              {preview && (
                <div
                  style={{
                    borderRadius: 10,
                    background: "rgba(0,0,0,0.5)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    padding: "14px 16px",
                    marginTop: 16,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  {preview.map(({ icon, text, color }, j) => (
                    <div key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ color, fontSize: 11, flexShrink: 0, marginTop: 1 }}>{icon}</span>
                      <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, lineHeight: 1.55 }}>{text}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
