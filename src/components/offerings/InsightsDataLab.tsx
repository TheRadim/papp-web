"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Locale } from "@/content/types";
import demoData from "@/content/insights/demo-data.json";

type DemoRow = {
  area: string;
  areaLabel: string;
  date: string;
  hour: number;
  dwellMin: number;
  zip: string;
  zipGroup: number;
  fuel: "EV" | "Hybrid" | "ICE" | "Other";
  vehicleType: string;
  usage: string;
  manufacturer: string;
};

type PlotSpec = {
  title: string;
  subtitle: string;
  data: Record<string, unknown>[];
  layout: Record<string, unknown>;
};

const rows = demoData.rows as DemoRow[];
const plotConfig = { displaylogo: false, responsive: true, scrollZoom: false };

const copy = {
  en: {
    eyebrow: "Interactive data",
    title: "See the patterns behind each parking decision.",
    intro:
      "Papp Insights can turn parking-area visits, dwell time, origin patterns and vehicle profiles into dashboards that can be filtered, explored and discussed directly.",
    area: "Area",
    date: "Date",
    allAreas: "All areas",
    allDates: "All dates",
    hourly: "Arrivals by hour",
    hourlySub: "Compare demand curves across measured visits.",
    zip: "Origin and dwell",
    zipSub: "See which postcodes create the longest stays.",
    scatter: "3D visit structure",
    scatterSub: "Explore hour, dwell time and origin cluster together."
  },
  da: {
    eyebrow: "Interaktive data",
    title: "Se mønstrene bag hver parkeringsbeslutning.",
    intro:
      "Papp Insights kan omsætte besøg, opholdstid, opland og bilprofiler til dashboards, der kan filtreres, udforskes og diskuteres direkte.",
    area: "Område",
    date: "Dato",
    allAreas: "Alle områder",
    allDates: "Alle datoer",
    hourly: "Ankomster pr. time",
    hourlySub: "Sammenlign efterspørgsel på tværs af målte besøg.",
    zip: "Opland og ophold",
    zipSub: "Se hvilke postnumre der skaber de længste ophold.",
    scatter: "3D besøgsstruktur",
    scatterSub: "Udforsk time, opholdstid og oplandsklynge sammen."
  }
};

