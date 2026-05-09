"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/75 backdrop-blur-2xl border-b border-white/[0.05]"
          : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-[60px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div
            className="w-[30px] h-[30px] rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
              boxShadow: "0 4px 12px rgba(139,92,246,0.35)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M11 7c0 2.76-2.24 5-5 5" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M13 7C13 3.69 10.31 1 7 1" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M9 7c0 1.1-.9 2-2 2" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
              <circle cx="7" cy="7" r="1.2" fill="white" />
            </svg>
          </div>
          <span
            className="font-semibold tracking-tight"
            style={{ fontSize: 15, color: "rgba(255,255,255,0.92)", letterSpacing: "-0.01em" }}
          >
            tiktag
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Collections", href: "#collections" },
            { label: "Studio", href: "#configurator" },
            { label: "Pricing", href: "#pricing" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-sm transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.4)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
            >
              {label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm transition-colors duration-200"
            style={{ color: "rgba(255,255,255,0.38)" }}
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 rounded-xl text-white text-sm font-medium transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
              boxShadow: "0 4px 16px rgba(139,92,246,0.25)",
            }}
          >
            Get started
          </Link>
        </div>

        <button
          className="md:hidden transition-colors"
          style={{ color: "rgba(255,255,255,0.45)" }}
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div
          className="md:hidden border-b px-6 pb-6 pt-2"
          style={{
            background: "rgba(0,0,0,0.96)",
            backdropFilter: "blur(24px)",
            borderColor: "rgba(255,255,255,0.05)",
          }}
        >
          <div className="space-y-1 mb-4">
            {[
              { label: "Collections", href: "#collections" },
              { label: "Studio", href: "#configurator" },
              { label: "Pricing", href: "#pricing" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="block text-sm py-2.5 transition-colors"
                style={{ color: "rgba(255,255,255,0.45)" }}
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-2 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <Link href="/login" className="text-sm text-center py-2.5" style={{ color: "rgba(255,255,255,0.35)" }}>
              Sign in
            </Link>
            <Link
              href="/register"
              className="py-3 rounded-xl text-white text-sm font-semibold text-center"
              style={{ background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)" }}
              onClick={() => setOpen(false)}
            >
              Get started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
