import Link from "next/link";
import { getAllCrystals } from "@/app/lib/crystals";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Crystals & Minerals A-Z",
  description:
    "Browse all 250+ crystals, minerals, and stones in the Crystal Almanac. Scientific profiles with formation geology, identification tips, fake-spotting guides, and more.",
};

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

  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <p className="text-brand-accent text-sm uppercase tracking-[0.15em] font-body mb-4">
        Encyclopedia
      </p>
      <h1 className="font-heading text-4xl md:text-5xl text-white">
        All Crystals <em>A-Z</em>
      </h1>
      <p className="text-brand-muted text-lg font-body mt-4 max-w-2xl leading-relaxed">
        {crystals.length} minerals, crystals, and stones with scientific profiles,
        identification guides, and formation geology.
      </p>

      {/* Letter jump nav */}
      <div className="flex flex-wrap gap-1.5 mt-8">
        {letters.map((letter) => (
          <a
            key={letter}
            href={`#letter-${letter}`}
            className="w-9 h-9 flex items-center justify-center text-sm font-body text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-md transition-colors"
          >
            {letter}
          </a>
        ))}
      </div>

      {/* Grouped listings */}
      <div className="mt-12 space-y-10">
        {letters.map((letter) => (
          <div key={letter} id={`letter-${letter}`}>
            <h2 className="font-heading text-2xl text-white border-b border-brand-border pb-2 mb-4">
              {letter}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-1.5">
              {grouped[letter].map((crystal) => (
                <Link
                  key={crystal.id}
                  href={`/crystals/${crystal.id}`}
                  className="flex items-center gap-2 text-sm font-body text-white/70 hover:text-white py-1.5 transition-colors"
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: crystal.colorHexes[0] || "#A78BFA" }}
                  />
                  {crystal.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
