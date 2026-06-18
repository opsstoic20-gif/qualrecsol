// Lightweight in-memory per-process rate limiter (best-effort; resets on cold start).
const store = new Map<string, number[]>();

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const arr = (store.get(key) || []).filter((t) => now - t < windowMs);
  if (arr.length >= limit) {
    store.set(key, arr);
    return false;
  }
  arr.push(now);
  store.set(key, arr);
  return true;
}