export function InsightsDataLab({ locale }: { locale: Locale }) {
  const text = copy[locale];
  const [area, setArea] = useState("all");
  const [date, setDate] = useState("all");
  const filteredRows = useMemo(
    () => rows.filter((row) => (area === "all" || row.area === area) && (date === "all" || row.date === date)),
    [area, date]
  );

  const plots = useMemo(() => buildPlots(filteredRows, locale), [filteredRows, locale]);

  return (
    <section className="insights-data-lab papp-section">
      <div className="container">
        <div className="section-heading section-heading--center">
          <p className="eyebrow">{text.eyebrow}</p>
          <h2>{text.title}</h2>
          <p>{text.intro}</p>
        </div>
        <div className="insights-data-lab__controls" aria-label={locale === "da" ? "Datafiltre" : "Data filters"}>
          <label>
            <span>{text.area}</span>
            <select value={area} onChange={(event) => setArea(event.target.value)}>
              <option value="all">{text.allAreas}</option>
              {demoData.areas.map((item) => (
                <option key={item.area} value={item.area}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>{text.date}</span>
            <select value={date} onChange={(event) => setDate(event.target.value)}>
              <option value="all">{text.allDates}</option>
              {demoData.dates.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="insights-data-lab__grid">
          {plots.map((plot) => (
            <PlotCard key={plot.title} plot={plot} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PlotCard({ plot }: { plot: PlotSpec }) {
  const plotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const plotNode = plotRef.current;
    if (!plotNode) return;

    let cancelled = false;
    let loadedPlotly: Awaited<typeof import("plotly.js-dist-min")>["default"] | null = null;

    void import("plotly.js-dist-min").then((module) => {
      loadedPlotly = module.default;
      if (cancelled) return;
      void module.default.react(plotNode, plot.data, plot.layout, plotConfig);
    });

    return () => {
      cancelled = true;
      loadedPlotly?.purge(plotNode);
    };
  }, [plot]);

  return (
    <article className="insights-data-lab__card">
      <div>
        <h3>{plot.title}</h3>
        <p>{plot.subtitle}</p>
      </div>
      <div className="insights-data-lab__plot" ref={plotRef} />
    </article>
  );
}

function buildPlots(filteredRows: DemoRow[], locale: Locale): PlotSpec[] {
  const safeRows = filteredRows.length ? filteredRows : rows.slice(0, 80);
  const hourly = Array.from({ length: 24 }, (_, hour) => safeRows.filter((row) => row.hour === hour).length);
  const byZip = new Map<string, { count: number; dwell: number }>();

  for (const row of safeRows) {
    const current = byZip.get(row.zip) ?? { count: 0, dwell: 0 };
    current.count += 1;
    current.dwell += row.dwellMin;
    byZip.set(row.zip, current);
  }

  const topZips = Array.from(byZip.entries())
    .map(([zip, value]) => ({ zip, count: value.count, dwell: Math.round(value.dwell / value.count) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  const darkLayout = {
    autosize: true,
    margin: { l: 36, r: 16, t: 12, b: 34 },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
    font: { color: "#dbeafe", family: "Inter, system-ui, sans-serif", size: 11 },
    xaxis: { gridcolor: "rgba(219,234,254,0.09)", zeroline: false },
    yaxis: { gridcolor: "rgba(219,234,254,0.09)", zeroline: false }
  };

  return [
    {
      title: locale === "da" ? copy.da.hourly : copy.en.hourly,
      subtitle: locale === "da" ? copy.da.hourlySub : copy.en.hourlySub,
      data: [
        {
          type: "bar",
          x: Array.from({ length: 24 }, (_, hour) => `${hour}:00`),
          y: hourly,
          marker: { color: "rgba(71, 178, 228, 0.7)" },
          hovertemplate: "%{x}<br>%{y} visits<extra></extra>"
        },
        {
          type: "scatter",
          mode: "lines",
          x: Array.from({ length: 24 }, (_, hour) => `${hour}:00`),
          y: movingAverage(hourly),
          line: { color: "#fb867f", width: 3, shape: "spline" },
          hovertemplate: "%{x}<br>%{y:.1f} smoothed<extra></extra>"
        }
      ],
      layout: darkLayout
    },
    {
      title: locale === "da" ? copy.da.zip : copy.en.zip,
      subtitle: locale === "da" ? copy.da.zipSub : copy.en.zipSub,
      data: [
        {
          type: "bar",
          orientation: "h",
          x: topZips.map((zip) => zip.dwell),
          y: topZips.map((zip) => zip.zip),
          marker: { color: topZips.map((_, index) => (index % 2 ? "#8fd8f6" : "#fb867f")) },
          hovertemplate: "%{y}<br>%{x} min median-like dwell<extra></extra>"
        }
      ],
      layout: { ...darkLayout, margin: { l: 54, r: 16, t: 12, b: 28 } }
    },
    {
      title: locale === "da" ? copy.da.scatter : copy.en.scatter,
      subtitle: locale === "da" ? copy.da.scatterSub : copy.en.scatterSub,
      data: [
        {
          type: "scatter3d",
          mode: "markers",
          x: safeRows.map((row) => row.hour),
          y: safeRows.map((row) => row.dwellMin),
          z: safeRows.map((row) => row.zipGroup || 0),
          text: safeRows.map((row) => `${row.areaLabel}<br>${row.fuel}<br>${row.zip}`),
          marker: {
            size: 3.8,
            color: safeRows.map((row) => (row.fuel === "EV" ? "#47b2e4" : row.fuel === "Hybrid" ? "#fb867f" : "#dbeafe")),
            opacity: 0.82
          },
          hovertemplate: "%{text}<br>Hour %{x}<br>%{y} min<extra></extra>"
        }
      ],
      layout: {
        ...darkLayout,
        margin: { l: 0, r: 0, t: 4, b: 0 },
        scene: {
          bgcolor: "rgba(0,0,0,0)",
          xaxis: { title: "Hour", gridcolor: "rgba(219,234,254,0.08)", zeroline: false },
          yaxis: { title: "Dwell", gridcolor: "rgba(219,234,254,0.08)", zeroline: false },
          zaxis: { title: "Zip", gridcolor: "rgba(219,234,254,0.08)", zeroline: false },
          camera: { eye: { x: 1.45, y: 1.35, z: 0.95 } }
        }
      }
    }
  ];
}

function movingAverage(values: number[]) {
  return values.map((_, index) => {
    const start = Math.max(0, index - 2);
    const subset = values.slice(start, index + 1);
    return subset.reduce((total, value) => total + value, 0) / subset.length;
  });
}
