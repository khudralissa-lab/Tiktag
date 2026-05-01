"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getAnalyticsEvents } from "@/lib/firestore";
import { isFirebaseBlocked } from "@/lib/firebaseError";
import BlockedBanner from "@/components/ui/BlockedBanner";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { motion } from "framer-motion";
import type { AnalyticsEvent } from "@/types";

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
    viewsByDay: Object.entries(viewsByDay).slice(-14).map(([date, views]) => ({ date, views })),
    clicksByButton: Object.entries(clicksByButton).map(([name, clicks]) => ({ name, clicks })),
    sources: [
      { name: "Direct", value: direct },
      { name: "QR", value: qr },
      { name: "NFC", value: nfc },
    ],
    totalViews: events.filter((e) => e.type === "view").length,
    totalClicks: events.filter((e) => e.type === "click").length,
  };
}

const COLORS = ["#6366f1", "#22d3ee", "#10b981"];
const ANALYTICS_TIMEOUT_MS = 25000;

export default function AnalyticsPage() {
  const { user } = useAuth();
  const [data, setData] = useState<ReturnType<typeof processEvents> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<"blocked" | "slow" | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    setError(null);

    let settled = false;

    const timeout = setTimeout(() => {
      if (!settled) {
        console.warn("[TikTag] Analytics fetch timed out after 25s");
        settled = true;
        setError("slow");
        setLoading(false);
      }
    }, ANALYTICS_TIMEOUT_MS);

    getAnalyticsEvents(user.uid, 30)
      .then((events) => {
        if (!settled) {
          clearTimeout(timeout);
          settled = true;
          setData(processEvents(events));
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!settled) {
          clearTimeout(timeout);
          settled = true;
          console.error("[TikTag] Analytics fetch failed:", err);
          if (isFirebaseBlocked(err)) setError("blocked");
          setLoading(false);
        }
      });

    return () => { clearTimeout(timeout); settled = true; };
  }, [user, retryKey]);

  if (loading) return <div className="p-8 text-white/30 text-sm">Loading analytics…</div>;
  if (error) return (
    <div className="p-8 max-w-4xl">
      <BlockedBanner errorType={error} onRetry={() => setRetryKey((k) => k + 1)} />
    </div>
  );

  const stats = [
    { label: "Total Views", value: data?.totalViews ?? 0 },
    { label: "Total Clicks", value: data?.totalClicks ?? 0 },
    { label: "NFC Taps", value: data?.sources.find((s) => s.name === "NFC")?.value ?? 0 },
  ];

  return (
    <div className="p-8 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-semibold text-white">Analytics</h1>
        <p className="text-white/40 text-sm mt-1">Last 30 days</p>
      </motion.div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        {stats.map(({ label, value }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="bg-white/3 border border-white/8 rounded-2xl p-4"
          >
            <p className="text-white/40 text-xs mb-2">{label}</p>
            <p className="text-3xl font-semibold text-white">{value}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="mt-6 bg-white/3 border border-white/8 rounded-2xl p-6"
      >
        <p className="text-white/60 text-sm font-medium mb-4">Profile Views — Last 14 days</p>
        {(data?.viewsByDay.length ?? 0) > 0 ? (
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={data?.viewsByDay}>
              <XAxis dataKey="date" tick={{ fill: "#ffffff40", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#ffffff40", fontSize: 11 }} axisLine={false} tickLine={false} width={30} />
              <Tooltip contentStyle={{ background: "#111", border: "1px solid #222", borderRadius: 8, fontSize: 12 }} />
              <Line type="monotone" dataKey="views" stroke="#6366f1" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-white/20 text-sm text-center py-12">No views yet. Share your profile to get started.</p>
        )}
      </motion.div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="bg-white/3 border border-white/8 rounded-2xl p-6"
        >
          <p className="text-white/60 text-sm font-medium mb-4">Clicks by Button</p>
          {(data?.clicksByButton.length ?? 0) > 0 ? (
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={data?.clicksByButton}>
                <XAxis dataKey="name" tick={{ fill: "#ffffff40", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#ffffff40", fontSize: 11 }} axisLine={false} tickLine={false} width={25} />
                <Tooltip contentStyle={{ background: "#111", border: "1px solid #222", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="clicks" radius={[4, 4, 0, 0]} fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-white/20 text-sm text-center py-8">No clicks yet.</p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="bg-white/3 border border-white/8 rounded-2xl p-6"
        >
          <p className="text-white/60 text-sm font-medium mb-4">Traffic Sources</p>
          <div className="space-y-3 mt-4">
            {data?.sources.map(({ name, value }, i) => {
              const total = data.totalViews || 1;
              const pct = Math.round((value / total) * 100);
              return (
                <div key={name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white/40">{name}</span>
                    <span className="text-white/60">{value} ({pct}%)</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: COLORS[i] }} />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
