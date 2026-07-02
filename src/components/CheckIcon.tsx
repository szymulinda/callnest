type CheckIconProps = {
  light?: boolean;
  size?: number;
  /* [EKSPERYMENT] Ciepły akcent tła checka - używane tylko w cenniku */
  accent?: boolean;
};

export default function CheckIcon({ light = false, size = 22, accent = false }: CheckIconProps) {
  return (
    <span
      className="check-icon"
      style={{
        width: size,
        height: size,
        background: accent ? 'var(--accent-warm)' : light ? 'rgba(255,255,255,0.12)' : '#0d1b3e',
      }}
    >
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M5 12.5 L10 17.5 L19 7"
          stroke="#fff"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
