"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode } from "lucide-react";
import { getTheme } from "@/lib/themes";
import { trackProfileView, trackButtonClick } from "@/lib/analytics";
import { generateVCard, downloadVCard } from "@/lib/utils";
import { tabVariants, AmbientOrb, GrainOverlay } from "@/components/profile/shared";
import ProfileSkeleton from "@/components/profile/ProfileSkeleton";
import ProfileHero from "@/components/profile/ProfileHero";
import TabNavigation, { type Tab } from "@/components/profile/TabNavigation";
import AboutSection from "@/components/profile/AboutSection";
import SocialGrid from "@/components/profile/SocialGrid";
import PortfolioGrid from "@/components/profile/PortfolioGrid";
import LinksSection from "@/components/profile/LinksSection";
import ContactActions from "@/components/profile/ContactActions";
import type { UserProfile } from "@/types";

// ─── Tab definition ───────────────────────────────────────────────────────────

const ALL_TABS: Tab[] = [
  { id: "about",     label: "About"     },
  { id: "socials",   label: "Socials"   },
  { id: "portfolio", label: "Portfolio" },
  { id: "links",     label: "Links"     },
  { id: "contact",   label: "Contact"   },
];

const TAB_ORDER = ALL_TABS.map((t) => t.id);

// ─── Not found screen ─────────────────────────────────────────────────────────

