// Firestore REST client — works in Cloudflare edge runtime (no Firebase SDK needed)

type FirestoreValue =
  | { stringValue: string }
  | { integerValue: string }
  | { doubleValue: number }
  | { booleanValue: boolean }
  | { nullValue: null }
  | { timestampValue: string }
  | { arrayValue: { values?: FirestoreValue[] } }
  | { mapValue: { fields?: Record<string, FirestoreValue> } };

function parseValue(v: FirestoreValue): unknown {
  if ("stringValue" in v) return v.stringValue;
  if ("integerValue" in v) return Number(v.integerValue);
  if ("doubleValue" in v) return v.doubleValue;
  if ("booleanValue" in v) return v.booleanValue;
  if ("nullValue" in v) return null;
  if ("timestampValue" in v) return v.timestampValue;
  if ("arrayValue" in v) return (v.arrayValue.values ?? []).map(parseValue);
  if ("mapValue" in v) return parseFields(v.mapValue.fields ?? {});
  return null;
}

function parseFields(fields: Record<string, FirestoreValue>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(fields)) out[k] = parseValue(v);
  return out;
}

async function getDocument(
  projectId: string,
  apiKey: string,
  path: string
): Promise<Record<string, unknown> | null> {
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${path}?key=${apiKey}`;
  const res = await fetch(url);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Firestore REST error ${res.status} for ${path}`);
  const json = await res.json() as { fields?: Record<string, FirestoreValue> };
  if (!json.fields) return null;
  return parseFields(json.fields);
}

export async function getProfileByUsernameRest(username: string) {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!;
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY!;

  const usernameDoc = await getDocument(projectId, apiKey, `usernames/${username}`);
  if (!usernameDoc) return null;

  const uid = usernameDoc.uid as string;
  if (!uid) return null;

  const profileDoc = await getDocument(projectId, apiKey, `users/${uid}`);
  return profileDoc ?? null;
}
