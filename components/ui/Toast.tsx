"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";

export function useToast() {
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback((msg: string) => {
    setMessage(msg);
    if (timer) clearTimeout(timer);
    const t = setTimeout(() => setMessage(""), 2800);
    setTimer(t);
  }, [timer]);

  const dismiss = useCallback(() => {
    setMessage("");
    if (timer) clearTimeout(timer);
  }, [timer]);

  return { message, show, dismiss };
}

export function Toast({ message, onDismiss }: { message: string; onDismiss?: () => void }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.97 }}
          transition={{ type: "spring", stiffness: 340, damping: 26 }}
          style={{
            position: "fixed",
            bottom: 28,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "12px 18px",
            borderRadius: 14,
            background: "linear-gradient(135deg, rgba(30,27,50,0.98), rgba(20,18,40,0.98))",
            border: "1px solid rgba(139,92,246,0.28)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.6), 0 0 24px rgba(139,92,246,0.15)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            whiteSpace: "nowrap",
          }}
        >
          <div style={{
            width: 24, height: 24, borderRadius: 8,
            background: "rgba(74,222,128,0.15)", border: "1px solid rgba(74,222,128,0.25)",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <CheckCircle2 size={13} style={{ color: "#4ade80" }} />
          </div>
          <span style={{ color: "rgba(255,255,255,0.88)", fontSize: 13, fontWeight: 500 }}>
            {message}
          </span>
          {onDismiss && (
            <button
              onClick={onDismiss}
              style={{
                width: 20, height: 20, borderRadius: 6, border: "none",
                background: "transparent", cursor: "pointer",
                color: "rgba(255,255,255,0.3)", display: "flex",
                alignItems: "center", justifyContent: "center", padding: 0,
              }}
            >
              <X size={12} />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
