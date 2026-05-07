"use client";

import dynamic from "next/dynamic";

const AuthGuard = dynamic(() => import("@/components/auth/AuthGuard"), { ssr: false });
const Sidebar = dynamic(() => import("@/components/dashboard/Sidebar"), { ssr: false });

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-black">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
