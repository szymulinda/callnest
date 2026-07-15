import { useState } from 'react';
import {
  BillingPeriod,
  PRICING_DEMO_URL,
  PublicPricingTier,
  formatPrice,
  getDisplayPrice,
  pricingFooterNote,
  publicPricingTiers,
} from '../data/pricing';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { openCalModal } from '../booking/cal';
import CheckIcon from './CheckIcon';
import PricingComparison from './PricingComparison';
import './CheckIcon.css';
import './Pricing.css';

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');
  const { ref: headerRef, visible: headerVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: toggleRef, visible: toggleVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: cardsRef, visible: cardsVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: noteRef, visible: noteVisible } = useScrollReveal<HTMLParagraphElement>();

  return (
    <section id="pricing" className="pricing">
      <div className="container">
        <div
          ref={headerRef}
          className={`pricing__header reveal ${headerVisible ? 'reveal--visible' : ''}`}
        >
          <div className="label label--muted">Cennik</div>
          <h2 className="section-title pricing__title">
            Trzy pakiety. Infrastruktura wliczona.
          </h2>
          <p className="pricing__subtitle">
            Bez ukrytych kosztów telefonii i AI - dostajesz jedną fakturę miesięcznie.
          </p>
        </div>

        <div
          ref={toggleRef}
          className={`pricing__billing reveal ${toggleVisible ? 'reveal--visible' : ''}`}
        >
          <BillingToggle period={billingPeriod} onChange={setBillingPeriod} />
        </div>

        <div
          ref={cardsRef}
          className={`pricing__grid reveal ${cardsVisible ? 'reveal--visible' : ''}`}
        >
          {publicPricingTiers.map((tier) => (
            <PricingCard key={tier.id} tier={tier} billingPeriod={billingPeriod} />
          ))}
        </div>

        <PricingComparison billingPeriod={billingPeriod} />

        <p
          ref={noteRef}
          className={`pricing__note reveal ${noteVisible ? 'reveal--visible' : ''}`}
        >
          {pricingFooterNote}
        </p>
      </div>
    </section>
  );
}

function BillingToggle({
  period,
  onChange,
}: {
  period: BillingPeriod;
  onChange: (p: BillingPeriod) => void;
}) {
  return (
    <div className="billing-toggle" role="group" aria-label="Okres rozliczenia">
      <button
        type="button"
        className={`billing-toggle__option ${period === 'monthly' ? 'billing-toggle__option--active' : ''}`}
        aria-pressed={period === 'monthly'}
        onClick={() => onChange('monthly')}
      >
        Rozliczenie miesięczne
      </button>
      <button
        type="button"
        className={`billing-toggle__option ${period === 'annual' ? 'billing-toggle__option--active' : ''}`}
        aria-pressed={period === 'annual'}
        onClick={() => onChange('annual')}
      >
        Rozliczenie roczne
        <span className="billing-toggle__save">(Zaoszczędź 15%)</span>
      </button>
    </div>
  );
}

function PricingCard({
  tier,
  billingPeriod,
}: {
  tier: PublicPricingTier;
  billingPeriod: BillingPeriod;
}) {
  const lite = tier.highlight;
  const txt = lite ? '#0A0E1A' : '#fff';
  const muted = '#8A99BC';
  const featTxt = lite ? '#3D4F7C' : '#C3CCE0';
  const displayPrice = getDisplayPrice(tier.price, billingPeriod);

  return (
    <div
      className={`pricing-card ${lite ? 'pricing-card--highlight' : ''}`}
      style={{ color: txt }}
    >
      {lite && <div className="pricing-card__badge">Wybór 70% klientów</div>}
      <div className="pricing-card__name" style={{ color: lite ? '#1B2D6B' : muted }}>
        {tier.name}
      </div>
      <div className="pricing-card__price">
        <span>{formatPrice(displayPrice)}</span>
        <span className="pricing-card__period" style={{ color: muted }}>
          zł / mies.
        </span>
      </div>
      {billingPeriod === 'annual' && (
        <div className="pricing-card__annual-note" style={{ color: muted }}>
          Płatność za 12 miesięcy z góry
        </div>
      )}
      <div className="pricing-card__meta" style={{ color: muted }}>
        Limit: {tier.limit}
      </div>
      <div className="pricing-card__meta" style={{ color: muted }}>
        Nadwyżka: {tier.over}
      </div>
      <div className="pricing-card__for" style={{ color: lite ? '#0A0E1A' : '#fff' }}>
        {tier.forWho}
      </div>
      <div className={`pricing-card__divider ${lite ? 'pricing-card__divider--light' : ''}`} />
      <div className="pricing-card__features">
        {tier.features.map((feature) => (
          <div key={feature} className="pricing-card__feature">
            <CheckIcon light={!lite} size={20} accent />
            <span style={{ color: featTxt }}>{feature}</span>
          </div>
        ))}
      </div>
      <a
        href={PRICING_DEMO_URL}
        className={`pricing-card__cta ${lite ? 'pricing-card__cta--filled' : ''}`}
        onClick={(event) => {
          event.preventDefault();
          openCalModal();
        }}
      >
        {tier.cta}
      </a>
    </div>
  );
}
