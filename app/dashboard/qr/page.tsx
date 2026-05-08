"use client";

import { useState, useEffect, useRef } from "react";
import { useProfile } from "@/hooks/useProfile";
import { auth } from "@/lib/firebase";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, CheckCircle2, ExternalLink, Download, Image as ImageIcon, QrCode, Zap } from "lucide-react";
import BlockedBanner from "@/components/ui/BlockedBanner";
import PageSkeleton from "@/components/ui/PageSkeleton";
import Link from "next/link";
import QRCode from "qrcode";

const BASE_URL = "https://tiktag.pages.dev";
const spr = { type: "spring" as const, stiffness: 260, damping: 22 };

const THEMES = [
  { name: "TikTag",      fg: "#6366f1", bg: "#ffffff", label: "Indigo"     },
  { name: "Midnight",    fg: "#e8e8ff", bg: "#0a0a1a", label: "Midnight"   },
  { name: "Gold",        fg: "#d97706", bg: "#0a0800", label: "Gold"       },
  { name: "Obsidian",    fg: "#000000", bg: "#ffffff", label: "Obsidian"   },
  { name: "Slate",       fg: "#f1f5f9", bg: "#1e293b", label: "Slate"      },
  { name: "Sapphire",    fg: "#1e40af", bg: "#eff6ff", label: "Sapphire"   },
  { name: "Forest",      fg: "#065f46", bg: "#f0fdf4", label: "Forest"     },
  { name: "Rose",        fg: "#9f1239", bg: "#fff1f2", label: "Rose"       },
] as const;

const SIZES = [
  { label: "S",  px: 160 },
  { label: "M",  px: 220 },
  { label: "L",  px: 280 },
  { label: "XL", px: 340 },
];

