import { auth } from "./firebase";

async function uploadViaProxy(file: File, path: string): Promise<string> {
  const token = await auth.currentUser?.getIdToken();
  if (!token) throw new Error("Not authenticated");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("path", path);
  formData.append("token", token);

  const res = await fetch("/api/upload", { method: "POST", body: formData });
  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error || "Upload failed");
  }
  const { url } = await res.json();
  return url as string;
}

export async function uploadProfilePhoto(uid: string, file: File): Promise<string> {
  const ext = file.name.split(".").pop() ?? "jpg";
  return uploadViaProxy(file, `avatars/${uid}.${ext}`);
}

export async function uploadCoverPhoto(uid: string, file: File): Promise<string> {
  const ext = file.name.split(".").pop() ?? "jpg";
  return uploadViaProxy(file, `covers/${uid}.${ext}`);
}
