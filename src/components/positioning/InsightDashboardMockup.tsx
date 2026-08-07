"use client";

import Image from "next/image";
import Link from "next/link";
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
  status: Record<Locale, string>;
  bars: number[];
  line: string;
  kpis: Array<{
    label: Record<Locale, string>;
    value: string;
    note: Record<Locale, string>;
    tone?: "ok" | "warn";
  }>;
  meters: Array<{
    label: Record<Locale, string>;
    value: number;
  }>;
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
    status: { en: "Capacity load", da: "Kapacitetsbelastning" },
    bars: [42, 58, 72, 64, 86, 78, 51],
    line: "M8 108 C44 66 82 82 118 44 S198 78 232 34 S304 42 344 20",
    kpis: [
      { label: { en: "Occupancy", da: "Belægning" }, value: "82%", note: { en: "live area load", da: "live områdeniveau" }, tone: "ok" },
      { label: { en: "Weekly peak", da: "Ugentligt peak" }, value: "91%", note: { en: "Friday 14:20", da: "fredag 14:20" }, tone: "warn" },
      { label: { en: "Avg dwell", da: "Gns. ophold" }, value: "41m", note: { en: "visitor median", da: "besøgsmedian" } },
      { label: { en: "Spaces", da: "Pladser" }, value: "1.8k", note: { en: "measured", da: "målt" } }
    ],
    meters: [
      { label: { en: "Weekday", da: "Hverdag" }, value: 82 },
      { label: { en: "Weekend", da: "Weekend" }, value: 54 },
      { label: { en: "Peak load", da: "Peak load" }, value: 91 }
    ]
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
    status: { en: "Median dwell", da: "Median ophold" },
    bars: [61, 44, 67, 73, 52, 38, 49],
    line: "M8 92 C42 48 82 64 118 76 S194 30 236 50 S294 98 344 38",
    kpis: [
      { label: { en: "Zip codes", da: "Postnumre" }, value: "127", note: { en: "origin clusters", da: "oplandsklynger" }, tone: "ok" },
      { label: { en: "Median stay", da: "Median ophold" }, value: "41m", note: { en: "by visit", da: "pr. besøg" } },
      { label: { en: "Repeat use", da: "Gentagne besøg" }, value: "22%", note: { en: "same catchment", da: "samme opland" } },
      { label: { en: "Catchment", da: "Opland" }, value: "34km", note: { en: "outer radius", da: "yderste radius" } }
    ],
    meters: [
      { label: { en: "Local", da: "Lokalt" }, value: 46 },
      { label: { en: "Regional", da: "Regionalt" }, value: 38 },
      { label: { en: "Visitor", da: "Besøg" }, value: 63 }
    ]
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
    status: { en: "Fossil mix", da: "Fossilt mix" },
    bars: [36, 54, 44, 75, 68, 84, 58],
    line: "M8 82 C52 80 76 34 112 38 S166 100 208 66 S284 20 344 58",
    kpis: [
      { label: { en: "EV share", da: "Elandel" }, value: "18%", note: { en: "detected", da: "registreret" }, tone: "ok" },
      { label: { en: "Fossil mix", da: "Fossilt mix" }, value: "63%", note: { en: "petrol/diesel", da: "benzin/diesel" } },
      { label: { en: "Private cars", da: "Private biler" }, value: "72%", note: { en: "user profile", da: "brugerprofil" } },
      { label: { en: "Fleet visits", da: "Flådebesøg" }, value: "11%", note: { en: "commercial", da: "erhverv" } }
    ],
    meters: [
      { label: { en: "EV", da: "El" }, value: 18 },
      { label: { en: "Hybrid", da: "Hybrid" }, value: 19 },
      { label: { en: "ICE", da: "Fossil" }, value: 63 }
    ]
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
    status: { en: "Lower wait potential", da: "Lavere ventepotentiale" },
    bars: [78, 71, 66, 54, 49, 38, 31],
    line: "M8 38 C50 44 76 84 112 70 S172 30 216 58 S286 112 344 72",
    kpis: [
      { label: { en: "Wait potential", da: "Ventepotentiale" }, value: "12%", note: { en: "less search traffic", da: "mindre søgetrafik" }, tone: "ok" },
      { label: { en: "Peak queue", da: "Peak-kø" }, value: "7m", note: { en: "observed", da: "observeret" }, tone: "warn" },
      { label: { en: "Flow rate", da: "Flowrate" }, value: "184/h", note: { en: "cars per hour", da: "biler pr. time" } },
      { label: { en: "Bottlenecks", da: "Flaskehalse" }, value: "2", note: { en: "priority zones", da: "prioritetszoner" } }
    ],
    meters: [
      { label: { en: "Entry", da: "Indkørsel" }, value: 72 },
      { label: { en: "Search", da: "Søgning" }, value: 64 },
      { label: { en: "Exit", da: "Udkørsel" }, value: 48 }
    ]
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
      <Link
        aria-label={locale === "da" ? "Åbn Papp Insights" : "Open Papp Insights"}
        className="insight-dashboard__device-link"
        href={`/${locale}/products/insights`}
      >
        <div className="insight-dashboard__device">
          <Image
            className="insight-dashboard__imac"
            src={withBasePath("/images/analytics/free-imac-blue.svg")}
            alt=""
            width={1200}
            height={900}
            sizes="(max-width: 768px) 100vw, 860px"
            unoptimized
          />
          <div className="insight-dashboard__screen" key={activeTab.id}>
            <div className="insight-dashboard__screen-header">
              <strong>
                <Activity aria-hidden="true" size={13} />
                {locale === "da" ? "Papp Insights" : "Papp Insights"}
              </strong>
              <span>{locale === "da" ? "Live datastrøm" : "Live data stream"}</span>
            </div>
            <div className="insight-dashboard__kpis">
              {activeTab.kpis.map((kpi) => (
                <article className={kpi.tone ? `is-${kpi.tone}` : undefined} key={kpi.label.en}>
                  <h4>{kpi.label[locale]}</h4>
                  <p>{kpi.value}</p>
                  <small>{kpi.note[locale]}</small>
                </article>
              ))}
            </div>
            <div className="insight-dashboard__chart-grid">
              <article className="insight-dashboard__panel insight-dashboard__panel--main">
                <div className="insight-dashboard__panel-heading">
                  <span>
                    <ActiveIcon aria-hidden="true" size={15} />
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
              </article>
              <article className="insight-dashboard__panel insight-dashboard__panel--side">
                <div className="insight-dashboard__panel-heading">
                  <span>{activeTab.status[locale]}</span>
                </div>
                <div className="insight-dashboard__meters">
                  {activeTab.meters.map((meter) => (
                    <div key={meter.label.en}>
                      <span>{meter.label[locale]}</span>
                      <em>{meter.value}%</em>
                      <i style={{ "--meter-width": `${meter.value}%` } as CSSProperties} />
                    </div>
                  ))}
                </div>
              </article>
            </div>
            <div className="insight-dashboard__copy">
              <p>{activeTab.title[locale]}</p>
              <span>{activeTab.body[locale]}</span>
            </div>
          </div>
        </div>
      </Link>
      <p className="insight-dashboard__caption">
        {locale === "da"
          ? "Papp Insights samler belægning, opland, biltyper og flow-/ventetidsmålinger i én platform, så data hurtigt kan omsættes til beslutninger."
          : "Papp Insights brings occupancy, origin patterns, vehicle mix and flow/wait-time measurements into one platform for decisions that are ready to use."}
      </p>
    </div>
  );
}
