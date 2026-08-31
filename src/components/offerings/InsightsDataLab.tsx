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

type PlotCollection = {
  hourly: PlotSpec;
  heatmap: PlotSpec;
  structure: PlotSpec;
};

const rows = demoData.rows as DemoRow[];
const dates = demoData.dates;
const plotConfig = {
  displaylogo: false,
  displayModeBar: false,
  responsive: true,
  scrollZoom: false,
  staticPlot: false
};

const copy = {
  en: {
    eyebrow: "Papp Insights",
    title: "Interactive data that makes patterns easier to discuss.",
    intro:
      "A simple layer for filtering measured parking behaviour, reading the key signals and turning raw registrations into decisions that people can understand.",
    area: "Area",
    date: "Date",
    allAreas: "Parking network",
    allDates: "All dates",
    contextTitle: "From registrations to useful explanations.",
    context:
      "Papp Insights combines measured activity, vehicle profiles, origin signals and dwell time into views that help teams understand what is happening before deciding what to change.",
    hourly: "Arrivals by hour",
    hourlySub: "A readable demand curve that shows when pressure builds and when capacity is unused.",
    hourlyNote:
      "Hourly patterns make it easier to plan signage, pricing, staffing or interventions around the moments that actually matter.",
    heatmap: "Demand heatmap",
    heatmapSub: "Weekday and hour intensity reveals recurring pressure points.",
    heatmapTextTitle: "Patterns become visible when time is layered.",
    heatmapText:
      "A heatmap lets teams see whether a problem is all-day demand, a short peak, a weekend pattern or a recurring operational bottleneck.",
    structure: "Visit structure in 3D",
    structureSub: "Hour, dwell time and origin cluster shown together.",
    structureTextTitle: "More than one metric at a time.",
    structureText:
      "Some questions need several dimensions at once. Interactive plots help reveal whether long stays, peak arrivals or distant visitors are connected.",
    metrics: {
      visits: "Visits",
      vehicles: "Unique vehicles",
      dwell: "Median dwell",
      ev: "EV share",
      origin: "Origin areas",
      peak: "Peak hour"
    }
  },
  da: {
    eyebrow: "Papp Insights",
    title: "Interaktive data, der gør mønstre nemmere at diskutere.",
    intro:
      "Et enkelt lag til at filtrere målt parkeringsadfærd, aflæse de vigtigste signaler og omsætte registreringer til beslutninger, der kan forstås.",
    area: "Område",
    date: "Dato",
    allAreas: "Parkeringsnetværk",
    allDates: "Alle datoer",
    contextTitle: "Fra registreringer til brugbare forklaringer.",
    context:
      "Papp Insights kombinerer aktivitet, bilprofiler, opland og opholdstid i visninger, der hjælper teams med at forstå situationen, før der vælges handling.",
    hourly: "Ankomster pr. time",
    hourlySub: "En tydelig efterspørgselskurve, der viser hvornår presset opstår.",
    hourlyNote:
      "Timemønstre gør det lettere at planlægge skiltning, prissætning, bemanding eller indsatser omkring de tidspunkter, der betyder noget.",
    heatmap: "Efterspørgsels-heatmap",
    heatmapSub: "Ugedag og time afslører tilbagevendende pres.",
    heatmapTextTitle: "Mønstre bliver tydelige, når tiden lægges i lag.",
    heatmapText:
      "Et heatmap viser, om problemet er heldagsefterspørgsel, et kort peak, et weekendmønster eller en tilbagevendende flaskehals.",
    structure: "Besøgsstruktur i 3D",
    structureSub: "Time, opholdstid og oplandsklynge vist sammen.",
    structureTextTitle: "Mere end én metrik ad gangen.",
    structureText:
      "Nogle spørgsmål kræver flere dimensioner på samme tid. Interaktive plots kan vise, om lange ophold, peak-ankomster eller fjerne brugere hænger sammen.",
    metrics: {
      visits: "Besøg",
      vehicles: "Unikke køretøjer",
      dwell: "Median ophold",
      ev: "El-andel",
      origin: "Oplandsområder",
      peak: "Peak-time"
    }
  }
};

