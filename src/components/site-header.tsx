"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu } from "lucide-react";

const links = [
  ["Work", "#work"],
  ["About", "#about"],
  ["Services", "#services"],
  ["Estimate", "#estimate"],
  ["Process", "#process"],
  ["Testimonials", "#testimonials"],
  ["FAQ", "#faq"],
] as const;

export function SiteHeader() {
  return (
    <div className="header-wrap">
      <header className="site-nav" aria-label="Main navigation">
        <Link href="/" className="brand-mark" aria-label="Raphbee home">
          <Image src="/Raphbee_logo_black_version.png" alt="Raphbee" width={132} height={42} priority />
        </Link>
        <nav className="desktop-links" aria-label="Main">
          {links.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}
        </nav>
        <div className="nav-actions">
          <span className="availability"><i aria-hidden="true" />Open to projects</span>
          <Link href="#contact" className="talk-button">Let&apos;s talk <ArrowUpRight size={14} /></Link>
        </div>
        <details className="mobile-menu">
          <summary aria-label="Open navigation"><Menu size={19} /></summary>
          <nav aria-label="Mobile">
            {links.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}
            <Link href="#contact">Let&apos;s talk <ArrowUpRight size={14} /></Link>
          </nav>
        </details>
      </header>
    </div>
  );
}
