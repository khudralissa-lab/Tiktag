"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, User, Phone, Building2, Globe, Link2,
  QrCode, Nfc, Palette, TrendingUp, Settings, LogOut, Zap, X, Images,
} from "lucide-react";

type NavItem = { href: string; label: string; icon: React.ComponentType<{ className?: string }>; exact?: boolean; badge?: string };
type Section = { label: string | null; items: NavItem[] };

const NAV: Section[] = [
  {
    label: null,
    items: [{ href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true }],
  },
  {
    label: "Identity",
    items: [
      { href: "/dashboard/profile",  label: "Profile",  icon: User      },
      { href: "/dashboard/contact",  label: "Contact",  icon: Phone     },
      { href: "/dashboard/company",  label: "Company",  icon: Building2 },
      { href: "/dashboard/social",   label: "Social",   icon: Globe     },
    ],
  },
  {
    label: "Content",
    items: [
      { href: "/dashboard/links", label: "Custom Links", icon: Link2   },
      { href: "/dashboard/media", label: "Media",        icon: Images  },
    ],
  },
  {
    label: "Technology",
    items: [
      { href: "/dashboard/qr",  label: "QR Studio", icon: QrCode },
      { href: "/dashboard/nfc", label: "NFC Setup",  icon: Nfc   },
    ],
  },
  {
    label: "Appearance",
    items: [{ href: "/dashboard/theme", label: "Theme", icon: Palette }],
  },
  {
    label: "Insights",
    items: [{ href: "/dashboard/analytics", label: "Analytics", icon: TrendingUp }],
  },
  {
    label: "Account",
    items: [{ href: "/dashboard/settings", label: "Settings", icon: Settings }],
  },
];

export default function Sidebar({ isOpen = false, onClose }: { isOpen?: boolean; onClose?: () => void }) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const router = useRouter();
  const user = auth.currentUser;

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const userInitial = user?.email?.[0]?.toUpperCase() || "?";

  const inner = (
    <aside
      className="w-[248px] shrink-0 flex flex-col h-screen"
      style={{ background: "#05050a", borderRight: "1px solid rgba(255,255,255,0.055)" }}
    >
      {/* ─── Logo ──────────────────────────────────── */}
      <div
        className="px-5 h-[60px] flex items-center justify-between shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <Link href="/dashboard" className="flex items-center gap-2.5" onClick={onClose}>
          <div
            className="w-7 h-7 rounded-[8px] flex items-center justify-center shrink-0"
            style={{ background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)" }}
          >
            <Zap className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-bold text-white text-[15px] tracking-[-0.025em]">TikTag</span>
          <span
            className="text-[9.5px] px-1.5 py-0.5 rounded-[5px] font-bold tracking-[0.05em]"
            style={{
              background: "rgba(99,102,241,0.18)",
              border: "1px solid rgba(99,102,241,0.28)",
              color: "#a5b4fc",
            }}
          >
            OS
          </span>
        </Link>
        <button
          onClick={onClose}
          className="md:hidden w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-white/65 hover:bg-white/[0.07] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* ─── Nav ───────────────────────────────────── */}
      <nav className="flex-1 py-3 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        {NAV.map(({ label, items }) => (
          <div key={label ?? "main"} className="mb-0.5">
            {label && (
              <p
                className="px-5 pt-4 pb-1.5 text-[10px] font-bold uppercase tracking-[0.14em]"
                style={{ color: "rgba(255,255,255,0.2)" }}
              >
                {label}
              </p>
            )}
            <div className="px-2 space-y-[1px]">
              {items.map(({ href, label: itemLabel, icon: Icon, exact, badge }) => {
                const active = isActive(href, exact);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={onClose}
                    className={cn(
                      "relative flex items-center gap-2.5 px-3 h-[36px] rounded-[10px] text-[13.5px] font-medium transition-all duration-150 group",
                      active
                        ? "text-indigo-200"
                        : "text-white/38 hover:text-white/75 hover:bg-white/[0.04]"
                    )}
                    style={
                      active
                        ? {
                            background: "rgba(99,102,241,0.11)",
                            border: "1px solid rgba(99,102,241,0.2)",
                          }
                        : { border: "1px solid transparent" }
                    }
                  >
                    {active && (
                      <span
                        className="absolute left-0 inset-y-[6px] w-[3px] rounded-r-full"
                        style={{ background: "#6366f1" }}
                      />
                    )}
                    <Icon
                      className={cn(
                        "w-[15px] h-[15px] shrink-0 transition-colors",
                        active ? "text-indigo-400" : "text-white/25 group-hover:text-white/55"
                      )}
                    />
                    <span className="flex-1">{itemLabel}</span>
                    {badge && (
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold"
                        style={{ background: "rgba(99,102,241,0.2)", color: "#a5b4fc" }}
                      >
                        {badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* ─── User + Logout ─────────────────────────── */}
      <div className="shrink-0" style={{ borderTop: "1px solid rgba(255,255,255,0.055)" }}>
        <div className="px-4 py-3.5 flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-[13px] font-bold select-none"
            style={{
              background: "linear-gradient(135deg, rgba(99,102,241,0.25), rgba(139,92,246,0.25))",
              border: "1px solid rgba(99,102,241,0.28)",
              color: "#a5b4fc",
            }}
          >
            {userInitial}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white/72 text-[12.5px] font-medium truncate leading-tight">
              {user?.email?.split("@")[0] || "—"}
            </p>
            <p className="text-white/28 text-[11px] mt-0.5 leading-tight">Free plan</p>
          </div>
        </div>
        <div className="px-2 pb-3">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 h-9 rounded-[10px] text-[13px] text-white/28 hover:text-white/55 hover:bg-white/[0.04] transition-all group"
            style={{ border: "1px solid transparent" }}
          >
            <LogOut className="w-[15px] h-[15px] shrink-0 group-hover:text-white/40 transition-colors" />
            Sign out
          </button>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      <div className="hidden md:block sticky top-0 h-screen shrink-0">{inner}</div>
      <div
        className={cn(
          "md:hidden fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {inner}
      </div>
    </>
  );
}
