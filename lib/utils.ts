export function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export function generateVCard(profile: {
  displayName: string;
  title: string;
  email: string;
  phone: string;
  photoURL?: string;
}): string {
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${profile.displayName}`,
    `TITLE:${profile.title}`,
    profile.email ? `EMAIL:${profile.email}` : "",
    profile.phone ? `TEL:${profile.phone}` : "",
    "END:VCARD",
  ]
    .filter(Boolean)
    .join("\n");
}

export function downloadVCard(vcard: string, name: string) {
  const blob = new Blob([vcard], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${name}.vcf`;
  a.click();
  URL.revokeObjectURL(url);
}

export function formatNumber(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}
