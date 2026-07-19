import type { Metadata } from "next";
import type { Locale } from "@/content/types";
import { getTeam } from "@/lib/content/accessors";
import { pageMetadata } from "@/lib/seo/metadata";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

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
        <SectionHeading
          eyebrow={locale === "da" ? "Om Papp" : "About Papp"}
          title={locale === "da" ? "Vi gør fysisk mobilitet lettere at forstå." : "We make physical mobility easier to understand."}
          body={locale === "da" ? "Papp kombinerer sensorer, kameraer, Papp Insights, analyse og rådgivning, så byer og operatører kan træffe bedre beslutninger." : "Papp combines sensors, cameras, Papp Insights, analysis and consultancy so cities and operators can make better decisions."}
        />
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
