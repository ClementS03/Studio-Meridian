import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug, getPostSlugs } from "@/sanity/queries/journal";
import { CtaBand } from "@/components/cta-band";
import { PortableText } from "@/lib/portable-text";

const KIND_LABELS: Record<string, string> = {
  "essay": "Essay", "lecture": "Lecture", "field-notes": "Field notes",
  "project-notes": "Project notes", "interview": "Interview",
  "research": "Research", "press": "Press",
};

const FALLBACK_POSTS: Record<string, {
  title: string; kind: string; date: string; author: string;
  readTime: number; excerpt: string; cover: string; body: React.ReactNode;
}> = {
  "in-praise-of-lime-plaster": {
    title: "In praise of lime plaster", kind: "essay", date: "2025-03-25",
    author: "Ingrid Halland", readTime: 8,
    cover: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=2400&q=80",
    excerpt: "A material that breathes, repairs itself, and forgives the hands that mix it.",
    body: (<>
      <p className="service-block__lede">Five years of working with lime in residential interiors have taught us that some materials are irreplaceable — not for aesthetic reasons alone, but because of how they behave over decades.</p>
      <h3>Why lime?</h3>
      <p>Lime plaster is alkaline, vapour-permeable, and self-healing at a microscopic scale. Hairline cracks — the inevitable consequence of a building that breathes and settles — close themselves as carbonation continues. No other common wall finish does this.</p>
      <p>We first encountered it properly on a job in Lisbon in 2017: a nineteenth-century townhouse whose original plaster had survived a century and a half intact. We had it tested. The mix was locally sourced hydraulic lime, river sand, and nothing else.</p>
      <blockquote>The best materials are those that improve with age rather than deteriorate. Lime is the most honest of them.</blockquote>
      <h3>The workshop</h3>
      <p>For the past three years we have mixed all our own plaster in the Oslo basement. The process is slow — a well-hydrated lime putty needs to rest for weeks before it is workable — but the result is a material we understand completely. We control the aggregate gradation, the pigment loading, the water content.</p>
      <h3>Applications</h3>
      <p>We now specify lime as the default internal finish on every project where budget allows. On Hovden Lake House, a single-coat burnished finish throughout the main volume. On the Estoril Library, three coats with increasingly fine aggregate produced a surface that reads differently under morning and evening light.</p>
    </>),
  },
  "civic-building-after-algorithm": {
    title: "The civic building, after the algorithm", kind: "lecture", date: "2025-02-11",
    author: "Ingrid Halland", readTime: 12,
    cover: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=2400&q=80",
    excerpt: "On designing for use, not engagement.",
    body: (<>
      <p className="service-block__lede">Keynote transcript from the Oslo Architecture Triennale, February 2025. The following has been lightly edited for readability.</p>
      <h3>The problem with optimisation</h3>
      <p>Every building brief I receive today contains the word "flexible." Sometimes it also contains "adaptable," "future-proof," or — increasingly — "data-driven." What it almost never contains is a clear description of what the building is actually for.</p>
      <p>We have imported the logic of digital product design into architecture. We are designing for engagement, for dwell time, for metrics that can be reported to a board. The civic building — the library, the school, the town hall — is being asked to perform in ways that are fundamentally at odds with its nature.</p>
      <blockquote>A library is not an experience. It is a place where experience becomes possible.</blockquote>
      <h3>What endures</h3>
      <p>The buildings I return to — the ones that have shaped how I think about architecture — were not optimised. They were specific. They were made for a particular community, in a particular place, at a particular moment. Their specificity is exactly what gives them longevity.</p>
      <h3>A different brief</h3>
      <p>I want to suggest that the most radical thing an architect can do today is to refuse the flexible brief. Not because flexibility is wrong, but because it is often used as a substitute for thinking. Ask what happens here on a Tuesday afternoon in November. Ask who is not in the room when the brief is written. That is where the building begins.</p>
    </>),
  },
  "notes-from-quay-14": {
    title: "Notes from Quay 14, two years on", kind: "field-notes", date: "2025-01-18",
    author: "Karim Vestergaard", readTime: 5,
    cover: "https://images.unsplash.com/photo-1497366754035-f200968a7db3?auto=format&fit=crop&w=2400&q=80",
    excerpt: "What our adaptive reuse looks and feels like after a Bergen winter.",
    body: (<>
      <p className="service-block__lede">Two winters on, we went back to Quay 14 with a camera and a notebook. We wanted to see what the building was actually doing — not what we intended it to do.</p>
      <h3>The material record</h3>
      <p>The cor-ten cladding has developed exactly the patina we hoped for: a deep, even rust that reads as warm against the grey harbour water. The original brick — kept where structurally sound, repointed with a lime mortar — has absorbed moisture and dried without cracking. The new steel insertions are holding.</p>
      <p>Less expected: the concrete floor, polished to 800 grit, has developed a network of hairline cracks in the central bay. Not structural. The tenants like them.</p>
      <blockquote>The building has started to look like it was always there. That was the brief.</blockquote>
      <h3>Use</h3>
      <p>The ground floor, designed as open workspace, has been subdivided twice by the tenants — first with bookshelves, then with a partition wall they built themselves from leftover timber. Neither modification damages the building. Both make it more theirs.</p>
      <p>The rooftop terrace, which we were unsure about during design, is used every day the weather allows. In Bergen, that is fewer days than we told the client. But on those days, it is used hard.</p>
    </>),
  },
  "defence-of-small-offices": {
    title: "A short defence of small offices", kind: "essay", date: "2024-12-02",
    author: "Tomás Albuquerque", readTime: 6,
    cover: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2400&q=80",
    excerpt: "Why a studio of twenty does better work than a studio of two hundred.",
    body: (<>
      <p className="service-block__lede">This is not a polemic against large offices. It is a description of what we lose when architecture practices grow past the point where a single partner can know every drawing.</p>
      <h3>The knowledge problem</h3>
      <p>In a studio of twenty, the principal knows the name of every subcontractor on every active project. They have seen the site. They have touched the material samples. They remember the conversation where the client changed their mind about the kitchen. This knowledge is not documented. It cannot be documented. It lives in the heads of the people doing the work.</p>
      <p>In a studio of two hundred, this knowledge is replaced by process. Project management software. Design standards manuals. Sign-off protocols. These are not substitutes — they are approximations. The building feels it.</p>
      <blockquote>Scale is not neutral. Every time a practice doubles in size, something is lost. The question is whether what is gained is worth it.</blockquote>
      <h3>Our answer</h3>
      <p>We decided in 2015 that we would never employ more than twenty-five people across both offices. We have turned down commissions because of it. We have also, we believe, made better buildings because of it.</p>
    </>),
  },
  "cork-oaks-and-the-chapel": {
    title: "Cork oaks and the chapel", kind: "project-notes", date: "2024-11-14",
    author: "Tomás Albuquerque", readTime: 7,
    cover: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=2400&q=80",
    excerpt: "Designing around six trees that are older than the parish.",
    body: (<>
      <p className="service-block__lede">The site for the Chapel of Six Trees came with a constraint that became the whole design: six cork oaks, between 180 and 240 years old, arranged in an irregular cluster at the centre of the plot.</p>
      <h3>The brief</h3>
      <p>The diocese wanted a small pilgrimage chapel — capacity fifty, sacristy, covered outdoor space for processions. The site in the Alentejo was chosen because of its isolation and its trees. We were told explicitly that the trees could not be moved, damaged, or built over.</p>
      <h3>The response</h3>
      <p>We began by mapping the root systems — deeper and wider than the canopy suggested. The building plan was then derived from the gaps between these root zones: a series of concrete walls, poured in place, that thread between the trees without touching them. The roof is suspended from these walls, crossing the space in a single diagonal plane.</p>
      <blockquote>The trees are the building. We just made a shelter for them.</blockquote>
      <h3>Material</h3>
      <p>The concrete is board-marked, using timber from a sawmill in Évora. The floor is compressed earth, stabilised with lime — the same material that has been used in the region for centuries. The pews are local stone, cut in a single quarry twenty kilometres from the site.</p>
    </>),
  },
  "bergen-brick-catalogued": {
    title: "The Bergen brick, catalogued", kind: "research", date: "2024-10-20",
    author: "Mira Søndergaard", readTime: 10,
    cover: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=2400&q=80",
    excerpt: "A study of eight common nineteenth-century brick formats in Bergen's harbour district.",
    body: (<>
      <p className="service-block__lede">Working on Quay 14 required us to understand the brick stock of Bergen's harbour district in detail. What we found was more varied — and more carefully considered — than we expected.</p>
      <h3>The catalogue</h3>
      <p>We identified eight distinct brick formats in use across the harbour buildings, dating from approximately 1850 to 1920. They range from a large, slightly irregular format typical of the earliest warehouses to a smaller, more precisely dimensioned brick introduced in the 1890s, likely as local production became more industrialised.</p>
      <p>The variation is not random. Different formats appear in different structural roles: the larger, heavier bricks at foundations and ground floors; the lighter formats in upper stories and infill panels.</p>
      <blockquote>Every brick in these buildings is a decision. Someone chose its size, its colour, its position. The building is the record of those decisions.</blockquote>
      <h3>Implications for repair</h3>
      <p>Our findings have direct implications for restoration work in the district. Using a single modern replacement brick — the approach taken in most recent repairs we observed — produces visible inconsistency that reads as disrespectful of the original fabric. We recommend sourcing replacement brick by format, even if it requires commissioning small runs from specialist producers.</p>
    </>),
  },
  "on-the-hearth": {
    title: "On the hearth", kind: "essay", date: "2024-09-06",
    author: "Karim Vestergaard", readTime: 9,
    cover: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=80",
    excerpt: "Why we still build masonry hearths, and how to size them for a room of forty.",
    body: (<>
      <p className="service-block__lede">In an era of heat pumps and underfloor systems, we keep building masonry hearths. This is not nostalgia. It is a specific response to the way people actually use a room in winter.</p>
      <h3>The thermal argument</h3>
      <p>A masonry hearth — properly sized, properly positioned — radiates heat for six to eight hours after the fire is out. It charges the thermal mass of the surrounding walls. It creates a temperature gradient across the room that people instinctively use: sitting near the fire when they are cold, moving away when they are warm.</p>
      <p>A heat pump produces uniform temperature. A hearth produces a landscape.</p>
      <blockquote>A room with a hearth is not the same as a room without one, even when the fire is not lit. The hearth organises the room. It gives it a centre.</blockquote>
      <h3>Sizing</h3>
      <p>The rule we use for residential spaces: the firebox opening, in square centimetres, should be approximately one-fiftieth of the room volume in cubic centimetres. For a room designed for forty people — a dining hall, a community space — this produces a hearth that reads as monumental but performs as domestic. Which is exactly what a hearth in a room for forty should be.</p>
    </>),
  },
  "estoril-el-croquis": {
    title: "Press: Estoril in El Croquis 226", kind: "press", date: "2024-08-12",
    author: "Press", readTime: 2,
    cover: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=2400&q=80",
    excerpt: "A 24-page feature in El Croquis 226.",
    body: (<>
      <p className="service-block__lede">El Croquis issue 226 includes a 24-page feature on the Estoril Library, with photographs by João Morgado and a conversation with Ingrid Halland and Tomás Albuquerque.</p>
      <h3>About the feature</h3>
      <p>The feature covers the full development of the project — from the initial site analysis and competition entry to construction details and post-occupancy observations. El Croquis gave us unusual access to the editorial process; the final selection of images and drawings reflects a conversation about how to represent a building that is as much about landscape as architecture.</p>
      <p>The issue also includes work by Lacaton & Vassal, Flores & Prats, and Pezo von Ellrichshausen. It is available through the El Croquis website and at selected bookshops.</p>
    </>),
  },
};

