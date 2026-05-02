import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from "./firebase";

function getStorageInstance() {
  return getStorage(app);
}

export async function uploadProfilePhoto(uid: string, file: File): Promise<string> {
  const storage = getStorageInstance();
  const ext = file.name.split(".").pop() ?? "jpg";
  const storageRef = ref(storage, `avatars/${uid}.${ext}`);
  await uploadBytes(storageRef, file, { contentType: file.type });
  return getDownloadURL(storageRef);
}

export async function uploadCoverPhoto(uid: string, file: File): Promise<string> {
  const storage = getStorageInstance();
  const ext = file.name.split(".").pop() ?? "jpg";
  const storageRef = ref(storage, `covers/${uid}.${ext}`);
  await uploadBytes(storageRef, file, { contentType: file.type });
  return getDownloadURL(storageRef);
}
