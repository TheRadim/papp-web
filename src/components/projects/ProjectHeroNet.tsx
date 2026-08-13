"use client";

import { useEffect, useRef } from "react";

export function ProjectHeroNet() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const canvasElement = canvas;
    const drawingContext = context;
    const parentElement = parent;
    let frame = 0;
    let width = 0;
    let height = 0;
    let points: Array<{ x: number; y: number; ox: number; oy: number; phase: number }> = [];
    const pointer = { x: -9999, y: -9999 };
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    function resize() {
      const box = parentElement.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = Math.max(1, box.width);
      height = Math.max(260, box.height);
      canvasElement.width = Math.floor(width * ratio);
      canvasElement.height = Math.floor(height * ratio);
      canvasElement.style.width = `${width}px`;
      canvasElement.style.height = `${height}px`;
      drawingContext.setTransform(ratio, 0, 0, ratio, 0, 0);

      const spacing = width < 720 ? 78 : 88;
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;
      points = [];

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          points.push({
            x: col * spacing,
            y: row * spacing,
            ox: col * spacing,
            oy: row * spacing,
            phase: (row * 0.73 + col * 0.41) * Math.PI
          });
        }
      }
    }

    function draw(time: number) {
      drawingContext.clearRect(0, 0, width, height);
      const t = time * 0.00045;

      points.forEach((point) => {
        const dx = point.ox - pointer.x;
        const dy = point.oy - pointer.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const pull = Math.max(0, 1 - distance / 190);
        point.x = point.ox + Math.sin(t + point.phase) * 8 + (dx / Math.max(distance, 1)) * pull * 14;
        point.y = point.oy + Math.cos(t * 0.9 + point.phase) * 8 + (dy / Math.max(distance, 1)) * pull * 14;
      });

      drawingContext.lineWidth = 1;

      for (let i = 0; i < points.length; i += 1) {
        const a = points[i];
        for (let j = i + 1; j < points.length; j += 1) {
          const b = points[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 126) {
            drawingContext.strokeStyle = `rgba(225, 113, 44, ${0.16 * (1 - distance / 126)})`;
            drawingContext.beginPath();
            drawingContext.moveTo(a.x, a.y);
            drawingContext.lineTo(b.x, b.y);
            drawingContext.stroke();
          }
        }
      }

      drawingContext.fillStyle = "rgba(225, 113, 44, 0.24)";
      points.forEach((point) => {
        drawingContext.beginPath();
        drawingContext.arc(point.x, point.y, 1.4, 0, Math.PI * 2);
        drawingContext.fill();
      });

      if (!media.matches) {
        frame = window.requestAnimationFrame(draw);
      }
    }

    function onPointerMove(event: PointerEvent) {
      const rect = canvasElement.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    }

    function onPointerLeave() {
      pointer.x = -9999;
      pointer.y = -9999;
    }

    resize();
    draw(0);
    if (!media.matches) frame = window.requestAnimationFrame(draw);

    window.addEventListener("resize", resize);
    parentElement.addEventListener("pointermove", onPointerMove);
    parentElement.addEventListener("pointerleave", onPointerLeave);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      parentElement.removeEventListener("pointermove", onPointerMove);
      parentElement.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return <canvas className="project-hero-net" ref={canvasRef} aria-hidden="true" />;
}
