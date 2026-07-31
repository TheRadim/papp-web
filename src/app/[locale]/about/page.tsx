import type { Metadata } from "next";
import type { Locale } from "@/content/types";
import { getTeam } from "@/lib/content/accessors";
import { pageMetadata } from "@/lib/seo/metadata";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const timeline = [
  {
    label: { en: "Starting point", da: "Udgangspunkt" },
    title: { en: "Parking questions became data questions.", da: "Parkeringsspørgsmål blev til dataspørgsmål." },
    body: {
      en: "Papp began with a practical need: make it easier to understand how parking and mobility spaces are actually used.",
      da: "Papp tog udgangspunkt i et praktisk behov: at gøre det lettere at forstå, hvordan parkerings- og mobilitetsarealer faktisk bliver brugt."
    }
  },
  {
    label: { en: "Data collection", da: "Dataindsamling" },
    title: { en: "Sensors and cameras made behaviour measurable.", da: "Sensorer og kameraer gjorde adfærd målbar." },
    body: {
      en: "IoT sensors, cameras and connected measurement setups turned occupancy, dwell time and flow into evidence.",
      da: "IoT-sensorer, kameraer og forbundne måleopsætninger gjorde belægning, opholdstid og flow til dokumentation."
    }
  },
  {
    label: { en: "Platform", da: "Platform" },
    title: { en: "Papp Insights brought the work into one view.", da: "Papp Insights samlede arbejdet i ét overblik." },
    body: {
      en: "Live and historical views made it easier for teams to read, compare and share mobility patterns.",
      da: "Live og historiske visninger gjorde det lettere for teams at læse, sammenligne og dele mobilitetsmønstre."
    }
  },
  {
    label: { en: "Today", da: "I dag" },
    title: { en: "Mobility intelligence, analysis and advice.", da: "Mobilitetsindsigt, analyse og rådgivning." },
    body: {
      en: "Papp now helps cities, operators and partners turn measurement into practical next steps.",
      da: "Papp hjælper i dag byer, operatører og partnere med at omsætte målinger til praktiske næste skridt."
    }
  }
];

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(
    locale,
    {
      title: { en: "About | Papp Mobility", da: "Om os | Papp Mobility" },
      description: {
        en: "Learn how Papp Mobility connects data collection, analysis and advisory work.",
        da: "Læs hvordan Papp Mobility forbinder dataindsamling, analyse og rådgivning."
      }
    },
    "/about"
  );
}

export default async function AboutPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const team = getTeam(locale);

  return (
    <>
      <Section>
        <div className="about-hero-block">
          <SectionHeading
            eyebrow={locale === "da" ? "Om Papp" : "About Papp"}
            title={locale === "da" ? "Vi gør fysisk mobilitet lettere at forstå." : "We make physical mobility easier to understand."}
            body={locale === "da" ? "Papp kombinerer sensorer, kameraer, Papp Insights, analyse og rådgivning, så byer og operatører kan træffe bedre beslutninger." : "Papp combines sensors, cameras, Papp Insights, analysis and consultancy so cities and operators can make better decisions."}
          />
        </div>
      </Section>
      <Section tone="soft">
        <div className="about-timeline-layout">
          <SectionHeading
            eyebrow={locale === "da" ? "Historie" : "History"}
            title={locale === "da" ? "Fra parkeringsdata til mobilitetsindsigt." : "From parking data to mobility intelligence."}
            body={locale === "da" ? "En enkel fortælling om, hvordan Papps arbejde har udviklet sig. Konkrete årstal og offentlige milepæle kan tilføjes, når de er bekræftet." : "A simple story of how Papp's work has developed. Specific dates and public milestones can be added once confirmed."}
          />
          <div className="history-timeline">
            {timeline.map((item) => (
              <article key={item.label.en}>
                <p>{item.label[locale]}</p>
                <h3>{item.title[locale]}</h3>
                <span>{item.body[locale]}</span>
              </article>
            ))}
          </div>
        </div>
      </Section>
      <Section tone="soft">
        <SectionHeading
          eyebrow={locale === "da" ? "Team" : "Team"}
          title={team.length ? (locale === "da" ? "Mød teamet" : "Meet the team") : locale === "da" ? "Teamindhold mangler" : "Team content needed"}
          body={locale === "da" ? "Navne, roller, biografier, billeder og LinkedIn-links skal leveres eller bekræftes." : "Names, roles, biographies, images and LinkedIn links should be supplied or confirmed."}
        />
      </Section>
    </>
  );
}
