# Studio Meridian — CLAUDE.md

Boilerplate Next.js 15 + Sanity v3 pour studios créatifs (architecture, design, photo…).
Référence complète : `docs/SCHEME.md`.

## Règles absolues

- **Ne jamais lancer le serveur de dev.** L'utilisateur le lance lui-même.
- **Pas de Co-Authored-By** dans les commits.
- **Ne jamais commit `.env.local`** — les vraies clés restent hors Git.
- Toujours vérifier `docs/SCHEME.md` avant de modifier la structure ou le design system.

## Stack

| Couche | Choix |
|--------|-------|
| Framework | Next.js 15 App Router (RSC + generateStaticParams) |
| CMS | Sanity v3 — Studio embarqué sur `/studio` |
| Styles | Tailwind v3 + CSS custom properties (tokens dans `globals.css`) |
| Email | Resend via `app/api/contact/route.ts` |
| Deploy | Vercel |

## Design system Meridian

Tokens dans `app/globals.css`. **Jamais de valeurs hex hardcodées.**

```
--bg       #efeae0  fond principal
--bg-2     #e7e1d6  cartes / sections
--ink      #1a1812  titres / corps
--ink-2    #6b6455  texte secondaire
--line     #d4cfc5  séparateurs
--accent   #a85a2b  ocre — CTAs / états actifs
--dark     #111009  hero / sections sombres
```

Fonts : `Instrument Serif` (display) · `Inter Tight` (UI) · `JetBrains Mono` (eyebrows)

## Patterns importants

### Fallbacks statiques
Chaque page Sanity a un fallback pour que le site tourne sans CMS :
```tsx
const data = await getSanityQuery().catch(() => []);
const display = data.length ? data : FALLBACK_DATA;
```

### Composants réutilisables
- `<PageHero>` — en-tête de page (toutes les pages sauf home)
- `<CtaBand>` — CTA de fin de section
- `<WorkCard variant="regular|feature|wide">` — carte projet

### Sanity
- Schémas : `sanity/schema/`
- Requêtes GROQ : `sanity/queries/`
- Helper image : `lib/image.ts → sanityImageUrl(image, width)`
- Types TypeScript : `lib/types.ts`

## Variables d'environnement requises

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
SANITY_PREVIEW_SECRET=
NEXT_PUBLIC_SITE_URL=
# Resend (formulaire contact)
RESEND_API_KEY=
CONTACT_EMAIL=
```

## Adapter pour un client

1. Changer les couleurs → modifier `--accent` dans `globals.css`
2. Changer le nom → `components/nav.tsx` + `components/footer.tsx` + `app/layout.tsx`
3. Changer les catégories projets → `sanity/schema/project.ts`
4. Configurer Sanity → `sanity.config.ts` (projectId + dataset)
5. Configurer Resend → `app/api/contact/route.ts` (adresse `from`)

## Structure clé

```
app/                    Pages + API routes
components/             Composants réutilisables
sanity/schema/          Schémas Sanity
sanity/queries/         Requêtes GROQ
lib/                    Helpers (types, image, portable-text)
docs/SCHEME.md          Documentation complète du boilerplate
.env.example            Template des variables (sans secrets)
```
