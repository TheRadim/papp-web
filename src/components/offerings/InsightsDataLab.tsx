"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
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
    title: "Dashboards and reporting that turn mobility data into something teams can read, share and act on.",
    intro: "Papp Insights visualises data from sensors, cameras and parking systems, so decision-makers can understand patterns over time.",
    area: "Area",
    date: "Date range",
    allAreas: "Parking network",
    allDates: "All dates",
    productTitle: "From mobility data to a clear picture",
    productParagraphs: [
      "Papp Insights brings data from sensors, cameras and connected parking systems into one place.",
      "Instead of working with isolated registrations or raw datasets, teams can explore how an area is actually being used: when vehicles arrive, how long they stay, where they come from, how demand changes over time and how different locations compare.",
      "Filter by area and time period, move from an overview into individual patterns, and combine different signals to understand not only how much activity takes place, but how that activity behaves."
    ],
    workflowTitle: "Measure, explore, understand, act",
    workflow: [
      {
        title: "Measure",
        body: "Cameras, sensors and connected parking infrastructure continuously describe how an area is being used."
      },
      {
        title: "Explore",
        body: "Choose an area, adjust the time period and filter the data around the question that matters."
      },
      {
        title: "Understand",
        body: "Turn thousands of registrations into patterns such as demand, dwell time, vehicle mix and recurring peaks."
      },
      {
        title: "Act",
        body: "Use those patterns to support planning, evaluate changes and communicate findings to stakeholders."
      }
    ],
    contextTitle: "From registrations to useful explanations.",
    context:
      "Papp Insights combines measured activity, vehicle profiles, origin signals and dwell time into views that help teams understand what is happening before deciding what to change.",
    hourly: "See when demand actually happens",
    hourlySub: "Hourly patterns show when vehicles arrive, when pressure builds and when capacity remains unused.",
    hourlyNote:
      "A daily total only tells part of the story. Understanding how demand changes through the day helps teams evaluate signage, pricing, operating hours or other interventions around the moments that actually matter.",
    heatmap: "Find patterns that repeat",
    heatmapSub: "Weekday and hour intensity makes recurring pressure visible.",
    heatmapTextTitle: "Mobility changes through the week.",
    heatmapText:
      "Combining weekday and hourly activity makes it easier to see whether pressure comes from a short morning peak, weekday commuting, weekend activity or a persistent capacity problem.",
    structure: "Look beyond a single metric",
    structureSub: "Hour, dwell time and origin cluster shown together in one interactive view.",
    structureTextTitle: "Some questions need more than one signal.",
    structureText:
      "Interactive visualisations make it possible to explore relationships between different signals, such as whether longer stays occur at particular times or whether visitors from further away behave differently.",
    dimensionsTitle: "One place to understand how an area moves",
    dimensionsIntro: "Depending on the available data sources, Papp Insights can bring together different dimensions of measured mobility behaviour.",
    dimensions: [
      "Visits over time",
      "Unique vehicles",
      "Arrival and departure patterns",
      "Dwell time",
      "Occupancy and utilisation",
      "Peak periods",
      "Vehicle profiles",
      "EV share",
      "Origin areas",
      "Location comparison",
      "Period comparison"
    ],
    comparisonTitle: "Compare places. Compare periods. See what changed.",
    comparison:
      "A number becomes much more useful when there is something to compare it with. Papp Insights lets teams look across different areas and time periods to separate temporary fluctuations from recurring patterns.",
    sharingTitle: "Insights that are easier to share",
    sharing:
      "Analysis becomes useful when other people can understand it. Papp Insights turns measured behaviour into clear visualisations and reporting for planning discussions and stakeholder communication.",
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
    title: "Dashboards og rapportering, der gør mobilitetsdata nemmere at læse, dele og handle på.",
    intro: "Papp Insights visualiserer data fra sensorer, kameraer og parkeringssystemer, så beslutningstagere kan forstå mønstre over tid.",
    area: "Område",
    date: "Datoperiode",
    allAreas: "Parkeringsnetværk",
    allDates: "Alle datoer",
    productTitle: "Fra mobilitetsdata til et klart billede",
    productParagraphs: [
      "Papp Insights samler data fra sensorer, kameraer og forbundne parkeringssystemer ét sted.",
      "I stedet for isolerede registreringer eller rå datasæt kan teams undersøge, hvordan et område faktisk bliver brugt: hvornår biler ankommer, hvor længe de bliver, hvor de kommer fra, og hvordan efterspørgslen ændrer sig over tid.",
      "Filtrer efter område og periode, gå fra overblik til mønstre, og kombiner flere signaler for at forstå både aktivitetens størrelse og adfærd."
    ],
    workflowTitle: "Mål, udforsk, forstå, handl",
    workflow: [
      {
        title: "Mål",
        body: "Kameraer, sensorer og forbundet parkeringsinfrastruktur beskriver løbende, hvordan et område bruges."
      },
      {
        title: "Udforsk",
        body: "Vælg område, juster perioden og filtrer data omkring det spørgsmål, der betyder noget."
      },
      {
        title: "Forstå",
        body: "Omsæt tusindvis af registreringer til mønstre som efterspørgsel, opholdstid, biltyper og peaks."
      },
      {
        title: "Handl",
        body: "Brug mønstrene til planlægning, evaluering af ændringer og kommunikation med interessenter."
      }
    ],
    contextTitle: "Fra registreringer til brugbare forklaringer.",
    context:
      "Papp Insights kombinerer aktivitet, bilprofiler, opland og opholdstid i visninger, der hjælper teams med at forstå situationen, før der vælges handling.",
    hourly: "Se hvornår efterspørgslen faktisk opstår",
    hourlySub: "Timemønstre viser, hvornår biler ankommer, hvornår presset stiger, og hvornår kapacitet står ubrugt.",
    hourlyNote:
      "Et dagsantal fortæller kun en del af historien. Timemønstre gør det lettere at vurdere skiltning, prissætning, åbningstider eller andre indsatser omkring de tidspunkter, der betyder noget.",
    heatmap: "Find mønstre der gentager sig",
    heatmapSub: "Ugedag og time gør tilbagevendende pres synligt.",
    heatmapTextTitle: "Mobilitet ændrer sig gennem ugen.",
    heatmapText:
      "Når ugedag og time kombineres, bliver det tydeligere, om presset kommer fra et kort morgenpeak, pendling, weekendaktivitet eller et vedvarende kapacitetsproblem.",
    structure: "Se længere end én metrik",
    structureSub: "Time, opholdstid og oplandsklynge vist sammen i én interaktiv visning.",
    structureTextTitle: "Nogle spørgsmål kræver flere signaler.",
    structureText:
      "Interaktive visualiseringer gør det muligt at undersøge relationer mellem flere signaler, for eksempel om lange ophold sker på bestemte tidspunkter, eller om brugere længere væk opfører sig anderledes.",
    dimensionsTitle: "Ét sted til at forstå, hvordan et område bevæger sig",
    dimensionsIntro: "Afhængigt af datakilderne kan Papp Insights samle flere dimensioner af målt mobilitetsadfærd.",
    dimensions: [
      "Besøg over tid",
      "Unikke køretøjer",
      "Ankomst og afgang",
      "Opholdstid",
      "Belægning og udnyttelse",
      "Peak-perioder",
      "Bilprofiler",
      "El-andel",
      "Oplandsområder",
      "Sammenligning af steder",
      "Sammenligning af perioder"
    ],
    comparisonTitle: "Sammenlign steder. Sammenlign perioder. Se hvad der ændrede sig.",
    comparison:
      "Et tal bliver langt mere brugbart, når det kan sammenlignes. Papp Insights lader teams se på tværs af områder og perioder, så midlertidige udsving kan adskilles fra mønstre, der gentager sig.",
    sharingTitle: "Indsigter der er nemmere at dele",
    sharing:
      "Analyse bliver først nyttig, når andre kan forstå den. Papp Insights omsætter målt adfærd til tydelige visualiseringer og rapportering til planlægning og dialog med interessenter.",
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
  const [dateRange, setDateRange] = useState<[number, number]>([0, Math.max(0, dates.length - 1)]);
  const startIndex = Math.min(dateRange[0], dateRange[1]);
  const endIndex = Math.max(dateRange[0], dateRange[1]);
  const startDate = dates[startIndex] ?? dates[0];
  const endDate = dates[endIndex] ?? dates[dates.length - 1];
  const dateRangeLabel = startDate && endDate ? `${formatDate(startDate, locale)} - ${formatDate(endDate, locale)}` : text.allDates;
  const startPercent = dates.length > 1 ? (startIndex / (dates.length - 1)) * 100 : 0;
  const endPercent = dates.length > 1 ? (endIndex / (dates.length - 1)) * 100 : 100;
  const rangeStyle = { "--range-start": `${startPercent}%`, "--range-end": `${endPercent}%` } as CSSProperties;
  const filteredRows = useMemo(
    () => rows.filter((row) => (area === "all" || row.area === area) && row.date >= startDate && row.date <= endDate),
    [area, endDate, startDate]
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
        <div className="insights-product-story">
          <div className="insights-product-story__copy">
            <h3>{text.productTitle}</h3>
            {text.productParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <ol className="insights-workflow" role="list" aria-label={text.workflowTitle}>
            {text.workflow.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h4>{step.title}</h4>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="insights-data-lab__preview">
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
              <div className="insights-data-lab__range-control" style={rangeStyle}>
                <span className="insights-data-lab__range-track" aria-hidden="true" />
                <input
                  aria-label={locale === "da" ? "Startdato" : "Start date"}
                  aria-valuetext={formatDate(startDate, locale)}
                  max={dates.length - 1}
                  min={0}
                  onChange={(event) => {
                    const next = Number(event.target.value);
                    setDateRange((current) => [Math.min(next, current[1]), current[1]]);
                  }}
                  step={1}
                  type="range"
                  value={startIndex}
                />
                <input
                  aria-label={locale === "da" ? "Slutdato" : "End date"}
                  aria-valuetext={formatDate(endDate, locale)}
                  max={dates.length - 1}
                  min={0}
                  onChange={(event) => {
                    const next = Number(event.target.value);
                    setDateRange((current) => [current[0], Math.max(next, current[0])]);
                  }}
                  step={1}
                  type="range"
                  value={endIndex}
                />
              </div>
              <strong>{dateRangeLabel}</strong>
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
        <div className="insights-capability-band">
          <div className="insights-capability-band__copy">
            <h3>{text.dimensionsTitle}</h3>
            <p>{text.dimensionsIntro}</p>
          </div>
          <div className="insights-capability-grid" aria-label={text.dimensionsTitle}>
            {text.dimensions.map((dimension) => (
              <span key={dimension}>{dimension}</span>
            ))}
          </div>
        </div>
        <div className="insights-comparison">
          <div>
            <h3>{text.comparisonTitle}</h3>
            <p>{text.comparison}</p>
          </div>
          <div className="insights-comparison__visual" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className="insights-share-note">
          <h3>{text.sharingTitle}</h3>
          <p>{text.sharing}</p>
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
  const heatmapHours = Array.from({ length: 12 }, (_, index) => index + 7);
  const dateCountsByWeekday = new Map<number, Set<string>>();

  safeRows.forEach((row) => {
    const day = new Date(`${row.date}T12:00:00`).getDay();
    const mondayIndex = (day + 6) % 7;
    const dateSet = dateCountsByWeekday.get(mondayIndex) ?? new Set<string>();
    dateSet.add(row.date);
    dateCountsByWeekday.set(mondayIndex, dateSet);
  });

  const heatmap = weekdays.map((_, dayIndex) => {
    const daysInSelection = dateCountsByWeekday.get(dayIndex)?.size || 1;

    return heatmapHours.map((hour) => {
      const count = safeRows.filter((row) => {
        const day = new Date(`${row.date}T12:00:00`).getDay();
        const mondayIndex = (day + 6) % 7;
        return mondayIndex === dayIndex && row.hour === hour;
      }).length;

      return Number((count / daysInSelection).toFixed(1));
    });
  });

  const lightLayout = () => ({
    autosize: true,
    margin: { l: 42, r: 18, t: 14, b: 36 },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(255,255,255,0)",
    showlegend: false,
    font: { color: "#444444", family: "Inter, system-ui, sans-serif", size: 11 },
    hoverlabel: { bgcolor: "#ffffff", bordercolor: "#47b2e4", font: { color: "#444444" } },
    xaxis: { fixedrange: true, gridcolor: "rgba(68,68,68,0.08)", zeroline: false },
    yaxis: { fixedrange: true, gridcolor: "rgba(68,68,68,0.08)", zeroline: false }
  });

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
      layout: { ...lightLayout(), height: 390 }
    },
    heatmap: {
      title: text.heatmap,
      subtitle: text.heatmapSub,
      data: [
        {
          type: "heatmap",
          x: heatmapHours.map((hour) => `${hour}`),
          y: weekdays,
          z: heatmap,
          colorscale: [
            [0, "#f8fbff"],
            [0.16, "#e4f0fb"],
            [0.42, "#a9cdf0"],
            [0.72, "#5f9ee2"],
            [1, "#2f73c8"]
          ],
          showscale: true,
          colorbar: {
            title: locale === "da" ? "Besøg pr. dag" : "Visits per day",
            thickness: 10,
            len: 0.82,
            outlinewidth: 0
          },
          xgap: 2,
          ygap: 2,
          hovertemplate: locale === "da" ? "%{y} %{x}:00<br>%{z} besøg pr. dag<extra></extra>" : "%{y} %{x}:00<br>%{z} visits per day<extra></extra>"
        }
      ],
      layout: {
        ...lightLayout(),
        height: 340,
        margin: { l: 48, r: 52, t: 12, b: 34 },
        xaxis: { fixedrange: true, side: "bottom", title: locale === "da" ? "Time" : "Hour", gridcolor: "#ffffff", zeroline: false },
        yaxis: { fixedrange: true, autorange: "reversed", gridcolor: "#ffffff", zeroline: false }
      }
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
        ...lightLayout(),
        height: 380,
        margin: { l: 6, r: 6, t: 4, b: 4 },
        dragmode: "orbit",
        scene: {
          bgcolor: "rgba(0,0,0,0)",
          xaxis: { title: { text: locale === "da" ? "Time" : "Hour" }, gridcolor: "rgba(68,68,68,0.08)", zeroline: false },
          yaxis: { title: { text: locale === "da" ? "Ophold" : "Dwell" }, gridcolor: "rgba(68,68,68,0.08)", zeroline: false },
          zaxis: { title: { text: locale === "da" ? "Opland" : "Origin" }, gridcolor: "rgba(68,68,68,0.08)", zeroline: false },
          camera: { eye: { x: 1.95, y: 1.82, z: 1.25 } },
          aspectmode: "cube"
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
