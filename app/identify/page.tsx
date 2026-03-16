import Link from "next/link";
import { getAllCrystals } from "@/app/lib/crystals";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crystal Identification Guide - How to Identify Any Mineral",
  description:
    "A step-by-step guide to identifying crystals and minerals using hardness, luster, streak, cleavage, and other field tests anyone can do at home.",
};

interface TestStep {
  number: number;
  title: string;
  question: string;
  why: string;
  howTo: string;
  outcomes: { result: string; means: string }[];
}

const IDENTIFICATION_STEPS: TestStep[] = [
  {
    number: 1,
    title: "Test the Hardness",
    question: "How hard is it?",
    why: "Hardness immediately eliminates most possibilities. A mineral that scratches glass cannot be calcite, fluorite, or any of the soft minerals. A mineral scratched by a fingernail cannot be quartz.",
    howTo: "Try scratching the specimen with your fingernail (2.5), a copper coin (3.5), a steel knife (5.5), and a piece of quartz (7). Always test on an inconspicuous area. The hardest object that fails to scratch it tells you the minimum hardness.",
    outcomes: [
      { result: "Fingernail scratches it", means: "Hardness below 2.5. Think talc, gypsum, selenite, soapstone, gold, silver." },
      { result: "Coin scratches it, fingernail does not", means: "Hardness 2.5-3.5. Think calcite, mica, pearl, copper minerals." },
      { result: "Knife scratches it, coin does not", means: "Hardness 3.5-5.5. Think fluorite, apatite, lapis lazuli, turquoise." },
      { result: "Quartz scratches it, knife does not", means: "Hardness 5.5-7. Think feldspar, opal, pyrite, hematite." },
      { result: "Nothing scratches it", means: "Hardness 7+. Think quartz family, topaz, corundum (ruby/sapphire), diamond." },
    ],
  },
  {
    number: 2,
    title: "Check the Luster",
    question: "How does light reflect off the surface?",
    why: "Luster narrows down mineral groups quickly. Metallic luster points you toward sulfides and native metals. Vitreous (glassy) luster covers most silicates. Waxy or earthy luster suggests weathered or microcrystalline minerals.",
    howTo: "Look at the mineral on a fresh surface (not a weathered face) in good light. Compare the reflection quality to known references. Does it look like glass? Like metal? Like a wax candle?",
    outcomes: [
      { result: "Metallic (looks like metal)", means: "Pyrite, galena, hematite, magnetite, gold, silver, chalcopyrite, marcasite." },
      { result: "Vitreous (looks like glass)", means: "Quartz, feldspar, topaz, garnet, tourmaline, beryl, olivine. Most common luster." },
      { result: "Adamantine (brilliant, diamond-like)", means: "Diamond, zircon, some sphalerite, cerussite. High refractive index minerals." },
      { result: "Waxy", means: "Turquoise, serpentine, some chalcedony, chrysoprase. Microcrystalline or massive habit." },
      { result: "Pearly or silky", means: "Mica, gypsum, satin spar selenite, tiger's eye, malachite (silky banding)." },
      { result: "Earthy (dull, like clay)", means: "Weathered specimens, limonite, bauxite, some hematite. Often indicates alteration." },
    ],
  },
  {
    number: 3,
    title: "Do the Streak Test",
    question: "What color is the powder?",
    why: "Streak is more reliable than surface color for identification. Many minerals come in multiple colors but always have the same streak. Hematite can look silver, black, or red, but always streaks reddish-brown.",
    howTo: "Rub the mineral firmly across an unglazed white porcelain tile (a streak plate). The powder left behind is the streak. If the mineral is harder than 7, it will scratch the plate instead of leaving powder, so streak is not useful for very hard minerals.",
    outcomes: [
      { result: "White or colorless", means: "Most silicates and carbonates. Quartz, feldspar, calcite, fluorite, topaz." },
      { result: "Reddish-brown", means: "Hematite (the classic example). Also some iron-bearing minerals." },
      { result: "Greenish-black", means: "Pyrite. This is the definitive test: pyrite looks gold but streaks dark." },
      { result: "Yellow to brown", means: "Limonite, goethite, some sulfur." },
      { result: "Black", means: "Magnetite, ilmenite, some hornblende." },
      { result: "Blue", means: "Azurite, lazurite (lapis lazuli component)." },
      { result: "Green", means: "Malachite, some copper minerals." },
    ],
  },
  {
    number: 4,
    title: "Examine the Crystal Shape",
    question: "What shape are the crystals?",
    why: "Crystal habit (the typical form a mineral grows in) is a direct expression of its internal atomic structure. Recognizing habits speeds up identification dramatically. You will start to see a six-sided prism and immediately think quartz.",
    howTo: "Use a 10x loupe to examine crystal faces, if visible. Note whether the crystal is prismatic (elongated), tabular (flat), equant (blocky), acicular (needle-like), or massive (no visible crystals). Count the number of faces and look for symmetry.",
    outcomes: [
      { result: "Six-sided prism with pointed tip", means: "Almost certainly quartz or one of its varieties (amethyst, citrine, smoky quartz)." },
      { result: "Perfect cubes", means: "Pyrite, fluorite, galena, halite. All belong to the isometric system." },
      { result: "Octahedrons (8 faces)", means: "Diamond, fluorite, spinel, magnetite." },
      { result: "Rhombohedrons (tilted cubes)", means: "Calcite, dolomite, rhodochrosite. Trigonal system." },
      { result: "Rounded triangular prisms", means: "Tourmaline. The cross-section is a distinctive rounded triangle." },
      { result: "Blade-like or flat", means: "Kyanite, barite, gypsum. Monoclinic or triclinic systems." },
      { result: "Massive (no visible crystal faces)", means: "Many minerals occur in massive form. You will need other tests to narrow down." },
    ],
  },
  {
    number: 5,
    title: "Check Cleavage and Fracture",
    question: "How does it break?",
    why: "Cleavage (breaking along flat planes) is controlled by crystal structure and is diagnostic for many minerals. Fracture (irregular breakage) patterns are also useful. Conchoidal fracture is distinctive of quartz and glass.",
    howTo: "Look at broken surfaces. Are they flat and reflective (cleavage) or irregular (fracture)? How many directions of cleavage are there? At what angles do they meet? Do not break valuable specimens for this test. Examine existing broken surfaces.",
    outcomes: [
      { result: "Perfect cleavage in one direction (sheets)", means: "Mica (muscovite, biotite), graphite. Peels into thin flakes." },
      { result: "Cleavage in two directions at ~90 degrees", means: "Feldspar, pyroxene. Feldspars are the most common minerals on Earth." },
      { result: "Cleavage in two directions at ~60/120 degrees", means: "Amphibole (hornblende). This angle distinguishes amphibole from pyroxene." },
      { result: "Cleavage in three directions at 90 degrees", means: "Halite, galena. Breaks into cubes." },
      { result: "Cleavage in three directions, not at 90 degrees", means: "Calcite. Breaks into rhombohedrons (tilted parallelograms)." },
      { result: "Four directions of cleavage (octahedral)", means: "Fluorite, diamond. Breaks into triangular fragments." },
      { result: "Conchoidal fracture (curved, shell-like)", means: "Quartz, obsidian, flint. No cleavage at all." },
    ],
  },
  {
    number: 6,
    title: "Additional Tests",
    question: "Still not sure? Try these.",
    why: "Some minerals have unique diagnostic properties that make identification instant. A magnet, a bottle of vinegar, and a UV light can solve cases that hardness and luster cannot.",
    howTo: "Apply the relevant test from the list below. These are non-destructive or minimally destructive tests that can be done at home.",
    outcomes: [
      { result: "Magnetic (attracted to a magnet)", means: "Magnetite (strongly), some hematite, pyrrhotite. Very few minerals are magnetic." },
      { result: "Fizzes in vinegar or dilute acid", means: "Calcite and aragonite (strongly), dolomite (weakly, with warm acid). The acid test for carbonates." },
      { result: "Fluorescent under UV light", means: "Fluorite (often blue/purple), calcite (red/orange), willemite (green), scheelite (blue-white)." },
      { result: "Tastes salty", means: "Halite (rock salt). The only common mineral you should taste-test. Do not taste unknown minerals." },
      { result: "Feels greasy or soapy", means: "Talc, serpentine, soapstone. The greasy feel is diagnostic." },
      { result: "Double image when you look through it", means: "Calcite (optical grade). Double refraction is unique to calcite in easily visible form." },
      { result: "Unusually heavy for its size", means: "High specific gravity. Galena (~7.5), barite (~4.5), hematite (~5.3). Compare to quartz (~2.65)." },
    ],
  },
];

