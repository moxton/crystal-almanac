import Link from "next/link";
import { getGroupsWithCrystals } from "@/app/lib/groups";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse by Mineral Group - Crystal Almanac",
  description:
    "Explore crystals organized by mineral family: quartz, feldspar, garnet, tourmaline, carbonate, sulfide, and more. Understand how minerals are classified.",
};

export default function GroupsPage() {
  const groupsWithCrystals = getGroupsWithCrystals();
  const totalCrystals = groupsWithCrystals.reduce((sum, g) => sum + g.crystals.length, 0);

  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <p className="text-brand-accent text-sm uppercase tracking-[0.15em] font-body mb-4">
        Reference
      </p>
      <h1 className="font-heading text-4xl md:text-5xl text-white">
        Mineral <em>Groups</em>
      </h1>
      <p className="text-brand-muted text-lg font-body mt-4 max-w-2xl leading-relaxed">
        All {totalCrystals} minerals organized by their scientific classification.
        Every crystal belongs to a mineral family that shares fundamental chemistry
        and crystal structure.
      </p>

      {/* Why this matters */}
      <div className="mt-10 bg-brand-surface border border-brand-border rounded-xl p-6">
        <h2 className="font-heading text-xl text-white mb-3">
          Why Mineral Groups Matter
        </h2>
        <p className="text-white/80 text-sm font-body leading-relaxed">
          Minerals are classified by their chemical composition and crystal structure,
          not by color or appearance. This means a blood-red ruby and a blue sapphire
          are the same mineral (corundum), while a green emerald and a pink morganite
          are both beryl. Understanding mineral groups helps you identify unknown specimens,
          predict properties, and appreciate why certain minerals are always found together.
        </p>
      </div>

      {/* Group cards */}
      <div className="mt-12 space-y-6">
        {groupsWithCrystals.map(({ group, crystals }) => (
          <div
            key={group.slug}
            className="bg-brand-surface border border-brand-border rounded-xl overflow-hidden"
          >
            {/* Group header */}
            <div className="p-6 pb-4">
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-lg shrink-0 mt-0.5"
                  style={{ backgroundColor: group.hex + "20", border: `1px solid ${group.hex}40` }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: group.hex }}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="font-heading text-xl text-white">
                      {group.name}
                    </h2>
                    <span className="text-xs font-body text-brand-muted bg-white/5 px-2 py-0.5 rounded-full">
                      {crystals.length} {crystals.length === 1 ? "mineral" : "minerals"}
                    </span>
                  </div>
                  <p className="text-white/60 text-sm font-body mt-2 leading-relaxed">
                    {group.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Crystal list */}
            <div className="px-6 pb-5">
              <div className="flex flex-wrap gap-1.5">
                {crystals.map((crystal) => (
                  <Link
                    key={crystal.id}
                    href={`/crystals/${crystal.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-body text-white/70 hover:text-white bg-white/5 hover:bg-white/10 px-2.5 py-1.5 rounded-md transition-colors"
                  >
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: crystal.colorHexes[0] || group.hex }}
                    />
                    {crystal.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
