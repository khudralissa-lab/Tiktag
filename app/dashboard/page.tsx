"use client";

import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import Link from "next/link";
import { ArrowRight, Eye, MousePointer, QrCode, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const { user } = useAuth();
  const { profile, loading } = useProfile(user?.uid);

  if (loading) return <div className="p-8 text-white/30 text-sm">Loading…</div>;

  const firstName = profile?.displayName?.split(" ")[0] || "there";

  return (
    <div className="p-8 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-semibold text-white">Hey, {firstName} 👋</h1>
        <p className="text-white/40 text-sm mt-1">Here&apos;s your TapID overview.</p>
      </motion.div>

      {/* Profile link banner */}
      {profile?.username && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-6 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-between"
        >
          <div>
            <p className="text-white/50 text-xs mb-1">Your public profile</p>
            <p className="text-indigo-300 text-sm font-medium">tapid.com/u/{profile.username}</p>
          </div>
          <Link
            href={`/u/${profile.username}`}
            target="_blank"
            className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            View <ArrowRight className="w-3 h-3" />
          </Link>
        </motion.div>
      )}

      {/* Quick stats */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mt-6 grid grid-cols-3 gap-4"
      >
        {[
          { label: "Profile Views", value: "—", icon: Eye },
          { label: "Link Clicks", value: "—", icon: MousePointer },
          { label: "QR Scans", value: "—", icon: QrCode },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-white/3 border border-white/8 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Icon className="w-4 h-4 text-white/30" />
              <span className="text-white/40 text-xs">{label}</span>
            </div>
            <p className="text-2xl font-semibold text-white">{value}</p>
          </div>
        ))}
      </motion.div>

      {/* Quick actions */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="mt-6 grid grid-cols-2 gap-4"
      >
        <Link
          href="/dashboard/profile"
          className="group p-5 bg-white/3 border border-white/8 rounded-2xl hover:border-white/15 transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-3">
            <Zap className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-white text-sm font-medium">Edit Profile</p>
          <p className="text-white/30 text-xs mt-0.5">Update your info and links</p>
        </Link>
        <Link
          href="/dashboard/analytics"
          className="group p-5 bg-white/3 border border-white/8 rounded-2xl hover:border-white/15 transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-3">
            <Eye className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-white text-sm font-medium">View Analytics</p>
          <p className="text-white/30 text-xs mt-0.5">See who&apos;s viewing your profile</p>
        </Link>
      </motion.div>
    </div>
  );
}