const COMMON_CONFUSIONS = [
  {
    pair: "Quartz vs. Glass",
    howToTell: "Quartz is harder than glass (7 vs. 5.5). Quartz will scratch glass. Glass often has small bubbles visible under 10x magnification. Quartz has conchoidal fracture with a waxy feel on broken surfaces.",
  },
  {
    pair: "Gold vs. Pyrite",
    howToTell: "The streak test settles it instantly. Gold streaks gold/yellow. Pyrite streaks greenish-black. Gold is also much softer (2.5 vs 6-6.5), much heavier, and malleable (bends, does not shatter).",
  },
  {
    pair: "Diamond vs. Quartz vs. Glass",
    howToTell: "Diamond scratches everything and nothing scratches it. It has adamantine luster and exceptional brilliance. Quartz has vitreous luster and is noticeably less brilliant. Glass is softer than both.",
  },
  {
    pair: "Calcite vs. Quartz",
    howToTell: "The acid test works perfectly. Calcite fizzes in vinegar, quartz does not. Calcite is softer (3 vs 7). Calcite has rhombohedral cleavage, quartz has conchoidal fracture.",
  },
  {
    pair: "Hematite vs. Magnetite",
    howToTell: "Both are iron oxides, both are dark and heavy. The magnet test works: magnetite is magnetic, hematite usually is not (some varieties are weakly magnetic). Hematite has a reddish-brown streak, magnetite has a black streak.",
  },
  {
    pair: "Turquoise vs. Dyed Howlite",
    howToTell: "Scratch an inconspicuous spot. Dyed howlite shows white underneath. Real turquoise is colored throughout. Howlite is also softer (3.5 vs 5-6). Under magnification, dye concentrates in surface cracks.",
  },
];

