"use client";

import { useEffect, useRef, useState } from "react";
import type { HomeContent } from "@/content/home/home";

interface ProcessTimelineProps {
  steps: HomeContent["process"]["steps"];
}

export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    let frame = 0;

    function updateActiveStep() {
      const target = window.innerHeight * 0.52;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height * 0.5 - target);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    }

    function onScroll() {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateActiveStep);
    }

    updateActiveStep();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [steps.length]);

  return (
    <div className="process-timeline">
      <aside className="process-timeline__sticky" aria-hidden="true">
        <span className="process-timeline__number">{String(activeIndex + 1).padStart(2, "0")}</span>
      </aside>
      <ol className="process-timeline__stream" role="list">
        {steps.map((step, index) => (
          <li
            className={`${index === activeIndex ? "is-active" : ""} ${index < activeIndex ? "is-passed" : ""}`}
            key={step.title}
          >
            <article
              className={`process-flow__step process-flow__step--${index + 1}`}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
            >
              <div>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}
