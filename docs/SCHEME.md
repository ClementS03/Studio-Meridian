# Studio Vitrine — Reusable Boilerplate Scheme

A production-ready Next.js 15 + Sanity v3 studio/portfolio starter.  
Designed for architecture, design, and creative studio websites.  
Clone → configure → deploy in under an hour.

---

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 15 (App Router) | RSC + static export, edge-ready |
| CMS | Sanity v3 (embedded Studio) | Schema-first, real-time, free tier generous |
| Styling | Tailwind v3 + CSS custom properties | Design tokens in CSS, utilities in Tailwind |
| Email | Resend | Simple API, generous free tier |
| Fonts | next/font/google | Zero layout shift, self-hosted |
| Deploy | Vercel (or any Node host) | Zero-config Next.js |

---

## File Map

```
studio-vitrine/
├── app/
│   ├── layout.tsx              # Root layout, fonts, Nav + Footer
│   ├── page.tsx                # Homepage (hero, works grid, journal teaser)
│   ├── works/
│   │   ├── page.tsx            # Works index, client-side category filter
│   │   └── [slug]/page.tsx     # Project detail (generateStaticParams)
│   ├── journal/
│   │   ├── page.tsx            # Journal index, featured + archive
│   │   └── [slug]/page.tsx     # Post detail (generateStaticParams)
│   ├── about/page.tsx          # Studio about, team, awards
│   ├── services/page.tsx       # Services detailed list
│   ├── contact/page.tsx        # Contact form (client component)
│   ├── studio/[[...tool]]/     # Embedded Sanity Studio
│   │   └── page.tsx
│   └── api/
│       ├── contact/route.ts    # POST → Resend email
│       └── projects/route.ts   # GET → Sanity projects (with category filter)
├── components/
│   ├── nav.tsx                 # Scroll-aware nav, active route
│   ├── footer.tsx              # 4-column footer + wordmark
│   ├── cta-band.tsx            # Reusable CTA section
│   ├── page-hero.tsx           # Reusable page header
│   ├── work-card.tsx           # Project card (3 variants: regular/feature/wide)
│   └── marquee-strip.tsx       # Infinite scroll marquee
├── sanity/
│   ├── client.ts               # Sanity client + image builder
│   ├── schema/
│   │   ├── index.ts            # Schema registry
│   │   ├── project.ts          # Project document type
│   │   ├── journal-post.ts     # Journal post document type
│   │   ├── person.ts           # Team member document type
│   │   └── settings.ts         # Site settings singleton
│   └── queries/
│       ├── projects.ts         # GROQ queries for projects
│       ├── journal.ts          # GROQ queries for journal posts
│       └── settings.ts         # GROQ queries for settings + people
├── lib/
│   ├── types.ts                # TypeScript interfaces for all Sanity types
│   ├── image.ts                # sanityImageUrl() helper
│   └── portable-text.tsx       # PortableText renderer with custom blocks
├── sanity.config.ts            # Sanity Studio config (structureTool + visionTool)
├── tailwind.config.ts          # Maps CSS vars to Tailwind color names
├── app/globals.css             # Complete design system (all CSS vars + component classes)
├── .env.example                # Required environment variables
└── docs/
    └── SCHEME.md               # This file
```

---

## Design System (Meridian)

All tokens live in `app/globals.css` as CSS custom properties.  
Tailwind maps them via `tailwind.config.ts` — never hardcode hex values.

### Colour Palette

```css
--bg:      #efeae0   /* Paper — main background */
--bg-2:    #e7e1d6   /* Paper dark — cards, sections */
--ink:     #1a1812   /* Near-black — headings, body */
--ink-2:   #6b6455   /* Stone — secondary text, labels */
--line:    #d4cfc5   /* Dividers */
--accent:  #a85a2b   /* Ochre — CTAs, active states, highlights */
--white:   #ffffff
--dark:    #111009   /* Hero, dark sections */
--dark-2:  #1d1b13
```

### Typography

```css
--font-serif: "Instrument Serif"    /* Display headings, editorial */
--font-sans:  "Inter Tight"         /* Body, UI, labels */
--font-mono:  "JetBrains Mono"      /* Eyebrows, metadata, tags */
```

### Key Spacing Variables

```css
--pad-x:        clamp(24px, 5vw, 80px)    /* Horizontal page padding */
--pad-section:  clamp(60px, 8vw, 120px)   /* Section vertical rhythm */
--maxw:         1440px                     /* Content max-width */
```

---

## Component Conventions

### Reusable Components

All reusable components are in `/components/` and accept typed props:

```tsx
// Page-level hero — use on every non-home page
<PageHero
  eyebrow="Services"
  title="What we are<br/>commissioned for."
  description="..."
  meta={["5 practice areas", "Partner-led"]}
/>

// Section-ending CTA
<CtaBand
  label="Section label"          // optional eyebrow
  title={<>Title with <em>italic.</em></>}
  body="Optional body text."     // optional
  cta="Button text"
  href="/contact"
/>

// Project card — automatically chooses layout from variant prop
<WorkCard project={p} variant="regular" />   // 1-col
<WorkCard project={p} variant="feature" />   // wide left
<WorkCard project={p} variant="wide" />      // full-width
```

### Static Fallbacks

Every page that fetches from Sanity has a `FALLBACK_*` constant.  
This means the site works for client demos before Sanity is configured.

