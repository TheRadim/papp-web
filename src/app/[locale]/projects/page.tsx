import type { Metadata } from "next";
import Link from "next/link";
import { BarChart3, Camera, CircleDot, Workflow } from "lucide-react";
import type { Locale, ProjectCategory } from "@/content/types";
import { getProjects } from "@/lib/content/accessors";
import { pageMetadata } from "@/lib/seo/metadata";
import { pick } from "@/lib/i18n/locales";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectStatsOrb } from "@/components/projects/ProjectStatsOrb";

const categoryCards: Array<{
  category: ProjectCategory;
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

const workSteps = [
  {
    title: { en: "Scope the question", da: "Afklar spørgsmålet" },
    body: { en: "We define the decision, the site and the behaviour that needs to be understood.", da: "Vi afklarer beslutningen, stedet og den adfærd, der skal forstås." }
  },
  {
    title: { en: "Measure the real world", da: "Mål virkeligheden" },
    body: { en: "Sensors, cameras or existing data sources are selected to match the project.", da: "Sensorer, kameraer eller eksisterende datakilder vælges ud fra projektet." }
  },
  {
    title: { en: "Turn data into insight", da: "Gør data til indsigt" },
    body: { en: "Papp Insights and analysis reveal occupancy, flow, dwell time and patterns.", da: "Papp Insights og analyse viser belægning, flow, opholdstid og mønstre." }
  },
  {
    title: { en: "Recommend next steps", da: "Anbefal næste skridt" },
    body: { en: "We translate findings into practical actions for cities, operators and partners.", da: "Vi omsætter indsigter til praktiske handlinger for byer, operatører og partnere." }
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
  const groupedProjects = {
    sensors: projects.filter((project) => project.category === "sensors"),
    cameras: projects.filter((project) => project.category === "cameras"),
    analysis: projects.filter((project) => project.category === "analysis" || project.category === "consultancy")
  };

  return (
    <>
      <Section className="projects-page">
        <div className="projects-hero">
          <SectionHeading
            eyebrow={locale === "da" ? "Projekter" : "Projects"}
            title={locale === "da" ? "Mobility projects built around real behaviour." : "Mobility projects built around real behaviour."}
            body={
              locale === "da"
                ? "Vi hjælper byer, operatører og partnere med at bruge sensorer, kameraer og analyse til at forstå parkering og bevægelse i praksis."
                : "We help cities, operators and partners use sensors, cameras and analysis to understand parking and movement in practice."
            }
          />
          <p>
            {locale === "da"
              ? "Hvert projekt starter med et konkret spørgsmål: hvor bliver kapacitet overset, hvordan bevæger brugerne sig, og hvilke beslutninger kan data gøre mere trygge?"
              : "Every project starts with a practical question: where is capacity overlooked, how do users move, and which decisions can data make easier to trust?"}
          </p>
        </div>
        <div className="project-category-grid">
          {categoryCards.map((card, index) => {
            const Icon = categoryIcons[card.category as keyof typeof categoryIcons] ?? Workflow;
            return (
              <Link className={`project-category-card project-category-card--${card.category}`} href={`#${card.category}-projects`} key={card.category}>
                <Icon aria-hidden="true" size={38} />
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h2>{card.title[locale]}</h2>
                <p>{card.body[locale]}</p>
                <strong>{locale === "da" ? "Se kategori" : "View category"}</strong>
              </Link>
            );
          })}
        </div>
      </Section>
      <Section tone="soft" className="project-intelligence-section">
        <div className="project-intelligence">
          <div>
            <p className="eyebrow">{locale === "da" ? "Datagrundlag" : "Data basis"}</p>
            <h2>{locale === "da" ? "A growing base of mobility intelligence." : "A growing base of mobility intelligence."}</h2>
            <p>
              {locale === "da"
                ? "Projekterne bygger videre på et voksende datagrundlag fra parkeringsarealer, gader og mobilitetsmiljøer, så nye spørgsmål kan besvares hurtigere og mere præcist."
                : "Projects build on a growing data basis from parking areas, streets and mobility environments, so new questions can be answered faster and with more precision."}
            </p>
          </div>
          <ProjectStatsOrb locale={locale} />
        </div>
      </Section>
      <Section className="project-work-section">
        <SectionHeading
          eyebrow={locale === "da" ? "Sådan arbejder vi" : "How we work"}
          title={locale === "da" ? "From local question to practical recommendation." : "From local question to practical recommendation."}
          body={
            locale === "da"
              ? "En enkel proces, der forbinder målinger, analyse og rådgivning uden at gøre projektet tungere end nødvendigt."
              : "A simple process that connects measurement, analysis and advisory without making the project heavier than it needs to be."
          }
          align="center"
        />
        <div className="project-workflow">
          {workSteps.map((step, index) => (
            <article className={`project-workflow__step project-workflow__step--${index % 2 === 0 ? "left" : "right"}`} key={step.title.en}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{step.title[locale]}</h3>
                <p>{step.body[locale]}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>
      <Section tone="soft" className="project-listing-section">
        {categoryCards.map((card) => (
          <div className="project-group" id={`${card.category}-projects`} key={card.category}>
            <div className="project-group__heading">
              <p className="eyebrow">{locale === "da" ? "Kategori" : "Category"}</p>
              <h2>{card.title[locale]}</h2>
              <p>{card.body[locale]}</p>
            </div>
            <div className="project-grid project-grid--featured">
              {groupedProjects[card.category as keyof typeof groupedProjects].map((project) => (
                <ProjectCard key={project.slug} project={project} locale={locale} />
              ))}
            </div>
          </div>
        ))}
      </Section>
    </>
  );
}
