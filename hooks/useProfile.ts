"use client";

import { useState, useEffect } from "react";
import { getUserProfile, updateUserProfile } from "@/lib/firestore";
import { isFirebaseBlocked } from "@/lib/firebaseError";
import type { UserProfile } from "@/types";

export function useProfile(uid: string | undefined) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<"blocked" | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    if (!uid) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    getUserProfile(uid)
      .then((p) => {
        setProfile(p);
        setLoading(false);
      })
      .catch((err) => {
        console.error("[TikTag] Firestore profile fetch failed:", err);
        if (isFirebaseBlocked(err)) setError("blocked");
        setLoading(false);
      });
  }, [uid, retryKey]);

  const retry = () => setRetryKey((k) => k + 1);

  const update = async (data: Partial<UserProfile>) => {
    if (!uid) return;
    try {
      await updateUserProfile(uid, data);
      setProfile((prev) => (prev ? { ...prev, ...data } : prev));
    } catch (err) {
      console.error("[TikTag] Firestore profile update failed:", err);
      if (isFirebaseBlocked(err)) setError("blocked");
      throw err;
    }
  };

  return { profile, loading, error, retry, update };
}
