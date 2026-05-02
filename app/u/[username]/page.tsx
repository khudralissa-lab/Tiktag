export const runtime = "edge";

import { notFound } from "next/navigation";
import { getProfileByUsernameRest } from "@/lib/firestoreRest";
import PublicProfileClient from "./PublicProfileClient";
import type { Metadata } from "next";
import type { UserProfile } from "@/types";

interface Props {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const profile = await getProfileByUsernameRest(username) as UserProfile | null;
  if (!profile) return { title: "Profile not found" };
  return {
    title: `${profile.displayName} — TikTag`,
    description: profile.bio || `${profile.displayName}'s digital identity`,
  };
}

export default async function PublicProfilePage({ params }: Props) {
  const { username } = await params;
  const profile = await getProfileByUsernameRest(username) as UserProfile | null;
  if (!profile) notFound();
  return <PublicProfileClient profile={profile!} />;
}
