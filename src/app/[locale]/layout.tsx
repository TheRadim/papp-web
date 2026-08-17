import { notFound } from "next/navigation";
import type { Locale } from "@/content/types";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ScrollRestoration } from "@/components/layout/ScrollRestoration";
import { isLocale } from "@/lib/i18n/locales";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "da" }];
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;

  return (
    <div className="site-shell">
      <Header locale={locale} />
      <ScrollRestoration />
      <main id="main">{children}</main>
      <Footer locale={locale} />
    </div>
  );
}
