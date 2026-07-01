import { useEffect } from 'react';
import LegalMarkdown from '../components/LegalMarkdown';
import privacyMarkdown from '../content/polityka-prywatnosci.md?raw';
import '../components/LegalMarkdown.css';

const PAGE_TITLE = 'Polityka Prywatności — Callnest';
const PAGE_DESCRIPTION =
  'Polityka prywatności Callnest — informacje o przetwarzaniu danych osobowych, cookies, transferach danych oraz Twoich prawach.';

export default function PrivacyPolicyPage() {
  useEffect(() => {
    document.title = PAGE_TITLE;

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', PAGE_DESCRIPTION);
  }, []);

  return (
    <main className="legal-page">
      <div className="legal-page__inner">
        <LegalMarkdown source={privacyMarkdown} />
      </div>
    </main>
  );
}
