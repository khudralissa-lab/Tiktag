import { initializeApp, getApps } from "firebase/app";
import type { Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
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

// firebase/auth is required at runtime only on the client — no static import so
// SSR/edge workers never touch browser-only Auth APIs.
// firebase/firestore is intentionally NOT exported from here; lib/firestore.ts
// imports it lazily inside each function via getFirebase() to avoid the
// "Service firestore is not available" error caused by calling getFirestore()
// before the firestore chunk has finished registering its component.

// eslint-disable-next-line @typescript-eslint/no-require-imports
export const auth: Auth = typeof window !== "undefined" && firebaseConfig.apiKey?.startsWith("AIza")
  ? (require("firebase/auth") as typeof import("firebase/auth")).getAuth(app)
  : ({} as Auth);

export default app;
