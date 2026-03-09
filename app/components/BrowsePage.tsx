"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import type { Crystal } from "@/app/lib/crystals";

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

export function BrowsePage({ crystals }: { crystals: Crystal[] }) {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [hardnessFilter, setHardnessFilter] = useState<string | null>(null);
  const [colorFilter, setColorFilter] = useState<string | null>(null);
  const [metaFilter, setMetaFilter] = useState<{type: string; value: string} | null>(null);

  // Read URL params for filters from crystal detail page links
  useEffect(() => {
    const urlSearch = searchParams.get("search");
    const chakra = searchParams.get("chakra");
    const zodiac = searchParams.get("zodiac");
    const element = searchParams.get("element");

    if (urlSearch) setSearch(urlSearch);
    if (chakra) setMetaFilter({ type: "chakra", value: chakra });
    else if (zodiac) setMetaFilter({ type: "zodiac", value: zodiac });
    else if (element) setMetaFilter({ type: "element", value: element });
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
          c.colors.some((col) => col.toLowerCase().includes(q))
      );
    }

    if (hardnessFilter) {
      const range = HARDNESS_RANGES.find((r) => r.label === hardnessFilter);
      if (range) {
        result = result.filter(
          (c) => c.hardness >= range.min && c.hardness <= range.max
        );
      }
    }

    if (colorFilter) {
      const colorDef = COLOR_FILTERS.find((f) => f.label === colorFilter);
      if (colorDef) {
        result = result.filter((c) =>
          c.colors.some((col) =>
            colorDef.match.some((m) => col.toLowerCase().includes(m))
          )
        );
      }
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
    // Clear URL params
    window.history.replaceState({}, "", "/");
  }

  return (
    <div className="min-h-screen">
      {/* Hero - tighter, cards peek into view */}
      <section className="relative pt-12 pb-6 md:pt-16 md:pb-8">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-accent/5 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 relative">
          <p className="text-brand-accent text-xs uppercase tracking-[0.2em] font-body mb-3">
            Encyclopedia of Crystals & Minerals
          </p>
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl text-white leading-tight">
            Crystal <em>Almanac</em>
          </h1>
          <p className="text-brand-muted text-base md:text-lg mt-3 max-w-xl font-body leading-relaxed">
            Scientific identification, formation stories, fake-spotting guides, and cultural traditions for every stone.
          </p>
          <p className="text-brand-muted/50 text-xs mt-2 font-body">
            {crystals.length} crystals and minerals documented
          </p>
        </div>
      </section>

      {/* Search & Filters - compact */}
      <section className="max-w-6xl mx-auto px-4 pb-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search by name, color, or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-brand-surface border border-brand-border rounded-lg pl-9 pr-4 py-2.5 text-white placeholder-brand-muted font-body text-base focus:outline-none focus:border-brand-accent/50 transition-colors"
            />
          </div>

          <select
            value={hardnessFilter || ""}
            onChange={(e) => setHardnessFilter(e.target.value || null)}
            className="bg-brand-surface border border-brand-border rounded-lg px-3 py-2.5 text-base font-body text-brand-muted focus:outline-none focus:border-brand-accent/50 appearance-none cursor-pointer"
          >
            <option value="">All Hardnesses</option>
            {HARDNESS_RANGES.map((r) => (
              <option key={r.label} value={r.label}>{r.label}</option>
            ))}
          </select>

          <select
            value={colorFilter || ""}
            onChange={(e) => setColorFilter(e.target.value || null)}
            className="bg-brand-surface border border-brand-border rounded-lg px-3 py-2.5 text-base font-body text-brand-muted focus:outline-none focus:border-brand-accent/50 appearance-none cursor-pointer"
          >
            <option value="">All Colors</option>
            {COLOR_FILTERS.map((f) => (
              <option key={f.label} value={f.label}>{f.label}</option>
            ))}
          </select>
        </div>

        {hasAnyFilter && (
          <div className="flex items-center gap-3 mt-3">
            <span className="text-brand-muted text-sm font-body">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </span>
            {metaFilter && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-brand-accent/10 border border-brand-accent/30 rounded-full text-xs font-body text-brand-accent">
                {metaFilter.type}: {metaFilter.value}
                <button onClick={() => { setMetaFilter(null); window.history.replaceState({}, "", "/"); }} className="ml-1 hover:text-white">×</button>
              </span>
            )}
            <button
              onClick={clearAll}
              className="text-brand-accent text-sm font-body hover:underline"
            >
              Clear all
            </button>
          </div>
        )}
      </section>

      {/* Crystal Grid */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((crystal) => (
              <CrystalCard key={crystal.id} crystal={crystal} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-brand-muted text-lg font-body">
              No crystals match your search.
            </p>
            <button
              onClick={clearAll}
              className="text-brand-accent mt-2 font-body hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
