import type { Metadata } from "next";
import type { Locale, SeoContent } from "@/content/types";
import { pick } from "@/lib/i18n/locales";

const siteUrl = "https://www.pappmobility.com";

export function pageMetadata(locale: Locale, seo: SeoContent, path: string): Metadata {
  const title = pick(locale, seo.title);
  const description = pick(locale, seo.description);
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const canonical = `${siteUrl}/${locale}${cleanPath === "/" ? "" : cleanPath}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: `${siteUrl}/en${cleanPath === "/" ? "" : cleanPath}`,
        da: `${siteUrl}/da${cleanPath === "/" ? "" : cleanPath}`
      }
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Papp Mobility",
      locale,
      images: seo.socialImage ? [seo.socialImage] : ["/images/hero/mobility-city-visual.png"]
    }
  };
}
