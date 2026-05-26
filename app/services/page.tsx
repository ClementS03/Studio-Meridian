import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Services",
  description: "Five practice areas — architecture, interiors, adaptive reuse, urbanism and research. All led by a partner, from first sketch to handed keys.",
};

const SERVICES = [
  {
    num: "01.",
    title: "Architecture",
    lede: "Houses, civic buildings, sacred and educational spaces — from the first walk on site to the final certificate of completion. We are typically engaged from feasibility and remain on the project through construction with weekly site visits.",
    includes: [
      "Feasibility studies", "Concept & schematic design",
      "Planning & building permit", "Technical drawings",
      "Tender documentation", "Site supervision",
      "Post-occupancy review", "Long-form maintenance manual",
    ],
  },
  {
    num: "02.",
    title: "Interiors & furniture",
    lede: "Joinery, lighting, lime-plaster surfaces, hardware and bespoke pieces — all prototyped in-house. Our basement workshop has a metal lathe, a kiln, a small CNC and an embarrassing collection of plaster moulds.",
    includes: [
      "Interior architecture", "Lighting design",
      "Material & finish library", "Bespoke joinery",
      "Furniture (one-off & small batch)", "Hardware design",
      "Ceramic & plaster prototyping", "FF&E procurement",
    ],
  },
  {
    num: "03.",
    title: "Adaptive reuse",
    lede: "Industrial, harbour, ecclesiastical and heritage buildings, reworked to last another century. We begin with a forensic survey and end with a building that reads as more itself, not less.",
    includes: [
      "Building survey & condition report", "Heritage consenting",
      "Structural reinforcement strategy", "Environmental retrofit",
      "Material salvage & reuse", "Programme & brief development",
    ],
  },
  {
    num: "04.",
    title: "Urbanism & masterplanning",
    lede: "Small district masterplans, public realm strategies, and quiet civic infrastructure. We work at the scale where decisions are still architectural — three city blocks, not three thousand.",
    includes: [
      "Masterplanning (small scale)", "Public realm & streetscape",
      "Civic infrastructure", "Density & typology studies",
      "Heritage area frameworks", "Climate adaptation strategy",
    ],
  },
  {
    num: "05.",
    title: "Consulting & research",
    lede: "Feasibility studies, material research, and second-opinion design review — for clients, peer practices, and the occasional ministry. Our long-running material research is open and published.",
    includes: [
      "Feasibility & site selection", "Independent design review",
      "Material research (lime, earth, timber)", "Carbon & life-cycle reporting",
      "Expert witness", "Lectures & teaching",
    ],
  },
];

export default function ServicesPage() {
  return (
    <main>
      {/* ── PAGE HERO ── */}
      <section className="page-hero">
        <div className="page-hero__title">
          <div className="eyebrow"><span className="bullet" />Services</div>
          <h1 className="display display--lg">What we are<br />commissioned for.</h1>
        </div>
        <div>
          <p className="page-hero__desc">
            Five practice areas, all led by a partner, all worked on from first sketch
            to handed keys. We take roughly three new commissions a year and decline
            most others — every project gets the same depth of attention.
          </p>
          <div className="page-hero__meta">
            <span>Five practice areas</span>
            <span>Partner-led</span>
            <span>Studio of 22</span>
          </div>
        </div>
      </section>

      {/* ── SERVICE CARDS ── */}
      <section className="services-detailed">
        <div className="service-cards">
          {SERVICES.map((s) => (
            <article key={s.num} className="service-card">
              <div className="service-card__num">{s.num}</div>
              <h3>{s.title}</h3>
              <p className="service-card__lede">{s.lede}</p>
              <ul className="service-card__includes">
                {s.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <CtaBand
        label="Engagement"
        title={<>Not sure which<br />fits your brief?<br /><em>Write to us.</em></>}
        body="We reply to every commissioning letter within ten working days. The first conversation is always free."
        cta="Begin a project"
        href="/contact"
      />
    </main>
  );
}
