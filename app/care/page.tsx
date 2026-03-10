import Link from "next/link";
import { getAllCrystals } from "@/app/lib/crystals";
import type { Crystal } from "@/app/lib/crystals";
import type { Metadata } from "next";

export function generateMetadata(): Metadata {
  const count = getAllCrystals().length;
  return {
    title: "Crystal Care Guide - Water, Sunlight & Handling",
    description: `Which crystals can go in water? Which fade in sunlight? The complete care reference for ${count} crystals and minerals, based on mineral science.`,
  };
}

interface CareInfo {
  id: string;
  name: string;
  colorHex: string;
  hardness: number;
  water: "safe" | "brief" | "avoid" | "dissolves";
  sun: "safe" | "caution" | "fades" | "avoid";
  fragile: boolean;
  notes: string;
}

// Water safety based on mineral properties
function getWaterSafety(crystal: Crystal): "safe" | "brief" | "avoid" | "dissolves" {
  const name = crystal.name.toLowerCase();
  const id = crystal.id;
  // Dissolves in water
  if (["selenite", "angelite", "desert-rose"].includes(id)) return "dissolves";
  if (name.includes("halite") || name.includes("gypsum")) return "dissolves";
  // Avoid water - soft, porous, or reactive
  if (crystal.hardness <= 3) return "avoid";
  if (["malachite", "azurite", "chrysocolla", "lepidolite", "lapis-lazuli", "pyrite", "hematite", "galena", "vanadinite", "wulfenite", "crocoite", "cuprite", "native-copper", "gold", "silver", "calcite", "aragonite", "rhodochrosite", "celestite", "amber", "pearl", "jet", "coral", "turquoise", "howlite", "shungite", "k2-stone", "bumble-bee-jasper", "magnetite", "coral", "cinnabar", "peacock-ore", "mimetite", "adamite", "pyromorphite", "cassiterite", "vivianite", "caribbean-calcite", "dolomite", "epidote", "scolecite", "stilbite", "cavansite", "bismuth", "moldavite", "realgar", "orpiment", "stibnite", "erythrite", "legrandite", "marcasite", "aurichalcite", "cobaltocalcite", "chalcopyrite", "shattuckite", "creedite", "covellite", "iron-meteorite"].includes(id)) return "avoid";
  // Brief rinse only
  if (crystal.hardness <= 5) return "brief";
  if (["fluorite", "fluorapatite", "apophyllite", "kunzite", "moonstone", "opal", "sunstone", "larimar", "amazonite", "labradorite", "kyanite"].includes(id)) return "brief";
  // Safe
  return "safe";
}

// Sun safety based on known light-sensitive minerals
function getSunSafety(crystal: Crystal): "safe" | "caution" | "fades" | "avoid" {
  const id = crystal.id;
  // Known to fade significantly
  if (["amethyst", "kunzite", "rose-quartz", "smoky-quartz", "chrysoprase", "celestite", "fluorite", "ametrine", "hackmanite", "tugtupite", "hiddenite"].includes(id)) return "fades";
  // Caution - may fade with prolonged exposure
  if (["aquamarine", "citrine", "blue-lace-agate", "larimar", "turquoise", "opal", "amber", "prasiolite", "spirit-quartz", "grape-agate", "pink-opal", "fire-opal", "pink-amethyst"].includes(id)) return "caution";
  // Avoid - structurally affected
  if (["selenite", "pearl", "realgar", "vivianite"].includes(id)) return "avoid";
  return "safe";
}

function getFragility(crystal: Crystal): boolean {
  const id = crystal.id;
  if (crystal.hardness <= 3) return true;
  if (["selenite", "celestite", "apophyllite", "scolecite", "stilbite", "wulfenite", "crocoite", "cavansite", "kunzite", "kyanite", "bismuth", "seraphinite", "desert-rose", "vanadinite", "cuprite", "okenite", "aurichalcite", "stibnite", "fulgurite", "erythrite", "marcasite", "creedite", "covellite", "astrophyllite"].includes(id)) return true;
  return false;
}

