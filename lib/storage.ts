const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

function buildForm(file: File, folder: string, publicId: string): FormData {
  const form = new FormData();
  form.append("file", file);
  form.append("upload_preset", UPLOAD_PRESET!);
  form.append("folder", folder);
  form.append("public_id", publicId);
  return form;
}

async function uploadToCloudinary(file: File, folder: string, publicId: string): Promise<string> {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error("Cloudinary is not configured — set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET");
  }

  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

  for (let attempt = 0; attempt < 2; attempt++) {
    const res = await fetch(url, { method: "POST", body: buildForm(file, folder, publicId) });

    if (res.ok) {
      const data = await res.json();
      return data.secure_url as string;
    }

    const err = await res.json().catch(() => ({}));
    const message = err.error?.message ?? `Upload failed (HTTP ${res.status})`;

    if (res.status < 500) throw new Error(message);

    if (attempt === 0) await new Promise((r) => setTimeout(r, 1200));
    else throw new Error(message);
  }

  throw new Error("Upload failed");
}

export async function uploadProfilePhoto(uid: string, file: File): Promise<string> {
  return uploadToCloudinary(file, "tapid/avatars", uid);
}

export async function uploadCoverPhoto(uid: string, file: File): Promise<string> {
  return uploadToCloudinary(file, "tapid/covers", uid);
}

export async function uploadCompanyLogo(uid: string, file: File): Promise<string> {
  return uploadToCloudinary(file, "tapid/logos", uid);
}

export async function uploadMediaItem(
  uid: string,
  file: File,
  index: number
): Promise<{ url: string; thumbnailUrl?: string }> {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error("Cloudinary is not configured — set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET");
  }

  const isVideo = file.type.startsWith("video/");
  const resourceType = isVideo ? "video" : "image";
  const endpoint = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`;
  const publicId = `${uid}_${index}_${Date.now()}`;

  for (let attempt = 0; attempt < 2; attempt++) {
    const res = await fetch(endpoint, {
      method: "POST",
      body: buildForm(file, "tapid/media", publicId),
    });

    if (res.ok) {
      const data = await res.json();
      const url = data.secure_url as string;
      const thumbnailUrl = isVideo
        ? url.replace("/upload/", "/upload/so_0,w_600,c_thumb/").replace(/\.[^/.]+$/, ".jpg")
        : undefined;
      return { url, thumbnailUrl };
    }

    const err = await res.json().catch(() => ({}));
    const message = err.error?.message ?? `Upload failed (HTTP ${res.status})`;

    if (res.status < 500) throw new Error(message);

    if (attempt === 0) await new Promise((r) => setTimeout(r, 1200));
    else throw new Error(message);
  }

  throw new Error("Upload failed");
}
