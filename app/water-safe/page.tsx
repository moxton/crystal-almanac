import Link from "next/link";
import { getAllCrystals } from "@/app/lib/crystals";
import type { Crystal } from "@/app/lib/crystals";
import type { Metadata } from "next";

export function generateMetadata(): Metadata {
  const count = getAllCrystals().length;
  return {
    title: "Water-Safe Crystals - Which Crystals Can Go in Water?",
    description: `The complete water safety reference for ${count} crystals and minerals. Which can go in water, which dissolve, and the mineral science behind it.`,
  };
}

type WaterRating = "safe" | "brief" | "avoid" | "dissolves";

function getWaterRating(crystal: Crystal): WaterRating {
  const name = crystal.name.toLowerCase();
  const id = crystal.id;
  if (["selenite", "angelite", "desert-rose", "blue-halite", "gypsum"].includes(id)) return "dissolves";
  if (name.includes("halite")) return "dissolves";
  if (crystal.hardness <= 3) return "avoid";
  if ([
    "malachite", "azurite", "chrysocolla", "lepidolite", "lapis-lazuli",
    "pyrite", "hematite", "galena", "vanadinite", "wulfenite", "crocoite",
    "cuprite", "native-copper", "gold", "silver", "calcite", "aragonite",
    "rhodochrosite", "celestite", "amber", "pearl", "jet", "coral",
    "turquoise", "howlite", "shungite", "k2-stone", "bumble-bee-jasper",
    "magnetite", "cinnabar", "peacock-ore", "mimetite", "adamite",
    "pyromorphite", "cassiterite", "vivianite", "caribbean-calcite",
    "dolomite", "epidote", "scolecite", "stilbite", "cavansite", "bismuth",
    "moldavite", "realgar", "orpiment", "stibnite", "erythrite",
    "legrandite", "marcasite", "aurichalcite", "cobaltocalcite",
    "chalcopyrite", "shattuckite", "creedite", "covellite", "iron-meteorite"
  ].includes(id)) return "avoid";
  if (crystal.hardness <= 5) return "brief";
  if ([
    "fluorite", "fluorapatite", "apophyllite", "kunzite", "moonstone",
    "opal", "sunstone", "larimar", "amazonite", "labradorite", "kyanite"
  ].includes(id)) return "brief";
  return "safe";
}

