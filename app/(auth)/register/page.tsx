"use client";

import dynamic from "next/dynamic";

// RegisterForm uses Firebase which calls `new WeakRef()` at module-load time.
// ssr: false keeps Firebase out of the server bundle to avoid crashing the Worker.
const RegisterForm = dynamic(() => import("./RegisterForm"), { ssr: false });

export default function RegisterPage() {
  return <RegisterForm />;
}
