import Image from "next/image";
import { ArrowDownRight, ArrowUpRight, MapPin } from "lucide-react";

export function Hero() {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="hero-grid">
        <div className="hero-intro">
          <p className="hero-greeting">Hello, I&apos;m</p>
          <h1 id="hero-title">Raphbee<span>.</span></h1>
          <p className="hero-descriptor">E-commerce &amp; Automation Specialist</p>
          <p className="hero-copy">
            I build digital systems that help businesses operate smarter, reduce friction and create better online experiences.
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
            <p>Thoughtful digital foundations, practical tools and connected systems that make everyday business easier.</p>
          </article>
          <article className="note-block">
            <p className="note-label">02 / WHAT I DO</p>
            <p>E-commerce systems<br />Web development<br />Business automation<br />AI integrations</p>
          </article>
          <article className="note-block">
            <p className="note-label">03 / CURRENTLY OPEN TO</p>
            <p>Projects with founders and businesses improving their digital operations, storefronts and customer experience.</p>
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
