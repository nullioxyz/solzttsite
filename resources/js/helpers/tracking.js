const isBrowser = typeof window !== "undefined";

function sanitizeEventName(eventName) {
  return String(eventName || "")
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 40);
}

function normalizeParams(params = {}) {
  return Object.entries(params).reduce((acc, [key, value]) => {
    if (value === undefined || value === null) return acc;
    acc[key] = value;
    return acc;
  }, {});
}

export function trackActionEvent(eventName, params = {}) {
  if (!isBrowser || typeof window.trackAnalyticsEvent !== "function") return;

  const normalizedName = sanitizeEventName(eventName);
  if (!normalizedName) return;

  window.trackAnalyticsEvent(normalizedName, normalizeParams(params));
}

export function trackLeadConversion(params = {}) {
  if (!isBrowser || typeof window.trackLeadConversion !== "function") return;
  window.trackLeadConversion(normalizeParams(params));
}
