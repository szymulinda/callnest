import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HomePage from '../pages/HomePage';
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage';
import CompliancePage from '../pages/CompliancePage';
import { CookieConsentProvider } from '../components/CookieConsent';
import { initCal } from '../booking/cal';
import { AppRouter, usePathname } from '../router';

function RoutedContent() {
  const pathname = usePathname();

  switch (pathname) {
    case '/polityka-prywatnosci':
      return <PrivacyPolicyPage />;
    case '/zgodnosc-i-rodo':
      return <CompliancePage />;
    case '/':
      return <HomePage />;
    default:
      return <HomePage />;
  }
}

export default function SiteLayout() {
  useEffect(() => {
    initCal();
  }, []);

  return (
    <AppRouter>
      <CookieConsentProvider>
        <div className="app">
          <Navbar />
          <RoutedContent />
          <Footer />
        </div>
      </CookieConsentProvider>
    </AppRouter>
  );
}
