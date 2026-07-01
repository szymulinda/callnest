import { useEffect, useRef, useState } from 'react';
import './Equalizer.css';

const DEMO_AUDIO_SRC = '/audio/demo-salon.mp3';

const BAR_COUNT = 28;
const SIZE_SCALE = 1.2;
const MAX_H = Math.round(188 * SIZE_SCALE);
const MIN_H = Math.round(10 * SIZE_SCALE);

function getBarHeight(index: number): number {
  const x = index / (BAR_COUNT - 1);
  const env = Math.pow(Math.sin(Math.PI * x), 0.7);
  const r = 0.5 + 0.5 * Math.sin(index * 1.93 + Math.sin(index * 0.7) * 2.1);
  const r2 = 0.5 + 0.5 * Math.sin(index * 0.53 + 1.3);
  let factor = Math.pow(r * 0.7 + r2 * 0.3, 1.3);
  const centreBoost = Math.pow(Math.sin(Math.PI * x), 2);
  factor = Math.max(factor, 0.4 * centreBoost);
  return Math.round(MIN_H + (MAX_H - MIN_H) * env * factor);
}

interface EqualizerProps {
  isPlaying: boolean;
  onPlayingChange: (playing: boolean) => void;
  onAudioAvailableChange?: (available: boolean) => void;
}

export default function Equalizer({
  isPlaying,
  onPlayingChange,
  onAudioAvailableChange,
}: EqualizerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioAvailable, setAudioAvailable] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioAvailable) return;

    if (isPlaying) {
      void audio.play().catch(() => {
        setAudioAvailable(false);
        onAudioAvailableChange?.(false);
        onPlayingChange(false);
      });
    } else {
      audio.pause();
    }
  }, [audioAvailable, isPlaying, onAudioAvailableChange, onPlayingChange]);

  const handleToggle = () => {
    if (!audioAvailable) return;
    onPlayingChange(!isPlaying);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    }
  };

  const handlePlayButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    handleToggle();
  };

  const handleAudioError = () => {
    setAudioAvailable(false);
    onAudioAvailableChange?.(false);
    onPlayingChange(false);
  };

  const handleAudioEnded = () => {
    onPlayingChange(false);
  };

  return (
    <div className="equalizer-wrap">
      <audio
        ref={audioRef}
        src={DEMO_AUDIO_SRC}
        preload="none"
        onError={handleAudioError}
        onEnded={handleAudioEnded}
      />
      <div
        className="equalizer"
        style={{ height: MAX_H }}
        role="button"
        tabIndex={0}
        aria-label={
          isPlaying
            ? 'Zatrzymaj próbkę rozmowy agenta'
            : 'Odtwórz próbkę rozmowy agenta'
        }
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
      >
        {Array.from({ length: BAR_COUNT }, (_, i) => (
          <div
            key={i}
            className="equalizer__bar"
            style={{
              height: getBarHeight(i),
              animationDuration: `${3.2 + (i % 6) * 0.45}s`,
              animationDelay: `-${(i * 0.13).toFixed(2)}s`,
            }}
          />
        ))}
        {audioAvailable && (
          <button
            type="button"
            className="equalizer__play"
            onClick={handlePlayButtonClick}
            aria-label={
              isPlaying
                ? 'Zatrzymaj próbkę rozmowy agenta'
                : 'Odtwórz próbkę rozmowy agenta'
            }
          >
            {isPlaying ? (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
                <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5.5v13l11-6.5L8 5.5z" fill="currentColor" />
              </svg>
            )}
          </button>
        )}
      </div>
      <p className="equalizer__caption" aria-live="polite">
        {isPlaying ? 'Trwa odtwarzanie...' : 'Posłuchaj, jak rozmawia nasz agent'}
      </p>
    </div>
  );
}
