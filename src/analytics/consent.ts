// >>> PODMIEŃ NA WŁASNY IDENTYFIKATOR GA4 (np. "G-XXXXXXXXXX") <<<
// Dopóki wartość jest pusta, Google Analytics NIE zostanie załadowane,
// nawet po wyrażeniu zgody. Consent Mode v2 działa niezależnie.
export const GA_MEASUREMENT_ID = '';

const STORAGE_KEY = 'callnest_cookie_consent';

export type ConsentChoice = 'all' | 'necessary';

type GtagArgs =
  | ['consent', 'default' | 'update', Record<string, string>]
  | ['js', Date]
  | ['config', string, Record<string, unknown>?]
  | ['event', string, Record<string, unknown>?];

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: GtagArgs) => void;
  }
}

function ensureGtag(): void {
  if (typeof window === 'undefined') return;
  if (window.gtag) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: GtagArgs) {
    window.dataLayer.push(args);
  };
}

/**
 * Ustawia domyślny stan zgody (Consent Mode v2) na "denied" — musi zostać
 * wywołane jak najwcześniej, zanim jakiekolwiek narzędzie Google się załaduje.
 */
export function initConsentDefaults(): void {
  if (typeof window === 'undefined') return;
  ensureGtag();

  window.gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
  });
}

export function getStoredConsent(): ConsentChoice | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    if (value === 'all' || value === 'necessary') return value;
    return null;
  } catch {
    return null;
  }
}

function persistConsent(choice: ConsentChoice): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // Brak dostępu do localStorage nie może blokować działania strony.
  }
}

let gaScriptLoaded = false;

function loadGoogleAnalytics(): void {
  if (gaScriptLoaded || !GA_MEASUREMENT_ID) return;
  gaScriptLoaded = true;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, { anonymize_ip: true });
}

/**
 * Stosuje decyzję użytkownika: aktualizuje Consent Mode i (jeśli zgoda) ładuje GA.
 * `persist` = false pozwala odświeżyć stan przy starcie bez ponownego zapisu.
 */
export function applyConsent(choice: ConsentChoice, persist = true): void {
  if (typeof window === 'undefined') return;
  ensureGtag();

  if (persist) persistConsent(choice);

  const granted = choice === 'all';

  window.gtag('consent', 'update', {
    ad_storage: granted ? 'granted' : 'denied',
    ad_user_data: granted ? 'granted' : 'denied',
    ad_personalization: granted ? 'granted' : 'denied',
    analytics_storage: granted ? 'granted' : 'denied',
  });

  if (granted) {
    loadGoogleAnalytics();
  }
}
