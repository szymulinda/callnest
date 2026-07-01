import { benefits } from '../data/content';
import { useScrollReveal } from '../hooks/useScrollReveal';
import CheckIcon from './CheckIcon';
import './CheckIcon.css';
import './WhyCallnest.css';

export default function WhyCallnest() {
  const { ref: leftRef, visible: leftVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: rightRef, visible: rightVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section className="why">
      <div className="container why__grid">
        <div ref={leftRef} className={`reveal ${leftVisible ? 'reveal--visible' : ''}`}>
          <div className="label label--accent">Dlaczego Callnest</div>
          <blockquote className="why__quote">
            „Nie sprzedajemy technologii. Bierzemy odpowiedzialność za to, że żaden Twój
            klient nie zostaje bez odpowiedzi."
          </blockquote>
        </div>
        <div
          ref={rightRef}
          className={`why__list reveal ${rightVisible ? 'reveal--visible' : ''}`}
        >
          {benefits.map(([title, text]) => (
            <div key={title} className="why__item">
              <CheckIcon />
              <div>
                <div className="why__item-title">{title}</div>
                <div className="why__item-text">{text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
