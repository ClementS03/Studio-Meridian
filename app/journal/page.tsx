import Link from "next/link";
import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { getAllPosts, getFeaturedPosts } from "@/sanity/queries/journal";
import { urlFor } from "@/sanity/client";

export const metadata: Metadata = {
  title: "Journal",
  description: "Essays on material and method, lecture transcripts, field notes from finished buildings.",
};

const KIND_LABELS: Record<string, string> = {
  "essay": "Essay",
  "lecture": "Lecture",
  "field-notes": "Field notes",
  "project-notes": "Project notes",
  "interview": "Interview",
  "research": "Research",
  "press": "Press",
};

const FALLBACK_FEATURED = [
  { slug: "in-praise-of-lime-plaster", src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1400&q=80", kind: "Essay · 8 min", date: "March 2025", title: "In praise of lime plaster", excerpt: "A material that breathes, repairs itself, and forgives the hands that mix it. Five years of working with lime in residential interiors." },
  { slug: "civic-building-after-algorithm", src: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1400&q=80", kind: "Lecture · 12 min", date: "February 2025", title: "The civic building, after the algorithm", excerpt: "Transcript of a keynote at the Oslo Architecture Triennale — on designing for use, not engagement." },
  { slug: "notes-from-quay-14", src: "https://images.unsplash.com/photo-1497366754035-f200968a7db3?auto=format&fit=crop&w=1400&q=80", kind: "Field notes · 5 min", date: "January 2025", title: "Notes from Quay 14, two years on", excerpt: "What our adaptive reuse looks and feels like after a Bergen winter — a post-occupancy walk-through." },
];

const FALLBACK_ARCHIVE = [
  { slug: "in-praise-of-lime-plaster", date: "25 Mar 2025", title: "In praise of lime plaster", excerpt: "Five years of working with lime in residential interiors.", author: "Ingrid Halland", kind: "Essay" },
  { slug: "civic-building-after-algorithm", date: "11 Feb 2025", title: "The civic building, after the algorithm", excerpt: "Transcript · Oslo Architecture Triennale keynote.", author: "Ingrid Halland", kind: "Lecture" },
  { slug: "notes-from-quay-14", date: "18 Jan 2025", title: "Notes from Quay 14, two years on", excerpt: "An illustrated post-occupancy report from a Bergen winter.", author: "Karim Vestergaard", kind: "Field notes" },
  { slug: "defence-of-small-offices", date: "02 Dec 2024", title: "A short defence of small offices", excerpt: "Why a studio of twenty does better work than a studio of two hundred.", author: "Tomás Albuquerque", kind: "Essay" },
  { slug: "cork-oaks-and-the-chapel", date: "14 Nov 2024", title: "Cork oaks and the chapel", excerpt: "Designing around six trees that are older than the parish.", author: "Tomás Albuquerque", kind: "Project notes" },
  { slug: "bergen-brick-catalogued", date: "20 Oct 2024", title: "The Bergen brick, catalogued", excerpt: "A study of the eight common nineteenth-century brick formats in Bergen's harbour.", author: "Mira Søndergaard", kind: "Research" },
  { slug: "on-the-hearth", date: "06 Sep 2024", title: "On the hearth", excerpt: "Why we still build masonry hearths, and how to size them for forty.", author: "Karim Vestergaard", kind: "Essay" },
  { slug: "estoril-el-croquis", date: "12 Aug 2024", title: "Press: Estoril in El Croquis 226", excerpt: "A 24-page feature in this month's El Croquis.", author: "Press", kind: "Press" },
];

export default async function JournalPage() {
  const [featured, posts] = await Promise.all([
    getFeaturedPosts().catch(() => []),
    getAllPosts().catch(() => []),
  ]);

  return (
    <main>
      {/* ── PAGE HERO ── */}
      <section className="page-hero">
        <div className="page-hero__title">
          <div className="eyebrow"><span className="bullet" />Journal · 2018 — present</div>
          <h1 className="display display--lg">
            Writing, lectures,<br />
            and the occasional<br />
            <em>side project.</em>
          </h1>
        </div>
        <div>
          <p className="page-hero__desc">
            We publish roughly once a month — essays on material and method,
            transcripts of lectures, field notes from finished buildings, and the
            occasional polemic.
          </p>
          <div className="page-hero__meta">
            <span>62 essays</span>
            <span>14 lectures</span>
            <span>RSS · /journal.xml</span>
          </div>
        </div>
      </section>

      {/* ── FEATURED ── */}
      <section className="section section--journal" style={{ paddingTop: 60 }}>
        <div className="section__head">
          <div className="section-label">
            <span className="num">01</span>
            <span className="line" />
            Featured
          </div>
          <h2 className="display display--md">Three recent pieces<br />worth a slow read.</h2>
        </div>
        <div className="journal-grid">
          {featured.length > 0 ? (
            featured.map((post) => {
              const imgUrl = post.coverImage?.asset?._ref
                ? urlFor(post.coverImage).width(1400).auto("format").url()
                : null;
              return (
              <Link key={post._id} className="post" href={`/journal/${post.slug.current}`}>
                {imgUrl
                  // eslint-disable-next-line @next/next/no-img-element
                  ? <img className="post__img" src={imgUrl} alt={post.title} />
                  : <div className="post__img" aria-hidden="true" />
                }
                <div className="post__meta">
                  <span>{KIND_LABELS[post.kind]} {post.readTime ? `· ${post.readTime} min` : ""}</span>
                  <span>{new Date(post.date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span>
                </div>
                <h3 className="post__title">{post.title}</h3>
                <p>{post.excerpt}</p>
              </Link>
              );
            })
          ) : (
            FALLBACK_FEATURED.map((post) => (
              <Link key={post.title} className="post" href={`/journal/${post.slug}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="post__img" src={post.src} alt={post.title} />
                <div className="post__meta"><span>{post.kind}</span><span>{post.date}</span></div>
                <h3 className="post__title">{post.title}</h3>
                <p>{post.excerpt}</p>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* ── ARCHIVE ── */}
      <section className="section" style={{ paddingTop: 60 }}>
        <div className="section__head">
          <div className="section-label">
            <span className="num">02</span>
            <span className="line" />
            Archive
          </div>
          <h2 className="display display--md">All writing,<br />most recent first.</h2>
        </div>

        <div className="journal-feed" style={{ padding: 0 }}>
          {(posts.length > 0 ? posts : FALLBACK_ARCHIVE).map((p, i) => {
            const isPost = "slug" in p;
            const title = isPost ? (p as typeof posts[0]).title : (p as typeof FALLBACK_ARCHIVE[0]).title;
            const date = isPost
              ? new Date((p as typeof posts[0]).date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
              : (p as typeof FALLBACK_ARCHIVE[0]).date;
            const author = isPost ? (p as typeof posts[0]).author : (p as typeof FALLBACK_ARCHIVE[0]).author;
            const kind = isPost ? KIND_LABELS[(p as typeof posts[0]).kind] : (p as typeof FALLBACK_ARCHIVE[0]).kind;
            const excerpt = isPost ? (p as typeof posts[0]).excerpt : (p as typeof FALLBACK_ARCHIVE[0]).excerpt;
            const href = isPost
              ? `/journal/${(p as typeof posts[0]).slug.current}`
              : `/journal/${(p as typeof FALLBACK_ARCHIVE[0]).slug}`;

            return (
              <Link key={i} href={href} className="journal-feed__row" style={{ display: "grid" }}>
                <span className="journal-feed__date">{date}</span>
                <div>
                  <h3 className="journal-feed__title">{title}</h3>
                  <p className="journal-feed__desc">{excerpt}</p>
                </div>
                <span className="journal-feed__desc">{author}</span>
                <span className="journal-feed__kind">{kind}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <CtaBand
        label="Subscribe"
        title={<>A note, once<br />a month, when<br />we have <em>something to say.</em></>}
        cta="Subscribe by email"
        href="/contact"
      />
    </main>
  );
}
