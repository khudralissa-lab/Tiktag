import type { UserProfile, AnalyticsEvent } from "@/types";

// Recursively strips undefined values so Firestore never receives them.
// Firestore rejects any field set to undefined, including inside nested objects and arrays.
function cleanFirestoreData(data: unknown): unknown {
  if (Array.isArray(data)) {
    return data.map(cleanFirestoreData);
  }
  if (data !== null && typeof data === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(data as Record<string, unknown>)) {
      if (v !== undefined) out[k] = cleanFirestoreData(v);
    }
    return out;
  }
  return data;
}

// All firebase/firestore imports are lazy — called only when a function is invoked
// so the module is never evaluated during SSR/edge rendering.
async function getFirebase() {
  const [firestoreModule, { default: app }] = await Promise.all([
    import("firebase/firestore"),
    import("./firebase"),
  ]);
  return { ...firestoreModule, db: firestoreModule.getFirestore(app) };
}

export async function createUserProfile(uid: string, data: Partial<UserProfile>) {
  const { doc, setDoc, db } = await getFirebase();
  await setDoc(doc(db, "users", uid), cleanFirestoreData({
    ...data,
    uid,
    plan: "free",
    createdAt: Date.now(),
    links: [],
    socials: [],
    accentColor: "#6366f1",
  }) as Record<string, unknown>);
  if (data.username) {
    await setDoc(doc(db, "usernames", data.username), { uid });
  }
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const { doc, getDoc, db } = await getFirebase();
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? (snap.data() as UserProfile) : null;
}

export async function getProfileByUsername(username: string): Promise<UserProfile | null> {
  const { doc, getDoc, db } = await getFirebase();
  const usernameDoc = await getDoc(doc(db, "usernames", username));
  if (!usernameDoc.exists()) return null;
  const { uid } = usernameDoc.data();
  return getUserProfile(uid);
}

export async function updateUserProfile(uid: string, data: Partial<UserProfile>) {
  const { doc, updateDoc, db } = await getFirebase();
  await updateDoc(doc(db, "users", uid), cleanFirestoreData(data) as Record<string, unknown>);
}

export async function isUsernameAvailable(username: string): Promise<boolean> {
  const { doc, getDoc, db } = await getFirebase();
  const snap = await getDoc(doc(db, "usernames", username));
  return !snap.exists();
}

export async function updateUsername(uid: string, oldUsername: string, newUsername: string): Promise<void> {
  const { doc, setDoc, updateDoc, deleteDoc, db } = await getFirebase();
  if (oldUsername && oldUsername !== newUsername) {
    await deleteDoc(doc(db, "usernames", oldUsername));
  }
  await setDoc(doc(db, "usernames", newUsername), { uid });
  await updateDoc(doc(db, "users", uid), { username: newUsername });
}

export async function trackEvent(uid: string, event: AnalyticsEvent) {
  const { collection, addDoc, db } = await getFirebase();
  await addDoc(collection(db, "analytics", uid, "events"), {
    ...event,
    timestamp: Date.now(),
  });
}

export async function getAnalyticsEvents(uid: string, days = 30) {
  const { collection, query, where, getDocs, orderBy, limit, db } = await getFirebase();
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
