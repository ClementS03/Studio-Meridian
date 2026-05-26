/**
 * Seed script — populates Sanity with demo projects and journal posts.
 *
 * Requirements:
 *   npm install --save-dev tsx dotenv
 *
 * Usage:
 *   npx tsx --require dotenv/config scripts/seed.ts dotenv_config_path=.env.local
 *
 * You need a token with Editor or Administrator role.
 * Create one at: https://sanity.io/manage → project → API → Tokens
 * Add it to .env.local as: SANITY_WRITE_TOKEN=sk...
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve } from "path";

// Load .env.local without dotenv dependency
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
  } catch {
    // .env.local not found — rely on shell env
  }
}

loadEnvLocal();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_TOKEN;

if (!projectId) {
  console.error("❌  Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local");
  process.exit(1);
}
if (!token) {
  console.error(
    "❌  Missing SANITY_API_TOKEN (or SANITY_WRITE_TOKEN) in .env.local\n" +
    "   The token must have Editor or Administrator role."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

// ─── Helper ─────────────────────────────────────────────────────────────────

function block(key: string, ...texts: string[]) {
  return {
    _type: "block",
    _key: key,
    style: "normal",
    markDefs: [],
    children: texts.map((text, i) => ({
      _type: "span",
      _key: `${key}s${i}`,
      text,
      marks: [],
    })),
  };
}

function h3(key: string, text: string) {
  return { ...block(key, text), style: "h3" };
}

// ─── Projects ────────────────────────────────────────────────────────────────

const projects = [
  {
    _id: "project-hovden-lake-house",
    _type: "project",
    title: "Hovden Lake House",
    slug: { _type: "slug", current: "hovden-lake-house" },
    category: "residential",
    year: 2024,
    location: "Hovden, Norway",
    area: "980 m²",
    status: "Completed",
    tagline: "A black-stained pine house on a lakeside ridge.",
    description: "Perched above a glacial lake in the Setesdal highlands, this family retreat is clad entirely in black-stained local pine. The plan follows the ridge contour, opening a long south-facing terrace to the water.",
    featured: true,
    featuredVariant: "feature",
    sortOrder: 1,
    content: [
      block("p1", "The brief was simple: a house that disappears into the pine forest until you are almost upon it. The clients, a Bergen family with three grown children, wanted a place that felt as much outside as in — a long weekend house, not a trophy."),
      h3("h1", "Site and orientation"),
      block("p2", "The ridge runs south-southwest, giving us a natural geometry to follow. We set the house along this line and opened the living floor entirely to the lake with a run of floor-to-ceiling glazing. The bedroom wing steps back into the slope so that from the water the building reads as a single dark line."),
      h3("h2", "Material and construction"),
      block("p3", "All external cladding is local Setesdal pine, charred and oiled. Inside, untreated pine continues on ceilings and joinery, with poured concrete floors throughout the ground level. The structure is prefabricated cross-laminated timber — assembled in eleven days on site."),
      block("p4", "Recognition: Arkitekturprisen 2024, Nominated. Photography: Sindre Ellingsen."),
    ],
  },
  {
    _id: "project-estoril-library",
    _type: "project",
    title: "Estoril Library",
    slug: { _type: "slug", current: "estoril-library" },
    category: "civic",
    year: 2023,
    location: "Estoril, Portugal",
    area: "2,400 m²",
    status: "Completed",
    tagline: "A public library set at the water's edge, clad in local limestone.",
    description: "The Estoril municipal library sits on the Atlantic promenade. Two limestone volumes bracket a glazed reading room that faces the sea, filling from dawn with natural light diffused by salt-etched glass.",
    featured: true,
    featuredVariant: "wide",
    sortOrder: 2,
    content: [
      block("p1", "Estoril commissioned a library with an unusual programme: the building had to serve both the residential neighbourhood and the thousands of day visitors who arrive by train from Lisbon each summer. The solution was a building with two faces — civic and public — that share a single reading room."),
      h3("h1", "Programme"),
      block("p2", "The ground floor is entirely open: periodicals, children's library, community meeting rooms, café. The upper floor — reached by a broad limestone stair — houses the adult collection and the main reading room, which looks directly out over the Atlantic."),
      h3("h2", "Structure and material"),
      block("p3", "The two flanking volumes are load-bearing limestone masonry — the same stone used in the nearby casino's original 1930s extension. Between them, the reading room is a steel-and-glass greenhouse, salt-etched on the outer face to manage glare without shutting out the sea."),
      block("p4", "Recognition: Prémio Nacional de Arquitectura 2023. Published in El Croquis 226."),
    ],
  },
  {
    _id: "project-quay-14",
    _type: "project",
    title: "Quay 14",
    slug: { _type: "slug", current: "quay-14" },
    category: "reuse",
    year: 2022,
    location: "Bergen, Norway",
    area: "3,100 m²",
    status: "Completed",
    tagline: "Industrial harbour warehouse converted to workplace and gallery.",
    description: "A nineteenth-century fish-packing warehouse on Bergen's Bryggen quay, stripped to its original fir structure and reoccupied as a mixed-use creative workplace and exhibition hall.",
    featured: false,
    sortOrder: 3,
    content: [
      block("p1", "Quay 14 was built in 1887 to store and process salted cod for export to Portugal and Brazil. By the time we were commissioned it had been empty for eleven years, the roof failing and the original fir structure weathered but structurally sound."),
      h3("h1", "Approach"),
      block("p2", "Our starting principle: take nothing out that does not have to go. The original timber frame was retained entirely. New concrete floor slabs were poured within the existing bays. Services — ventilation, data, lighting — run in exposed galvanised conduit along the underside of the original roof structure."),
      h3("h2", "Programme"),
      block("p3", "The building now houses twelve design studios on the upper level, a 600 m² exhibition hall on the ground floor, and a public café at the harbour end. A new external stair gives independent access to the studios outside gallery hours."),
    ],
  },
  {
    _id: "project-chapel-of-six-trees",
    _type: "project",
    title: "Chapel of Six Trees",
    slug: { _type: "slug", current: "chapel-of-six-trees" },
    category: "civic",
    year: 2021,
    location: "Évora, Portugal",
    area: "340 m²",
    status: "Completed",
    tagline: "A pilgrimage chapel shaped around the six cork oaks already on site.",
    description: "The parish of São Bento de Évora asked for a small chapel on the edge of their land. Six ancient cork oaks determined everything: the plan, the roof profile, the orientation.",
    featured: false,
    sortOrder: 4,
    content: [
      block("p1", "The six trees are between 180 and 240 years old. They are far older than the parish, and the brief stipulated that none could be removed. The building therefore grew from the spaces between them — a plan of five irregular bays, each resolved differently depending on which tree it is near."),
      h3("h1", "Construction"),
      block("p2", "Walls are rammed earth — subsoil from the site itself, stabilised with 6% hydraulic lime. The roof is a single folded concrete plane, thin at the eaves and thickening to a ridge beam that passes between two of the trees without touching either. Roof lights are cut directly above each of the six trunks, so the trees cast moving shadows into the interior throughout the day."),
    ],
  },
  {
    _id: "project-brink-hotel",
    _type: "project",
    title: "Brink Hotel",
    slug: { _type: "slug", current: "brink-hotel" },
    category: "hospitality",
    year: 2024,
    location: "Reykjavík, Iceland",
    area: "54 rooms",
    status: "Completed",
    tagline: "A hotel that grew from the lava field — raw basalt, hot springs, silence.",
    description: "A 54-room retreat hotel on a lava field twenty minutes from Reykjavík. Geothermal energy powers the hotel entirely; the landscape is left untouched beyond the building footprint.",
    featured: false,
    sortOrder: 5,
    content: [
      block("p1", "The Brink site is a Holocene lava field — geologically young, ecologically fragile, visually extraordinary. The client's condition was that no heavy plant would cross the site boundary. Everything was craned in from the access road, placed on concrete pads that sit on the rock without penetrating it."),
      h3("h1", "Rooms and material"),
      block("p2", "The 54 guest rooms are distributed in five clusters, each rotated slightly from the others to interrupt any sense of uniformity. External walls are raw basalt, dry-laid by local craftsmen. Inside, the palette is narrow: black steel, undyed Icelandic wool, reclaimed fish-factory timber from a nearby demolition."),
      h3("h2", "Energy"),
      block("p3", "A geothermal borehole 180m below the building provides all heating and hot water. Solar panels on the roof cover approximately 30% of electrical demand. The hotel has been carbon-negative in operation since opening."),
    ],
  },
  {
    _id: "project-forge-pavilion",
    _type: "project",
    title: "Forge Pavilion",
    slug: { _type: "slug", current: "forge-pavilion" },
    category: "pavilion",
    year: 2023,
    location: "Venice, Italy",
    area: "220 m²",
    status: "Completed",
    tagline: "Cor-ten ribs and pressed-earth walls — built for the Architecture Biennale.",
    description: "A temporary pavilion for the 2023 Venice Architecture Biennale, on the theme of craft and industrial heritage. Cor-ten steel ribs support pressed-earth panels cast in Venice's own lagoonal clay.",
    featured: false,
    sortOrder: 6,
    content: [
      block("p1", "The Biennale theme — The Laboratory of the Future — asked participants to propose a form of construction relevant to the next fifty years. We proposed craft labour combined with abundant local materials: a shell of Cor-ten steel ribs, in-filled with panels of pressed lagoonal clay sourced from maintenance dredging of the Venetian lagoon."),
      h3("h1", "Fabrication"),
      block("p2", "The steel ribs were laser-cut in Mestre and assembled by hand on site. The earth panels were pressed and dried in a workshop on Giudecca island, ferried across and fixed with hidden steel clips. No wet concrete was used; the pavilion was fully demountable at the close of the Biennale."),
    ],
  },
  {
    _id: "project-ridge-house",
    _type: "project",
    title: "Ridge House",
    slug: { _type: "slug", current: "ridge-house" },
    category: "residential",
    year: 2022,
    location: "Voss, Norway",
    area: "620 m²",
    status: "Completed",
    tagline: "A family house carved into the hillside, invisible from below.",
    description: "A private house set into a south-facing hillside above Voss. From the valley floor the building is invisible; from inside, a long glass slot frames the full width of the valley below.",
    featured: false,
    sortOrder: 7,
    content: [
      block("p1", "The clients asked for a house that would not impose itself on the landscape. The steep south slope made this possible: we excavated a shelf, set the house back into the hillside, and covered the roof with the original turf. The grass grows right up to the ridge line."),
      h3("h1", "Plan"),
      block("p2", "The plan is a single bar — ninety-four metres long and seven metres wide — oriented east-west along the contour. All main rooms face south through a continuous glass slot that runs the full length. The slot is protected by a deep concrete soffit that provides shade in summer and allows low winter sun to penetrate twelve metres into the plan."),
    ],
  },
  {
    _id: "project-sao-bento-townhouse",
    _type: "project",
    title: "São Bento Townhouse",
    slug: { _type: "slug", current: "sao-bento-townhouse" },
    category: "residential",
    year: 2023,
    location: "Lisbon, Portugal",
    area: "410 m²",
    status: "Completed",
    tagline: "An 18th-century townhouse opened up — tile, lime, original timber floors.",
    description: "A deep Pombaline townhouse in the São Bento neighbourhood, stripped to its original lime-washed walls and timber structure, and opened from front to back with a glazed courtyard.",
    featured: false,
    sortOrder: 8,
    content: [
      block("p1", "The house was built in the 1760s as part of the Pombaline reconstruction of Lisbon after the 1755 earthquake. Its timber frame — the distinctive Pombaline \"cage\" that gives these buildings their earthquake resilience — was intact, though hidden behind a century of false ceilings and fitted kitchens."),
      h3("h1", "Intervention"),
      block("p2", "We removed every addition after 1900 and exposed the original structure. The courtyard, previously roofed with corrugated fibre cement, was glazed to become the heart of the house — a bright internal garden from which all rooms now take light. Original azulejo tiles, found stacked in the basement, were relaid in the entrance hall."),
    ],
  },
  {
    _id: "project-coastal-marker",
    _type: "project",
    title: "Coastal Marker",
    slug: { _type: "slug", current: "coastal-marker" },
    category: "pavilion",
    year: 2021,
    location: "Lindesnes, Norway",
    area: "45 m²",
    status: "Completed",
    tagline: "A waypoint shelter at Norway's southernmost tip, in weathered oak.",
    description: "A pilgrim shelter and viewpoint at Lindesnes, the southernmost point of Norway. Weathered oak planks, shaped to channel wind away from a protected inner seat that faces the lighthouse.",
    featured: false,
    sortOrder: 9,
    content: [
      block("p1", "Lindesnes lighthouse marks the southernmost tip of mainland Norway — a waypoint on the St Olav pilgrimage route and a destination in its own right. The coastal path commission asked for a shelter that could handle the full force of the North Sea without becoming a bunker."),
      h3("h1", "Form"),
      block("p2", "The shelter is a single curved form, open to the south and the lighthouse, closed to the north and the prevailing wind. The outer face deflects the wind up and over; the inner face is lined with weathered oak planks that will silver over time. A single bench, also in oak, faces the lighthouse across the headland."),
    ],
  },
  {
    _id: "project-alfama-music-school",
    _type: "project",
    title: "Alfama Music School",
    slug: { _type: "slug", current: "alfama-music-school" },
    category: "civic",
    year: 2024,
    location: "Lisbon, Portugal",
    area: "1,850 m²",
    status: "Under construction",
    tagline: "A conservatory embedded in the hillside — practice rooms facing the river.",
    description: "A new municipal conservatory for the Alfama hillside, set into the slope so that its roof becomes a public terrace at street level above. Estimated completion: 2026.",
    featured: false,
    sortOrder: 10,
    content: [
      block("p1", "The Alfama site — a former workshop building on the steep slope between the castle and the river — presented an extraordinary opportunity: a building that could be simultaneously above and below grade depending on which street you approach from. The roof at the upper street becomes the public terrace; the entrance at the lower street opens into a double-height foyer looking out over the Tagus."),
      h3("h1", "Acoustic design"),
      block("p2", "Twelve individual practice rooms are stacked on the river side, each isolated acoustically from its neighbours by concrete box-within-box construction. The main recital hall — 180 seats — is buried deepest in the slope for maximum acoustic isolation from street noise. A rooftop amphitheatre, open to the air, seats a further 250 for summer concerts."),
    ],
  },
  {
    _id: "project-harbour-baths",
    _type: "project",
    title: "Harbour Baths",
    slug: { _type: "slug", current: "harbour-baths" },
    category: "reuse",
    year: 2022,
    location: "Oslo, Norway",
    area: "1,200 m²",
    status: "Completed",
    tagline: "A decommissioned ferry terminal transformed into public bathing facilities.",
    description: "The former Nesoddtangen ferry terminal on Oslo's inner harbour, converted to a year-round public bathing complex with saunas, cold pools, and a floating bathing jetty.",
    featured: false,
    sortOrder: 11,
    content: [
      block("p1", "The ferry terminal was built in 1965 and decommissioned in 2018 when the Nesoddtangen route was rerouted to a new terminal further east. The City of Oslo's brief was unusual: retain the memory of the terminal while completely changing its use."),
      h3("h1", "Conversion"),
      block("p2", "The waiting hall — a long shed with a remarkable concrete waffle ceiling — was kept intact and fitted with three wood-fired saunas along the north wall. The old ticket counters became changing room units. The ferry apron, previously inaccessible to the public, was opened as a sun deck; a floating jetty extends into the fjord for cold-water bathing year-round."),
    ],
  },
  {
    _id: "project-tavira-boutique-hotel",
    _type: "project",
    title: "Tavira Boutique Hotel",
    slug: { _type: "slug", current: "tavira-boutique-hotel" },
    category: "hospitality",
    year: 2023,
    location: "Tavira, Portugal",
    area: "22 rooms",
    status: "Completed",
    tagline: "A sequence of whitewashed cortijos around a central garden and pool.",
    description: "Twenty-two rooms arranged in a cluster of low whitewashed volumes around a central garden with pool. The building reads as a small hamlet from the air — each volume slightly different in size and orientation.",
    featured: false,
    sortOrder: 12,
    content: [
      block("p1", "The brief was for a small hotel in the Algarve that would feel neither like a resort nor a boutique urban hotel — something closer to a private estate that happened to have guests. The site, three hectares of former citrus grove, suggested the answer: a cluster of small buildings rather than one large one."),
      h3("h1", "Layout and rooms"),
      block("p2", "Eleven separate volumes house the twenty-two rooms — each volume holding between one and four rooms, each volume slightly different. The volumes are arranged around a central garden and 25-metre pool. Covered walkways connect them but are not enclosed, so arrival at your room always involves passing through open air, under olive trees."),
    ],
  },
];

// ─── Journal posts ────────────────────────────────────────────────────────────

const journalPosts = [
  {
    _id: "journal-in-praise-of-lime-plaster",
    _type: "journalPost",
    title: "In praise of lime plaster",
    slug: { _type: "slug", current: "in-praise-of-lime-plaster" },
    kind: "essay",
    date: "2025-03-25",
    author: "Ingrid Halland",
    readTime: 8,
    featured: true,
    excerpt: "A material that breathes, repairs itself, and forgives the hands that mix it. Five years of working with lime in residential interiors.",
    content: [
      block("p1", "Lime plaster fell out of favour in Norway somewhere between 1965 and 1975. Gypsum board was faster, cheaper, and consistent in a way that lime — which depends on the temperature of the room, the wetness of the wall, the skill of the plasterer — never could be. The construction industry standardised, and a craft that had been practised continuously since the Vikings plastered their longhouses quietly disappeared."),
      h3("h1", "Why we started using it again"),
      block("p2", "We came to lime through a client constraint, not an aesthetic preference. A restoration project — a nineteenth-century Bergen merchant house — required lime plaster by the heritage authority. We had to find a plasterer, which meant finding someone who still knew how. There are, it turns out, perhaps a dozen in Norway. We found Torgeir Austad in Hardanger, who learned from his father, who learned from his."),
      block("p3", "The result on that first project changed everything. The walls breathed. Moisture moved through them rather than becoming trapped behind them. The colour — not white but a complex near-white — changed through the day as the light changed. And when a corner chipped, Torgeir came back, mixed a small batch, feathered it in. No seam."),
      h3("h2", "The working method"),
      block("p4", "Lime plaster is applied in three coats: scratch coat, brown coat, finish coat. Each must dry before the next is applied — not dry in the sense of gypsum drying (which is really a chemical set), but dry in the sense of having carbonated, having taken in CO2 from the air and converted back to calcium carbonate. This takes time. A wall that was rushed will crack. A wall given its proper time will last, as the Romans demonstrated, several centuries."),
      block("p5", "We now specify lime plaster on every project where the client budget and timeline allow it. The premium over gypsum board is real — typically 30 to 40% on the plastering line — but on a project of any quality it is recoverable in the first decade simply through the absence of repainting cycles. Lime needs no paint. It is the finish."),
    ],
  },
  {
    _id: "journal-civic-building-after-algorithm",
    _type: "journalPost",
    title: "The civic building, after the algorithm",
    slug: { _type: "slug", current: "civic-building-after-algorithm" },
    kind: "lecture",
    date: "2025-02-11",
    author: "Ingrid Halland",
    readTime: 12,
    featured: true,
    excerpt: "Transcript of a keynote at the Oslo Architecture Triennale — on designing for use, not engagement.",
    content: [
      block("p1", "What follows is an edited transcript of a keynote delivered at the Oslo Architecture Triennale in February 2025. The theme of the Triennale was Enough: the architecture of sufficiency. I was asked to speak about civic buildings — libraries, town halls, community centres — in an age of digital public space."),
      h3("h1", "The problem of engagement"),
      block("p2", "There is a word that has migrated from the tech industry into architecture over the past decade, and I want to propose that we send it back. The word is engagement. An engaged user is a returning user — someone who cannot put the app down, who is compelled back by notifications, by unresolved loops, by the anxiety of missing out. An engaged citizen is something different. An engaged citizen chooses to participate. The difference matters."),
      block("p3", "When we design civic buildings for engagement, we tend to design for the same compulsions that keep people scrolling: novelty, spectacle, the promise of something unexpected around the next corner. The building becomes a machine for producing the feeling of engagement rather than the substance of civic life. The museum that you Instagram rather than look at. The library that photographs well but has nowhere quiet to read."),
      h3("h2", "Designing for use"),
      block("p4", "The alternative is to design for use — a more demanding brief, because use is specific and particular in a way that engagement is not. To design for use requires knowing what, concretely, people will do in a building. Not \"engage with\" it, but sit in it, read in it, argue in it, leave their children in it, return to it on Tuesday afternoons because the light is right and the chair fits."),
      block("p5", "The Estoril library, which we completed in 2023, has a reading room that faces the Atlantic. We spent three months arguing about the glass — about how much to tint it, whether to use frit, whether the sea view was a distraction from reading. We concluded, after extensive user testing with the librarians, that the sea was not a distraction. It was the point. People come to that reading room because they want to read with the sea in their peripheral vision. The building serves a specific desire, held by specific people, in a specific place."),
    ],
  },
  {
    _id: "journal-notes-from-quay-14",
    _type: "journalPost",
    title: "Notes from Quay 14, two years on",
    slug: { _type: "slug", current: "notes-from-quay-14" },
    kind: "field-notes",
    date: "2025-01-18",
    author: "Karim Vestergaard",
    readTime: 5,
    featured: true,
    excerpt: "What our adaptive reuse looks and feels like after a Bergen winter — a post-occupancy walk-through.",
    content: [
      block("p1", "Two years ago we handed over the keys to Quay 14. Last month I spent a day walking the building with the facilities manager, Hanne Dahl, who has been in the building every working day since it opened. These are notes from that walk."),
      h3("h1", "What works"),
      block("p2", "The exposed timber frame — the thing that worried us most — has performed better than expected. The nineteenth-century fir has darkened slightly with age and the humidity of the Bergen harbour. It now looks exactly as it should: old, used, confident. Several of the studio tenants have told us that clients comment on it before anything else."),
      block("p3", "The concrete floors have acquired a patina. There are scuffs near the gallery entrance where the loading trolleys come in. Hanne showed me these with a kind of proprietary pride, as if they were evidence of a building doing its job. They are."),
      h3("h2", "What surprised us"),
      block("p4", "The café at the harbour end has become a destination in its own right. We did not design for this. We designed a café for the building's users; what happened was that the café attracted users to the building. On Saturday mornings there is a queue. The harbourfront tables — originally intended for studio tenants — are taken by the public by nine o'clock."),
      block("p5", "The lesson, for us, is that programme is not fixed at handover. Buildings attract uses that their designers did not imagine. The best we can do is make spaces that are good enough to accommodate that drift."),
    ],
  },
  {
    _id: "journal-defence-of-small-offices",
    _type: "journalPost",
    title: "A short defence of small offices",
    slug: { _type: "slug", current: "defence-of-small-offices" },
    kind: "essay",
    date: "2024-12-02",
    author: "Tomás Albuquerque",
    readTime: 6,
    featured: false,
    excerpt: "Why a studio of twenty does better work than a studio of two hundred.",
    content: [
      block("p1", "At a conference in Amsterdam last year I was asked by a journalist how large I thought a good architecture office could be. I said twenty people. He asked me to explain. I found, to my surprise, that I could."),
      h3("h1", "The communication threshold"),
      block("p2", "In a studio of twenty people, every person can have a direct conversation with every other person without that conversation being mediated by hierarchy or protocol. The principal knows what every project is doing. Every architect knows what the principal thinks about every project. There are no lost messages, no decisions made without the people who will be affected by them."),
      block("p3", "In a studio of two hundred, this is structurally impossible. You need layers. The layers introduce distortion. The principal's vision — which is, after all, why clients chose the office — is translated and retranslated until what is built bears only a family resemblance to what was originally imagined."),
      h3("h2", "The portfolio problem"),
      block("p4", "Large offices solve this problem by developing a \"house style\" — a set of formal moves so distinctive that any architect in the office can produce them without direct guidance from the founding partner. The style then becomes the office rather than the person. It is legible in the marketplace, reproducible at scale, licensable to other territories."),
      block("p5", "This is a reasonable response to a real problem. It is also, in my view, the beginning of the end of good architecture. Style substitutes for thought. The formal vocabulary that was once a discovery becomes a product. The office grows; the ideas stop."),
    ],
  },
  {
    _id: "journal-cork-oaks-and-the-chapel",
    _type: "journalPost",
    title: "Cork oaks and the chapel",
    slug: { _type: "slug", current: "cork-oaks-and-the-chapel" },
    kind: "project-notes",
    date: "2024-11-14",
    author: "Tomás Albuquerque",
    readTime: 4,
    featured: false,
    excerpt: "Designing around six trees that are older than the parish.",
    content: [
      block("p1", "The six cork oaks were not mentioned in the initial brief. The parish priest described the site as \"a piece of land to the east of the cemetery, open, nothing particular about it.\" When we visited, we found six trees between 180 and 240 years old — older than the parish itself, which was established in 1831 — and understood immediately that the building would have to be shaped by them rather than the other way around."),
      h3("h1", "The constraint as generator"),
      block("p2", "Each tree has a root zone that extends roughly twelve metres from its trunk. We mapped these zones and found that they overlapped significantly — meaning there was no \"gap\" between trees into which a building of any scale could simply be placed. The building would have to thread through the trees, respect their roots, and ideally, once built, give them something back: shade, perhaps, or protection from the prevailing wind off the Alentejo plateau."),
      block("p3", "The rammed earth walls proved ideal for this. They are load-bearing, requiring no foundations deeper than 600mm. They are made from the site's own subsoil, which will have exactly the same effect on the tree roots as the undisturbed ground around them. And they are, by their nature, irregular — each bay is slightly different because the trees that define it are slightly different."),
    ],
  },
  {
    _id: "journal-bergen-brick-catalogued",
    _type: "journalPost",
    title: "The Bergen brick, catalogued",
    slug: { _type: "slug", current: "bergen-brick-catalogued" },
    kind: "research",
    date: "2024-10-20",
    author: "Mira Søndergaard",
    readTime: 9,
    featured: false,
    excerpt: "A study of the eight common nineteenth-century brick formats in Bergen's harbour.",
    content: [
      block("p1", "During the research phase of the Quay 14 project, we undertook what began as a practical survey and became something closer to an obsession. The building used several different brick formats — hand-made, each slightly irregular — and we needed to know which were original and which were later repair. This required understanding all the brick formats in common use in Bergen's harbour buildings between 1820 and 1920. What follows is a summary of that research."),
      h3("h1", "The eight formats"),
      block("p2", "Bergen's harbour brickwork draws on Dutch, German, and British traditions, reflecting the city's role as a Hanseatic trading port. We identified eight distinct formats in use across the surviving warehouse stock. The most common — Format A in our catalogue — is a thin, long brick (240 × 55 × 120 mm) with a distinctive red-orange iron-rich clay that indicates manufacture in the Laksevåg brickyards west of the city."),
      h3("h2", "Sourcing today"),
      block("p3", "None of the original Bergen brickyards operate today. Format A bricks are available from a manufacturer in Denmark who produces to historical specifications — we used their product for the Quay 14 repairs. Formats B through D can be sourced from the Netherlands. Formats E through H, which were imported from England, have no current source and require salvage from demolition."),
      block("p4", "The full catalogue, with photographs and dimensional tolerances, is available from the studio on request. We are in conversation with Bergen Municipality about depositing it with the city archive."),
    ],
  },
  {
    _id: "journal-on-the-hearth",
    _type: "journalPost",
    title: "On the hearth",
    slug: { _type: "slug", current: "on-the-hearth" },
    kind: "essay",
    date: "2024-09-06",
    author: "Karim Vestergaard",
    readTime: 7,
    featured: false,
    excerpt: "Why we still build masonry hearths, and how to size them for forty.",
    content: [
      block("p1", "Every year or so a client asks us whether they really need a masonry hearth, or whether a glass-fronted gas fire or — increasingly — a bioethanol burner would do the same job. Every year we have the same conversation. The answer, always, is the same: it depends what job you think the hearth is doing."),
      h3("h1", "The thermal argument"),
      block("p2", "As a heat source, the masonry hearth is inefficient. A well-designed wood-burning insert recovers perhaps 75% of the combustion energy as room heat; a masonry fireplace — open, drawing on room air — recovers perhaps 15%. As a primary heat source, it makes no sense. As a secondary heat source for a well-insulated house with a heat pump as primary, it makes perfect sense: you run it when you want to, for pleasure, and the heat pump takes care of the background temperature."),
      block("p3", "This is, in our experience, how almost all private clients use a hearth. They do not rely on it for warmth. They rely on it for what a fire does to a room — to the quality of light, to the smell, to the way a group of people orient themselves around it. The hearth is a social technology that is perhaps forty thousand years old. Replacing it with a screen that simulates flames is, in my view, a category error."),
      h3("h2", "Sizing for a house of forty"),
      block("p4", "The Hovden Lake House has a hearth in the main living room that will, on a winter solstice with twenty people in the room, produce approximately 12 kW of heat. The room volume is 380 m³. The heat pump will have brought the room to 21°C by midday; the fire takes it to 24°C by evening without any additional demand on the building's systems. This is the correct sizing approach: supplement, not replace."),
    ],
  },
  {
    _id: "journal-estoril-el-croquis",
    _type: "journalPost",
    title: "Press: Estoril in El Croquis 226",
    slug: { _type: "slug", current: "estoril-el-croquis" },
    kind: "press",
    date: "2024-08-12",
    author: "Press",
    readTime: 2,
    featured: false,
    excerpt: "A 24-page feature in this month's El Croquis.",
    content: [
      block("p1", "El Croquis 226 — available now from the publisher and from good architecture bookshops — includes a 24-page feature on the Estoril Library project. The feature includes the full set of construction drawings, a photo essay by Nuno Almendra shot across four seasons, and a conversation between Ingrid Halland and the El Croquis editorial team on the relationship between the Atlantic and the building's section."),
      block("p2", "The issue also features work by Flores & Prats, Pezo von Ellrichshausen, and Office KGDVS. It is available in both Spanish/English bilingual and English-only editions."),
      block("p3", "We are grateful to El Croquis for the care and generosity with which they documented the building. The photography session alone took three days and required waiting for specific weather conditions that Nuno had identified on a scouting visit the previous October. The results speak for themselves."),
    ],
  },
];

// ─── Main ─────────────────────────────────────────────────────────────────────

async function seed() {
  console.log(`\n🌱  Seeding Sanity dataset "${dataset}" on project "${projectId}"\n`);

  // Projects
  for (const doc of projects) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await client.createOrReplace(doc as any);
      console.log(`✅  project: ${doc.title}`);
    } catch (err) {
      console.error(`❌  project: ${doc.title}`, err);
    }
  }

  // Journal posts
  for (const doc of journalPosts) {
    try {
      await client.createOrReplace(doc);
      console.log(`✅  post:    ${doc.title}`);
    } catch (err) {
      console.error(`❌  post:    ${doc.title}`, err);
    }
  }

  console.log("\n✨  Done. Open /studio to add cover images to each entry.\n");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