function getWaterNote(crystal: Crystal): string {
  const id = crystal.id;
  const notes: Record<string, string> = {
    "selenite": "Dissolves in water. Selenite is a form of gypsum (CaSO₄·2H₂O), which is water-soluble. Even brief contact can etch the surface.",
    "angelite": "Reverts to gypsum when exposed to water. Will lose its blue color and smooth texture permanently.",
    "desert-rose": "A selenite variety. Water-soluble and extremely fragile. Never expose to moisture.",
    "blue-halite": "Halite is literally rock salt (NaCl). It dissolves completely in water.",
    "gypsum": "Water-soluble. This includes selenite towers, satin spar, and desert roses. Never use water for cleaning.",
    "malachite": "Copper carbonate that releases toxic copper compounds in water. Never use for gem elixirs. Brief rinse acceptable for cleaning but dry immediately.",
    "pyrite": "Iron sulfide reacts with water and oxygen to form sulfuric acid. This corrodes the specimen and can produce a sulfur smell. Keep dry.",
    "galena": "Contains lead. Avoid water exposure as lead can leach. Wash hands after handling.",
    "hematite": "Iron oxide can rust when submerged. Brief rinse is tolerable but prolonged soaking causes surface deterioration.",
    "lapis-lazuli": "Contains pyrite (iron sulfide) and calcite (acid-soluble carbonate). Both degrade in water. The pyrite can rust and stain.",
    "turquoise": "Extremely porous. Absorbs water, oils, soap, and chemicals, all of which permanently change its color. Keep dry.",
    "opal": "Contains up to 20% water internally. Soaking can cause differential expansion and cracking (crazing). The water content is structural.",
    "fluorite": "Calcium fluoride is slightly water-soluble over long exposure. Brief rinse is fine, but avoid prolonged soaking.",
    "moonstone": "Feldspar with cleavage planes. Water can seep into micro-fractures and expand during temperature changes, causing cracking.",
    "labradorite": "Feldspar with internal layered structure. Brief rinse is safe but avoid soaking, as water can penetrate cleavage planes.",
    "amber": "Organic gem (fossilized resin). Water will not dissolve it, but prolonged soaking can cause surface cloudiness and cracking.",
    "pearl": "Organic gem made of calcium carbonate layers (nacre). Water, soap, and chemicals degrade the nacre over time.",
    "coral": "Calcium carbonate skeleton of marine organisms. Acids, soap, and prolonged water contact damage the surface.",
    "lepidolite": "Mica structure delaminates (separates into layers) when wet. Water gets between the layers and stays.",
    "calcite": "Calcium carbonate dissolves in acidic water. Even slightly acidic tap water will etch the surface over time.",
    "aragonite": "Same composition as calcite (CaCO₃) but less stable crystal structure. Dissolves in acid and degrades in water.",
    "rhodochrosite": "Manganese carbonate. Acid-soluble and soft. Water contact causes surface dulling over time.",
    "celestite": "Strontium sulfate. Slightly water-soluble, extremely fragile, and fades in light. Handle as little as possible.",
    "kunzite": "Safe in brief water contact but the real danger is sunlight exposure, which permanently fades the color.",
    "kyanite": "Variable hardness (4.5-7 depending on direction). Water can penetrate along weak cleavage planes. Brief rinse only.",
    "cinnabar": "TOXIC. Mercury sulfide. Water can release mercury compounds. Handle briefly, wash hands immediately.",
    "realgar": "TOXIC. Arsenic sulfide. Decomposes in light and water. Store in darkness. Handle with extreme caution.",
    "orpiment": "TOXIC. Arsenic sulfide. Same warnings as realgar. Never expose to water.",
    "iron-meteorite": "Iron-nickel alloy that rusts aggressively in water. Store with desiccant packets. Never submerge.",
    "marcasite": "Chemically unstable iron sulfide. Decomposes in humidity, producing sulfuric acid. Keep as dry as possible.",
  };
  if (notes[id]) return notes[id];

  const rating = getWaterRating(crystal);
  if (rating === "safe") {
    return crystal.hardness >= 7
      ? `Hardness ${crystal.hardness}. Chemically stable silicate. Safe for water cleansing, brief soaking, and cleaning with mild soap.`
      : `Moderately durable. Safe for water contact and gentle cleaning.`;
  }
  if (rating === "brief") {
    return `Hardness ${crystal.hardness}. Quick rinse under running water is acceptable. Avoid soaking or submersion. Dry thoroughly afterward.`;
  }
  if (rating === "avoid") {
    return crystal.hardness <= 3
      ? `Very soft (Mohs ${crystal.hardness}). Water can damage, dissolve, or degrade the surface. Clean with dry cloth only.`
      : `Avoid water contact. May react, absorb moisture, or degrade. Clean with dry or slightly damp cloth.`;
  }
  return "Dissolves in water. Never expose to moisture.";
}

const RATING_CONFIG = {
  safe: {
    label: "Water Safe",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    description: "Safe for water cleansing, brief soaking, and cleaning with mild soap and water.",
  },
  brief: {
    label: "Brief Rinse Only",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    description: "Quick rinse under running water is acceptable. No soaking or prolonged submersion.",
  },
  avoid: {
    label: "Avoid Water",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    description: "Water can damage, stain, corrode, or degrade. Clean with dry cloth only.",
  },
  dissolves: {
    label: "Dissolves in Water",
    color: "text-red-500",
    bg: "bg-red-500/15",
    border: "border-red-500/20",
    description: "Water-soluble. Even brief contact or high humidity can cause permanent damage.",
  },
};