function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center"
      style={{ background: "#050505" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="flex flex-col items-center gap-4"
      >
        <div
          className="w-20 h-20 rounded-[28px] flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <QrCode className="w-9 h-9" style={{ color: "rgba(255,255,255,0.18)" }} />
        </div>
        <p className="text-white text-xl font-semibold tracking-tight">Profile not found</p>
        <p className="text-sm max-w-[260px] leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
          This link may be inactive or the username has changed.
        </p>
      </motion.div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function PublicProfileClient({
  username,
  profile: initialProfile,
}: {
  username?: string;
  profile?: UserProfile;
}) {
  const [profile, setProfile] = useState<UserProfile | null>(initialProfile ?? null);
  const [notFound, setNotFound] = useState(false);
  const [activeTab, setActiveTab] = useState("about");
  const dirRef = useRef(0);

  // Fetch profile if not server-provided
  useEffect(() => {
    if (profile || !username) return;
    import("@/lib/firestore").then(({ getProfileByUsername }) =>
      getProfileByUsername(username)
        .then((p) => { if (p) setProfile(p as UserProfile); else setNotFound(true); })
        .catch(() => setNotFound(true))
    );
  }, [username, profile]);

  // Track view once uid is known
  const profileUid = profile?.uid;
  useEffect(() => {
    if (!profileUid) return;
    trackProfileView(profileUid);
  }, [profileUid]);

  // ─── Derived data (memoised to avoid recalc on tab switches) ───
  const { theme, profileUrl, allSocials, enabledLinks, media, visibleTabs } = useMemo(() => {
    if (!profile) return { theme: getTheme(), profileUrl: "", allSocials: [], enabledLinks: [], media: [], visibleTabs: [] };

    const theme = getTheme(profile.theme);
    const profileUrl =
      typeof window !== "undefined"
        ? window.location.href
        : `https://tiktag.pages.dev/u/${profile.username}`;

    const socialEntries = (["linkedin", "instagram", "facebook", "xTwitter", "tiktok", "youtube"] as const)
      .map((key) => ({ platform: key as string, url: profile[key] ?? "" }))
      .filter((s) => !!s.url);
    const legacySocials = (profile.socials || []).filter(
      (s) => !socialEntries.find((e) => e.platform === s.platform.toLowerCase())
    );
    const allSocials = [
      ...socialEntries,
      ...legacySocials.map((s) => ({ platform: s.platform.toLowerCase(), url: s.url })),
    ];

    const enabledLinks = (profile.links || []).filter((l) => l.enabled !== false);
    const media = profile.media ?? [];

    const visibleTabs = ALL_TABS.filter((t) => {
      if (t.id === "socials")   return allSocials.length > 0;
      if (t.id === "portfolio") return media.length > 0;
      if (t.id === "links")     return enabledLinks.length > 0;
      return true; // about + contact always visible
    });

    return { theme, profileUrl, allSocials, enabledLinks, media, visibleTabs };
  }, [profile]);

  // ─── Stable callbacks ──────────────────────────────────────────
  const handleTabChange = (newTab: string) => {
    const oldIdx = TAB_ORDER.indexOf(activeTab);
    const newIdx = TAB_ORDER.indexOf(newTab);
    dirRef.current = newIdx > oldIdx ? 1 : -1;
    setActiveTab(newTab);
  };

  const handleSaveContact = () => {
    if (!profile) return;
    trackButtonClick(profile.uid, "Save Contact");
    downloadVCard(
      generateVCard({
        displayName: profile.displayName,
        title: profile.title,
        email: profile.email,
        phone: profile.phone,
        whatsapp: profile.whatsapp,
        website: profile.website || profile.companyWebsite,
        companyName: profile.companyName,
        location: profile.location,
      }),
      profile.displayName
    );
  };

  const handleShare = () => {
    if (!profile) return;
    trackButtonClick(profile.uid, "Share");
    if (navigator.share) {
      navigator.share({ title: profile.displayName, url: profileUrl });
    } else {
      navigator.clipboard.writeText(profileUrl);
    }
  };

  const handleLinkTrack = (label: string, href: string) => {
    if (!profile) return;
    trackButtonClick(profile.uid, label);
    window.location.href = href;
  };

  // ─── Guard renders ──────────────────────────────────────────────
  if (notFound) return <NotFound />;
  if (!profile) return <ProfileSkeleton />;

  // Ensure activeTab is still in visibleTabs (may shift after data loads)
  const safeTab = visibleTabs.find((t) => t.id === activeTab)
    ? activeTab
    : visibleTabs[0]?.id ?? "about";

  return (
    <div className="relative min-h-screen" style={{ background: theme.background }}>
      {/* ── Cinematic atmospheric background (fixed, full viewport) ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <AmbientOrb
          color={`${theme.accent}16`}
          x="-8%" y="-12%"
          w={640} h={560}
          duration={18}
          blurAmount={100}
        />
        <AmbientOrb
          color={`${theme.accent}0c`}
          x="42%" y="48%"
          w={560} h={480}
          duration={22}
          delay={6}
          blurAmount={100}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 110% 55% at 50% 0%, ${theme.accent}08 0%, transparent 68%)`,
          }}
        />
        <GrainOverlay opacity={0.025} />
      </div>

      <div className="relative z-10 mx-auto w-full" style={{ maxWidth: 460 }}>
        <ProfileHero
          profile={profile}
          theme={theme}
          onSaveContact={handleSaveContact}
          onShare={handleShare}
          onTabChange={handleTabChange}
        />

        <TabNavigation
          tabs={visibleTabs}
          activeTab={safeTab}
          onChange={handleTabChange}
          theme={theme}
        />

        <div className="px-4 pt-5 pb-20">
          <AnimatePresence mode="wait" custom={dirRef.current}>
            <motion.div
              key={safeTab}
              custom={dirRef.current}
              variants={tabVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
            >
              {safeTab === "about" && (
                <AboutSection profile={profile} theme={theme} />
              )}
              {safeTab === "socials" && (
                <SocialGrid uid={profile.uid} socials={allSocials} theme={theme} />
              )}
              {safeTab === "portfolio" && (
                <PortfolioGrid media={media} theme={theme} />
              )}
              {safeTab === "links" && (
                <LinksSection links={enabledLinks} theme={theme} onTrack={handleLinkTrack} />
              )}
              {safeTab === "contact" && (
                <ContactActions
                  profile={profile}
                  theme={theme}
                  profileUrl={profileUrl}
                  onSaveContact={handleSaveContact}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <p
          className="text-center pb-8"
          style={{ fontSize: 10.5, color: `${theme.subtext}22` }}
        >
          Powered by <span style={{ color: theme.accent, opacity: 0.4 }}>TikTag</span>
        </p>
      </div>
    </div>
  );
}
