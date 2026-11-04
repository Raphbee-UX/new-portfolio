"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronDown, X } from "lucide-react";

const services = [
  {
    id: "ecommerce",
    number: "01",
    category: "BUILD / SERVICE",
    title: "E-commerce Development",
    image: "/images/services/ecommerce-development.jfif",
    imageAlt: "E-commerce development service thumbnail",
    summary: "Set up or refine a storefront that makes products easier to browse and checkout easier to complete.",
    description: "Build or improve the parts of your online store that shape how people discover products, evaluate them and place an order.",
    deliverables: [
      "Shopify store development",
      "Store redesign and optimisation",
      "Product catalogue management",
      "E-commerce setup and integrations",
    ],
    platforms: [
      { name: "Shopify", image: "/images/services/logos/shopify.svg" },
      { name: "WooCommerce", image: "/images/services/logos/woocommerce.svg" },
      { name: "eBay", image: "/images/services/logos/ebay.svg" },
      { name: "Merchant Center", image: "/images/services/logos/google.svg" },
    ],
    suitableFor: "Founders, retailers and growing sellers launching a store, improving an existing storefront or organising a product catalogue.",
    cta: "Let's build your store",
    whatsappMessage: "Hi Raphael! I'm interested in E-commerce Development. I'd like to discuss building or improving my online store.",
  },
  {
    id: "paid-growth",
    number: "02",
    category: "GROW / SERVICE",
    title: "Paid Growth",
    image: "/images/services/paid-growth.jfif",
    imageAlt: "Paid growth and advertising service thumbnail",
    summary: "Give paid social campaigns a clearer structure, stronger creative and a more considered customer journey.",
    description: "Plan and manage paid social campaigns around a clear audience, message and customer journey, with creative support that fits the campaign.",
    deliverables: [
      "Meta Ads setup",
      "Campaign structure and management",
      "Ad creative support",
      "Conversion-focused optimisation",
    ],
    platforms: [
      { name: "Meta", image: "/images/services/logos/meta.svg" },
      { name: "Facebook", image: "/images/services/logos/facebook.svg" },
      { name: "Instagram", image: "/images/services/logos/instagram.svg" },
    ],
    suitableFor: "Businesses ready to launch paid social, bring more structure to current campaigns or improve the connection between ads and landing pages.",
    cta: "Let's grow your business",
    whatsappMessage: "Hi Raphael! I'm interested in Paid Growth. I'd like to discuss Meta Ads, campaign structure and creative support for my business.",
  },
  {
    id: "automation",
    number: "03",
    category: "STREAMLINE / SERVICE",
    title: "Automation & Integrations",
    image: "/images/services/automation-integrations.jfif",
    imageAlt: "Automation and integrations service thumbnail",
    summary: "Connect the tools behind your business so leads and routine processes move with fewer manual hand-offs.",
    description: "Connect the systems your team already uses and automate repetitive steps across enquiries, lead handling and day-to-day operations.",
    deliverables: [
      "n8n workflow automation",
      "API and webhook integrations",
      "Lead and enquiry automation",
      "Business process automation",
    ],
    platforms: [
      { name: "n8n", image: "/images/services/logos/n8n.svg" },
      { name: "OpenAI", image: "/images/services/logos/openai.svg" },
      { name: "Google Sheets", image: "/images/services/logos/googlesheets.svg" },
      { name: "Gmail", image: "/images/services/logos/gmail.svg" },
    ],
    suitableFor: "Small teams and operators handling recurring enquiries, repetitive admin or information that needs to move between tools.",
    cta: "Let's automate your workflow",
    whatsappMessage: "Hi Raphael! I'm interested in Automation & Integrations. I'd like to discuss connecting my tools and automating a business workflow.",
  },
] as const;

type Service = (typeof services)[number];

const cardVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function whatsappUrl(service: Service) {
  return "https://wa.me/447862617335?text=" + encodeURIComponent(service.whatsappMessage);
}

function PlatformMarks({ service }: { service: Service }) {
  return (
    <div
      className="service-platforms"
      aria-label={"Platforms and tools: " + service.platforms.map((platform) => platform.name).join(", ")}
    >
      {service.platforms.map((platform) => (
        <span className="service-platform" key={platform.name}>
          <Image
            className="service-platform-logo"
            src={platform.image}
            alt=""
            width={20}
            height={14}
            aria-hidden="true"
          />
          <span>{platform.name}</span>
        </span>
      ))}
    </div>
  );
}

function ServiceDetails({ service }: { service: Service }) {
  return (
    <div className="service-detail-content">
      <p className="service-detail-description">{service.description}</p>
      <div className="service-detail-grid">
        <section className="service-detail-block">
          <p className="service-detail-label">WHAT I CAN HELP WITH</p>
          <ul className="service-deliverables">
            {service.deliverables.map((deliverable) => <li key={deliverable}>{deliverable}</li>)}
          </ul>
        </section>
        <section className="service-detail-block service-fit-block">
          <p className="service-detail-label">A GOOD FIT FOR</p>
          <p className="service-fit-copy">{service.suitableFor}</p>
        </section>
      </div>
      <a className="service-cta" href={whatsappUrl(service)} target="_blank" rel="noreferrer">
        {service.cta}
        <ArrowUpRight size={15} strokeWidth={1.8} />
      </a>
    </div>
  );
}

