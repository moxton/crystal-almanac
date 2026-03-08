# Crystal Almanac

The modern encyclopedia of crystals and minerals. Scientific identification, geological formation stories, fake-spotting guides, and cultural traditions for every stone.

**Live:** [crystalalmanac.com](https://crystalalmanac.com)

## Tech Stack

- Next.js 14 (App Router, SSG)
- Tailwind CSS
- Vercel hosting
- 50 statically generated crystal profiles

## Development

```bash
npm install
npm run dev
```

## Adding Crystals

Add crystal data objects to `app/data/crystals.json`. Each crystal needs an `id` field that becomes its URL slug (`/crystals/{id}`).

Run `npm run build` to regenerate static pages.
