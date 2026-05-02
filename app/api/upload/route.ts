export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const path = formData.get("path") as string | null;
    const token = formData.get("token") as string | null;

    if (!file || !path || !token) {
      return NextResponse.json({ error: "Missing file, path, or token" }, { status: 400 });
    }
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File exceeds 5 MB limit" }, { status: 413 });
    }

    const bucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!;
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
      return NextResponse.json({ error: `Storage error: ${text}` }, { status: uploadRes.status });
    }

    const data = await uploadRes.json() as { downloadTokens?: string; name?: string };
    const downloadToken = data.downloadTokens ?? "";
    const url = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodedPath}?alt=media&token=${downloadToken}`;

    return NextResponse.json({ url });
  } catch (err) {
    console.error("[TikTag] Upload proxy error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
