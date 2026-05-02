export const runtime = "edge";

import PublicProfileClient from "./PublicProfileClient";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  return {
    title: `@${username} — TikTag`,
    description: `View ${username}'s digital profile on TikTag`,
  };
}

export default async function PublicProfilePage({ params }: Props) {
  const { username } = await params;
  return <PublicProfileClient username={username} />;
}
