"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
const links = [["Work","#work"],["About","#about"],["Services","#services"],["Estimate","#estimate"],["Process","#process"],["Testimonials","#testimonials"],["FAQ","#faq"]] as const;
export function SiteHeader() {
 const reducedMotion = useReducedMotion();
 return <div className="header-wrap">
  <motion.header className="site-nav" aria-label="Main navigation" initial={reducedMotion ? false : {opacity:0,y:-12}} animate={{opacity:1,y:0}} transition={{duration:.55,ease:[.22,1,.36,1]}}>
   <Link href="/" className="brand-mark" aria-label="Raphbee home"><Image src="/logo_white.png" alt="Raphbee" width={132} height={42} priority /></Link>
   <nav className="desktop-links" aria-label="Main">{links.map(([label,href])=><Link key={label} href={href}>{label}</Link>)}</nav>
   <div className="nav-actions">
    <div className="availability-stack">
     <span className="availability"><i aria-hidden="true" />Open to projects</span>
     <div className="header-contact-links">
      <a href="https://www.upwork.com/freelancers/~010976d055baaeefef" target="_blank" rel="noreferrer"><ArrowUpRight size={12} aria-hidden="true" /> Upwork</a>
      <a href="mailto:raphaelolayeye@gmail.com">Mail</a>
     </div>
    </div>
    <Link href="#contact" className="talk-button">Let&apos;s talk <ArrowUpRight size={14} /></Link>
   </div>
   <a className="mobile-upwork-link" href="https://www.upwork.com/freelancers/~010976d055baaeefef" target="_blank" rel="noreferrer" aria-label="Visit my Upwork profile">
    <span className="mobile-upwork-label">Hire on:</span><Image src="/upwork-logo.png" alt="Upwork" width={34} height={34} />
   </a>
   <details className="mobile-menu">
    <summary aria-label="Open navigation"><Menu size={19} /></summary>
    <nav aria-label="Mobile">{links.map(([label,href])=><Link key={label} href={href}>{label}</Link>)}<Link href="#contact">Let&apos;s talk <ArrowUpRight size={14} /></Link></nav>
   </details>
  </motion.header>
 </div>;
}