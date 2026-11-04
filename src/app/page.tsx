import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { KpiStrip } from "@/components/kpi-strip";
import { Projects } from "@/components/projects";
import { Services } from "@/components/services";
import { WhatsAppContact } from "@/components/whatsapp-contact";

export default function Home() {
  return (
    <main className="homepage">
      <div className="portfolio-wordmark" aria-hidden="true">PORTFOLIO</div>
      <SiteHeader />
      <Hero />
      <KpiStrip />
      <Projects />
      <Services />
      <WhatsAppContact />
    </main>
  );
}
