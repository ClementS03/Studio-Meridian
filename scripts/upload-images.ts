/**
 * Upload cover images to Sanity for all seeded documents.
 * Fetches from Unsplash, uploads to Sanity CDN, patches each document.
 *
 * Usage:
 *   npm run upload-images
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve } from "path";

function loadEnvLocal() {
  try {
    const raw = readFileSync(resolve(process.cwd(), ".env.local"), "utf-8");
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
      if (!process.env[key]) process.env[key] = val;
    }
  } catch {}
}

loadEnvLocal();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error("❌  Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const IMAGES: Array<{ docId: string; photoId: string; alt: string }> = [
  // Projects
  { docId: "project-hovden-lake-house",    photoId: "photo-1600596542815-ffad4c1539a9", alt: "Hovden Lake House exterior" },
  { docId: "project-estoril-library",      photoId: "photo-1554995207-c18c203602cb",    alt: "Estoril Library reading room" },
  { docId: "project-quay-14",              photoId: "photo-1565793979088-5e5a15dd2cf3", alt: "Quay 14 warehouse interior" },
  { docId: "project-chapel-of-six-trees",  photoId: "photo-1519710164239-da123dc03ef4", alt: "Chapel of Six Trees, Évora" },
  { docId: "project-brink-hotel",          photoId: "photo-1506905925346-21bda4d32df4", alt: "Brink Hotel, Iceland" },
  { docId: "project-forge-pavilion",       photoId: "photo-1486325212027-8081e485255e", alt: "Forge Pavilion, Venice" },
  { docId: "project-ridge-house",          photoId: "photo-1449158743715-0a90ebb6d2d8", alt: "Ridge House, Voss" },
  { docId: "project-sao-bento-townhouse",  photoId: "photo-1558618666-fcd25c85cd64",    alt: "São Bento Townhouse" },
  { docId: "project-coastal-marker",       photoId: "photo-1439405326854-014607f694d7", alt: "Coastal Marker, Lindesnes" },
  { docId: "project-alfama-music-school",  photoId: "photo-1571624436279-b272aff752b5", alt: "Alfama Music School" },
  { docId: "project-harbour-baths",        photoId: "photo-1545324418-cc1a3fa10c00",    alt: "Harbour Baths, Oslo" },
  { docId: "project-tavira-boutique-hotel",photoId: "photo-1613490493576-7fde63acd811", alt: "Tavira Boutique Hotel" },
  // Journal posts
  { docId: "journal-in-praise-of-lime-plaster",        photoId: "photo-1558618666-fcd25c85cd64",    alt: "Lime plaster wall detail" },
  { docId: "journal-civic-building-after-algorithm",   photoId: "photo-1554995207-c18c203602cb",    alt: "Civic building interior" },
  { docId: "journal-notes-from-quay-14",               photoId: "photo-1565793979088-5e5a15dd2cf3", alt: "Quay 14 two years on" },
  { docId: "journal-defence-of-small-offices",         photoId: "photo-1486325212027-8081e485255e", alt: "Small studio interior" },
  { docId: "journal-cork-oaks-and-the-chapel",         photoId: "photo-1519710164239-da123dc03ef4", alt: "Cork oaks and chapel" },
  { docId: "journal-bergen-brick-catalogued",          photoId: "photo-1545324418-cc1a3fa10c00",    alt: "Bergen brick, harbour" },
  { docId: "journal-on-the-hearth",                    photoId: "photo-1600596542815-ffad4c1539a9", alt: "Masonry hearth interior" },
  { docId: "journal-estoril-el-croquis",               photoId: "photo-1554995207-c18c203602cb",    alt: "Estoril Library exterior" },
];

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function uploadOne(docId: string, photoId: string, alt: string) {
  const url = `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1800&q=80`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${url}`);

  const buffer = Buffer.from(await res.arrayBuffer());

  const asset = await client.assets.upload("image", buffer, {
    filename: `${docId}.jpg`,
    contentType: "image/jpeg",
  });

  await client
    .patch(docId)
    .set({
      coverImage: {
        _type: "image",
        asset: { _type: "reference", _ref: asset._id },
        alt,
      },
    })
    .commit();
}

async function main() {
  console.log(`\n🖼️   Uploading ${IMAGES.length} cover images to Sanity...\n`);

  for (const { docId, photoId, alt } of IMAGES) {
    try {
      await uploadOne(docId, photoId, alt);
      console.log(`✅  ${docId}`);
    } catch (err) {
      console.error(`❌  ${docId}:`, (err as Error).message);
    }
    await sleep(300); // avoid hammering Unsplash
  }

  console.log("\n✨  Done.\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
