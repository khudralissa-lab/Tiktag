export function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export function generateVCard(profile: {
  displayName: string;
  title?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  website?: string;
  companyName?: string;
  location?: string;
}): string {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${profile.displayName}`,
    profile.title ? `TITLE:${profile.title}` : "",
    profile.companyName ? `ORG:${profile.companyName}` : "",
    profile.email ? `EMAIL:${profile.email}` : "",
    profile.phone ? `TEL;TYPE=CELL:${profile.phone}` : "",
    profile.whatsapp && profile.whatsapp !== profile.phone
      ? `TEL;TYPE=WORK:${profile.whatsapp}`
      : "",
    profile.website ? `URL:${profile.website}` : "",
    profile.location ? `ADR:;;${profile.location};;;;` : "",
    "END:VCARD",
  ];
  return lines.filter(Boolean).join("\n");
}

export function downloadVCard(vcard: string, name: string) {
  const blob = new Blob([vcard], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${name.replace(/\s+/g, "-")}.vcf`;
  a.click();
  URL.revokeObjectURL(url);
}

export function formatNumber(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export function profileCompletion(p: Partial<{
  displayName: string; title: string; bio: string; photoURL: string;
  phone: string; whatsapp: string; website: string; location: string;
  companyName: string; linkedin: string; instagram: string;
  links: unknown[]; theme: string;
}>): number {
  const checks = [
    !!p.displayName,
    !!p.title,
    !!p.bio,
    !!p.photoURL,
    !!(p.phone || p.whatsapp),
    !!p.website,
    !!p.location,
    !!p.companyName,
    !!(p.linkedin || p.instagram),
    !!(p.links && p.links.length > 0),
  ];
  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
}
