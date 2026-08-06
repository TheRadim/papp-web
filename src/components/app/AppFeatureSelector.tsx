"use client";

import { useState } from "react";
import { Info, MapPinned, Navigation } from "lucide-react";
import type { Locale } from "@/content/types";

interface AppFeature {
  title: Record<Locale, string>;
  body: Record<Locale, string>;
}

interface AppFeatureSelectorProps {
  features: AppFeature[];
  locale: Locale;
}

const icons = [MapPinned, Navigation, Info];

export function AppFeatureSelector({ features, locale }: AppFeatureSelectorProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeFeature = features[activeIndex];

  return (
    <div className="app-feature-selector">
      <div className="app-feature-selector__buttons" role="tablist" aria-label={locale === "da" ? "Appfunktioner" : "App features"}>
        {features.map((feature, index) => {
          const Icon = icons[index] ?? Info;

          return (
            <button
              aria-controls="app-feature-panel"
              aria-selected={activeIndex === index}
              className={activeIndex === index ? "is-active" : undefined}
              key={feature.title.en}
              onClick={() => setActiveIndex(index)}
              role="tab"
              type="button"
            >
              <span className="app-feature-selector__icon">
                <Icon aria-hidden="true" size={24} />
              </span>
              <span className="app-feature-selector__label">{feature.title[locale]}</span>
            </button>
          );
        })}
      </div>
      <article className="app-feature-selector__panel" id="app-feature-panel" role="tabpanel">
        <span>{String(activeIndex + 1).padStart(2, "0")}</span>
        <h2>{activeFeature.title[locale]}</h2>
        <p>{activeFeature.body[locale]}</p>
      </article>
    </div>
  );
}
