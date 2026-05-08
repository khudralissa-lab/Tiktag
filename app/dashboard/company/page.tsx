"use client";

import { useState, useEffect, useRef } from "react";
import { useProfile } from "@/hooks/useProfile";
import { auth } from "@/lib/firebase";
import { uploadCompanyLogo } from "@/lib/storage";
import { motion } from "framer-motion";
import { Save, Camera, Loader2, RotateCcw } from "lucide-react";
import BlockedBanner from "@/components/ui/BlockedBanner";
import PageSkeleton from "@/components/ui/PageSkeleton";
import Image from "next/image";

const cls = "w-full px-4 py-3 rounded-xl text-white text-sm placeholder:text-white/20 focus:outline-none transition-colors";
const st = { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" };

function LogoUpload({ value, uid, onChange }: { value: string; uid: string; onChange: (url: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [failedFile, setFailedFile] = useState<File | null>(null);

  const doUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) { setUploadError("Only image files are allowed."); return; }
    if (file.size > 5 * 1024 * 1024) { setUploadError("Max file size is 5 MB."); return; }
    setUploadError("");
    setFailedFile(null);
    setUploading(true);
    try {
      const url = await uploadCompanyLogo(uid, file);
      onChange(url);
    } catch {
      setUploadError("Upload failed.");
      setFailedFile(file);
    } finally {
      setUploading(false);
    }
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await doUpload(file);
    e.target.value = "";
  };

  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="relative w-16 h-16 rounded-xl overflow-hidden flex items-center justify-center shrink-0 transition-opacity hover:opacity-80 disabled:opacity-50"
        style={{ background: "rgba(255,255,255,0.05)", border: "2px solid rgba(255,255,255,0.1)" }}
      >
        {value ? (
          <>
            <Image src={value} alt="Company logo" fill className="object-contain p-1" unoptimized />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              {uploading ? <Loader2 className="w-4 h-4 text-white animate-spin" /> : <Camera className="w-4 h-4 text-white" />}
            </div>
          </>
        ) : (
          uploading ? <Loader2 className="w-5 h-5 text-white/40 animate-spin" /> : <Camera className="w-5 h-5 text-white/25" />
        )}
      </button>
      <div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="text-indigo-400 hover:text-indigo-300 text-sm transition-colors disabled:opacity-50"
        >
          {uploading ? "Uploading…" : value ? "Change logo" : "Upload logo"}
        </button>
        <p className="text-white/25 text-xs mt-0.5">JPG, PNG or WEBP · Max 5 MB</p>
        {uploadError && (
          <p className="text-red-400/80 text-xs mt-1.5 flex items-center gap-1.5">
            {uploadError}
            {failedFile && (
              <button
                type="button"
                onClick={() => doUpload(failedFile)}
                className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors"
              >
                <RotateCcw className="w-3 h-3" /> Retry
              </button>
            )}
          </p>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  );
}

const INDUSTRIES = [
  "Technology", "Finance", "Healthcare", "Real Estate", "Education",
  "Retail", "Marketing & Advertising", "Legal", "Consulting", "Media & Entertainment",
  "Construction", "Manufacturing", "Food & Beverage", "Travel & Hospitality", "Other",
];

export default function CompanyPage() {
  const user = auth.currentUser;
  const { profile, loading, error, retry, update } = useProfile(user?.uid);
  const [form, setForm] = useState({
    companyName: "",
    companyLogoUrl: "",
    companyWebsite: "",
    companyIndustry: "",
    companyPhone: "",
    companyEmail: "",
    companyAddress: "",
    companyDescription: "",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (profile) setForm({
      companyName: profile.companyName || "",
      companyLogoUrl: profile.companyLogoUrl || "",
      companyWebsite: profile.companyWebsite || "",
      companyIndustry: profile.companyIndustry || "",
      companyPhone: profile.companyPhone || "",
      companyEmail: profile.companyEmail || "",
      companyAddress: profile.companyAddress || "",
      companyDescription: profile.companyDescription || "",
    });
  }, [profile]);

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSave = async () => {
    setSaving(true);
    await update({ ...form, updatedAt: Date.now() });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  if (loading) return <PageSkeleton rows={6} />;

  return (
    <div className="p-4 md:p-8 max-w-2xl">
      {error && <BlockedBanner errorType={error} onRetry={retry} />}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <h1 className="text-2xl font-semibold text-white mb-1">Company Details</h1>
        <p className="text-white/35 text-sm">Your company information shown on your public profile.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.08 }} className="mt-8 space-y-6">

        {/* Logo upload */}
        <div>
          <label className="block text-[11px] text-white/40 mb-3 font-medium uppercase tracking-widest">Company Logo</label>
          {user?.uid && (
            <LogoUpload
              value={form.companyLogoUrl}
              uid={user.uid}
              onChange={(url) => {
                setForm((f) => ({ ...f, companyLogoUrl: url }));
                update({ companyLogoUrl: url });
              }}
            />
          )}
        </div>

        {/* Company name + website */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] text-white/40 mb-1.5 font-medium uppercase tracking-widest">Company Name</label>
            <input value={form.companyName} onChange={set("companyName")} className={cls} style={st} placeholder="Acme Inc." />
          </div>
          <div>
            <label className="block text-[11px] text-white/40 mb-1.5 font-medium uppercase tracking-widest">Website</label>
            <input value={form.companyWebsite} onChange={set("companyWebsite")} className={cls} style={st} placeholder="https://acmeinc.com" />
          </div>
        </div>

        {/* Industry */}
        <div>
          <label className="block text-[11px] text-white/40 mb-1.5 font-medium uppercase tracking-widest">Industry</label>
          <select value={form.companyIndustry} onChange={set("companyIndustry")} className={cls} style={st}>
            <option value="">Select industry…</option>
            {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>

        {/* Phone + Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] text-white/40 mb-1.5 font-medium uppercase tracking-widest">Company Phone</label>
            <input value={form.companyPhone} onChange={set("companyPhone")} className={cls} style={st} placeholder="+1 (555) 000-0000" />
          </div>
          <div>
            <label className="block text-[11px] text-white/40 mb-1.5 font-medium uppercase tracking-widest">Company Email</label>
            <input value={form.companyEmail} onChange={set("companyEmail")} className={cls} style={st} placeholder="hello@acmeinc.com" type="email" />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-[11px] text-white/40 mb-1.5 font-medium uppercase tracking-widest">Address</label>
          <input value={form.companyAddress} onChange={set("companyAddress")} className={cls} style={st} placeholder="123 Main St, City, Country" />
        </div>

        {/* Description */}
        <div>
          <label className="block text-[11px] text-white/40 mb-1.5 font-medium uppercase tracking-widest">About the Company</label>
          <textarea
            value={form.companyDescription}
            onChange={set("companyDescription")}
            rows={3}
            className={`${cls} resize-none`}
            style={st}
            placeholder="Brief description of what your company does…"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-medium transition-all disabled:opacity-50"
          style={{ background: saved ? "#10b981" : "#6366f1" }}
        >
          <Save className="w-4 h-4" />
          {saved ? "Saved!" : saving ? "Saving…" : "Save Changes"}
        </button>
      </motion.div>
    </div>
  );
}
