"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Globe, Building2, ArrowUpRight } from "lucide-react";
import { SectionLabel, spr } from "./shared";
import { trackButtonClick } from "@/lib/analytics";
import type { UserProfile } from "@/types";
import type { Theme } from "@/lib/themes";

interface AboutSectionProps {
  profile: UserProfile;
  theme: Theme;
}

export default function AboutSection({ profile, theme }: AboutSectionProps) {
  const hasBio = !!profile.bio;
  const hasLocation = !!profile.location;
  const hasCompany = !!profile.companyName;
  const hasWebsite = !!profile.website;
  const isEmpty = !hasBio && !hasLocation && !hasCompany && !hasWebsite;

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center py-14 gap-2">
        <p className="text-sm" style={{ color: `${theme.subtext}40` }}>No about info yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Bio */}
      {hasBio && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spr, delay: 0.04 }}
        >
          <SectionLabel theme={theme}>About</SectionLabel>
          <p
            className="leading-relaxed"
            style={{ fontSize: 15, lineHeight: 1.85, color: theme.subtext, letterSpacing: "0.005em" }}
          >
            {profile.bio}
          </p>
        </motion.div>
      )}

      {/* Location */}
      {hasLocation && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spr, delay: 0.08 }}
          className="flex items-center gap-2.5"
          style={{ color: theme.subtext }}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: `${theme.accent}14`, border: `1px solid ${theme.accent}22` }}
          >
            <MapPin className="w-4 h-4" style={{ color: theme.accent }} />
          </div>
          <span style={{ fontSize: 14 }}>{profile.location}</span>
        </motion.div>
      )}

      {/* Website */}
      {hasWebsite && (
        <motion.a
          href={profile.website}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackButtonClick(profile.uid, "Website")}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spr, delay: 0.1 }}
          whileHover={{ x: 3 }}
          className="flex items-center gap-2.5 transition-opacity hover:opacity-75"
          style={{ color: theme.accent, textDecoration: "none" }}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: `${theme.accent}14`, border: `1px solid ${theme.accent}22` }}
          >
            <Globe className="w-4 h-4" style={{ color: theme.accent }} />
          </div>
          <span style={{ fontSize: 14, fontWeight: 500 }}>
            {profile.website!.replace(/^https?:\/\//, "")}
          </span>
          <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
        </motion.a>
      )}

      {/* Company card */}
      {hasCompany && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spr, delay: 0.12 }}
        >
          <SectionLabel theme={theme}>Company</SectionLabel>
          <motion.div
            whileHover={{ scale: 1.003, y: -2 }}
            transition={{ type: "spring", stiffness: 380, damping: 24 }}
            className="rounded-[22px] overflow-hidden"
            style={{
              background: `linear-gradient(150deg, ${theme.accent}0a 0%, transparent 60%), ${theme.surface}`,
              border: `1px solid ${theme.border}`,
              boxShadow: `0 8px 32px rgba(0,0,0,0.18), 0 1px 0 rgba(255,255,255,0.03) inset`,
            }}
          >
            {/* Accent edge */}
            <div style={{
              height: 2,
              background: `linear-gradient(90deg, transparent 5%, ${theme.accent}45 40%, ${theme.accent}65 50%, ${theme.accent}45 60%, transparent 95%)`,
            }} />

            <div className="p-5">
              <div className="flex items-start gap-4">
                {/* Logo */}
                <div
                  className="rounded-[14px] overflow-hidden flex items-center justify-center shrink-0"
                  style={{
                    width: 56, height: 56,
                    background: theme.buttonBg,
                    border: `1px solid ${theme.border}`,
                    boxShadow: `0 2px 14px rgba(0,0,0,0.22)`,
                  }}
                >
                  {profile.companyLogoUrl ? (
                    <Image
                      src={profile.companyLogoUrl}
                      alt={profile.companyName!}
                      width={56}
                      height={56}
                      className="w-full h-full object-contain p-2"
                      unoptimized
                    />
                  ) : (
                    <Building2 className="w-5 h-5" style={{ color: `${theme.subtext}55` }} />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p
                    className="font-bold leading-tight"
                    style={{ fontSize: 17, color: theme.text, letterSpacing: "-0.02em" }}
                  >
                    {profile.companyName}
                  </p>
                  {profile.companyIndustry && (
                    <span
                      className="inline-flex items-center mt-1.5 rounded-full px-2 py-0.5"
                      style={{
                        fontSize: 10.5, fontWeight: 600,
                        background: `${theme.accent}16`,
                        border: `1px solid ${theme.accent}28`,
                        color: theme.accent,
                        letterSpacing: "0.03em",
                      }}
                    >
                      {profile.companyIndustry}
                    </span>
                  )}
                </div>
              </div>

              {profile.companyDescription && (
                <p
                  className="mt-4 leading-relaxed"
                  style={{ fontSize: 13.5, color: theme.subtext, lineHeight: 1.8 }}
                >
                  {profile.companyDescription}
                </p>
              )}
            </div>

            {profile.companyWebsite && (
              <motion.a
                href={profile.companyWebsite}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackButtonClick(profile.uid, "Company Website")}
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
                className="flex items-center justify-between px-5 py-3.5 transition-opacity hover:opacity-70"
                style={{
                  borderTop: `1px solid ${theme.border}`,
                  color: theme.accent,
                  fontSize: 13,
                  fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                <span>Visit Website</span>
                <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              </motion.a>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