function getCareNotes(crystal: Crystal): string {
  const id = crystal.id;
  const notes: Record<string, string> = {
    "selenite": "Dissolves in water. Store dry. Clean with dry cloth only.",
    "angelite": "Reverts to gypsum in water. Never cleanse wet.",
    "desert-rose": "Extremely fragile and water-soluble (selenite variety). Display only.",
    "malachite": "Copper content makes it toxic if ingested. Do not use for gem elixirs. Avoid prolonged water contact.",
    "azurite": "Slowly converts to malachite naturally. Avoid water, heat, and acids.",
    "pyrite": "Iron sulfide oxidizes when wet. Can develop sulfuric acid residue. Keep dry.",
    "galena": "Contains lead. Wash hands after handling. Keep away from children.",
    "vanadinite": "Contains lead. Handle with care. Never use for gem elixirs.",
    "wulfenite": "Contains lead. Very fragile. Display only.",
    "crocoite": "Contains lead and hexavalent chromium. Handle carefully.",
    "bumble-bee-jasper": "Contains arsenic minerals. Never use for gem elixirs. Wash hands after handling.",
    "chrysocolla": "Porous and soft. Brief rinse acceptable but don't soak.",
    "amber": "Organic gem. Avoid chemicals, perfumes, heat. Clean with damp cloth.",
    "pearl": "Organic gem. Avoid chemicals and perfume. Wipe with soft damp cloth after wearing. Store separately.",
    "jet": "Organic gem. Warm to touch. Clean with damp cloth only.",
    "opal": "Contains water (up to 20%). Avoid heat and dry environments. Can crack from dehydration.",
    "turquoise": "Porous. Absorbs oils and chemicals which change color. Avoid sunscreen, perfume, and soap.",
    "kunzite": "Fades permanently in sunlight. Store in dark when not wearing. Evening stone only.",
    "amethyst": "Prolonged sunlight exposure fades purple color. Display away from windows.",
    "rose-quartz": "Can fade in strong sunlight. Store away from direct sun.",
    "fluorite": "Perfect cleavage makes it fragile. Can fade in strong light. Avoid thermal shock.",
    "apophyllite": "Perfect basal cleavage. Very fragile. Handle with extreme care.",
    "scolecite": "Needle crystals are extremely fragile. Display only.",
    "celestite": "Fragile, fades in light, and softens in water. Ideal display conditions only.",
    "moldavite": "Relatively fragile for jewelry. Avoid impacts.",
    "moonstone": "Has cleavage. Avoid hard impacts. Brief rinse fine.",
    "labradorite": "Has cleavage planes. Avoid thermal shock. Brief rinse fine.",
    "lapis-lazuli": "Contains pyrite and calcite. Avoid water and acids.",
    "gold": "Extremely stable. Doesn't tarnish. Can be cleaned with mild soap and water.",
    "silver": "Tarnishes in air. Store in anti-tarnish cloth. Clean with silver polish.",
    "diamond": "Extremely durable. Safe for ultrasonic cleaning. Avoid hard impacts along cleavage.",
    "bismuth": "Lab-grown rainbow surface may tarnish over time. Avoid water.",
    "lepidolite": "Mica structure can delaminate if wet. Keep dry.",
    "coral": "Organic gem. Avoid chemicals, perfume, ultrasonic cleaners. Clean with damp cloth.",
    "cinnabar": "TOXIC: Contains mercury. Handle briefly, wash hands immediately. Display in enclosed case. Never heat or grind.",
    "moissanite": "Extremely durable (9.25 Mohs). Safe for ultrasonic cleaning. Nearly indestructible for jewelry.",
    "caribbean-calcite": "Dissolves in water. Very soft. Clean with dry cloth only. Store carefully.",
    "peacock-ore": "Acid-treated surface may dull over time. Avoid water. Handle minimally.",
    "vivianite": "Darkens irreversibly in light. Store in complete darkness to preserve color. Extremely soft and fragile.",
    "mimetite": "Contains lead and arsenic. Display only. Wash hands after handling.",
    "adamite": "Contains arsenic. Display only. Wash hands after handling. Beautiful but toxic.",
    "pyromorphite": "Contains lead. Handle with care. Wash hands afterward.",
    "cassiterite": "Heavy and durable but avoid prolonged water contact.",
    "enhydro-quartz": "Avoid temperature extremes - trapped water can expand and crack the crystal.",
    "realgar": "TOXIC: Contains arsenic. Decomposes in sunlight into yellow powder. Store in complete darkness. Handle briefly, wash hands immediately. Display in enclosed case.",
    "orpiment": "TOXIC: Contains arsenic. Light-sensitive. Store away from sunlight. Handle briefly, wash hands immediately. Never heat or grind.",
    "erythrite": "TOXIC: Contains cobalt and arsenic. Display only. Wash hands after handling. Never use for gem elixirs.",
    "legrandite": "Contains arsenic. Display only. Wash hands after handling. Do not use for gem elixirs.",
    "stibnite": "Contains antimony. Wash hands after handling. Extremely soft and fragile. Handle by matrix only.",
    "marcasite": "Chemically unstable. Decomposes in humidity into sulfuric acid ('pyrite disease'). Keep dry. Store with desiccant packets. Inspect periodically for white powdery residue.",
    "okenite": "EXTREMELY fragile. Never touch crystal fibers - skin oils permanently mat them. Handle by matrix only. Store in protective display case.",
    "aurichalcite": "EXTREMELY fragile. Delicate crystal tufts crush on contact. Display only. Store in padded display case.",
    "fulgurite": "Extremely fragile hollow tubes. Handle with extreme care. Many specimens break during transport.",
    "hackmanite": "Color changes with UV/sunlight exposure (tenebrescence). Not damaging but color fades in dark, returns in UV. Store in light for strongest color.",
    "tugtupite": "Color deepens in sunlight, fades in dark (tenebrescence). Strong UV fluorescence. Handle normally.",
    "hiddenite": "Can fade with prolonged UV exposure. Store away from direct sunlight. Has perfect cleavage - avoid impacts.",
    "fire-opal": "Contains water like all opal. Avoid sudden temperature changes. Can crack from dehydration. More stable than Australian opal but still sensitive.",
    "boulder-opal": "Ironstone backing provides stability but opal layer is still sensitive to heat and dehydration. Avoid ultrasonic cleaners.",
    "nephrite": "Toughest natural material. Virtually indestructible. Safe for water, mild soap. One of the most durable stones for jewelry.",
    "cobaltocalcite": "Soft (Mohs 3). Avoid water. Clean with dry cloth only. Handle carefully to preserve druzy crystal surfaces.",
    "optical-calcite": "Perfect cleavage in three directions. Avoid impacts. Clean carefully. Fascinating double-refraction demonstration piece.",
    "imperial-topaz": "Durable (Mohs 8) but has perfect basal cleavage. Avoid sharp impacts. Safe for gentle cleaning.",
    "blue-halite": "DISSOLVES IN WATER. Store in completely dry environment with desiccant packets. Even humidity can damage. Display in enclosed case.",
    "creedite": "Extremely fragile needle crystals. Display only. Handle by matrix. Even gentle contact can snap crystal tips.",
    "covellite": "Extremely soft (Mohs 1.5) with perfect cleavage. Tarnishes in air. Avoid water. Handle minimally.",
    "chalcopyrite": "Sulfide mineral that oxidizes when wet. Acid-treated 'peacock' surfaces may dull over time. Keep dry.",
    "shattuckite": "Copper silicate, relatively soft. Avoid prolonged water contact. Clean with dry cloth.",
    "blue-topaz": "Very durable (Mohs 8). Safe for jewelry and cleaning. Has basal cleavage so avoid sharp impacts along that plane.",
    "rainbow-moonstone": "Has feldspar cleavage. Avoid hard impacts. Brief rinse fine. Store separately from harder stones.",
    "gaspeite": "Nickel carbonate. Avoid prolonged water contact. Relatively soft (4.5). Clean with dry cloth.",
    "pink-amethyst": "Same care as amethyst. May fade with prolonged strong sunlight exposure. Durable for display and handling.",
    "platinum": "Extremely durable. Doesn't tarnish. Safe for water and mild soap cleaning. Virtually indestructible.",
    "native-sulfur": "FLAMMABLE. Keep away from heat, flame, and sparks. Can crack from thermal shock (even body heat on cold specimens). Store at stable room temperature. Never heat. Wash hands after handling.",
    "iron-meteorite": "RUSTS if exposed to moisture. Store with desiccant packets in sealed container. If surface shows orange rust spots, treat with gun oil or Renaissance Wax. Never submerge in water. Handle with clean dry hands.",
    "wolframite": "Very heavy and durable. Avoid prolonged water contact. Clean with dry cloth. The density can surprise you - handle securely.",
    "gypsum": "DISSOLVES IN WATER. This includes selenite towers and satin spar. Never cleanse with water. Store in dry conditions. Extremely soft (Mohs 2).",
    "talc": "The softest mineral (Mohs 1). Scratches with fingernail. Handle gently. Dust can be an irritant if inhaled. Clean with dry cloth only.",
    "marble": "Soft (Mohs 3) and acid-sensitive. Avoid vinegar, lemon juice, and acidic cleaners. Stains easily. Clean with pH-neutral soap only.",
    "limestone": "Soft and acid-sensitive like marble. Effervesces in vinegar. Avoid acidic cleaners. Fossils within may be fragile.",
    "soapstone": "Very soft (talc-based). Scratches easily. Oil or wax can enhance and protect the surface. Do not use abrasive cleaners.",
    "granite": "Extremely durable. Safe for water, mild cleaners. One of the most resilient natural stones. Avoid only harsh acids on polished surfaces.",
    "basalt": "Dense and durable. Safe for water. Used in hot stone massage due to excellent heat retention. Handle carefully when heated.",
    "painite": "Durable (Mohs 8). Safe for careful handling. Extremely valuable - store securely in padded display.",
    "red-beryl": "Durable (Mohs 7.5) but extremely valuable. Handle with care due to investment value, not fragility. Store securely.",
  };
  return notes[id] || (crystal.hardness >= 7 ? "Durable. Safe for cleaning with mild soap and water." : "Clean with dry or slightly damp cloth. Store away from harder minerals.");
}

