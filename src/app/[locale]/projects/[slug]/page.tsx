import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/content/types";
import { getProjectBySlug, getProjects } from "@/lib/content/accessors";
import { pageMetadata } from "@/lib/seo/metadata";
import { pick } from "@/lib/i18n/locales";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function generateStaticParams() {
  return getProjects("en").flatMap((project) => [
    { locale: "en", slug: project.slug },
    { locale: "da", slug: project.slug }
  ]);
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProjectBySlug(locale, slug);
  if (!project) return {};
  return pageMetadata(locale, project.seo, `/projects/${project.slug}`);
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params;
  const project = getProjectBySlug(locale, slug);
  if (!project) notFound();

  return (
    <>
      <section className="subpage-hero">
        <div className="container">
          <div className="subpage-hero__grid">
            <div>
              <p className="eyebrow">{project.clientName}</p>
              <h1>{pick(locale, project.title)}</h1>
              <p className="hero-lead">{pick(locale, project.summary)}</p>
              <Button href={`/${locale}/contact`}>{locale === "da" ? "Tal om et lignende projekt" : "Discuss a similar project"}</Button>
            </div>
            <Image src={project.coverImage} alt="" width={1672} height={941} priority sizes="(max-width: 992px) 100vw, 44vw" />
          </div>
        </div>
      </section>
      <Section>
        <div className="detail-grid">
          <div>
            {project.challenge ? (
              <>
                <p className="eyebrow">{locale === "da" ? "Udfordring" : "Challenge"}</p>
                <h2>{locale === "da" ? "Hvad skulle forstås" : "What needed to be understood"}</h2>
                <p>{pick(locale, project.challenge)}</p>
              </>
            ) : null}
          </div>
          <div>
            <SectionHeading eyebrow={locale === "da" ? "Teknologier" : "Technologies"} title={locale === "da" ? "Relaterede områder" : "Related areas"} />
            <ul className="tag-list">
              {project.technologies?.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
      <Section tone="soft">
        <div className="detail-grid detail-grid--story">
          {project.approach ? (
            <article>
              <p className="eyebrow">{locale === "da" ? "Tilgang" : "Approach"}</p>
              <h2>{locale === "da" ? "Fra data til overblik" : "From data to clarity"}</h2>
              <p>{pick(locale, project.approach)}</p>
            </article>
          ) : null}
          {project.result ? (
            <article>
              <p className="eyebrow">{locale === "da" ? "Resultat" : "Outcome"}</p>
              <h2>{locale === "da" ? "Et bedre beslutningsgrundlag" : "A better decision basis"}</h2>
              <p>{pick(locale, project.result)}</p>
            </article>
          ) : null}
        </div>
      </Section>
      {project.gallery?.length ? (
        <Section>
          <SectionHeading eyebrow={locale === "da" ? "Billeder" : "Images"} title={locale === "da" ? "Fra projektet" : "From the project"} />
          <div className="project-gallery">
            {project.gallery.map((image) => (
              <Image key={image} src={image} alt="" width={1400} height={950} sizes="(max-width: 768px) 100vw, 50vw" />
            ))}
          </div>
        </Section>
      ) : null}
    </>
  );
}
