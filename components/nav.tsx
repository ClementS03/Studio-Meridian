"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/works", label: "Works" },
  { href: "/about", label: "Studio" },
  { href: "/services", label: "Services" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

function LogoMark() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M2 20 L12 4 L22 20 M7 20 L12 12 L17 20" />
    </svg>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav${scrolled ? " is-scrolled" : ""}`}>
      <Link href="/" className="nav__logo" aria-label="Meridian, home">
        <LogoMark />
        <span className="nav__wordmark">Meridian</span>
      </Link>

      <nav className="nav__links" aria-label="Primary">
        {links.map((l) => {
          const active = pathname === l.href || pathname.startsWith(l.href + "/");
          return (
            <Link key={l.href} href={l.href} aria-current={active ? "page" : undefined}>
              {l.label}
            </Link>
          );
        })}
      </nav>

      <Link href="/contact" className="nav__cta">
        <span>Begin a project</span>
        <span className="nav__cta-dot" aria-hidden="true" />
      </Link>
    </header>
  );
}
