"use client";

import React, { createContext, useContext } from "react";
import { auth } from "@/lib/firebase";
import { useProfile } from "@/hooks/useProfile";
import type { UserProfile } from "@/types";
import type { UserType } from "@/lib/dashboardConfig";

type DashboardContextValue = {
  profile: UserProfile | null;
  loading: boolean;
  error: "blocked" | "slow" | null;
  retry: () => void;
  update: (data: Partial<UserProfile>) => Promise<void>;
  userType: UserType;
};

const DashboardContext = createContext<DashboardContextValue | null>(null);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const uid = auth.currentUser?.uid;
  const { profile, loading, error, retry, update } = useProfile(uid);
  const userType: UserType = (profile?.userType as UserType) ?? "personal";

  return (
    <DashboardContext.Provider value={{ profile, loading, error, retry, update, userType }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard(): DashboardContextValue {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error("useDashboard must be used within DashboardProvider");
  return ctx;
}
