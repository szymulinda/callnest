import { steps } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './HowItWorks.css';

export default function HowItWorks() {
  const { ref: headerRef, visible: headerVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="how" className="how">
      <div className="container">
        <div
          ref={headerRef}
          className={`how__header reveal ${headerVisible ? 'reveal--visible' : ''}`}
        >
          <div className="label label--accent">Jak to działa</div>
          <h2 className="section-title">
            Od pierwszej rozmowy do działającego agenta - w 48 godzin.
          </h2>
        </div>
        <div className="how__grid">
          {steps.map((step) => (
            <StepCard key={step.num} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({
  num,
  title,
  text,
}: {
  num: string;
  title: string;
  text: string;
}) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={ref} className={`step reveal ${visible ? 'reveal--visible' : ''}`}>
      <div className="step__num">{num}</div>
      <h3 className="step__title">{title}</h3>
      <p className="step__text">{text}</p>
    </div>
  );
}
