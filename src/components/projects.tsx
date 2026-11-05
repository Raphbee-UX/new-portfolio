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
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink, X } from "lucide-react";

import amieshaMockup from "../../amiesha-store.jpg";
import jesusSpiritMockup from "../../jesuspirit.jpg";
import minaShopMockup from "../../mina-shop.jpg";
import zestyPawsMockup from "../../zesty-paws.jpg";

type ProjectDetailsData = {
  overview?: string;
  websiteContext?: string;
  roleAndContribution?: string;
  workCompleted?: string;
  platformsAndTools?: string;
};

type Project = {
  id: string;
  number: string;
  name: string;
  url: string;
  image: StaticImageData;
  details?: ProjectDetailsData;
};

const projects: Project[] = [
  {
    id: "amiesha",
    number: "01",
    name: "Amiesha's Store",
    url: "https://amieshasstore.com/",
    image: amieshaMockup,
    details: {},
  },
  {
    id: "jesus-spirit",
    number: "02",
    name: "Jesus Spirit",
    url: "https://jesuspirit.com/",
    image: jesusSpiritMockup,
    details: {},
  },
  {
    id: "mina-shop",
    number: "03",
    name: "Mina Shop",
    url: "https://minashop.ca/",
    image: minaShopMockup,
    details: {},
  },
  {
    id: "zesty-paws",
    number: "04",
    name: "Zesty Paws",
    url: "https://zestypaws.com/",
    image: zestyPawsMockup,
    details: {},
  },
];

const MOBILE_CAROUSEL_QUERY = "(max-width: 760px)";
const subscribeToNothing = () => () => {};
const getClientPortalSnapshot = () => true;
const getServerPortalSnapshot = () => false;

function subscribeToMobileCarousel(callback: () => void) {
  const media = window.matchMedia(MOBILE_CAROUSEL_QUERY);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getMobileCarouselSnapshot() {
  return window.matchMedia(MOBILE_CAROUSEL_QUERY).matches;
}

function getServerMobileCarouselSnapshot() {
  return false;
}

function ProjectImage({
  project,
  sizes = "(max-width: 760px) 92vw, (max-width: 1100px) 48vw, 38vw",
}: {
  project: Project;
  sizes?: string;
}) {
  return (
    <div className="project-image-stage">
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
  const detailFields: { label: string; value?: string }[] = [
    { label: "Project overview", value: project.details?.overview },
    { label: "Website / business context", value: project.details?.websiteContext },
    { label: "My role and contribution", value: project.details?.roleAndContribution },
    { label: "Work completed", value: project.details?.workCompleted },
    { label: "Platforms and tools", value: project.details?.platformsAndTools },
  ];
  const availableFields = detailFields.filter((field) => field.value?.trim());

  return (
    <div className="project-detail-content">
      {availableFields.length > 0 && (
        <div className="project-detail-fields">
          {availableFields.map((field) => (
            <section className="project-detail-field" key={field.label}>
              <h4>{field.label}</h4>
              <p>{field.value}</p>
            </section>
          ))}
        </div>
      )}

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
    getClientPortalSnapshot,
    getServerPortalSnapshot,
  );
  const isMobileCarousel = useSyncExternalStore(
    subscribeToMobileCarousel,
    getMobileCarouselSnapshot,
    getServerMobileCarouselSnapshot,
  );
  const reducedMotion = useReducedMotion();

  const visibleCount = isMobileCarousel ? 1 : 3;
  const totalPages = projects.length - visibleCount + 1;
  const safeActivePage = Math.min(activePage, totalPages - 1);

  function goToPage(page: number) {
    const safePage = Math.max(0, Math.min(totalPages - 1, page));
    const carousel = carouselRef.current;
    if (!carousel) return;

    const cardStep = carousel.clientWidth / visibleCount;
    carousel.scrollTo({
      left: safePage * cardStep,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }

  function handleCarouselScroll() {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const cardStep = carousel.clientWidth / visibleCount;
    if (!cardStep) return;

    const page = Math.max(
      0,
      Math.min(totalPages - 1, Math.round(carousel.scrollLeft / cardStep)),
    );
    setActivePage((current) => current === page ? current : page);
  }

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const page = Math.min(activePage, totalPages - 1);
    carousel.scrollTo({
      left: page * (carousel.clientWidth / visibleCount),
      behavior: "auto",
    });
  }, [isMobileCarousel]);

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
      position: body.style.getPropertyValue("position"),
      top: body.style.getPropertyValue("top"),
      width: body.style.getPropertyValue("width"),
      overflow: body.style.getPropertyValue("overflow"),
    };

    body.style.setProperty("position", "fixed");
    body.style.setProperty("top", "-" + scrollY + "px");
    body.style.setProperty("width", "100%");
    body.style.setProperty("overflow", "hidden");

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
      Object.entries(previousBodyStyles).forEach(([property, value]) => {
        if (value) {
          body.style.setProperty(property, value);
        } else {
          body.style.removeProperty(property);
        }
      });
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
              const isEmphasised = isMobileCarousel
                ? index === safeActivePage
                : index === safeActivePage + 1;

              return (
                <motion.article
                  className={"project-carousel-item" + (isEmphasised ? " is-centre" : "")}
                  key={project.id}
                  animate={{
                    scale: isMobileCarousel ? 1 : isEmphasised ? 1.035 : 0.97,
                    y: !isMobileCarousel && isEmphasised ? -5 : 0,
                    opacity: isEmphasised ? 1 : 0.88,
                  }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.34,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  aria-current={isEmphasised ? "true" : undefined}
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
                      <span className="project-card-meta">{project.number} / E-COMMERCE</span>
                      <span className="project-card-name">{project.name}</span>
                      <span className="project-card-open">
                        Explore project details
                        <ArrowUpRight size={14} strokeWidth={1.8} />
                      </span>
                    </span>
                  </button>
                  <a
                    className="project-card-live-link"
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit live website
                    <ExternalLink size={12} strokeWidth={1.8} />
                  </a>
                </motion.article>
              );
            })}
          </div>
        </div>

        <div className="projects-carousel-controls">
          <button
            className="project-carousel-arrow project-carousel-previous"
            type="button"
            onClick={() => goToPage(safeActivePage - 1)}
            disabled={safeActivePage === 0}
            aria-label="Previous projects"
          >
            <ArrowLeft size={17} strokeWidth={1.7} />
          </button>

          <div className="project-carousel-counter" aria-live="polite">
            <span>0{safeActivePage + 1}</span>
            <span className="project-counter-divider" />
            <span>0{totalPages}</span>
          </div>

          <button
            className="project-carousel-arrow project-carousel-next"
            type="button"
            onClick={() => goToPage(safeActivePage + 1)}
            disabled={safeActivePage === totalPages - 1}
            aria-label="Next projects"
          >
            <ArrowRight size={17} strokeWidth={1.7} />
          </button>
        </div>

        <div className="project-carousel-pagination" aria-label="Carousel pagination">
          {Array.from({ length: totalPages }, (_, page) => (
            <button
              className={"project-pagination-dot" + (safeActivePage === page ? " is-active" : "")}
              key={page}
              type="button"
              onClick={() => goToPage(page)}
              aria-label={"Go to project " + (page + 1)}
              aria-current={safeActivePage === page ? "page" : undefined}
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
                        sizes="(max-width: 760px) 100vw, 58vw"
                      />
                    </div>

                    <div className="project-dialog-copy">
                      <p className="project-detail-category">
                        E-COMMERCE DEVELOPMENT / {selectedProject.number}
                      </p>
                      <h3 id="project-dialog-title">{selectedProject.name}</h3>
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
