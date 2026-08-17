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

export function AboutFogBackground() {
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
        highlightColor: 0x0096ff,
        midtoneColor: 0xffffff,
        lowlightColor: 0x2284e6,
        baseColor: 0xffffff,
        blurFactor: 0.46,
        speed: 0.2,
        zoom: 0.1
      });
    }

    start().catch(() => {
      // Decorative only; the timeline remains fully readable without it.
    });

    return () => {
      cancelled = true;
      effect?.destroy();
    };
  }, []);

  return <div className="about-fog-background" ref={containerRef} aria-hidden="true" />;
}
