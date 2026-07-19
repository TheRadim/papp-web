import type { Metadata } from "next";
import type { Locale } from "@/content/types";
import { getHomepageContent } from "@/lib/content/accessors";
import { pageMetadata } from "@/lib/seo/metadata";
import { AppPromotion } from "@/components/app/AppPromotion";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

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
          eyebrow={locale === "da" ? "Status" : "Status"}
          title={locale === "da" ? "Find ledige pladser i realtid" : "Find available spaces in real time"}
          body={locale === "da" ? "Appen hjælper brugere med at finde ledige parkeringspladser og viser blandt andet erhvervs- og handicapparkering, hvor data er tilgængelig." : "The app helps users find available parking spaces and can show business and accessible parking where data is available."}
        />
      </Section>
    </>
  );
}
