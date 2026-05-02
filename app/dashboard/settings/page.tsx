"use client";

import { useProfile } from "@/hooks/useProfile";
import { auth } from "@/lib/firebase";
import { isUsernameAvailable, updateUsername } from "@/lib/firestore";
import { motion } from "framer-motion";
import { ExternalLink, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import BlockedBanner from "@/components/ui/BlockedBanner";
import { useState, useEffect, useRef } from "react";

function validateUsername(value: string): string | null {
  if (!value) return "Username is required";
  if (value.length < 3) return "At least 3 characters";
  if (value.length > 30) return "Max 30 characters";
  if (!/^[a-z0-9_.-]+$/.test(value)) return "Only lowercase letters, numbers, _, . and -";
  return null;
}

export default function SettingsPage() {
  const user = auth.currentUser;
  const { profile, loading, error, retry } = useProfile(user?.uid);

  const [username, setUsername] = useState("");
  const [checking, setChecking] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved" | "error">("idle");
  const [saveError, setSaveError] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (profile?.username) setUsername(profile.username);
  }, [profile]);

  const handleUsernameChange = (value: string) => {
    const lower = value.toLowerCase();
    setUsername(lower);
    setAvailable(null);
    setSaveStatus("idle");

    if (debounceRef.current) clearTimeout(debounceRef.current);

    const validationError = validateUsername(lower);
    if (validationError || lower === profile?.username) return;

    setChecking(true);
    debounceRef.current = setTimeout(async () => {
      const ok = await isUsernameAvailable(lower);
      setChecking(false);
      setAvailable(ok);
    }, 500);
  };

  const handleSave = async () => {
    if (!user?.uid || !profile) return;
    const validationError = validateUsername(username);
    if (validationError) return;

    const isNew = username !== profile.username;
    if (isNew && available === false) return;

    setSaving(true);
    setSaveStatus("idle");
    try {
      await updateUsername(user.uid, profile.username ?? "", username);
      profile.username = username;
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2500);
    } catch (err) {
      console.error("[TikTag] Username save failed:", err);
      setSaveError("Failed to save. Try again.");
      setSaveStatus("error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-white/30 text-sm">Loading…</div>;

  const validationError = validateUsername(username);
  const isChanged = username !== (profile?.username ?? "");
  const canSave = !validationError && !saving && (
    !isChanged || available === true
  );

  return (
    <div className="p-8 max-w-2xl">
      {error && <BlockedBanner errorType={error} onRetry={retry} />}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-semibold text-white">Settings</h1>
        <p className="text-white/40 text-sm mt-1">Account information</p>
      </motion.div>

      <div className="mt-8 space-y-3">
        <div className="bg-white/3 border border-white/8 rounded-2xl p-4">
          <p className="text-white/40 text-xs mb-1">Email</p>
          <p className="text-white text-sm">{user?.email}</p>
        </div>

        <div className="bg-white/3 border border-white/8 rounded-2xl p-4">
          <p className="text-white/40 text-xs mb-2">Username</p>
          <div className="flex items-center gap-2">
            <span className="text-white/30 text-sm">@</span>
            <input
              value={username}
              onChange={(e) => handleUsernameChange(e.target.value)}
              placeholder="your-username"
              className="flex-1 bg-transparent text-white text-sm focus:outline-none placeholder:text-white/20"
            />
            {checking && <Loader2 className="w-4 h-4 text-white/30 animate-spin shrink-0" />}
            {!checking && isChanged && !validationError && available === true && (
              <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
            )}
            {!checking && isChanged && !validationError && available === false && (
              <XCircle className="w-4 h-4 text-red-400 shrink-0" />
            )}
          </div>
          {validationError && username && (
            <p className="text-red-400/80 text-xs mt-1.5">{validationError}</p>
          )}
          {!checking && isChanged && !validationError && available === false && (
            <p className="text-red-400/80 text-xs mt-1.5">Username already taken</p>
          )}
          {!checking && isChanged && !validationError && available === true && (
            <p className="text-green-400/70 text-xs mt-1.5">Username available</p>
          )}
        </div>

        <div className="bg-white/3 border border-white/8 rounded-2xl p-4">
          <p className="text-white/40 text-xs mb-1">Plan</p>
          <p className="text-white text-sm capitalize">{profile?.plan ?? "free"}</p>
        </div>

        {profile?.username && (
          <div className="bg-white/3 border border-white/8 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-white/40 text-xs mb-1">Public Profile</p>
              <p className="text-indigo-300 text-sm">tiktag.io/u/{profile.username}</p>
            </div>
            <a href={`/u/${profile.username}`} target="_blank" className="text-white/30 hover:text-white/60 transition-colors">
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}

        <div className="pt-1">
          <button
            onClick={handleSave}
            disabled={!canSave}
            className="px-6 py-2.5 rounded-xl text-white text-sm font-medium transition-all disabled:opacity-40"
            style={{ background: saveStatus === "saved" ? "#10b981" : "#6366f1" }}
          >
            {saving ? "Saving…" : saveStatus === "saved" ? "Saved!" : "Save Changes"}
          </button>
          {saveStatus === "error" && (
            <p className="text-red-400/80 text-xs mt-2">{saveError}</p>
          )}
        </div>
      </div>
    </div>
  );
}
