"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Menu, Zap } from "lucide-react";
import Link from "next/link";

const AuthGuard = dynamic(() => import("@/components/auth/AuthGuard"), { ssr: false });
const Sidebar = dynamic(() => import("@/components/dashboard/Sidebar"), { ssr: false });

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthGuard>
      <div className="flex min-h-screen" style={{ background: "#05050a" }}>

        {/* Mobile top bar */}
        <div
          className="md:hidden fixed top-0 inset-x-0 z-50 flex items-center justify-between px-4 h-14 backdrop-blur-xl"
          style={{ background: "rgba(5,5,10,0.88)", borderBottom: "1px solid rgba(255,255,255,0.055)" }}
        >
          <Link href="/dashboard" className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-[7px] flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
            >
              <Zap className="w-3 h-3 text-white" />
            </div>
            <span className="text-white font-bold text-sm tracking-[-0.025em]">TikTag</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.07] transition-colors"
          >
            <Menu className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Mobile backdrop */}
        {sidebarOpen && (
          <div
            className="md:hidden fixed inset-0 z-40 bg-black/65 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 overflow-auto mt-14 md:mt-0 min-h-screen">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
