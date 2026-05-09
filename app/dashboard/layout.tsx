"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AuthGuard = dynamic(() => import("@/components/auth/AuthGuard"), { ssr: false });
const Sidebar   = dynamic(() => import("@/components/dashboard/Sidebar"),   { ssr: false });

const PAGE_LABELS: Record<string, string> = {
  "/dashboard":           "Overview",
  "/dashboard/profile":   "Profile Builder",
  "/dashboard/contact":   "Profile Builder",
  "/dashboard/company":   "Profile Builder",
  "/dashboard/social":    "Profile Builder",
  "/dashboard/links":     "Links",
  "/dashboard/media":     "Portfolio",
  "/dashboard/qr":        "QR Studio",
  "/dashboard/nfc":       "NFC Products",
  "/dashboard/analytics": "Analytics",
  "/dashboard/theme":     "Themes",
  "/dashboard/settings":  "Settings",
  "/dashboard/ai":        "AI Tools",
};

function NfcWave() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      <path d="M6.8 17.2C5.1 15.5 4 13.4 4 12s1.1-3.5 2.8-5.2" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      <path d="M17.2 6.8C18.9 8.5 20 10.6 20 12s-1.1 3.5-2.8 5.2" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const pageLabel = PAGE_LABELS[pathname] ?? "Dashboard";

  return (
    <AuthGuard>
      <div style={{
        display: "flex",
        minHeight: "100vh",
        background: "#04040c",
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.013) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.013) 1px, transparent 1px)",
        backgroundSize: "72px 72px",
      }}>
        {/* Mobile topbar */}
        <div
          className="md:hidden"
          style={{
            position: "fixed", top: 0, left: 0, right: 0, height: 56, zIndex: 50,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0 16px",
            background: "rgba(4,4,12,0.94)",
            backdropFilter: "blur(24px)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            boxShadow: "0 1px 20px rgba(0,0,0,0.5)",
          }}
        >
          <Link href="/dashboard" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <div style={{
              width: 28, height: 28, borderRadius: 8,
              background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "white", boxShadow: "0 4px 12px rgba(139,92,246,0.35)",
            }}>
              <NfcWave />
            </div>
            <span style={{ color: "rgba(255,255,255,0.88)", fontWeight: 700, fontSize: 14, letterSpacing: "-0.03em" }}>
              TikTag
            </span>
          </Link>

          <span style={{ color: "rgba(255,255,255,0.36)", fontSize: 12, fontWeight: 500 }}>
            {pageLabel}
          </span>

          <button
            onClick={() => setSidebarOpen(true)}
            style={{
              width: 34, height: 34, borderRadius: 9, cursor: "pointer",
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            <Menu size={16} />
          </button>
        </div>

        {/* Mobile backdrop */}
        {sidebarOpen && (
          <div
            className="md:hidden"
            style={{
              position: "fixed", inset: 0, zIndex: 40,
              background: "rgba(0,0,0,0.72)", backdropFilter: "blur(4px)",
            }}
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main style={{ flex: 1, overflow: "auto", minHeight: "100vh" }}>
          <div className="md:hidden" style={{ height: 56 }} />
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
