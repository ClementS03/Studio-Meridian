import Link from "next/link";
import type { Metadata } from "next";
import { getAllProjects } from "@/sanity/queries/projects";
import { urlFor } from "@/sanity/client";
import { WorksClient, Arrow, type DisplayProject } from "@/components/works-client";

export const metadata: Metadata = {
  title: "Works",
  description: "Selected architecture by Meridian — residential, civic, adaptive reuse, hospitality and small public commissions across Norway, Portugal, Iceland and Italy.",
};

const FALLBACK_PROJECTS: DisplayProject[] = [
  { _id: "1", title: "Hovden Lake House", slug: { current: "hovden-lake-house" }, category: "residential", year: 2024, location: "Hovden, Norway", area: "980 m²", tagline: "A black-stained pine house on a lakeside ridge.", imgUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=80" },
  { _id: "2", title: "Estoril Library", slug: { current: "estoril-library" }, category: "civic", year: 2023, location: "Estoril, Portugal", area: "2,400 m²", tagline: "A public library set at the water's edge, clad in local limestone.", imgUrl: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1800&q=80" },
  { _id: "3", title: "Quay 14", slug: { current: "quay-14" }, category: "reuse", year: 2022, location: "Bergen, Norway", area: "3,100 m²", tagline: "Industrial harbour warehouse converted to workplace and gallery.", imgUrl: "https://images.unsplash.com/photo-1565793979088-5e5a15dd2cf3?auto=format&fit=crop&w=1800&q=80" },
  { _id: "4", title: "Chapel of Six Trees", slug: { current: "chapel-of-six-trees" }, category: "civic", year: 2021, location: "Évora, Portugal", area: "340 m²", tagline: "A pilgrimage chapel shaped around the six cork oaks already on site.", imgUrl: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1800&q=80" },
  { _id: "5", title: "Brink Hotel", slug: { current: "brink-hotel" }, category: "hospitality", year: 2024, location: "Reykjavík, Iceland", area: "54 rooms", tagline: "A hotel that grew from the lava field — raw basalt, hot springs, silence.", imgUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1800&q=80" },
  { _id: "6", title: "Forge Pavilion", slug: { current: "forge-pavilion" }, category: "pavilion", year: 2023, location: "Venice, Italy", area: "220 m²", tagline: "Cor-ten ribs and pressed-earth walls — built for the Architecture Biennale.", imgUrl: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1800&q=80" },
  { _id: "7", title: "Ridge House", slug: { current: "ridge-house" }, category: "residential", year: 2022, location: "Voss, Norway", area: "620 m²", tagline: "A family house carved into the hillside, invisible from below.", imgUrl: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=1800&q=80" },
  { _id: "8", title: "São Bento Townhouse", slug: { current: "sao-bento-townhouse" }, category: "residential", year: 2023, location: "Lisbon, Portugal", area: "410 m²", tagline: "An 18th-century townhouse opened up — tile, lime, original timber floors.", imgUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1800&q=80" },
  { _id: "9", title: "Coastal Marker", slug: { current: "coastal-marker" }, category: "pavilion", year: 2021, location: "Lindesnes, Norway", area: "45 m²", tagline: "A waypoint shelter at Norway's southernmost tip, in weathered oak.", imgUrl: "https://images.unsplash.com/photo-1439405326854-014607f694d7?auto=format&fit=crop&w=1800&q=80" },
  { _id: "10", title: "Alfama Music School", slug: { current: "alfama-music-school" }, category: "civic", year: 2024, location: "Lisbon, Portugal", area: "1,850 m²", tagline: "A conservatory embedded in the hillside — practice rooms facing the river.", imgUrl: "https://images.unsplash.com/photo-1571624436279-b272aff752b5?auto=format&fit=crop&w=1800&q=80" },
  { _id: "11", title: "Harbour Baths", slug: { current: "harbour-baths" }, category: "reuse", year: 2022, location: "Oslo, Norway", area: "1,200 m²", tagline: "A decommissioned ferry terminal transformed into public bathing facilities.", imgUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1800&q=80" },
  { _id: "12", title: "Tavira Boutique Hotel", slug: { current: "tavira-boutique-hotel" }, category: "hospitality", year: 2023, location: "Tavira, Portugal", area: "22 rooms", tagline: "A sequence of whitewashed cortijos around a central garden and pool.", imgUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1800&q=80" },
];

export default async function WorksPage() {
  const sanityProjects = await getAllProjects().catch(() => []);

  const projects: DisplayProject[] =
    sanityProjects.length > 0
      ? sanityProjects.map((p) => ({
          _id: p._id,
          title: p.title,
          slug: p.slug,
          category: p.category,
          year: p.year,
          location: p.location,
          area: p.area,
          tagline: p.tagline,
          imgUrl: p.coverImage?.asset?._ref
            ? urlFor(p.coverImage).width(1800).auto("format").url()
            : null,
        }))
      : FALLBACK_PROJECTS;

  return (
    <main>
      {/* ── PAGE HERO ── */}
      <section className="page-hero">
        <div className="page-hero__title">
          <div className="eyebrow"><span className="bullet" />Works · 2009 — present</div>
          <h1 className="display display--lg">A small portfolio,<br />kept deliberately so.</h1>
        </div>
        <div>
          <p className="page-hero__desc">
            Eighty-four built works across four countries. Below, twelve we return to
            often when describing the studio — residential, civic, adaptive reuse,
            hospitality and a handful of small-scale public commissions.
          </p>
          <div className="page-hero__meta">
            <span>84 built</span>
            <span>11 cities</span>
            <span>4 countries</span>
            <span>23 awards</span>
          </div>
        </div>
      </section>

      {/* ── FILTER + GRID ── */}
      <WorksClient projects={projects} />

      {/* ── CTA ── */}
      <section className="cta-band">
        <div className="cta-band__inner">
          <div className="section-label section-label--light">
            <span className="num">→</span>
            <span className="line" />
            Commissions
          </div>
          <h2 className="display display--xl">
            Have a project<br />that should be on<br />this <em>list?</em>
          </h2>
          <Link href="/contact" className="btn btn--inverse">
            <span>Begin a project</span>
            <span className="btn__arrow"><Arrow /></span>
          </Link>
        </div>
      </section>
    </main>
  );
}
