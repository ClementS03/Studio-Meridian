import Link from "next/link";

interface CtaBandProps {
  label?: string;
  title: React.ReactNode;
  body?: string;
  cta: string;
  href: string;
}

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 8 H13 M9 4 L13 8 L9 12" />
    </svg>
  );
}

export function CtaBand({ label, title, body, cta, href }: CtaBandProps) {
  return (
    <section className="cta-band">
      <div className="cta-band__inner">
        {label && (
          <div className="section-label section-label--light">
            <span className="num">→</span>
            <span className="line" />
            {label}
          </div>
        )}
        <h2 className="display display--xl">{title}</h2>
        {body && <p>{body}</p>}
        <Link href={href} className="btn btn--inverse">
          <span>{cta}</span>
          <span className="btn__arrow"><Arrow /></span>
        </Link>
      </div>
    </section>
  );
}
