import type { Locale, Offering } from "@/content/types";

const sensorVisual = "/images/products/sensors/parking-sensor-closeup.jpg";
const cameraVisual = "/images/products/cameras/camera-street-measurement.jpg";
const insightVisual = "/images/projects/sensors/sensordata-herning-image12.png";
const analysisVisual = "/images/projects/consultancy/dataoptimering-faaborg-cover.jpg";
const consultancyVisual = "/images/projects/consultancy/erhvervsparkering-aalborg-cover.jpg";

export const offerings: Offering[] = [
  {
    slug: "sensors",
    category: "sensors",
    name: { en: "Parking Sensors", da: "Parkeringssensorer" },
    eyebrow: { en: "Technology", da: "Teknologi" },
    shortDescription: {
      en: "Precise parking data that turns occupancy, behaviour and demand into a usable decision basis.",
      da: "Præcis parkeringsdata, der gør belægning, adfærd og efterspørgsel til et brugbart beslutningsgrundlag."
    },
    introduction: {
      en: "Papp's IoT sensors help teams understand how parking areas are actually used, from live occupancy to long-term trends.",
      da: "Papps IoT-sensorer hjælper teams med at forstå, hvordan parkeringsområder faktisk bruges, fra live belægning til langsigtede mønstre."
    },
    benefits: [
      { en: "Live and historical occupancy views", da: "Live og historiske belægningsvisninger" },
      { en: "Utilisation and duration insight", da: "Indsigt i udnyttelse og varighed" },
      { en: "Support for parking and charging-space monitoring", da: "Understøtter overvågning af parkerings- og ladepladser" }
    ],
    useCases: [
      { en: "Municipal parking areas", da: "Kommunale parkeringsområder" },
      { en: "Private facilities and campuses", da: "Private anlæg og campusområder" },
      { en: "Long-term measurement programmes", da: "Langsigtede måleprogrammer" }
    ],
    process: [
      { en: "Define the spaces and questions to measure.", da: "Definer pladserne og spørgsmålene, der skal måles." },
      { en: "Install and connect the sensors.", da: "Installer og forbind sensorerne." },
      { en: "Review patterns in Papp Insights.", da: "Gennemgå mønstre i Papp Insights." }
    ],
    heroImage: sensorVisual,
    relatedProjectSlugs: ["sensordata-herning", "ladeindsigter-frederiksberg"],
    contentStatus: "draft",
    seo: {
      title: { en: "Parking Sensors | Papp Mobility", da: "Parkeringssensorer | Papp Mobility" },
      description: {
        en: "Understand occupancy, duration and utilisation with connected parking sensors.",
        da: "Forstå belægning, varighed og udnyttelse med forbundne parkeringssensorer."
      }
    }
  },
  {
    slug: "cameras",
    category: "cameras",
    name: { en: "Camera Analytics", da: "Kameraanalyse" },
    eyebrow: { en: "Technology", da: "Teknologi" },
    shortDescription: {
      en: "Camera-based measurement for larger parking areas, streets and vehicle activity.",
      da: "Kamerabaseret måling af større parkeringsområder, gader og køretøjsaktivitet."
    },
    introduction: {
      en: "Camera analytics help document flow, dwell time and utilisation where individual sensors are not the right fit.",
      da: "Kameraanalyse hjælper med at dokumentere flow, opholdstid og udnyttelse, hvor individuelle sensorer ikke er den rette løsning."
    },
    benefits: [
      { en: "Measure larger areas and street environments", da: "Mål større arealer og gademiljøer" },
      { en: "Understand flow, duration and activity patterns", da: "Forstå flow, varighed og aktivitetsmønstre" },
      { en: "Support temporary and permanent deployments", da: "Understøtter midlertidige og permanente opsætninger" }
    ],
    useCases: [
      { en: "Parking-area utilisation", da: "Udnyttelse af parkeringsarealer" },
      { en: "Street and curb activity", da: "Aktivitet på gader og kantsten" },
      { en: "Mobility measurement for planning", da: "Mobilitetsmåling til planlægning" }
    ],
    process: [
      { en: "Clarify the measurement area and privacy review needs.", da: "Afklar måleområdet og behovet for privacy-review." },
      { en: "Deploy cameras for the agreed measurement period.", da: "Opsæt kameraer i den aftalte måleperiode." },
      { en: "Use analytics to identify practical patterns.", da: "Brug analysen til at finde praktiske mønstre." }
    ],
    heroImage: cameraVisual,
    relatedProjectSlugs: ["parkeringsmoenstre-ishoej", "kystparkering-thisted"],
    contentStatus: "needs-review",
    seo: {
      title: { en: "Camera Analytics | Papp Mobility", da: "Kameraanalyse | Papp Mobility" },
      description: {
        en: "Use camera analytics to understand parking areas, streets and mobility flows.",
        da: "Brug kameraanalyse til at forstå parkeringsområder, gader og mobilitetsflow."
      }
    }
  },
  {
    slug: "insights",
    category: "insights",
    name: { en: "Papp Insights", da: "Papp Insights" },
    eyebrow: { en: "Platform", da: "Platform" },
    shortDescription: {
      en: "Dashboards and reporting that turn mobility data into something teams can read, share and act on.",
      da: "Dashboards og rapportering, der gør mobilitetsdata lette at læse, dele og handle på."
    },
    introduction: {
      en: "Papp Insights visualises data from sensors, cameras and parking guidance systems, so decision-makers can understand patterns over time.",
      da: "Papp Insights visualiserer data fra sensorer, kameraer og p-henvisningssystemer, så beslutningstagere kan forstå mønstre over tid."
    },
    benefits: [
      { en: "Live views and historical comparisons", da: "Live visninger og historiske sammenligninger" },
      { en: "Maps, charts and reporting support", da: "Kort, grafer og rapporteringsstøtte" },
      { en: "One place to understand mobility patterns", da: "Et samlet sted til at forstå mobilitetsmønstre" }
    ],
    useCases: [
      { en: "Operational overview", da: "Operationelt overblik" },
      { en: "Decision support", da: "Beslutningsstøtte" },
      { en: "Stakeholder reporting", da: "Rapportering til interessenter" }
    ],
    process: [
      { en: "Connect relevant data sources.", da: "Forbind relevante datakilder." },
      { en: "Explore patterns across time and place.", da: "Udforsk mønstre på tværs af tid og sted." },
      { en: "Share the insight with decision-makers.", da: "Del indsigten med beslutningstagere." }
    ],
    heroImage: insightVisual,
    relatedProjectSlugs: ["dataoptimering-faaborg"],
    contentStatus: "draft",
    seo: {
      title: { en: "Papp Insights | Papp Mobility", da: "Papp Insights | Papp Mobility" },
      description: {
        en: "Bring mobility data together in Papp Insights for live views, historical patterns and reporting.",
        da: "Saml mobilitetsdata i Papp Insights med live visninger, historiske mønstre og rapportering."
      }
    }
  },
  {
    slug: "analysis",
    category: "analysis",
    name: { en: "Analysis", da: "Analyse" },
    eyebrow: { en: "Expertise", da: "Ekspertise" },
    shortDescription: {
      en: "Turn raw mobility data into clear maps, graphs, reports and recommendations.",
      da: "Omsæt rå mobilitetsdata til klare kort, grafer, rapporter og anbefalinger."
    },
    introduction: {
      en: "Papp structures and analyses your data so teams can explain demand, compare periods and support decisions with evidence.",
      da: "Papp strukturerer og analyserer jeres data, så teams kan forklare efterspørgsel, sammenligne perioder og understøtte beslutninger med dokumentation."
    },
    benefits: [
      { en: "Pattern and period comparisons", da: "Mønstre og periodesammenligninger" },
      { en: "Clear reporting for decision-makers", da: "Klar rapportering til beslutningstagere" },
      { en: "Project questions answered with evidence", da: "Projektspørgsmål besvaret med datagrundlag" }
    ],
    useCases: [
      { en: "Before-and-after analysis", da: "Før- og efteranalyse" },
      { en: "Utilisation review", da: "Gennemgang af udnyttelse" },
      { en: "Planning recommendations", da: "Planlægningsanbefalinger" }
    ],
    heroImage: analysisVisual,
    relatedProjectSlugs: ["dataoptimering-faaborg"],
    contentStatus: "draft",
    seo: {
      title: { en: "Mobility Analysis | Papp Mobility", da: "Mobilitetsanalyse | Papp Mobility" },
      description: {
        en: "Turn mobility data into practical analysis, reporting and decision support.",
        da: "Omsæt mobilitetsdata til praktisk analyse, rapportering og beslutningsstøtte."
      }
    }
  },
  {
    slug: "consultancy",
    category: "consultancy",
    name: { en: "Consultancy", da: "Rådgivning" },
    eyebrow: { en: "Expertise", da: "Ekspertise" },
    shortDescription: {
      en: "Perspective and direction for teams that need to turn insight into workable mobility choices.",
      da: "Perspektiv og retning til teams, der skal omsætte indsigt til brugbare mobilitetsvalg."
    },
    introduction: {
      en: "We start with your situation, choose the right measurement setup together and stay close while findings become decisions.",
      da: "Vi tager udgangspunkt i jeres situation, finder den rigtige måleopsætning sammen og følger med, når resultaterne skal blive til beslutninger."
    },
    benefits: [
      { en: "Measurement design", da: "Måledesign" },
      { en: "Technology selection", da: "Valg af teknologi" },
      { en: "Interpretation and next-step planning", da: "Fortolkning og planlægning af næste skridt" }
    ],
    useCases: [
      { en: "Municipal mobility projects", da: "Kommunale mobilitetsprojekter" },
      { en: "Private operator planning", da: "Planlægning for private operatører" },
      { en: "Engineering partner support", da: "Support til ingeniørpartnere" }
    ],
    heroImage: consultancyVisual,
    relatedProjectSlugs: ["erhvervsparkering-aalborg"],
    contentStatus: "draft",
    seo: {
      title: { en: "Mobility Consultancy | Papp Mobility", da: "Mobilitetsrådgivning | Papp Mobility" },
      description: {
        en: "Plan mobility measurement and turn insight into practical decisions with Papp.",
        da: "Planlæg mobilitetsmåling og omsæt indsigt til praktiske beslutninger med Papp."
      }
    }
  }
];

export function getOfferings() {
  return offerings;
}

export function getOfferingBySlug(_locale: Locale, slug: string) {
  return offerings.find((offering) => offering.slug === slug);
}
