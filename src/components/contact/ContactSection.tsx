import type { Locale } from "@/content/types";
import type { HomeContent } from "@/content/home/home";
import { ContactForm } from "@/components/contact/ContactForm";

interface ContactSectionProps {
  locale: Locale;
  content: HomeContent["contact"];
}

export function ContactSection({ locale, content }: ContactSectionProps) {
  return (
    <section className="contact-band">
      <div className="container">
        <div className="contact-band__copy">
          <p className="eyebrow">{locale === "da" ? "Kontakt" : "Contact"}</p>
          <h2>{content.title}</h2>
          <p>{content.body}</p>
        </div>
        <ContactForm locale={locale} />
      </div>
    </section>
  );
}
