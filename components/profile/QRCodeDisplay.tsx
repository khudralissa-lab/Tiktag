"use client";

import { useEffect, useRef } from "react";
import QRCode from "qrcode";
import { Download } from "lucide-react";

export default function QRCodeDisplay({ url, username }: { url: string; username: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    QRCode.toCanvas(canvasRef.current, url, {
      width: 180,
      margin: 2,
      color: { dark: "#ffffff", light: "#00000000" },
    });
  }, [url]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = `tapid-${username}.png`;
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <canvas ref={canvasRef} className="rounded-xl" />
      <button
        onClick={handleDownload}
        className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors"
      >
        <Download className="w-3.5 h-3.5" />
        Download QR
      </button>
    </div>
  );
}
