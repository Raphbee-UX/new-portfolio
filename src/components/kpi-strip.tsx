import { Odometer } from "@/components/odometer";
import { kpis } from "@/data/site";

export function KpiStrip() {
  return (
    <section className="proof-section" aria-labelledby="proof-title">
      <div className="proof-heading">
        <h2 id="proof-title">THE PROOF IN NUMBERS</h2>
        <p className="proof-subtitle">Selected work and experience, with figures kept to confirmed records.</p>
      </div>
      <div className="proof-grid">
        {kpis.map((item) => (
          <article className="proof-item" key={item.index}>
            <p className="proof-index">{item.index}</p>
            <p className="proof-value"><Odometer value={item.value} /></p>
            <p className="proof-label">{item.label}</p>
            <p className="proof-source">{item.source}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
