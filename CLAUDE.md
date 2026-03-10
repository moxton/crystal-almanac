# CLAUDE.md - Crystal Almanac Project Context

## What This Is

Crystal Almanac (https://crystalalmanac.com) is an online encyclopedia of crystals, minerals, stones, and rocks. It leads with geological science (formation, identification, fake-spotting) rather than metaphysical claims, while still documenting cultural traditions. 258 profiles, 10 blog posts, 8 reference pages. The differentiator vs competitors (crystalvaults.com, energymuse.com, crystalyzeguide.com) is science-first depth: every profile has chemical formula, crystal system, hardness, localities, formation geology, and a "how to spot fakes" section.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Hosting:** Vercel (auto-deploys from GitHub `main` branch)
- **Database:** None. All data is JSON files in `app/data/`
- **Analytics:** GA4 (`G-G3CEP7FNYL`)
- **Repo:** `github.com/moxton/crystal-almanac`

## File Structure

```
app/
├── page.tsx                    # Homepage (delegates to BrowsePage)
├── layout.tsx                  # Root layout: header, footer, fonts, GA4, crystal count
├── globals.css                 # Global styles, font imports
├── sitemap.ts                  # Auto-generated sitemap from all content
├── robots.ts                   # Robots.txt
├── not-found.tsx               # 404 page
├── components/
│   ├── BrowsePage.tsx          # Main homepage + browse/search/filter UI (client component)
│   └── GuidesDropdown.tsx      # Header nav dropdown for reference pages
├── data/
│   ├── crystals.json           # ALL crystal profiles (258 entries, ~20k lines)
│   ├── blog-index.json         # Blog post metadata (slug, file, title, date)
│   └── blog/                   # Markdown files for blog posts
│       ├── blog-01-how-to-tell-if-crystal-is-real.md
│       └── ...
├── lib/
│   ├── crystals.ts             # Crystal type interface + query functions
│   ├── blog.ts                 # Blog type interface + query functions
│   ├── collections.ts          # 8 themed collections (calming, protection, love, etc.)
│   ├── colors.ts               # 8 color families for browse-by-color
│   └── groups.ts               # 22 mineral groups for browse-by-family
├── crystals/[id]/page.tsx      # Crystal detail page (SSG)
├── blog/
│   ├── page.tsx                # Blog index
│   └── [slug]/page.tsx         # Blog post page (renders markdown)
├── collections/
│   ├── page.tsx                # Collections index
│   └── [slug]/page.tsx         # Collection detail
├── colors/
│   ├── page.tsx                # Color families index
│   └── [slug]/page.tsx         # Color family detail
├── groups/page.tsx             # Mineral groups page
├── birthstones/page.tsx        # Birthstone reference
├── hardness/page.tsx           # Mohs scale reference
├── care/page.tsx               # Crystal care guide (water/sun/toxic safety)
├── about/page.tsx
├── contact/page.tsx
├── privacy/page.tsx
└── terms/page.tsx
scripts/
└── fetch-unsplash-images.js    # Unsplash API image finder (resumes, rate-limit aware)
tailwind.config.ts              # Design tokens: colors, fonts
```

## Data Model

### Crystal (app/lib/crystals.ts)

```typescript
interface Crystal {
  id: string;              // URL slug, e.g. "rose-quartz"
  name: string;            // Display name, e.g. "Rose Quartz"
  subtitle: string;        // e.g. "The Stone of Unconditional Love"
  category: string;        // Mineral classification, e.g. "Quartz Family"
  colors: string[];        // Human-readable color names
  colorHexes: string[];    // Matching hex codes for UI gradients
  hardness: number;        // Mohs scale (1-10, can be decimal like 6.5)
  chemicalFormula: string; // e.g. "SiO₂" (use Unicode subscripts)
  crystalSystem: string;   // Triclinic|Monoclinic|Orthorhombic|Tetragonal|Trigonal|Hexagonal|Isometric|Amorphous
  luster: string;          // e.g. "Vitreous to Waxy"
  streak: string;          // e.g. "White"
  transparency: string;    // e.g. "Translucent to Opaque"
  specificGravity: string; // e.g. "2.65" or "2.58-2.64"
  localities: Locality[];  // 3-5 entries, most important first
  formation: string;       // 2-3 paragraphs, real geology. Separate paragraphs with \n\n
  identification: string;  // How to ID in hand. Include "distinguish from" comparisons
  howToSpotFakes: string;  // Practical fake-spotting. Be specific.
  metaphysical: {
    chakra: string;        // e.g. "Heart" or "Root, Crown"
    zodiac: string;        // e.g. "Scorpio, Sagittarius"
    element: string;       // e.g. "Earth, Fire"
    traditions: string;    // Cultural/historical traditions, not personal claims
  };
  relatedMinerals: RelatedMineral[];  // 3 entries with name, relation, color hex
  priceRange: string;      // Format: "$X-Y low · $X-Y mid · $X-Y high"
  seoDescription: string;  // ~150 chars for meta description
}
```

### Blog Post (app/lib/blog.ts)

```typescript
interface BlogPost {
  slug: string;            // URL slug
  file: string;            // Filename in app/data/blog/
  title: string;
  description: string;     // First ~150 chars for meta
  publishDate: string;     // ISO date "2026-03-08"
}
```
Blog content is markdown in `app/data/blog/`. The index is `app/data/blog-index.json`.

## How to Add Content

### Adding a crystal profile:

1. Add the entry to `app/data/crystals.json` (append to the array)
2. Ensure all 21 fields are present (copy structure from any existing entry)
3. Add care notes in `app/care/page.tsx` if the mineral is toxic, water-sensitive, light-sensitive, or fragile
4. Add to a collection in `app/lib/collections.ts` if it fits (add both to `crystalIds` array AND `reasons` object)
5. Verify the mineral matches a group in `app/lib/groups.ts` (check `matchPatterns` and `matchIds`)
6. Verify: `npx tsc --noEmit` then `npm run build`

### Adding a blog post:

1. Write markdown file in `app/data/blog/` named `blog-NN-slug.md`
2. Add entry to `app/data/blog-index.json` with slug, file, title, description, publishDate
3. Posts with future dates are auto-hidden until that date

## Design System

### Fonts
- **Headings:** Playfair Display (serif) → `className="font-heading"`
- **Body:** Plus Jakarta Sans (sans-serif) → `className="font-body"`

### Colors
```
brand-bg:          #07070c    (page background, near-black)
brand-surface:     #0f0f17    (card/panel background)
brand-border:      #1a1a2e    (borders, dividers)
brand-accent:      #A78BFA    (purple accent, links, highlights)
brand-accent-dark: #7C3AED    (darker purple for hover states)
brand-muted:       #8b8b9e    (secondary text)
text-white:        #ffffff    (primary text)
```

### Layout
- Max content width: `max-w-6xl` (1152px) for browse pages, `max-w-5xl` (1024px) for reference pages
- Page padding: `px-4 py-20` for reference pages
- Section spacing: `mt-12` to `mt-14` between major sections
- Card style: `bg-brand-surface border border-brand-border rounded-xl`

### Page pattern
```tsx
<div className="max-w-5xl mx-auto px-4 py-20">
  <p className="text-brand-accent text-sm uppercase tracking-[0.15em] font-body mb-4">
    Section Label
  </p>
  <h1 className="font-heading text-4xl md:text-5xl text-white">
    Page <em>Title</em>
  </h1>
  <p className="text-brand-muted text-lg font-body mt-4 max-w-2xl leading-relaxed">
    Description text.
  </p>
</div>
```

## Writing Rules

- **Voice:** Knowledgeable friend, not textbook. Like a geologist at a dinner party.
- **Science first:** Lead with formation, chemistry, identification. Metaphysical traditions go in their own section.
- **No em dashes.** Use periods, commas, or single hyphens instead.
- **No hedging language:** Don't write "it is believed that" or "some say." State traditions directly as traditions.
- **Subtitles:** Short, evocative. "The Volcanic Glass" not "A Type of Natural Glass Formed by Volcanic Activity."
- **Formation sections:** Real geology with specific temperatures, pressures, chemical processes. 2-3 paragraphs.
- **Fake-spotting:** Be specific and practical. "Check for bubbles under 10x magnification" not "be careful of fakes."
- **Price ranges:** Three tiers separated by ` · ` (space-dot-space).
- **Chemical formulas:** Use Unicode subscripts (₂ ₃ ₄) not markdown.
- **Metaphysical section disclaimer pattern:** Present traditions as cultural facts, not personal endorsements.
- **Toxic minerals:** Always include safety warnings in both the profile and care page.

## Deployment

```bash
git add -A
git commit -m "description"
git push origin main --force
```
Vercel auto-deploys from `main`. No build step needed locally (but `npm run build` to verify). DNS is on Vercel. Domain: crystalalmanac.com.

## Current State (v1.6)

- **258** crystal/mineral/rock profiles
- **10** blog posts (guides + VS comparisons)
- **8** themed collections (calming, protection, love, creativity, grounding, abundance, communication, meditation)
- **8** color families
- **22** mineral groups
- **Complete Mohs scale** (talc through diamond)
- Reference pages: birthstones, hardness, care, mineral groups
- Crystal count auto-updates in homepage hero + footer from `crystals.json` length

## Roadmap

1. 10 more VS comparison blog posts (citrine vs topaz, ruby vs garnet, etc.)
2. Unsplash images integrated into crystal profiles
3. More collection pages
4. Crystal identification quiz / interactive tool
5. "What crystal is this?" visual ID guide
6. Expand to 300+ profiles

## Things NOT to Do

- **Don't add a database.** The JSON file approach is intentional. It's fast, version-controlled, and simple.
- **Don't add a CMS.** Content is managed via JSON and markdown in the repo.
- **Don't install UI libraries** (no Material UI, Chakra, etc.). Tailwind only.
- **Don't add authentication or user accounts.**
- **Don't create individual pages for mineral groups.** The `/groups` page is a single index by design.
- **Don't change the font pairing** (Playfair Display + Plus Jakarta Sans).
- **Don't use em dashes** in any content. Ever.
- **Don't write metaphysical content as medical or healing claims.** Always frame as cultural traditions.
- **Don't hardcode crystal counts anywhere.** Use `getAllCrystals().length` dynamically.
- **Don't modify `crystals.json` formatting.** Keep 2-space indented JSON, UTF-8 with Unicode subscripts.
