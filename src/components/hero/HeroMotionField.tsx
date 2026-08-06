"use client";

import { useEffect, useRef } from "react";

type PointerState = {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  strength: number;
  targetStrength: number;
  lastMove: number;
};

function noise(x: number, y: number, time: number) {
  return (
    Math.sin(x * 0.014 + time * 1.6) * 0.42 +
    Math.sin(y * 0.022 - time * 1.15) * 0.28 +
    Math.sin((x + y) * 0.011 + time * 0.85) * 0.3
  );
}

export function HeroMotionField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;

    if (!canvas || !parent) {
      return;
    }

    const parentElement = parent;
    const canvasElement = canvas;
    const context = canvasElement.getContext("2d", { alpha: true });

    if (!context) {
      return;
    }

    const drawingContext = context;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer: PointerState = {
      x: 0.5,
      y: 0.5,
      targetX: 0.5,
      targetY: 0.5,
      strength: 0,
      targetStrength: 0,
      lastMove: 0
    };
    let frame = 0;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let isVisible = true;
    let lastRender = 0;

    function resize() {
      const rect = parentElement.getBoundingClientRect();
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.15);
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvasElement.width = Math.floor(width * pixelRatio);
      canvasElement.height = Math.floor(height * pixelRatio);
      canvasElement.style.width = `${width}px`;
      canvasElement.style.height = `${height}px`;
      drawingContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    }

    function draw(timestamp: number) {
      if (!isVisible || timestamp - lastRender < 33) {
        frame = window.requestAnimationFrame(draw);
        return;
      }

      lastRender = timestamp;
      const time = timestamp * 0.00042;
      drawingContext.clearRect(0, 0, width, height);

      pointer.x += (pointer.targetX - pointer.x) * 0.06;
      pointer.y += (pointer.targetY - pointer.y) * 0.06;

      if (timestamp - pointer.lastMove > 520) {
        pointer.targetStrength = 0;
      }

      pointer.strength += (pointer.targetStrength - pointer.strength) * 0.035;

      const gradient = drawingContext.createLinearGradient(width * 0.08, 0, width * 0.92, height);
      gradient.addColorStop(0, "rgba(0, 126, 181, 0.38)");
      gradient.addColorStop(0.52, "rgba(105, 185, 223, 0.2)");
      gradient.addColorStop(1, "rgba(251, 134, 127, 0.34)");

      const rowCount = width < 760 ? 34 : 48;
      const points = width < 760 ? 42 : 64;
      const left = -42;
      const right = width + 42;
      const verticalPad = Math.max(70, height * 0.16);
      const usableHeight = Math.max(1, height - verticalPad * 2);

      drawingContext.lineCap = "round";
      drawingContext.lineJoin = "round";
      drawingContext.globalCompositeOperation = "lighter";

      for (let row = 0; row < rowCount; row += 1) {
        const rowT = row / Math.max(rowCount - 1, 1);
        const baseY = verticalPad + rowT * usableHeight;
        drawingContext.beginPath();

        for (let column = 0; column < points; column += 1) {
          const columnT = column / Math.max(points - 1, 1);
          const x = left + columnT * (right - left);
          const wave = noise(x, baseY, time + row * 0.018);
          const secondWave = Math.sin(columnT * Math.PI * 4.5 + time * 2 + rowT * 5.4);
          const pointerX = pointer.x * width;
          const pointerY = pointer.y * height;
          const distance = Math.hypot(x - pointerX, baseY - pointerY);
          const influence = Math.exp(-(distance * distance) / (Math.max(width, height) * 0.23) ** 2) * pointer.strength;
          const y = baseY + wave * 26 + secondWave * 8 + Math.sin(distance * 0.032 - time * 5) * 46 * influence;
          const pulledX = x + Math.cos(distance * 0.018 + time * 3) * 24 * influence;

          if (column === 0) {
            drawingContext.moveTo(pulledX, y);
          } else {
            drawingContext.lineTo(pulledX, y);
          }
        }

        drawingContext.globalAlpha = 0.07 + Math.sin(rowT * Math.PI) * 0.05;
        drawingContext.filter = "blur(4px)";
        drawingContext.lineWidth = 4;
        drawingContext.strokeStyle = gradient;
        drawingContext.stroke();

        drawingContext.globalAlpha = 0.34 + Math.sin(rowT * Math.PI) * 0.1;
        drawingContext.filter = "none";
        drawingContext.lineWidth = 1.2;
        drawingContext.strokeStyle = row % 3 === 0 ? "rgba(0, 126, 181, 0.42)" : "rgba(251, 134, 127, 0.34)";
        drawingContext.stroke();
      }

      drawingContext.globalAlpha = 1;
      drawingContext.globalCompositeOperation = "source-over";
      drawingContext.filter = "none";

      if (!reducedMotion.matches) {
        frame = window.requestAnimationFrame(draw);
      }
    }

    function onPointerMove(event: PointerEvent) {
      const rect = parentElement.getBoundingClientRect();

      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) {
        return;
      }

      pointer.targetX = (event.clientX - rect.left) / Math.max(rect.width, 1);
      pointer.targetY = (event.clientY - rect.top) / Math.max(rect.height, 1);
      pointer.targetStrength = 1;
      pointer.lastMove = performance.now();
    }

    resize();
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry?.isIntersecting ?? true;
    }, { rootMargin: "180px" });

    observer.observe(parentElement);
    frame = window.requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <div className="hero-motion-field" aria-hidden="true">
      <canvas className="hero-wave-canvas" ref={canvasRef} />
    </div>
  );
}
