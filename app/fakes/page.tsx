import Link from "next/link";
import { getAllCrystals, getCrystalById } from "@/app/lib/crystals";
import type { Metadata } from "next";

export function generateMetadata(): Metadata {
  const count = getAllCrystals().length;
  return {
    title: "How to Spot Fake Crystals - Complete Guide",
    description: `How to tell if a crystal is real or fake. Covers the most commonly faked minerals with specific tests, red flags, and what to look for before buying. Reference for ${count} crystals.`,
  };
}

interface FakedMineral {
  id: string;
  name: string;
  problem: string;
  tests: string[];
  redFlags: string[];
  severity: "extreme" | "high" | "moderate";
}

const MOST_FAKED: FakedMineral[] = [
  {
    id: "turquoise",
    name: "Turquoise",
    problem: "The most faked gemstone in the world. An estimated 90% of turquoise on the market is dyed howlite, dyed magnesite, or reconstituted turquoise powder pressed into blocks.",
    tests: [
      "Scratch an inconspicuous spot with a needle. Dyed howlite shows white underneath. Real turquoise is colored throughout.",
      "Check hardness. Real turquoise is 5-6. Howlite is only 3.5 and scratches much more easily.",
      "Under magnification, dye concentrates in surface cracks and pits, creating a spiderweb of darker color.",
      "Rub with acetone on a cotton swab. Dye will transfer to the swab. Stabilized turquoise will not.",
    ],
    redFlags: [
      "Perfectly uniform bright blue color with no natural variation",
      "Extremely low price for the size",
      "Labeled 'turquenite' or 'African turquoise' (these are not turquoise at all)",
      "Sold at tourist shops in the American Southwest at suspiciously low prices",
    ],
    severity: "extreme",
  },
  {
    id: "moldavite",
    name: "Moldavite",
    problem: "Prices skyrocketed after social media trends. Green glass fakes flooded the market. Real moldavite comes only from the Czech Republic and formed from a meteorite impact 15 million years ago.",
    tests: [
      "Real moldavite has a distinctive texture: pitted, sculpted surface with thin edges and bubble-like inclusions (lechatelierite).",
      "Under 10x magnification, real moldavite has flowing, swirling internal structures and elongated bubbles. Fake glass has round, perfectly spherical bubbles.",
      "Hold it up to strong light. Real moldavite has an olive to forest green color with internal variation. Fakes are often too uniformly green.",
      "Genuine moldavite is lighter than you would expect. It feels almost hollow compared to solid glass.",
    ],
    redFlags: [
      "Smooth, rounded shapes without natural pitting or sculpting",
      "Price under $15-20 per gram (genuine is $15-40+ per gram depending on quality)",
      "Perfectly clear with no inclusions",
      "Bright, saturated green rather than olive-brown-green",
      "Sold from China or Southeast Asia with no provenance",
    ],
    severity: "extreme",
  },
  {
    id: "citrine",
    name: "Citrine",
    problem: "Most 'citrine' sold today is heat-treated amethyst. Natural citrine is pale yellow and relatively uncommon. The burnt orange points sold everywhere are baked amethyst, which is not inherently wrong but should be disclosed.",
    tests: [
      "Natural citrine is pale smoky yellow to honey gold. It does not have the deep orange or burnt sienna color of heated amethyst.",
      "Heat-treated amethyst citrine often has white or opaque bases with colored tips. Natural citrine is usually evenly colored.",
      "Natural citrine rarely forms the dramatic cluster points that heat-treated amethyst does.",
      "If the price is very low for a large bright orange cluster, it is almost certainly heated amethyst.",
    ],
    redFlags: [
      "Deep orange to burnt red color (natural citrine is never this saturated)",
      "White base with colored points (classic sign of heated amethyst)",
      "Large clusters at low prices",
      "Sold as 'Congo citrine' or 'Madeira citrine' without disclosure of treatment",
    ],
    severity: "high",
  },
  {
    id: "malachite",
    name: "Malachite",
    problem: "Reconstituted malachite (ground up and resinned), plastic imitations, and dyed materials are common. Real malachite has distinctive banding that is difficult to fake convincingly.",
    tests: [
      "Under magnification, real malachite banding is organic and irregular, never perfectly uniform or repeating.",
      "Real malachite is cold to the touch and heavy (specific gravity ~3.9). Plastic is warm and light.",
      "Apply a drop of dilute hydrochloric acid to an inconspicuous spot. Real malachite fizzes (copper carbonate). Plastic does not.",
      "Hardness test: real malachite is 3.5-4. A steel knife scratches it, but it should not scratch as easily as plastic.",
    ],
    redFlags: [
      "Perfectly symmetrical banding patterns that repeat exactly",
      "Uniform bright green with no natural variation",
      "Very lightweight for its size",
      "Smells like plastic when warmed by rubbing",
    ],
    severity: "high",
  },
  {
    id: "lapis-lazuli",
    name: "Lapis Lazuli",
    problem: "Dyed howlite and dyed jasper are commonly sold as lapis. Low-grade lapis is also dyed to enhance color. Real lapis is a rock (not a single mineral) composed of lazurite, calcite, and pyrite.",
    tests: [
      "Real lapis with pyrite shows gold metallic specks that are randomly distributed. Fake 'pyrite' specks are often too uniform or glittery.",
      "The acetone test: rub with acetone on cotton. Dyed specimens will transfer blue dye to the swab.",
      "Check for calcite veining. Real lapis often has white calcite streaks. Dyed howlite has grey veining in a different pattern.",
      "Scratch test: lapis is 5-5.5. Howlite is only 3.5.",
    ],
    redFlags: [
      "Perfectly uniform deep blue with no calcite or pyrite",
      "Extremely low price (real high-grade lapis from Afghanistan is not cheap)",
      "Dye visible in cracks under magnification",
      "Sold as 'lapis' without specifying lazuli (some sellers use 'lapis' for dyed materials)",
    ],
    severity: "high",
  },
  {
    id: "amethyst",
    name: "Amethyst",
    problem: "Synthetic amethyst grown in labs is chemically identical to natural amethyst and very difficult to distinguish without gemological equipment. Glass imitations are easier to spot. Some 'amethyst' is actually dyed quartz.",
    tests: [
      "Glass imitations have round bubbles inside (visible under 10x). Natural amethyst may have inclusions but not round bubbles.",
      "Natural amethyst has color zoning: bands of darker and lighter purple following crystal faces. Synthetic often has more uniform color.",
      "Check for the 'Brazil law twinning' under polarized light. This is a gemological lab test that distinguishes natural from synthetic.",
      "Temperature: real quartz feels cool to the touch. Glass warms up faster.",
    ],
    redFlags: [
      "Flawless deep purple at a low price (very clean deep amethyst is relatively valuable)",
      "Perfectly even color with no zoning whatsoever",
      "Round bubbles visible under magnification (glass)",
      "Too-good-to-be-true large crystals at bargain prices",
    ],
    severity: "moderate",
  },
  {
    id: "rose-quartz",
    name: "Rose Quartz",
    problem: "Pink glass and dyed quartz are sold as rose quartz. Some 'rose quartz' is actually dyed quartzite or glass slag. The pink in natural rose quartz comes from microscopic fibers of a mineral called dumortierite.",
    tests: [
      "Natural rose quartz is almost always translucent to milky, never perfectly transparent (gem-quality transparent rose quartz is extremely rare and expensive).",
      "The color should be evenly distributed throughout, not concentrated on the surface or in cracks.",
      "Hardness test: real quartz is 7, glass is 5.5. Rose quartz will scratch glass.",
      "Under magnification, natural rose quartz may show tiny needle-like inclusions (the dumortierite fibers that cause the color).",
    ],
    redFlags: [
      "Perfectly clear pink with no translucency or milkiness",
      "Color concentrated in surface cracks (dyed)",
      "Does not scratch glass (glass imitation)",
      "Bright hot pink rather than soft pastel pink",
    ],
    severity: "moderate",
  },
  {
    id: "opal",
    name: "Opal",
    problem: "Synthetic opals, assembled opals (doublets and triplets), and glass imitations are widespread. Synthetic opal has been manufactured since the 1970s and can be very convincing.",
    tests: [
      "Under magnification, synthetic opal has a lizard-skin or snake-scale pattern to its color play. Natural opal has more random, organic color patches.",
      "Doublets and triplets have a visible seam line when viewed from the side. The opal layer is glued onto a dark backing.",
      "Natural opal play-of-color shifts as you rotate it. Glass imitations often have a fixed sparkle pattern.",
      "Check the back. If it is flat black plastic or obsidian, it is likely a doublet or triplet, not a solid opal.",
    ],
    redFlags: [
      "Perfect rainbow play-of-color at a very low price",
      "Columnar or grid-like pattern to the color play (synthetic)",
      "Dark backing visible from the side (doublet/triplet)",
      "Sold as 'opalite' (this is glass, not opal)",
    ],
    severity: "high",
  },
  {
    id: "jade",
    name: "Jade (Jadeite and Nephrite)",
    problem: "One of the most treated and imitated gemstones. Jade is classified as Type A (untreated), Type B (bleached and polymer-impregnated), or Type C (dyed). Many materials sold as jade are not jade at all.",
    tests: [
      "The sound test: real jade rings with a clear, musical tone when tapped. Imitations produce a dull thud.",
      "Real jade is extremely tough (not hard, tough). It resists breaking. It does not chip or fracture easily.",
      "Specific gravity: jadeite is 3.3-3.5, nephrite is 2.9-3.1. Both are noticeably heavier than common imitations like serpentine (2.6).",
      "Under magnification, Type B jade shows a dimpled surface texture where the polymer has degraded. Type C shows dye concentrated in grain boundaries.",
    ],
    redFlags: [
      "Labeled 'new jade' (serpentine), 'Australian jade' (chrysoprase), 'Indian jade' (aventurine), or 'Malaysian jade' (dyed quartz). None of these are jade.",
      "Extremely uniform, intense green at a low price (high-quality jadeite can cost more per carat than diamond)",
      "Light weight for its size (likely an imitation material)",
      "Visible dye in cracks when examined under magnification",
    ],
    severity: "extreme",
  },
  {
    id: "larimar",
    name: "Larimar",
    problem: "Found only in the Dominican Republic, larimar's limited supply creates incentive for fakes. Dyed quartz, dyed marble, and even colored resin are sold as larimar.",
    tests: [
      "Real larimar has a distinctive volcanic pectolite texture with white streaks and veining through blue. The pattern is unique and organic.",
      "Hardness: real larimar is 4.5-5. Test against a steel knife (5.5) to confirm.",
      "Under magnification, natural larimar shows fibrous crystal structure. Dyed material shows dye concentrated in cracks.",
      "Real larimar can range from white to deep blue. Uniformly saturated pieces without any white are suspicious.",
    ],
    redFlags: [
      "Perfectly uniform blue with no white veining or patterns",
      "Extremely cheap for the size (genuine larimar is moderately expensive)",
      "Sold outside of established mineral dealers without provenance",
      "Plastic or resin feel, lighter than expected",
    ],
    severity: "moderate",
  },
];

