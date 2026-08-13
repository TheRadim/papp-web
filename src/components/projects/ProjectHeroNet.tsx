"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    THREE?: unknown;
    VANTA?: {
      NET: (options: Record<string, unknown>) => { destroy: () => void };
    };
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

export function ProjectHeroNet() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let effect: { destroy: () => void } | null = null;
    let cancelled = false;

    async function start() {
      await loadScript("papp-three-r134", "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js");
      await loadScript("papp-vanta-net", "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js");

      if (cancelled || !containerRef.current || !window.VANTA?.NET) {
        return;
      }

      effect = window.VANTA.NET({
        el: containerRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1,
        scaleMobile: 1,
        color: 0xe88a59,
        backgroundColor: 0xffffff,
        points: 10,
        maxDistance: 20,
        spacing: 15,
        showDots: true
      });
    }

    start().catch(() => {
      // The page remains usable if the decorative network cannot load.
    });

    return () => {
      cancelled = true;
      effect?.destroy();
    };
  }, []);

  return <div className="project-hero-net" ref={containerRef} aria-hidden="true" />;
}