export function InsightsDataLab({ locale }: { locale: Locale }) {
  const text = copy[locale];
  const [area, setArea] = useState("all");
  const [dateIndex, setDateIndex] = useState(0);
  const selectedDate = dateIndex === 0 ? "all" : dates[dateIndex - 1];
  const filteredRows = useMemo(
    () => rows.filter((row) => (area === "all" || row.area === area) && (selectedDate === "all" || row.date === selectedDate)),
    [area, selectedDate]
  );

  const metrics = useMemo(() => buildMetrics(filteredRows, locale), [filteredRows, locale]);
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
              {demoData.areas.map((item, index) => (
                <option key={item.area} value={item.area}>
                  {friendlyAreaLabel(item.area, index, locale)}
                </option>
              ))}
            </select>
          </label>
          <label className="insights-data-lab__slider-label">
            <span>{text.date}</span>
            <input
              aria-valuetext={selectedDate === "all" ? text.allDates : formatDate(selectedDate, locale)}
              max={dates.length}
              min={0}
              onChange={(event) => setDateIndex(Number(event.target.value))}
              step={1}
              type="range"
              value={dateIndex}
            />
            <strong>{selectedDate === "all" ? text.allDates : formatDate(selectedDate, locale)}</strong>
          </label>
        </div>
        <div className="insights-data-lab__metrics">
          {metrics.map((metric) => (
            <article key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              <p>{metric.detail}</p>
            </article>
          ))}
        </div>
        <div className="insights-data-lab__story">
          <h3>{text.contextTitle}</h3>
          <p>{text.context}</p>
        </div>
        <PlotCard className="insights-data-lab__card--wide" plot={plots.hourly} />
        <p className="insights-data-lab__note">{text.hourlyNote}</p>
        <div className="insights-data-lab__split">
          <PlotCard plot={plots.heatmap} />
          <div className="insights-data-lab__text-panel">
            <h3>{text.heatmapTextTitle}</h3>
            <p>{text.heatmapText}</p>
          </div>
        </div>
        <div className="insights-data-lab__split insights-data-lab__split--reverse">
          <div className="insights-data-lab__text-panel">
            <h3>{text.structureTextTitle}</h3>
            <p>{text.structureText}</p>
          </div>
          <PlotCard plot={plots.structure} />
        </div>
      </div>
    </section>
  );
}

function friendlyAreaLabel(area: string, index: number, locale: Locale) {
  if (area === "zoo") {
    return locale === "da" ? "Samlet parkeringsnetværk" : "Parking network";
  }

  return locale === "da" ? `Parkeringsområde ${index + 1}` : `Parking area ${index + 1}`;
}

function formatDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "da" ? "da-DK" : "en-GB", { day: "numeric", month: "short" }).format(new Date(`${date}T12:00:00`));
}

function buildMetrics(filteredRows: DemoRow[], locale: Locale) {
  const text = copy[locale].metrics;
  const safeRows = filteredRows.length ? filteredRows : rows;
  const uniqueVehicles = new Set(safeRows.map((row) => `${row.zip}-${row.manufacturer}-${row.vehicleType}`)).size;
  const uniqueZips = new Set(safeRows.filter((row) => row.zip !== "Unknown").map((row) => row.zip)).size;
  const sortedDwell = safeRows.map((row) => row.dwellMin).sort((a, b) => a - b);
  const medianDwell = sortedDwell[Math.floor(sortedDwell.length / 2)] ?? 0;
  const evShare = Math.round((safeRows.filter((row) => row.fuel === "EV").length / safeRows.length) * 100);
  const hourly = Array.from({ length: 24 }, (_, hour) => ({ hour, count: safeRows.filter((row) => row.hour === hour).length })).sort((a, b) => b.count - a.count)[0];

  return [
    { label: text.visits, value: safeRows.length.toLocaleString(locale === "da" ? "da-DK" : "en"), detail: locale === "da" ? "målte besøg" : "measured visits" },
    { label: text.vehicles, value: uniqueVehicles.toLocaleString(locale === "da" ? "da-DK" : "en"), detail: locale === "da" ? "genkendte profiler" : "recognised profiles" },
    { label: text.dwell, value: `${medianDwell}m`, detail: locale === "da" ? "inde i området" : "inside the area" },
    { label: text.ev, value: `${evShare}%`, detail: locale === "da" ? "batterielektriske" : "battery-electric" },
    { label: text.origin, value: uniqueZips.toLocaleString(locale === "da" ? "da-DK" : "en"), detail: locale === "da" ? "postnumre" : "postal areas" },
    { label: text.peak, value: `${hourly?.hour ?? 0}:00`, detail: locale === "da" ? `${hourly?.count ?? 0} besøg` : `${hourly?.count ?? 0} visits` }
  ];
}

function PlotCard({ className = "", plot }: { className?: string; plot: PlotSpec }) {
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
    <article className={`insights-data-lab__card ${className}`.trim()}>
      <div>
        <h3>{plot.title}</h3>
        <p>{plot.subtitle}</p>
      </div>
      <div className="insights-data-lab__plot" ref={plotRef} />
    </article>
  );
}

