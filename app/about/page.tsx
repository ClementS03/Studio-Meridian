import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { getPeople } from "@/sanity/queries/settings";
import { getSettings } from "@/sanity/queries/settings";
import { sanityImageUrl } from "@/lib/image";
import type { SanityImage } from "@/lib/types";

export const metadata: Metadata = {
  title: "Studio",
  description: "Meridian is a small atelier in Oslo and Lisbon, founded in 2009 on the conviction that fewer, slower projects produce better buildings. Meet the four founding partners.",
};

const DEMO_PEOPLE = [
  { _id: "1", name: "Ingrid Halland", role: "Founding partner · Architecture\nAHO, OAT board", photo: null, email: "ingrid@meridian.studio", img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=900&q=80" },
  { _id: "2", name: "Tomás Albuquerque", role: "Founding partner · Urbanism\nFAUP, Ordem dos Arquitectos", photo: null, email: null, img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80" },
  { _id: "3", name: "Karim Vestergaard", role: "Partner · Interiors & material\nRCA, joined 2012", photo: null, email: null, img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=80" },
  { _id: "4", name: "Mira Søndergaard", role: "Partner · Technical\nNTNU, joined 2014", photo: null, email: null, img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=80" },
];

const DEMO_AWARDS = [
  { year: 2025, name: "Mies van der Rohe Award — finalist", project: "Estoril Library" },
  { year: 2024, name: "Timber Prize", project: "Hovden Lake House" },
  { year: 2024, name: "AR Emerging Architecture — winner", project: "Chapel of Six Trees" },
  { year: 2023, name: "Venice Biennale, Special Mention", project: "Forge Pavilion" },
  { year: 2023, name: "Wallpaper* Design Awards, Best New Hotel", project: "Brink Hotel" },
  { year: 2022, name: "National Building Quality Prize", project: "Quay 14" },
  { year: 2022, name: "RIBA International — longlist", project: "Estoril Library" },
  { year: 2021, name: "DOMUS Restoration & Heritage", project: "Quay 14" },
  { year: 2020, name: "AJ Small Projects — shortlist", project: "Ridge House" },
  { year: 2019, name: "Timber Prize — special mention", project: "Coastal Marker" },
];

export default async function AboutPage() {
  const [people, settings] = await Promise.all([
    getPeople().catch(() => []),
    getSettings().catch(() => null),
  ]);

  const displayPeople = people.length > 0 ? people : DEMO_PEOPLE;
  const awards = settings?.awards || DEMO_AWARDS;

  return (
    <main>
      {/* ── PAGE HERO ── */}
      <section className="page-hero">
        <div className="page-hero__title">
          <div className="eyebrow"><span className="bullet" />Studio · est. 2009</div>
          <h1 className="display display--lg">
            Twenty-two people<br />
            at two long tables<br />
            <em>and a kiln.</em>
          </h1>
        </div>
        <div>
          <p className="page-hero__desc">
            A small atelier in two cities, founded on the conviction that fewer,
            slower projects produce better buildings. Every project is led by a partner;
            every drawing leaves the building with a partner&rsquo;s mark on it.
          </p>
          <div className="page-hero__meta">
            <span>22 people</span>
            <span>2 offices</span>
            <span>9 disciplines</span>
            <span>Avg. tenure 6.4 yrs</span>
          </div>
        </div>
      </section>

      {/* ── STUDIO PHOTO ── */}
      <div style={{ padding: "80px var(--pad-x) 40px", maxWidth: "var(--maxw)", margin: "0 auto" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2400&q=80"
          alt="Studio workspace"
          style={{ width: "100%", aspectRatio: "21/9", objectFit: "cover" }}
        />
      </div>

      {/* ── NARRATIVE ── */}
      <div className="studio-narrative">
        <p className="studio-narrative__lede">
          The studio is small <em>on purpose.</em> We take three new commissions
          a year, and we say no, gently, to most others.
        </p>
        <div className="studio-narrative__cols">
          <p>
            The four founders met at architecture school in the late 1990s. We worked
            separately for a decade — in Tokyo, Porto, London and Bergen — and
            re-formed in 2009 in a single rented room above a fishmonger.
          </p>
          <p>
            Today the studio occupies two floors of a former bookbindery in Oslo and
            a townhouse in Lisbon. The Lisbon office opened in 2016, primarily for
            Iberian commissions, and is now the same size as Oslo.
          </p>
          <p>
            We are a discipline of generalists. Every architect at the studio also
            draws furniture, mixes plaster samples, or visits a quarry — because
            we believe the building thinks better when the hands and the head are
            the same person.
          </p>
        </div>
      </div>

      {/* ── PARTNERS ── */}
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="section__head">
          <div className="section-label">
            <span className="num">01</span>
            <span className="line" />
            Partners
          </div>
          <h2 className="display display--md">
            Four founders,<br />now joined by <em>eighteen.</em>
          </h2>
        </div>
        <div className="people">
          {displayPeople.map((p: { _id: string; name: string; role: string; email?: string | null; img?: string; photo?: SanityImage | null }) => {
            const person = p;
            const photoSrc = person.photo
              ? sanityImageUrl(person.photo, 900)
              : person.img || "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=900&q=80";
            return (
            <figure key={person._id} className="person">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photoSrc}
                alt={person.name}
              />
              <figcaption>
                <strong>{person.name}</strong>
                <span style={{ whiteSpace: "pre-line" }}>{person.role}</span>
                {person.email && (
                  <span>
                    <a href={`mailto:${person.email}`} style={{ color: "var(--accent)", borderBottom: "1px solid currentColor" }}>
                      {person.email}
                    </a>
                  </span>
                )}
              </figcaption>
            </figure>
            );
          })}
        </div>
      </section>

      {/* ── AWARDS ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section__head">
          <div className="section-label">
            <span className="num">02</span>
            <span className="line" />
            Recognition
          </div>
          <h2 className="display display--md">
            A short list,<br />kept on the back wall.
          </h2>
        </div>
        <ul className="awards">
          {awards.map((a, i) => (
            <li key={i}>
              <span className="awards__yr">{a.year}</span>
              <span className="awards__name">{a.name}</span>
              <span className="awards__work">{a.project}</span>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand
        label="Press & speaking"
        title={<>Writing about<br />a project, or asking<br />for a <em>lecture?</em></>}
        cta="press@meridian.studio"
        href="mailto:press@meridian.studio"
      />
    </main>
  );
}
