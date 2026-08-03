import type { Metadata } from "next";
import type { Locale } from "@/content/types";
import { getOfferings } from "@/lib/content/accessors";
import { pageMetadata } from "@/lib/seo/metadata";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OfferingFeature } from "@/components/offerings/OfferingFeature";
import { MobilityCityVisual } from "@/components/hero/MobilityCityVisual";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(
    locale,
    {
      title: { en: "Solutions | Papp Mobility", da: "Løsninger | Papp Mobility" },
      description: {
        en: "Explore Papp Mobility solutions for sensors, cameras, insights, analysis and advisory.",
        da: "Udforsk Papp Mobilitys løsninger til sensorer, kameraer, indsigter, analyse og rådgivning."
      }
    },
    "/solutions"
  );
}

export default async function SolutionsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const offerings = getOfferings();

  return (
    <>
      <Section className="solutions-overview">
        <div className="solutions-hero-grid">
          <SectionHeading
            eyebrow={locale === "da" ? "Løsninger" : "Solutions"}
            title={locale === "da" ? "Fra måling til næste beslutning." : "From measurement to the next decision."}
            body={
              locale === "da"
                ? "Papp kombinerer sensorer, kameraer, Papp Insights, analyse og rådgivning, så mobilitetsdata bliver lette at forstå og handle på."
                : "Papp combines sensors, cameras, Papp Insights, analysis and advisory so mobility data becomes easier to understand and act on."
            }
          />
          <p className="solutions-hero-note">
            {locale === "da"
              ? "Klik på byen for at udforske, hvordan de enkelte produktområder arbejder sammen."
              : "Click the city to explore how each product area works together."}
          </p>
        </div>
        <div className="solutions-city-panel">
          <MobilityCityVisual locale={locale} className="mobility-city--solutions" />
        </div>
      </Section>
      <Section className="solutions-listing" tone="soft">
        <div className="offerings-stack">
          {offerings.map((offering, index) => (
            <OfferingFeature key={offering.slug} offering={offering} locale={locale} index={index} />
          ))}
        </div>
      </Section>
    </>
  );
}
