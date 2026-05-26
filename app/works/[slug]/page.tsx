import Link from "next/link";
import type { Metadata } from "next";
import { getProjectBySlug, getProjectSlugs } from "@/sanity/queries/projects";
import { CtaBand } from "@/components/cta-band";
import { PortableText } from "@/lib/portable-text";
import { sanityImageUrl } from "@/lib/image";

const CATEGORY_LABELS: Record<string, string> = {
  residential: "Residential", civic: "Civic", reuse: "Adaptive reuse",
  hospitality: "Hospitality", pavilion: "Pavilion", other: "Other",
};

const GALLERY_FALLBACKS = [
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2400&q=80",
];

export async function generateStaticParams() {
  const slugs = await getProjectSlugs().catch(() => []);
  return slugs.map((s) => ({ slug: s.slug.current }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug).catch(() => null);
  if (!project) return {};
  return {
    title: project.title,
    description: project.tagline,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug).catch(() => null);

  // Fallback data for demo
  const demoProject = {
    title: "Hovden Lake House",
    category: "residential" as const,
    year: 2024,
    location: "Hovden, Norway",
    area: "980 m²",
    status: "Completed",
    recognition: "Træprisen 2024",
    photography: "Studio archive",
    tagline: "A black-stained pine house on a lakeside ridge.",
    coverImage: null as null,
    gallery: null as null,
    content: null as null,
    prevProject: null as null,
    nextProject: null as null,
  };

  const data = project || demoProject;

  const coverSrc = project?.coverImage
    ? sanityImageUrl(project.coverImage, 2400)
    : "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2400&q=80";

  return (
    <main>
      {/* ── PAGE HERO ── */}
      <section className="page-hero">
        <div className="page-hero__title">
          <div className="eyebrow">
            <span className="bullet" />
            {CATEGORY_LABELS[data.category]} · {data.year}
          </div>
          <h1 className="display display--lg">{data.title}</h1>
        </div>
        <div>
          <p className="page-hero__desc">{data.tagline}</p>
          <div className="page-hero__meta">
            {data.location && <span>{data.location}</span>}
            {data.area && <span>{data.area}</span>}
            {data.status && <span>{data.status}</span>}
          </div>
        </div>
      </section>

      {/* ── COVER ── */}
      <div className="project-cover">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={coverSrc} alt={data.title} />
      </div>

      {/* ── BODY ── */}
      <section className="project-body">
        <aside className="project-spec">
          <div className="section-label">
            <span className="num">→</span>
            <span className="line" />
            Project
          </div>
          <dl>
            {data.location && <><dt>Location</dt><dd>{data.location}</dd></>}
            {data.year && <><dt>Year</dt><dd>{data.year}</dd></>}
            {data.area && <><dt>Area</dt><dd>{data.area}</dd></>}
            {data.status && <><dt>Status</dt><dd>{data.status}</dd></>}
            {data.recognition && <><dt>Recognition</dt><dd>{data.recognition}</dd></>}
            {data.photography && <><dt>Photography</dt><dd>{data.photography}</dd></>}
          </dl>
        </aside>

        <article className="project-prose">
          {data.content ? (
            <PortableText value={data.content} />
          ) : (
            <>
              <h3>Brief</h3>
              <p>{data.tagline} The commission sought a building that would settle into the landscape without imposing — one that could age into the site over decades without maintenance becoming a burden.</p>
              <h3>Approach</h3>
              <p>We began with three months of site visits across seasons. The building sits low against the existing topography, its roof line read from a distance as part of the ridge rather than above it. Structure is expressed honestly: timber frame, masonry plinth.</p>
              <blockquote>The best buildings make you forget they were designed at all.</blockquote>
              <h3>Material</h3>
              <p>Every material on the project was chosen for its behaviour over time: how it weathers, how it repairs, how it develops character rather than deteriorating. The result is a building that should look better at twenty years than at two.</p>
            </>
          )}
        </article>
      </section>

      {/* ── GALLERY ── */}
      <section className="gallery">
        {GALLERY_FALLBACKS.map((src, i, arr) => (
          <figure key={i} className={i === arr.length - 1 ? "gallery-last" : undefined}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={`${data.title} — ${i + 1}`} />
            <figcaption>{String(i + 1).padStart(2, "0")}</figcaption>
          </figure>
        ))}
      </section>

      {/* ── PREV/NEXT ── */}
      <nav className="project-nav" aria-label="Adjacent projects">
        {data.prevProject ? (
          <Link href={`/works/${data.prevProject.slug.current}`}>
            <span className="project-nav__dir">← Previous</span>
            <span className="project-nav__name">{data.prevProject.title}</span>
          </Link>
        ) : (
          <Link href="/works">
            <span className="project-nav__dir">← All works</span>
            <span className="project-nav__name">View all projects</span>
          </Link>
        )}
        {data.nextProject ? (
          <Link href={`/works/${data.nextProject.slug.current}`} className="project-nav__next">
            <span className="project-nav__dir">Next →</span>
            <span className="project-nav__name">{data.nextProject.title}</span>
          </Link>
        ) : (
          <Link href="/works" className="project-nav__next">
            <span className="project-nav__dir">All works →</span>
            <span className="project-nav__name">View portfolio</span>
          </Link>
        )}
      </nav>

      <CtaBand
        label="Commissions"
        title={<>A similar brief?<br />Tell us about <em>your site.</em></>}
        cta="Write to us"
        href="/contact"
      />
    </main>
  );
}
