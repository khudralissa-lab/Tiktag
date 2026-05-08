"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ChevronLeft, ChevronRight, Images } from "lucide-react";
import { spr } from "./shared";
import type { MediaItem } from "@/types";
import type { Theme } from "@/lib/themes";

interface PortfolioGridProps {
  media: MediaItem[];
  theme: Theme;
}

export default function PortfolioGrid({ media, theme }: PortfolioGridProps) {
  const [modal, setModal] = useState<{ index: number } | null>(null);

  if (media.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-14 gap-3">
        <Images className="w-7 h-7" style={{ color: `${theme.subtext}25` }} />
        <p className="text-sm" style={{ color: `${theme.subtext}40` }}>No portfolio items yet.</p>
      </div>
    );
  }

  // featured first, rest in order
  const ordered = [
    ...media.filter((m) => m.featured),
    ...media.filter((m) => !m.featured),
  ];

  const current = modal !== null ? ordered[modal.index] : null;

  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        {ordered.map((item, i) => (
          <motion.button
            key={item.id}
            onClick={() => setModal({ index: i })}
            whileHover={{ scale: 1.06, y: -5 }}
            whileTap={{ scale: 0.97 }}
            className="relative overflow-hidden rounded-[18px] aspect-square"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...spr, delay: i * 0.055 }}
            style={{
              background: `${theme.accent}10`,
              border: `1px solid ${theme.border}`,
              boxShadow: "0 4px 24px rgba(0,0,0,0.20)",
            }}
          >
            {item.type === "video" ? (
              <>
                {item.thumbnailUrl ? (
                  <Image src={item.thumbnailUrl} alt={item.caption || "Video"} fill
                    className="object-cover" unoptimized />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center"
                    style={{ background: `${theme.accent}10` }}>
                    <Play className="w-8 h-8" style={{ color: `${theme.accent}55` }} />
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.2)" }}>
                    <Play className="w-4 h-4 text-white ml-0.5" />
                  </div>
                </div>
              </>
            ) : (
              <Image src={item.url} alt={item.caption || "Media"} fill
                className="object-cover" unoptimized />
            )}

            {item.featured && (
              <div className="absolute top-2 left-2 w-5 h-5 rounded-full flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.55)" }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="#fbbf24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
            )}

            {item.caption && (
              <div className="absolute inset-x-0 bottom-0 px-2.5 pb-2.5 pt-8"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.70) 0%, transparent 100%)" }}>
                <p className="text-white text-[11px] font-medium truncate">{item.caption}</p>
              </div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Fullscreen modal */}
      <AnimatePresence>
        {modal !== null && current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.93)", backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)" }}
            onClick={() => setModal(null)}
          >
            {/* Cinematic center depth glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(255,255,255,0.025) 0%, transparent 70%)" }}
            />
            {/* Close */}
            <button
              className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center z-10"
              style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.14)" }}
              onClick={() => setModal(null)}
            >
              <X className="w-4 h-4 text-white/75" />
            </button>

            {/* Prev */}
            {modal.index > 0 && (
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center z-10"
                style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.14)" }}
                onClick={(e) => { e.stopPropagation(); setModal((m) => m && ({ index: m.index - 1 })); }}
              >
                <ChevronLeft className="w-4 h-4 text-white/75" />
              </button>
            )}

            {/* Next */}
            {modal.index < ordered.length - 1 && (
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center z-10"
                style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.14)" }}
                onClick={(e) => { e.stopPropagation(); setModal((m) => m && ({ index: m.index + 1 })); }}
              >
                <ChevronRight className="w-4 h-4 text-white/75" />
              </button>
            )}

            <motion.div
              key={modal.index}
              initial={{ opacity: 0, scale: 0.88, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: -8 }}
              transition={{ type: "spring", stiffness: 360, damping: 30 }}
              className="flex flex-col items-center gap-3 max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              {current.type === "video" ? (
                <video
                  src={current.url}
                  controls
                  autoPlay
                  className="max-w-full max-h-[75vh] rounded-[18px]"
                  style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.7)" }}
                />
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={current.url}
                  alt={current.caption || "Media"}
                  className="block max-w-[90vw] max-h-[75vh] object-contain rounded-[18px]"
                  style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.7)" }}
                />
              )}
              {current.caption && (
                <p className="text-white/50 text-sm text-center px-4">{current.caption}</p>
              )}
              <p className="text-white/22 text-xs">{modal.index + 1} / {ordered.length}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
