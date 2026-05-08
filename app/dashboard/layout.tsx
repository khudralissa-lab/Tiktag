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
      <div className="flex min-h-screen bg-black">

        {/* Mobile top bar */}
        <div
          className="md:hidden fixed top-0 inset-x-0 z-50 flex items-center justify-between px-4 h-14 border-b border-white/[0.05]"
          style={{ background: "#080808" }}
        >
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-indigo-500 flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" />
            </div>
            <span className="text-white font-semibold text-sm">tiktag</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Backdrop */}
        {sidebarOpen && (
          <div
            className="md:hidden fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 overflow-auto mt-14 md:mt-0">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
