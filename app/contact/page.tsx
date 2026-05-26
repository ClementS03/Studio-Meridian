import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell Meridian about a place, a brief, or a small idea. We answer every commissioning letter within ten working days — the first conversation is always free and always with a partner.",
};

export default function ContactPage() {
  return (
    <main>
      {/* ── PAGE HERO ── */}
      <section className="page-hero">
        <div className="page-hero__title">
          <div className="eyebrow"><span className="bullet" />Contact</div>
          <h1 className="display display--lg">Tell us about a place,<br />a brief, or a <em>small idea.</em></h1>
        </div>
        <div>
          <p className="page-hero__desc">
            We answer every commissioning letter within ten working days, in the order
            they arrive. Press enquiries are answered the same week. The first
            conversation is always free and is always with a partner.
          </p>
          <div className="page-hero__meta">
            <span>Reply within 10 days</span>
            <span>First call: free</span>
            <span>By a partner, always</span>
          </div>
        </div>
      </section>

      {/* ── FORM + OFFICES ── */}
      <ContactForm />

      <section className="cta-band">
        <div className="cta-band__inner">
          <div className="section-label section-label--light">
            <span className="num">→</span>
            <span className="line" />
            Visit
          </div>
          <h2 className="display display--xl">
            Or come and see us<br /><em>over coffee.</em>
          </h2>
          <p>Both studios keep a few hours each week for walk-in visits. Bring a sketch, a brief, or just a question.</p>
        </div>
      </section>
    </main>
  );
}
