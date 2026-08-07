"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { Activity, BarChart3, Car, Clock3, MapPinned } from "lucide-react";
import type { Locale } from "@/content/types";
import { withBasePath } from "@/lib/site/basePath";

type DashboardTab = {
  id: string;
  icon: typeof BarChart3;
  label: Record<Locale, string>;
  title: Record<Locale, string>;
  body: Record<Locale, string>;
  metric: string;
  bars: number[];
  line: string;
};

const tabs: DashboardTab[] = [
  {
    id: "occupancy",
    icon: BarChart3,
    label: { en: "Occupancy", da: "Belægning" },
    title: { en: "Occupancy, peaks and weekly demand", da: "Belægning, peaks og ugentlig efterspørgsel" },
    body: {
      en: "See how full areas become by hour, day and week, and compare regular demand against the moments that overload capacity.",
      da: "Se hvor fyldte områder bliver pr. time, dag og uge, og sammenlign normal efterspørgsel med de tidspunkter, hvor kapaciteten presses."
    },
    metric: "82%",
    bars: [42, 58, 72, 64, 86, 78, 51],
    line: "M8 108 C44 66 82 82 118 44 S198 78 232 34 S304 42 344 20"
  },
  {
    id: "origin",
    icon: MapPinned,
    label: { en: "Zip codes", da: "Postnumre" },
    title: { en: "Where users come from and how long they stay", da: "Hvor brugerne kommer fra og hvor længe de bliver" },
    body: {
      en: "Understand catchment, dwell time and repeat patterns so decisions are based on the actual users of a place.",
      da: "Forstå opland, opholdstid og gentagne mønstre, så beslutninger bygger på de faktiske brugere af et område."
    },
    metric: "41m",
    bars: [61, 44, 67, 73, 52, 38, 49],
    line: "M8 92 C42 48 82 64 118 76 S194 30 236 50 S294 98 344 38"
  },
  {
    id: "vehicles",
    icon: Car,
    label: { en: "Cars", da: "Biler" },
    title: { en: "Vehicle type, fuel mix and user profile", da: "Biltype, drivmiddel og brugerprofil" },
    body: {
      en: "Combine detection, registry context and site patterns to describe the traffic mix with more confidence.",
      da: "Kombinér registrering, bildatabase og lokale mønstre for at beskrive trafikmixet mere sikkert."
    },
    metric: "63%",
    bars: [36, 54, 44, 75, 68, 84, 58],
    line: "M8 82 C52 80 76 34 112 38 S166 100 208 66 S284 20 344 58"
  },
  {
    id: "flow",
    icon: Clock3,
    label: { en: "Flow", da: "Flow" },
    title: { en: "Car flow, waiting time and bottlenecks", da: "Bilflow, ventetid og flaskehalse" },
    body: {
      en: "Track how vehicles move through an area and where users lose time before a practical intervention is planned.",
      da: "Følg hvordan biler bevæger sig gennem et område, og hvor brugere mister tid, før en praktisk indsats planlægges."
    },
    metric: "12%",
    bars: [78, 71, 66, 54, 49, 38, 31],
    line: "M8 38 C50 44 76 84 112 70 S172 30 216 58 S286 112 344 72"
  }
];

interface InsightDashboardMockupProps {
  locale: Locale;
}

export function InsightDashboardMockup({ locale }: InsightDashboardMockupProps) {
  const [activeId, setActiveId] = useState(tabs[0].id);
  const activeTab = useMemo(() => tabs.find((tab) => tab.id === activeId) ?? tabs[0], [activeId]);
  const ActiveIcon = activeTab.icon;

  return (
    <div className="insight-dashboard" aria-label={locale === "da" ? "Interaktiv datavisning" : "Interactive data view"}>
      <div className="insight-dashboard__tabs" role="tablist" aria-label={locale === "da" ? "Datavisninger" : "Data views"}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.id === activeId;

          return (
            <button
              aria-selected={isActive}
              className={isActive ? "is-active" : undefined}
              key={tab.id}
              onClick={() => setActiveId(tab.id)}
              role="tab"
              type="button"
            >
              <Icon aria-hidden="true" size={18} />
              <span>{tab.label[locale]}</span>
            </button>
          );
        })}
      </div>
      <div className="insight-dashboard__device">
        <Image
          className="insight-dashboard__imac"
          src={withBasePath("/images/analytics/free-imac-blue.svg")}
          alt=""
          width={1200}
          height={900}
          sizes="(max-width: 768px) 100vw, 920px"
          unoptimized
        />
        <div className="insight-dashboard__screen" key={activeTab.id}>
          <div className="insight-dashboard__screen-header">
            <span>
              <ActiveIcon aria-hidden="true" size={17} />
              {activeTab.label[locale]}
            </span>
            <strong>{activeTab.metric}</strong>
          </div>
          <div className="insight-dashboard__chart">
            <svg aria-hidden="true" viewBox="0 0 352 128" preserveAspectRatio="none">
              <path d={activeTab.line} />
            </svg>
            <div className="insight-dashboard__bars" aria-hidden="true">
              {activeTab.bars.map((height, index) => (
                <span key={`${activeTab.id}-${index}`} style={{ "--bar-height": `${height}%` } as CSSProperties} />
              ))}
            </div>
          </div>
          <div className="insight-dashboard__copy">
            <p>{activeTab.title[locale]}</p>
            <span>{activeTab.body[locale]}</span>
          </div>
          <div className="insight-dashboard__status">
            <span><Activity aria-hidden="true" size={14} />{locale === "da" ? "Live datastrøm" : "Live data stream"}</span>
            <span>{locale === "da" ? "Eksportklar" : "Export ready"}</span>
          </div>
        </div>
      </div>
      <p className="insight-dashboard__caption">
        {locale === "da"
          ? "Vi omsætter rå mobilitetsdata til et klart beslutningsgrundlag, der kan deles, eksporteres og diskuteres med de rette interessenter."
          : "We turn raw mobility data into clear decision material that can be shared, exported and discussed with the people who need to act on it."}
      </p>
    </div>
  );
}