export async function generateStaticParams() {
  const sanityslugs = await getPostSlugs().catch(() => []);
  const fallbackSlugs = Object.keys(FALLBACK_POSTS).map((s) => ({ slug: s }));
  const sanityMapped = sanityslugs.map((s) => ({ slug: s.slug.current }));
  return [...fallbackSlugs, ...sanityMapped];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);
  if (post) return { title: post.title, description: post.excerpt };
  const fallback = FALLBACK_POSTS[slug];
  if (fallback) return { title: fallback.title, description: fallback.excerpt };
  return {};
}

export default async function JournalPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);
  const fallback = FALLBACK_POSTS[slug];

  if (!post && !fallback) notFound();

  const title = post?.title ?? fallback!.title;
  const kind = post?.kind ?? fallback!.kind;
  const date = post?.date ?? fallback!.date;
  const author = post?.author ?? fallback!.author;
  const readTime = post?.readTime ?? fallback!.readTime;
  const excerpt = post?.excerpt ?? fallback!.excerpt;
  const coverSrc = fallback?.cover ?? "https://images.unsplash.com/photo-1495465798138-718f86d1a4bc?auto=format&fit=crop&w=2400&q=80";

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <main>
      <section className="page-hero">
        <div className="page-hero__title">
          <div className="eyebrow">
            <span className="bullet" />
            {KIND_LABELS[kind] ?? kind} · {readTime} min read
          </div>
          <h1 className="display display--lg">{title}</h1>
        </div>
        <div>
          <p className="page-hero__desc">{excerpt}</p>
          <div className="page-hero__meta">
            <span>{formattedDate}</span>
            {author && <span>{author}</span>}
            <span>{readTime} min read</span>
          </div>
        </div>
      </section>

      <div className="project-cover">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={coverSrc} alt={title} />
      </div>

      <section className="project-body">
        <aside className="project-spec">
          <div className="section-label">
            <span className="num">→</span>
            <span className="line" />
            About
          </div>
          <dl>
            <dt>Author</dt><dd>{author || "Studio"}</dd>
            <dt>Published</dt><dd>{formattedDate}</dd>
            <dt>Type</dt><dd>{KIND_LABELS[kind] ?? kind}</dd>
            <dt>Reading time</dt><dd>{readTime} minutes</dd>
          </dl>
          <div style={{ marginTop: 40 }}>
            <Link href="/journal" style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-2)" }}>
              ← Back to journal
            </Link>
          </div>
        </aside>

        <article className="project-prose">
          {post?.content ? (
            <PortableText value={post.content} />
          ) : (
            fallback?.body
          )}
        </article>
      </section>

      <CtaBand
        label="Journal"
        title={<>More writing<br />from the studio<br />and <em>its partners.</em></>}
        cta="Back to journal"
        href="/journal"
      />
    </main>
  );
}
