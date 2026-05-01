"use client";

import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import BlockedBanner from "@/components/ui/BlockedBanner";

export default function SettingsPage() {
  const { user } = useAuth();
  const { profile, loading, error, retry } = useProfile(user?.uid);

  if (loading) return <div className="p-8 text-white/30 text-sm">Loading…</div>;
  if (error) return <BlockedBanner onRetry={retry} />;

  return (
    <div className="p-8 max-w-2xl">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-semibold text-white">Settings</h1>
        <p className="text-white/40 text-sm mt-1">Account information</p>
      </motion.div>

      <div className="mt-8 space-y-3">
        <div className="bg-white/3 border border-white/8 rounded-2xl p-4">
          <p className="text-white/40 text-xs mb-1">Email</p>
          <p className="text-white text-sm">{user?.email}</p>
        </div>
        <div className="bg-white/3 border border-white/8 rounded-2xl p-4">
          <p className="text-white/40 text-xs mb-1">Username</p>
          <p className="text-white text-sm">@{profile?.username}</p>
        </div>
        <div className="bg-white/3 border border-white/8 rounded-2xl p-4">
          <p className="text-white/40 text-xs mb-1">Plan</p>
          <p className="text-white text-sm capitalize">{profile?.plan ?? "free"}</p>
        </div>
        <div className="bg-white/3 border border-white/8 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="text-white/40 text-xs mb-1">Public Profile</p>
            <p className="text-indigo-300 text-sm">tapid.com/u/{profile?.username}</p>
          </div>
          <a href={`/u/${profile?.username}`} target="_blank" className="text-white/30 hover:text-white/60 transition-colors">
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
