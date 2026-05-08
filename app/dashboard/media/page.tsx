"use client";

import { useState, useRef, useCallback } from "react";
import { useProfile } from "@/hooks/useProfile";
import { auth } from "@/lib/firebase";
import { uploadMediaItem } from "@/lib/storage";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload, Trash2, Star, Play, X, Images, Loader2, AlertCircle,
} from "lucide-react";
import NextImage from "next/image";
import BlockedBanner from "@/components/ui/BlockedBanner";
import PageSkeleton from "@/components/ui/PageSkeleton";
import type { MediaItem } from "@/types";

const spr = { type: "spring" as const, stiffness: 260, damping: 22 };
const MAX_ITEMS = 12;
const MAX_SIZE_MB = 50;

function generateId() {
  return `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

export default function MediaPage() {
  const user = auth.currentUser;
  const { profile, loading, error, retry, update } = useProfile(user?.uid);
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [dragging, setDragging] = useState(false);
  const [saving, setSaving] = useState<string | null>(null);

  const media: MediaItem[] = profile?.media ?? [];

  const doUpload = async (files: FileList | File[]) => {
    const arr = Array.from(files);
    if (!arr.length || !user?.uid) return;

    const remaining = MAX_ITEMS - media.length;
    if (remaining <= 0) {
      setUploadError(`Maximum ${MAX_ITEMS} media items allowed.`);
      return;
    }

    const toUpload = arr.slice(0, remaining);
    setUploadError("");
    setUploading(true);

    const newItems: MediaItem[] = [];
    for (let i = 0; i < toUpload.length; i++) {
      const file = toUpload[i];
      const isVideo = file.type.startsWith("video/");
      const isImage = file.type.startsWith("image/");
      if (!isImage && !isVideo) continue;
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        setUploadError(`"${file.name}" exceeds ${MAX_SIZE_MB} MB.`);
        continue;
      }
      try {
        const { url, thumbnailUrl } = await uploadMediaItem(user.uid, file, media.length + i);
        newItems.push({
          id: generateId(),
          type: isVideo ? "video" : "image",
          url,
          thumbnailUrl,
          featured: false,
          order: media.length + i,
        });
      } catch (err) {
        setUploadError(err instanceof Error ? err.message : "Upload failed.");
      }
    }

    if (newItems.length > 0) {
      await update({ media: [...media, ...newItems], updatedAt: Date.now() });
    }
    setUploading(false);
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) doUpload(e.target.files);
    e.target.value = "";
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files) doUpload(e.dataTransfer.files);
  }, [media, user]);

  const handleDelete = async (id: string) => {
    setSaving(id);
    await update({ media: media.filter((m) => m.id !== id), updatedAt: Date.now() });
    setSaving(null);
  };

  const handleToggleFeatured = async (id: string) => {
    setSaving(id);
    await update({
      media: media.map((m) => m.id === id ? { ...m, featured: !m.featured } : m),
      updatedAt: Date.now(),
    });
    setSaving(null);
  };

  const handleCaption = async (id: string, caption: string) => {
    await update({
      media: media.map((m) => m.id === id ? { ...m, caption } : m),
      updatedAt: Date.now(),
    });
  };

  if (loading) return <PageSkeleton rows={4} />;

  const canUploadMore = media.length < MAX_ITEMS;

  return (
    <div className="p-5 md:p-8 max-w-4xl">
      {error && <BlockedBanner errorType={error} onRetry={retry} />}

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={spr} className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div
            className="w-8 h-8 rounded-[10px] flex items-center justify-center"
            style={{ background: "rgba(99,102,241,0.18)", border: "1px solid rgba(99,102,241,0.25)" }}
          >
            <Images className="w-4 h-4 text-indigo-400" />
          </div>
          <h1 className="text-[22px] font-bold text-white tracking-[-0.025em]">Media Showcase</h1>
        </div>
        <p className="text-white/35 text-sm">
          Upload photos and videos — displayed as a portfolio on your public profile.
        </p>
      </motion.div>

      {/* Upload zone */}
      {canUploadMore && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spr, delay: 0.06 }}
          className="mb-6"
        >
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => !uploading && inputRef.current?.click()}
            className="relative flex flex-col items-center justify-center gap-3 rounded-[20px] cursor-pointer transition-all select-none"
            style={{
              padding: "40px 24px",
              background: dragging ? "rgba(99,102,241,0.08)" : "rgba(255,255,255,0.02)",
              border: `1.5px dashed ${dragging ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.10)"}`,
            }}
          >
            {uploading ? (
              <>
                <Loader2 className="w-7 h-7 text-indigo-400 animate-spin" />
                <p className="text-white/50 text-sm">Uploading…</p>
              </>
            ) : (
              <>
                <div
                  className="w-11 h-11 rounded-[14px] flex items-center justify-center"
                  style={{ background: "rgba(99,102,241,0.14)", border: "1px solid rgba(99,102,241,0.22)" }}
                >
                  <Upload className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="text-center">
                  <p className="text-white/65 text-sm font-medium">
                    Drop files here or <span className="text-indigo-400">browse</span>
                  </p>
                  <p className="text-white/22 text-xs mt-1">
                    JPG, PNG, GIF, WEBP, MP4, MOV · Max {MAX_SIZE_MB} MB · Up to {MAX_ITEMS} items
                  </p>
                </div>
                <p className="text-white/20 text-xs">
                  {media.length}/{MAX_ITEMS} items used
                </p>
              </>
            )}
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp,video/mp4,video/quicktime"
            multiple
            className="hidden"
            onChange={handleFiles}
          />
          {uploadError && (
            <div className="flex items-center gap-2 mt-2.5 text-red-400/80 text-xs">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {uploadError}
            </div>
          )}
        </motion.div>
      )}

      {/* Media grid */}
      {media.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...spr, delay: 0.12 }}
          className="flex flex-col items-center justify-center py-20 gap-3"
        >
          <Images className="w-8 h-8 text-white/10" />
          <p className="text-white/22 text-sm">No media yet. Upload something to get started.</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <AnimatePresence>
            {media.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.92, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.88, y: -8 }}
                transition={{ ...spr, delay: i * 0.04 }}
                className="rounded-[18px] overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: item.featured
                    ? "1px solid rgba(251,191,36,0.35)"
                    : "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {/* Thumbnail */}
                <div className="relative aspect-square bg-black/40">
                  {item.type === "video" ? (
                    <>
                      {item.thumbnailUrl ? (
                        <NextImage
                          src={item.thumbnailUrl}
                          alt="Video thumbnail"
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center"
                          style={{ background: "rgba(255,255,255,0.03)" }}>
                          <Play className="w-8 h-8 text-white/20" />
                        </div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center"
                          style={{ background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.18)" }}>
                          <Play className="w-4 h-4 text-white ml-0.5" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <NextImage
                      src={item.url}
                      alt={item.caption || "Media item"}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  )}

                  {/* Action buttons overlay */}
                  <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
                    <button
                      onClick={() => handleDelete(item.id)}
                      disabled={saving === item.id}
                      className="w-7 h-7 rounded-lg flex items-center justify-center transition-all disabled:opacity-50"
                      style={{ background: "rgba(0,0,0,0.65)", border: "1px solid rgba(255,255,255,0.12)" }}
                    >
                      {saving === item.id ? (
                        <Loader2 className="w-3.5 h-3.5 text-white/60 animate-spin" />
                      ) : (
                        <Trash2 className="w-3.5 h-3.5 text-red-400/80" />
                      )}
                    </button>
                    <button
                      onClick={() => handleToggleFeatured(item.id)}
                      disabled={saving === item.id}
                      className="w-7 h-7 rounded-lg flex items-center justify-center transition-all disabled:opacity-50"
                      style={{ background: "rgba(0,0,0,0.65)", border: "1px solid rgba(255,255,255,0.12)" }}
                      title={item.featured ? "Unfeature" : "Mark as featured"}
                    >
                      <Star
                        className="w-3.5 h-3.5"
                        style={{
                          color: item.featured ? "#fbbf24" : "rgba(255,255,255,0.38)",
                          fill: item.featured ? "#fbbf24" : "none",
                        }}
                      />
                    </button>
                  </div>

                  {/* Type badge */}
                  <div className="absolute bottom-2 left-2">
                    <span
                      className="text-[9.5px] font-bold uppercase tracking-[0.1em] px-1.5 py-0.5 rounded-[5px]"
                      style={{ background: "rgba(0,0,0,0.65)", color: "rgba(255,255,255,0.50)" }}
                    >
                      {item.type}
                    </span>
                  </div>
                  {item.featured && (
                    <div className="absolute bottom-2 right-2">
                      <span
                        className="text-[9.5px] font-bold uppercase tracking-[0.1em] px-1.5 py-0.5 rounded-[5px]"
                        style={{ background: "rgba(251,191,36,0.25)", color: "#fbbf24" }}
                      >
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Caption */}
                <div className="p-3">
                  <input
                    defaultValue={item.caption || ""}
                    onBlur={(e) => handleCaption(item.id, e.target.value)}
                    placeholder="Add caption…"
                    className="w-full bg-transparent text-white/55 text-xs placeholder:text-white/15 focus:outline-none focus:text-white/75 transition-colors"
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {!canUploadMore && (
        <p className="mt-4 text-white/22 text-xs text-center">
          Maximum {MAX_ITEMS} items reached. Delete items to upload more.
        </p>
      )}
    </div>
  );
}
