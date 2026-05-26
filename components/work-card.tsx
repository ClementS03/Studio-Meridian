import Link from "next/link";
import type { Project } from "@/lib/types";
import { sanityImageUrl } from "@/lib/image";

const FALLBACK_IMAGES: Record<string, string> = {
  residential: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1800&q=80",
  civic: "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=1400&q=80",
  reuse: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=80",
  hospitality: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1800&q=80",
  pavilion: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=2400&q=80",
  other: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80",
};

const CATEGORY_LABELS: Record<string, string> = {
  residential: "Residential",
  civic: "Civic",
  reuse: "Adaptive reuse",
  hospitality: "Hospitality",
  pavilion: "Pavilion",
  other: "Other",
};

interface WorkCardProps {
  project: Project;
  variant?: "regular" | "feature" | "wide" | "tall";
  showDesc?: boolean;
}

export function WorkCard({ project, variant = "regular", showDesc = false }: WorkCardProps) {
  const imgSrc = project.coverImage
    ? sanityImageUrl(project.coverImage, variant === "wide" ? 2400 : 1600)
    : FALLBACK_IMAGES[project.category] || FALLBACK_IMAGES.other;

  const className = `work${variant === "feature" ? " work--feature" : variant === "wide" ? " work--wide" : variant === "tall" ? " work--tall" : ""}`;

  return (
    <Link className={className} href={`/works/${project.slug.current}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="work__img" src={imgSrc} alt={project.title} />
      <div className="work__meta">
        <span className="work__tag">
          {CATEGORY_LABELS[project.category]} · {project.year}
        </span>
        <h3 className="work__title">{project.title}</h3>
        <div className="work__line">
          {project.location && <span>{project.location}</span>}
          {project.location && project.area && <span aria-hidden="true">·</span>}
          {project.area && <span>{project.area}</span>}
        </div>
        {showDesc && project.description && (
          <p className="work__desc">{project.description}</p>
        )}
      </div>
    </Link>
  );
}
