import { BarChart3, Handshake, RadioTower } from "lucide-react";
import type { Locale } from "@/content/types";
import { Button } from "@/components/ui/Button";

const categories = [
  {
    icon: RadioTower,
    title: { en: "Technology", da: "Teknologi" },
    body: {
      en: "Sensors and camera analytics that measure real behaviour in parking areas, streets and mobility environments.",
      da: "Sensorer og kameraanalyse, der måler reel adfærd på parkeringsarealer, gader og mobilitetsmiljøer."
    },
    href: "/solutions",
    cta: { en: "Explore technology", da: "Udforsk teknologi" }
  },
  {
    icon: BarChart3,
    title: { en: "Insights technical hub", da: "Insights teknisk hub" },
    body: {
      en: "Papp Insights brings measurements together in live views, historical comparisons and reporting workflows.",
      da: "Papp Insights samler målinger i livevisninger, historiske sammenligninger og rapporteringsflow."
    },
    href: "/products/insights",
    cta: { en: "Open Insights", da: "Åbn Insights" }
  },
  {
    icon: Handshake,
    title: { en: "Consultancy and guidance", da: "Rådgivning og ekspertise" },
    body: {
      en: "Measurement design, analysis and practical recommendations when decisions need a clearer data basis.",
      da: "Måledesign, analyse og praktiske anbefalinger, når beslutninger kræver et tydeligere datagrundlag."
    },
    href: "/services/consultancy",
    cta: { en: "See expertise", da: "Se ekspertise" }
  }
];

interface HomeCategoryCardsProps {
  locale: Locale;
}

export function HomeCategoryCards({ locale }: HomeCategoryCardsProps) {
  return (
    <div className="home-category-grid">
      {categories.map((category) => {
        const Icon = category.icon;

        return (
          <article className="home-category-card" key={category.title.en}>
            <Icon aria-hidden="true" size={28} />
            <h3>{category.title[locale]}</h3>
            <p>{category.body[locale]}</p>
            <Button href={`/${locale}${category.href}`} variant="text">
              {category.cta[locale]}
            </Button>
          </article>
        );
      })}
    </div>
  );
}