export default function IdentifyPage() {
  const crystals = getAllCrystals();
  const count = crystals.length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <p className="text-brand-accent text-sm uppercase tracking-[0.15em] font-body mb-4">
        Reference
      </p>
      <h1 className="font-heading text-4xl md:text-5xl text-white">
        Crystal Identification <em>Guide</em>
      </h1>
      <p className="text-brand-muted text-lg font-body mt-4 max-w-2xl leading-relaxed">
        A step-by-step system for identifying any crystal or mineral using
        simple tests you can do at home. No expensive equipment required.
      </p>
      <p className="text-brand-muted/60 text-sm font-body mt-2">
        Follow these six tests in order. Each step narrows down the
        possibilities until you reach an identification.
      </p>

      {/* The Steps */}
      <div className="mt-12 space-y-6">
        {IDENTIFICATION_STEPS.map((step) => (
          <div
            key={step.number}
            className="bg-brand-surface border border-brand-border rounded-xl overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-brand-accent/15 border border-brand-accent/30 flex items-center justify-center shrink-0">
                  <span className="text-brand-accent font-heading font-bold text-lg">
                    {step.number}
                  </span>
                </div>
                <div>
                  <h2 className="font-heading text-xl text-white">
                    {step.title}
                  </h2>
                  <p className="text-brand-accent text-sm font-body mt-0.5">
                    {step.question}
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-white/80 text-sm font-body leading-relaxed mb-4">
                <p>{step.why}</p>
                <p className="text-white/60">
                  <strong className="text-white/80">How to test:</strong>{" "}
                  {step.howTo}
                </p>
              </div>

              <div className="space-y-1.5">
                {step.outcomes.map((outcome, i) => (
                  <div
                    key={i}
                    className="bg-brand-bg/50 border border-brand-border/50 rounded-lg px-4 py-3"
                  >
                    <p className="text-white text-sm font-body font-medium">
                      {outcome.result}
                    </p>
                    <p className="text-white/60 text-xs font-body mt-1">
                      {outcome.means}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Common Confusions */}
      <div className="mt-14">
        <h2 className="font-heading text-2xl md:text-3xl text-white mb-6">
          Commonly Confused <em>Minerals</em>
        </h2>
        <p className="text-brand-muted text-sm font-body mb-6 max-w-2xl leading-relaxed">
          These pairs trip up beginners and even experienced collectors. Here
          is how to tell them apart with confidence.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {COMMON_CONFUSIONS.map((pair) => (
            <div
              key={pair.pair}
              className="bg-brand-surface border border-brand-border rounded-xl p-5"
            >
              <h3 className="text-white font-body font-medium mb-2">
                {pair.pair}
              </h3>
              <p className="text-white/70 text-sm font-body leading-relaxed">
                {pair.howToTell}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Decision Flowchart */}
      <div className="mt-14">
        <h2 className="font-heading text-2xl md:text-3xl text-white mb-6">
          Quick Decision <em>Flowchart</em>
        </h2>
        <div className="bg-brand-surface border border-brand-border rounded-xl p-6">
          <div className="space-y-3 text-sm font-body">
            <div className="bg-brand-bg/50 border border-brand-border/50 rounded-lg p-4">
              <p className="text-brand-accent font-medium mb-2">Does it have metallic luster?</p>
              <div className="ml-4 space-y-2 text-white/70">
                <p><span className="text-white">Yes, and it is gold-colored:</span> Test streak. Gold streak = gold. Black/green streak = pyrite or chalcopyrite.</p>
                <p><span className="text-white">Yes, and it is silver-colored:</span> Test magnetism. Magnetic = magnetite. Heavy + cubic cleavage = galena. Light + flaky = mica.</p>
                <p><span className="text-white">Yes, and it is black:</span> Test streak. Red-brown streak = hematite. Black streak = magnetite or ilmenite.</p>
              </div>
            </div>

            <div className="bg-brand-bg/50 border border-brand-border/50 rounded-lg p-4">
              <p className="text-brand-accent font-medium mb-2">Does it have vitreous (glassy) luster?</p>
              <div className="ml-4 space-y-2 text-white/70">
                <p><span className="text-white">Scratches glass (H 6+):</span> Check crystal shape. Six-sided = quartz. Rounded triangular = tourmaline. Blocky/equant = feldspar or garnet.</p>
                <p><span className="text-white">Does not scratch glass (H below 5.5):</span> Fizzes in acid = calcite. Cleavage in 4 directions = fluorite. Tabular/bladed = barite or gypsum.</p>
              </div>
            </div>

            <div className="bg-brand-bg/50 border border-brand-border/50 rounded-lg p-4">
              <p className="text-brand-accent font-medium mb-2">Does it have waxy, earthy, or dull luster?</p>
              <div className="ml-4 space-y-2 text-white/70">
                <p><span className="text-white">Blue-green:</span> Turquoise (H 5-6), chrysocolla (H 2-4), or dyed howlite. Test hardness to distinguish.</p>
                <p><span className="text-white">Green banding:</span> Malachite (H 3.5-4). Fizzes in acid. Always green streak.</p>
                <p><span className="text-white">Red-brown earthy:</span> Likely limonite, laterite, or weathered hematite.</p>
                <p><span className="text-white">Feels soapy/greasy:</span> Talc (H 1), serpentine (H 3-4), or soapstone.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Identification Checklist */}
      <div className="mt-14">
        <h2 className="font-heading text-2xl md:text-3xl text-white mb-6">
          Recording Your <em>Observations</em>
        </h2>
        <div className="bg-brand-surface border border-brand-border rounded-xl p-6">
          <p className="text-white/80 text-sm font-body leading-relaxed mb-4">
            When identifying an unknown specimen, record these observations
            systematically. Having all the data in front of you makes
            identification much easier than trying to hold it all in your head.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-brand-bg/50 rounded-lg p-4 border border-brand-border/50">
              <p className="text-white font-medium font-body text-sm mb-2">Physical Properties</p>
              <div className="space-y-1.5 text-white/70 text-sm font-body">
                <p>Color (surface and interior)</p>
                <p>Streak color</p>
                <p>Luster type</p>
                <p>Hardness (tested against known objects)</p>
                <p>Cleavage or fracture type</p>
                <p>Transparency</p>
                <p>Estimated weight / density feel</p>
              </div>
            </div>
            <div className="bg-brand-bg/50 rounded-lg p-4 border border-brand-border/50">
              <p className="text-white font-medium font-body text-sm mb-2">Crystal Properties</p>
              <div className="space-y-1.5 text-white/70 text-sm font-body">
                <p>Crystal shape (if visible)</p>
                <p>Number of crystal faces</p>
                <p>Crystal system (if determinable)</p>
                <p>Massive or crystalline habit</p>
                <p>Special properties (magnetism, fluorescence, acid reaction)</p>
                <p>Where it was found (locality, rock type)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="mt-12 bg-brand-surface border border-brand-border rounded-xl p-6">
        <h2 className="font-heading text-xl text-white mb-3">
          Continue Learning
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm font-body">
          <Link
            href="/hardness"
            className="text-brand-accent hover:text-white transition-colors"
          >
            Full Mohs Scale with {count} minerals →
          </Link>
          <Link
            href="/fakes"
            className="text-brand-accent hover:text-white transition-colors"
          >
            Fake-Spotting Guide →
          </Link>
          <Link
            href="/groups"
            className="text-brand-accent hover:text-white transition-colors"
          >
            Mineral Groups →
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
            href="/?browse=all"
            className="text-brand-accent hover:text-white transition-colors"
          >
            Browse All {count} Crystals →
          </Link>
        </div>
      </div>
    </div>
  );
}
