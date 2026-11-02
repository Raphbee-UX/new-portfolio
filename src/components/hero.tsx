import Image from "next/image";
import { ArrowDownRight, ArrowUpRight, MapPin } from "lucide-react";
import { siteConfig } from "@/data/site";

export function Hero() {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="hero-grid">
        <div className="hero-intro">
          <p className="eyebrow">Independent digital specialist <span>·</span> Nigeria / Worldwide</p>
          <h1 id="hero-title">I&apos;m <span>Raphbee.</span><br />I build digital systems that help businesses grow.</h1>
          <p className="hero-copy">
            I bring e-commerce, web development, automation and practical AI together to help businesses work smarter, reduce operational friction and create better online experiences.
          </p>
          <div className="hero-links">
            <a className="text-link" href="#work">Explore selected work <ArrowUpRight size={16} /></a>
            <a className="text-link muted-link" href="#contact">Start a conversation <ArrowDownRight size={16} /></a>
          </div>
          <p className="location-line"><MapPin size={14} /> Based in Nigeria · Working worldwide</p>
        </div>

        <div className="portrait-column">
          <div className="portrait-frame">
            <Image
              src="https://raw.githubusercontent.com/Raphbee-UX/new-portfolio/main/profile_main.jfif"
              alt="Raphael, known professionally as Raphbee"
              fill
              priority
              sizes="(max-width: 760px) 82vw, (max-width: 1100px) 40vw, 32vw"
              className="portrait-image"
            />
          </div>
          <div className="portrait-caption">
            <span>RAPHBEE</span>
            <span>BUILD WITH INTENTION</span>
          </div>
        </div>

        <aside className="hero-notes" aria-label="Introduction and focus">
          <article className="note-block">
            <p className="note-label">01 / MY APPROACH</p>
            <p>Thoughtful digital foundations. Practical tools. Connected systems that make everyday business easier.</p>
          </article>
          <article className="note-block">
            <p className="note-label">02 / WHAT I DO</p>
            <p>E-commerce systems<br />Web development<br />Business automation<br />AI integrations</p>
          </article>
          <article className="note-block">
            <p className="note-label">03 / CURRENTLY OPEN TO</p>
            <p>Working with founders, businesses and teams ready to improve their digital operations and customer experience.</p>
          </article>
        </aside>
      </div>
      <div className="hero-bottomline">
        <span>ECOMMERCE · WEB · AUTOMATION · AI</span>
        <span>SCROLL TO EXPLORE <ArrowDownRight size={14} /></span>
      </div>
    </section>
  );
}
