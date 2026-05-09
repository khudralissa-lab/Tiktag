"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, User, Link2, LayoutGrid, QrCode, Wifi,
  BarChart2, Sparkles, Palette, Users, CreditCard,
  Settings, X, LogOut, type LucideIcon,
} from "lucide-react";

function NfcWave() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      <path d="M6.8 17.2C5.1 15.5 4 13.4 4 12s1.1-3.5 2.8-5.2" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      <path d="M17.2 6.8C18.9 8.5 20 10.6 20 12s-1.1 3.5-2.8 5.2" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      <path d="M9.5 14.5c-.8-.8-1.5-1.6-1.5-2.5s.7-1.7 1.5-2.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      <path d="M14.5 9.5c.8.8 1.5 1.6 1.5 2.5s-.7 1.7-1.5 2.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
  soon?: boolean;
  matches?: string[];
};

type NavGroup = { label: string; items: NavItem[] };

const NAV: NavGroup[] = [
  {
    label: "Identity",
    items: [
      { href: "/dashboard", label: "Overview", icon: Home, exact: true },
      {
        href: "/dashboard/profile",
        label: "Profile Builder",
        icon: User,
        matches: ["/dashboard/profile", "/dashboard/contact", "/dashboard/company", "/dashboard/social"],
      },
      { href: "/dashboard/links", label: "Links", icon: Link2 },
      { href: "/dashboard/media", label: "Portfolio", icon: LayoutGrid },
    ],
  },
  {
    label: "Hardware",
    items: [
      { href: "/dashboard/qr", label: "QR Studio", icon: QrCode },
      { href: "/dashboard/nfc", label: "NFC Products", icon: Wifi },
    ],
  },
  {
    label: "Intelligence",
    items: [
      { href: "/dashboard/analytics", label: "Analytics", icon: BarChart2 },
      { href: "#", label: "AI Tools", icon: Sparkles, soon: true },
    ],
  },
  {
    label: "Appearance",
    items: [{ href: "/dashboard/theme", label: "Themes", icon: Palette }],
  },
  {
    label: "Business",
    items: [
      { href: "#", label: "Teams", icon: Users, soon: true },
      { href: "#", label: "Billing", icon: CreditCard, soon: true },
    ],
  },
  {
    label: "Account",
    items: [{ href: "/dashboard/settings", label: "Settings", icon: Settings }],
  },
];

function checkActive(item: NavItem, pathname: string): boolean {
  if (item.soon) return false;
  if (item.exact) return pathname === item.href;
  if (item.matches) return item.matches.some((m) => pathname.startsWith(m));
  return item.href !== "#" && (pathname === item.href || pathname.startsWith(item.href + "/"));
}

