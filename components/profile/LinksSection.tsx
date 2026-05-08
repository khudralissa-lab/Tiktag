"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle, Mail, Link2, ChevronRight } from "lucide-react";
import { getLinkHref, spr } from "./shared";
import type { CustomLink } from "@/types";
import type { Theme } from "@/lib/themes";

interface LinksSectionProps {
  links: CustomLink[];
  theme: Theme;
  onTrack: (label: string, href: string) => void;
}

function linkIcon(type: CustomLink["type"], accentColor: string) {
  const cls = "w-[18px] h-[18px]";
  switch (type) {
    case "call":     return <Phone         className={cls} style={{ color: accentColor }} />;
    case "whatsapp": return <MessageCircle className={cls} style={{ color: "#25d366"   }} />;
    case "email":    return <Mail          className={cls} style={{ color: accentColor }} />;
    default:         return <Link2         className={cls} style={{ color: accentColor }} />;
  }
}

export default function LinksSection({ links, theme, onTrack }: LinksSectionProps) {
  if (links.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-14 gap-2">
        <p className="text-sm" style={{ color: `${theme.subtext}40` }}>No links added yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      {links.map((link, i) => {
        const href = getLinkHref(link);
        return (
          <motion.button
            key={link.id}
            whileTap={{ scale: 0.98 }}
            whileHover={{
              x: 5,
              scale: 1.008,
              boxShadow: `inset 3px 0 0 ${theme.accent}55, 0 8px 36px ${theme.accent}20, 0 2px 14px rgba(0,0,0,0.18)`,
            }}
            onClick={() => onTrack(link.label, href)}
            className="relative w-full flex items-center gap-4 rounded-[18px] text-left overflow-hidden"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spr, delay: i * 0.05 }}
            style={{
              padding: "16px 18px",
              background: `linear-gradient(145deg, ${theme.accent}0c 0%, ${theme.surface}d8 50%, ${theme.background}e8 100%)`,
              border: `1px solid ${theme.accent}22`,
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              boxShadow: `inset 3px 0 0 rgba(0,0,0,0), 0 2px 14px rgba(0,0,0,0.10), 0 0 0 rgba(0,0,0,0)`,
            }}
          >
            {/* Metallic top edge */}
            <div
              className="absolute top-0 inset-x-0 pointer-events-none"
              style={{
                height: 1,
                background: `linear-gradient(90deg, transparent 5%, ${theme.accent}40 35%, rgba(255,255,255,0.22) 50%, ${theme.accent}40 65%, transparent 95%)`,
              }}
            />
            <motion.div
              whileHover={{ scale: 1.12 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className="w-10 h-10 rounded-[13px] flex items-center justify-center shrink-0"
              style={{
                background: `${theme.accent}18`,
                border: `1px solid ${theme.accent}32`,
                boxShadow: `0 2px 12px ${theme.accent}20`,
              }}
            >
              {linkIcon(link.type, theme.accent)}
            </motion.div>
            <span
              className="flex-1 font-semibold"
              style={{ fontSize: 15, color: theme.text, letterSpacing: "-0.01em" }}
            >
              {link.label}
            </span>
            <ChevronRight
              className="w-4 h-4 shrink-0"
              style={{ color: `${theme.subtext}35` }}
            />
          </motion.button>
        );
      })}
    </div>
  );
}
