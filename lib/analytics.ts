import { trackEvent } from "./firestore";
import type { AnalyticsEvent } from "@/types";

function getSource(): AnalyticsEvent["source"] {
  if (typeof window === "undefined") return "direct";
  const params = new URLSearchParams(window.location.search);
  const s = params.get("s");
  if (s === "qr") return "qr";
  if (s === "nfc") return "nfc";
  return "direct";
}

export async function trackProfileView(uid: string) {
  await trackEvent(uid, {
    type: "view",
    target: "profile",
    source: getSource(),
    timestamp: Date.now(),
    userAgent: navigator.userAgent,
  });
}

export async function trackButtonClick(uid: string, buttonLabel: string) {
  await trackEvent(uid, {
    type: "click",
    target: buttonLabel,
    source: getSource(),
    timestamp: Date.now(),
  });
}
