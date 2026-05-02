export const CONSENT_KEY = 'cookie-consent';
export const CONSENT_TTL_MS = 365 * 24 * 60 * 60 * 1000;

export type ConsentChoice = 'granted' | 'denied';
export type StoredConsent = { choice: ConsentChoice; timestamp: number };
