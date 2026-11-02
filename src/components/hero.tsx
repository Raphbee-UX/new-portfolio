"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowRight, MapPin, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/site";

const portraitSrc =
  "https://raw.githubusercontent.com/Raphbee-UX/new-portfolio/main/profile_main.jfif";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-5 sm:pt-7">
      <div className="container-shell">
        <header className="flex items-center justify-between border-b border-black/10 pb-4">
          <Link href="/" aria-label="Raphbee home" className="font-display text-xl font-bold tracking-[-0.04em]">
            Raphbee<span className="text-[var(--accent)]">.</span>
          </Link>
          <div className="flex items-center gap-2 rounded-full border border-black/10 bg-white/35 px-3 py-2 text-xs font-semibold">
            <span className="h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_0_4px_rgba(255,66,157,.12)]" aria-hidden="true" />
            {siteConfig.availability}
          </div>
        </header>

        <div className="grid min-h-[calc(100vh-92px)] items-center gap-12 py-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-20 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="eyebrow mb-6 flex items-center gap-2">
              <Sparkles size={14} aria-hidden="true" />
              {siteConfig.descriptor}
            </div>
            <h1 className="font-display text-[clamp(3.25rem,7.2vw,7.4rem)] font-medium leading-[0.91] tracking-[-0.065em]">
              Building digital systems that help businesses grow.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg sm:leading-8">
              {siteConfig.intro}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="#work" className="button-primary">
                View my work <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link href="#contact" className="button-secondary">
                Discuss a project <ArrowDownRight size={17} aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[var(--muted)]">
              <span className="inline-flex items-center gap-2">
                <MapPin size={15} aria-hidden="true" /> Nigeria · Worldwide
              </span>
              <span>Remote collaboration</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-[520px] lg:justify-self-end"
          >
            <div className="absolute -inset-8 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,66,157,.22),transparent_68%)] blur-2xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[32px] border border-black/10 bg-[#ded8cf] p-3 shadow-[var(--shadow-soft)]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-[#cfc8be]">
                <Image
                  src={portraitSrc}
                  alt="Raphael, known professionally as Raphbee"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-x-4 bottom-4 flex items-end justify-between rounded-2xl border border-white/25 bg-black/45 p-4 text-white backdrop-blur-md">
                  <div>
                    <p className="text-sm font-semibold">Raphbee</p>
                    <p className="mt-0.5 text-xs text-white/70">E-commerce & Automation</p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-black">NG · Remote</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
