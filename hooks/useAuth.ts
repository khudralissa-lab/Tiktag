"use client";

import { useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { isFirebaseBlocked } from "@/lib/firebaseError";

const AUTH_TIMEOUT_MS = 8000;

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<"blocked" | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    setLoading(true);
    setAuthError(null);

    // If onAuthStateChanged never fires, assume Firebase is blocked
    const timeout = setTimeout(() => {
      console.warn("[TikTag] Firebase Auth timeout — possibly blocked by a browser extension");
      setAuthError("blocked");
      setLoading(false);
    }, AUTH_TIMEOUT_MS);

    const unsub = onAuthStateChanged(
      auth,
      (u) => {
        clearTimeout(timeout);
        setUser(u);
        setLoading(false);
      },
      (err) => {
        clearTimeout(timeout);
        console.error("[TikTag] Auth state error:", err);
        if (isFirebaseBlocked(err)) setAuthError("blocked");
        setLoading(false);
      }
    );

    return () => {
      clearTimeout(timeout);
      unsub();
    };
  }, [retryKey]);

  const retryAuth = () => setRetryKey((k) => k + 1);

  const loginWithEmail = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);

  const registerWithEmail = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password);

  const loginWithGoogle = () =>
    signInWithPopup(auth, new GoogleAuthProvider());

  const logout = () => signOut(auth);

  return { user, loading, authError, retryAuth, loginWithEmail, registerWithEmail, loginWithGoogle, logout };
}
