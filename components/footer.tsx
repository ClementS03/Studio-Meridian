import Link from "next/link";

function LogoMark() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M2 20 L12 4 L22 20 M7 20 L12 12 L17 20" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__col">
          <div className="footer__brand">
            <LogoMark />
            <span>Meridian</span>
          </div>
          <p>Architecture, interiors and urbanism.<br />Since 2009.</p>
          <p className="footer__tag" style={{ fontStyle: "italic", fontFamily: "var(--font-display)", fontSize: 15, color: "var(--ink-2)", maxWidth: "32ch", marginTop: 12 }}>
            A small atelier designing buildings that age into their context.
          </p>
        </div>

        <div className="footer__col">
          <h4>Practice</h4>
          <Link href="/works">Works</Link>
          <Link href="/about">Studio</Link>
          <Link href="/services">Services</Link>
          <Link href="/journal">Journal</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <div className="footer__col">
          <h4>Elsewhere</h4>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://www.are.na/" target="_blank" rel="noopener noreferrer">Are.na</a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="/journal.xml">Journal RSS</a>
        </div>

        <div className="footer__col">
          <h4>Visit</h4>
          <p>
            Markveien 35 B<br />
            0554 Oslo, Norway<br />
            <a href="mailto:hello@meridian.studio">hello@meridian.studio</a>
          </p>
        </div>
      </div>

      <div className="footer__wordmark" aria-hidden="true">Meridian</div>

      <div className="footer__legal">
        <span>© 2009–{year} Meridian · All rights reserved</span>
        <span>Set in Instrument Serif &amp; Inter Tight</span>
      </div>
    </footer>
  );
}
