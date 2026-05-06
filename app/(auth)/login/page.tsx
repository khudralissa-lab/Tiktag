"use client";

import dynamic from "next/dynamic";

// LoginForm uses Firebase which calls `new WeakRef()` at module-load time.
// ssr: false keeps Firebase out of the server bundle to avoid crashing the Worker.
const LoginForm = dynamic(() => import("./LoginForm"), { ssr: false });

export default function LoginPage() {
  return <LoginForm />;
}