Pattern:
```tsx
const data = await getSanityData().catch(() => []);
const display = data.length > 0 ? data : FALLBACK_DATA;
```

---

## Sanity Schema Summary

### `project`
Fields: `title`, `slug`, `category` (residential/civic/reuse/hospitality/pavilion/other), `year`, `location`, `area`, `status`, `recognition`, `photography`, `tagline`, `description`, `featured`, `featuredVariant` (regular/feature/wide), `sortOrder`, `coverImage` (with hotspot), `gallery[]`, `content` (PortableText)

### `journal-post`
Fields: `title`, `slug`, `kind` (essay/lecture/field-notes/project-notes/interview/research/press), `date`, `author`, `readTime`, `featured`, `excerpt`, `coverImage`, `content` (PortableText with h2/h3/blockquote)

### `person`
Fields: `name`, `role`, `bio`, `email`, `sortOrder`, `photo`

### `settings` (singleton)
Fields: `studioName`, `tagline`, `description`, `founded`, `heroTitle`, `heroSubtitle`, `stats[]`, `marqueeItems[]`, `offices[]`, `socialLinks[]`, `awards[]`, `footerTagline`, `copyrightEntity`

---

## Environment Variables

```bash
# .env.local (copy from .env.example)
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=sk...              # Viewer token for build-time fetching
RESEND_API_KEY=re_...               # For contact form emails
CONTACT_EMAIL=hello@yourstudio.com  # Where form submissions go
```

---

## Setup Checklist (new client project)

### 1. Copy the boilerplate
```bash
cp -r studio-vitrine my-client-studio
cd my-client-studio
npm install
```

### 2. Create Sanity project
1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Create new project → name it → choose "Production" dataset
3. Copy the **Project ID**
4. Go to API → Tokens → Add token → "Viewer" role → copy token

### 3. Configure environment
```bash
cp .env.example .env.local
# Fill in: NEXT_PUBLIC_SANITY_PROJECT_ID, SANITY_API_TOKEN, RESEND_API_KEY, CONTACT_EMAIL
```

### 4. Configure Resend (contact form)
1. Sign up at [resend.com](https://resend.com)
2. Create API key → paste into `RESEND_API_KEY`
3. Verify your sending domain (or use `onboarding@resend.dev` for testing)
4. Update `from` address in `app/api/contact/route.ts`

### 5. Customise identity
- `app/layout.tsx` — update `metadata.title`, `description`, `openGraph`
- `components/nav.tsx` — update studio name in LogoMark / wordmark area
- `components/footer.tsx` — update nav links, social links
- `app/globals.css` — tweak `--accent` colour if needed
- `app/page.tsx` — update hero copy, stats, marquee items

### 6. Populate Sanity
- Visit `/studio` to open the embedded CMS
- Create Settings singleton first (studio name, tagline, offices)
- Add people (partners + team)
- Add projects (with cover images and gallery)
- Add journal posts (mark up to 3 as featured)

### 7. Deploy
```bash
# Vercel (recommended)
npx vercel --prod

# Set env vars in Vercel dashboard:
# NEXT_PUBLIC_SANITY_PROJECT_ID, SANITY_API_TOKEN, RESEND_API_KEY, CONTACT_EMAIL
```

---

## Adapting for Different Studio Types

### Architecture studio (default)
No changes needed. The default content is architecture-focused.

### Interior design studio
- Rename categories in `sanity/schema/project.ts`: residential → residential/contract/hospitality
- Update services in `app/services/page.tsx`
- Update eyebrow copy across pages

### Graphic design / branding studio
- Change `featuredVariant` logic in `app/works/page.tsx` — favour `wide` for image-heavy work
- Consider adding a `client` field to the project schema
- Update journal kinds in `sanity/schema/journal-post.ts`

### Photography / art portfolio
- Remove the works filter chips (simplify `app/works/page.tsx`)
- Make the gallery section the primary content on `app/works/[slug]/page.tsx`
- Increase image quality in `lib/image.ts` to `quality = 90`

---

## Performance Notes

- All fonts self-hosted via `next/font/google` — zero external font requests
- Images: use `sanityImageUrl(image, width)` which generates optimised URLs from Sanity's CDN
- Static fallbacks mean the build never fails if Sanity is unreachable
- `generateStaticParams` pre-renders all project and post detail pages at build time
- Works index uses client-side filtering via `/api/projects` to avoid over-fetching at build time

---

## Upgrading / Extending

### Add a new page
1. Create `app/new-page/page.tsx`
2. Add to nav links in `components/nav.tsx`
3. Add to footer links in `components/footer.tsx`
4. Use `<PageHero>` at the top, `<CtaBand>` at the bottom

### Add a new Sanity document type
1. Create schema in `sanity/schema/new-type.ts`
2. Register in `sanity/schema/index.ts`
3. Add GROQ query in `sanity/queries/new-type.ts`
4. Add TypeScript interface in `lib/types.ts`

### Add a new API route
1. Create `app/api/route-name/route.ts`
2. Export named functions: `GET`, `POST`, etc.
3. Always return `NextResponse.json()`

---

*Boilerplate version: 1.0 — May 2026*  
*Stack: Next.js 15.3.2 · Sanity 3 · Tailwind 3 · TypeScript 5*
