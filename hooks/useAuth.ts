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

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  const loginWithEmail = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);

  const registerWithEmail = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password);

  const loginWithGoogle = () =>
    signInWithPopup(auth, new GoogleAuthProvider());

  const logout = () => signOut(auth);

  return { user, loading, loginWithEmail, registerWithEmail, loginWithGoogle, logout };
}
