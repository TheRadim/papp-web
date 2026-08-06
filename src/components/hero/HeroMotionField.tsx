"use client";

import type { CSSProperties } from "react";
import { useCallback, useEffect, useMemo, useRef } from "react";

interface Filing {
  x: number;
  y: number;
  phase: number;
  length: number;
  tone: "blue" | "coral";
}

const filingCount = 864;

function createFilings() {
  return Array.from({ length: filingCount }, (_, index) => {
    const column = index % 48;
    const row = Math.floor(index / 48);
    const staggerX = row % 2 === 0 ? 0 : 1.05;

    return {
      x: column * 2.1 + 0.35 + staggerX,
      y: row * 5.55 + 2.4,
      phase: ((index * 29) % 360) - 180,
      length: 8 + ((index * 7) % 9),
      tone: index % 4 === 0 ? "coral" : "blue"
    } satisfies Filing;
  });
}

export function HeroMotionField() {
  const fieldRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const filings = useMemo(() => createFilings(), []);

  const updatePointer = useCallback((clientX: number, clientY: number) => {
    const field = fieldRef.current;
    if (!field) {
      return;
    }

    const rect = field.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;

    if (frameRef.current) {
      window.cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = window.requestAnimationFrame(() => {
      const nextX = Math.min(Math.max(x, 0), 100);
      const nextY = Math.min(Math.max(y, 0), 100);

      field.style.setProperty("--field-x", `${nextX}`);
      field.style.setProperty("--field-y", `${nextY}`);
      field.style.setProperty("--field-drift-x", `${(nextX - 50) * 0.16}px`);
      field.style.setProperty("--field-drift-y", `${(nextY - 50) * 0.12}px`);
      field.style.setProperty("--field-angle", `${(nextX - 50) * 1.45 + (nextY - 50) * -1.05}deg`);
      frameRef.current = null;
    });
  }, []);

  useEffect(() => {
    function onPointerMove(event: PointerEvent) {
      updatePointer(event.clientX, event.clientY);
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }

      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [updatePointer]);

  return (
    <div
      className="hero-motion-field"
      ref={fieldRef}
      aria-hidden="true"
      onPointerLeave={() => {
        fieldRef.current?.style.setProperty("--field-x", "62");
        fieldRef.current?.style.setProperty("--field-y", "42");
        fieldRef.current?.style.setProperty("--field-drift-x", "1.9px");
        fieldRef.current?.style.setProperty("--field-drift-y", "-1px");
        fieldRef.current?.style.setProperty("--field-angle", "12deg");
      }}
    >
      {filings.map((filing, index) => {
        const style = {
          "--filing-x": `${filing.x}%`,
          "--filing-y": `${filing.y}%`,
          "--filing-phase": `${filing.phase}deg`,
          "--filing-length": `${filing.length}px`
        } as CSSProperties;

        return <span className={`hero-filing hero-filing--${filing.tone}`} key={index} style={style} />;
      })}
    </div>
  );
}
