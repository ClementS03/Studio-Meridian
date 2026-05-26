import Link from "next/link";
import { WorkCard } from "@/components/work-card";
import { MarqueeStrip } from "@/components/marquee-strip";
import { CtaBand } from "@/components/cta-band";
import { getFeaturedProjects } from "@/sanity/queries/projects";
import { getFeaturedPosts } from "@/sanity/queries/journal";
import { urlFor } from "@/sanity/client";

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 8 H13 M9 4 L13 8 L9 12" />
    </svg>
  );
}

export default async function HomePage() {
  const [featuredProjects, featuredPosts] = await Promise.all([
    getFeaturedProjects().catch(() => []),
    getFeaturedPosts().catch(() => []),
  ]);

  const HERO_IMG = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=80";

  return (
    <main>
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero__media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={HERO_IMG} alt="Architecture exterior" />
          <div className="hero__grid" aria-hidden="true" />
        </div>

        <div className="hero__copy">
          <div className="eyebrow">
            <span className="bullet" />
            Atelier — est. MMIX
          </div>
          <h1 className="display display--hero">
            Architecture<br />
            for those who<br />
            build for the<br />
            <em>long view.</em>
          </h1>
          <p className="hero__lede">
            We design buildings, interiors, and places that age into their context
            — quiet in their material, generous in their proportions, and slow to become dated.
          </p>
          <div className="hero__cta-row">
            <Link href="/works" className="btn btn--primary">
              <span>See selected work</span>
              <span className="btn__arrow"><Arrow /></span>
            </Link>
            <Link href="/contact" className="btn btn--ghost">
              <span>Begin a project</span>
            </Link>
          </div>
        </div>

        <div className="hero__strip">
          <div className="strip-item">
            <div className="strip-num">16</div>
            <div className="strip-lbl">Years in practice</div>
          </div>
          <div className="strip-item">
            <div className="strip-num">84</div>
            <div className="strip-lbl">Completed works</div>
          </div>
          <div className="strip-item">
            <div className="strip-num">11</div>
            <div className="strip-lbl">Cities · four countries</div>
          </div>
          <div className="strip-item">
            <div className="strip-num">23</div>
            <div className="strip-lbl">Awards &amp; mentions</div>
          </div>
        </div>

        <div className="hero__scroll" aria-hidden="true">
          <span>Scroll</span>
          <svg viewBox="0 0 12 24" width="10" height="20" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M6 2 V20 M2 16 L6 20 L10 16" />
          </svg>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <MarqueeStrip />

      {/* ── APPROACH ── */}
      <section className="section section--approach" id="approach">
        <div className="section__head">
          <div className="section-label">
            <span className="num">01</span>
            <span className="line" />
            Approach
          </div>
          <h2 className="display display--lg">
            Three commitments<br />
            we return to in every<br />
            <em>commission.</em>
          </h2>
          <p className="section__lede">
            We are deliberate practitioners. Every project begins with a long look at site,
            light, and use — and ends with a building we still want to visit a decade later.
          </p>
        </div>

        <div className="pillars">
          <article className="pillar">
            <div className="pillar__num">i.</div>
            <h3 className="pillar__title">Site, before form</h3>
            <p>
              We listen to the ground before we draw. Topography, climate, the
              rhythm of the street — these set the brief, not the other way around.
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="pillar__img" src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80" alt="Site" />
          </article>

          <article className="pillar">
            <div className="pillar__num">ii.</div>
            <h3 className="pillar__title">Material as method</h3>
            <p>
              Brick that ages well. Timber sourced within the watershed. Concrete
              cast with care. The honest material does most of the architectural work.
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="pillar__img" src="https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=1200&q=80" alt="Material" />
          </article>

          <article className="pillar">
            <div className="pillar__num">iii.</div>
            <h3 className="pillar__title">Time as the client</h3>
            <p>
              We design to last sixty years, not six. Maintainable details, generous
              structure, and rooms that can change use without losing themselves.
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="pillar__img" src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80" alt="Interior" />
          </article>
        </div>
      </section>

      {/* ── EDITORIAL BREAK ── */}
      <section className="break" aria-hidden="true">
        <div className="break__rule" />
        <p className="break__quote">
          &ldquo;A building is a small piece of a city, and a city is a piece of a
          landscape. <em>Design the largest scale you can think of.</em>&rdquo;
        </p>
        <div className="break__rule" />
      </section>

      {/* ── WORKS ── */}
      <section className="section section--works" id="works">
        <div className="section__head section__head--row">
          <div>
            <div className="section-label">
              <span className="num">02</span>
              <span className="line" />
              Works · selected
            </div>
            <h2 className="display display--lg">A small portfolio,<br />kept deliberately so.</h2>
          </div>
          <div className="section__head-side">
            <p className="section__lede">
              Eighty-four built works since 2009. Below, the six we return to
              most often when describing the studio.
            </p>
            <Link href="/works" className="btn btn--ghost">
              <span>All projects (84)</span>
              <span className="btn__arrow"><Arrow /></span>
            </Link>
          </div>
        </div>

        <div className="works-grid">
          {featuredProjects.length > 0 ? (
            featuredProjects.map((p) => (
              <WorkCard
                key={p._id}
                project={p}
                variant={p.featuredVariant as "regular" | "feature" | "wide" || "regular"}
                showDesc={p.featuredVariant === "feature" || p.featuredVariant === "wide"}
              />
            ))
          ) : (
            /* Fallback static content */
            <>
              <a className="work work--feature" href="/works">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="work__img" src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=80" alt="Lake House" />
                <div className="work__meta">
                  <span className="work__tag">Featured · 2024</span>
                  <h3 className="work__title">Lake House</h3>
                  <div className="work__line"><span>Residential</span><span aria-hidden="true">·</span><span>980 m²</span></div>
                  <p className="work__desc">A black-stained pine house perched on a lakeside ridge. Inside, oak, lime plaster, and a single south-facing room sized for forty.</p>
                </div>
              </a>
              <a className="work" href="/works">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="work__img" src="https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=1400&q=80" alt="Library" />
                <div className="work__meta">
                  <span className="work__tag">Civic · 2023</span>
                  <h3 className="work__title">Public Library</h3>
                  <div className="work__line"><span>Civic</span><span aria-hidden="true">·</span><span>2,400 m²</span></div>
                </div>
              </a>
              <a className="work" href="/works">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="work__img" src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80" alt="Quay" />
                <div className="work__meta">
                  <span className="work__tag">Adaptive reuse · 2022</span>
                  <h3 className="work__title">Harbour Conversion</h3>
                  <div className="work__line"><span>Workplace</span></div>
                </div>
              </a>
              <a className="work" href="/works">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="work__img" src="https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=1400&q=80" alt="Chapel" />
                <div className="work__meta">
                  <span className="work__tag">Sacred · 2021</span>
                  <h3 className="work__title">Chapel of Six Trees</h3>
                  <div className="work__line"><span>Pilgrimage</span></div>
                </div>
              </a>
              <a className="work" href="/works">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="work__img" src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80" alt="Hotel" />
                <div className="work__meta">
                  <span className="work__tag">Hospitality · 2024</span>
                  <h3 className="work__title">Brink Hotel</h3>
                  <div className="work__line"><span>Hotel</span><span aria-hidden="true">·</span><span>54 rooms</span></div>
                </div>
              </a>
              <a className="work work--wide" href="/works">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="work__img" src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=2400&q=80" alt="Pavilion" />
                <div className="work__meta">
                  <span className="work__tag">Pavilion · 2023</span>
                  <h3 className="work__title">Forge Pavilion</h3>
                  <div className="work__line"><span>Biennale commission</span></div>
                  <p className="work__desc">A pavilion of cor-ten ribs and pressed-earth walls, dismantled and rebuilt twice.</p>
                </div>
              </a>
            </>
          )}
        </div>
      </section>

      {/* ── STUDIO SPLIT ── */}
      <section className="split">
        <div className="split__media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1400&q=80" alt="Studio at work" />
        </div>
        <div className="split__copy">
          <div className="section-label">
            <span className="num">03</span>
            <span className="line" />
            The studio at work
          </div>
          <h2 className="display display--md">
            Twenty-two people<br />
            at two long tables<br />
            <em>and a kiln.</em>
          </h2>
          <p>
            The studio is small on purpose. Every project is led by one of the four
            partners; every drawing leaves the building with a partner&rsquo;s mark on it.
            We make our own models, mix our own renders, and prototype hardware in
            the basement.
          </p>
          <dl className="split__stats">
            <div><dt>Studio size</dt><dd>22</dd></div>
            <div><dt>Partner-led</dt><dd>100%</dd></div>
            <div><dt>Average tenure</dt><dd>6.4 yrs</dd></div>
            <div><dt>In-house disciplines</dt><dd>9</dd></div>
          </dl>
          <Link href="/about" className="btn btn--ghost" style={{ marginTop: 8 }}>
            <span>About the studio</span>
            <span className="btn__arrow"><Arrow /></span>
          </Link>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="section section--services-teaser">
        <div className="section__head">
          <div className="section-label">
            <span className="num">04</span>
            <span className="line" />
            Services
          </div>
          <h2 className="display display--lg">What we are<br />commissioned for.</h2>
        </div>
        <div className="service-cards">
          {[
            { n: "01", h: "Architecture", p: "Houses, civic buildings, sacred and educational spaces — from sketch to handed keys." },
            { n: "02", h: "Interiors & furniture", p: "Joinery, lighting, lime-plaster surfaces and bespoke pieces, prototyped in-house." },
            { n: "03", h: "Adaptive reuse", p: "Industrial, harbour and heritage buildings, reworked to last another century." },
            { n: "04", h: "Urbanism & masterplanning", p: "Small district masterplans, public realm, and quiet civic infrastructure." },
            { n: "05", h: "Consulting & research", p: "Feasibility, material research, and second-opinion design review for peers." },
          ].map((s) => (
            <Link key={s.n} href="/services" className="service-card">
              <div className="service-card__num">{s.n}</div>
              <h3>{s.h}</h3>
              <p className="service-card__lede">{s.p}</p>
              <span className="service-card__arrow">→</span>
            </Link>
          ))}
        </div>
        <Link href="/services" className="btn btn--ghost" style={{ marginTop: 40 }}>
          <span>All services in detail</span>
          <span className="btn__arrow"><Arrow /></span>
        </Link>
      </section>

      {/* ── JOURNAL ── */}
      <section className="section section--journal" id="journal">
        <div className="section__head section__head--row">
          <div>
            <div className="section-label">
              <span className="num">05</span>
              <span className="line" />
              Journal
            </div>
            <h2 className="display display--lg">Writing, lectures,<br />and the occasional<br />side project.</h2>
          </div>
          <Link href="/journal" className="btn btn--ghost">
            <span>Read the archive</span>
            <span className="btn__arrow"><Arrow /></span>
          </Link>
        </div>

        <div className="journal-grid">
          {featuredPosts.length > 0 ? (
            featuredPosts.map((post) => (
              <Link key={post._id} className="post" href={`/journal/${post.slug.current}`}>
                {post.coverImage?.asset?._ref && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className="post__img" src={urlFor(post.coverImage).width(1200).auto("format").url()} alt={post.title} />
                )}
                <div className="post__meta">
                  <span>{post.kind} {post.readTime ? `· ${post.readTime} min` : ""}</span>
                  <span>{new Date(post.date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span>
                </div>
                <h3 className="post__title">{post.title}</h3>
                <p>{post.excerpt}</p>
              </Link>
            ))
          ) : (
            /* Fallback static content */
            [
              { src: "https://images.unsplash.com/photo-1495465798138-718f86d1a4bc?auto=format&fit=crop&w=1200&q=80", kind: "Essay · 8 min", date: "March 2025", title: "In praise of lime plaster", excerpt: "A material that breathes, repairs itself, and forgives the hands that mix it." },
              { src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80", kind: "Lecture", date: "February 2025", title: "The civic building, after the algorithm", excerpt: "On designing for use, not for engagement metrics." },
              { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80", kind: "Field notes", date: "January 2025", title: "Notes from Quay 14, two years on", excerpt: "What our adaptive reuse looks and feels like after a Bergen winter." },
            ].map((post) => (
              <Link key={post.title} className="post" href="/journal">
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

      {/* ── CTA ── */}
      <CtaBand
        label="Begin a project"
        title={<>Tell us about<br />a place, a brief,<br />or a <em>small idea.</em></>}
        body="We answer every commissioning letter within ten working days, in the order they arrive."
        cta="Write to us"
        href="/contact"
      />
    </main>
  );
}
