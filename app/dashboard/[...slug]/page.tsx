"use client";

import { use } from "react";
import ComingSoonPage from "@/components/dashboard/ComingSoonPage";
import { routeMetaBySlug } from "@/lib/dashboardConfig";

export default function PlaceholderPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = use(params);
  const key = slug.join("/");
  const meta = routeMetaBySlug[key];

  const title = meta?.title
    ?? key.split("/").pop()?.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    ?? "Coming Soon";

  const description = meta?.description ?? "This feature is coming soon for your experience mode.";

  return (
    <ComingSoonPage
      title={title}
      description={description}
      icon={meta?.icon}
    />
  );
}
