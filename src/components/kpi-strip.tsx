import { Odometer } from "@/components/odometer";
import { kpis } from "@/data/site";

export function KpiStrip() {
  return (
    <section className="proof-section" aria-labelledby="proof-title">
      <div className="proof-heading">
        <div>
          <p className="eyebrow">A snapshot of the work</p>
          <h2 id="proof-title">THE PROOF IN NUMBERS<span>.</span></h2>
        </div>
        <p className="proof-subtitle">Eliminating friction.<br />Accelerating operations.<br />Supporting better growth.</p>
      </div>
      <div className="proof-grid">
        {kpis.map((item) => (
          <article className="proof-item" key={item.index}>
            <p className="proof-index">{item.index}</p>
            <p className="proof-value"><Odometer value={item.value} /></p>
            <p className="proof-label">{item.label}</p>
            <p className="proof-context">{item.context}</p>
          </article>
        ))}
      </div>
      <p className="proof-disclaimer">Working figures supplied for the initial design — descriptions and outcome claims require Raphbee&apos;s confirmation before publication.</p>
    </section>
  );
}
