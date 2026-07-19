import type { Metadata } from "next";
import type { Locale, ProjectCategory } from "@/content/types";
import { getProjects } from "@/lib/content/accessors";
import { pageMetadata } from "@/lib/seo/metadata";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";

const categoryCards: Array<{
  category: ProjectCategory;
  title: Record<Locale, string>;
  body: Record<Locale, string>;
}> = [
  {
    category: "sensors",
    title: { en: "Sensor projects", da: "Sensorprojekter" },
    body: {
      en: "Space-level occupancy, duration and charging-space utilisation.",
      da: "Belægning, varighed og udnyttelse på parkerings- og ladepladsniveau."
    }
  },
  {
    category: "cameras",
    title: { en: "Camera projects", da: "Kameraprojekter" },
    body: {
      en: "Area measurement, flow and parking behaviour across larger environments.",
      da: "Områdemåling, flow og parkeringsadfærd på større arealer."
    }
  },
  {
    category: "analysis",
    title: { en: "Analysis projects", da: "Analyseprojekter" },
    body: {
      en: "Data interpretation, reporting and practical next-step recommendations.",
      da: "Datafortolkning, rapportering og praktiske anbefalinger til næste skridt."
    }
  }
];

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(
    locale,
    {
      title: { en: "Projects | Papp Mobility", da: "Projekter | Papp Mobility" },
      description: {
        en: "Selected Papp Mobility projects across sensors, cameras, analysis and advisory.",
        da: "Udvalgte Papp Mobility-projekter med sensorer, kameraer, analyse og rådgivning."
      }
    },
    "/projects"
  );
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const projects = getProjects(locale);

  return (
    <Section>
      <SectionHeading
        eyebrow={locale === "da" ? "Projekter" : "Projects"}
        title={locale === "da" ? "Erfaring fra mobilitets- og parkeringsprojekter." : "Experience from mobility and parking projects."}
        body={
          locale === "da"
            ? "Se hvordan sensorer, kameraer og analyse bliver brugt i konkrete by- og parkeringsmiljøer."
            : "See how sensors, cameras and analysis are used across real city and parking environments."
        }
      />
      <div className="project-category-grid">
        {categoryCards.map((card) => {
          const count = projects.filter((project) => project.category === card.category).length;
          return (
            <article className={`project-category-card project-category-card--${card.category}`} key={card.category}>
              <span>{count}</span>
              <h2>{card.title[locale]}</h2>
              <p>{card.body[locale]}</p>
            </article>
          );
        })}
      </div>
      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} locale={locale} />
        ))}
      </div>
    </Section>
  );
}