const TREATMENT_TYPES = [
  {
    name: "Heat Treatment",
    description: "Heating stones to change color. Extremely common and generally accepted in the gem trade. Amethyst is heated to produce citrine. Tanzanite is almost always heated from brown to blue-violet. Blue topaz gets its color from irradiation followed by heat.",
    minerals: "Citrine (from amethyst), tanzanite, blue topaz, aquamarine, ruby, sapphire, blue zircon",
    disclosure: "Should be disclosed but often is not. Ask directly.",
  },
  {
    name: "Dyeing",
    description: "Applying dye to change or enhance color. Common with porous stones. Ranges from acceptable (agate dyeing has centuries of tradition) to deceptive (dyeing howlite to sell as turquoise).",
    minerals: "Howlite (as turquoise), agate, crackle quartz, jade, lapis lazuli, coral",
    disclosure: "Should always be disclosed. The acetone swab test catches most dyed stones.",
  },
  {
    name: "Stabilization",
    description: "Filling porous stones with resin or epoxy to improve durability and color. Common with turquoise, which is naturally soft and chalky in lower grades. Stabilization is widely accepted.",
    minerals: "Turquoise, opal (in doublets/triplets), emerald (oiling/resining fractures)",
    disclosure: "Accepted practice for turquoise. Emerald oiling is traditional but heavy resining should be disclosed.",
  },
  {
    name: "Coating",
    description: "Applying a thin surface layer to change appearance. Includes titanium coating (aura quartz), wax coating, and optical coatings. Aura quartz is natural quartz bonded with vaporized titanium or other metals.",
    minerals: "Aura quartz (angel aura, aqua aura), mystic topaz, some druzy specimens",
    disclosure: "Aura quartz is marketed as such. Other coatings should be disclosed.",
  },
  {
    name: "Reconstitution",
    description: "Grinding up genuine mineral material and pressing it into blocks with resin. The material is technically real but the specimen is manufactured. Common with turquoise, malachite, and amber (pressed amber).",
    minerals: "Turquoise, malachite, amber, coral, lapis lazuli",
    disclosure: "Should always be disclosed. Reconstituted material is worth significantly less than natural.",
  },
  {
    name: "Lab-Grown / Synthetic",
    description: "Created in a laboratory with the same chemical composition and crystal structure as the natural mineral. Chemically identical, physically identical, but not formed in nature. Not inherently deceptive if disclosed.",
    minerals: "Quartz (amethyst, citrine), ruby, sapphire, emerald, diamond, opal, alexandrite",
    disclosure: "Must be disclosed. Lab-grown gems are legitimate products but should never be sold as natural.",
  },
];

