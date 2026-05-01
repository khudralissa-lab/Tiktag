"use client";

import { motion } from "framer-motion";
import { Users, Building2, BarChart2, Package, CreditCard } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Team Profiles",
    desc: "Give every team member their own smart profile, all under your brand.",
  },
  {
    icon: Building2,
    title: "Brand Consistency",
    desc: "Unified design and accent colors across all employee cards and profiles.",
  },
  {
    icon: BarChart2,
    title: "Team Analytics",
    desc: "Track performance across all team members from one central dashboard.",
  },
  {
    icon: Package,
    title: "Bulk NFC Orders",
    desc: "Order NFC cards and tags in bulk with custom branding.",
  },
  {
    icon: CreditCard,
    title: "Employee Smart Cards",
    desc: "Every card is connected to a live, updatable digital profile.",
  },
];

const team = [
  { name: "Sarah Chen", role: "CEO", color: "from-violet-500 to-purple-700", views: "312" },
  { name: "Alex Johnson", role: "Designer", color: "from-indigo-500 to-blue-700", views: "287" },
  { name: "Mike Torres", role: "Sales Lead", color: "from-blue-500 to-cyan-700", views: "248" },
];

export default function ForBusinesses() {
  return (
    <section
      className="py-28 px-6"
      style={{ background: "rgba(255,255,255,0.01)" }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            className="hidden md:flex justify-center"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div
              className="w-full max-w-sm p-7 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <p className="text-white/25 text-[11px] font-semibold uppercase tracking-widest mb-5">
                Company Dashboard
              </p>

              <div className="space-y-2.5 mb-6">
                {team.map(({ name, role, color, views }) => (
                  <div
                    key={name}
                    className="flex items-center justify-between p-3 rounded-xl"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.04)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full bg-gradient-to-br ${color} flex items-center justify-center`}
                      >
                        <span className="text-white text-[10px] font-semibold">{name[0]}</span>
                      </div>
                      <div>
                        <p className="text-white text-xs font-medium">{name}</p>
                        <p className="text-white/28 text-[10px]">{role}</p>
                      </div>
                    </div>
                    <span className="text-white/40 text-[10px]">{views} views</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Team", value: "3" },
                  { label: "Views", value: "847" },
                  { label: "Clicks", value: "213" },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="p-3 rounded-xl text-center"
                    style={{
                      background: "rgba(99,102,241,0.07)",
                      border: "1px solid rgba(99,102,241,0.12)",
                    }}
                  >
                    <p className="text-white font-bold text-lg leading-none mb-1">{value}</p>
                    <p className="text-white/28 text-[10px]">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p className="text-indigo-400 text-[11px] font-semibold tracking-[0.18em] uppercase mb-3">
              For Businesses
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4 leading-tight">
              Scale smart networking across your team
            </h2>
            <p className="text-white/40 text-base leading-relaxed mb-8">
              From startups to enterprises — give every employee a professional smart identity,
              all under one brand.
            </p>

            <div className="space-y-4">
              {features.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      background: "rgba(99,102,241,0.10)",
                      border: "1px solid rgba(99,102,241,0.15)",
                    }}
                  >
                    <Icon className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold mb-0.5">{title}</p>
                    <p className="text-white/38 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
