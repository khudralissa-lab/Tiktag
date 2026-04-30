import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 mb-8">
        <Zap className="w-8 h-8 text-indigo-400" />
      </div>

      <h1 className="text-5xl font-bold text-white tracking-tight mb-4">
        Tap.<br />
        <span className="text-indigo-400">Share.</span><br />
        Connect.
      </h1>

      <p className="text-white/40 text-lg max-w-sm mb-10">
        Your smart digital identity. One tap. Instant connection.
      </p>

      <div className="flex items-center gap-3">
        <Link
          href="/register"
          className="flex items-center gap-2 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white text-sm font-medium transition-colors"
        >
          Get Started <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/login"
          className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white text-sm font-medium transition-colors"
        >
          Sign In
        </Link>
      </div>

      <p className="text-white/20 text-xs mt-16">TapID — Smart Identity & Interaction Platform</p>
    </div>
  );
}
