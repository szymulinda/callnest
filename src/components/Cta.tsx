import { useScrollReveal } from '../hooks/useScrollReveal';
import { openCalModal } from '../booking/cal';
import './Cta.css';

export default function Cta() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="cta" className="cta">
      <div ref={ref} className={`cta__inner reveal ${visible ? 'reveal--visible' : ''}`}>
        <h2 className="cta__title">Gotowy, żeby przestać tracić klientów?</h2>
        <p className="cta__text">
          Umów 15-minutowe demo. Pokażemy Ci żywego agenta zasilonego danymi Twojej firmy
          - nie slajdy.
        </p>
        <a
          href="mailto:jurkunszymon@gmail.com"
          className="btn btn--accent btn--cta"
          onClick={(event) => {
            event.preventDefault();
            openCalModal();
          }}
        >
          Umów demo
        </a>
        <p className="cta__trust">
          <span>Zgodne z PKE i RODO</span>
          <span className="cta__trust-sep" aria-hidden="true">
            ·
          </span>
          <span>Polski głos i obsługa</span>
          <span className="cta__trust-sep" aria-hidden="true">
            ·
          </span>
          <span>Wdrożenie w 48h</span>
        </p>
      </div>
    </section>
  );
}
