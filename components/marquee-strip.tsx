import { Fragment } from "react";

const DEFAULT_ITEMS = [
  "City of Bergen", "Fundação Calouste Gulbenkian", "Statsbygg",
  "Câmara Municipal de Lisboa", "Oslo Architecture Triennale",
  "Diocese of Évora", "Reykjavík Art Museum", "Entra Eiendom",
];

interface MarqueeStripProps {
  items?: string[];
}

export function MarqueeStrip({ items = DEFAULT_ITEMS }: MarqueeStripProps) {
  const doubled = [...items, ...items];
  return (
    <section className="marquee" aria-label="Selected collaborators">
      <div className="marquee__track">
        {doubled.map((item, i) => (
          <Fragment key={`${item}-${i}`}>
            <span>{item}</span>
            <span className="sep" aria-hidden="true">◆</span>
          </Fragment>
        ))}
      </div>
    </section>
  );
}
