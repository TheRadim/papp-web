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
      en: "A live map shows where Papp has active datapoints and how occupancy appears to the people using the area.",
      da: "Et livekort viser, hvor Papp har aktive datapunkter, og hvordan belægning opleves af brugerne i området."
    }
  },
  {
    title: { en: "Navigate directly", da: "Naviger direkte" },
    body: {
      en: "Selected locations connect directly to navigation, turning mobility data into a practical action for end users.",
      da: "Valgte lokationer kobles direkte til navigation, så mobilitetsdata bliver til en praktisk handling for slutbrugere."
    }
  },
  {
    title: { en: "Compare practical details", da: "Sammenlign praktiske detaljer" },
    body: {
      en: "Pricing, location context and special parking types help partners see how information is presented outside the dashboard.",
      da: "Priser, lokationskontekst og særlige parkeringstyper viser partnere, hvordan information præsenteres uden for dashboardet."
    }
  },
  {
    title: { en: "Plan before arrival", da: "Planlæg før ankomst" },
    body: {
      en: "The app reveals how real-time signals can reduce uncertainty before a driver reaches a busy destination.",
      da: "Appen viser, hvordan realtidssignaler kan mindske usikkerhed, før en bilist når frem til et travlt område."
    }
  },
  {
    title: { en: "Find relevant parking types", da: "Find relevante parkeringstyper" },
    body: {
      en: "Different parking types make the public app a useful reference for understanding site coverage and user needs.",
      da: "Forskellige parkeringstyper gør den offentlige app til en nyttig reference for dækning og brugerbehov."
    }
  },
  {
    title: { en: "Stay updated on the move", da: "Hold dig opdateret undervejs" },
    body: {
      en: "Live availability shows the operational side of Papp's data network as conditions change through the day.",
      da: "Live tilgængelighed viser den operationelle side af Papps datanetværk, når forhold ændrer sig i løbet af dagen."
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
        title={locale === "da" ? "Se hvor Papp måler parkeringsbelægning." : "See where Papp measures parking occupancy."}
        body={
          locale === "da"
            ? "Den offentlige app er både et praktisk værktøj for bilister og et B2B-showcase for de lokationer, datapunkter og realtidssignaler, Papp arbejder med."
            : "The public app is both a practical tool for drivers and a B2B showcase of the locations, datapoints and real-time signals Papp works with."
        }
        align="center"
      />
      <AppFeatureSelector features={appFeatures} locale={locale} />
    </Section>
  );
}
