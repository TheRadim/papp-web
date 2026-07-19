import type { Locale, LocalisedText } from "@/content/types";

export const locales: Locale[] = ["en", "da"];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function pick(locale: Locale, text: LocalisedText): string {
  return text[locale] || text.en;
}

export function localizedPath(locale: Locale, path = ""): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${cleanPath === "/" ? "" : cleanPath}`;
}

export const localeLabels: Record<Locale, string> = {
  en: "English",
  da: "Dansk"
};
