"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, User, Phone, Building2, Share2, Link2,
  QrCode, Nfc, Palette, BarChart2, Settings, LogOut, Zap,
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
      { href: "/dashboard/qr", label: "QR Code", icon: QrCode },
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

export default function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const router = useRouter();

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <aside
      className="w-56 shrink-0 border-r border-white/[0.05] flex flex-col h-screen sticky top-0 overflow-y-auto"
      style={{ background: "#080808" }}
    >
      <div className="px-5 py-5 border-b border-white/[0.05]">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-white font-semibold text-sm tracking-tight">tiktag</span>
        </Link>
      </div>

      <nav className="flex-1 py-3">
        {sections.map(({ label, items }) => (
          <div key={label ?? "main"} className="mb-0.5">
            {label && (
              <p className="px-5 pt-3 pb-1 text-[10px] font-semibold text-white/18 uppercase tracking-widest">
                {label}
              </p>
            )}
            {items.map(({ href, label: itemLabel, icon: Icon, exact }) => {
              const active = isActive(href, exact);
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center gap-2.5 mx-2 px-3 py-2 rounded-lg text-[13px] transition-all duration-150",
                    active
                      ? "bg-white/[0.07] text-white"
                      : "text-white/35 hover:text-white/65 hover:bg-white/[0.04]"
                  )}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  {itemLabel}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

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
}
