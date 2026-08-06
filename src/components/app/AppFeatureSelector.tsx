"use client";

import Image from "next/image";
import { useState } from "react";
import { Info, MapPinned, Navigation } from "lucide-react";
import type { Locale } from "@/content/types";
import { withBasePath } from "@/lib/site/basePath";

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
      <div className="app-feature-selector__stage">
        <div className="app-feature-selector__phone">
          <Image
            src={withBasePath("/images/app/papp-app-phone.png")}
            alt=""
            width={580}
            height={1112}
            sizes="(max-width: 768px) 58vw, 240px"
          />
        </div>
        <article className="app-feature-selector__panel" id="app-feature-panel" role="tabpanel">
          <span>{String(activeIndex + 1).padStart(2, "0")}</span>
          <h2>{activeFeature.title[locale]}</h2>
          <p>{activeFeature.body[locale]}</p>
        </article>
      </div>
      <div className="app-feature-selector__buttons" role="tablist" aria-label={locale === "da" ? "Appfunktioner" : "App features"}>
        {features.map((feature, index) => {
          const Icon = icons[index] ?? Info;

          return (
            <button
              aria-label={feature.title[locale]}
              aria-controls="app-feature-panel"
              aria-selected={activeIndex === index}
              className={activeIndex === index ? "is-active" : undefined}
              key={feature.title.en}
              onClick={() => setActiveIndex(index)}
              role="tab"
              title={feature.title[locale]}
              type="button"
            >
              <span className="app-feature-selector__icon">
                <Icon aria-hidden="true" size={22} />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
