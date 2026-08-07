"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Bell, Clock, Info, MapPinned, Navigation, Search } from "lucide-react";
import { company } from "@/content/global/company";
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

const icons = [MapPinned, Navigation, Search, Clock, Info, Bell];

export function AppFeatureSelector({ features, locale }: AppFeatureSelectorProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeFeature = features[activeIndex];

  useEffect(() => {
    if (isPaused || features.length < 2) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % features.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, [features.length, isPaused]);

  return (
    <div className="app-feature-selector" onBlur={() => setIsPaused(false)} onFocus={() => setIsPaused(true)} onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <div className="app-feature-selector__stage">
        <div className="app-feature-selector__phone" key={`phone-${activeIndex}`}>
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
          <div className="store-badges app-feature-selector__badges" aria-label={locale === "da" ? "Download appen" : "Download the app"}>
            <a href={company.appStoreUrl} target="_blank" rel="noreferrer">
              <Image src={withBasePath("/images/app/appstore-badge.png")} alt="Download on the App Store" width={193} height={66} />
            </a>
            <a href={company.googlePlayUrl} target="_blank" rel="noreferrer">
              <Image src={withBasePath("/images/app/googleplay-badge.png")} alt="Get it on Google Play" width={193} height={65} />
            </a>
          </div>
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
