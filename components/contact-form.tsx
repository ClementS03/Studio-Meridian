"use client";

import { useState } from "react";

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 8 H13 M9 4 L13 8 L9 12" />
    </svg>
  );
}

interface Office {
  city: string;
  address: string | null;
  email: string;
  phone: string | null;
  hours: string;
}

const OFFICES: Office[] = [
  {
    city: "Oslo · main studio",
    address: "Markveien 35 B\n0554 Oslo, Norway",
    email: "oslo@meridian.studio",
    phone: "+47 22 50 14 80",
    hours: "Mon — Fri · 9:00 – 17:30\nVisits by appointment",
  },
  {
    city: "Lisbon · iberian office",
    address: "Rua de São Bento 218\n1200-822 Lisbon, Portugal",
    email: "lisbon@meridian.studio",
    phone: "+351 21 396 22 17",
    hours: "Seg — Sex · 9:30 – 18:00\nVisitas com marcação",
  },
  {
    city: "Press & speaking",
    address: null,
    email: "press@meridian.studio",
    phone: null,
    hours: "Same-week reply.",
  },
  {
    city: "Careers",
    address: null,
    email: "work@meridian.studio",
    phone: null,
    hours: "We hire once a year, usually in spring. Open applications kept on file for 18 months.",
  },
];

export function ContactForm() {
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {}
    setSent(true);
  }

  return (
    <section className="contact-page">
      <form className="contact__form" onSubmit={handleSubmit}>
        <label>
          <span>Your name</span>
          <input type="text" name="name" placeholder="Family & given name" required />
        </label>
        <label>
          <span>Email</span>
          <input type="email" name="email" placeholder="you@where.com" required />
        </label>
        <label>
          <span>Phone (optional)</span>
          <input type="tel" name="phone" placeholder="+47 …" />
        </label>
        <label>
          <span>Project location</span>
          <input type="text" name="place" placeholder="City, country" />
        </label>
        <label className="contact__form-wide">
          <span>Practice area</span>
          <input
            type="text" name="area"
            placeholder="Architecture / Interiors / Adaptive reuse / Urbanism / Consulting"
          />
        </label>
        <label className="contact__form-wide">
          <span>A few sentences about the brief</span>
          <textarea
            rows={5} name="brief"
            placeholder="Site, programme, scale, timing, budget range — whatever you have so far."
          />
        </label>
        <div className="contact__form-foot">
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-2)" }}>
            No data is stored beyond our reply.
          </span>
          <button type="submit" className="btn">
            <span>{sent ? "Thank you — we'll write back within ten days." : "Send commission"}</span>
            {!sent && <span className="btn__arrow"><Arrow /></span>}
          </button>
        </div>
      </form>

      <aside className="offices">
        {OFFICES.map((o) => (
          <div key={o.city} className="office">
            <h3>{o.city}</h3>
            <p style={{ whiteSpace: "pre-line" }}>
              {o.address && <>{o.address}<br /><br /></>}
              {o.email && <><a href={`mailto:${o.email}`}>{o.email}</a><br /></>}
              {o.phone && <>{o.phone}<br /><br /></>}
              {o.hours && o.hours}
            </p>
          </div>
        ))}
      </aside>
    </section>
  );
}
