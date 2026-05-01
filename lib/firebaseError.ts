export function isFirebaseBlocked(err: unknown): boolean {
  const msg = (err instanceof Error ? err.message : String(err)).toLowerCase();
  return (
    msg.includes("err_blocked_by_client") ||
    msg.includes("net::err_blocked") ||
    msg.includes("net::err_failed") ||
    msg.includes("failed to fetch") ||
    msg.includes("networkerror") ||
    msg.includes("network request failed") ||
    msg.includes("fetcherror") ||
    msg.includes("could not reach cloud firestore") ||
    msg.includes("firestore unavailable") ||
    // Firebase Auth network errors
    msg.includes("auth/network-request-failed") ||
    msg.includes("network error")
  );
}
