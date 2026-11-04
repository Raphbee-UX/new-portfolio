"use client";

import { useRef } from "react";
import { ArrowUpRight, ShoppingBag, TrendingUp, Workflow } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const services = [
  {
    number: "01",
    title: "E-commerce Development",
    description:
      "Build a stronger storefront with a considered customer experience and the systems behind it.",
    icon: ShoppingBag,
    capabilities: [
      "Shopify store development",
      "Store redesign and optimisation",
      "Product catalogue management",
      "E-commerce setup and integrations",
    ],
  },
  {
    number: "02",
    title: "Paid Growth",
    description:
      "Bring structure to paid campaigns and creative so every decision has a clearer purpose.",
    icon: TrendingUp,
    capabilities: [
      "Meta Ads setup",
      "Campaign structure and management",
      "Ad creative support",
      "Conversion-focused optimisation",
    ],
  },
  {
    number: "03",
    title: "Automation & Integrations",
    description:
      "Connect the tools and repetitive tasks that keep your business moving behind the scenes.",
    icon: Workflow,
    capabilities: [
      "n8n workflow automation",
      "API and webhook integrations",
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
  const inView = useInView(sectionRef, { once: true, amount: 0.16 });
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

      <div className="services-grid">
        {services.map((service, index) => {
          const Icon = service.icon;

          return (
            <motion.article
              className="service-pillar"
              key={service.number}
              custom={index}
              variants={cardVariants}
              initial={reducedMotion ? false : "hidden"}
              animate={reducedMotion ? undefined : inView ? "visible" : "hidden"}
            >
              <div className="service-meta">
                <span className="service-number">{service.number}</span>
                <Icon className="service-icon" size={21} strokeWidth={1.5} aria-hidden="true" />
              </div>

              <h3>{service.title}</h3>
              <p className="service-description">{service.description}</p>

              <ul className="service-capabilities">
                {service.capabilities.map((capability) => (
                  <li key={capability}>{capability}</li>
                ))}
              </ul>

              <span className="service-index" aria-hidden="true">
                <ArrowUpRight size={15} strokeWidth={1.6} />
              </span>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
