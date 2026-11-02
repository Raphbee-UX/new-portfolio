import { kpis } from "@/data/site";

export function KpiStrip() {
  return (
    <section aria-label="Selected work statistics" className="border-y border-black/10 bg-white/30">
      <div className="container-shell grid grid-cols-2 divide-x divide-y divide-black/10 sm:grid-cols-4 sm:divide-y-0">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="min-h-[132px] px-4 py-7 first:pl-0 sm:px-7 lg:py-8">
            <p className="font-display text-3xl font-medium tracking-[-0.05em] sm:text-4xl">{kpi.value}</p>
            <p className="mt-2 text-sm font-semibold">{kpi.label}</p>
            <p className="mt-1 text-[11px] leading-4 text-[var(--muted)]">{kpi.source}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