const UNIVERSAL_TIPS = [
  "If it seems too good to be true, it is. A flawless ruby the size of your thumb for $20 is not real.",
  "Buy from sellers who provide return policies and answer questions about sourcing and treatments.",
  "Learn one mineral well before trying to master them all. Deep knowledge of quartz varieties will teach you more than superficial knowledge of fifty stones.",
  "Always carry a 10x loupe. Most fakes are obvious under magnification.",
  "Ask where the specimen was mined. Reputable dealers know their supply chains.",
  "Check prices across multiple sellers. If one price is dramatically lower than all others, ask why.",
  "Be especially cautious at tourist destinations, airport shops, and social media sellers with no reviews.",
  "Natural stones are not perfect. Flaws, inclusions, and color variation are signs of authenticity.",
];

export default function FakesPage() {
  const count = getAllCrystals().length;

  const severityColors = {
    extreme: { bg: "bg-red-500/15", border: "border-red-500/20", text: "text-red-400", label: "Extremely Faked" },
    high: { bg: "bg-amber-500/10", border: "border-amber-500/20", text: "text-amber-400", label: "Commonly Faked" },
    moderate: { bg: "bg-yellow-500/10", border: "border-yellow-500/20", text: "text-yellow-400", label: "Sometimes Faked" },
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <p className="text-brand-accent text-sm uppercase tracking-[0.15em] font-body mb-4">
        Reference
      </p>
      <h1 className="font-heading text-4xl md:text-5xl text-white">
        How to Spot <em>Fake Crystals</em>
      </h1>
      <p className="text-brand-muted text-lg font-body mt-4 max-w-2xl leading-relaxed">
        The complete guide to identifying fake, dyed, treated, and
        lab-created crystals. Specific tests for the most commonly faked
        minerals, plus universal red flags every buyer should know.
      </p>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        <div className="bg-red-500/15 border border-red-500/20 rounded-xl p-5">
          <h3 className="text-red-400 font-body font-medium text-sm mb-2">
            Extremely Faked
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {MOST_FAKED.filter((m) => m.severity === "extreme").map((m, i, arr) => (
              <Link
                key={m.id}
                href={`#${m.id}`}
                className="text-xs font-body text-white/70 hover:text-red-400 transition-colors"
              >
                {m.name}{i < arr.length - 1 ? "," : ""}
              </Link>
            ))}
          </div>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-5">
          <h3 className="text-amber-400 font-body font-medium text-sm mb-2">
            Commonly Faked
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {MOST_FAKED.filter((m) => m.severity === "high").map((m, i, arr) => (
              <Link
                key={m.id}
                href={`#${m.id}`}
                className="text-xs font-body text-white/70 hover:text-amber-400 transition-colors"
              >
                {m.name}{i < arr.length - 1 ? "," : ""}
              </Link>
            ))}
          </div>
        </div>
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-5">
          <h3 className="text-yellow-400 font-body font-medium text-sm mb-2">
            Sometimes Faked
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {MOST_FAKED.filter((m) => m.severity === "moderate").map((m, i, arr) => (
              <Link
                key={m.id}
                href={`#${m.id}`}
                className="text-xs font-body text-white/70 hover:text-yellow-400 transition-colors"
              >
                {m.name}{i < arr.length - 1 ? "," : ""}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Universal Red Flags */}
      <div className="mt-12 bg-brand-surface border border-brand-border rounded-xl p-6">
        <h2 className="font-heading text-xl text-white mb-4">
          Universal Red Flags
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {UNIVERSAL_TIPS.map((tip, i) => (
            <div
              key={i}
              className="bg-brand-bg/50 border border-brand-border/50 rounded-lg px-4 py-3"
            >
              <p className="text-white/70 text-sm font-body leading-relaxed">
                {tip}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Mineral-by-Mineral Guide */}
      <div className="mt-14">
        <h2 className="font-heading text-2xl md:text-3xl text-white mb-6">
          Mineral-by-Mineral <em>Guide</em>
        </h2>
        <div className="space-y-6">
          {MOST_FAKED.map((mineral) => {
            const colors = severityColors[mineral.severity];
            const crystalData = getCrystalById(mineral.id);
            return (
              <div
                key={mineral.id}
                id={mineral.id}
                className="bg-brand-surface border border-brand-border rounded-xl overflow-hidden"
              >
                <div
                  className="h-1"
                  style={{
                    backgroundColor: crystalData?.colorHexes[0] || "#A78BFA",
                  }}
                />
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div className="flex items-center gap-3">
                      <span
                        className="w-4 h-4 rounded-full shrink-0"
                        style={{
                          backgroundColor:
                            crystalData?.colorHexes[0] || "#A78BFA",
                        }}
                      />
                      <h3 className="font-heading text-xl text-white">
                        {mineral.name}
                      </h3>
                      {crystalData && (
                        <Link
                          href={`/crystals/${mineral.id}`}
                          className="text-brand-accent text-xs font-body hover:underline"
                        >
                          Full profile →
                        </Link>
                      )}
                    </div>
                    <span
                      className={`${colors.bg} ${colors.text} text-xs font-body px-2.5 py-1 rounded-full shrink-0`}
                    >
                      {colors.label}
                    </span>
                  </div>

                  <p className="text-white/80 text-sm font-body leading-relaxed mb-4">
                    {mineral.problem}
                  </p>

                  <div className="space-y-4">
                    <div>
                      <p className="text-white font-body font-medium text-sm mb-2">
                        How to test:
                      </p>
                      <div className="space-y-1.5">
                        {mineral.tests.map((test, i) => (
                          <div
                            key={i}
                            className="bg-brand-bg/50 border border-brand-border/50 rounded-lg px-4 py-3"
                          >
                            <p className="text-white/70 text-sm font-body leading-relaxed">
                              {test}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-white font-body font-medium text-sm mb-2">
                        Red flags:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {mineral.redFlags.map((flag, i) => (
                          <span
                            key={i}
                            className={`${colors.bg} ${colors.text} text-xs font-body px-2.5 py-1 rounded-full`}
                          >
                            {flag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Treatments Guide */}
      <div className="mt-14">
        <h2 className="font-heading text-2xl md:text-3xl text-white mb-6">
          Common <em>Treatments</em>
        </h2>
        <p className="text-brand-muted text-sm font-body mb-6 max-w-2xl leading-relaxed">
          Not all treatments are deception. Some are industry-standard
          practices accepted for centuries. The key is disclosure: you should
          always know what was done to a stone before you buy it.
        </p>
        <div className="space-y-3">
          {TREATMENT_TYPES.map((treatment) => (
            <div
              key={treatment.name}
              className="bg-brand-surface border border-brand-border rounded-lg p-5"
            >
              <h3 className="text-white font-body font-medium mb-2">
                {treatment.name}
              </h3>
              <p className="text-white/80 text-sm font-body leading-relaxed mb-2">
                {treatment.description}
              </p>
              <p className="text-brand-muted text-xs font-body">
                <span className="text-white/60">Common in:</span>{" "}
                {treatment.minerals}
              </p>
              <p className="text-brand-muted text-xs font-body mt-1">
                <span className="text-white/60">Disclosure:</span>{" "}
                {treatment.disclosure}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Materials That Aren't What They Claim */}
      <div className="mt-14">
        <h2 className="font-heading text-2xl md:text-3xl text-white mb-6">
          Names That <em>Mislead</em>
        </h2>
        <p className="text-brand-muted text-sm font-body mb-6 max-w-2xl leading-relaxed">
          Some trade names are deliberately confusing, making one material
          sound like another. Know these and you will avoid common traps.
        </p>
        <div className="bg-brand-surface border border-brand-border rounded-xl p-6">
          <div className="space-y-2">
            {[
              { fake: "Opalite", real: "Man-made glass", not: "Opal" },
              { fake: "Goldstone", real: "Man-made glass with copper flecks", not: "A natural mineral" },
              { fake: "Cherry Quartz", real: "Dyed glass or smelted quartz with dye", not: "Natural quartz" },
              { fake: "Strawberry Quartz (cheap)", real: "Often dyed glass", not: "Genuine strawberry quartz (which exists but is rare)" },
              { fake: "African Turquoise", real: "Dyed jasper from Africa", not: "Turquoise" },
              { fake: "New Jade", real: "Serpentine", not: "Jade (jadeite or nephrite)" },
              { fake: "Malaysian Jade", real: "Dyed quartz", not: "Jade" },
              { fake: "Indian Jade", real: "Aventurine", not: "Jade" },
              { fake: "Caribbean Calcite", real: "Actually is calcite with aragonite (name is legitimate)", not: "Misnamed, but worth noting it is calcite, not a rare species" },
              { fake: "Citrine (deep orange)", real: "Heat-treated amethyst", not: "Natural citrine (which is pale yellow)" },
              { fake: "Aqua Aura Quartz", real: "Natural quartz coated with vaporized gold", not: "A naturally blue quartz (the coating is real gold, but it is a treatment)" },
            ].map((item) => (
              <div
                key={item.fake}
                className="bg-brand-bg/50 border border-brand-border/50 rounded-lg px-4 py-3 flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4"
              >
                <span className="text-white font-body font-medium text-sm sm:w-48 shrink-0">
                  {item.fake}
                </span>
                <div className="flex-1">
                  <p className="text-white/70 text-xs font-body">
                    <span className="text-white/50">Actually:</span>{" "}
                    {item.real}
                  </p>
                  <p className="text-white/50 text-xs font-body">
                    <span className="text-white/40">Not:</span> {item.not}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="mt-12 bg-brand-surface border border-brand-border rounded-xl p-6">
        <h2 className="font-heading text-xl text-white mb-3">
          Related Guides
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm font-body">
          <Link
            href="/identify"
            className="text-brand-accent hover:text-white transition-colors"
          >
            Crystal Identification Guide →
          </Link>
          <Link
            href="/hardness"
            className="text-brand-accent hover:text-white transition-colors"
          >
            Mohs Hardness Scale →
          </Link>
          <Link
            href="/beginners"
            className="text-brand-accent hover:text-white transition-colors"
          >
            Beginners Guide →
          </Link>
          <Link
            href="/care"
            className="text-brand-accent hover:text-white transition-colors"
          >
            Crystal Care Guide →
          </Link>
          <Link
            href="/water-safe"
            className="text-brand-accent hover:text-white transition-colors"
          >
            Water-Safe Crystals →
          </Link>
          <Link
            href="/?browse=all"
            className="text-brand-accent hover:text-white transition-colors"
          >
            Browse All {count} Crystals →
          </Link>
        </div>
        <p className="text-white/40 text-xs font-body mt-4">
          Every crystal profile in Crystal Almanac includes a dedicated
          &quot;How to Spot Fakes&quot; section with mineral-specific tests.
        </p>
      </div>
    </div>
  );
}
