"use client";

import { useEffect, useRef } from "react";

type VantaFactory = (options: Record<string, unknown>) => { destroy: () => void };

declare global {
  interface Window {
    THREE?: unknown;
    VANTA?: Record<string, VantaFactory | undefined>;
  }
}

function loadScript(id: string, src: string) {
  const existing = document.getElementById(id) as HTMLScriptElement | null;

  if (existing?.dataset.loaded === "true") {
    return Promise.resolve();
  }

  return new Promise<void>((resolve, reject) => {
    const script = existing ?? document.createElement("script");
    script.id = id;
    script.src = src;
    script.async = true;
    script.onload = () => {
      script.dataset.loaded = "true";
      resolve();
    };
    script.onerror = () => reject(new Error(`Could not load ${src}`));

    if (!existing) {
      document.body.appendChild(script);
    }
  });
}

export function AboutHistoryFog() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let effect: { destroy: () => void } | null = null;
    let cancelled = false;

    async function start() {
      await loadScript("papp-three-r134", "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js");
      await loadScript("papp-vanta-fog", "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.fog.min.js");

      if (cancelled || !containerRef.current || !window.VANTA?.FOG) {
        return;
      }

      effect = window.VANTA.FOG({
        el: containerRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        highlightColor: 0xffffff,
        midtoneColor: 0xf7f7f7,
        lowlightColor: 0xdcf3ff,
        baseColor: 0xdcf1ff,
        blurFactor: 0.68,
        speed: 4.6,
        zoom: 0.6
      });
    }

    start().catch(() => {
      // The timeline stays readable if the decorative fog cannot load.
    });

    return () => {
      cancelled = true;
      effect?.destroy();
    };
  }, []);

  return <div className="about-history-fog" ref={containerRef} aria-hidden="true" />;
}
