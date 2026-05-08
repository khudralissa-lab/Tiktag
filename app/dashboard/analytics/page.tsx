"use client";

import { useEffect, useState } from "react";
import { getAnalyticsEvents } from "@/lib/firestore";
import { auth } from "@/lib/firebase";
import { isFirebaseBlocked } from "@/lib/firebaseError";
import BlockedBanner from "@/components/ui/BlockedBanner";
import PageSkeleton from "@/components/ui/PageSkeleton";
import { motion } from "framer-motion";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Eye, MousePointer, QrCode, TrendingUp, BarChart2 } from "lucide-react";
import type { AnalyticsEvent } from "@/types";

const spr = { type: "spring" as const, stiffness: 260, damping: 22 };

function processEvents(events: AnalyticsEvent[]) {
  const viewsByDay: Record<string, number> = {};
  const clicksByButton: Record<string, number> = {};
  let qr = 0, nfc = 0, direct = 0;

  events.forEach((e) => {
    if (e.type === "view") {
      const day = new Date(e.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" });
      viewsByDay[day] = (viewsByDay[day] || 0) + 1;
      if (e.source === "qr") qr++;
      else if (e.source === "nfc") nfc++;
      else direct++;
    } else if (e.type === "click") {
      clicksByButton[e.target] = (clicksByButton[e.target] || 0) + 1;
    }
  });

  return {
    viewsByDay:     Object.entries(viewsByDay).slice(-14).map(([date, views]) => ({ date, views })),
    clicksByButton: Object.entries(clicksByButton).map(([name, clicks]) => ({ name, clicks })),
    sources: [
      { name: "Direct", value: direct, color: "#6366f1" },
      { name: "QR Scan", value: qr,    color: "#22d3ee" },
      { name: "NFC Tap", value: nfc,   color: "#10b981" },
    ],
    totalViews:  events.filter((e) => e.type === "view").length,
    totalClicks: events.filter((e) => e.type === "click").length,
    nfcTaps:     nfc,
  };
}

const ANALYTICS_TIMEOUT_MS = 25000;

const tooltipStyle = {
  background: "#0f0f18",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 10,
  fontSize: 12,
  color: "#fff",
};

function EmptyChart({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-2">
      <BarChart2 className="w-6 h-6 text-white/12" />
      <p className="text-white/22 text-sm">{label}</p>
    </div>
  );
}

export default function AnalyticsPage() {
  const uid = auth.currentUser?.uid;
  const [data, setData] = useState<ReturnType<typeof processEvents> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<"blocked" | "slow" | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    if (!uid) return;
    setLoading(true);
    setError(null);
    let settled = false;

    const timeout = setTimeout(() => {
      if (!settled) { settled = true; setError("slow"); setLoading(false); }
    }, ANALYTICS_TIMEOUT_MS);

    getAnalyticsEvents(uid, 30)
      .then((events) => {
        if (!settled) { clearTimeout(timeout); settled = true; setData(processEvents(events)); setLoading(false); }
      })
      .catch((err) => {
        if (!settled) {
          clearTimeout(timeout); settled = true;
          if (isFirebaseBlocked(err)) setError("blocked");
          setLoading(false);
        }
      });

    return () => { clearTimeout(timeout); settled = true; };
  }, [uid, retryKey]);

  if (loading) return <PageSkeleton rows={5} />;

  if (error) return (
    <div className="p-5 md:p-8 max-w-4xl">
      <BlockedBanner errorType={error} onRetry={() => setRetryKey((k) => k + 1)} />
    </div>
  );

  const statItems = [
    { label: "Profile Views",  value: data?.totalViews  ?? 0, icon: Eye,          accent: "rgba(99,102,241,0.22)" },
    { label: "Link Clicks",    value: data?.totalClicks ?? 0, icon: MousePointer, accent: "rgba(16,185,129,0.22)" },
    { label: "NFC Taps",       value: data?.nfcTaps     ?? 0, icon: QrCode,       accent: "rgba(34,211,238,0.22)" },
  ];

  return (
    <div className="p-5 md:p-8 max-w-5xl">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={spr} className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-[10px] flex items-center justify-center"
            style={{ background: "rgba(99,102,241,0.18)", border: "1px solid rgba(99,102,241,0.25)" }}>
            <TrendingUp className="w-4 h-4 text-indigo-400" />
          </div>
          <h1 className="text-[22px] font-bold text-white tracking-[-0.025em]">Analytics</h1>
        </div>
        <p className="text-white/35 text-sm">Profile performance over the last 30 days.</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {statItems.map(({ label, value, icon: Icon, accent }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spr, delay: 0.06 + i * 0.06 }}
            className="rounded-[18px] p-5"
            style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-3" style={{ background: accent }}>
              <Icon className="w-4 h-4 text-white/80" />
            </div>
            <p className="text-[28px] font-bold text-white tracking-tight leading-none">{value || "—"}</p>
            <p className="text-white/38 text-[12px] font-medium mt-1.5">{label}</p>
          </motion.div>
        ))}
      </div>

      {/* Views over time */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...spr, delay: 0.2 }}
        className="rounded-[20px] p-6 mb-5"
        style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center justify-between mb-5">
          <p className="text-white/72 text-[14px] font-semibold">Profile Views</p>
          <span className="text-[11px] font-medium px-2 py-1 rounded-md"
            style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.35)" }}>
            Last 14 days
          </span>
        </div>
        {(data?.viewsByDay.length ?? 0) > 0 ? (
          <ResponsiveContainer width="100%" height={190}>
            <LineChart data={data?.viewsByDay} margin={{ top: 4, right: 4, bottom: 0, left: -16 }}>
              <XAxis dataKey="date" tick={{ fill: "rgba(255,255,255,0.28)", fontSize: 11 }}
                axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.28)", fontSize: 11 }}
                axisLine={false} tickLine={false} width={32} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "rgba(255,255,255,0.08)" }} />
              <Line type="monotone" dataKey="views" stroke="#6366f1" strokeWidth={2.5}
                dot={false} activeDot={{ r: 4, fill: "#6366f1", stroke: "#6366f1" }} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <EmptyChart label="No views yet. Share your profile to get started." />
        )}
      </motion.div>

      {/* Clicks + Sources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spr, delay: 0.28 }}
          className="rounded-[20px] p-6"
          style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-white/72 text-[14px] font-semibold mb-5">Clicks by Button</p>
          {(data?.clicksByButton.length ?? 0) > 0 ? (
            <ResponsiveContainer width="100%" height={165}>
              <BarChart data={data?.clicksByButton} margin={{ top: 4, right: 4, bottom: 0, left: -16 }}>
                <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.28)", fontSize: 11 }}
                  axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.28)", fontSize: 11 }}
                  axisLine={false} tickLine={false} width={28} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                <Bar dataKey="clicks" radius={[6, 6, 0, 0]} fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <EmptyChart label="No clicks recorded yet." />
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spr, delay: 0.34 }}
          className="rounded-[20px] p-6"
          style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-white/72 text-[14px] font-semibold mb-5">Traffic Sources</p>
          {(data?.totalViews ?? 0) > 0 ? (
            <div className="space-y-4 mt-2">
              {data?.sources.map(({ name, value, color }) => {
                const pct = Math.round((value / (data.totalViews || 1)) * 100);
                return (
                  <div key={name}>
                    <div className="flex justify-between text-[12.5px] mb-2">
                      <span className="text-white/48 font-medium">{name}</span>
                      <span className="text-white/65 font-semibold">{value} <span className="text-white/30 font-normal">({pct}%)</span></span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                      <motion.div
                        className="h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                        style={{ background: color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyChart label="No traffic data yet." />
          )}
        </motion.div>
      </div>
    </div>
  );
}
