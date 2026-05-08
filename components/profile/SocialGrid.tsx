"use client";

import { motion } from "framer-motion";
import { PlatformSvg, PLATFORM_COLORS, PLATFORM_LABELS, spr } from "./shared";
import { trackButtonClick } from "@/lib/analytics";
import type { Theme } from "@/lib/themes";

interface Social {
  platform: string;
  url: string;
}

interface SocialGridProps {
  uid: string;
  socials: Social[];
  theme: Theme;
}

export default function SocialGrid({ uid, socials, theme }: SocialGridProps) {
  if (socials.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-14 gap-2">
        <p className="text-sm" style={{ color: `${theme.subtext}40` }}>No social links yet.</p>
      </div>
    );
  }

  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: socials.length <= 2
          ? `repeat(${socials.length}, 1fr)`
          : socials.length <= 4
          ? "repeat(4, 1fr)"
          : "repeat(4, 1fr)",
        gap: "24px 16px",
      }}
    >
      {socials.map(({ platform, url }, i) => {
        const brandColor = PLATFORM_COLORS[platform] || theme.accent;
        const label = PLATFORM_LABELS[platform] || platform;

        return (
          <motion.div
            key={platform}
            className="flex flex-col items-center gap-2.5"
            initial={{ opacity: 0, y: 18, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ ...spr, delay: 0.04 + i * 0.06 }}
          >
            <motion.a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackButtonClick(uid, platform)}
              whileHover={{ scale: 1.18, y: -6 }}
              whileTap={{ scale: 0.88 }}
              className="flex items-center justify-center rounded-full"
              style={{
                width: 76, height: 76,
                background: `${brandColor}18`,
                border: `1.5px solid ${brandColor}38`,
                color: brandColor,
                boxShadow: `0 6px 28px ${brandColor}35, 0 2px 8px ${brandColor}18`,
              }}
              aria-label={label}
            >
              <PlatformSvg platform={platform} size={28} />
            </motion.a>
            <span
              className="font-semibold text-center"
              style={{ fontSize: 11.5, color: `${theme.subtext}75`, letterSpacing: "0.02em" }}
            >
              {label}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
