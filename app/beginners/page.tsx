import Link from "next/link";
import { getAllCrystals } from "@/app/lib/crystals";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beginners Guide to Crystals - What They Are & How to Start",
  description:
    "What are crystals, really? A science-first introduction to mineralogy, crystal systems, how crystals form, and how to start your own collection with confidence.",
};

const CRYSTAL_SYSTEMS = [
  {
    name: "Isometric (Cubic)",
    shape: "Equal axes at right angles",
    examples: "Diamond, Garnet, Pyrite, Fluorite",
    visual: "Cubes, octahedrons, dodecahedrons",
    color: "#A78BFA",
  },
  {
    name: "Hexagonal",
    shape: "Four axes, three equal at 120 degrees",
    examples: "Beryl (Emerald, Aquamarine), Apatite",
    visual: "Six-sided prisms",
    color: "#38BDF8",
  },
  {
    name: "Trigonal",
    shape: "Subset of hexagonal, three-fold symmetry",
    examples: "Quartz, Calcite, Tourmaline, Corundum",
    visual: "Three-sided prisms, rhombohedrons",
    color: "#34D399",
  },
  {
    name: "Tetragonal",
    shape: "Three axes at right angles, two equal",
    examples: "Zircon, Rutile, Cassiterite",
    visual: "Four-sided prisms, elongated boxes",
    color: "#FBBF24",
  },
  {
    name: "Orthorhombic",
    shape: "Three unequal axes at right angles",
    examples: "Topaz, Olivine, Aragonite, Tanzanite",
    visual: "Stubby prisms, tabular shapes",
    color: "#F87171",
  },
  {
    name: "Monoclinic",
    shape: "Three unequal axes, one oblique angle",
    examples: "Moonstone, Gypsum, Malachite, Kunzite",
    visual: "Tilted prisms, tabular crystals",
    color: "#FB923C",
  },
  {
    name: "Triclinic",
    shape: "Three unequal axes, no right angles",
    examples: "Labradorite, Turquoise, Kyanite",
    visual: "Irregular, flat, or blade-like shapes",
    color: "#E879F9",
  },
];

const STARTER_CRYSTALS = [
  { id: "clear-quartz", reason: "Abundant, affordable, and the textbook example of a crystal. Learn to identify hexagonal prisms and conchoidal fracture." },
  { id: "amethyst", reason: "Widely available and teaches you about color in quartz. The purple comes from iron impurities and natural irradiation." },
  { id: "rose-quartz", reason: "Introduces you to massive vs. crystalline habit. Rose quartz almost never forms visible crystals, unlike its clear cousin." },
  { id: "pyrite", reason: "Perfect cubes straight from the ground. Teaches crystal habit, metallic luster, and the streak test (greenish-black, not gold)." },
  { id: "fluorite", reason: "Comes in every color and demonstrates perfect octahedral cleavage. Breaks into tiny pyramids. Fluoresces under UV light." },
  { id: "calcite", reason: "Over 300 crystal forms. Demonstrates double refraction, rhombohedral cleavage, and the acid test (fizzes in vinegar)." },
  { id: "obsidian", reason: "Not actually a crystal at all. It is volcanic glass with no crystal structure, which makes it a perfect example of what a crystal is not." },
  { id: "labradorite", reason: "Teaches you about optical phenomena. The flash of blue and gold (labradorescence) comes from light bouncing between internal layers." },
];

const BUYING_TIPS = [
  {
    title: "Buy from reputable dealers",
    detail: "Gem shows, established online sellers with return policies, and local rock shops are safer than anonymous marketplaces. Ask where specimens were mined.",
  },
  {
    title: "Start with common minerals",
    detail: "Quartz, calcite, fluorite, and garnet are affordable and teach you the fundamentals. You do not need rare specimens to learn mineralogy.",
  },
  {
    title: "Learn before you spend",
    detail: "A $5 piece of fluorite with perfect cleavage teaches you more than a $200 polished sphere. Prioritize interesting mineral properties over size.",
  },
  {
    title: "If the price seems too good, it probably is",
    detail: "Natural citrine does not cost $3 for a large point. Real moldavite is not cheap. Genuine turquoise is rarely bright blue throughout. Know market prices.",
  },
  {
    title: "Ask about treatments",
    detail: "Heat treatment, dyeing, stabilization, and coating are common. A good dealer discloses treatments. If they say everything is 100% natural, be skeptical.",
  },
  {
    title: "Collect what interests you",
    detail: "Some collectors focus on one mineral species, one locality, or one crystal system. Having a focus makes your collection more meaningful and educational.",
  },
];

