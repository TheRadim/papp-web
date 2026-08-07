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

export function AboutTimeline({ items, locale }: AboutTimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    function measureActiveItem() {
      const element = timelineRef.current;

      if (!element) {
        return;
      }

      const cards = Array.from(element.querySelectorAll<HTMLElement>("[data-timeline-card]"));
      const target = window.innerHeight * 0.44;
      const nextActive = cards.reduce(
        (closest, card, index) => {
          const rect = card.getBoundingClientRect();
          const distance = Math.abs(rect.top + rect.height * 0.42 - target);

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
    <div className="history-accordion" ref={timelineRef}>
      <aside className="history-accordion__sticky" aria-label={locale === "da" ? "Tidslinjeår" : "Timeline years"}>
        <span className="history-accordion__rail" aria-hidden="true" />
        <ol className="history-accordion__dates" role="list">
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
      <ol className="history-accordion__list" role="list">
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
              <article className="history-accordion__item">
                <div className="history-accordion__summary">
                  <time dateTime={item.date.en}>{item.date[locale]}</time>
                  <h3>{item.title[locale]}</h3>
                  <span className="history-accordion__pm" aria-hidden="true" />
                </div>
                <div className="history-accordion__reveal">
                  <div className="history-accordion__panel">
                    <p>{item.body[locale]}</p>
                    {item.image ? (
                      <div className={`history-accordion__media history-accordion__media--${item.imageFit ?? "cover"}`}>
                        <Image src={withBasePath(item.image)} alt="" width={860} height={520} sizes="(max-width: 768px) 100vw, 620px" />
                      </div>
                    ) : null}
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
