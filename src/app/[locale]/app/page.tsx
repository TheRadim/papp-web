import type { Metadata } from "next";
import type { Locale } from "@/content/types";
import { pageMetadata } from "@/lib/seo/metadata";
import { AppFeatureSelector } from "@/components/app/AppFeatureSelector";
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
  },
  {
    title: { en: "Plan before arrival", da: "Planlæg før ankomst" },
    body: {
      en: "Check your options before you leave, so the parking part of the trip feels less uncertain.",
      da: "Tjek dine muligheder, før du kører, så parkeringsdelen af turen føles mindre usikker."
    }
  },
  {
    title: { en: "Find relevant parking types", da: "Find relevante parkeringstyper" },
    body: {
      en: "Look for the parking information that matters to the situation, from public spaces to selected special locations.",
      da: "Find den parkeringsinformation, der passer til situationen, fra offentlige pladser til udvalgte særlige lokationer."
    }
  },
  {
    title: { en: "Stay updated on the move", da: "Hold dig opdateret undervejs" },
    body: {
      en: "Use live availability signals where they exist and keep the journey moving toward a practical choice.",
      da: "Brug live tilgængelighed, hvor data findes, og hold turen rettet mod et praktisk valg."
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

  return (
    <Section className="app-feature-section app-feature-page">
      <SectionHeading
        eyebrow={locale === "da" ? "Gratis app" : "Free app"}
        title={locale === "da" ? "Et enkelt værktøj til parkeringsbrugere." : "A simple tool for parking users."}
        body={
          locale === "da"
            ? "Papp-appen hjælper brugere med at finde relevante parkeringsmuligheder, se praktisk information og komme videre til destinationen."
            : "The Papp app helps users find relevant parking options, see practical information and move on to their destination."
        }
        align="center"
      />
      <AppFeatureSelector features={appFeatures} locale={locale} />
    </Section>
  );
}
