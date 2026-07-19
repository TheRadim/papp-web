interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "start" | "center";
}

export function SectionHeading({ eyebrow, title, body, align = "start" }: SectionHeadingProps) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {body ? <p>{body}</p> : null}
    </div>
  );
}
