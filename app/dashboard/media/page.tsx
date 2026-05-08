"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useProfile } from "@/hooks/useProfile";
import { auth } from "@/lib/firebase";
import { uploadMediaItem } from "@/lib/storage";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import {
  Upload, Trash2, Star, Play, Images, Loader2, AlertCircle, RotateCcw, GripVertical,
} from "lucide-react";
import NextImage from "next/image";
import BlockedBanner from "@/components/ui/BlockedBanner";
import PageSkeleton from "@/components/ui/PageSkeleton";
import type { MediaItem } from "@/types";

const spr = { type: "spring" as const, stiffness: 280, damping: 26 };
const MAX_ITEMS = 12;
const MAX_SIZE_MB = 50;

function generateId() {
  return `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

export default function MediaPage() {
  const user = auth.currentUser;
  const { profile, loading, error, retry, update } = useProfile(user?.uid);
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading,    setUploading]    = useState(false);
  const [uploadError,  setUploadError]  = useState("");
  const [dragging,     setDragging]     = useState(false);
  const [saving,       setSaving]       = useState<string | null>(null);
  const lastFilesRef   = useRef<File[] | null>(null);

  // Local ordered list — driven by profile.media, but reorder is applied locally first
  const [orderedMedia, setOrderedMedia] = useState<MediaItem[]>([]);
  const orderedRef     = useRef<MediaItem[]>([]);
  const saveTimer      = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setOrderedMedia(profile?.media ?? []);
    orderedRef.current = profile?.media ?? [];
  }, [profile?.media]);

  const persistOrder = (items: MediaItem[]) => {
    const updated = items.map((item, i) => ({ ...item, order: i }));
    update({ media: updated, updatedAt: Date.now() });
  };

  const handleReorder = (newOrder: MediaItem[]) => {
    setOrderedMedia(newOrder);
    orderedRef.current = newOrder;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => persistOrder(orderedRef.current), 800);
  };

  // ── Upload ──────────────────────────────────────────────────────────────
  const doUpload = async (files: FileList | File[]) => {
    const arr = Array.from(files);
    if (!arr.length || !user?.uid) return;
    const current = orderedRef.current;
    const remaining = MAX_ITEMS - current.length;
    if (remaining <= 0) { setUploadError(`Maximum ${MAX_ITEMS} media items allowed.`); return; }

    const toUpload = arr.slice(0, remaining);
    setUploadError("");
    lastFilesRef.current = toUpload;
    setUploading(true);

    try {
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
        const { url, thumbnailUrl } = await uploadMediaItem(user.uid, file, current.length + i);
        const item: MediaItem = {
          id: generateId(), type: isVideo ? "video" : "image", url,
          caption: "", featured: false, order: current.length + i, createdAt: Date.now(),
        };
        if (thumbnailUrl) item.thumbnailUrl = thumbnailUrl;
        newItems.push(item);
      }
      if (newItems.length > 0) {
        await update({ media: [...current, ...newItems], updatedAt: Date.now() });
      }
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleFiles  = (e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.files) doUpload(e.target.files); e.target.value = ""; };
  const handleRetry  = () => { if (lastFilesRef.current?.length) doUpload(lastFilesRef.current); };
  const handleDrop   = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    if (e.dataTransfer.files) doUpload(e.dataTransfer.files);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleDelete = async (id: string) => {
    setSaving(id);
    try {
      const next = orderedRef.current.filter((m) => m.id !== id).map((m, i) => ({ ...m, order: i }));
      await update({ media: next, updatedAt: Date.now() });
    } finally { setSaving(null); }
  };

  const handleToggleFeatured = async (id: string) => {
    setSaving(id);
    try {
      await update({
        media: orderedRef.current.map((m) => m.id === id ? { ...m, featured: !m.featured } : m),
        updatedAt: Date.now(),
      });
    } finally { setSaving(null); }
  };

  const handleCaption = async (id: string, caption: string) => {
    await update({
      media: orderedRef.current.map((m) => m.id === id ? { ...m, caption } : m),
      updatedAt: Date.now(),
    });
  };

  if (loading) return <PageSkeleton rows={4} />;

  const canUploadMore = orderedMedia.length < MAX_ITEMS;

  return (
    <div className="p-5 md:p-8 max-w-3xl">
      {error && <BlockedBanner errorType={error} onRetry={retry} />}

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={spr} className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-[10px] flex items-center justify-center"
                style={{ background: "rgba(99,102,241,0.18)", border: "1px solid rgba(99,102,241,0.25)" }}>
                <Images className="w-4 h-4 text-indigo-400" />
              </div>
              <h1 className="text-[22px] font-bold text-white tracking-[-0.025em]">Media Showcase</h1>
            </div>
            <p className="text-white/35 text-sm">Upload and arrange photos and videos for your public portfolio.</p>
          </div>
          {orderedMedia.length > 1 && (
            <div className="flex items-center gap-1.5 text-white/22 text-xs shrink-0">
              <GripVertical className="w-3.5 h-3.5" />
              Drag to reorder
            </div>
          )}
        </div>
      </motion.div>

      {/* Upload zone */}
      {canUploadMore && (
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spr, delay: 0.06 }} className="mb-6">
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => !uploading && inputRef.current?.click()}
            className="relative flex flex-col items-center justify-center gap-3 rounded-[20px] cursor-pointer transition-all select-none"
            style={{
              padding: "36px 24px",
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
                <div className="w-11 h-11 rounded-[14px] flex items-center justify-center"
                  style={{ background: "rgba(99,102,241,0.14)", border: "1px solid rgba(99,102,241,0.22)" }}>
                  <Upload className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="text-center">
                  <p className="text-white/65 text-sm font-medium">
                    Drop files or <span className="text-indigo-400">browse</span>
                  </p>
                  <p className="text-white/22 text-xs mt-1">
                    JPG, PNG, GIF, WEBP, MP4, MOV · Max {MAX_SIZE_MB} MB · {orderedMedia.length}/{MAX_ITEMS} items
                  </p>
                </div>
              </>
            )}
          </div>

          <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/gif,image/webp,video/mp4,video/quicktime"
            multiple className="hidden" onChange={handleFiles} />

          <AnimatePresence>
            {uploadError && (
              <motion.div
                initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2.5 mt-3 px-4 py-3 rounded-[14px]"
                style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.18)" }}
              >
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span className="text-red-400/90 text-sm flex-1">{uploadError}</span>
                <button onClick={handleRetry} disabled={uploading}
                  className="flex items-center gap-1 text-indigo-400 text-xs font-medium hover:text-indigo-300 transition-colors disabled:opacity-40 shrink-0">
                  <RotateCcw className="w-3 h-3" /> Retry
                </button>
                <button onClick={() => setUploadError("")}
                  className="text-white/25 hover:text-white/50 text-xs transition-colors shrink-0 ml-1">
                  Dismiss
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Media list — drag to reorder */}
      {orderedMedia.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ...spr, delay: 0.12 }}
          className="flex flex-col items-center justify-center py-20 gap-3">
          <Images className="w-8 h-8 text-white/10" />
          <p className="text-white/22 text-sm">No media yet. Upload something to get started.</p>
        </motion.div>
      ) : (
        <Reorder.Group
          as="div"
          axis="y"
          values={orderedMedia}
          onReorder={handleReorder}
          className="space-y-2"
        >
          <AnimatePresence>
            {orderedMedia.map((item, i) => (
              <Reorder.Item
                as="div"
                key={item.id}
                value={item}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -24, scale: 0.95 }}
                transition={{ ...spr, delay: i * 0.03 }}
                className="rounded-[16px] overflow-hidden cursor-default"
                style={{
                  background: item.featured ? "rgba(251,191,36,0.05)" : "rgba(255,255,255,0.025)",
                  border: item.featured ? "1px solid rgba(251,191,36,0.25)" : "1px solid rgba(255,255,255,0.07)",
                  listStyle: "none",
                }}
                whileDrag={{
                  scale: 1.02,
                  boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
                  zIndex: 10,
                }}
              >
                <div className="flex items-center gap-3 p-3">
                  {/* Drag handle */}
                  <div
                    className="shrink-0 cursor-grab active:cursor-grabbing transition-colors"
                    style={{ color: "rgba(255,255,255,0.18)", touchAction: "none" }}
                  >
                    <GripVertical className="w-4 h-4" />
                  </div>

                  {/* Thumbnail */}
                  <div className="relative w-[60px] h-[60px] rounded-[10px] overflow-hidden shrink-0"
                    style={{ background: "rgba(0,0,0,0.35)" }}>
                    {item.type === "video" ? (
                      <>
                        {item.thumbnailUrl ? (
                          <NextImage src={item.thumbnailUrl} alt="Video" fill className="object-cover" unoptimized />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Play className="w-5 h-5 text-white/20" />
                          </div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                          <Play className="w-3 h-3 text-white/80" />
                        </div>
                      </>
                    ) : (
                      <NextImage src={item.url} alt={item.caption || "Media"} fill className="object-cover" unoptimized />
                    )}
                  </div>

                  {/* Caption + meta */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className="text-[9px] font-bold uppercase tracking-[0.1em] px-1.5 py-[3px] rounded-[4px]"
                        style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.32)" }}>
                        {item.type}
                      </span>
                      {item.featured && (
                        <span className="text-[9px] font-bold uppercase tracking-[0.1em] px-1.5 py-[3px] rounded-[4px]"
                          style={{ background: "rgba(251,191,36,0.14)", color: "#fbbf24" }}>
                          Featured
                        </span>
                      )}
                    </div>
                    <input
                      defaultValue={item.caption || ""}
                      onBlur={(e) => handleCaption(item.id, e.target.value)}
                      placeholder="Add caption…"
                      className="w-full bg-transparent text-white/55 text-xs placeholder:text-white/16 focus:outline-none focus:text-white/80 transition-colors"
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleToggleFeatured(item.id)}
                      disabled={saving === item.id}
                      className="w-8 h-8 rounded-[10px] flex items-center justify-center transition-all disabled:opacity-50 hover:scale-110"
                      style={{
                        background: item.featured ? "rgba(251,191,36,0.14)" : "rgba(255,255,255,0.05)",
                        border: `1px solid ${item.featured ? "rgba(251,191,36,0.3)" : "rgba(255,255,255,0.08)"}`,
                      }}
                      title={item.featured ? "Unfeature" : "Mark as featured"}
                    >
                      <Star className="w-3.5 h-3.5" style={{ color: item.featured ? "#fbbf24" : "rgba(255,255,255,0.35)", fill: item.featured ? "#fbbf24" : "none" }} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      disabled={saving === item.id}
                      className="w-8 h-8 rounded-[10px] flex items-center justify-center transition-all disabled:opacity-50 hover:scale-110"
                      style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.14)" }}
                    >
                      {saving === item.id
                        ? <Loader2 className="w-3.5 h-3.5 text-white/40 animate-spin" />
                        : <Trash2 className="w-3.5 h-3.5 text-red-400/70" />
                      }
                    </button>
                  </div>
                </div>
              </Reorder.Item>
            ))}
          </AnimatePresence>
        </Reorder.Group>
      )}

      {!canUploadMore && (
        <p className="mt-4 text-white/22 text-xs text-center">
          Maximum {MAX_ITEMS} items reached. Delete items to upload more.
        </p>
      )}
    </div>
  );
}