export default function WaterSafePage() {
  const crystals = getAllCrystals();
  const count = crystals.length;

  const categorized = {
    safe: [] as { crystal: Crystal; note: string }[],
    brief: [] as { crystal: Crystal; note: string }[],
    avoid: [] as { crystal: Crystal; note: string }[],
    dissolves: [] as { crystal: Crystal; note: string }[],
  };

  for (const crystal of crystals) {
    const rating = getWaterRating(crystal);
    categorized[rating].push({
      crystal,
      note: getWaterNote(crystal),
    });
  }

  // Sort each category alphabetically
  for (const key of Object.keys(categorized) as WaterRating[]) {
    categorized[key].sort((a, b) => a.crystal.name.localeCompare(b.crystal.name));
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <p className="text-brand-accent text-sm uppercase tracking-[0.15em] font-body mb-4">
        Reference
      </p>
      <h1 className="font-heading text-4xl md:text-5xl text-white">
        Water-Safe <em>Crystals</em>
      </h1>
      <p className="text-brand-muted text-lg font-body mt-4 max-w-2xl leading-relaxed">
        Which crystals can go in water and which will dissolve, corrode, or
        release toxins? The complete reference for {count} crystals, based on
        mineral chemistry and hardness.
      </p>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10">
        {(["safe", "brief", "avoid", "dissolves"] as WaterRating[]).map((rating) => {
          const config = RATING_CONFIG[rating];
          return (
            <div
              key={rating}
              className={`${config.bg} ${config.border} border rounded-xl p-4 text-center`}
            >
              <span className={`text-2xl font-heading font-bold ${config.color}`}>
                {categorized[rating].length}
              </span>
              <p className={`text-xs font-body mt-1 ${config.color}`}>
                {config.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* The Science */}
      <div className="mt-12 bg-brand-surface border border-brand-border rounded-xl p-6">
        <h2 className="font-heading text-xl text-white mb-4">
          Why Some Crystals Cannot Get Wet
        </h2>
        <div className="space-y-3 text-white/80 text-sm font-body leading-relaxed">
          <p>
            Water damages minerals through four mechanisms, and many
            collectors learn this the hard way.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="bg-brand-bg/50 rounded-lg p-4 border border-brand-border/50">
              <p className="text-white font-medium mb-2">Dissolution</p>
              <p className="text-white/70 text-sm">
                Some minerals are water-soluble. Selenite (gypsum), halite
                (rock salt), and some sulfates literally dissolve when
                submerged. Selenite will develop surface etching in minutes.
              </p>
            </div>
            <div className="bg-brand-bg/50 rounded-lg p-4 border border-brand-border/50">
              <p className="text-white font-medium mb-2">Chemical Reaction</p>
              <p className="text-white/70 text-sm">
                Iron sulfides (pyrite, marcasite) react with water and oxygen
                to form sulfuric acid, which corrodes the specimen and can
                damage surrounding stones. Copper carbonates (malachite) can
                release toxic copper compounds.
              </p>
            </div>
            <div className="bg-brand-bg/50 rounded-lg p-4 border border-brand-border/50">
              <p className="text-white font-medium mb-2">Absorption</p>
              <p className="text-white/70 text-sm">
                Porous minerals (turquoise, opal) absorb water like a sponge.
                This changes color permanently, carries contaminants into the
                stone, and can cause cracking as trapped water expands and
                contracts with temperature changes.
              </p>
            </div>
            <div className="bg-brand-bg/50 rounded-lg p-4 border border-brand-border/50">
              <p className="text-white font-medium mb-2">Structural Damage</p>
              <p className="text-white/70 text-sm">
                Minerals with perfect cleavage (mica, kyanite, moonstone) can
                trap water between structural layers. When temperature
                changes, the water expands and forces the layers apart. Soft
                minerals can also erode from water flow.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* The Hardness Rule */}
      <div className="mt-8 bg-brand-surface border border-brand-border rounded-xl p-6">
        <h2 className="font-heading text-xl text-white mb-3">
          The Hardness Rule of Thumb
        </h2>
        <div className="text-white/80 text-sm font-body leading-relaxed space-y-3">
          <p>
            A common guideline is that minerals with Mohs hardness 6 or above
            are generally water-safe, while those below 5 should be kept dry.
            This is a useful starting point but has important exceptions.
          </p>
          <p className="text-white/60">
            <strong className="text-white/80">Exceptions to the rule:</strong>{" "}
            Pyrite is hard (6-6.5) but reacts chemically with water. Opal is
            moderately hard (5.5-6.5) but absorbs water through its porous
            structure. Turquoise is hard enough (5-6) but is extremely
            porous. Conversely, gold is very soft (2.5-3) but completely
            water-safe because it is chemically inert.
          </p>
          <p className="text-white/60">
            The real question is not just &quot;is it hard?&quot; but also &quot;is it
            chemically reactive?&quot; and &quot;is it porous?&quot; Hardness alone is
            not enough.
          </p>
        </div>
      </div>

      {/* Gem Elixir Warning */}
      <div className="mt-8 bg-red-500/10 border border-red-500/20 rounded-xl p-6">
        <h2 className="font-heading text-xl text-red-400 mb-3">
          A Note on Crystal Water and Gem Elixirs
        </h2>
        <div className="text-white/80 text-sm font-body leading-relaxed space-y-3">
          <p>
            Placing crystals directly in drinking water is dangerous with many
            minerals. Malachite releases copper. Galena releases lead.
            Cinnabar releases mercury. Realgar and orpiment release arsenic.
            Even minerals not typically considered toxic can release trace
            elements or particles you do not want to ingest.
          </p>
          <p>
            If you choose to make gem elixirs, use the <strong className="text-white">indirect method</strong>: place the crystal in a
            separate sealed glass container, then place that container in the
            water. The crystal never contacts the drinking water. This
            eliminates any risk of contamination.
          </p>
          <p className="text-red-400/80 font-medium">
            Never place the following in drinking water under any
            circumstances: malachite, azurite, galena, vanadinite, wulfenite,
            crocoite, cinnabar, realgar, orpiment, stibnite, bumble bee
            jasper, mimetite, adamite, pyromorphite, erythrite, or any
            mineral containing lead, arsenic, antimony, or mercury.
          </p>
        </div>
      </div>

      {/* Complete Lists by Category */}
      {(["safe", "brief", "avoid", "dissolves"] as WaterRating[]).map((rating) => {
        const config = RATING_CONFIG[rating];
        const items = categorized[rating];
        if (items.length === 0) return null;

        return (
          <div key={rating} className="mt-12">
            <div className="flex items-center gap-3 mb-4">
              <h2 className={`font-heading text-2xl ${config.color}`}>
                {config.label}
              </h2>
              <span className="text-brand-muted text-sm font-body">
                ({items.length} minerals)
              </span>
            </div>
            <p className="text-brand-muted text-sm font-body mb-4">
              {config.description}
            </p>
            <div className="space-y-1.5">
              {items.map(({ crystal, note }) => (
                <div
                  key={crystal.id}
                  className={`${config.bg} ${config.border} border rounded-lg p-4`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                    <div className="flex items-center gap-2 sm:w-48 shrink-0">
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{
                          backgroundColor: crystal.colorHexes[0] || "#A78BFA",
                        }}
                      />
                      <Link
                        href={`/crystals/${crystal.id}`}
                        className="text-white font-body font-medium text-sm hover:text-brand-accent transition-colors"
                      >
                        {crystal.name}
                      </Link>
                      <span className="text-white/30 text-xs font-body">
                        H{crystal.hardness}
                      </span>
                    </div>
                    <p className="text-white/60 text-xs font-body leading-relaxed flex-1">
                      {note}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Alternative Cleansing Methods */}
      <div className="mt-14">
        <h2 className="font-heading text-2xl md:text-3xl text-white mb-6">
          Alternative Cleaning <em>Methods</em>
        </h2>
        <p className="text-brand-muted text-sm font-body mb-6 max-w-2xl leading-relaxed">
          For crystals that cannot go in water, these methods are safe for
          cleaning and maintenance.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-brand-surface border border-brand-border rounded-xl p-5">
            <h3 className="text-white font-body font-medium mb-2">
              Dry Cloth
            </h3>
            <p className="text-white/70 text-sm font-body leading-relaxed">
              A soft microfiber cloth removes dust and fingerprints from any
              specimen without risk. The safest universal method. Use gentle
              pressure and avoid rubbing soft minerals aggressively.
            </p>
          </div>
          <div className="bg-brand-surface border border-brand-border rounded-xl p-5">
            <h3 className="text-white font-body font-medium mb-2">
              Compressed Air
            </h3>
            <p className="text-white/70 text-sm font-body leading-relaxed">
              A can of compressed air or a soft bellows removes dust from
              delicate crystal surfaces, cluster crevices, and fragile
              specimens. Keep the can upright to avoid propellant spray.
            </p>
          </div>
          <div className="bg-brand-surface border border-brand-border rounded-xl p-5">
            <h3 className="text-white font-body font-medium mb-2">
              Soft Brush
            </h3>
            <p className="text-white/70 text-sm font-body leading-relaxed">
              A clean, soft-bristled brush (watercolor brush, makeup brush)
              can gently sweep dust from textured surfaces and crystal
              clusters. Never use a stiff brush on soft minerals.
            </p>
          </div>
          <div className="bg-brand-surface border border-brand-border rounded-xl p-5">
            <h3 className="text-white font-body font-medium mb-2">
              Slightly Damp Cloth
            </h3>
            <p className="text-white/70 text-sm font-body leading-relaxed">
              For minerals rated &quot;Brief Rinse Only,&quot; a barely damp cloth
              provides cleaning power without submersion risk. Wring out the
              cloth thoroughly and dry the specimen immediately afterward.
            </p>
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
            href="/care"
            className="text-brand-accent hover:text-white transition-colors"
          >
            Full Crystal Care Guide →
          </Link>
          <Link
            href="/hardness"
            className="text-brand-accent hover:text-white transition-colors"
          >
            Mohs Hardness Scale →
          </Link>
          <Link
            href="/fakes"
            className="text-brand-accent hover:text-white transition-colors"
          >
            Fake-Spotting Guide →
          </Link>
          <Link
            href="/beginners"
            className="text-brand-accent hover:text-white transition-colors"
          >
            Beginners Guide →
          </Link>
          <Link
            href="/identify"
            className="text-brand-accent hover:text-white transition-colors"
          >
            Crystal Identification Guide →
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