function buildPlots(filteredRows: DemoRow[], locale: Locale): PlotCollection {
  const text = copy[locale];
  const safeRows = filteredRows.length ? filteredRows : rows.slice(0, 120);
  const hourly = Array.from({ length: 24 }, (_, hour) => safeRows.filter((row) => row.hour === hour).length);
  const weekdays = locale === "da" ? ["Man", "Tir", "Ons", "Tor", "Fre", "Lor", "Son"] : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const heatmap = weekdays.map((_, dayIndex) =>
    Array.from({ length: 24 }, (_, hour) =>
      safeRows.filter((row) => {
        const day = new Date(`${row.date}T12:00:00`).getDay();
        const mondayIndex = (day + 6) % 7;
        return mondayIndex === dayIndex && row.hour === hour;
      }).length
    )
  );

  const lightLayout = {
    autosize: true,
    margin: { l: 42, r: 18, t: 14, b: 36 },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(255,255,255,0)",
    showlegend: false,
    font: { color: "#444444", family: "Inter, system-ui, sans-serif", size: 11 },
    hoverlabel: { bgcolor: "#ffffff", bordercolor: "#47b2e4", font: { color: "#444444" } },
    xaxis: { fixedrange: true, gridcolor: "rgba(68,68,68,0.08)", zeroline: false },
    yaxis: { fixedrange: true, gridcolor: "rgba(68,68,68,0.08)", zeroline: false }
  };

  return {
    hourly: {
      title: text.hourly,
      subtitle: text.hourlySub,
      data: [
        {
          type: "bar",
          x: Array.from({ length: 24 }, (_, hour) => `${hour}:00`),
          y: hourly,
          marker: { color: "rgba(71, 178, 228, 0.64)", line: { color: "#47b2e4", width: 1 } },
          hovertemplate: locale === "da" ? "%{x}<br>%{y} besøg<extra></extra>" : "%{x}<br>%{y} visits<extra></extra>"
        },
        {
          type: "scatter",
          mode: "lines",
          x: Array.from({ length: 24 }, (_, hour) => `${hour}:00`),
          y: movingAverage(hourly),
          line: { color: "#fb867f", width: 3, shape: "spline" },
          hovertemplate: locale === "da" ? "%{x}<br>%{y:.1f} glattet<extra></extra>" : "%{x}<br>%{y:.1f} smoothed<extra></extra>"
        }
      ],
      layout: { ...lightLayout, height: 390 }
    },
    heatmap: {
      title: text.heatmap,
      subtitle: text.heatmapSub,
      data: [
        {
          type: "heatmap",
          x: Array.from({ length: 24 }, (_, hour) => `${hour}`),
          y: weekdays,
          z: heatmap,
          colorscale: [
            [0, "#f7fbff"],
            [0.35, "#d7effb"],
            [0.7, "#7ccded"],
            [1, "#2f92c5"]
          ],
          showscale: false,
          hovertemplate: locale === "da" ? "%{y} %{x}:00<br>%{z} besøg<extra></extra>" : "%{y} %{x}:00<br>%{z} visits<extra></extra>"
        }
      ],
      layout: { ...lightLayout, height: 330, margin: { l: 48, r: 12, t: 12, b: 30 } }
    },
    structure: {
      title: text.structure,
      subtitle: text.structureSub,
      data: [
        {
          type: "scatter3d",
          mode: "markers",
          x: safeRows.map((row) => row.hour),
          y: safeRows.map((row) => row.dwellMin),
          z: safeRows.map((row) => Math.max(0, row.zipGroup || 0)),
          text: safeRows.map((row) => `${row.fuel}<br>${row.zip === "Unknown" ? (locale === "da" ? "Ukendt opland" : "Unknown origin") : row.zip}`),
          marker: {
            size: 3.8,
            color: safeRows.map((row) => (row.fuel === "EV" ? "#47b2e4" : row.fuel === "Hybrid" ? "#8fd4f0" : row.fuel === "ICE" ? "#fb867f" : "#dbeafe")),
            opacity: 0.82
          },
          hovertemplate: locale === "da" ? "%{text}<br>Time %{x}<br>%{y} min<extra></extra>" : "%{text}<br>Hour %{x}<br>%{y} min<extra></extra>"
        }
      ],
      layout: {
        ...lightLayout,
        height: 330,
        margin: { l: 0, r: 0, t: 4, b: 0 },
        scene: {
          bgcolor: "rgba(0,0,0,0)",
          dragmode: false,
          xaxis: { title: locale === "da" ? "Time" : "Hour", gridcolor: "rgba(68,68,68,0.08)", zeroline: false },
          yaxis: { title: locale === "da" ? "Ophold" : "Dwell", gridcolor: "rgba(68,68,68,0.08)", zeroline: false },
          zaxis: { title: locale === "da" ? "Opland" : "Origin", gridcolor: "rgba(68,68,68,0.08)", zeroline: false },
          camera: { eye: { x: 1.45, y: 1.35, z: 0.95 } }
        }
      }
    }
  };
}

function movingAverage(values: number[]) {
  return values.map((_, index) => {
    const start = Math.max(0, index - 2);
    const subset = values.slice(start, index + 1);
    return subset.reduce((total, value) => total + value, 0) / subset.length;
  });
}
