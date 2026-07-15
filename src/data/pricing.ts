/** Link do formularza / kalendarza demo - podmień na docelowy URL. */
export const PRICING_DEMO_URL = '#cta';

export type BillingPeriod = 'monthly' | 'annual';

export type TierKey = 'starter' | 'pro' | 'scale';

export type PublicPricingTier = {
  id: TierKey;
  name: string;
  /** Kwota ostateczna (brutto) wyświetlana w cenniku — bez osobnego przeliczania VAT. */
  price: number;
  limit: string;
  over: string;
  forWho: string;
  features: string[];
  cta: string;
  highlight: boolean;
};

export const publicPricingTiers: PublicPricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 1100,
    limit: '600 minut miesięcznie',
    over: '0,65 zł/min',
    forWho: 'Małe studia detailingu, warsztaty samochodowe',
    features: [
      'Odbiór połączeń 24/7',
      'FAQ i kwalifikacja rozmówcy',
      'Zbieranie zgłoszeń i przekazanie SMS-em',
      'Raport tygodniowy na WhatsApp',
    ],
    cta: 'Umów demo',
    highlight: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 1600,
    limit: '1 200 minut miesięcznie',
    over: '0,60 zł/min',
    forWho: 'Większe studia detailingu, warsztaty wielostanowiskowe',
    features: [
      'Wszystko ze Starter',
      'Personalizacja pod pełną ofertę usług (marka, model, zakres, opis)',
      'Obsługa wielu pojazdów i typów zgłoszeń (auto, motocykl, flota)',
      'Raport tygodniowy z wyliczonym ROI',
      'Priorytetowe wsparcie techniczne',
    ],
    cta: 'Umów demo',
    highlight: true,
  },
  {
    id: 'scale',
    name: 'Scale',
    price: 2800,
    limit: '2 500 minut miesięcznie',
    over: '0,55 zł/min',
    forWho: 'Sieci warsztatów, duże studia detailingu, flota B2B',
    features: [
      'Wszystko z Pro',
      'Dedykowana integracja API / systemy zewnętrzne',
      'Kwalifikacja i priorytetyzacja zgłoszeń wg wartości zlecenia',
      'SLA 99,5% uptime gwarantowany',
      'Miesięczny call optymalizacyjny',
      'Dedykowany opiekun wdrożenia',
    ],
    cta: 'Zarezerwuj wdrożenie',
    highlight: false,
  },
];

export const pricingFooterNote =
  'Wdrożenie jednorazowo 1 200 zł - lub bez opłaty startowej przy podpisaniu umowy na 3 miesiące. Infrastruktura wliczona.';

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('pl-PL').format(amount);
}

export function getDisplayPrice(price: number, period: BillingPeriod): number {
  if (period === 'monthly') return price;
  return Math.round(price * 0.85);
}

export type ComparisonCell = string | boolean;

export type ComparisonRow = {
  feature: string;
  values: Record<TierKey, ComparisonCell>;
};

export type ComparisonGroup = {
  title: string;
  rows: ComparisonRow[];
};

export const comparisonGroups: ComparisonGroup[] = [
  {
    title: 'Obsługa połączeń',
    rows: [
      {
        feature: 'Odbiór połączeń 24/7',
        values: { starter: true, pro: true, scale: true },
      },
      {
        feature: 'FAQ i kwalifikacja rozmówcy',
        values: { starter: true, pro: true, scale: true },
      },
      {
        feature: 'Umawianie i potwierdzanie wizyt',
        values: { starter: true, pro: true, scale: true },
      },
      {
        feature: 'Obsługa złożonych rezerwacji (wiele usług/pracowników jednocześnie)',
        values: { starter: false, pro: true, scale: true },
      },
      {
        feature: 'Przekładanie i odwoływanie wizyt',
        values: { starter: false, pro: true, scale: true },
      },
      {
        feature: 'Automatyczne przypomnienia o wizytach (dla obecnych klientów)',
        values: { starter: false, pro: false, scale: true },
      },
    ],
  },
  {
    title: 'Integracje',
    rows: [
      {
        feature: 'Google Calendar',
        values: { starter: true, pro: true, scale: true },
      },
      {
        feature: 'Booksy / Versum / Calendly',
        values: { starter: false, pro: true, scale: true },
      },
      {
        feature: 'Dedykowana integracja API / systemy zewnętrzne',
        values: { starter: false, pro: false, scale: true },
      },
    ],
  },
  {
    title: 'Raportowanie',
    rows: [
      {
        feature: 'Raport tygodniowy na WhatsApp',
        values: { starter: true, pro: true, scale: true },
      },
      {
        feature: 'Raport miesięczny z wyliczonym ROI',
        values: { starter: false, pro: true, scale: true },
      },
      {
        feature: 'Miesięczny call optymalizacyjny',
        values: { starter: false, pro: false, scale: true },
      },
    ],
  },
  {
    title: 'Wsparcie',
    rows: [
      {
        feature: 'Priorytetowe wsparcie techniczne',
        values: { starter: false, pro: true, scale: true },
      },
      {
        feature: 'SLA 99,5% uptime gwarantowany',
        values: { starter: false, pro: false, scale: true },
      },
      {
        feature: 'Dedykowany opiekun wdrożenia',
        values: { starter: false, pro: false, scale: true },
      },
    ],
  },
];

export function isRowMerged(row: ComparisonRow): boolean {
  const { starter, pro, scale } = row.values;
  return starter === pro && pro === scale;
}
