"use client";

import { useState } from "react";
import Link from "next/link";
import type { Category } from "@/lib/types";

const CATEGORY_LABELS: Record<string, string> = {
  all: "All",
  residential: "Residential",
  civic: "Civic",
  reuse: "Adaptive reuse",
  hospitality: "Hospitality",
  pavilion: "Pavilion & small",
};

export interface DisplayProject {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  year: number;
  location?: string;
  area?: string;
  tagline?: string;
  imgUrl: string | null;
}

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 8 H13 M9 4 L13 8 L9 12" />
    </svg>
  );
}

export function WorksClient({ projects }: { projects: DisplayProject[] }) {
  const [active, setActive] = useState<Category | "all">("all");

  const filtered = active === "all" ? projects : projects.filter((p) => p.category === active);
  const counts: Record<string, number> = { all: projects.length };
  projects.forEach((p) => { counts[p.category] = (counts[p.category] || 0) + 1; });

  return (
    <div className="works-index">
      <div className="filters" role="tablist">
        {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
          <button
            key={key}
            className={`filter${active === key ? " is-active" : ""}`}
            onClick={() => setActive(key as Category | "all")}
            role="tab"
            aria-selected={active === key}
          >
            {label}
            <span className="filter__count">{counts[key] || 0}</span>
          </button>
        ))}
      </div>

      <div className="works-list">
        {filtered.map((project, i) => (
          <Link
            key={project._id}
            className="work"
            href={`/works/${project.slug.current}`}
            data-cat={project.category}
          >
            {project.imgUrl
              // eslint-disable-next-line @next/next/no-img-element
              ? <img className="work__img" src={project.imgUrl} alt={project.title} />
              : <div className="work__img" aria-hidden="true" />
            }
            <span className="work__num">{String(i + 1).padStart(2, "0")}</span>
            <div className="work__overlay">
              <span className="work__tag">{CATEGORY_LABELS[project.category]} · {project.year}</span>
              <h3 className="work__title">{project.title}</h3>
              {project.location && (
                <p className="work__loc">
                  {project.location}{project.area ? ` · ${project.area}` : ""}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export { Arrow, CATEGORY_LABELS };
