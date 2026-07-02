import { useState } from 'react';
import {
  BillingPeriod,
  ComparisonCell,
  ComparisonGroup,
  TierKey,
  comparisonGroups,
  formatPrice,
  getDisplayPrice,
  isRowMerged,
  publicPricingTiers,
} from '../data/pricing';
import './PricingComparison.css';

type Props = {
  billingPeriod: BillingPeriod;
};

const tierOrder: TierKey[] = ['starter', 'pro', 'scale'];

function CellValue({ value }: { value: ComparisonCell }) {
  if (value === true) {
    return (
      <span className="comparison-table__cell-inner">
        <span className="comparison-table__check" aria-label="Tak">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M5 12.5 L10 17.5 L19 7"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="comparison-table__cell-inner">
        <span className="comparison-table__dash" aria-label="Nie">
          -
        </span>
      </span>
    );
  }
  return (
    <span className="comparison-table__cell-inner">
      <span>{value}</span>
    </span>
  );
}

function ComparisonTable({ billingPeriod }: { billingPeriod: BillingPeriod }) {
  return (
    <div className="comparison-table__scroll">
      <table className="comparison-table">
        <colgroup>
          <col className="comparison-table__feature-width" />
          <col className="comparison-table__tier-width" span={3} />
        </colgroup>
        <thead className="comparison-table__head">
          <tr>
            <th scope="col" className="comparison-table__feature-col">
              Funkcja
            </th>
            {publicPricingTiers.map((tier) => (
              <th key={tier.id} scope="col" className="comparison-table__tier-col">
                <span className="comparison-table__tier-name">{tier.name}</span>
                <span className="comparison-table__tier-price">
                  {formatPrice(getDisplayPrice(tier.basePrice, billingPeriod))} zł
                  <span className="comparison-table__tier-period"> / mies.</span>
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparisonGroups.map((group) => (
            <GroupRows key={group.title} group={group} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function GroupRows({ group }: { group: ComparisonGroup }) {
  return (
    <>
      <tr className="comparison-table__group-row">
        <th colSpan={4} scope="colgroup">
          {group.title}
        </th>
      </tr>
      {group.rows.map((row) =>
        isRowMerged(row) ? (
          <tr key={row.feature} className="comparison-table__merged-row">
            <td className="comparison-table__feature">{row.feature}</td>
            <td colSpan={3} className="comparison-table__merged-value">
              <span className="comparison-table__cell-inner">
                <CellValue value={row.values.starter} />
                <span className="comparison-table__merged-label">We wszystkich pakietach</span>
              </span>
            </td>
          </tr>
        ) : (
          <tr key={row.feature}>
            <td className="comparison-table__feature">{row.feature}</td>
            {tierOrder.map((key) => (
              <td key={key} className="comparison-table__cell">
                <CellValue value={row.values[key]} />
              </td>
            ))}
          </tr>
        ),
      )}
    </>
  );
}

export default function PricingComparison({ billingPeriod }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="pricing-comparison">
      <button
        type="button"
        className="pricing-comparison__toggle"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? 'Ukryj porównanie pakietów' : 'Porównaj pakiety szczegółowo'}
        <span className={`pricing-comparison__chevron ${open ? 'pricing-comparison__chevron--open' : ''}`}>
          ▾
        </span>
      </button>

      {open && (
        <div className="pricing-comparison__panel">
          <ComparisonTable billingPeriod={billingPeriod} />
        </div>
      )}
    </div>
  );
}