export default function BeginnersPage() {
  const allCrystals = getAllCrystals();
  const count = allCrystals.length;

  const starterData = STARTER_CRYSTALS.map((s) => {
    const crystal = allCrystals.find((c) => c.id === s.id);
    return { ...s, crystal };
  }).filter((s) => s.crystal);

  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <p className="text-brand-accent text-sm uppercase tracking-[0.15em] font-body mb-4">
        Reference
      </p>
      <h1 className="font-heading text-4xl md:text-5xl text-white">
        Beginners Guide to <em>Crystals</em>
      </h1>
      <p className="text-brand-muted text-lg font-body mt-4 max-w-2xl leading-relaxed">
        What crystals actually are, how they form inside the Earth, and how
        to start a collection grounded in real science. No jargon, no
        gatekeeping.
      </p>

      {/* What Is a Crystal */}
      <div className="mt-12">
        <h2 className="font-heading text-2xl md:text-3xl text-white mb-6">
          What Is a Crystal, <em>Really?</em>
        </h2>
        <div className="bg-brand-surface border border-brand-border rounded-xl p-6 space-y-4 text-white/80 text-sm font-body leading-relaxed">
          <p>
            A crystal is any solid material whose atoms are arranged in a
            highly ordered, repeating three-dimensional pattern called a
            <strong className="text-white"> crystal lattice</strong>. That
            repeating internal structure is what defines a crystal, not its
            outward shape, transparency, or beauty. Table salt is a crystal.
            So is a snowflake. So is a diamond.
          </p>
          <p>
            The flat faces and geometric shapes you see on natural crystals
            are a direct expression of their internal atomic arrangement. A
            quartz crystal grows into a six-sided prism because its silicon
            and oxygen atoms are bonded in a repeating hexagonal framework.
            The outside mirrors the inside.
          </p>
          <p>
            Not all pretty rocks are crystals. Obsidian (volcanic glass) has
            no crystal structure at all. Its atoms froze too quickly to
            organize. Opal is another example. Most opals are amorphous,
            meaning their silica spheres are stacked but not in a true
            crystalline lattice. Understanding this distinction is the first
            step toward real mineralogy.
          </p>
        </div>
      </div>

      {/* Minerals vs Rocks vs Crystals */}
      <div className="mt-12">
        <h2 className="font-heading text-2xl md:text-3xl text-white mb-6">
          Minerals vs. Rocks vs. <em>Gemstones</em>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-brand-surface border border-brand-border rounded-xl p-5">
            <h3 className="text-brand-accent font-body font-medium text-sm mb-3 uppercase tracking-wider">
              Mineral
            </h3>
            <p className="text-white/80 text-sm font-body leading-relaxed">
              A naturally occurring, inorganic solid with a definite chemical
              composition and an ordered crystal structure. Quartz (SiO₂) is a
              mineral. So is diamond (pure carbon). Each mineral species has
              specific, measurable properties: hardness, crystal system,
              specific gravity, streak color.
            </p>
          </div>
          <div className="bg-brand-surface border border-brand-border rounded-xl p-5">
            <h3 className="text-brand-accent font-body font-medium text-sm mb-3 uppercase tracking-wider">
              Rock
            </h3>
            <p className="text-white/80 text-sm font-body leading-relaxed">
              A natural aggregate of one or more minerals (or mineraloids).
              Granite is a rock made of quartz, feldspar, and mica. Marble is
              metamorphosed limestone. Rocks do not have a single chemical
              formula because they are mixtures. You cannot assign a Mohs
              hardness to a rock the same way you can to a mineral.
            </p>
          </div>
          <div className="bg-brand-surface border border-brand-border rounded-xl p-5">
            <h3 className="text-brand-accent font-body font-medium text-sm mb-3 uppercase tracking-wider">
              Gemstone
            </h3>
            <p className="text-white/80 text-sm font-body leading-relaxed">
              A mineral (or occasionally an organic material like pearl or
              amber) that has been cut and polished for use in jewelry.
              &quot;Gemstone&quot; is a human designation, not a scientific one. Ruby is
              just the gemstone name for red corundum. Emerald is green beryl.
              The same mineral can be a rough specimen or a cut gem.
            </p>
          </div>
        </div>
      </div>

      {/* How Crystals Form */}
      <div className="mt-12">
        <h2 className="font-heading text-2xl md:text-3xl text-white mb-6">
          How Crystals <em>Form</em>
        </h2>
        <div className="space-y-4">
          <div className="bg-brand-surface border border-brand-border rounded-xl p-5">
            <h3 className="text-white font-body font-medium mb-2">
              From Magma (Igneous)
            </h3>
            <p className="text-white/80 text-sm font-body leading-relaxed">
              When molten rock cools, dissolved minerals crystallize out of the
              melt. Slow cooling deep underground produces large crystals
              (granite, pegmatite minerals like tourmaline and beryl). Fast
              cooling at the surface produces tiny crystals or none at all
              (basalt, obsidian). The slower the cooling, the larger the crystals.
              Giant pegmatite pockets can grow crystals measured in meters.
            </p>
          </div>
          <div className="bg-brand-surface border border-brand-border rounded-xl p-5">
            <h3 className="text-white font-body font-medium mb-2">
              From Water (Sedimentary and Hydrothermal)
            </h3>
            <p className="text-white/80 text-sm font-body leading-relaxed">
              Minerals dissolved in water crystallize when conditions change.
              Evaporation produces halite (salt) and gypsum. Hot water
              circulating through rock fractures (hydrothermal fluids) deposits
              quartz veins, gold, silver, and many of the most prized collector
              minerals. The geodes you see in shops formed this way: silica-rich
              water slowly deposited amethyst or agate inside volcanic gas
              bubbles over millions of years.
            </p>
          </div>
          <div className="bg-brand-surface border border-brand-border rounded-xl p-5">
            <h3 className="text-white font-body font-medium mb-2">
              From Heat and Pressure (Metamorphic)
            </h3>
            <p className="text-white/80 text-sm font-body leading-relaxed">
              When existing rocks are subjected to extreme heat and pressure
              deep in the Earth, their minerals recrystallize without melting.
              Limestone becomes marble. Shale becomes slate, then garnet-bearing
              schist. Ruby and sapphire form when aluminum-rich rocks are
              metamorphosed at high temperatures. Some of the most valuable
              gemstones on Earth are products of metamorphism.
            </p>
          </div>
        </div>
      </div>

      {/* Crystal Systems */}
      <div className="mt-12">
        <h2 className="font-heading text-2xl md:text-3xl text-white mb-6">
          The Seven Crystal <em>Systems</em>
        </h2>
        <p className="text-brand-muted text-sm font-body mb-6 max-w-2xl leading-relaxed">
          Every crystalline mineral belongs to one of seven crystal systems,
          defined by the symmetry of its unit cell (the smallest repeating
          block of atoms). The system determines what shapes the crystal can
          grow into.
        </p>
        <div className="space-y-2">
          {CRYSTAL_SYSTEMS.map((system) => (
            <div
              key={system.name}
              className="bg-brand-surface border border-brand-border rounded-lg p-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                <div className="flex items-center gap-3 sm:w-52 shrink-0">
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: system.color }}
                  />
                  <span className="text-white font-body font-medium">
                    {system.name}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/60 text-xs font-body">
                    <span className="text-white/80">{system.shape}.</span>{" "}
                    Typical shapes: {system.visual}.
                  </p>
                  <p className="text-brand-muted text-xs font-body mt-1">
                    Examples: {system.examples}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-white/40 text-xs font-body mt-3">
          Some materials (like opal and obsidian) are <em>amorphous</em> and
          do not belong to any crystal system. They lack long-range atomic
          order.
        </p>
      </div>

      {/* Key Properties */}
      <div className="mt-12">
        <h2 className="font-heading text-2xl md:text-3xl text-white mb-6">
          Properties That <em>Matter</em>
        </h2>
        <p className="text-brand-muted text-sm font-body mb-6 max-w-2xl leading-relaxed">
          These are the properties mineralogists use to identify and classify
          minerals. Learning to observe them turns you from a casual admirer
          into someone who actually understands what they are looking at.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-brand-surface border border-brand-border rounded-xl p-5">
            <h3 className="text-white font-body font-medium mb-2">Hardness</h3>
            <p className="text-white/80 text-sm font-body leading-relaxed">
              Measured on the{" "}
              <Link href="/hardness" className="text-brand-accent hover:underline">
                Mohs scale
              </Link>{" "}
              from 1 (talc) to 10 (diamond). This is a scratch resistance test,
              not a measure of toughness. Diamond is the hardest mineral but it
              can still shatter if hit with a hammer. Hardness tells you what a
              mineral can scratch and what will scratch it.
            </p>
          </div>
          <div className="bg-brand-surface border border-brand-border rounded-xl p-5">
            <h3 className="text-white font-body font-medium mb-2">Luster</h3>
            <p className="text-white/80 text-sm font-body leading-relaxed">
              How light reflects off the surface. Vitreous (glassy, like
              quartz), metallic (like pyrite), adamantine (brilliant, like
              diamond), waxy, pearly, silky, or earthy (dull). Luster is one of
              the first things to note when identifying an unknown specimen.
            </p>
          </div>
          <div className="bg-brand-surface border border-brand-border rounded-xl p-5">
            <h3 className="text-white font-body font-medium mb-2">Streak</h3>
            <p className="text-white/80 text-sm font-body leading-relaxed">
              The color of a mineral's powder, tested by rubbing it on an
              unglazed porcelain tile. Streak is more reliable than surface
              color for identification. Hematite can appear silver, black, or
              red, but its streak is always reddish-brown. Pyrite looks gold but
              streaks greenish-black.
            </p>
          </div>
          <div className="bg-brand-surface border border-brand-border rounded-xl p-5">
            <h3 className="text-white font-body font-medium mb-2">
              Cleavage and Fracture
            </h3>
            <p className="text-white/80 text-sm font-body leading-relaxed">
              Cleavage is the tendency to break along flat planes determined by
              crystal structure. Mica has perfect cleavage in one direction
              (peels into sheets). Fluorite cleaves into octahedrons. Fracture
              describes irregular breakage. Quartz has conchoidal (shell-shaped)
              fracture, not cleavage.
            </p>
          </div>
          <div className="bg-brand-surface border border-brand-border rounded-xl p-5">
            <h3 className="text-white font-body font-medium mb-2">
              Specific Gravity
            </h3>
            <p className="text-white/80 text-sm font-body leading-relaxed">
              How dense a mineral is compared to water. Quartz is about 2.65.
              Gold is 19.3. Galena is 7.6. With practice, you can feel the
              difference just by hefting a specimen. An unexpectedly heavy stone
              is a valuable clue.
            </p>
          </div>
          <div className="bg-brand-surface border border-brand-border rounded-xl p-5">
            <h3 className="text-white font-body font-medium mb-2">
              Crystal Habit
            </h3>
            <p className="text-white/80 text-sm font-body leading-relaxed">
              The typical shape a mineral grows into. Quartz forms hexagonal
              prisms with pointed terminations. Pyrite forms perfect cubes.
              Tourmaline forms rounded triangular prisms. Habit reflects crystal
              system but is also influenced by growing conditions.
            </p>
          </div>
        </div>
      </div>

      {/* Starter Collection */}
      <div className="mt-12">
        <h2 className="font-heading text-2xl md:text-3xl text-white mb-6">
          Your First <em>Collection</em>
        </h2>
        <p className="text-brand-muted text-sm font-body mb-6 max-w-2xl leading-relaxed">
          These eight minerals will teach you more about mineralogy than a
          shelf of polished tumbles. Each one demonstrates a different
          fundamental concept.
        </p>
        <div className="space-y-2">
          {starterData.map(({ id, reason, crystal }) => (
            <div
              key={id}
              className="bg-brand-surface border border-brand-border rounded-lg p-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                <div className="flex items-center gap-2 sm:w-44 shrink-0">
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{
                      backgroundColor: crystal!.colorHexes[0] || "#A78BFA",
                    }}
                  />
                  <Link
                    href={`/crystals/${id}`}
                    className="text-white font-body font-medium hover:text-brand-accent transition-colors"
                  >
                    {crystal!.name}
                  </Link>
                </div>
                <p className="text-white/60 text-sm font-body leading-relaxed flex-1">
                  {reason}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Buying Tips */}
      <div className="mt-12">
        <h2 className="font-heading text-2xl md:text-3xl text-white mb-6">
          Buying With <em>Confidence</em>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {BUYING_TIPS.map((tip) => (
            <div
              key={tip.title}
              className="bg-brand-surface border border-brand-border rounded-xl p-5"
            >
              <h3 className="text-white font-body font-medium mb-2">
                {tip.title}
              </h3>
              <p className="text-white/70 text-sm font-body leading-relaxed">
                {tip.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Essential Tools */}
      <div className="mt-12">
        <h2 className="font-heading text-2xl md:text-3xl text-white mb-6">
          Essential <em>Tools</em>
        </h2>
        <div className="bg-brand-surface border border-brand-border rounded-xl p-6">
          <p className="text-white/80 text-sm font-body leading-relaxed mb-4">
            You do not need expensive equipment to get started. These basic
            tools cover most identification and collecting needs.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-brand-bg/50 rounded-lg p-4 border border-brand-border/50">
              <p className="text-white font-medium font-body text-sm mb-2">Starter Kit ($20-40)</p>
              <div className="space-y-1.5 text-white/70 text-sm font-body">
                <p>10x hand lens (loupe)</p>
                <p>Streak plate (unglazed porcelain tile)</p>
                <p>Steel nail or knife blade (hardness ~5.5)</p>
                <p>Glass plate (hardness ~5.5)</p>
                <p>Copper coin (hardness ~3.5)</p>
                <p>Small magnet</p>
              </div>
            </div>
            <div className="bg-brand-bg/50 rounded-lg p-4 border border-brand-border/50">
              <p className="text-white font-medium font-body text-sm mb-2">Level Up ($40-100)</p>
              <div className="space-y-1.5 text-white/70 text-sm font-body">
                <p>UV flashlight (365nm longwave)</p>
                <p>Mohs hardness pick set</p>
                <p>Digital kitchen scale (for density tests)</p>
                <p>White vinegar (acid test for carbonates)</p>
                <p>Small field notebook</p>
                <p>Specimen boxes with labels</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="mt-12 bg-brand-surface border border-brand-border rounded-xl p-6">
        <h2 className="font-heading text-xl text-white mb-3">
          Where to Go Next
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm font-body">
          <Link
            href="/hardness"
            className="text-brand-accent hover:text-white transition-colors"
          >
            Mohs Hardness Scale →
          </Link>
          <Link
            href="/identify"
            className="text-brand-accent hover:text-white transition-colors"
          >
            Crystal Identification Guide →
          </Link>
          <Link
            href="/fakes"
            className="text-brand-accent hover:text-white transition-colors"
          >
            How to Spot Fakes →
          </Link>
          <Link
            href="/care"
            className="text-brand-accent hover:text-white transition-colors"
          >
            Crystal Care Guide →
          </Link>
          <Link
            href="/groups"
            className="text-brand-accent hover:text-white transition-colors"
          >
            Mineral Groups →
          </Link>
          <Link
            href="/water-safe"
            className="text-brand-accent hover:text-white transition-colors"
          >
            Water-Safe Crystals →
          </Link>
        </div>
        <p className="text-white/40 text-xs font-body mt-4">
          Crystal Almanac covers {count} minerals with full geological
          profiles, identification guides, and fake-spotting tips for each one.
        </p>
      </div>
    </div>
  );
}
