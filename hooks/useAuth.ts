"use client";

import { useState, useEffect } from "react";
import type { User } from "firebase/auth";
import { isFirebaseBlocked } from "@/lib/firebaseError";

const AUTH_TIMEOUT_MS = 8000;

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<"blocked" | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    let active = true;
    let unsub: (() => void) | undefined;

    setLoading(true);
    setAuthError(null);

    const timeout = setTimeout(() => {
      if (!active) return;
      console.warn("[TikTag] Firebase Auth timeout — possibly blocked by a browser extension");
      setAuthError("blocked");
      setLoading(false);
    }, AUTH_TIMEOUT_MS);

    (async () => {
      try {
        const [{ getAuth, onAuthStateChanged }, { default: app }] = await Promise.all([
          import("firebase/auth"),
          import("@/lib/firebase"),
        ]);
        if (!active) return;
        const firebaseAuth = getAuth(app);
        unsub = onAuthStateChanged(
          firebaseAuth,
          (u) => {
            if (!active) return;
            clearTimeout(timeout);
            setUser(u);
            setLoading(false);
          },
          (err) => {
            if (!active) return;
            clearTimeout(timeout);
            console.error("[TikTag] Auth state error:", err);
            if (isFirebaseBlocked(err)) setAuthError("blocked");
            setLoading(false);
          }
        );
      } catch (err) {
        if (!active) return;
        clearTimeout(timeout);
        console.error("[TikTag] Failed to initialise Firebase Auth:", err);
        setLoading(false);
      }
    })();

    return () => {
      active = false;
      clearTimeout(timeout);
      unsub?.();
    };
  }, [retryKey]);

  const retryAuth = () => setRetryKey((k) => k + 1);

  const loginWithEmail = async (email: string, password: string) => {
    const [{ getAuth, signInWithEmailAndPassword }, { default: app }] = await Promise.all([
      import("firebase/auth"),
      import("@/lib/firebase"),
    ]);
    return signInWithEmailAndPassword(getAuth(app), email, password);
  };

  const registerWithEmail = async (email: string, password: string) => {
    const [{ getAuth, createUserWithEmailAndPassword }, { default: app }] = await Promise.all([
      import("firebase/auth"),
      import("@/lib/firebase"),
    ]);
    return createUserWithEmailAndPassword(getAuth(app), email, password);
  };

  const loginWithGoogle = async () => {
    const [{ getAuth, signInWithPopup, GoogleAuthProvider }, { default: app }] = await Promise.all([
      import("firebase/auth"),
      import("@/lib/firebase"),
    ]);
    return signInWithPopup(getAuth(app), new GoogleAuthProvider());
  };

  const logout = async () => {
    const [{ getAuth, signOut }, { default: app }] = await Promise.all([
      import("firebase/auth"),
      import("@/lib/firebase"),
    ]);
    return signOut(getAuth(app));
  };

  return { user, loading, authError, retryAuth, loginWithEmail, registerWithEmail, loginWithGoogle, logout };
}
