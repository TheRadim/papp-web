"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/content/types";

const stats = [
  {
    value: "32",
    label: { en: "projects completed", da: "projekter gennemført" }
  },
  {
    value: "24m",
    label: { en: "mobility datapoints", da: "mobilitetsdatapunkter" }
  },
  {
    value: "18k",
    label: { en: "cars detected daily", da: "biler registreret dagligt" }
  },
  {
    value: "12%",
    label: { en: "less search traffic potential", da: "potentiel reduktion i søgetrafik" }
  }
];

interface ProjectStatsOrbProps {
  locale: Locale;
}

export function ProjectStatsOrb({ locale }: ProjectStatsOrbProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % stats.length);
    }, 2400);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="project-stats-orb" aria-label={locale === "da" ? "Projektstatistik" : "Project statistics"}>
      <div className="project-stats-orb__rings" aria-hidden="true" />
      <div className="project-stats-orb__center">
        <strong>{stats[active].value}</strong>
        <span>{stats[active].label[locale]}</span>
      </div>
      <div className="project-stats-orb__items">
        {stats.map((stat, index) => (
          <button
            type="button"
            className={index === active ? "is-active" : ""}
            key={stat.value}
            onClick={() => setActive(index)}
          >
            <span>{stat.value}</span>
            {stat.label[locale]}
          </button>
        ))}
      </div>
    </div>
  );
}