function SidebarInner({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const router = useRouter();
  const user = auth.currentUser;

  const initial = user?.displayName?.[0]?.toUpperCase() ?? user?.email?.[0]?.toUpperCase() ?? "?";
  const displayName = user?.displayName ?? user?.email?.split("@")[0] ?? "—";

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <div style={{
      width: 252,
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      background: "linear-gradient(180deg, #060612 0%, #050510 100%)",
      borderRight: "1px solid rgba(255,255,255,0.05)",
      boxShadow: "6px 0 40px rgba(0,0,0,0.55)",
      overflow: "hidden",
    }}>
      {/* Logo */}
      <div style={{ padding: "20px 16px 16px", borderBottom: "1px solid rgba(255,255,255,0.04)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/dashboard" onClick={onClose} style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{
              width: 34, height: 34, borderRadius: 10,
              background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 16px rgba(139,92,246,0.38), inset 0 1px 0 rgba(255,255,255,0.14)",
              color: "white", flexShrink: 0,
            }}>
              <NfcWave />
            </div>
            <div>
              <p style={{ color: "rgba(255,255,255,0.92)", fontWeight: 700, fontSize: 14, letterSpacing: "-0.03em", lineHeight: 1.2, margin: 0 }}>TikTag</p>
              <p style={{ color: "rgba(255,255,255,0.24)", fontSize: 9, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", lineHeight: 1, margin: 0 }}>Identity OS</p>
            </div>
          </Link>
          <button
            className="md:hidden"
            onClick={onClose}
            style={{
              width: 28, height: 28, borderRadius: 8,
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "rgba(255,255,255,0.4)", cursor: "pointer",
            }}
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: "auto", padding: "8px 8px", scrollbarWidth: "none" }}>
        {NAV.map((group) => (
          <div key={group.label} style={{ marginBottom: 6 }}>
            <p style={{
              color: "rgba(255,255,255,0.18)", fontSize: 9, fontWeight: 700,
              letterSpacing: "0.14em", textTransform: "uppercase",
              padding: "8px 8px 2px", margin: 0,
            }}>
              {group.label}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {group.items.map((item) => {
                const active = checkActive(item, pathname);
                const Icon = item.icon;

                if (item.soon) {
                  return (
                    <div key={item.label} style={{
                      display: "flex", alignItems: "center", gap: 9,
                      padding: "7px 9px", borderRadius: 9,
                      opacity: 0.38, cursor: "default",
                    }}>
                      <Icon size={15} style={{ color: "rgba(255,255,255,0.4)", flexShrink: 0 }} />
                      <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, fontWeight: 500, flex: 1 }}>{item.label}</span>
                      <span style={{
                        padding: "1px 6px", borderRadius: 20,
                        background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)",
                        color: "rgba(255,255,255,0.2)", fontSize: 8, fontWeight: 600,
                        letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap",
                      }}>Soon</span>
                    </div>
                  );
                }

                return (
                  <Link key={item.href} href={item.href} onClick={onClose} style={{
                    display: "flex", alignItems: "center", gap: 9,
                    padding: "7px 9px", borderRadius: 9,
                    textDecoration: "none", position: "relative",
                    background: active ? "linear-gradient(135deg, rgba(139,92,246,0.13), rgba(99,102,241,0.06))" : "transparent",
                    border: active ? "1px solid rgba(139,92,246,0.16)" : "1px solid transparent",
                    transition: "background 0.15s, border-color 0.15s",
                  }}>
                    {active && (
                      <div style={{
                        position: "absolute", left: -1, top: "22%", height: "56%",
                        width: 2.5, borderRadius: 2,
                        background: "linear-gradient(180deg, #a78bfa, #8b5cf6)",
                        boxShadow: "0 0 8px rgba(139,92,246,0.7)",
                      }} />
                    )}
                    <Icon size={15} style={{
                      color: active ? "rgba(167,139,250,0.9)" : "rgba(255,255,255,0.34)",
                      flexShrink: 0,
                      filter: active ? "drop-shadow(0 0 5px rgba(139,92,246,0.55))" : "none",
                      transition: "all 0.15s",
                    }} />
                    <span style={{
                      color: active ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.45)",
                      fontSize: 13, fontWeight: active ? 600 : 450,
                      letterSpacing: "-0.01em", transition: "color 0.15s",
                    }}>
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User card */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "10px 8px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "2px 2px" }}>
          <div style={{
            width: 34, height: 34, borderRadius: "50%",
            background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, overflow: "hidden",
            boxShadow: "0 4px 12px rgba(139,92,246,0.25)",
          }}>
            {user?.photoURL ? (
              <img src={user.photoURL} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <span style={{ color: "white", fontSize: 12, fontWeight: 700 }}>{initial}</span>
            )}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{
              color: "rgba(255,255,255,0.78)", fontSize: 12, fontWeight: 600,
              letterSpacing: "-0.01em", margin: 0,
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>{displayName}</p>
            <span style={{
              display: "inline-block", marginTop: 2,
              padding: "1px 7px", borderRadius: 20,
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)",
              color: "rgba(255,255,255,0.25)", fontSize: 9, fontWeight: 600,
              letterSpacing: "0.08em", textTransform: "uppercase",
            }}>Free</span>
          </div>
          <button
            onClick={handleLogout}
            title="Sign out"
            style={{
              width: 30, height: 30, borderRadius: 8, cursor: "pointer",
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "rgba(255,255,255,0.26)", transition: "all 0.15s", flexShrink: 0,
            }}
          >
            <LogOut size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Sidebar({ isOpen = false, onClose }: { isOpen?: boolean; onClose?: () => void }) {
  const handleClose = onClose ?? (() => {});
  return (
    <>
      {/* Desktop — sticky */}
      <div className="hidden md:block" style={{ position: "sticky", top: 0, height: "100vh", flexShrink: 0 }}>
        <SidebarInner onClose={() => {}} />
      </div>

      {/* Mobile — slide drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden"
            style={{ position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 50 }}
            initial={{ x: -252 }}
            animate={{ x: 0 }}
            exit={{ x: -252 }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
          >
            <SidebarInner onClose={handleClose} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
