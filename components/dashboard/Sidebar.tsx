"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, User, Phone, Building2, Share2, Link2,
  QrCode, Nfc, Palette, BarChart2, Settings, LogOut, Zap, X,
} from "lucide-react";

type NavItem = { href: string; label: string; icon: React.ComponentType<{ className?: string }>; exact?: boolean };
type Section = { label: string | null; items: NavItem[] };

const sections: Section[] = [
  {
    label: null,
    items: [{ href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true }],
  },
  {
    label: "Profile",
    items: [
      { href: "/dashboard/profile", label: "Profile Builder", icon: User },
      { href: "/dashboard/contact", label: "Contact Details", icon: Phone },
      { href: "/dashboard/company", label: "Company Details", icon: Building2 },
      { href: "/dashboard/social", label: "Social Links", icon: Share2 },
    ],
  },
  {
    label: "Content",
    items: [{ href: "/dashboard/links", label: "Custom Links", icon: Link2 }],
  },
  {
    label: "NFC & QR",
    items: [
      { href: "/dashboard/qr", label: "QR Studio", icon: QrCode },
      { href: "/dashboard/nfc", label: "NFC Setup", icon: Nfc },
    ],
  },
  {
    label: "Appearance",
    items: [{ href: "/dashboard/theme", label: "Theme", icon: Palette }],
  },
  {
    label: "Data",
    items: [{ href: "/dashboard/analytics", label: "Analytics", icon: BarChart2 }],
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

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const inner = (
    <aside
      className="w-60 shrink-0 flex flex-col h-screen overflow-y-auto"
      style={{ background: "#080808", borderRight: "1px solid rgba(255,255,255,0.05)" }}
    >
      {/* Logo + mobile close */}
      <div className="px-5 py-5 flex items-center justify-between border-b border-white/[0.05]">
        <Link href="/dashboard" className="flex items-center gap-2.5" onClick={onClose}>
          <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-white font-semibold text-sm tracking-tight">tiktag</span>
        </Link>
        <button
          onClick={onClose}
          className="md:hidden p-1.5 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/[0.05] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3">
        {sections.map(({ label, items }) => (
          <div key={label ?? "main"} className="mb-0.5">
            {label && (
              <p className="px-5 pt-3 pb-1 text-[10px] font-semibold text-white/[0.18] uppercase tracking-widest">
                {label}
              </p>
            )}
            {items.map(({ href, label: itemLabel, icon: Icon, exact }) => {
              const active = isActive(href, exact);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-2.5 mx-2 px-3 py-2 rounded-lg text-[13px] transition-all duration-150 group",
                    active
                      ? "text-indigo-300"
                      : "text-white/35 hover:text-white/70 hover:bg-white/[0.04]"
                  )}
                  style={active ? {
                    background: "rgba(99,102,241,0.1)",
                    border: "1px solid rgba(99,102,241,0.2)",
                  } : { border: "1px solid transparent" }}
                >
                  <Icon className={cn("w-3.5 h-3.5 shrink-0", active ? "text-indigo-400" : "text-white/25 group-hover:text-white/50")} />
                  {itemLabel}
                  {active && <span className="ml-auto w-1 h-1 rounded-full bg-indigo-400 shrink-0" />}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Sign out */}
      <div className="p-2 border-t border-white/[0.05]">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-white/28 hover:text-white/55 hover:bg-white/[0.04] transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign out
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop: always visible sticky sidebar */}
      <div className="hidden md:block sticky top-0 h-screen shrink-0">
        {inner}
      </div>

      {/* Mobile: slide-in overlay */}
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
