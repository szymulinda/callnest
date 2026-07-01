import { useCases } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './UseCases.css';

export default function UseCases() {
  const { ref: headerRef, visible: headerVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="cases" className="use-cases">
      <div className="container">
        <div
          ref={headerRef}
          className={`use-cases__header reveal ${headerVisible ? 'reveal--visible' : ''}`}
        >
          <div className="label label--accent">Zastosowania</div>
          <h2 className="section-title">
            Trzy zadania, które agent przejmuje od pierwszego dnia.
          </h2>
        </div>
        <div className="use-cases__grid">
          {useCases.map((item) => (
            <CaseCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseCard({ title, text }: { title: string; text: string }) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={ref} className={`case-card reveal ${visible ? 'reveal--visible' : ''}`}>
      <div className="case-card__accent" />
      <div className="case-card__body">
        <h3 className="case-card__title">{title}</h3>
        <p className="case-card__text">{text}</p>
      </div>
    </div>
  );
}