export default function QRPage() {
  const user = auth.currentUser;
  const { profile, loading, error, retry } = useProfile(user?.uid);
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [fgColor,          setFgColor]          = useState("#6366f1");
  const [bgColor,          setBgColor]          = useState("#ffffff");
  const [sizeIdx,          setSizeIdx]          = useState(1);
  const [margin,           setMargin]           = useState(2);
  const [activeTheme,      setActiveTheme]      = useState<string | null>("TikTag");

  type CenterElement = "none" | "photo" | "company" | "custom";
  const [centerElement,    setCenterElement]    = useState<CenterElement>("none");
  const [customCenterUrl,  setCustomCenterUrl]  = useState("");

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

    let centerSrc = "";
    if      (centerElement === "photo"   && profile?.photoURL)       centerSrc = profile.photoURL;
    else if (centerElement === "company" && profile?.companyLogoUrl) centerSrc = profile.companyLogoUrl;
    else if (centerElement === "custom"  && customCenterUrl)         centerSrc = customCenterUrl;
    if (!centerSrc) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const logoSize = Math.round(qrSize * 0.22);
    const logoX = (canvas.width - logoSize) / 2;
    const logoY = (canvas.height - logoSize) / 2;
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = centerSrc;
    img.onload = () => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(logoX + logoSize / 2, logoY + logoSize / 2, logoSize / 2 + 4, 0, Math.PI * 2);
      ctx.fillStyle = bgColor;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(logoX + logoSize / 2, logoY + logoSize / 2, logoSize / 2, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(img, logoX, logoY, logoSize, logoSize);
      ctx.restore();
    };
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { renderQR(); }, [profileUrl, fgColor, bgColor, qrSize, margin, centerElement, customCenterUrl]);

  const applyTheme = (theme: typeof THEMES[number]) => {
    setFgColor(theme.fg);
    setBgColor(theme.bg);
    setActiveTheme(theme.name);
  };

  const handleColorChange = () => setActiveTheme(null);

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
    out.width  = src.width  + pad * 2;
    out.height = src.height + pad * 2;
    const ctx = out.getContext("2d")!;
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, out.width, out.height);
    ctx.drawImage(src, pad, pad);
    const a = document.createElement("a");
    a.download = `tiktag-${profile?.username}.png`;
    a.href = out.toDataURL("image/png");
    a.click();
  };

  const downloadSVG = async () => {
    try {
      const svg = await QRCode.toString(profileUrl, {
        type: "svg", margin,
        color: { dark: fgColor, light: bgColor },
      });
      const blob = new Blob([svg], { type: "image/svg+xml" });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.download = `tiktag-${profile?.username}.svg`;
      a.href = url;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) { console.error(e); }
  };

  if (loading) return <PageSkeleton rows={4} />;
  if (error)   return <div className="p-5 md:p-8 max-w-3xl"><BlockedBanner errorType={error} onRetry={retry} /></div>;

  if (!profile?.username) return (
    <div className="p-5 md:p-8 max-w-2xl">
      <div className="rounded-[20px] p-8 text-center"
        style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
          style={{ background: "rgba(99,102,241,0.15)" }}>
          <QrCode className="w-6 h-6 text-indigo-400" />
        </div>
        <p className="text-white font-semibold text-[15px] mb-2">Set your username first</p>
        <p className="text-white/38 text-sm mb-5">You need a username to generate your personal QR code.</p>
        <Link href="/dashboard/settings"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
          style={{ background: "rgba(99,102,241,0.2)", border: "1px solid rgba(99,102,241,0.3)" }}>
          Go to Settings →
        </Link>
      </div>
    </div>
  );

  const isThemeActive = (t: typeof THEMES[number]) => fgColor === t.fg && bgColor === t.bg;

  return (
    <div className="p-5 md:p-8 max-w-5xl">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={spr} className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-[10px] flex items-center justify-center"
            style={{ background: "rgba(99,102,241,0.18)", border: "1px solid rgba(99,102,241,0.25)" }}>
            <QrCode className="w-4 h-4 text-indigo-400" />
          </div>
          <h1 className="text-[22px] font-bold text-white tracking-[-0.025em]">QR Studio</h1>
        </div>
        <p className="text-white/35 text-sm">Design and export your personal QR code.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ─── Left: Live Preview ───────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spr, delay: 0.08 }}
        >
          {/* QR Card */}
          <div className="rounded-[24px] p-6 flex flex-col items-center"
            style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}>

            <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] mb-5 self-start"
              style={{ color: "rgba(255,255,255,0.25)" }}>
              Live Preview
            </p>

            {/* Premium QR card */}
            <div
              className="rounded-[22px] overflow-hidden w-full max-w-[260px] mx-auto"
              style={{
                background: bgColor,
                boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 4px 20px rgba(0,0,0,0.25)",
              }}
            >
              <div className="px-6 pt-5 pb-2 text-center">
                <p className="font-black uppercase" style={{ fontSize: "8.5px", letterSpacing: "0.22em", color: fgColor, opacity: 0.4 }}>
                  Scan to Connect
                </p>
                {profile?.displayName && (
                  <p className="font-bold mt-1" style={{ fontSize: "14px", letterSpacing: "-0.015em", color: fgColor }}>
                    {profile.displayName}
                  </p>
                )}
                {profile?.title && (
                  <p className="mt-0.5" style={{ fontSize: "11px", color: fgColor, opacity: 0.5 }}>
                    {profile.title}
                  </p>
                )}
              </div>
              <div className="flex justify-center px-5 py-3">
                <canvas ref={canvasRef} className="block rounded-xl max-w-full" />
              </div>
              <div className="px-5 pb-4 text-center">
                <p className="truncate text-[9px]" style={{ color: fgColor, opacity: 0.28 }}>
                  {profileUrl}
                </p>
              </div>
            </div>

            {/* Export buttons */}
            <div className="mt-6 w-full grid grid-cols-2 gap-2">
              <button
                onClick={downloadPNG}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-[12px] text-[13px] font-semibold text-white transition-opacity hover:opacity-80"
                style={{ background: "rgba(99,102,241,0.16)", border: "1px solid rgba(99,102,241,0.25)" }}
              >
                <Download className="w-3.5 h-3.5" /> Export PNG
              </button>
              <button
                onClick={downloadSVG}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-[12px] text-[13px] font-semibold text-white transition-opacity hover:opacity-80"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <ImageIcon className="w-3.5 h-3.5" /> Export SVG
              </button>
              <button
                onClick={copyLink}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-[12px] text-[13px] font-semibold transition-all col-span-1"
                style={{
                  background: copied ? "rgba(16,185,129,0.14)" : "rgba(255,255,255,0.04)",
                  border:     `1px solid ${copied ? "rgba(16,185,129,0.3)" : "rgba(255,255,255,0.08)"}`,
                  color:      copied ? "#34d399" : "rgba(255,255,255,0.5)",
                }}
              >
                {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy Link"}
              </button>
              <Link
                href={`/u/${profile.username}`}
                target="_blank"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-[12px] text-[13px] font-semibold text-indigo-300 transition-opacity hover:opacity-80 col-span-1"
                style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)" }}
              >
                <ExternalLink className="w-3.5 h-3.5" /> View Profile
              </Link>
            </div>
          </div>
        </motion.div>

        {/* ─── Right: Controls ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spr, delay: 0.12 }}
          className="space-y-5"
        >

          {/* Themes */}
          <div className="rounded-[20px] p-5"
            style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] mb-4"
              style={{ color: "rgba(255,255,255,0.25)" }}>
              Themes
            </p>
            <div className="grid grid-cols-4 gap-2">
              {THEMES.map((t) => {
                const active = isThemeActive(t);
                return (
                  <button
                    key={t.name}
                    onClick={() => applyTheme(t)}
                    className="group flex flex-col items-center gap-1.5 transition-all"
                  >
                    <div
                      className="w-full aspect-square rounded-[10px] flex items-center justify-center transition-all"
                      style={{
                        background: t.bg,
                        border: `2px solid ${active ? "#6366f1" : "rgba(255,255,255,0.08)"}`,
                        boxShadow: active ? "0 0 0 2px rgba(99,102,241,0.35)" : "none",
                      }}
                    >
                      <div className="w-4 h-4 rounded-[3px]" style={{ background: t.fg }} />
                    </div>
                    <span className="text-[10px] font-medium truncate w-full text-center"
                      style={{ color: active ? "#a5b4fc" : "rgba(255,255,255,0.3)" }}>
                      {t.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Colors */}
          <div className="rounded-[20px] p-5"
            style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] mb-4"
              style={{ color: "rgba(255,255,255,0.25)" }}>
              Custom Colors
            </p>
            <div className="flex gap-4">
              <label className="flex items-center gap-3 cursor-pointer flex-1">
                <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0"
                  style={{ border: "1.5px solid rgba(255,255,255,0.12)" }}>
                  <input type="color" value={fgColor}
                    onChange={(e) => { setFgColor(e.target.value); handleColorChange(); }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  <div className="w-full h-full rounded-xl" style={{ background: fgColor }} />
                </div>
                <div>
                  <p className="text-white/65 text-[12.5px] font-medium">Foreground</p>
                  <p className="text-white/28 text-[11px] uppercase font-mono">{fgColor}</p>
                </div>
              </label>
              <label className="flex items-center gap-3 cursor-pointer flex-1">
                <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0"
                  style={{ border: "1.5px solid rgba(255,255,255,0.12)" }}>
                  <input type="color" value={bgColor}
                    onChange={(e) => { setBgColor(e.target.value); handleColorChange(); }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  <div className="w-full h-full rounded-xl" style={{ background: bgColor }} />
                </div>
                <div>
                  <p className="text-white/65 text-[12.5px] font-medium">Background</p>
                  <p className="text-white/28 text-[11px] uppercase font-mono">{bgColor}</p>
                </div>
              </label>
            </div>
          </div>

          {/* Size + Margin */}
          <div className="rounded-[20px] p-5"
            style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] mb-4"
              style={{ color: "rgba(255,255,255,0.25)" }}>
              Size & Spacing
            </p>
            <div className="mb-4">
              <p className="text-white/50 text-[12px] font-medium mb-2">Resolution</p>
              <div className="flex gap-2">
                {SIZES.map(({ label, px }, i) => (
                  <button
                    key={label}
                    onClick={() => setSizeIdx(i)}
                    className="flex-1 py-2 rounded-[10px] text-[12.5px] font-semibold transition-all"
                    style={{
                      background: sizeIdx === i ? "rgba(99,102,241,0.18)" : "rgba(255,255,255,0.04)",
                      border:     `1px solid ${sizeIdx === i ? "rgba(99,102,241,0.35)" : "rgba(255,255,255,0.07)"}`,
                      color:      sizeIdx === i ? "#a5b4fc" : "rgba(255,255,255,0.38)",
                    }}
                  >
                    {label}
                    <span className="block text-[9.5px] opacity-55 mt-0.5">{px}px</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-white/50 text-[12px] font-medium">Quiet Zone</p>
                <span className="text-white/35 text-[11px] font-mono">{margin}</span>
              </div>
              <input
                type="range" min={0} max={6} step={1} value={margin}
                onChange={(e) => setMargin(Number(e.target.value))}
                className="w-full accent-indigo-500 h-1.5 rounded-full"
              />
            </div>
          </div>

          {/* Center Element */}
          <div className="rounded-[20px] p-5"
            style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] mb-4"
              style={{ color: "rgba(255,255,255,0.25)" }}>
              Center Element
            </p>
            <div className="grid grid-cols-2 gap-2">
              {([
                { id: "none",    label: "None",          sub: "Clean QR code",    avail: true },
                { id: "photo",   label: "Profile Photo", sub: profile?.photoURL        ? "Your avatar"  : "No photo set",  avail: !!profile?.photoURL },
                { id: "company", label: "Company Logo",  sub: profile?.companyLogoUrl  ? "Your logo"    : "No logo set",   avail: !!profile?.companyLogoUrl },
                { id: "custom",  label: "Custom Image",  sub: "Paste image URL",  avail: true },
              ] as const).map(({ id, label, sub, avail }) => {
                const active = centerElement === id;
                return (
                  <button
                    key={id}
                    onClick={() => avail && setCenterElement(id as CenterElement)}
                    className="flex items-start gap-2.5 rounded-[13px] text-left transition-all"
                    style={{
                      padding: "11px 13px",
                      background: active ? "rgba(99,102,241,0.14)" : "rgba(255,255,255,0.03)",
                      border: `1px solid ${active ? "rgba(99,102,241,0.35)" : "rgba(255,255,255,0.07)"}`,
                      boxShadow: active ? "0 0 0 1px rgba(99,102,241,0.18)" : "none",
                      opacity: avail ? 1 : 0.38,
                      cursor: avail ? "pointer" : "default",
                    }}
                  >
                    <div
                      className="w-3.5 h-3.5 rounded-full shrink-0 mt-0.5 transition-all"
                      style={{
                        border: `2px solid ${active ? "#6366f1" : "rgba(255,255,255,0.22)"}`,
                        background: active ? "#6366f1" : "transparent",
                        boxShadow: active ? "0 0 0 2px rgba(99,102,241,0.2)" : "none",
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[12.5px] font-semibold leading-tight" style={{ color: active ? "#a5b4fc" : "rgba(255,255,255,0.65)" }}>
                        {label}
                      </p>
                      <p className="text-[10.5px] mt-0.5 truncate" style={{ color: "rgba(255,255,255,0.28)" }}>
                        {sub}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Custom URL input */}
            <AnimatePresence>
              {centerElement === "custom" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <input
                    type="url"
                    value={customCenterUrl}
                    onChange={(e) => setCustomCenterUrl(e.target.value)}
                    placeholder="https://example.com/logo.png"
                    className="w-full mt-3 px-3.5 py-2.5 rounded-[11px] text-white/70 text-[12.5px] placeholder:text-white/22 focus:outline-none"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
