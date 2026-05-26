interface PageHeroProps {
  eyebrow?: string;
  title: React.ReactNode;
  description: string;
  meta?: string[];
}

export function PageHero({ eyebrow, title, description, meta }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="page-hero__title">
        {eyebrow && (
          <div className="eyebrow">
            <span className="bullet" />
            {eyebrow}
          </div>
        )}
        <h1 className="display display--lg">{title}</h1>
      </div>
      <div>
        <p className="page-hero__desc">{description}</p>
        {meta && meta.length > 0 && (
          <div className="page-hero__meta">
            {meta.map((m) => <span key={m}>{m}</span>)}
          </div>
        )}
      </div>
    </section>
  );
}
