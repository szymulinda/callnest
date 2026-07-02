// Konfiguracja rezerwacji demo (Cal.com) — łatwa podmiana w jednym miejscu.
export const CALCOM_LINK = 'callnest/15-minutowe-demo';
export const CALCOM_DOMAIN = 'https://cal.eu';

const CALCOM_NAMESPACE = '15-minutowe-demo';
// Loader embed.js zawsze pochodzi z app.cal.com (zarządza rdzeniem embedu),
// a właściwa instancja bookingu jest ustawiana przez `origin` = CALCOM_DOMAIN.
const EMBED_SCRIPT_SRC = 'https://app.cal.com/embed/embed.js';

type CalApi = ((...args: unknown[]) => void) & {
  ns: Record<string, (...args: unknown[]) => void>;
};

declare global {
  interface Window {
    Cal?: CalApi;
  }
}

let initialized = false;

function ensureLoader(): void {
  if (window.Cal) return;

  const script = document.createElement('script');
  script.type = 'text/javascript';
  // Oficjalny loader Cal.com (kolejkuje polecenia zanim embed.js się załaduje).
  script.text = `(function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "${EMBED_SCRIPT_SRC}", "init");`;
  document.head.appendChild(script);
}

export function initCal(): void {
  if (typeof window === 'undefined') return;
  ensureLoader();
  if (initialized || !window.Cal) return;
  initialized = true;

  window.Cal('init', CALCOM_NAMESPACE, { origin: CALCOM_DOMAIN });
  window.Cal.ns[CALCOM_NAMESPACE]('ui', {
    theme: 'light',
    cssVarsPerTheme: {
      light: { 'cal-brand': '#0D1B3E' },
    },
    hideEventTypeDetails: false,
    layout: 'month_view',
  });
}

/** Otwiera popup rezerwacji demo. Używane przez wszystkie CTA na stronie. */
export function openCalModal(): void {
  if (typeof window === 'undefined') return;
  initCal();
  window.Cal?.ns[CALCOM_NAMESPACE]('modal', { calLink: CALCOM_LINK });
}
