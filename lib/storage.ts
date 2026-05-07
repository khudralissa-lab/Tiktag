import { auth } from "./firebase";

async function uploadViaProxy(file: File, path: string): Promise<string> {
  const token = await auth.currentUser?.getIdToken();
  if (!token) throw new Error("Not authenticated");

  // Send file as raw binary body; pass metadata in headers.
  // Avoids multipart/form-data which crashes OpenNext's routing layer in
  // Cloudflare Workers before the route handler is reached.
  const res = await fetch("/api/upload", {
    method: "POST",
    headers: {
      "Content-Type": file.type || "application/octet-stream",
      "x-firebase-token": token,
      "x-upload-path": path,
    },
    body: file,
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.error || `Upload failed (${res.status})`);
  }
  return data.url as string;
}

export async function uploadProfilePhoto(uid: string, file: File): Promise<string> {
  const ext = file.name.split(".").pop() ?? "jpg";
  return uploadViaProxy(file, `avatars/${uid}.${ext}`);
}

export async function uploadCoverPhoto(uid: string, file: File): Promise<string> {
  const ext = file.name.split(".").pop() ?? "jpg";
  return uploadViaProxy(file, `covers/${uid}.${ext}`);
}
