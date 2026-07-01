type LogoProps = {
  color?: string;
  size?: number;
};

export default function Logo({ color = '#0D1B3E', size = 30 }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden>
      <path
        d="M6 19 L18 8 L24 13.5"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 17 V31 H21 V31"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27 13 a8 8 0 0 1 0 14"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity={0.9}
      />
      <path
        d="M30.5 9.5 a13 13 0 0 1 0 21"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity={0.55}
      />
      <path
        d="M34 6 a18 18 0 0 1 0 28"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity={0.25}
      />
    </svg>
  );
}
