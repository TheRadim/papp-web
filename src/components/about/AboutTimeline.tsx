"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/content/types";

interface TimelineItem {
  date: Record<Locale, string>;
  title: Record<Locale, string>;
  body: Record<Locale, string>;
}

interface AboutTimelineProps {
  items: TimelineItem[];
  locale: Locale;
}

export function AboutTimeline({ items, locale }: AboutTimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    function updateProgress() {
      const element = timelineRef.current;
      if (!element) {
        return;
      }

      const rect = element.getBoundingClientRect();
      const viewportMiddle = window.innerHeight * 0.5;
      const nextProgress = Math.min(Math.max((viewportMiddle - rect.top) / rect.height, 0), 1);
      setProgress(nextProgress);
    }

    function onScroll() {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateProgress);
    }

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const style = { "--timeline-progress": `${progress * 100}%` } as CSSProperties;

  return (
    <div className="history-timeline" ref={timelineRef} style={style}>
      <span className="history-timeline__rail" aria-hidden="true" />
      <span className="history-timeline__cursor" aria-hidden="true" />
      {items.map((item) => (
        <article key={item.date.da}>
          <p>{item.date[locale]}</p>
          <h3>{item.title[locale]}</h3>
          <span>{item.body[locale]}</span>
        </article>
      ))}
    </div>
  );
}
