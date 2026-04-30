"use client";

import { useState, useEffect } from "react";
import { getUserProfile, updateUserProfile } from "@/lib/firestore";
import type { UserProfile } from "@/types";

export function useProfile(uid: string | undefined) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) { setLoading(false); return; }
    getUserProfile(uid).then((p) => {
      setProfile(p);
      setLoading(false);
    });
  }, [uid]);

  const update = async (data: Partial<UserProfile>) => {
    if (!uid) return;
    await updateUserProfile(uid, data);
    setProfile((prev) => prev ? { ...prev, ...data } : prev);
  };

  return { profile, loading, update };
}
