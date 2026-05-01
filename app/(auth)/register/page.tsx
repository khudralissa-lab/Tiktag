"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { createUserProfile, isUsernameAvailable } from "@/lib/firestore";
import { isFirebaseBlocked } from "@/lib/firebaseError";
import BlockedBanner from "@/components/ui/BlockedBanner";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const { registerWithEmail, loginWithGoogle } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState<"account" | "username">("account");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [uid, setUid] = useState("");
  const [error, setError] = useState("");
  const [blocked, setBlocked] = useState(false);
  const [loading, setLoading] = useState(false);

  if (blocked) {
    return <BlockedBanner fullPage onRetry={() => setBlocked(false)} />;
  }

  const handleAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const cred = await registerWithEmail(email, password);
      setUid(cred.user.uid);
      setStep("username");
    } catch (err: unknown) {
      console.error("[TikTag] Register failed:", err);
      if (isFirebaseBlocked(err)) {
        setBlocked(true);
      } else {
        const msg = err instanceof Error ? err.message : "";
        setError(msg.includes("email-already-in-use") ? "Email already in use." : "Registration failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUsername = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const clean = username.toLowerCase().replace(/[^a-z0-9_]/g, "");
    if (clean.length < 3) { setError("Username must be at least 3 characters."); setLoading(false); return; }
    try {
      const available = await isUsernameAvailable(clean);
      if (!available) { setError("Username taken, try another."); setLoading(false); return; }
      await createUserProfile(uid, {
        uid,
        email,
        username: clean,
        displayName: name,
        title: "",
        bio: "",
        photoURL: "",
        phone: "",
        whatsapp: "",
      });
      router.push("/dashboard");
    } catch (err: unknown) {
      console.error("[TikTag] Profile creation failed:", err);
      if (isFirebaseBlocked(err)) {
        setBlocked(true);
      } else {
        setError("Failed to save profile.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 mb-4">
            <span className="text-2xl">⚡</span>
          </div>
          <h1 className="text-2xl font-semibold text-white">Create account</h1>
          <p className="text-sm text-white/40 mt-1">
            {step === "account" ? "Get started with TapID" : "Choose your unique link"}
          </p>
        </div>

        {step === "account" ? (
          <form onSubmit={handleAccount} className="space-y-3">
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-indigo-500/60 transition-colors text-sm"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-indigo-500/60 transition-colors text-sm"
              required
            />
            <input
              type="password"
              placeholder="Password (min. 8 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-indigo-500/60 transition-colors text-sm"
              required
            />
            {error && <p className="text-red-400 text-xs">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 rounded-xl text-white text-sm font-medium transition-colors"
            >
              {loading ? "Creating…" : "Continue"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleUsername} className="space-y-3">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm">tapid.com/u/</span>
              <input
                type="text"
                placeholder="yourname"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase())}
                className="w-full pl-28 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-indigo-500/60 transition-colors text-sm"
                required
              />
            </div>
            {error && <p className="text-red-400 text-xs">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 rounded-xl text-white text-sm font-medium transition-colors"
            >
              {loading ? "Saving…" : "Claim my link →"}
            </button>
          </form>
        )}

        <p className="text-center text-white/30 text-xs mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-400 hover:text-indigo-300">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
