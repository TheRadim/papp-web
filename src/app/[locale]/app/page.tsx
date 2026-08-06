import type { Metadata } from "next";
import type { Locale } from "@/content/types";
import { getHomepageContent } from "@/lib/content/accessors";
import { pageMetadata } from "@/lib/seo/metadata";
import { AppPromotion } from "@/components/app/AppPromotion";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const appFeatures = [
  {
    title: { en: "See availability nearby", da: "Se ledige pladser i nærheden" },
    body: {
      en: "Explore parking areas on a live map and understand whether a space is likely to be available before you arrive.",
      da: "Udforsk parkeringsområder på et livekort og se, om der sandsynligvis er en ledig plads, før du ankommer."
    }
  },
  {
    title: { en: "Navigate directly", da: "Naviger direkte" },
    body: {
      en: "Open navigation from the selected parking location and get moving without switching between several tools.",
      da: "Start navigation fra den valgte parkeringslokation uden at skifte mellem flere værktøjer."
    }
  },
  {
    title: { en: "Compare practical details", da: "Sammenlign praktiske detaljer" },
    body: {
      en: "View location context, pricing information and special parking types where the data is available.",
      da: "Se lokation, prisinformation og særlige parkeringstyper, hvor data er tilgængelig."
    }
  }
];

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(
    locale,
    {
      title: { en: "App | Papp Mobility", da: "App | Papp Mobility" },
      description: { en: "The Papp Mobility app is a related public-facing parking product.", da: "Papp Mobility-appen er et relateret offentligt parkeringsprodukt." }
    },
    "/app"
  );
}

export default async function AppPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const content = getHomepageContent(locale);

  return (
    <>
      <AppPromotion locale={locale} content={content.app} />
      <Section>
        <SectionHeading
          eyebrow={locale === "da" ? "Parkeringsapp" : "Parking app"}
          title={locale === "da" ? "Et enkelt værktøj til parkeringsbrugere." : "A simple tool for parking users."}
          body={
            locale === "da"
              ? "Papp-appen er bygget til hverdagsparkering: find relevante parkeringsmuligheder, se praktisk information og kom videre til destinationen."
              : "The Papp app is built for everyday parking: find relevant parking options, see practical information and move on to your destination."
          }
          align="center"
        />
        <div className="app-feature-grid">
          {appFeatures.map((feature) => (
            <article className="app-feature-card" key={feature.title.en}>
              <span aria-hidden="true" />
              <h2>{feature.title[locale]}</h2>
              <p>{feature.body[locale]}</p>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
