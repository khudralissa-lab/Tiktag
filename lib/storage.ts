import { auth } from "./firebase";
import app from "./firebase";

// Upload directly from the browser to Firebase Storage via the official SDK.
// This bypasses the /api/upload proxy route entirely — no Cloudflare Worker
// involvement means no OpenNext body-handling issues and no 502 errors.
async function uploadDirect(file: File, path: string): Promise<string> {
  if (!auth.currentUser) throw new Error("Not authenticated");

  // Dynamic import keeps firebase/storage out of server/Worker bundles.
  const { getStorage, ref, uploadBytes, getDownloadURL } = await import("firebase/storage");

  const storage = getStorage(app);
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file, { contentType: file.type || "application/octet-stream" });
  return getDownloadURL(storageRef);
}

export async function uploadProfilePhoto(uid: string, file: File): Promise<string> {
  const ext = file.name.split(".").pop() ?? "jpg";
  return uploadDirect(file, `avatars/${uid}.${ext}`);
}

export async function uploadCoverPhoto(uid: string, file: File): Promise<string> {
  const ext = file.name.split(".").pop() ?? "jpg";
  return uploadDirect(file, `covers/${uid}.${ext}`);
}
