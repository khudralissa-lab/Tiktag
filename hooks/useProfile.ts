"use client";

import { useState, useEffect } from "react";
import { getUserProfile, updateUserProfile, createUserProfile } from "@/lib/firestore";
import { isFirebaseBlocked } from "@/lib/firebaseError";
import { auth } from "@/lib/firebase";
import type { UserProfile } from "@/types";

const PROFILE_TIMEOUT_MS = 25000;

export function useProfile(uid: string | undefined) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<"blocked" | "slow" | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    if (!uid) { setLoading(false); return; }
    setLoading(true);
    setError(null);

    console.log("[TikTag] Auth uid:", uid);
    console.log("[TikTag] Profile path: users/" + uid);

    let settled = false;

    const timeout = setTimeout(() => {
      if (!settled) {
        console.warn("[TikTag] Firestore profile fetch timed out after 25s — users/" + uid);
        settled = true;
        setError("slow");
        setLoading(false);
      }
    }, PROFILE_TIMEOUT_MS);

    getUserProfile(uid)
      .then(async (p) => {
        if (!settled) {
          clearTimeout(timeout);
          settled = true;

          if (p === null) {
            console.log("[TikTag] No profile document at users/" + uid + " — creating default");
            const email = auth.currentUser?.email ?? "";
            const defaults: Partial<UserProfile> = {
              uid,
              email,
              username: "",
              displayName: "",
              title: "",
              bio: "",
              photoURL: "",
              phone: "",
              whatsapp: "",
            };
            try {
              await createUserProfile(uid, defaults);
              setProfile({
                ...defaults,
                plan: "free",
                createdAt: Date.now(),
                links: [],
                accentColor: "#6366f1",
              } as UserProfile);
            } catch (createErr) {
              console.error("[TikTag] Failed to create default profile at users/" + uid + ":", createErr);
              setProfile(null);
            }
          } else {
            setProfile(p);
          }
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!settled) {
          clearTimeout(timeout);
          settled = true;
          console.error("[TikTag] Firestore error for users/" + uid + ":", err);
          if (isFirebaseBlocked(err)) {
            setError("blocked");
          }
          setLoading(false);
        }
      });

    return () => { clearTimeout(timeout); settled = true; };
  }, [uid, retryKey]);

  const retry = () => setRetryKey((k) => k + 1);

  const update = async (data: Partial<UserProfile>) => {
    if (!uid) return;
    try {
      await updateUserProfile(uid, data);
      setProfile((prev) => (prev ? { ...prev, ...data } : prev));
    } catch (err) {
      console.error("[TikTag] Firestore profile update failed for users/" + uid + ":", err);
      if (isFirebaseBlocked(err)) setError("blocked");
      throw err;
    }
  };

  return { profile, loading, error, retry, update };
}
