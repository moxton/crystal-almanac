import Link from "next/link";
import { getAllCrystals } from "@/app/lib/crystals";
import { MINERAL_GROUPS, getCrystalGroup } from "@/app/lib/groups";
import type { Metadata } from "next";

export function generateMetadata(): Metadata {
  const count = getAllCrystals().length;
  return {
    title: "All Crystals & Minerals A-Z",
    description: `Browse all ${count} crystals, minerals, and stones in the Crystal Almanac. Scientific profiles with formation geology, identification tips, fake-spotting guides, and cultural traditions for every stone.`,
  };
}

export default function CrystalsIndexPage() {
  const crystals = getAllCrystals();

  // Group by first letter
  const grouped: Record<string, typeof crystals> = {};
  for (const crystal of crystals) {
    const letter = crystal.name[0].toUpperCase();
    if (!grouped[letter]) grouped[letter] = [];
    grouped[letter].push(crystal);
  }

  const letters = Object.keys(grouped).sort();

  // Count crystals per mineral group for the summary
  const groupCounts = MINERAL_GROUPS.map((g) => ({
    ...g,
    count: crystals.filter((c) => getCrystalGroup(c)?.slug === g.slug).length,
  }))
    .filter((g) => g.count > 0)
    .sort((a, b) => b.count - a.count);

  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <p className="text-brand-accent text-sm uppercase tracking-[0.15em] font-body mb-4">
        Encyclopedia
      </p>
      <h1 className="font-heading text-4xl md:text-5xl text-white">
        All Crystals & Minerals <em>A-Z</em>
      </h1>
      <p className="text-brand-muted text-lg font-body mt-4 max-w-2xl leading-relaxed">
        {crystals.length} minerals, crystals, and stones with scientific profiles,
        identification guides, and formation geology.
      </p>

      {/* Letter jump nav */}
      <nav className="flex flex-wrap gap-1.5 mt-8" aria-label="Jump to letter">
        {letters.map((letter) => (
          <a
            key={letter}
            href={`#letter-${letter}`}
            className="w-9 h-9 flex items-center justify-center text-sm font-body text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-md transition-colors"
          >
            {letter}
          </a>
        ))}
      </nav>

      {/* Grouped listings */}
      <div className="mt-12 space-y-10">
        {letters.map((letter) => (
          <section key={letter} id={`letter-${letter}`}>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="font-heading text-3xl text-brand-accent">
                {letter}
              </h2>
              <div className="h-px flex-1 bg-brand-border" />
              <span className="text-brand-muted text-xs font-body">
                {grouped[letter].length}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-0.5">
              {grouped[letter].map((crystal) => (
                <Link
                  key={crystal.id}
                  href={`/crystals/${crystal.id}`}
                  className="group flex items-center gap-2.5 text-sm font-body py-2 transition-colors"
                >
                  <span
                    className="w-3 h-3 rounded-full shrink-0 border border-white/10"
                    style={{ backgroundColor: crystal.colorHexes[0] || "#A78BFA" }}
                  />
                  <span className="text-white/80 group-hover:text-white transition-colors">
                    {crystal.name}
                  </span>
                  <span className="text-brand-muted/50 text-xs ml-auto shrink-0 hidden sm:inline">
                    {crystal.hardness}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Mineral Groups Summary - for SEO and internal linking */}
      <section className="mt-16 pt-10 border-t border-brand-border">
        <h2 className="font-heading text-2xl text-white mb-2">
          Browse by Mineral Family
        </h2>
        <p className="text-brand-muted text-sm font-body mb-6 max-w-2xl">
          Every crystal belongs to a mineral group based on its chemistry and crystal structure.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {groupCounts.slice(0, 12).map((g) => (
            <Link
              key={g.slug}
              href="/groups"
              className="group bg-brand-surface border border-brand-border rounded-lg px-4 py-3 hover:border-brand-accent/40 transition-colors"
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: g.hex }} />
                <span className="font-heading text-sm text-white group-hover:text-brand-accent transition-colors truncate">
                  {g.shortName}
                </span>
              </div>
              <span className="text-brand-muted text-xs font-body">
                {g.count} stone{g.count !== 1 ? "s" : ""}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick links for crawlability */}
      <section className="mt-12 pt-10 border-t border-brand-border">
        <h2 className="font-heading text-2xl text-white mb-6">
          Reference Guides
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { href: "/hardness", title: "Mohs Hardness Scale", desc: "Every mineral mapped by scratch resistance" },
            { href: "/care", title: "Crystal Care Guide", desc: "Water safety, sunlight, toxicity, and handling" },
            { href: "/birthstones", title: "Birthstones by Month", desc: "Traditional and modern stones for every month" },
            { href: "/colors", title: "Crystals by Color", desc: "Browse 8 color families and their chromophores" },
            { href: "/collections", title: "Themed Collections", desc: "Calming, protection, love, creativity, and more" },
            { href: "/groups", title: "Mineral Groups", desc: "22 families from quartz to native elements" },
          ].map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="group bg-brand-surface border border-brand-border rounded-lg px-5 py-4 hover:border-brand-accent/40 transition-colors"
            >
              <h3 className="font-heading text-sm text-white group-hover:text-brand-accent transition-colors">
                {guide.title}
              </h3>
              <p className="text-brand-muted text-xs font-body mt-1">
                {guide.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
