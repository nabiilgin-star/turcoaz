// Signed admin session token: "<expiresAtMs>.<base64url HMAC-SHA256 signature>".
// Uses Web Crypto so it works in the proxy, route handlers and server actions.

const encoder = new TextEncoder();

export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24; // 24 hours

function toBase64Url(bytes) {
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(str) {
  const b64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const pad = b64.length % 4 === 0 ? "" : "=".repeat(4 - (b64.length % 4));
  const bin = atob(b64 + pad);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

async function getKey(usage) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) return null;
  return globalThis.crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    [usage]
  );
}

export async function createSessionToken() {
  const key = await getKey("sign");
  if (!key) throw new Error("ADMIN_SESSION_SECRET is missing or too short");
  const expires = String(Date.now() + SESSION_MAX_AGE_SECONDS * 1000);
  const sig = await globalThis.crypto.subtle.sign("HMAC", key, encoder.encode(expires));
  return expires + "." + toBase64Url(new Uint8Array(sig));
}

export async function verifySessionToken(token) {
  try {
    if (typeof token !== "string") return false;
    const parts = token.split(".");
    if (parts.length !== 2) return false;
    const expires = parts[0];
    const sig = parts[1];
    if (!/^\d+$/.test(expires) || !sig) return false;
    if (Number(expires) <= Date.now()) return false;
    const key = await getKey("verify");
    if (!key) return false;
    return await globalThis.crypto.subtle.verify(
      "HMAC",
      key,
      fromBase64Url(sig),
      encoder.encode(expires)
    );
  } catch {
    return false;
  }
}