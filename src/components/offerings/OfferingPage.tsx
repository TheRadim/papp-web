import Image from "next/image";
import type { Locale, Offering } from "@/content/types";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pick } from "@/lib/i18n/locales";
import { getProjects } from "@/lib/content/accessors";
import { withBasePath } from "@/lib/site/basePath";
import { ProjectCard } from "@/components/projects/ProjectCard";

interface OfferingPageProps {
  locale: Locale;
  offering: Offering;
}

export function OfferingPage({ locale, offering }: OfferingPageProps) {
  const relatedProjects = getProjects(locale).filter((project) => offering.relatedProjectSlugs.includes(project.slug));

  return (
    <>
      <section className="subpage-hero">
        <div className="container">
          <div className="subpage-hero__grid">
            <div>
              <p className="eyebrow">{offering.eyebrow ? pick(locale, offering.eyebrow) : ""}</p>
              <h1>{pick(locale, offering.name)}</h1>
              <p className="hero-lead">{pick(locale, offering.shortDescription)}</p>
              <p>{pick(locale, offering.introduction)}</p>
              <Button href={`/${locale}/contact`}>{locale === "da" ? "Tal med os" : "Talk to us"}</Button>
            </div>
            <Image src={withBasePath(offering.heroImage)} alt="" width={1672} height={941} priority sizes="(max-width: 992px) 100vw, 44vw" />
          </div>
        </div>
      </section>

      <Section>
        <div className="detail-grid">
          <div>
            <SectionHeading eyebrow={locale === "da" ? "Fordele" : "Benefits"} title={locale === "da" ? "Hvad det hjælper jer med" : "What it helps you understand"} />
            <ul className="check-list check-list--large">
              {offering.benefits.map((benefit) => (
                <li key={pick(locale, benefit)}>{pick(locale, benefit)}</li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow={locale === "da" ? "Brugsscenarier" : "Use cases"} title={locale === "da" ? "Hvor løsningen passer ind" : "Where the solution fits"} />
            <ul className="tag-list">
              {offering.useCases.map((useCase) => (
                <li key={pick(locale, useCase)}>{pick(locale, useCase)}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {offering.process?.length ? (
        <Section tone="soft">
          <SectionHeading eyebrow={locale === "da" ? "Proces" : "Process"} title={locale === "da" ? "Sådan starter et forløb" : "How a project starts"} align="center" />
          <div className="process-grid">
            {offering.process.map((step, index) => (
              <article className="process-card" key={pick(locale, step)}>
                <span>{index + 1}</span>
                <p>{pick(locale, step)}</p>
              </article>
            ))}
          </div>
        </Section>
      ) : null}

      {offering.category === "cameras" ? (
        <Section>
          <div className="review-note">
            <p className="eyebrow">{locale === "da" ? "Privacy" : "Privacy"}</p>
            <h2>{locale === "da" ? "Godkendt databehandlingscopy mangler" : "Approved data-handling copy is needed"}</h2>
            <p>
              {locale === "da"
                ? "Denne sektion er reserveret til verificeret privacy- og databehandlingssprog. Den bør godkendes juridisk før lancering."
                : "This section is reserved for verified privacy and data-handling language. It should receive legal review before launch."}
            </p>
          </div>
        </Section>
      ) : null}

      {relatedProjects.length ? (
        <Section tone="soft">
          <SectionHeading eyebrow={locale === "da" ? "Relaterede projekter" : "Related projects"} title={locale === "da" ? "Se løsningen i praksis" : "See the solution in practice"} />
          <div className="project-grid">
            {relatedProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} locale={locale} />
            ))}
          </div>
        </Section>
      ) : null}
    </>
  );
}
