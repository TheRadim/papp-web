"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
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
  const targetProgressRef = useRef(0);
  const visualProgressRef = useRef(0);
  const frameRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    function measureProgress() {
      const element = timelineRef.current;
      if (!element) {
        return;
      }

      const rect = element.getBoundingClientRect();
      const cards = Array.from(element.querySelectorAll<HTMLElement>("[data-timeline-card]"));
      const viewportTarget = window.innerHeight * 0.5;
      const current = window.scrollY + viewportTarget;
      const centers = cards.map((card) => {
        const cardRect = card.getBoundingClientRect();
        return window.scrollY + cardRect.top + cardRect.height * 0.36;
      });

      if (centers.length > 1) {
        let segmentIndex = 0;

        for (let index = 0; index < centers.length - 1; index += 1) {
          if (current >= centers[index]) {
            segmentIndex = index;
          }
        }

        const segmentStart = centers[segmentIndex];
        const segmentEnd = centers[Math.min(segmentIndex + 1, centers.length - 1)];
        const segmentProgress = Math.min(Math.max((current - segmentStart) / Math.max(segmentEnd - segmentStart, 1), 0), 1);
        const timelineProgress = (segmentIndex + segmentProgress) / (centers.length - 1);

        targetProgressRef.current = current <= centers[0] ? 0 : Math.min(Math.max(timelineProgress, 0), 1);
      } else {
        const trackStart = rect.top + window.scrollY;
        const trackEnd = trackStart + rect.height;
        targetProgressRef.current = Math.min(Math.max((current - trackStart) / Math.max(trackEnd - trackStart, 1), 0), 1);
      }

      const nextActive = cards.reduce(
        (closest, card, index) => {
          const cardRect = card.getBoundingClientRect();
          const distance = Math.abs(cardRect.top + cardRect.height * 0.36 - viewportTarget);

          return distance < closest.distance ? { index, distance } : closest;
        },
        { index: 0, distance: Number.POSITIVE_INFINITY }
      ).index;

      setActiveIndex(nextActive);
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

  const style = {
    "--timeline-progress": `${progress}`,
    "--timeline-progress-percent": `${progress * 100}%`
  } as CSSProperties;

  return (
    <div className="history-timeline" ref={timelineRef} style={style}>
      <nav className="history-timeline__nav" aria-label={locale === "da" ? "Historie år" : "Timeline years"}>
        <span className="history-timeline__rail" aria-hidden="true" />
        <ol>
          {items.map((item, index) => (
            <li className={index <= activeIndex ? "is-passed" : undefined} key={item.date.da}>
              <a className={index === activeIndex ? "is-active" : undefined} href={`#timeline-${index}`}>
                <span aria-hidden="true" />
                {item.date[locale]}
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <div className="history-timeline__stream">
        {items.map((item, index) => (
          <article
            className={index <= activeIndex ? "is-passed" : undefined}
            data-timeline-card
            id={`timeline-${index}`}
            key={item.date.da}
          >
            <div className="history-timeline__date" aria-label={item.date[locale]}>
              <p>{item.date[locale]}</p>
            </div>
            <div className="history-timeline__card">
              <h3>{item.title[locale]}</h3>
              <span>{item.body[locale]}</span>
              {item.image ? (
                <div className={`history-timeline__media history-timeline__media--${item.imageFit ?? "cover"}`}>
                  <Image
                    src={withBasePath(item.image)}
                    alt=""
                    width={860}
                    height={520}
                    sizes="(max-width: 768px) 100vw, 42vw"
                  />
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
