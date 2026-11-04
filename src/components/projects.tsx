"use client";

import Image, { type StaticImageData } from "next/image";
import { createPortal } from "react-dom";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type MouseEvent,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  X,
} from "lucide-react";

import amieshaMockup from "../../amiesha-store.jpg";
import jesusSpiritMockup from "../../jesuspirit.jpg";
import minaShopMockup from "../../mina-shop.jpg";
import zestyPawsMockup from "../../zesty-paws.jpg";

type Project = {
  id: string;
  number: string;
  name: string;
  category: string;
  summary: string;
  url: string;
  image: StaticImageData;
  overview: string;
  context: string;
  role: string;
  work: string;
  platforms: string;
};

const projects: Project[] = [
  {
    id: "amiesha",
    number: "01",
    name: "Amiesha's Store",
    category: "Multi-category online retail",
    summary: "A broad online store featuring products across home, fitness, accessories and everyday essentials.",
    url: "https://amieshasstore.com/",
    image: amieshaMockup,
    overview: "Project overview to be added.",
    context: "A multi-category online retail storefront.",
    role: "Role and contribution details to be added.",
    work: "Work completed details to be added.",
    platforms: "Platform and tool details have not been verified.",
  },
  {
    id: "jesus-spirit",
    number: "02",
    name: "Jesus Spirit",
    category: "Faith-inspired gifts and lifestyle",
    summary: "An online store centred on faith-inspired gifts, apparel, accessories and homeware.",
    url: "https://jesuspirit.com/",
    image: jesusSpiritMockup,
    overview: "Project overview to be added.",
    context: "A faith-inspired gifts and lifestyle storefront.",
    role: "Role and contribution details to be added.",
    work: "Work completed details to be added.",
    platforms: "Platform and tool details have not been verified.",
  },
  {
    id: "mina-shop",
    number: "03",
    name: "Mina Shop",
    category: "Online retail",
    summary: "An online retail storefront. More specific project context will be added after confirmation.",
    url: "https://minashop.ca/",
    image: minaShopMockup,
    overview: "Project overview to be added.",
    context: "Online retail. More specific business context is to be confirmed.",
    role: "Role and contribution details to be added.",
    work: "Work completed details to be added.",
    platforms: "Platform and tool details have not been verified.",
  },
  {
    id: "zesty-paws",
    number: "04",
    name: "Zesty Paws",
    category: "Pet wellness and supplements",
    summary: "A pet wellness storefront featuring products for dogs and cats.",
    url: "https://zestypaws.com/",
    image: zestyPawsMockup,
    overview: "Project overview to be added.",
    context: "A pet wellness brand with products for dogs and cats.",
    role: "Role and contribution details to be added.",
    work: "Work completed details to be added.",
    platforms: "Platform and tool details have not been verified.",
  },
];

const subscribeToNothing = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;
const totalPages = projects.length - 2;

function ProjectImage({
  project,
  className = "",
  sizes = "(max-width: 760px) 33vw, 32vw",
}: {
  project: Project;
  className?: string;
  sizes?: string;
}) {
  return (
    <div className={"project-image-stage " + className}>
      <Image
        className="project-mockup"
        src={project.image}
        alt={project.name + " website mockup"}
        fill
        sizes={sizes}
        style={{ objectFit: "contain" }}
        priority={project.id === "amiesha"}
      />
    </div>
  );
}

function ProjectDetails({ project }: { project: Project }) {
  return (
    <div className="project-detail-content">
      <p className="project-detail-summary">{project.summary}</p>

      <div className="project-detail-fields">
        <section className="project-detail-field project-detail-field-wide">
          <h4>Project overview</h4>
          <p>{project.overview}</p>
        </section>
        <section className="project-detail-field">
          <h4>Website / business context</h4>
          <p>{project.context}</p>
        </section>
        <section className="project-detail-field">
          <h4>My role and contribution</h4>
          <p>{project.role}</p>
        </section>
        <section className="project-detail-field">
          <h4>Work completed</h4>
          <p>{project.work}</p>
        </section>
        <section className="project-detail-field">
          <h4>Platforms and tools</h4>
          <p>{project.platforms}</p>
        </section>
      </div>

      <a
        className="project-live-link project-detail-live-link"
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        Visit live website
        <ExternalLink size={14} strokeWidth={1.8} />
      </a>
    </div>
  );
}

