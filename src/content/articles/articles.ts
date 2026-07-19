import type { Locale, Article } from "@/content/types";

export const articles: Article[] = [];

export function getArticles(_locale: Locale) {
  return articles.filter((article) => article.published);
}
