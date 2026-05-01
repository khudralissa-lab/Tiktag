"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { motion } from "framer-motion";
import { Copy, CheckCircle2, ExternalLink } from "lucide-react";
import BlockedBanner from "@/components/ui/BlockedBanner";
import QRCodeDisplay from "@/components/profile/QRCodeDisplay";
import Link from "next/link";

export default function QRPage() {
  const { user } = useAuth();
  const { profile, loading, error, retry } = useProfile(user?.uid);
  const [copied, setCopied] = useState(false);

  if (loading) return <div className="p-8 text-white/30 text-sm">Loading…</div>;
  if (error) return <BlockedBanner onRetry={retry} />;

  if (!profile?.username) return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-2xl font-semibold text-white mb-2">QR Code</h1>
      <p className="text-white/35 text-sm">Set up your username in settings first to generate a QR code.</p>
      <Link href="/dashboard/settings" className="text-indigo-400 hover:text-indigo-300 text-sm mt-4 inline-block">
        Go to Settings →
      </Link>
    </div>
  );

  const profileUrl = `https://tiktag.io/u/${profile.username}`;

  const copyLink = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-8 max-w-2xl">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <h1 className="text-2xl font-semibold text-white mb-1">QR Code</h1>
        <p className="text-white/35 text-sm">Your personal QR code — share it anywhere.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.08 }}
        className="mt-8 flex flex-col items-center"
      >
        <div
          className="p-8 rounded-3xl"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <QRCodeDisplay url={profileUrl} username={profile.username} />
        </div>

        <div className="mt-6 w-full max-w-xs">
          <div
            className="flex items-center gap-2 px-4 py-3 rounded-xl"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <p className="flex-1 text-indigo-300 text-sm truncate">{profileUrl}</p>
            <button onClick={copyLink} className="shrink-0 text-white/40 hover:text-white transition-colors">
              {copied ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            </button>
            <Link
              href={`/u/${profile.username}`}
              target="_blank"
              className="shrink-0 text-white/40 hover:text-white transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="mt-8 max-w-xs text-center">
          <p className="text-white/22 text-xs leading-relaxed">
            Print this QR code on business cards, posters, or add it to your email signature.
            Anyone who scans it will be taken directly to your digital profile.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
