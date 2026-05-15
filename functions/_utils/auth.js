// Jednoduchý JWT HS256 helper pro Cloudflare Workers / Pages Functions

const encoder = new TextEncoder();

function base64url(input) {
  return btoa(String.fromCharCode(...input))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function signJWT(payload, secret) {
  const header = { alg: "HS256", typ: "JWT" };
  const encHeader = encoder.encode(JSON.stringify(header));
  const encPayload = encoder.encode(JSON.stringify(payload));

  const headerB64 = base64url(encHeader);
  const payloadB64 = base64url(encPayload);

  const data = encoder.encode(`${headerB64}.${payloadB64}`);

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", key, data);
  const sigB64 = base64url(new Uint8Array(signature));

  return `${headerB64}.${payloadB64}.${sigB64}`;
}

export async function verifyJWT(token, secret) {
  const parts = token.split(".");
  if (parts.length !== 3) return null;

  const [headerB64, payloadB64, sigB64] = parts;
  const data = encoder.encode(`${headerB64}.${payloadB64}`);

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );

  const sigBytes = Uint8Array.from(
    atob(sigB64.replace(/-/g, "+").replace(/_/g, "/")),
    (c) => c.charCodeAt(0)
  );

  const ok = await crypto.subtle.verify("HMAC", key, sigBytes, data);
  if (!ok) return null;

  const payloadJson = atob(
    payloadB64.replace(/-/g, "+").replace(/_/g, "/")
  );
  return JSON.parse(payloadJson);
}
