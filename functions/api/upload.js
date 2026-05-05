export async function onRequestPost({ request, env }) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const path = formData.get("path");
    const token = formData.get("token");

    if (!file || !path || !token) {
      return Response.json({ error: "Missing file, path, or token" }, { status: 400 });
    }
    if (file.size > 5 * 1024 * 1024) {
      return Response.json({ error: "File exceeds 5 MB limit" }, { status: 413 });
    }

    const bucket = env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
    const encodedPath = encodeURIComponent(path);
    const uploadUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o?name=${encodedPath}`;

    const body = await file.arrayBuffer();

    const uploadRes = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        "Content-Type": file.type || "application/octet-stream",
        "Authorization": `Firebase ${token}`,
      },
      body,
    });

    if (!uploadRes.ok) {
      const text = await uploadRes.text();
      return Response.json({ error: `Storage error: ${text}` }, { status: uploadRes.status });
    }

    const data = await uploadRes.json();
    const downloadToken = data.downloadTokens ?? "";
    const url = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodedPath}?alt=media&token=${downloadToken}`;

    return Response.json({ url });
  } catch (err) {
    console.error("[TikTag] Upload proxy error:", err);
    return Response.json({ error: "Upload failed" }, { status: 500 });
  }
}
