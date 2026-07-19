import type { Metadata } from "next";
import Link from "next/link";
import type { Locale } from "@/content/types";
import { company } from "@/content/global/company";
import { pageMetadata } from "@/lib/seo/metadata";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(
    locale,
    {
      title: { en: "Contact | Papp Mobility", da: "Kontakt | Papp Mobility" },
      description: { en: "Contact Papp Mobility about sensors, camera analytics, Insights, analysis or consultancy.", da: "Kontakt Papp Mobility om sensorer, kameraanalyse, Insights, analyse eller rådgivning." }
    },
    "/contact"
  );
}

export default async function ContactPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return (
    <Section>
      <div className="contact-page-grid">
        <div>
          <SectionHeading
            eyebrow={locale === "da" ? "Kontakt" : "Contact"}
            title={locale === "da" ? "Fortæl os, hvad I har brug for at forstå." : "Tell us what you need to understand."}
            body={locale === "da" ? "Del området, spørgsmålet eller beslutningen, I arbejder med. Så finder vi den rigtige måde at måle og analysere på." : "Share the site, question or decision you are working on. We will help shape the right way to measure and analyse it."}
          />
          <p>
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </p>
          <p className="contact-privacy-link">
            <Link href={`/${locale}/privacy`}>{locale === "da" ? "Privatlivspolitik" : "Privacy Policy"}</Link>
          </p>
        </div>
        <ContactForm locale={locale} />
      </div>
    </Section>
  );
}
