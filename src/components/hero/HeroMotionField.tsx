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

const filingCount = 180;

function createFilings() {
  return Array.from({ length: filingCount }, (_, index) => {
    const column = index % 18;
    const row = Math.floor(index / 18);
    const staggerX = row % 2 === 0 ? 0 : 2.2;

    return {
      x: column * 5.65 + 1.8 + staggerX,
      y: row * 9.7 + 3.5,
      phase: ((index * 29) % 360) - 180,
      length: 12 + ((index * 7) % 7),
      tone: index % 5 === 0 ? "coral" : "blue"
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
      field.style.setProperty("--field-x", `${Math.min(Math.max(x, 0), 100)}`);
      field.style.setProperty("--field-y", `${Math.min(Math.max(y, 0), 100)}`);
      field.style.setProperty("--field-angle", `${(x - 50) * 0.7 + (y - 50) * -0.45}deg`);
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
        fieldRef.current?.style.setProperty("--field-angle", "12deg");
      }}
    >
      <div className="hero-motion-field__wash" />
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
