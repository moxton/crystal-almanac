"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import type { Crystal } from "@/app/lib/crystals";

// ── Crystal Card (used in grid) ──────────────────────────────
function CrystalCard({ crystal }: { crystal: Crystal }) {
  const gradientColors = crystal.colorHexes.slice(0, 3);
  const gradient =
    gradientColors.length >= 2
      ? `linear-gradient(135deg, ${gradientColors.join(", ")})`
      : gradientColors[0] || "#A78BFA";

  return (
    <Link href={`/crystals/${crystal.id}`} className="group block">
      <article className="bg-brand-surface border border-brand-border rounded-xl overflow-hidden hover:border-brand-accent/40 transition-all duration-300 hover:-translate-y-1">
        <div
          className="aspect-[4/3] relative overflow-hidden"
          style={{ background: gradient }}
        >
          {crystal.imageSmall && (
            <img
              src={crystal.imageSmall}
              alt={crystal.name}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/60 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3">
            <span className="text-xs font-body uppercase tracking-wider text-white/70">
              {crystal.category}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h2 className="font-heading text-lg text-white group-hover:text-brand-accent transition-colors">
            {crystal.name}
          </h2>
          <p className="text-brand-muted text-sm mt-1 font-body italic">
            {crystal.subtitle}
          </p>
          <div className="flex items-center gap-3 mt-3 text-xs text-brand-muted font-body">
            <span>Hardness {crystal.hardness}</span>
            <span className="text-brand-border">·</span>
            <span>{crystal.crystalSystem}</span>
          </div>
          <div className="flex gap-1.5 mt-3">
            {crystal.colorHexes.slice(0, 4).map((hex, i) => (
              <div
                key={i}
                className="w-4 h-4 rounded-full border border-white/10"
                style={{ backgroundColor: hex }}
              />
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}

// ── Featured crystal (larger, hero-style) ───────────────────
function FeaturedCrystal({ crystal }: { crystal: Crystal }) {
  const gradient =
    crystal.colorHexes.length >= 2
      ? `linear-gradient(135deg, ${crystal.colorHexes.slice(0, 3).join(", ")})`
      : crystal.colorHexes[0] || "#A78BFA";

  return (
    <Link href={`/crystals/${crystal.id}`} className="group block">
      <div className="relative rounded-2xl overflow-hidden" style={{ background: gradient }}>
        {crystal.imageUrl && (
          <img
            src={crystal.imageUrl}
            alt={crystal.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-bg/80 via-brand-bg/40 to-transparent" />
        <div className="relative p-8 md:p-12 min-h-[280px] flex flex-col justify-end">
          <p className="text-brand-accent text-xs uppercase tracking-[0.2em] font-body mb-2">
            Featured Crystal
          </p>
          <h2 className="font-heading text-3xl md:text-4xl text-white group-hover:text-brand-accent transition-colors">
            {crystal.name}
          </h2>
          <p className="font-heading text-lg text-white/60 italic mt-1">
            {crystal.subtitle}
          </p>
          <p className="text-white/50 text-sm font-body mt-3 max-w-md leading-relaxed line-clamp-2">
            {crystal.formation.split("\n\n")[0].substring(0, 180)}...
          </p>
          <span className="inline-flex items-center gap-1 text-brand-accent text-sm font-body mt-4 group-hover:underline">
            Read full profile →
          </span>
        </div>
      </div>
    </Link>
  );
}

// ── Popular row (horizontal scroll on mobile) ───────────────
function PopularRow({ crystals }: { crystals: Crystal[] }) {
  const popular = [
    "amethyst", "gold", "diamond", "ruby", "emerald", "moldavite",
    "labradorite", "obsidian", "turquoise", "opal", "amber", "pearl"
  ];
  const filtered = popular
    .map((id) => crystals.find((c) => c.id === id))
    .filter(Boolean) as Crystal[];

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none">
      {filtered.map((crystal) => {
        const gradient =
          crystal.colorHexes.length >= 2
            ? `linear-gradient(135deg, ${crystal.colorHexes.slice(0, 2).join(", ")})`
            : crystal.colorHexes[0] || "#A78BFA";

        return (
          <Link
            key={crystal.id}
            href={`/crystals/${crystal.id}`}
            className="group shrink-0 w-32"
          >
            <div
              className="h-24 rounded-xl relative overflow-hidden border border-brand-border group-hover:border-brand-accent/40 transition-all"
              style={{ background: gradient }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/70 to-transparent" />
            </div>
            <p className="font-heading text-sm text-white group-hover:text-brand-accent transition-colors mt-2 text-center">
              {crystal.name}
            </p>
          </Link>
        );
      })}
    </div>
  );
}

// ── Color swatches row ──────────────────────────────────────
const COLOR_SWATCHES = [
  { slug: "purple", name: "Purple", hex: "#7C3AED" },
  { slug: "blue", name: "Blue", hex: "#2563EB" },
  { slug: "green", name: "Green", hex: "#22C55E" },
  { slug: "red", name: "Red", hex: "#DC2626" },
  { slug: "pink", name: "Pink", hex: "#EC4899" },
  { slug: "yellow", name: "Yellow", hex: "#EAB308" },
  { slug: "black", name: "Black", hex: "#1C1917" },
  { slug: "white", name: "White", hex: "#F5F5F4" },
];

// ── Filters ─────────────────────────────────────────────────
const HARDNESS_RANGES = [
  { label: "Soft (1-3)", min: 1, max: 3 },
  { label: "Medium (4-5)", min: 4, max: 5 },
  { label: "Hard (6-7)", min: 6, max: 7 },
  { label: "Very Hard (8-10)", min: 8, max: 10 },
];

const COLOR_FILTERS = [
  { label: "Purple", match: ["purple", "violet", "lilac", "lavender", "amethyst", "plum", "magenta"] },
  { label: "Blue", match: ["blue", "azure", "cobalt", "indigo", "navy", "cyan", "sapphire"] },
  { label: "Green", match: ["green", "emerald", "olive", "mint", "forest", "teal", "jade"] },
  { label: "Red/Pink", match: ["red", "pink", "rose", "salmon", "crimson", "ruby", "burgundy", "raspberry"] },
  { label: "Yellow/Orange", match: ["yellow", "orange", "gold", "amber", "honey", "citrine", "golden"] },
  { label: "Black/Gray", match: ["black", "gray", "grey", "silver", "dark", "steel", "metallic"] },
  { label: "White/Clear", match: ["white", "clear", "colorless", "translucent", "milky"] },
];

// ── Main Browse Page ────────────────────────────────────────
export function BrowsePage({ crystals }: { crystals: Crystal[] }) {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [hardnessFilter, setHardnessFilter] = useState<string | null>(null);
  const [colorFilter, setColorFilter] = useState<string | null>(null);
  const [metaFilter, setMetaFilter] = useState<{ type: string; value: string } | null>(null);
  const [showFullGrid, setShowFullGrid] = useState(false);

  useEffect(() => {
    const urlSearch = searchParams.get("search");
    const chakra = searchParams.get("chakra");
    const zodiac = searchParams.get("zodiac");
    const element = searchParams.get("element");
    const browse = searchParams.get("browse");

    if (browse === "all") { setShowFullGrid(true); return; }
    if (urlSearch) { setSearch(urlSearch); setShowFullGrid(true); }
    if (chakra) { setMetaFilter({ type: "chakra", value: chakra }); setShowFullGrid(true); }
    else if (zodiac) { setMetaFilter({ type: "zodiac", value: zodiac }); setShowFullGrid(true); }
    else if (element) { setMetaFilter({ type: "element", value: element }); setShowFullGrid(true); }

    // If no params at all, reset to curated home (handles logo click)
    if (!urlSearch && !chakra && !zodiac && !element && !browse) {
      setShowFullGrid(false);
      setSearch("");
      setHardnessFilter(null);
      setColorFilter(null);
      setMetaFilter(null);
    }
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result = crystals;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.subtitle.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          c.chemicalFormula.toLowerCase().includes(q) ||
          c.crystalSystem.toLowerCase().includes(q)
      );
      // Boost: sort exact name matches to top
      result.sort((a, b) => {
        const aName = a.name.toLowerCase().startsWith(q) ? 0 : 1;
        const bName = b.name.toLowerCase().startsWith(q) ? 0 : 1;
        return aName - bName;
      });
    }
    if (hardnessFilter) {
      const range = HARDNESS_RANGES.find((r) => r.label === hardnessFilter);
      if (range) result = result.filter((c) => c.hardness >= range.min && c.hardness <= range.max);
    }
    if (colorFilter) {
      const colorDef = COLOR_FILTERS.find((f) => f.label === colorFilter);
      if (colorDef) result = result.filter((c) => c.colors.some((col) => colorDef.match.some((m) => col.toLowerCase().includes(m))));
    }
    if (metaFilter) {
      const val = metaFilter.value.toLowerCase();
      result = result.filter((c) => {
        if (metaFilter.type === "chakra") return c.metaphysical.chakra.toLowerCase().includes(val);
        if (metaFilter.type === "zodiac") return c.metaphysical.zodiac.toLowerCase().includes(val);
        if (metaFilter.type === "element") return c.metaphysical.element.toLowerCase().includes(val);
        return true;
      });
    }
    return result;
  }, [crystals, search, hardnessFilter, colorFilter, metaFilter]);

  const hasAnyFilter = search || hardnessFilter || colorFilter || metaFilter;

  function clearAll() {
    setSearch("");
    setHardnessFilter(null);
    setColorFilter(null);
    setMetaFilter(null);
    setShowFullGrid(false);
    window.history.replaceState({}, "", "/");
  }

  // Pick a "featured" crystal deterministically by day
  const dayIndex = Math.floor(Date.now() / 86400000) % crystals.length;
  const featuredCrystal = crystals[dayIndex];

  // If user has active filters or clicked "browse all," show the grid
  if (hasAnyFilter || showFullGrid) {
    return (
      <div className="min-h-screen">
        <section className="max-w-6xl mx-auto px-4 pt-8 pb-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-heading text-2xl text-white">
              Browse <em>All</em>
            </h1>
            <button
              onClick={clearAll}
              className="text-brand-accent text-sm font-body hover:underline"
            >
              ← Back to Home
            </button>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                type="text"
                placeholder="Search by name, color, or category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-brand-surface border border-brand-border rounded-lg pl-9 pr-4 py-2.5 text-white placeholder-brand-muted font-body text-base focus:outline-none focus:border-brand-accent/50 transition-colors"
              />
            </div>
            <select value={hardnessFilter || ""} onChange={(e) => setHardnessFilter(e.target.value || null)} className="bg-brand-surface border border-brand-border rounded-lg px-3 py-2.5 text-base font-body text-brand-muted focus:outline-none focus:border-brand-accent/50 appearance-none cursor-pointer">
              <option value="">All Hardnesses</option>
              {HARDNESS_RANGES.map((r) => (<option key={r.label} value={r.label}>{r.label}</option>))}
            </select>
            <select value={colorFilter || ""} onChange={(e) => setColorFilter(e.target.value || null)} className="bg-brand-surface border border-brand-border rounded-lg px-3 py-2.5 text-base font-body text-brand-muted focus:outline-none focus:border-brand-accent/50 appearance-none cursor-pointer">
              <option value="">All Colors</option>
              {COLOR_FILTERS.map((f) => (<option key={f.label} value={f.label}>{f.label}</option>))}
            </select>
          </div>
          {hasAnyFilter && (
            <div className="flex items-center gap-3 mt-3">
              <span className="text-brand-muted text-sm font-body">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
              {metaFilter && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-brand-accent/10 border border-brand-accent/30 rounded-full text-xs font-body text-brand-accent">
                  {metaFilter.type}: {metaFilter.value}
                  <button onClick={() => { setMetaFilter(null); window.history.replaceState({}, "", "/"); }} className="ml-1 hover:text-white">×</button>
                </span>
              )}
              <button onClick={clearAll} className="text-brand-accent text-sm font-body hover:underline">Clear all</button>
            </div>
          )}
        </section>
        <section className="max-w-6xl mx-auto px-4 pb-16">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((crystal) => (<CrystalCard key={crystal.id} crystal={crystal} />))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-brand-muted text-lg font-body">No crystals match your search.</p>
              <button onClick={clearAll} className="text-brand-accent mt-2 font-body hover:underline">Clear all filters</button>
            </div>
          )}
        </section>
      </div>
    );
  }

  // ── DEFAULT: Curated homepage ─────────────────────────────
  return (
    <div className="min-h-screen">
      {/* Hero - tight, with featured crystal */}
      <section className="max-w-6xl mx-auto px-4 pt-10 md:pt-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <p className="text-brand-accent text-xs uppercase tracking-[0.2em] font-body mb-2">
              Encyclopedia of {crystals.length} Crystals, Minerals & Stones
            </p>
            <h1 className="font-heading text-3xl md:text-5xl text-white leading-tight">
              Crystal <em>Almanac</em>
            </h1>
            <p className="text-brand-muted text-sm md:text-base font-body mt-2 max-w-sm md:max-w-lg">
              Where geological science meets the story behind every stone.
            </p>
          </div>
          <button
            onClick={() => setShowFullGrid(true)}
            className="text-brand-accent text-sm font-body hover:underline whitespace-nowrap self-start md:self-auto"
          >
            Browse all crystals & minerals →
          </button>
        </div>

        {/* Featured Crystal */}
        {featuredCrystal && <FeaturedCrystal crystal={featuredCrystal} />}
      </section>

      {/* Popular Crystals - horizontal scroll */}
      <section className="max-w-6xl mx-auto px-4 mt-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-xl text-white">Popular Crystals</h2>
        </div>
        <PopularRow crystals={crystals} />
      </section>

      {/* Browse by Color */}
      <section className="max-w-6xl mx-auto px-4 mt-14">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-xl text-white">Browse by Color</h2>
          <Link href="/colors" className="text-brand-accent text-sm font-body hover:underline">
            See color science →
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          {COLOR_SWATCHES.map((color) => (
            <Link
              key={color.slug}
              href={`/colors/${color.slug}`}
              className="group shrink-0 flex flex-col items-center gap-2"
            >
              <div
                className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-brand-border group-hover:border-brand-accent/60 transition-all group-hover:scale-110"
                style={{ backgroundColor: color.hex }}
              />
              <span className="text-xs font-body text-brand-muted group-hover:text-white transition-colors">
                {color.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Collections */}
      <section className="max-w-6xl mx-auto px-4 mt-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-xl text-white">Collections</h2>
          <Link href="/collections" className="text-brand-accent text-sm font-body hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { slug: "calming", name: "Calming", sub: "Stillness & ease", color: "#93C5FD" },
            { slug: "protection", name: "Protection", sub: "Shielding traditions", color: "#6B7280" },
            { slug: "love", name: "Love", sub: "Heart & relationships", color: "#EC4899" },
            { slug: "creativity", name: "Creativity", sub: "Inspiration & flow", color: "#F97316" },
            { slug: "grounding", name: "Grounding", sub: "Stability & focus", color: "#78716C" },
            { slug: "abundance", name: "Abundance", sub: "Prosperity traditions", color: "#F59E0B" },
            { slug: "communication", name: "Communication", sub: "Expression & truth", color: "#38BDF8" },
            { slug: "meditation", name: "Meditation", sub: "Focus & contemplation", color: "#A78BFA" },
          ].map((col) => (
            <Link
              key={col.slug}
              href={`/collections/${col.slug}`}
              className="group bg-brand-surface border border-brand-border rounded-xl overflow-hidden hover:border-brand-accent/40 transition-all hover:-translate-y-0.5"
            >
              <div className="h-1.5" style={{ backgroundColor: col.color }} />
              <div className="p-5">
                <h3 className="font-heading text-base text-white group-hover:text-brand-accent transition-colors">
                  {col.name}
                </h3>
                <p className="text-brand-muted text-xs font-body mt-1">
                  {col.sub}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Reference Tools */}
      <section className="max-w-6xl mx-auto px-4 mt-14">
        <h2 className="font-heading text-xl text-white mb-6">Reference Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <Link href="/birthstones" className="group bg-brand-surface border border-brand-border rounded-xl overflow-hidden hover:border-brand-accent/40 transition-all hover:-translate-y-0.5">
            <div className="h-1.5 bg-gradient-to-r from-red-500 via-emerald-500 to-blue-500" />
            <div className="p-6">
              <h3 className="font-heading text-lg text-white group-hover:text-brand-accent transition-colors">
                Birthstones by Month
              </h3>
              <p className="text-brand-muted text-sm font-body mt-2 leading-relaxed">
                Modern and traditional stones for every month. The history behind each designation, from biblical breastplates to Tiffany's lobbying.
              </p>
              <span className="text-brand-accent text-xs font-body mt-3 inline-block group-hover:underline">
                12 months →
              </span>
            </div>
          </Link>
          <Link href="/hardness" className="group bg-brand-surface border border-brand-border rounded-xl overflow-hidden hover:border-brand-accent/40 transition-all hover:-translate-y-0.5">
            <div className="h-1.5 bg-gradient-to-r from-rose-500 via-amber-500 to-cyan-500" />
            <div className="p-6">
              <h3 className="font-heading text-lg text-white group-hover:text-brand-accent transition-colors">
                Mohs Hardness Scale
              </h3>
              <p className="text-brand-muted text-sm font-body mt-2 leading-relaxed">
                Every crystal and mineral mapped by hardness. See what survives daily wear, what scratches glass, and what needs careful handling.
              </p>
              <span className="text-brand-accent text-xs font-body mt-3 inline-block group-hover:underline">
                Full scale →
              </span>
            </div>
          </Link>
          <Link href="/care" className="group bg-brand-surface border border-brand-border rounded-xl overflow-hidden hover:border-brand-accent/40 transition-all hover:-translate-y-0.5">
            <div className="h-1.5 bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500" />
            <div className="p-6">
              <h3 className="font-heading text-lg text-white group-hover:text-brand-accent transition-colors">
                Crystal Care Guide
              </h3>
              <p className="text-brand-muted text-sm font-body mt-2 leading-relaxed">
                Water safety, sunlight sensitivity, toxicity warnings, and handling notes for every stone. Based on mineral science.
              </p>
              <span className="text-brand-accent text-xs font-body mt-3 inline-block group-hover:underline">
                Full guide →
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Latest from the Blog */}
      <section className="max-w-6xl mx-auto px-4 mt-14 pb-16">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-xl text-white">From the Blog</h2>
          <Link href="/blog" className="text-brand-accent text-sm font-body hover:underline">
            All articles →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { slug: "how-to-tell-if-crystal-is-real", title: "How to Tell If Your Crystal Is Real" },
            { slug: "best-crystals-for-beginners", title: "Best Crystals for Beginners" },
            { slug: "crystals-by-color", title: "Crystals by Color: What Every Color Means" },
          ].map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-brand-surface border border-brand-border rounded-xl p-5 hover:border-brand-accent/40 transition-all"
            >
              <h3 className="font-heading text-base text-white group-hover:text-brand-accent transition-colors">
                {post.title}
              </h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
