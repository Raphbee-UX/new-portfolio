"use client";

import Image from "next/image";
import { ArrowDownRight, ArrowUpRight, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export function Hero() {
  const reducedMotion = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  const enter = (delay: number) => ({
    initial: reducedMotion ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease },
  });

  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="hero-grid">
        <div className="hero-intro">
          <motion.p className="hero-greeting" {...enter(0.16)}>Hello, I&apos;m</motion.p>
          <motion.h1 id="hero-title" {...enter(0.22)}>Raphbee<span>.</span></motion.h1>
          <motion.p className="hero-descriptor" {...enter(0.3)}>E-commerce &amp; Automation Specialist</motion.p>
          <motion.p className="hero-copy" {...enter(0.38)}>
            I build digital systems that help businesses operate smarter, reduce friction and create better online experiences.
          </motion.p>
          <motion.div className="hero-links" {...enter(0.46)}>
            <a className="text-link" href="#work">Explore selected work <ArrowUpRight size={16} /></a>
            <a className="text-link muted-link" href="#contact">Start a conversation <ArrowDownRight size={16} /></a>
          </motion.div>
          <motion.p className="location-line" {...enter(0.52)}><MapPin size={14} /> Based in Nigeria · Working worldwide</motion.p>
        </div>

        <motion.div className="portrait-column" {...enter(0.28)}>
          <div className="portrait-frame">
            <Image
              src="/profile_main.png"
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
        </motion.div>

        <aside className="hero-notes" aria-label="Introduction and focus">
          <motion.article className="note-block" {...enter(0.4)}>
            <p className="note-label">01 / MY APPROACH</p>
            <p>Thoughtful digital foundations, practical tools and connected systems that make everyday business easier.</p>
          </motion.article>
          <motion.article className="note-block" {...enter(0.48)}>
            <p className="note-label">02 / WHAT I DO</p>
            <p>E-commerce systems<br />Web development<br />Business automation<br />AI integrations</p>
          </motion.article>
          <motion.article className="note-block" {...enter(0.56)}>
            <p className="note-label">03 / CURRENTLY OPEN TO</p>
            <p>Projects with founders and businesses improving their digital operations, storefronts and customer experience.</p>
          </motion.article>
        </aside>
      </div>
      <div className="hero-bottomline">
        <span>ECOMMERCE · WEB · AUTOMATION · AI</span>
        <span>SCROLL TO EXPLORE <ArrowDownRight size={14} /></span>
      </div>
    </section>
  );
}
