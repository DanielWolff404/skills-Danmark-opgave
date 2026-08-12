const SESSION_COOKIE = 'skoleting_admin_session';
const SESSION_TTL_SECONDS = 60 * 60 * 8;

function toBase64Url(bytes: ArrayBuffer | Uint8Array) {
  const values = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let binary = '';
  for (const value of values) binary += String.fromCharCode(value);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function fromBase64Url(value: string) {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
  const binary = atob(padded);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

async function sign(value: string) {
  const secret = process.env.ADMIN_SESSION_SECRET || 'change-this-admin-session-secret';
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(value));
  return toBase64Url(signature);
}

export async function createAdminSession() {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = `admin.${expiresAt}`;
  return `${payload}.${await sign(payload)}`;
}

export async function isValidAdminSession(value?: string) {
  if (!value) return false;

  const parts = value.split('.');
  if (parts.length !== 3 || parts[0] !== 'admin') return false;

  const expiresAt = Number(parts[1]);
  if (!Number.isFinite(expiresAt) || expiresAt < Math.floor(Date.now() / 1000)) return false;

  const expectedSignature = await sign(`${parts[0]}.${parts[1]}`);
  const actual = fromBase64Url(parts[2]);
  const expected = fromBase64Url(expectedSignature);
  if (actual.length !== expected.length) return false;

  return actual.every((byte, index) => byte === expected[index]);
}

export function getAdminCredentials() {
  return {
    username: process.env.ADMIN_USERNAME || 'admin',
    password: process.env.ADMIN_PASSWORD || 'change-me-now',
  };
}

export { SESSION_COOKIE, SESSION_TTL_SECONDS };
