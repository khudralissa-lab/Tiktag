export function isFirebaseBlocked(err: unknown): boolean {
  const msg = (err instanceof Error ? err.message : String(err)).toLowerCase();
  return (
    msg.includes("err_blocked_by_client") ||
    msg.includes("blocked") ||
    msg.includes("adblock") ||
    (msg.includes("firestore.googleapis.com") && msg.includes("fail"))
  );
}
