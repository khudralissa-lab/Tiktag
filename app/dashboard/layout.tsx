"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import { DashboardProvider } from "@/contexts/DashboardContext";

const AuthGuard = dynamic(() => import("@/components/auth/AuthGuard"), { ssr: false });

const PAGE_LABELS: Record<string, string> = {
  "/dashboard":                  "Overview",
  "/dashboard/profile":          "Profile Builder",
  "/dashboard/contact":          "Profile Builder",
  "/dashboard/company":          "Profile Builder",
  "/dashboard/social":           "Profile Builder",
  "/dashboard/links":            "Links",
  "/dashboard/media":            "Portfolio",
  "/dashboard/qr":               "QR Studio",
  "/dashboard/nfc":              "NFC Products",
  "/dashboard/analytics":        "Analytics",
  "/dashboard/theme":            "Themes",
  "/dashboard/settings":         "Settings",
  "/dashboard/ai":               "AI Tools",
  "/dashboard/teams":            "Teams",
  "/dashboard/employee-cards":   "Employee Cards",
  "/dashboard/billing":          "Billing",
  "/dashboard/menu":             "Menu",
  "/dashboard/reviews":          "Reviews",
  "/dashboard/orders":           "WhatsApp Orders",
  "/dashboard/event":            "Event Page",
  "/dashboard/badges":           "Smart Badges",
  "/dashboard/speakers":         "Speakers",
  "/dashboard/attendees":        "Attendees",
  "/dashboard/sponsors":         "Sponsors",
  "/dashboard/networking":       "Networking Analytics",
  "/dashboard/organization":     "Organization",
  "/dashboard/users":            "Users",
  "/dashboard/access":           "Access Control",
  "/dashboard/devices":          "Devices",
  "/dashboard/integrations":     "Integrations",
  "/dashboard/security":         "Security",
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
      <DashboardProvider>
      <div
        className="flex min-h-screen"
        style={{
          background: "#04040c",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      >
        {/* Mobile topbar — must be first child, highest z-index */}
        <div
          className="md:hidden"
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0,
            height: 56,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 16px",
            background: "rgba(4,4,12,0.96)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderBottom: "1px solid rgba(255,255,255,0.055)",
            boxShadow: "0 2px 24px rgba(0,0,0,0.6)",
          }}
        >
          <Link
            href="/dashboard"
            style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none" }}
          >
            <div
              style={{
                width: 28, height: 28, borderRadius: 8,
                background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "white",
                boxShadow: "0 4px 12px rgba(139,92,246,0.38)",
                flexShrink: 0,
              }}
            >
              <NfcWave />
            </div>
            <span
              style={{
                color: "rgba(255,255,255,0.9)",
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: "-0.03em",
              }}
            >
              TikTag
            </span>
          </Link>

          <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, fontWeight: 500 }}>
            {pageLabel}
          </span>

          <button
            type="button"
            onClick={() => setSidebarOpen((prev) => !prev)}
            style={{
              width: 36, height: 36,
              borderRadius: 10,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "rgba(255,255,255,0.55)",
              cursor: "pointer",
              flexShrink: 0,
              WebkitTapHighlightColor: "transparent",
            }}
          >
            <Menu size={17} />
          </button>
        </div>

        {/* Mobile backdrop — below topbar */}
        {sidebarOpen && (
          <div
            className="md:hidden"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9001,
              background: "rgba(0,0,0,0.75)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
            }}
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar (directly imported — no dynamic delay) */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main content */}
        <main
          className="flex-1 overflow-y-auto min-h-screen pt-14 md:pt-0"
          style={{ position: "relative" }}
        >
          {children}
        </main>
      </div>
      </DashboardProvider>
    </AuthGuard>
  );
}
