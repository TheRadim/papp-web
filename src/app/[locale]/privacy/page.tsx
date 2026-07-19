import type { Metadata } from "next";
import type { Locale } from "@/content/types";
import { pageMetadata } from "@/lib/seo/metadata";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(
    locale,
    {
      title: { en: "Privacy Policy | Papp Mobility", da: "Privatlivspolitik | Papp Mobility" },
      description: { en: "Privacy policy draft for Papp Mobility. Legal review required.", da: "Kladde til Papp Mobilitys privatlivspolitik. Juridisk review påkrævet." }
    },
    "/privacy"
  );
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return (
    <Section>
      <SectionHeading
        eyebrow={locale === "da" ? "Juridisk review påkrævet" : "Legal review required"}
        title={locale === "da" ? "Privatlivspolitik" : "Privacy Policy"}
        body={locale === "da" ? "Denne side er en migrationsplads. Eksisterende privacy-indhold skal migreres og juridisk godkendes før lancering." : "This page is a migration placeholder. Existing privacy content should be migrated and legally approved before launch."}
      />
    </Section>
  );
}
