import type { Metadata } from "next";
import type { Locale } from "@/content/types";
import { pageMetadata } from "@/lib/seo/metadata";
import { AppFeatureSelector } from "@/components/app/AppFeatureSelector";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const appFeatures = [
  {
    "title": {
      "en": "See availability nearby",
      "da": "Se ledige pladser i nærheden"
    },
    "body": {
      "en": "Tap a location to see its address, total spaces and available bays. Coloured indicators help you read availability at a glance.",
      "da": "Tryk på en lokation for at se adresse, samlet antal pladser og ledige båse. Farvede indikatorer giver et hurtigt overblik."
    }
  },
  {
    "title": {
      "en": "Navigate to your chosen spot",
      "da": "Naviger til din valgte plads"
    },
    "body": {
      "en": "Choose a parking location and tap “Navigate me here” to continue to navigation. Check the available spaces before setting off.",
      "da": "Vælg en parkeringslokation, og tryk på “Naviger mig hertil” for at gå videre til navigation. Se antallet af ledige pladser, før du kører."
    }
  },
  {
    "title": {
      "en": "Search for a destination",
      "da": "Søg efter en destination"
    },
    "body": {
      "en": "Search for an address, shop or place by name. Choose a result to explore parking around the destination you have in mind.",
      "da": "Søg efter en adresse, butik eller et sted ved navn. Vælg et resultat for at udforske parkering omkring din destination."
    }
  },
  {
    "title": {
      "en": "Explore parking on the map",
      "da": "Udforsk parkering på kortet"
    },
    "body": {
      "en": "Explore the map to find parking locations and different parking types. Select a marker to see the location details and available spaces.",
      "da": "Udforsk kortet for at finde parkeringslokationer og forskellige parkeringstyper. Vælg en markør for at se detaljer og ledige pladser."
    }
  },
  {
    "title": {
      "en": "Filter for the parking you need",
      "da": "Filtrér efter den parkering, du har brug for"
    },
    "body": {
      "en": "Show the parking types relevant to your trip: regular parking, EV parking, charging stations, accessible spaces, tradesperson parking or shared cars.",
      "da": "Vis de parkeringstyper, der passer til din tur: almindelig parkering, elbilparkering, ladestandere, handicappladser, håndværkerparkering eller delebiler."
    }
  },
  {
    "title": {
      "en": "See the bigger picture",
      "da": "Få det store overblik"
    },
    "body": {
      "en": "Zoom out to explore parking across the city. Compare the coloured availability markers and zoom in on an area that works for your journey.",
      "da": "Zoom ud for at udforske parkering i hele byen. Sammenlign de farvede markører for tilgængelighed, og zoom ind på et område, der passer til din tur."
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
