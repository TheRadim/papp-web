"use client";

import { useMemo, useState } from "react";
import { BarChart3, Camera, CircleDot, LayoutGrid } from "lucide-react";
import type { Locale, Project, ProjectCategory } from "@/content/types";
import { ProjectCard } from "@/components/projects/ProjectCard";

type PortfolioFilter = "all" | "sensors" | "cameras" | "analysis";

interface ProjectPortfolioFilterProps {
  locale: Locale;
  projects: Project[];
}

const categoryCards: Array<{
  category: PortfolioFilter;
  title: Record<Locale, string>;
  body: Record<Locale, string>;
}> = [
  {
    category: "all",
    title: { en: "All projects", da: "Alle projekter" },
    body: {
      en: "Sensor, camera and analysis work across real mobility environments.",
      da: "Sensor-, kamera- og analysearbejde i rigtige mobilitetsmiljøer."
    }
  },
  {
    category: "sensors",
    title: { en: "Sensors", da: "Sensorer" },
    body: {
      en: "Ground-level measurement of occupancy, duration and charging-space utilisation.",
      da: "Belægning, varighed og udnyttelse på parkerings- og ladepladsniveau."
    }
  },
  {
    category: "cameras",
    title: { en: "Cameras", da: "Kameraer" },
    body: {
      en: "Camera-based area measurement, flow and parking behaviour across larger environments.",
      da: "Områdemåling, flow og parkeringsadfærd på større arealer."
    }
  },
  {
    category: "analysis",
    title: { en: "Analysis", da: "Analyse" },
    body: {
      en: "Interpretation, reporting and practical next-step recommendations from collected data.",
      da: "Datafortolkning, rapportering og praktiske anbefalinger til næste skridt."
    }
  }
];

const categoryIcons = {
  all: LayoutGrid,
  sensors: CircleDot,
  cameras: Camera,
  analysis: BarChart3
};

function matchesFilter(project: Project, filter: PortfolioFilter) {
  if (filter === "all") return true;

  const projectCategories = new Set<ProjectCategory>([project.category]);

  project.technologies?.forEach((technology) => {
    if (technology === "sensors" || technology === "cameras" || technology === "analysis" || technology === "consultancy") {
      projectCategories.add(technology);
    }
  });

  if (filter === "analysis") return projectCategories.has("analysis") || projectCategories.has("consultancy");
  return projectCategories.has(filter);
}

export function ProjectPortfolioFilter({ locale, projects }: ProjectPortfolioFilterProps) {
  const [activeFilter, setActiveFilter] = useState<PortfolioFilter>("all");
  const filteredProjects = useMemo(
    () => projects.filter((project) => matchesFilter(project, activeFilter)),
    [activeFilter, projects]
  );

  return (
    <div className="portfolio-filter" id="project-portfolio">
      <div className="project-category-grid project-category-grid--filters" aria-label={locale === "da" ? "Filtrer projekter" : "Filter projects"}>
        {categoryCards.map((card) => {
          const Icon = categoryIcons[card.category];

          return (
            <button
              className={`project-category-card project-category-card--${card.category} ${activeFilter === card.category ? "is-active" : ""}`}
              key={card.category}
              type="button"
              aria-pressed={activeFilter === card.category}
              onClick={() => setActiveFilter(card.category)}
            >
              <Icon aria-hidden="true" size={30} />
              <h2>{card.title[locale]}</h2>
              <p>{card.body[locale]}</p>
            </button>
          );
        })}
      </div>
      <div className="project-grid project-grid--featured">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} locale={locale} />
        ))}
      </div>
    </div>
  );
}
