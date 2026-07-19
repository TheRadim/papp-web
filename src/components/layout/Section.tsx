import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  id?: string;
  tone?: "default" | "soft" | "dark";
  className?: string;
}

export function Section({ children, id, tone = "default", className = "" }: SectionProps) {
  return (
    <section id={id} className={`papp-section papp-section--${tone} ${className}`.trim()}>
      <div className="container">{children}</div>
    </section>
  );
}
