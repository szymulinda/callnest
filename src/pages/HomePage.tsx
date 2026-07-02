import Hero from '../components/Hero';
import StatsBar from '../components/StatsBar';
import HowItWorks from '../components/HowItWorks';
import UseCases from '../components/UseCases';
import Industries from '../components/Industries';
import WhyCallnest from '../components/WhyCallnest';
import Pricing from '../components/Pricing';
import Cta from '../components/Cta';
import { useEffect } from 'react';

const PAGE_TITLE = 'Callnest — Głosowi agenci AI dla MŚP w Polsce';
const PAGE_DESCRIPTION =
  'Callnest projektuje i prowadzi głosowych agentów AI, którzy odbierają połączenia Twojej firmy 24/7. Lokalny partner technologiczny dla MŚP.';

export default function HomePage() {
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
    <main>
      <Hero />
      <StatsBar />
      <HowItWorks />
      <UseCases />
      <Industries />
      <WhyCallnest />
      <Pricing />
      <Cta />
    </main>
  );
}
