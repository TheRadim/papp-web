import type { Metadata } from "next";
import Image from "next/image";
import type { Locale } from "@/content/types";
import { getHomepageContent } from "@/lib/content/accessors";
import { pageMetadata } from "@/lib/seo/metadata";
import { withBasePath } from "@/lib/site/basePath";
import { AppPromotion } from "@/components/app/AppPromotion";
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
  }
];

const appScreens = [
  {
    title: { en: "Live map context", da: "Live kortoverblik" },
    body: {
      en: "Give drivers a quick read on nearby parking options before they commit to a route.",
      da: "Giv bilister et hurtigt overblik over parkeringsmuligheder i nærheden, før de vælger rute."
    }
  },
  {
    title: { en: "Space details", da: "Detaljer om pladsen" },
    body: {
      en: "Surface practical context such as price, location and availability signals in one place.",
      da: "Vis praktisk kontekst som pris, placering og ledighedssignaler samlet ét sted."
    }
  },
  {
    title: { en: "Navigation handoff", da: "Direkte navigation" },
    body: {
      en: "Move from insight to action quickly with direct navigation from the selected location.",
      da: "Gå hurtigt fra information til handling med direkte navigation fra den valgte lokation."
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
      <AppPromotion locale={locale} content={content.app} showCta={false} />
      <Section className="app-feature-section">
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
        <AppFeatureSelector features={appFeatures} locale={locale} />
      </Section>
      <Section tone="soft" className="app-screens-section">
        <SectionHeading
          eyebrow={locale === "da" ? "Skærmbilleder" : "Screens"}
          title={locale === "da" ? "Plads til appens vigtigste brugerflow." : "Room for the app's core user flow."}
          body={
            locale === "da"
              ? "Når de endelige skærmbilleder er klar, kan de sættes ind her uden at ændre sidens struktur."
              : "When the final screenshots are ready, they can be dropped into this structure without changing the page."
          }
          align="center"
        />
        <div className="app-screens-list">
          {appScreens.map((screen, index) => (
            <article className={`app-screen-row ${index % 2 ? "app-screen-row--reverse" : ""}`} key={screen.title.en}>
              <div>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h2>{screen.title[locale]}</h2>
                <p>{screen.body[locale]}</p>
              </div>
              <div className="app-screen-row__media">
                <Image
                  src={withBasePath("/images/app/papp-app-phone.png")}
                  alt=""
                  width={580}
                  height={1112}
                  sizes="(max-width: 768px) 65vw, 260px"
                />
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
