import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "./firebase";
import type { UserProfile, AnalyticsEvent } from "@/types";

export async function createUserProfile(uid: string, data: Partial<UserProfile>) {
  await setDoc(doc(db, "users", uid), {
    ...data,
    uid,
    plan: "free",
    createdAt: Date.now(),
    links: [],
    socials: [],
    accentColor: "#6366f1",
  });
  if (data.username) {
    await setDoc(doc(db, "usernames", data.username), { uid });
  }
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? (snap.data() as UserProfile) : null;
}

export async function getProfileByUsername(username: string): Promise<UserProfile | null> {
  const usernameDoc = await getDoc(doc(db, "usernames", username));
  if (!usernameDoc.exists()) return null;
  const { uid } = usernameDoc.data();
  return getUserProfile(uid);
}

export async function updateUserProfile(uid: string, data: Partial<UserProfile>) {
  await updateDoc(doc(db, "users", uid), data as Record<string, unknown>);
}

export async function isUsernameAvailable(username: string): Promise<boolean> {
  const snap = await getDoc(doc(db, "usernames", username));
  return !snap.exists();
}

export async function trackEvent(uid: string, event: AnalyticsEvent) {
  await addDoc(collection(db, "analytics", uid, "events"), {
    ...event,
    timestamp: Date.now(),
  });
}

export async function getAnalyticsEvents(uid: string, days = 30) {
  const since = Date.now() - days * 24 * 60 * 60 * 1000;
  const q = query(
    collection(db, "analytics", uid, "events"),
    where("timestamp", ">=", since),
    orderBy("timestamp", "desc"),
    limit(500)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as AnalyticsEvent);
}
