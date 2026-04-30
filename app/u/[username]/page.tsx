import { notFound } from "next/navigation";
import { getProfileByUsername } from "@/lib/firestore";
import PublicProfileClient from "./PublicProfileClient";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const profile = await getProfileByUsername(username);
  if (!profile) return { title: "Profile not found" };
  return {
    title: `${profile.displayName} — TapID`,
    description: profile.bio || `${profile.displayName}'s digital identity`,
  };
}

export default async function PublicProfilePage({ params }: Props) {
  const { username } = await params;
  const profile = await getProfileByUsername(username);
  if (!profile) notFound();
  return <PublicProfileClient profile={profile} />;
}
