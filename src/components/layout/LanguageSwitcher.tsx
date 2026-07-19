import Link from "next/link";
import type { Locale } from "@/content/types";

interface LanguageSwitcherProps {
  locale: Locale;
  pathname: string;
}

export function LanguageSwitcher({ locale, pathname }: LanguageSwitcherProps) {
  const parts = pathname.split("/").filter(Boolean);
  const rest = parts.slice(1).join("/");
  const nextLocale: Locale = locale === "da" ? "en" : "da";
  const label = locale === "da" ? "ENG" : "DK";
  const ariaLabel = locale === "da" ? "Switch to English" : "Skift til dansk";

  return (
    <Link className="language-switcher" href={`/${nextLocale}${rest ? `/${rest}` : ""}`} aria-label={ariaLabel}>
      {label}
    </Link>
  );
}
