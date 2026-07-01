import { useEffect } from 'react';
import LegalMarkdown from '../components/LegalMarkdown';
import complianceMarkdown from '../content/zgodnosc-i-rodo.md?raw';
import '../components/LegalMarkdown.css';

const PAGE_TITLE = 'Zgodność i RODO — Callnest';
const PAGE_DESCRIPTION =
  'Zgodność Callnest z RODO, PKE i AI Act — jak chronimy dane, zapewniamy przejrzystość AI i obsługujemy wyłącznie połączenia przychodzące.';

export default function CompliancePage() {
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
        <LegalMarkdown source={complianceMarkdown} />
      </div>
    </main>
  );
}
