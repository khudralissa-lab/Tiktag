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
            whileTap={{ scale: 0.983 }}
            whileHover={{ x: 3, scale: 1.002 }}
            onClick={() => onTrack(link.label, href)}
            className="w-full flex items-center gap-4 rounded-[18px] text-left group"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spr, delay: i * 0.05 }}
            style={{
              padding: "16px 18px",
              background: theme.buttonBg,
              border: `1px solid ${theme.border}`,
              boxShadow: "0 2px 14px rgba(0,0,0,0.10)",
            }}
          >
            <div
              className="w-10 h-10 rounded-[13px] flex items-center justify-center shrink-0"
              style={{
                background: `${theme.accent}14`,
                border: `1px solid ${theme.accent}22`,
              }}
            >
              {linkIcon(link.type, theme.accent)}
            </div>
            <span
              className="flex-1 font-semibold"
              style={{ fontSize: 15, color: theme.text, letterSpacing: "-0.01em" }}
            >
              {link.label}
            </span>
            <ChevronRight
              className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1"
              style={{ color: `${theme.subtext}35` }}
            />
          </motion.button>
        );
      })}
    </div>
  );
}
