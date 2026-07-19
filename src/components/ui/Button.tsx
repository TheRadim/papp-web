import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "text" | "dark";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  external?: boolean;
  className?: string;
}

export function Button({ href, children, variant = "primary", external = false, className = "" }: ButtonProps) {
  const classes = `papp-button papp-button--${variant} ${className}`.trim();

  if (external) {
    return (
      <a className={classes} href={href} target="_blank" rel="noreferrer">
        <span>{children}</span>
        <ArrowRight aria-hidden="true" size={17} />
      </a>
    );
  }

  return (
    <Link className={classes} href={href}>
      <span>{children}</span>
      <ArrowRight aria-hidden="true" size={17} />
    </Link>
  );
}