const WATER_LABELS = {
  safe: { text: "Water Safe", color: "text-emerald-400", bg: "bg-emerald-500/10" },
  brief: { text: "Brief Rinse", color: "text-amber-400", bg: "bg-amber-500/10" },
  avoid: { text: "Avoid Water", color: "text-rose-400", bg: "bg-rose-500/10" },
  dissolves: { text: "Dissolves!", color: "text-red-500", bg: "bg-red-500/15" },
};

const SUN_LABELS = {
  safe: { text: "Sun Safe", color: "text-emerald-400", bg: "bg-emerald-500/10" },
  caution: { text: "Limit Sun", color: "text-amber-400", bg: "bg-amber-500/10" },
  fades: { text: "Fades in Sun", color: "text-rose-400", bg: "bg-rose-500/10" },
  avoid: { text: "Avoid Sun", color: "text-red-500", bg: "bg-red-500/15" },
};

export default function CarePage() {
  const crystals = getAllCrystals();
  const careData: CareInfo[] = crystals
    .map((c) => ({
      id: c.id,
      name: c.name,
      colorHex: c.colorHexes[0] || "#A78BFA",
      hardness: c.hardness,
      water: getWaterSafety(c),
      sun: getSunSafety(c),
      fragile: getFragility(c),
      notes: getCareNotes(c),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const waterDanger = careData.filter((c) => c.water === "dissolves" || c.water === "avoid");
  const sunDanger = careData.filter((c) => c.sun === "fades" || c.sun === "avoid");
  const toxicStones = careData.filter((c) =>
    ["galena", "vanadinite", "wulfenite", "crocoite", "bumble-bee-jasper", "malachite", "cinnabar", "mimetite", "adamite", "pyromorphite", "realgar", "orpiment", "erythrite", "legrandite", "stibnite"].includes(c.id)
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <p className="text-brand-accent text-sm uppercase tracking-[0.15em] font-body mb-4">
        Reference
      </p>
      <h1 className="font-heading text-4xl md:text-5xl text-white">
        Crystal Care <em>Guide</em>
      </h1>
      <p className="text-brand-muted text-lg font-body mt-4 max-w-2xl leading-relaxed">
        Water safety, sunlight sensitivity, fragility, and handling notes for
        every stone in our encyclopedia. Based on mineral science, not
        guesswork.
      </p>

      {/* Quick warnings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-5">
          <h3 className="text-rose-400 font-body font-medium text-sm mb-2">
            Never Put in Water
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {waterDanger.slice(0, 12).map((c) => (
              <Link
                key={c.id}
                href={`/crystals/${c.id}`}
                className="text-xs font-body text-white/70 hover:text-rose-400 transition-colors"
              >
                {c.name}{c !== waterDanger[Math.min(11, waterDanger.length - 1)] ? "," : ""} 
              </Link>
            ))}
            {waterDanger.length > 12 && (
              <span className="text-xs text-white/40 font-body">
                +{waterDanger.length - 12} more
              </span>
            )}
          </div>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-5">
          <h3 className="text-amber-400 font-body font-medium text-sm mb-2">
            Keep Out of Sunlight
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {sunDanger.map((c) => (
              <Link
                key={c.id}
                href={`/crystals/${c.id}`}
                className="text-xs font-body text-white/70 hover:text-amber-400 transition-colors"
              >
                {c.name}{c !== sunDanger[sunDanger.length - 1] ? "," : ""}
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-red-500/15 border border-red-500/20 rounded-xl p-5">
          <h3 className="text-red-400 font-body font-medium text-sm mb-2">
            Toxic - Handle With Care
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {toxicStones.map((c) => (
              <Link
                key={c.id}
                href={`/crystals/${c.id}`}
                className="text-xs font-body text-white/70 hover:text-red-400 transition-colors"
              >
                {c.name}{c !== toxicStones[toxicStones.length - 1] ? "," : ""}
              </Link>
            ))}
          </div>
          <p className="text-white/40 text-xs font-body mt-2">
            Contain lead, arsenic, antimony, or mercury. Wash hands after handling. Never
            use for gem elixirs.
          </p>
        </div>
      </div>

      {/* Why section */}
      <div className="mt-12 bg-brand-surface border border-brand-border rounded-xl p-6">
        <h2 className="font-heading text-xl text-white mb-3">
          Why Some Crystals Can't Get Wet
        </h2>
        <div className="text-white/80 text-sm font-body leading-relaxed space-y-3">
          <p>
            Water damage in minerals happens through three mechanisms.
            <strong className="text-white"> Dissolution</strong> - some minerals
            (selenite, halite) are water-soluble and literally dissolve.
            <strong className="text-white"> Chemical reaction</strong> - iron-bearing
            minerals like pyrite react with water to form acids that damage the
            specimen. <strong className="text-white">Absorption</strong> - porous
            minerals (turquoise, opal) absorb water, which can change color,
            weaken structure, or carry contaminants into the stone.
          </p>
          <p>
            Sunlight fading occurs when UV photons destabilize the color centers
            in certain minerals. The same iron impurities that create amethyst's
            purple, when hit by UV light, gradually lose their radiation-induced
            color configuration. This process is irreversible.
          </p>
        </div>
      </div>

      {/* Full table */}
      <div className="mt-12">
        <h2 className="font-heading text-2xl text-white mb-6">
          Complete Care Reference
        </h2>
        <div className="space-y-2">
          {careData.map((care) => {
            const water = WATER_LABELS[care.water];
            const sun = SUN_LABELS[care.sun];
            return (
              <div
                key={care.id}
                className="bg-brand-surface border border-brand-border rounded-lg p-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                  <div className="flex items-center gap-2 sm:w-48 shrink-0">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: care.colorHex }}
                    />
                    <Link
                      href={`/crystals/${care.id}`}
                      className="text-white font-body font-medium hover:text-brand-accent transition-colors"
                    >
                      {care.name}
                    </Link>
                  </div>

                  <div className="flex flex-wrap gap-2 sm:w-64 shrink-0">
                    <span
                      className={`${water.bg} ${water.color} text-xs font-body px-2 py-0.5 rounded-full`}
                    >
                      {water.text}
                    </span>
                    <span
                      className={`${sun.bg} ${sun.color} text-xs font-body px-2 py-0.5 rounded-full`}
                    >
                      {sun.text}
                    </span>
                    {care.fragile && (
                      <span className="bg-orange-500/10 text-orange-400 text-xs font-body px-2 py-0.5 rounded-full">
                        Fragile
                      </span>
                    )}
                  </div>

                  <p className="text-white/60 text-xs font-body leading-relaxed flex-1">
                    {care.notes}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
