import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("[upload] request received");

  // Read upload metadata from headers — avoids multipart parsing which can
  // crash the OpenNext/Cloudflare routing layer before the handler runs.
  const token = req.headers.get("x-firebase-token");
  const path = req.headers.get("x-upload-path");
  const contentType = req.headers.get("content-type") || "application/octet-stream";

  console.log("[upload] path:", path, "token present:", !!token, "content-type:", contentType);

  if (!token || !path) {
    return NextResponse.json(
      { error: "Missing x-firebase-token or x-upload-path header", hasToken: !!token, hasPath: !!path },
      { status: 400 },
    );
  }

  // Read file bytes directly from request body (no multipart overhead)
  let body: ArrayBuffer;
  try {
    body = await req.arrayBuffer();
  } catch (err) {
    console.error("[upload] arrayBuffer failed:", err);
    return NextResponse.json(
      { error: "Failed to read request body", detail: String(err) },
      { status: 500 },
    );
  }

  console.log("[upload] body bytes:", body.byteLength);

  if (body.byteLength === 0) {
    return NextResponse.json({ error: "Empty file body" }, { status: 400 });
  }
  if (body.byteLength > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "File exceeds 5 MB limit" }, { status: 413 });
  }

  // Resolve bucket — fallback ensures this works even when the env var is not
  // inlined by Cloudflare's build infrastructure.
  const bucket =
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    "tiktag-4f3cb.firebasestorage.app";
  console.log("[upload] bucket:", bucket);

  const encodedPath = encodeURIComponent(path);
  const uploadUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o?name=${encodedPath}`;
  console.log("[upload] uploadUrl:", uploadUrl);

  // POST raw bytes to Firebase Storage REST API
  let uploadRes: Response;
  try {
    uploadRes = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        "Content-Type": contentType,
        "Authorization": `Firebase ${token}`,
      },
      body,
    });
  } catch (err) {
    console.error("[upload] fetch to Firebase Storage threw:", err);
    return NextResponse.json(
      { error: "Network error reaching Firebase Storage", detail: String(err) },
      { status: 502 },
    );
  }

  const responseText = await uploadRes.text();
  console.log("[upload] Firebase response:", uploadRes.status, responseText.slice(0, 600));

  if (!uploadRes.ok) {
    return NextResponse.json(
      {
        error: "Firebase Storage rejected the upload",
        firebaseStatus: uploadRes.status,
        firebaseBody: responseText,
      },
      { status: 502 },
    );
  }

  let data: { downloadTokens?: string; name?: string };
  try {
    data = JSON.parse(responseText);
  } catch {
    console.error("[upload] JSON parse failed:", responseText);
    return NextResponse.json(
      { error: "Unexpected response from Firebase Storage", raw: responseText },
      { status: 502 },
    );
  }

  const downloadToken = data.downloadTokens ?? "";
  const url = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodedPath}?alt=media&token=${downloadToken}`;
  console.log("[upload] success, url:", url);

  return NextResponse.json({ url });
}
