import type { ReactNode } from "react";

type Props = { eyebrow?: string; title: ReactNode; description?: string };

export default function SectionHeading({ eyebrow, title, description }: Props) {
  return (
    <div className="section-heading reveal">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}
