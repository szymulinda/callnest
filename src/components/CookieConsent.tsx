import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { AppLink } from '../router';
import {
  applyConsent,
  getStoredConsent,
  type ConsentChoice,
} from '../analytics/consent';
import './CookieConsent.css';

type CookieConsentContextValue = {
  openSettings: () => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

export function useCookieConsent(): CookieConsentContextValue {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error('useCookieConsent must be used within CookieConsentProvider');
  }
  return context;
}

const EXIT_DURATION = 320;

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const stored = getStoredConsent();
    if (stored) {
      applyConsent(stored, false);
    } else {
      setVisible(true);
    }
  }, []);

  const choose = useCallback((choice: ConsentChoice) => {
    applyConsent(choice);
    setClosing(true);
    window.setTimeout(() => {
      setVisible(false);
      setClosing(false);
    }, EXIT_DURATION);
  }, []);

  const openSettings = useCallback(() => {
    setClosing(false);
    setVisible(true);
  }, []);

  const value = useMemo(() => ({ openSettings }), [openSettings]);

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
      {visible && (
        <div
          className={`cookie-banner ${closing ? 'cookie-banner--closing' : ''}`}
          role="dialog"
          aria-live="polite"
          aria-label="Zgoda na pliki cookies"
        >
          <div className="cookie-banner__inner">
            <div className="cookie-banner__text">
              <p className="cookie-banner__title">Szanujemy Twoją prywatność</p>
              <p className="cookie-banner__desc">
                Używamy plików cookies niezbędnych do działania strony oraz — za Twoją zgodą —
                analitycznych (Google Analytics), aby ulepszać serwis. Szczegóły znajdziesz w{' '}
                <AppLink to="/polityka-prywatnosci" className="cookie-banner__link">
                  Polityce Prywatności
                </AppLink>
                .
              </p>
            </div>
            <div className="cookie-banner__actions">
              <button
                type="button"
                className="cookie-banner__btn cookie-banner__btn--ghost"
                onClick={() => choose('necessary')}
              >
                Tylko niezbędne
              </button>
              <button
                type="button"
                className="cookie-banner__btn cookie-banner__btn--primary"
                onClick={() => choose('all')}
              >
                Akceptuję wszystkie
              </button>
            </div>
          </div>
        </div>
      )}
    </CookieConsentContext.Provider>
  );
}
