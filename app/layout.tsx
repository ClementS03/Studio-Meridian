import type { Metadata } from "next";
import { Instrument_Serif, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const interTight = Inter_Tight({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://meridian.studio"),
  title: {
    default: "Meridian — Architecture, Interiors & Urbanism",
    template: "%s · Meridian",
  },
  description:
    "Meridian is a small atelier in Oslo and Lisbon designing buildings, interiors, and places that age into their context — quiet in material, generous in proportion.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Meridian",
    title: "Meridian — Architecture, Interiors & Urbanism",
    description:
      "A small atelier in Oslo and Lisbon designing buildings that age into their context.",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html lang="en" className={`${instrumentSerif.variable} ${interTight.variable} ${jetbrainsMono.variable}`}>
      <body>
        {isDraftMode && (
          <div style={{
            position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999,
            background: "var(--accent)", color: "#fff", padding: "8px 24px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase",
          }}>
            <span>Preview mode — showing draft content</span>
            <a href="/api/draft-mode/disable" style={{ color: "#fff", textDecoration: "underline" }}>
              Exit preview
            </a>
          </div>
        )}
        <Nav />
        {children}
        <Footer />
        {isDraftMode && <VisualEditing />}
      </body>
    </html>
  );
}
