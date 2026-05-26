import { getAllPosts } from "@/sanity/queries/journal";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://meridian.studio";

// Mirrors the static archive shown on /journal when Sanity is not configured,
// so the feed is never empty for client demos.
const FALLBACK_POSTS = [
  { slug: "in-praise-of-lime-plaster", date: "2025-03-25", title: "In praise of lime plaster", excerpt: "A material that breathes, repairs itself, and forgives the hands that mix it." },
  { slug: "civic-building-after-algorithm", date: "2025-02-11", title: "The civic building, after the algorithm", excerpt: "On designing for use, not engagement." },
  { slug: "notes-from-quay-14", date: "2025-01-18", title: "Notes from Quay 14, two years on", excerpt: "What our adaptive reuse looks and feels like after a Bergen winter." },
  { slug: "defence-of-small-offices", date: "2024-12-02", title: "A short defence of small offices", excerpt: "Why a studio of twenty does better work than a studio of two hundred." },
  { slug: "cork-oaks-and-the-chapel", date: "2024-11-14", title: "Cork oaks and the chapel", excerpt: "Designing around six trees that are older than the parish." },
  { slug: "bergen-brick-catalogued", date: "2024-10-20", title: "The Bergen brick, catalogued", excerpt: "A study of the eight common nineteenth-century brick formats in Bergen's harbour." },
  { slug: "on-the-hearth", date: "2024-09-06", title: "On the hearth", excerpt: "Why we still build masonry hearths, and how to size them for forty." },
  { slug: "estoril-el-croquis", date: "2024-08-12", title: "Press: Estoril in El Croquis 226", excerpt: "A 24-page feature in this month's El Croquis." },
];

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const sanityPosts = await getAllPosts().catch(() => []);

  const posts =
    sanityPosts.length > 0
      ? sanityPosts.map((p) => ({
          slug: p.slug.current,
          date: p.date,
          title: p.title,
          excerpt: p.excerpt,
        }))
      : FALLBACK_POSTS;

  const items = posts
    .map((p) => {
      const url = `${SITE_URL}/journal/${p.slug}`;
      return `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description>${escapeXml(p.excerpt || "")}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Meridian — Journal</title>
    <link>${SITE_URL}/journal</link>
    <description>Essays on material and method, lecture transcripts, and field notes from finished buildings.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