export function Services() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLElement | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const mobileScrollPosition = useRef(0);
  const [desktopExpandedId, setDesktopExpandedId] = useState<string | null>(null);
  const [mobileOpenId, setMobileOpenId] = useState<string | null>(null);
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.12 });
  const reducedMotion = useReducedMotion();
  const mobileService = services.find((service) => service.id === mobileOpenId) ?? null;

  useEffect(() => {
    setPortalRoot(document.body);
  }, []);

  useEffect(() => {
    if (!mobileOpenId) return;

    const body = document.body;
    const scrollY = mobileScrollPosition.current;
    const previousBodyStyles = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
    };

    body.style.position = "fixed";
    body.style.top = "-" + scrollY + "px";
    body.style.width = "100%";
    body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpenId(null);
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, a[href], [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    dialogRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      body.style.position = previousBodyStyles.position;
      body.style.top = previousBodyStyles.top;
      body.style.width = previousBodyStyles.width;
      body.style.overflow = previousBodyStyles.overflow;
      window.scrollTo(0, scrollY);
      lastTriggerRef.current?.focus({ preventScroll: true });
    };
  }, [mobileOpenId]);

  function handleCardClick(service: Service, event: MouseEvent<HTMLButtonElement>) {
    if (window.matchMedia("(max-width: 760px)").matches) {
      lastTriggerRef.current = event.currentTarget;
      mobileScrollPosition.current = window.scrollY;
      setMobileOpenId(service.id);
      return;
    }
    setDesktopExpandedId((current) => current === service.id ? null : service.id);
  }

  function closeMobilePanel() {
    setMobileOpenId(null);
  }

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
        {services.map((service, index) => {
          const isExpanded = desktopExpandedId === service.id;
          const isMobileOpen = mobileOpenId === service.id;
          return (
            <motion.article
              layout
              className={"service-entry service-entry-" + (index + 1)}
              key={service.id}
              custom={index}
              variants={cardVariants}
              initial={reducedMotion ? false : "hidden"}
              animate={reducedMotion ? undefined : inView ? "visible" : "hidden"}
            >
              <span className="service-timeline-node" aria-hidden="true">{service.number}</span>
              <div className="service-card">
                <button
                  className="service-card-trigger"
                  type="button"
                  onClick={(event) => handleCardClick(service, event)}
                  aria-expanded={isExpanded || isMobileOpen}
                  aria-controls={(isExpanded || isMobileOpen) ? "service-panel-" + service.id : undefined}
                >
                  <span className="service-image-frame">
                    <Image
                      className="service-thumb-image"
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      sizes="(max-width: 760px) 82vw, (max-width: 1120px) 42vw, 34vw"
                      style={{ objectFit: "contain" }}
                    />
                  </span>
                  <span className="service-detail-meta">
                    <span>{service.category}</span>
                    <span>{service.number}</span>
                  </span>
                  <span className="service-card-title">{service.title}</span>
                  <span className="service-card-summary">{service.summary}</span>
                  <span className="service-open-indicator">
                    <span>{isExpanded ? "Close details" : "Explore service"}</span>
                    <ChevronDown size={15} strokeWidth={1.7} className={isExpanded ? "is-rotated" : ""} />
                  </span>
                </button>

                <PlatformMarks service={service} />

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      id={"service-panel-" + service.id}
                      key={service.id + "-details"}
                      className="service-expanded"
                      initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reducedMotion ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: reducedMotion ? 0 : 0.34, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <ServiceDetails service={service} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.article>
          );
        })}
      </div>

      {portalRoot && createPortal(
        <AnimatePresence>
          {mobileService && (
            <motion.div
              className="service-dialog-backdrop"
              key="service-backdrop"
              initial={reducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reducedMotion ? undefined : { opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.22 }}
              onClick={closeMobilePanel}
            >
              <motion.section
                ref={dialogRef}
                id={"service-panel-" + mobileService.id}
                className="service-dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby={"service-dialog-title-" + mobileService.id}
                tabIndex={-1}
                initial={reducedMotion ? false : { x: "100%" }}
                animate={{ x: 0 }}
                exit={reducedMotion ? undefined : { x: "100%" }}
                transition={{ duration: reducedMotion ? 0 : 0.36, ease: [0.22, 1, 0.36, 1] }}
                onClick={(event) => event.stopPropagation()}
              >
                <div className="service-dialog-inner">
                  <div className="service-dialog-top">
                    <span>SERVICE DETAILS / {mobileService.number}</span>
                    <button
                      className="service-dialog-close"
                      type="button"
                      onClick={closeMobilePanel}
                      aria-label={"Close " + mobileService.title + " details"}
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="service-dialog-image">
                    <Image
                      src={mobileService.image}
                      alt={mobileService.imageAlt}
                      fill
                      sizes="100vw"
                      style={{ objectFit: "contain" }}
                    />
                  </div>

                  <div className="service-dialog-heading">
                    <p className="service-dialog-category">{mobileService.category}</p>
                    <h2 id={"service-dialog-title-" + mobileService.id}>{mobileService.title}</h2>
                    <p>{mobileService.description}</p>
                  </div>

                  <PlatformMarks service={mobileService} />
                  <ServiceDetails service={mobileService} />
                </div>
              </motion.section>
            </motion.div>
          )}
        </AnimatePresence>,
        portalRoot,
      )}
    </section>
  );
}
