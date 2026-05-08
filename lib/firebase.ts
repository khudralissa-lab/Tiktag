import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import type { Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (typeof window !== "undefined") {
  const missing = Object.entries(firebaseConfig)
    .filter(([, v]) => !v)
    .map(([k]) => `NEXT_PUBLIC_FIREBASE_${k.replace(/([A-Z])/g, "_$1").toUpperCase()}`);
  if (missing.length > 0) {
    console.warn("[TikTag] Firebase config missing:", missing.join(", "));
  }
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Static import of getAuth ensures firebase/auth component is registered before any usage.
// Initialization is still guarded to client-only (typeof window) to avoid running auth
// in the Cloudflare Workers SSR context where browser persistence APIs aren't available.
export const auth: Auth = typeof window !== "undefined" && firebaseConfig.apiKey?.startsWith("AIza")
  ? getAuth(app)
  : ({} as Auth);

export default app;
