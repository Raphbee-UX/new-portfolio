"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";

import amieshaMockup from "../../amiesha-store.jpg";
import jesusSpiritMockup from "../../jesuspirit.jpg";
import minaShopMockup from "../../mina-shop.jpg";
import zestyPawsMockup from "../../zesty-paws.jpg";

const projects = [
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
    outcomes: "No verified outcome information has been supplied.",
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
    outcomes: "No verified outcome information has been supplied.",
  },
  {
    id: "mina-shop",
    number: "03",
    name: "Mina Shop",
    category: "Online retail",
    summary: "An online store project. More specific business context will be added after confirmation.",
    url: "https://minashop.ca/",
    image: minaShopMockup,
    overview: "Project overview to be added.",
    context: "Online retail. More specific business context is to be confirmed.",
    role: "Role and contribution details to be added.",
    work: "Work completed details to be added.",
    platforms: "Platform and tool details have not been verified.",
    outcomes: "No verified outcome information has been supplied.",
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
    outcomes: "No verified outcome information has been supplied.",
  },
  {
    id: "fable-pets",
    number: "05",
    name: "Fable Pets",
    category: "Project category to be confirmed",
    summary: "Project information and mockup imagery are still to be supplied.",
    url: null,
    image: null,
    overview: "Project overview to be added.",
    context: "Business and website context to be confirmed.",
    role: "Role and contribution details to be added.",
    work: "Work completed details to be added.",
    platforms: "Platform and tool details have not been verified.",
    outcomes: "No verified outcome information has been supplied.",
  },
] as const;

type Project = (typeof projects)[number];

function ProjectArtwork({ project, className = "" }: { project: Project; className?: string }) {
  return (
    <div className={"project-image-stage " + className}>
      {project.image ? (
        <Image
          className="project-mockup"
          src={project.image}
          alt={project.name + " website mockup"}
          fill
          sizes="(max-width: 760px) 92vw, (max-width: 1100px) 48vw, 58vw"
          priority={project.id === "amiesha"}
        />
      ) : (
        <div className="project-image-placeholder">
          <span className="project-placeholder-index">PROJECT {project.number}</span>
          <strong>{project.name}</strong>
          <span>Mockup image not supplied</span>
        </div>
      )}
    </div>
  );
}

function ProjectActions({
  project,
  onExplore,
}: {
  project: Project;
  onExplore: (event: MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <div className="project-actions">
      <button className="project-details-button" type="button" onClick={onExplore}>
        Explore project
        <ArrowUpRight size={15} strokeWidth={1.8} />
      </button>
      {project.url ? (
        <a className="project-live-link" href={project.url} target="_blank" rel="noopener noreferrer">
          Visit live website
          <ExternalLink size={13} strokeWidth={1.8} />
        </a>
      ) : (
        <span className="project-live-unavailable">Live link to be added</span>
      )}
    </div>
  );
}

export function Projects() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const detailTitleRef = useRef<HTMLHeadingElement | null>(null);
  const projectsTitleRef = useRef<HTMLHeadingElement | null>(null);
  const hasOpenedProject = useRef(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const reducedMotion = useReducedMotion();
  const featuredProject = projects[0];
  const supportingProjects = projects.slice(1);

  useEffect(() => {
    if (!selectedProject) {
      if (hasOpenedProject.current) {
        projectsTitleRef.current?.focus({ preventScroll: true });
      }
      return;
    }

    detailTitleRef.current?.focus({ preventScroll: true });
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject]);

  function openProject(project: Project, event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    hasOpenedProject.current = true;
    setSelectedProject(project);
    sectionRef.current?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  }

  const renderActions = (project: Project) => (
    <ProjectActions project={project} onExplore={(event) => openProject(project, event)} />
  );

  return (
    <section ref={sectionRef} className="projects-section" id="work" aria-labelledby="projects-title">
      <div className="projects-intro">
        <div>
          <p className="projects-eyebrow">SELECTED WORK</p>
          <h2 id="projects-title" ref={projectsTitleRef} tabIndex={-1}>Projects I&apos;ve Worked On</h2>
        </div>
        <p className="projects-summary">
          A selection of websites and digital experiences, presented with room to explore the work behind each project.
        </p>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {selectedProject ? (
          <motion.div
            className="project-detail-view"
            key={selectedProject.id + "-detail"}
            initial={reducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: reducedMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="project-detail-topline">
              <button className="project-back-button" type="button" onClick={() => setSelectedProject(null)}>
                <ArrowLeft size={15} />
                Back to selected work
              </button>
              <span>PROJECT {selectedProject.number} / 05</span>
            </div>

            <div className="project-detail-layout">
              <div className="project-detail-art">
                <ProjectArtwork project={selectedProject} />
              </div>

              <div className="project-detail-copy">
                <p className="project-detail-category">{selectedProject.category}</p>
                <h3 ref={detailTitleRef} tabIndex={-1}>{selectedProject.name}</h3>
                <p className="project-detail-summary">{selectedProject.summary}</p>
                {renderActions(selectedProject)}
                <div className="project-detail-fields">
                  <section className="project-detail-field project-detail-field-wide">
                    <h4>Project overview</h4>
                    <p>{selectedProject.overview}</p>
                  </section>
                  <section className="project-detail-field">
                    <h4>Business / website context</h4>
                    <p>{selectedProject.context}</p>
                  </section>
                  <section className="project-detail-field">
                    <h4>My role and contribution</h4>
                    <p>{selectedProject.role}</p>
                  </section>
                  <section className="project-detail-field">
                    <h4>Work completed</h4>
                    <p>{selectedProject.work}</p>
                  </section>
                  <section className="project-detail-field">
                    <h4>Platforms and tools</h4>
                    <p>{selectedProject.platforms}</p>
                  </section>
                  <section className="project-detail-field project-detail-field-wide">
                    <h4>Outcomes</h4>
                    <p>{selectedProject.outcomes}</p>
                  </section>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="projects-showcase"
            key="projects-showcase"
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: reducedMotion ? 0 : 0.34, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.article
              className="project-feature"
              initial={reducedMotion ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: reducedMotion ? 0 : 0.58, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="project-feature-art">
                <ProjectArtwork project={featuredProject} />
              </div>
              <div className="project-feature-copy">
                <p className="project-number">{featuredProject.number} / FEATURED PROJECT</p>
                <p className="project-category">{featuredProject.category}</p>
                <h3>{featuredProject.name}</h3>
                <p className="project-summary">{featuredProject.summary}</p>
                {renderActions(featuredProject)}
              </div>
            </motion.article>

            <div className="projects-mosaic">
              {supportingProjects.map((project, index) => (
                <motion.article
                  className={"project-tile project-tile-" + project.id}
                  key={project.id}
                  initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.16 }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.56,
                    delay: reducedMotion ? 0 : index * 0.075,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <ProjectArtwork project={project} />
                  <div className="project-tile-copy">
                    <div className="project-tile-meta">
                      <span>{project.number} / SELECTED PROJECT</span>
                      <span>{project.category}</span>
                    </div>
                    <h3>{project.name}</h3>
                    <p>{project.summary}</p>
                    {renderActions(project)}
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
