"use client";

import { useState, useEffect, useRef } from "react";
import { useProfile } from "@/hooks/useProfile";
import { auth } from "@/lib/firebase";
import { motion } from "framer-motion";
import { Copy, CheckCircle2, ExternalLink, Download } from "lucide-react";
import BlockedBanner from "@/components/ui/BlockedBanner";
import Link from "next/link";
import QRCode from "qrcode";

const BASE_URL = "https://tiktag.pages.dev";
const QR_SIZE = 200;

export default function QRPage() {
  const user = auth.currentUser;
  const { profile, loading, error, retry } = useProfile(user?.uid);
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const profileUrl = profile?.username ? `${BASE_URL}/u/${profile.username}` : "";

  useEffect(() => {
    if (!profileUrl || !canvasRef.current) return;
    QRCode.toCanvas(canvasRef.current, profileUrl, {
      width: QR_SIZE,
      margin: 2,
      color: { dark: "#111111", light: "#ffffff" },
    }).catch(console.error);
  }, [profileUrl]);

  if (loading) return <div className="p-8 text-white/30 text-sm">Loading…</div>;

  if (error) return (
    <div className="p-8 max-w-2xl">
      <BlockedBanner errorType={error} onRetry={retry} />
    </div>
  );

  if (!profile?.username) return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-2xl font-semibold text-white mb-2">QR Code</h1>
      <p className="text-white/35 text-sm">Complete your profile username first.</p>
      <Link href="/dashboard/settings" className="text-indigo-400 hover:text-indigo-300 text-sm mt-4 inline-block">
        Go to Settings →
      </Link>
    </div>
  );

  const copyLink = async () => {
    await navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadQR = () => {
    const src = canvasRef.current;
    if (!src) return;
    const pad = 28;
    const out = document.createElement("canvas");
    out.width = src.width + pad * 2;
    out.height = src.height + pad * 2;
    const ctx = out.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, out.width, out.height);
    ctx.drawImage(src, pad, pad);
    const a = document.createElement("a");
    a.download = `tapid-${profile.username}.png`;
    a.href = out.toDataURL("image/png");
    a.click();
  };

  return (
    <div className="p-8 max-w-lg">
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
        {/* QR on white card — scannable and download-ready */}
        <div className="p-6 rounded-3xl bg-white shadow-xl">
          <canvas ref={canvasRef} className="block rounded-xl" />
        </div>

        {/* Profile URL display */}
        <p className="mt-4 text-sm text-indigo-300/80 truncate max-w-xs text-center">{profileUrl}</p>

        {/* Action buttons */}
        <div className="mt-5 flex flex-wrap gap-3 justify-center">
          <button
            onClick={downloadQR}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-opacity hover:opacity-80"
            style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <Download className="w-4 h-4" />
            Download QR
          </button>

          <button
            onClick={copyLink}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-opacity hover:opacity-80"
            style={{
              background: copied ? "rgba(16,185,129,0.12)" : "rgba(255,255,255,0.07)",
              border: `1px solid ${copied ? "rgba(16,185,129,0.3)" : "rgba(255,255,255,0.1)"}`,
              color: copied ? "#34d399" : "#ffffff",
            }}
          >
            {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied!" : "Copy Link"}
          </button>

          <Link
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-opacity hover:opacity-80"
            style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.25)" }}
          >
            <ExternalLink className="w-4 h-4" />
            Open Profile
          </Link>
        </div>

        <p className="mt-8 max-w-xs text-center text-white/22 text-xs leading-relaxed">
          Print on business cards, posters, or add to your email signature.
          Anyone who scans it lands directly on your profile.
        </p>
      </motion.div>
    </div>
  );
}
