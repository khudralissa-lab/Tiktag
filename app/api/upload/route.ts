import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Step 1: parse multipart form data
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch (err) {
    console.error("[upload] formData parse failed:", err);
    return NextResponse.json(
      { error: "Failed to parse request body", detail: String(err) },
      { status: 400 },
    );
  }

  const file = formData.get("file") as File | null;
  const path = formData.get("path") as string | null;
  const token = formData.get("token") as string | null;

  console.log(
    "[upload] fields — name:", file?.name,
    "size:", file?.size,
    "type:", file?.type,
    "path:", path,
    "token present:", !!token,
    "token prefix:", token?.slice(0, 20),
  );

  if (!file || !path || !token) {
    return NextResponse.json(
      { error: "Missing required fields", hasFile: !!file, hasPath: !!path, hasToken: !!token },
      { status: 400 },
    );
  }
  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "File exceeds 5 MB limit" }, { status: 413 });
  }

  // Step 2: resolve bucket
  const bucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
  console.log("[upload] bucket:", bucket);
  if (!bucket) {
    console.error("[upload] NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET is not set");
    return NextResponse.json({ error: "Storage not configured — env var missing" }, { status: 500 });
  }

  // Step 3: build Firebase Storage simple-upload URL
  // path like "avatars/uid.jpg" → encodeURIComponent → "avatars%2Fuid.jpg"
  const encodedPath = encodeURIComponent(path);
  const uploadUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o?name=${encodedPath}`;
  console.log("[upload] uploadUrl:", uploadUrl);

  // Step 4: read file bytes
  let body: ArrayBuffer;
  try {
    body = await file.arrayBuffer();
  } catch (err) {
    console.error("[upload] arrayBuffer failed:", err);
    return NextResponse.json(
      { error: "Failed to read file bytes", detail: String(err) },
      { status: 500 },
    );
  }
  console.log("[upload] body bytes:", body.byteLength, "content-type:", file.type);

  // Step 5: POST raw bytes to Firebase Storage REST API
  let uploadRes: Response;
  try {
    uploadRes = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        "Content-Type": file.type || "application/octet-stream",
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

  // Always read the response body so Firebase's error message is visible
  const responseText = await uploadRes.text();
  console.log("[upload] Firebase Storage response:", uploadRes.status, responseText.slice(0, 600));

  if (!uploadRes.ok) {
    // Return Firebase's exact error so the client (and we) can see what went wrong
    return NextResponse.json(
      {
        error: "Firebase Storage rejected the upload",
        firebaseStatus: uploadRes.status,
        firebaseBody: responseText,
      },
      { status: 502 },
    );
  }

  // Step 6: parse Firebase response and build public download URL
  let data: { downloadTokens?: string; name?: string };
  try {
    data = JSON.parse(responseText);
  } catch (err) {
    console.error("[upload] JSON parse of Firebase response failed:", responseText);
    return NextResponse.json(
      { error: "Unexpected response format from Firebase Storage", raw: responseText },
      { status: 502 },
    );
  }

  const downloadToken = data.downloadTokens ?? "";
  const url = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodedPath}?alt=media&token=${downloadToken}`;
  console.log("[upload] success — url:", url);

  return NextResponse.json({ url });
}
