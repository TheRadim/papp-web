"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/content/types";
import { withBasePath } from "@/lib/site/basePath";

interface TimelineItem {
  date: Record<Locale, string>;
  title: Record<Locale, string>;
  body: Record<Locale, string>;
  image?: string;
  imageFit?: "cover" | "contain";
}

interface AboutTimelineProps {
  items: TimelineItem[];
  locale: Locale;
}

function getYearSuffix(item: TimelineItem) {
  const match = item.date.en.match(/20\d{2}/);

  return match ? match[0].slice(2) : "26";
}

export function AboutTimeline({ items, locale }: AboutTimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = items[activeIndex] ?? items[0];
  const activeSuffix = activeItem ? getYearSuffix(activeItem) : "20";

  useEffect(() => {
    function measureActiveItem() {
      const element = timelineRef.current;

      if (!element) {
        return;
      }

      const cards = Array.from(element.querySelectorAll<HTMLElement>("[data-timeline-card]"));
      const target = window.innerHeight * 0.5;
      const nextActive = cards.reduce(
        (closest, card, index) => {
          const rect = card.getBoundingClientRect();
          const distance = Math.abs(rect.top + rect.height * 0.5 - target);

          return distance < closest.distance ? { index, distance } : closest;
        },
        { index: 0, distance: Number.POSITIVE_INFINITY }
      ).index;

      setActiveIndex(nextActive);
      frameRef.current = 0;
    }

    function onScroll() {
      if (!frameRef.current) {
        frameRef.current = window.requestAnimationFrame(measureActiveItem);
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

  return (
    <div className="history-showcase" ref={timelineRef}>
      <aside className="history-showcase__sticky" aria-label={locale === "da" ? "Aktivt tidslinjeår" : "Active timeline year"}>
        <div className="history-showcase__year" aria-hidden="true">
          <span>20</span>
          <span key={activeSuffix}>{activeSuffix}</span>
        </div>
        <div className="history-showcase__active">
          <time dateTime={activeItem?.date.en}>{activeItem?.date[locale]}</time>
          <strong>{activeItem?.title[locale]}</strong>
        </div>
        <ol className="history-showcase__dates" role="list">
          {items.map((item, index) => {
            const isActive = index === activeIndex;
            const isPassed = index < activeIndex;

            return (
              <li className={`${isActive ? "is-active" : ""} ${isPassed ? "is-passed" : ""}`.trim()} key={item.date.da}>
                <a href={`#timeline-${index}`}>
                  <span aria-hidden="true" />
                  {item.date[locale]}
                </a>
              </li>
            );
          })}
        </ol>
      </aside>
      <ol className="history-showcase__stream" role="list">
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          const isPassed = index < activeIndex;

          return (
            <li
              className={`${isActive ? "is-active" : ""} ${isPassed ? "is-passed" : ""}`.trim()}
              data-timeline-card
              id={`timeline-${index}`}
              key={item.date.da}
            >
              <article className="history-showcase__card">
                <div className="history-showcase__summary">
                  <time dateTime={item.date.en}>{item.date[locale]}</time>
                  <h3>{item.title[locale]}</h3>
                </div>
                <p>{item.body[locale]}</p>
                {item.image ? (
                  <div className={`history-showcase__media history-showcase__media--${item.imageFit ?? "cover"}`}>
                    <Image src={withBasePath(item.image)} alt="" width={860} height={520} sizes="(max-width: 768px) 100vw, 500px" />
                  </div>
                ) : null}
              </article>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