export function Projects() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLElement | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const modalScrollPosition = useRef(0);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activePage, setActivePage] = useState(0);

  const canUsePortal = useSyncExternalStore(
    subscribeToNothing,
    getClientSnapshot,
    getServerSnapshot,
  );
  const reducedMotion = useReducedMotion();

  function goToPage(page: number) {
    const safePage = Math.max(0, Math.min(totalPages - 1, page));
    const carousel = carouselRef.current;
    if (!carousel) return;

    const cardStep = carousel.clientWidth / 3;
    carousel.scrollTo({
      left: safePage * cardStep,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }

  function handleCarouselScroll() {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const cardStep = carousel.clientWidth / 3;
    if (!cardStep) return;

    const page = Math.max(
      0,
      Math.min(totalPages - 1, Math.round(carousel.scrollLeft / cardStep)),
    );
    setActivePage((current) => current === page ? current : page);
  }

  function openProject(project: Project, event: MouseEvent<HTMLButtonElement>) {
    lastTriggerRef.current = event.currentTarget;
    modalScrollPosition.current = window.scrollY;
    setSelectedProject(project);
  }

  function closeProject() {
    setSelectedProject(null);
  }

  useEffect(() => {
    if (!selectedProject) return;

    const body = document.body;
    const scrollY = modalScrollPosition.current;
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
        setSelectedProject(null);
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
    dialogRef.current?.querySelector<HTMLButtonElement>(".project-dialog-close")?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      body.style.position = previousBodyStyles.position;
      body.style.top = previousBodyStyles.top;
      body.style.width = previousBodyStyles.width;
      body.style.overflow = previousBodyStyles.overflow;
      window.scrollTo(0, scrollY);
      lastTriggerRef.current?.focus({ preventScroll: true });
    };
  }, [selectedProject]);

  return (
    <section
      ref={sectionRef}
      className="projects-section"
      id="work"
      aria-labelledby="projects-title"
    >
      <div className="projects-intro">
        <div>
          <p className="projects-eyebrow">SELECTED WORK</p>
          <h2 id="projects-title" className="projects-title">
            Projects I&apos;ve Worked On
          </h2>
          <p className="projects-subtitle">E-commerce Development</p>
        </div>
        <p className="projects-summary">
          A selection of e-commerce storefronts and digital shopping experiences.
        </p>
      </div>

      <div className="projects-carousel-shell">
        <div
          ref={carouselRef}
          className="projects-carousel-viewport"
          aria-label="E-commerce development projects"
          onScroll={handleCarouselScroll}
        >
          <div className="projects-carousel-track">
            {projects.map((project, index) => {
              const isCentre = index === activePage + 1;
              return (
                <motion.article
                  className={"project-carousel-item" + (isCentre ? " is-centre" : "")}
                  key={project.id}
                  animate={{ scale: isCentre ? 1.035 : 0.97, y: isCentre ? -5 : 0, opacity: isCentre ? 1 : 0.88 }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.34,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  aria-current={isCentre ? "true" : undefined}
                >
                  <button
                    className="project-card-trigger"
                    type="button"
                    onClick={(event) => openProject(project, event)}
                    aria-label={"Open " + project.name + " project details"}
                    aria-haspopup="dialog"
                  >
                    <ProjectImage project={project} />
                    <span className="project-card-copy">
                      <span className="project-card-meta">
                        <span>{project.number} / E-COMMERCE</span>
                        <span>{project.category}</span>
                      </span>
                      <span className="project-card-name">{project.name}</span>
                      <span className="project-card-summary">{project.summary}</span>
                      <span className="project-card-open">
                        Explore project
                        <ArrowUpRight size={14} strokeWidth={1.8} />
                      </span>
                    </span>
                  </button>
                </motion.article>
              );
            })}
          </div>
        </div>

        <div className="projects-carousel-controls">
          <button
            className="project-carousel-arrow project-carousel-previous"
            type="button"
            onClick={() => goToPage(activePage - 1)}
            disabled={activePage === 0}
            aria-label="Previous projects"
          >
            <ArrowLeft size={17} strokeWidth={1.7} />
          </button>

          <div className="project-carousel-counter" aria-live="polite">
            <span>0{activePage + 1}</span>
            <span className="project-counter-divider" />
            <span>0{totalPages}</span>
          </div>

          <button
            className="project-carousel-arrow project-carousel-next"
            type="button"
            onClick={() => goToPage(activePage + 1)}
            disabled={activePage === totalPages - 1}
            aria-label="Next projects"
          >
            <ArrowRight size={17} strokeWidth={1.7} />
          </button>
        </div>

        <div className="project-carousel-pagination" aria-label="Carousel pagination">
          {Array.from({ length: totalPages }, (_, page) => (
            <button
              className={"project-pagination-dot" + (activePage === page ? " is-active" : "")}
              key={page}
              type="button"
              onClick={() => goToPage(page)}
              aria-label={"Go to project page " + (page + 1)}
              aria-current={activePage === page ? "page" : undefined}
            />
          ))}
        </div>
      </div>

      {canUsePortal && createPortal(
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="project-dialog-backdrop"
            key="project-dialog-backdrop"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.22 }}
            onClick={closeProject}
          >
            <motion.section
              ref={dialogRef}
              className="project-dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-dialog-title"
              tabIndex={-1}
              initial={reducedMotion ? false : { x: "100%" }}
              animate={{ x: 0 }}
              exit={reducedMotion ? undefined : { x: "100%" }}
              transition={{ duration: reducedMotion ? 0 : 0.36, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="project-dialog-inner">
                <div className="project-dialog-topline">
                  <span>PROJECT DETAILS / {selectedProject.number}</span>
                  <button
                    className="project-dialog-close"
                    type="button"
                    onClick={closeProject}
                    aria-label={"Close " + selectedProject.name + " project details"}
                  >
                    <X size={19} />
                  </button>
                </div>

                <div className="project-dialog-layout">
                  <div className="project-dialog-art">
                    <ProjectImage
                      project={selectedProject}
                      sizes="(max-width: 760px) 100vw, 52vw"
                    />
                  </div>

                  <div className="project-dialog-copy">
                    <p className="project-detail-category">{selectedProject.category}</p>
                    <h3 id="project-dialog-title">
                      {selectedProject.name}
                    </h3>
                    <ProjectDetails project={selectedProject} />
                  </div>
                </div>
              </div>
            </motion.section>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </section>
  );
}
