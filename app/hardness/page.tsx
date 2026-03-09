import Link from "next/link";
import { getAllCrystals } from "@/app/lib/crystals";
import type { Crystal } from "@/app/lib/crystals";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mohs Hardness Scale - All Crystals Mapped",
  description:
    "Every crystal in our encyclopedia plotted on the Mohs hardness scale. See which stones scratch glass, survive daily wear, or need careful handling.",
};

const REFERENCE_POINTS = [
  { hardness: 1, label: "Talc", note: "Crumbles under fingernail" },
  { hardness: 2, label: "Gypsum", note: "Fingernail scratches it (2.5)" },
  { hardness: 3, label: "Calcite", note: "Copper coin scratches it (3.5)" },
  { hardness: 4, label: "Fluorite", note: "" },
  { hardness: 5, label: "Apatite", note: "Steel knife scratches it (5.5)" },
  { hardness: 6, label: "Orthoclase", note: "Scratches glass (5.5)" },
  { hardness: 7, label: "Quartz", note: "Scratches steel" },
  { hardness: 8, label: "Topaz", note: "" },
  { hardness: 9, label: "Corundum", note: "Ruby and sapphire" },
  { hardness: 10, label: "Diamond", note: "Scratches everything" },
];

const ZONES = [
  { min: 1, max: 2.5, label: "Display Only", color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20", desc: "Too soft for jewelry or frequent handling. Display specimens." },
  { min: 3, max: 4.5, label: "Gentle Handling", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20", desc: "Pendants and earrings okay. Avoid rings and bracelets." },
  { min: 5, max: 5.5, label: "Moderate Wear", color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20", desc: "Occasional jewelry fine. Will scratch with daily ring wear." },
  { min: 6, max: 6.5, label: "Durable", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", desc: "Suitable for most jewelry with reasonable care." },
  { min: 7, max: 10, label: "Very Durable", color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20", desc: "Excellent for all jewelry types including daily-wear rings." },
];

function getZone(hardness: number) {
  return ZONES.find((z) => hardness >= z.min && hardness <= z.max) || ZONES[ZONES.length - 1];
}

export default function HardnessPage() {
  const crystals = getAllCrystals();

  // Group crystals by hardness
  const byHardness = new Map<number, Crystal[]>();
  for (const c of crystals) {
    const h = c.hardness;
    if (!byHardness.has(h)) byHardness.set(h, []);
    byHardness.get(h)!.push(c);
  }

  // Sort hardness levels descending (10 at top)
  const hardnessLevels = Array.from(byHardness.keys()).sort((a, b) => b - a);

  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <p className="text-brand-accent text-sm uppercase tracking-[0.15em] font-body mb-4">
        Reference
      </p>
      <h1 className="font-heading text-4xl md:text-5xl text-white">
        Mohs Hardness <em>Scale</em>
      </h1>
      <p className="text-brand-muted text-lg font-body mt-4 max-w-2xl leading-relaxed">
        Every crystal, mineral, and stone mapped to the Mohs scale.
        See at a glance what scratches what, what survives daily wear, and what
        needs careful handling.
      </p>

      {/* Quick reference */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {ZONES.map((zone) => (
          <div
            key={zone.label}
            className={`${zone.bg} ${zone.border} border rounded-lg p-3`}
          >
            <span className={`text-xs font-body font-medium ${zone.color}`}>
              {zone.label}
            </span>
            <p className="text-white/60 text-xs font-body mt-1">{zone.desc}</p>
          </div>
        ))}
      </div>

      {/* The Scale */}
      <div className="mt-12 space-y-1">
        {hardnessLevels.map((hardness) => {
          const minerals = byHardness.get(hardness)!;
          const zone = getZone(hardness);
          const refPoint = REFERENCE_POINTS.find((r) => r.hardness === Math.round(hardness));

          return (
            <div
              key={hardness}
              className={`${zone.bg} ${zone.border} border rounded-lg p-4`}
            >
              <div className="flex items-start gap-4">
                {/* Hardness number */}
                <div className="w-14 shrink-0">
                  <span className={`text-2xl font-heading font-bold ${zone.color}`}>
                    {hardness}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  {/* Reference point */}
                  {refPoint && (
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-white/40 text-xs font-body uppercase tracking-wider">
                        Mohs Reference: {refPoint.label}
                      </span>
                      {refPoint.note && (
                        <>
                          <span className="text-white/20">·</span>
                          <span className="text-white/40 text-xs font-body">
                            {refPoint.note}
                          </span>
                        </>
                      )}
                    </div>
                  )}

                  {/* Crystal chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {minerals
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((crystal) => (
                        <Link
                          key={crystal.id}
                          href={`/crystals/${crystal.id}`}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-brand-bg/50 border border-brand-border rounded-full text-sm font-body text-white/80 hover:text-brand-accent hover:border-brand-accent/40 transition-all"
                        >
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{
                              backgroundColor: crystal.colorHexes[0] || "#A78BFA",
                            }}
                          />
                          {crystal.name}
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Practical scratch tests */}
      <div className="mt-16">
        <h2 className="font-heading text-2xl text-white mb-6">
          Practical Scratch Tests
        </h2>
        <div className="bg-brand-surface border border-brand-border rounded-xl p-6">
          <div className="space-y-4 text-white/80 text-sm font-body leading-relaxed">
            <p>
              The Mohs scale is relative, not linear. The jump from 9 to 10
              (corundum to diamond) represents a far greater hardness difference
              than the jump from 1 to 9 combined. A mineral at hardness 7 is
              not seven times harder than hardness 1.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="bg-brand-bg/50 rounded-lg p-4 border border-brand-border/50">
                <p className="text-white font-medium mb-2">Common test objects</p>
                <div className="space-y-1.5 text-white/70 text-sm">
                  <p>Fingernail: ~2.5</p>
                  <p>Copper coin: ~3.5</p>
                  <p>Glass plate: ~5.5</p>
                  <p>Steel knife: ~5.5</p>
                  <p>Steel file: ~6.5</p>
                  <p>Porcelain streak plate: ~7</p>
                </div>
              </div>
              <div className="bg-brand-bg/50 rounded-lg p-4 border border-brand-border/50">
                <p className="text-white font-medium mb-2">Key thresholds</p>
                <div className="space-y-1.5 text-white/70 text-sm">
                  <p>Below 3: Scratched by fingernail</p>
                  <p>Below 5.5: Scratched by a knife</p>
                  <p>Below 7: Scratched by quartz (sand)</p>
                  <p>7+: Survives contact with sand and dust</p>
                  <p>8+: Excellent for all jewelry</p>
                </div>
              </div>
            </div>
            <p className="text-white/50 text-xs mt-4">
              Why does hardness 7 matter so much? Because quartz is the most
              common mineral on Earth, and quartz dust is present in household
              dust. A stone below hardness 7 will gradually develop micro-scratches
              from normal exposure. Above 7, it stays polished.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
