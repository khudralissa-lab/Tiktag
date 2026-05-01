"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import BlockedBanner from "@/components/ui/BlockedBanner";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading, authError, retryAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authError && !user) router.push("/login");
  }, [user, loading, authError, router]);

  if (authError) {
    return <BlockedBanner fullPage onRetry={retryAuth} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;
  return <>{children}</>;
}
