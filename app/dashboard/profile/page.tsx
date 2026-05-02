"use client";

import { useState, useEffect, useRef } from "react";
import { useProfile } from "@/hooks/useProfile";
import { auth } from "@/lib/firebase";
import { uploadProfilePhoto, uploadCoverPhoto } from "@/lib/storage";
import { motion } from "framer-motion";
import { Save, Sparkles, ExternalLink, Camera, Loader2 } from "lucide-react";
import BlockedBanner from "@/components/ui/BlockedBanner";
import Link from "next/link";
import Image from "next/image";

const cls = "w-full px-4 py-3 rounded-xl text-white text-sm placeholder:text-white/20 focus:outline-none transition-colors";
const st = { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" };

function PhotoUpload({
  value,
  uid,
  type,
  onChange,
}: {
  value: string;
  uid: string;
  type: "avatar" | "cover";
  onChange: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setError("Max file size is 5 MB"); return; }
    setError("");
    setUploading(true);
    try {
      const url = type === "avatar"
        ? await uploadProfilePhoto(uid, file)
        : await uploadCoverPhoto(uid, file);
      onChange(url);
    } catch {
      setError("Upload failed. Try again.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  if (type === "cover") {
    return (
      <div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="relative w-full h-28 rounded-xl overflow-hidden flex items-center justify-center transition-opacity hover:opacity-80 disabled:opacity-50"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px dashed rgba(255,255,255,0.12)" }}
        >
          {value ? (
            <>
              <Image src={value} alt="Cover" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-2 text-white text-xs">
                {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
                {uploading ? "Uploading…" : "Change Cover"}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2 text-white/35 text-sm">
              {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
              {uploading ? "Uploading…" : "Upload Cover Photo"}
            </div>
          )}
        </button>
        {error && <p className="text-red-400/80 text-xs mt-1.5">{error}</p>}
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="relative w-16 h-16 rounded-full overflow-hidden flex items-center justify-center shrink-0 transition-opacity hover:opacity-80 disabled:opacity-50"
        style={{ background: "rgba(99,102,241,0.12)", border: "2px solid rgba(99,102,241,0.25)" }}
      >
        {value ? (
          <>
            <Image src={value} alt="Avatar" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              {uploading ? <Loader2 className="w-4 h-4 text-white animate-spin" /> : <Camera className="w-4 h-4 text-white" />}
            </div>
          </>
        ) : (
          uploading ? <Loader2 className="w-5 h-5 text-indigo-400 animate-spin" /> : <Camera className="w-5 h-5 text-indigo-400" />
        )}
      </button>
      <div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="text-indigo-400 hover:text-indigo-300 text-sm transition-colors disabled:opacity-50"
        >
          {uploading ? "Uploading…" : value ? "Change photo" : "Upload photo"}
        </button>
        <p className="text-white/25 text-xs mt-0.5">JPG, PNG or WEBP · Max 5 MB</p>
        {error && <p className="text-red-400/80 text-xs mt-0.5">{error}</p>}
      </div>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  );
}

export default function ProfilePage() {
  const user = auth.currentUser;
  const { profile, loading, error, retry, update } = useProfile(user?.uid);
  const [form, setForm] = useState({
    displayName: "", title: "", bio: "", photoURL: "", coverPhotoUrl: "", location: "",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiJob, setAiJob] = useState("");
  const [aiStyle, setAiStyle] = useState("professional");

  useEffect(() => {
    if (profile) setForm({
      displayName: profile.displayName || "",
      title: profile.title || "",
      bio: profile.bio || "",
      photoURL: profile.photoURL || "",
      coverPhotoUrl: profile.coverPhotoUrl || "",
      location: profile.location || "",
    });
  }, [profile]);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSave = async () => {
    setSaving(true);
    await update({ ...form, updatedAt: Date.now() });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const generateBio = async () => {
    if (!aiJob) return;
    setAiLoading(true);
    try {
      const res = await fetch("/api/ai/bio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ job: aiJob, style: aiStyle }),
      });
      const { bio } = await res.json();
      setForm((f) => ({ ...f, bio }));
    } catch { /* silent */ }
    setAiLoading(false);
  };

  if (loading) return <div className="p-8 text-white/30 text-sm">Loading…</div>;

  return (
    <div className="p-8 max-w-2xl">
      {error && <BlockedBanner errorType={error} onRetry={retry} />}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <div className="flex items-start justify-between mb-1">
          <h1 className="text-2xl font-semibold text-white">Profile Builder</h1>
          {profile?.username && (
            <Link href={`/u/${profile.username}`} target="_blank"
              className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors mt-1">
              <ExternalLink className="w-3.5 h-3.5" /> Preview
            </Link>
          )}
        </div>
        <p className="text-white/35 text-sm">Personal information shown on your public profile.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.08 }} className="mt-8 space-y-5">

        {user?.uid && (
          <div>
            <label className="block text-[11px] text-white/38 mb-2 uppercase tracking-widest font-medium">Profile Photo</label>
            <PhotoUpload
              value={form.photoURL}
              uid={user.uid}
              type="avatar"
              onChange={(url) => setForm((f) => ({ ...f, photoURL: url }))}
            />
          </div>
        )}

        {user?.uid && (
          <div>
            <label className="block text-[11px] text-white/38 mb-2 uppercase tracking-widest font-medium">Cover Photo</label>
            <PhotoUpload
              value={form.coverPhotoUrl}
              uid={user.uid}
              type="cover"
              onChange={(url) => setForm((f) => ({ ...f, coverPhotoUrl: url }))}
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] text-white/38 mb-1.5 uppercase tracking-widest font-medium">Full Name</label>
            <input value={form.displayName} onChange={set("displayName")} className={cls} style={st} placeholder="Alex Johnson" />
          </div>
          <div>
            <label className="block text-[11px] text-white/38 mb-1.5 uppercase tracking-widest font-medium">Job Title</label>
            <input value={form.title} onChange={set("title")} className={cls} style={st} placeholder="Product Designer" />
          </div>
        </div>

        <div>
          <label className="block text-[11px] text-white/38 mb-1.5 uppercase tracking-widest font-medium">Location</label>
          <input value={form.location} onChange={set("location")} className={cls} style={st} placeholder="Dubai, UAE" />
        </div>

        <div>
          <label className="block text-[11px] text-white/38 mb-1.5 uppercase tracking-widest font-medium">Bio</label>
          <textarea value={form.bio} onChange={set("bio")} rows={4} className={`${cls} resize-none`} style={st} placeholder="Tell the world what you do…" />
          <div className="mt-2 flex gap-2">
            <input value={aiJob} onChange={(e) => setAiJob(e.target.value)} placeholder="Enter job title for AI bio"
              className="flex-1 px-3 py-2 rounded-lg text-white/65 text-xs placeholder:text-white/18 focus:outline-none"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }} />
            <select value={aiStyle} onChange={(e) => setAiStyle(e.target.value)}
              className="px-3 py-2 rounded-lg text-white/55 text-xs focus:outline-none"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
              <option value="creative">Creative</option>
            </select>
            <button onClick={generateBio} disabled={aiLoading || !aiJob}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] disabled:opacity-40 transition-colors shrink-0"
              style={{ background: "rgba(99,102,241,0.14)", border: "1px solid rgba(99,102,241,0.22)", color: "#a5b4fc" }}>
              <Sparkles className="w-3 h-3" />
              {aiLoading ? "Generating…" : "AI Generate"}
            </button>
          </div>
        </div>

        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-medium transition-all duration-300 disabled:opacity-50"
          style={{ background: saved ? "#10b981" : "#6366f1" }}>
          <Save className="w-4 h-4" />
          {saved ? "Saved!" : saving ? "Saving…" : "Save Changes"}
        </button>
      </motion.div>
    </div>
  );
}
