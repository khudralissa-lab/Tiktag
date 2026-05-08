"use client";

import { useState, useEffect, useRef } from "react";
import { useProfile } from "@/hooks/useProfile";
import { auth } from "@/lib/firebase";
import { motion } from "framer-motion";
import { Copy, CheckCircle2, ExternalLink, Download, Image as ImageIcon } from "lucide-react";
import BlockedBanner from "@/components/ui/BlockedBanner";
import PageSkeleton from "@/components/ui/PageSkeleton";
import Link from "next/link";
import QRCode from "qrcode";

const BASE_URL = "https://tiktag.pages.dev";

const PRESETS = [
  { name: "TikTag Purple", fg: "#6366f1", bg: "#ffffff" },
  { name: "Luxury Black",  fg: "#000000", bg: "#ffffff" },
  { name: "Gold Premium",  fg: "#d97706", bg: "#000000" },
  { name: "Clean White",   fg: "#111111", bg: "#f8f8f8" },
  { name: "Corporate Blue",fg: "#1e40af", bg: "#ffffff" },
] as const;

const SIZES: { label: string; px: number }[] = [
  { label: "S", px: 160 },
  { label: "M", px: 220 },
  { label: "L", px: 280 },
  { label: "XL", px: 340 },
];

export default function QRPage() {
  const user = auth.currentUser;
  const { profile, loading, error, retry } = useProfile(user?.uid);
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [fgColor, setFgColor] = useState("#111111");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [sizeIdx, setSizeIdx] = useState(1);
  const [margin, setMargin] = useState(2);
  const [centerLogo, setCenterLogo] = useState(false);

  const profileUrl = profile?.username ? `${BASE_URL}/u/${profile.username}` : "";
  const qrSize = SIZES[sizeIdx].px;

  const renderQR = async () => {
    const canvas = canvasRef.current;
    if (!canvas || !profileUrl) return;

    await QRCode.toCanvas(canvas, profileUrl, {
      width: qrSize,
      margin,
      color: { dark: fgColor, light: bgColor },
    });

    if (centerLogo && profile?.photoURL) {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const logoSize = Math.round(qrSize * 0.22);
      const logoX = (canvas.width - logoSize) / 2;
      const logoY = (canvas.height - logoSize) / 2;
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.src = profile.photoURL;
      img.onload = () => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(logoX + logoSize / 2, logoY + logoSize / 2, logoSize / 2 + 3, 0, Math.PI * 2);
        ctx.fillStyle = bgColor;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(logoX + logoSize / 2, logoY + logoSize / 2, logoSize / 2, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(img, logoX, logoY, logoSize, logoSize);
        ctx.restore();
      };
    }
  };

  useEffect(() => {
    renderQR();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileUrl, fgColor, bgColor, qrSize, margin, centerLogo]);

  if (loading) return <PageSkeleton rows={4} />;

  if (error) return (
    <div className="p-4 md:p-8 max-w-2xl">
      <BlockedBanner errorType={error} onRetry={retry} />
    </div>
  );

  if (!profile?.username) return (
    <div className="p-4 md:p-8 max-w-2xl">
      <h1 className="text-2xl font-semibold text-white mb-2">QR Studio</h1>
      <p className="text-white/35 text-sm">Set a username first to generate your QR code.</p>
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

  const downloadPNG = () => {
    const src = canvasRef.current;
    if (!src) return;
    const pad = 32;
    const out = document.createElement("canvas");
    out.width = src.width + pad * 2;
    out.height = src.height + pad * 2;
    const ctx = out.getContext("2d")!;
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, out.width, out.height);
    ctx.drawImage(src, pad, pad);
    const a = document.createElement("a");
    a.download = `tiktag-${profile.username}.png`;
    a.href = out.toDataURL("image/png");
    a.click();
  };

  const downloadSVG = async () => {
    try {
      const svg = await QRCode.toString(profileUrl, {
        type: "svg",
        margin,
        color: { dark: fgColor, light: bgColor },
      });
      const blob = new Blob([svg], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.download = `tiktag-${profile.username}.svg`;
      a.href = url;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
    }
  };

  const applyPreset = (preset: typeof PRESETS[number]) => {
    setFgColor(preset.fg);
    setBgColor(preset.bg);
  };

  return (
    <div className="p-4 md:p-8 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <h1 className="text-2xl font-semibold text-white mb-1">QR Studio</h1>
        <p className="text-white/35 text-sm">Customize and download your personal QR code.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.08 }}
        className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* Preview */}
        <div className="flex flex-col items-center">
          <div className="p-5 rounded-3xl shadow-2xl" style={{ background: bgColor }}>
            <canvas ref={canvasRef} className="block rounded-xl" />
          </div>
          <p className="mt-3 text-xs text-indigo-300/70 truncate max-w-xs text-center">{profileUrl}</p>

          <div className="mt-5 flex flex-wrap gap-2 justify-center">
            <button
              onClick={downloadPNG}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-opacity hover:opacity-80"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Download className="w-4 h-4" /> PNG
            </button>
            <button
              onClick={downloadSVG}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-opacity hover:opacity-80"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <ImageIcon className="w-4 h-4" /> SVG
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
              href={`/u/${profile.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-opacity hover:opacity-80"
              style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.25)" }}
            >
              <ExternalLink className="w-4 h-4" /> Profile
            </Link>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-6">

          {/* Presets */}
          <div>
            <p className="text-[11px] text-white/40 font-medium uppercase tracking-widest mb-3">Themes</p>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p.name}
                  onClick={() => applyPreset(p)}
                  title={p.name}
                  className="w-8 h-8 rounded-lg border-2 transition-all hover:scale-110"
                  style={{
                    background: p.bg,
                    borderColor: fgColor === p.fg && bgColor === p.bg ? "#6366f1" : "transparent",
                    outline: fgColor === p.fg && bgColor === p.bg ? "2px solid rgba(99,102,241,0.4)" : "none",
                    outlineOffset: "2px",
                  }}
                >
                  <span
                    className="block w-4 h-4 rounded-sm mx-auto"
                    style={{ background: p.fg }}
                  />
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {PRESETS.map((p) => (
                <button
                  key={p.name}
                  onClick={() => applyPreset(p)}
                  className="text-[11px] px-2.5 py-1 rounded-lg transition-colors"
                  style={{
                    background: fgColor === p.fg && bgColor === p.bg ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.04)",
                    color: fgColor === p.fg && bgColor === p.bg ? "#a5b4fc" : "rgba(255,255,255,0.35)",
                    border: `1px solid ${fgColor === p.fg && bgColor === p.bg ? "rgba(99,102,241,0.25)" : "rgba(255,255,255,0.06)"}`,
                  }}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div>
            <p className="text-[11px] text-white/40 font-medium uppercase tracking-widest mb-3">Colors</p>
            <div className="flex gap-4">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-white/10">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="w-full h-full rounded-lg" style={{ background: fgColor }} />
                </div>
                <span className="text-white/45 text-xs">Foreground</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-white/10">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="w-full h-full rounded-lg" style={{ background: bgColor }} />
                </div>
                <span className="text-white/45 text-xs">Background</span>
              </label>
            </div>
          </div>

          {/* Size */}
          <div>
            <p className="text-[11px] text-white/40 font-medium uppercase tracking-widest mb-3">Size</p>
            <div className="flex gap-2">
              {SIZES.map(({ label }, i) => (
                <button
                  key={label}
                  onClick={() => setSizeIdx(i)}
                  className="w-10 h-10 rounded-lg text-sm font-medium transition-all"
                  style={{
                    background: sizeIdx === i ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.04)",
                    border: `1px solid ${sizeIdx === i ? "rgba(99,102,241,0.35)" : "rgba(255,255,255,0.07)"}`,
                    color: sizeIdx === i ? "#a5b4fc" : "rgba(255,255,255,0.4)",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Margin */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[11px] text-white/40 font-medium uppercase tracking-widest">Margin</p>
              <span className="text-white/40 text-xs">{margin}</span>
            </div>
            <input
              type="range"
              min={0}
              max={6}
              step={1}
              value={margin}
              onChange={(e) => setMargin(Number(e.target.value))}
              className="w-full accent-indigo-500"
            />
          </div>

          {/* Center logo */}
          {profile?.photoURL && (
            <div>
              <p className="text-[11px] text-white/40 font-medium uppercase tracking-widest mb-3">Center Logo</p>
              <label className="flex items-center gap-3 cursor-pointer group">
                <div
                  onClick={() => setCenterLogo((v) => !v)}
                  className="w-10 h-6 rounded-full transition-colors relative"
                  style={{ background: centerLogo ? "#6366f1" : "rgba(255,255,255,0.1)" }}
                >
                  <span
                    className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all"
                    style={{ left: centerLogo ? "22px" : "4px" }}
                  />
                </div>
                <span className="text-white/45 text-xs group-hover:text-white/65 transition-colors">
                  Embed profile photo
                </span>
              </label>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
