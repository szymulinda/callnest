import { useState } from 'react';
import Equalizer from './Equalizer';
import { openCalModal } from '../booking/cal';
import './Hero.css';

export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioAvailable, setAudioAvailable] = useState(true);

  const handleDemoToggle = () => {
    if (!audioAvailable) return;
    setIsPlaying((playing) => !playing);
  };

  return (
    <header className="hero">
      <div className="container hero__grid">
        <div className="hero__content">
          <div className="hero__badge label label--muted">
            <span className="hero__badge-dot" />
            Głosowi agenci AI dla MŚP
          </div>
          <h1 className="hero__title">
            Twoja firma nigdy więcej nie przegapi połączenia.
          </h1>
          <p className="hero__text">
            Projektujemy, wdrażamy i prowadzimy głosowego agenta, który odbiera telefony,
            umawia wizyty i odpowiada na pytania - 24 godziny na dobę. Jedna faktura.
            Pełna odpowiedzialność po naszej stronie.
          </p>
          <p className="hero__trust">
            <span>Zgodne z PKE i RODO</span>
            <span className="hero__trust-sep" aria-hidden="true">
              ·
            </span>
            <span>Polskie serwery</span>
            <span className="hero__trust-sep" aria-hidden="true">
              ·
            </span>
            <span>Polski głos i obsługa</span>
          </p>
          <div className="hero__actions">
            <a
              href="#cta"
              className="btn btn--white"
              onClick={(event) => {
                event.preventDefault();
                openCalModal();
              }}
            >
              Umów 15-minutowe demo
            </a>
            <button type="button" className="btn btn--ghost" onClick={handleDemoToggle}>
              Zobacz jak działa
            </button>
          </div>
        </div>
        <div className="hero__visual">
          <Equalizer
            isPlaying={isPlaying}
            onPlayingChange={setIsPlaying}
            onAudioAvailableChange={setAudioAvailable}
          />
        </div>
      </div>
    </header>
  );
}
