import { industries } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Industries.css';

export default function Industries() {
  const { ref: leftRef, visible: leftVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: rightRef, visible: rightVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section className="industries">
      <div className="container industries__grid">
        <div
          ref={leftRef}
          className={`reveal ${leftVisible ? 'reveal--visible' : ''}`}
        >
          <div className="label label--muted">Branże</div>
          <h2 className="section-title industries__title">
            Tworzymy agentów dla biznesów, w których liczy się każda rozmowa.
          </h2>
        </div>
        <div
          ref={rightRef}
          className={`industries__tags reveal ${rightVisible ? 'reveal--visible' : ''}`}
        >
          {industries.map((name) => (
            <span key={name} className="industries__tag">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
