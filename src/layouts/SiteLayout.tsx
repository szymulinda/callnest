import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HomePage from '../pages/HomePage';
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage';
import CompliancePage from '../pages/CompliancePage';
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
  return (
    <AppRouter>
      <div className="app">
        <Navbar />
        <RoutedContent />
        <Footer />
      </div>
    </AppRouter>
  );
}
