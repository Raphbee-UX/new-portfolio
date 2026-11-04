"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const services = [
  {
    number: "01",
    category: "BUILD / SERVICE",
    visualTitle: "SHOPIFY",
    visualSubtitle: "STOREFRONTS · E-COMMERCE",
    title: "E-commerce Development",
    description:
      "Thoughtful online stores built to make shopping simpler, strengthen your brand and support business growth.",
    capabilities: [
      "Shopify development",
      "Store redesign",
      "Catalogue management",
      "E-commerce integrations",
    ],
  },
  {
    number: "02",
    category: "GROW / SERVICE",
    visualTitle: "PAID GROWTH",
    visualSubtitle: "META ADS · CONVERSION",
    title: "Paid Growth",
    description:
      "Structured campaigns and considered creative that help your business reach the right people and turn attention into action.",
    capabilities: [
      "Meta Ads setup",
      "Campaign management",
      "Ad creative support",
      "Conversion optimisation",
    ],
  },
  {
    number: "03",
    category: "STREAMLINE / SERVICE",
    visualTitle: "AI + FLOW",
    visualSubtitle: "AUTOMATION · INTEGRATIONS",
    title: "Automation & Integrations",
    description:
      "Connected tools and practical workflows that reduce repetitive work and keep leads and business processes moving.",
    capabilities: [
      "n8n workflow automation",
      "API & webhook integrations",
      "Lead and enquiry automation",
      "Business process automation",
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.12 });
  const reducedMotion = useReducedMotion();

  return (
    <section ref={sectionRef} className="services-section" aria-labelledby="services-title">
      <div className="services-intro">
        <div>
          <p className="services-eyebrow">WHAT I DO</p>
          <h2 id="services-title">Services built around your business.</h2>
        </div>
        <p className="services-summary">
          E-commerce, paid growth and automation brought together to help businesses build,
          grow and streamline their online operations.
        </p>
      </div>

      <div className="services-timeline">
        <span className="services-timeline-line" aria-hidden="true" />
        {services.map((service, index) => (
          <motion.article
            className={`service-entry service-entry-${index + 1}`}
            key={service.number}
            custom={index}
            variants={cardVariants}
            initial={reducedMotion ? false : "hidden"}
            animate={reducedMotion ? undefined : inView ? "visible" : "hidden"}
          >
            <span className="service-timeline-node" aria-hidden="true">{service.number}</span>
            <div className="service-card">
              <div className="service-visual">
                <span className="service-visual-count">{service.number} / 03</span>
                <div className="service-visual-copy">
                  <span className="service-visual-title">{service.visualTitle}</span>
                  <span className="service-visual-subtitle">{service.visualSubtitle}</span>
                </div>
                <span className="service-visual-arrow" aria-hidden="true">
                  <ArrowUpRight size={16} strokeWidth={1.5} />
                </span>
              </div>
              <div className="service-detail-meta">
                <span>{service.category}</span>
                <span>{service.number}</span>
              </div>
              <h3>{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <ul className="service-capabilities">
                {service.capabilities.map((capability) => (
                  <li key={capability}>{capability}</li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
