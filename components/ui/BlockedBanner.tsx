"use client";

import { ShieldAlert, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  onRetry?: () => void;
  /** Full-page centered layout (for auth failures). Defaults to inline dashboard card. */
  fullPage?: boolean;
}

export default function BlockedBanner({ onRetry, fullPage = false }: Props) {
  if (fullPage) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-xs"
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
            style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)" }}
          >
            <ShieldAlert className="w-6 h-6 text-amber-400" />
          </div>
          <h2 className="text-white text-xl font-semibold mb-2">Connection blocked</h2>
          <p className="text-white/45 text-sm leading-relaxed mb-6">
            Your browser is blocking connection.<br />
            Please disable ad blocker or privacy shields for this site.
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-medium"
              style={{ background: "#6366f1" }}
            >
              <RefreshCw className="w-4 h-4" />
              Retry
            </button>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="p-5 rounded-2xl flex items-start gap-4"
        style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.18)" }}
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
          style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)" }}
        >
          <ShieldAlert className="w-4 h-4 text-amber-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-medium mb-1">Connection blocked by your browser</p>
          <p className="text-white/45 text-xs leading-relaxed">
            Your browser is blocking connection. Please disable ad blocker or privacy shields for this site.
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-3 flex items-center gap-1.5 text-xs font-medium transition-opacity hover:opacity-70"
              style={{ color: "#a5b4fc" }}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Retry connection
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
