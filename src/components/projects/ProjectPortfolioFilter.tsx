"use client";

import { useMemo, useState } from "react";
import { BarChart3, Camera, CircleDot } from "lucide-react";
import type { Locale, Project, ProjectCategory } from "@/content/types";
import { ProjectCard } from "@/components/projects/ProjectCard";

type PortfolioFilter = "all" | "sensors" | "cameras" | "analysis";

interface ProjectPortfolioFilterProps {
  locale: Locale;
  projects: Project[];
}

const filters: Array<{
  id: PortfolioFilter;
  label: Record<Locale, string>;
}> = [
  { id: "all", label: { en: "All", da: "Alle" } },
  { id: "sensors", label: { en: "Sensors", da: "Sensorer" } },
  { id: "cameras", label: { en: "Cameras", da: "Kameraer" } },
  { id: "analysis", label: { en: "Analysis", da: "Analyse" } }
];

const categoryCards: Array<{
  category: Exclude<PortfolioFilter, "all">;
  title: Record<Locale, string>;
  body: Record<Locale, string>;
}> = [
  {
    category: "sensors",
    title: { en: "Sensor projects", da: "Sensorprojekter" },
    body: {
      en: "Ground-level measurement of occupancy, duration and charging-space utilisation.",
      da: "Belægning, varighed og udnyttelse på parkerings- og ladepladsniveau."
    }
  },
  {
    category: "cameras",
    title: { en: "Camera projects", da: "Kameraprojekter" },
    body: {
      en: "Camera-based area measurement, flow and parking behaviour across larger environments.",
      da: "Områdemåling, flow og parkeringsadfærd på større arealer."
    }
  },
  {
    category: "analysis",
    title: { en: "Analysis projects", da: "Analyseprojekter" },
    body: {
      en: "Interpretation, reporting and practical next-step recommendations from collected data.",
      da: "Datafortolkning, rapportering og praktiske anbefalinger til næste skridt."
    }
  }
];

const categoryIcons = {
  sensors: CircleDot,
  cameras: Camera,
  analysis: BarChart3
};

function matchesFilter(category: ProjectCategory, filter: PortfolioFilter) {
  if (filter === "all") return true;
  if (filter === "analysis") return category === "analysis" || category === "consultancy";
  return category === filter;
}

export function ProjectPortfolioFilter({ locale, projects }: ProjectPortfolioFilterProps) {
  const [activeFilter, setActiveFilter] = useState<PortfolioFilter>("all");
  const filteredProjects = useMemo(
    () => projects.filter((project) => matchesFilter(project.category, activeFilter)),
    [activeFilter, projects]
  );

  return (
    <div className="portfolio-filter" id="project-portfolio">
      <div className="project-category-grid">
        {categoryCards.map((card, index) => {
          const Icon = categoryIcons[card.category];

          return (
            <button
              className={`project-category-card project-category-card--${card.category} ${activeFilter === card.category ? "is-active" : ""}`}
              key={card.category}
              type="button"
              onClick={() => setActiveFilter(card.category)}
            >
              <Icon aria-hidden="true" size={38} />
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{card.title[locale]}</h2>
              <p>{card.body[locale]}</p>
              <strong>{locale === "da" ? "Filtrer kategori" : "Filter category"}</strong>
            </button>
          );
        })}
      </div>
      <div className="portfolio-filter__tabs" aria-label={locale === "da" ? "Filtrer projekter" : "Filter projects"}>
        {filters.map((filter) => (
          <button
            className={activeFilter === filter.id ? "is-active" : undefined}
            key={filter.id}
            type="button"
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label[locale]}
          </button>
        ))}
      </div>
      <div className="project-grid project-grid--featured">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} locale={locale} />
        ))}
      </div>
    </div>
  );
}
