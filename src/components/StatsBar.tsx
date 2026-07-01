import { stats } from '../data/content';
import { useCountUp, useScrollReveal } from '../hooks/useScrollReveal';
import './StatsBar.css';

function StatItem({
  count,
  suffix,
  text,
}: {
  count: number;
  suffix: string;
  text: string;
}) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();
  const value = useCountUp(count, visible);

  return (
    <div ref={ref} className={`stat reveal ${visible ? 'reveal--visible' : ''}`}>
      <div className="stat__number">
        <span>{value}</span>
        <span className="stat__suffix">{suffix}</span>
      </div>
      <p className="stat__text">{text}</p>
    </div>
  );
}

export default function StatsBar() {
  return (
    <section className="stats-bar">
      <div className="container stats-bar__grid">
        {stats.map((stat) => (
          <StatItem key={stat.suffix + stat.count} {...stat} />
        ))}
      </div>
    </section>
  );
}
