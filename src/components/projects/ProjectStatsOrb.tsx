"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/content/types";

const stats = [
  {
    value: "32",
    label: { en: "projects completed", da: "projekter gennemført" },
    body: {
      en: "Field work across parking areas, streets and city-centre environments.",
      da: "Feltarbejde på parkeringsarealer, gader og bymidtemiljøer."
    }
  },
  {
    value: "24m",
    label: { en: "mobility datapoints", da: "mobilitetsdatapunkter" },
    body: {
      en: "A growing data basis for comparing utilisation, flow and dwell time.",
      da: "Et voksende datagrundlag til at sammenligne udnyttelse, flow og opholdstid."
    }
  },
  {
    value: "18k",
    label: { en: "cars detected daily", da: "biler registreret dagligt" },
    body: {
      en: "Live camera and sensor observations converted into usable insight.",
      da: "Live kamera- og sensorobservationer omsat til brugbar indsigt."
    }
  },
  {
    value: "12%",
    label: { en: "search traffic potential", da: "potentiale i søgetrafik" },
    body: {
      en: "Project recommendations focus on reducing unnecessary circulation.",
      da: "Projektanbefalinger fokuserer på at reducere unødvendig cirkulation."
    }
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
    <div className="project-proof" aria-label={locale === "da" ? "Projektstatistik" : "Project statistics"}>
      <div className="project-proof__featured">
        <p>{locale === "da" ? "Aktivt signal" : "Active signal"}</p>
        <strong>{stats[active].value}</strong>
        <span>{stats[active].label[locale]}</span>
      </div>
      <div className="project-proof__grid">
        {stats.map((stat, index) => (
          <button
            type="button"
            className={index === active ? "is-active" : ""}
            key={stat.value}
            onClick={() => setActive(index)}
          >
            <span>{stat.value}</span>
            <strong>{stat.label[locale]}</strong>
            <em>{stat.body[locale]}</em>
          </button>
        ))}
      </div>
    </div>
  );
}
