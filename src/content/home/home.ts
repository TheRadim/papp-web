import type { Locale } from "@/content/types";

export interface HomeContent {
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
  };
  process: {
    eyebrow: string;
    title: string;
    steps: Array<{ title: string; body: string }>;
  };
  featured: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
  };
  contact: {
    title: string;
    body: string;
    cta: string;
  };
  app: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
  };
}

export function getHomepageContent(locale: Locale): HomeContent {
  const content: Record<Locale, HomeContent> = {
    en: {
      hero: {
        eyebrow: "Reliable mobility monitoring",
        title: "Papp Mobility",
        lead: "Reliable data gathering for parking, streets and mobility decisions.",
        body: "Papp combines IoT sensors, camera analytics and Papp Insights to show how places are used, where capacity is hidden and what action should come next.",
        primaryCta: "Explore our solutions",
        secondaryCta: "View projects"
      },
      process: {
        eyebrow: "From movement to meaning",
        title: "A clearer path from data collection to decisions.",
        steps: [
          { title: "Collect", body: "Sensors and cameras measure real-world activity across parking areas, streets and selected mobility environments." },
          { title: "Understand", body: "Papp Insights reveals utilisation, duration, occupancy and patterns through live and historical views." },
          { title: "Act", body: "Analysis and consultancy help teams interpret findings and decide what should happen next." }
        ]
      },
      featured: {
        eyebrow: "Featured project",
        title: "Data reveals hidden parking capacity in Herning.",
        body: "Two parking areas at the same address showed very different occupancy patterns. Sensor data gave Herning a clearer picture of overlooked capacity and new ways to optimise the existing city centre.",
        cta: "See projects"
      },
      contact: {
        title: "Let's talk about what you need to understand.",
        body: "Bring us the mobility question, the site, or the decision you need to support. We will help define the right measurement approach.",
        cta: "Start the conversation"
      },
      app: {
        eyebrow: "Public app",
        title: "A related app experience for parking users.",
        body: "The Papp app remains a public-facing part of the ecosystem, while this website positions Papp's broader mobility-intelligence work.",
        cta: "Explore the app"
      }
    },
    da: {
      hero: {
        eyebrow: "Pålidelig mobilitetsmonitorering",
        title: "Papp Mobility",
        lead: "Pålidelig dataindsamling til parkering, gader og mobilitetsbeslutninger.",
        body: "Papp kombinerer IoT-sensorer, kameraanalyse og Papp Insights, så I kan se, hvordan steder bruges, hvor kapacitet er skjult, og hvad der bør ske bagefter.",
        primaryCta: "Udforsk løsninger",
        secondaryCta: "Se projekter"
      },
      process: {
        eyebrow: "Fra bevægelse til mening",
        title: "En tydelig vej fra dataindsamling til beslutninger.",
        steps: [
          { title: "Indsaml", body: "Sensorer og kameraer måler aktivitet på parkeringsarealer, gader og udvalgte mobilitetsmiljøer." },
          { title: "Forstå", body: "Papp Insights viser udnyttelse, varighed, belægning og mønstre gennem live og historiske visninger." },
          { title: "Handl", body: "Analyse og rådgivning hjælper teams med at fortolke resultater og beslutte næste skridt." }
        ]
      },
      featured: {
        eyebrow: "Udvalgt projekt",
        title: "Data afslører skjult parkeringskapacitet i Herning.",
        body: "To parkeringsarealer på samme adresse viste meget forskellige belægningsmønstre. Sensordata gav Herning et klarere billede af overset kapacitet og nye muligheder for at optimere den eksisterende bymidte.",
        cta: "Se projekter"
      },
      contact: {
        title: "Lad os tale om, hvad I har brug for at forstå.",
        body: "Kom med mobilitetsspørgsmålet, området eller beslutningen, I skal understøtte. Vi hjælper med at definere den rigtige målemetode.",
        cta: "Start dialogen"
      },
      app: {
        eyebrow: "Offentlig app",
        title: "En relateret appoplevelse for parkeringsbrugere.",
        body: "Papp-appen er fortsat en offentlig del af økosystemet, mens websitet løfter Papps bredere arbejde med mobilitetsindsigt.",
        cta: "Udforsk appen"
      }
    }
  };

  return content[locale];
}
