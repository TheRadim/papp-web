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
  const targetProgressRef = useRef(0);
  const visualProgressRef = useRef(0);
  const frameRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [nodeThresholds, setNodeThresholds] = useState<number[]>([]);

  useEffect(() => {
    function measureNodeThresholds(element: HTMLDivElement) {
      const articles = Array.from(element.querySelectorAll("article"));
      const nextThresholds = articles.map((article) => {
        const dotStyle = window.getComputedStyle(article, "::before");
        const dotTop = Number.parseFloat(dotStyle.top) || 0;
        const dotHeight = Number.parseFloat(dotStyle.height) || 0;
        const dotCenter = article.offsetTop + dotTop + dotHeight / 2;

        return Math.min(Math.max(dotCenter / element.scrollHeight, 0), 1);
      });

      setNodeThresholds((currentThresholds) => {
        const changed =
          currentThresholds.length !== nextThresholds.length ||
          currentThresholds.some((threshold, index) => Math.abs(threshold - nextThresholds[index]) > 0.002);

        return changed ? nextThresholds : currentThresholds;
      });
    }

    function measureProgress() {
      const element = timelineRef.current;
      if (!element) {
        return;
      }

      measureNodeThresholds(element);
      const rect = element.getBoundingClientRect();
      const viewportMiddle = window.innerHeight * 0.5;
      targetProgressRef.current = Math.min(Math.max((viewportMiddle - rect.top) / rect.height, 0), 1);
    }

    function animateProgress() {
      const current = visualProgressRef.current;
      const target = targetProgressRef.current;
      const next = current + (target - current) * 0.16;

      visualProgressRef.current = Math.abs(target - next) < 0.001 ? target : next;
      setProgress(visualProgressRef.current);

      if (Math.abs(target - visualProgressRef.current) > 0.001) {
        frameRef.current = window.requestAnimationFrame(animateProgress);
      } else {
        frameRef.current = 0;
      }
    }

    function onScroll() {
      measureProgress();

      if (!frameRef.current) {
        frameRef.current = window.requestAnimationFrame(animateProgress);
      }
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.cancelAnimationFrame(frameRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const style = { "--timeline-progress": `${progress * 100}%` } as CSSProperties;

  return (
    <div className="history-timeline" ref={timelineRef} style={style}>
      <span className="history-timeline__rail" aria-hidden="true" />
      <span className="history-timeline__cursor" aria-hidden="true" />
      {items.map((item, index) => (
        <article className={progress >= (nodeThresholds[index] ?? 1) ? "is-passed" : undefined} key={item.date.da}>
          <p>{item.date[locale]}</p>
          <h3>{item.title[locale]}</h3>
          <span>{item.body[locale]}</span>
        </article>
      ))}
    </div>
  );
}
