export interface ColorFamily {
  slug: string;
  name: string;
  hex: string;
  gradient: string;
  matchTerms: string[];
  science: string;
}

export const COLOR_FAMILIES: ColorFamily[] = [
  {
    slug: "purple",
    name: "Purple & Violet",
    hex: "#7C3AED",
    gradient: "linear-gradient(135deg, #5B21B6, #7C3AED, #A78BFA)",
    matchTerms: ["purple", "violet", "lilac", "lavender", "amethyst", "plum", "magenta"],
    science: "Purple in minerals comes from a few specific mechanisms. In quartz (amethyst), iron impurities combined with natural gamma radiation create color centers that absorb yellow light, transmitting purple. In fluorite, rare earth element defects produce violet. In sugilite and charoite, manganese is responsible. The rarity of purple in nature - it requires very specific chemistry - is part of why purple has been associated with royalty across cultures.",
  },
  {
    slug: "blue",
    name: "Blue",
    hex: "#2563EB",
    gradient: "linear-gradient(135deg, #1E40AF, #2563EB, #60A5FA)",
    matchTerms: ["blue", "azure", "cobalt", "indigo", "navy", "cyan", "sapphire", "sky", "periwinkle", "cornflower"],
    science: "Blue is one of the rarest colors in the mineral kingdom, which is why blue gemstones (sapphire, tanzanite, lapis) command premium prices. Most blue minerals get their color from either copper (azurite, chrysocolla, turquoise), iron-titanium charge transfer (sapphire), or vanadium (tanzanite). A few achieve blue through Rayleigh scattering - the same physics that makes the sky blue - where microscopic particles scatter shorter blue wavelengths preferentially.",
  },
  {
    slug: "green",
    name: "Green",
    hex: "#22C55E",
    gradient: "linear-gradient(135deg, #059669, #22C55E, #86EFAC)",
    matchTerms: ["green", "emerald", "olive", "mint", "forest", "teal", "jade", "lime", "sage", "pistachio"],
    science: "Green is the most common color in the mineral kingdom because the two most abundant transition metals - iron and copper - both commonly produce green. Iron in its Fe²⁺ state (as in olivine and epidote) absorbs red light, transmitting green. Copper compounds (malachite, chrysocolla, dioptase) achieve green through different electronic transitions. Chromium, though rarer, produces the finest greens: the pure green of emerald and chrome diopside.",
  },
  {
    slug: "red",
    name: "Red & Orange",
    hex: "#DC2626",
    gradient: "linear-gradient(135deg, #991B1B, #DC2626, #F97316)",
    matchTerms: ["red", "orange", "crimson", "ruby", "scarlet", "cherry", "burgundy", "rust", "saffron", "copper", "salmon"],
    science: "Red in minerals typically comes from iron (Fe³⁺) or chromium. Hematite's red streak, jasper's red, and carnelian's orange-red all derive from iron oxide. Chromium produces the finest reds - ruby gets its pigeon-blood red from just 1-2% chromium in corundum. The rare red of crocoite and vanadinite comes from lead combined with chromium or vanadium. Orange results from intermediate iron oxidation states or from manganese.",
  },
  {
    slug: "pink",
    name: "Pink & Rose",
    hex: "#EC4899",
    gradient: "linear-gradient(135deg, #BE185D, #EC4899, #FDA4AF)",
    matchTerms: ["pink", "rose", "peach", "blush", "raspberry", "salmon", "fuchsia"],
    science: "Pink is a diluted red in most minerals - lower concentrations of the same chromophores that produce red. In rose quartz, the pink comes from microscopic dumortierite fibers. Manganese produces pink in rhodonite, rhodochrosite, kunzite, and morganite. Rubellite (pink tourmaline) gets its color from manganese or sometimes from lithium-related color centers. Pink is relatively rare in gem-quality minerals, which is why pink sapphires, pink diamonds, and fine morganite command significant premiums.",
  },
  {
    slug: "yellow",
    name: "Yellow & Gold",
    hex: "#EAB308",
    gradient: "linear-gradient(135deg, #CA8A04, #EAB308, #FDE68A)",
    matchTerms: ["yellow", "gold", "golden", "honey", "amber", "lemon", "straw", "champagne"],
    science: "Yellow in minerals most commonly comes from iron in specific oxidation states. Citrine's yellow is from Fe³⁺ color centers. Sulfur produces vivid yellow in native sulfur and bumble bee jasper. Gold's yellow is intrinsic - it results from relativistic effects on gold's electron orbitals that cause it to absorb blue light. Yellow topaz, yellow sapphire, and heliodor (yellow beryl) each achieve yellow through different trace element mechanisms.",
  },
  {
    slug: "black",
    name: "Black & Dark",
    hex: "#1C1917",
    gradient: "linear-gradient(135deg, #0A0A0A, #292524, #44403C)",
    matchTerms: ["black", "dark", "jet", "ebony", "obsidian"],
    science: "Black in minerals results from several mechanisms. In obsidian, the dark color comes from concentrated iron and magnesium in volcanic glass. In tourmaline (schorl), high iron content absorbs virtually all visible light. In hematite, dense iron oxide packing creates opacity. In jet and shungite, carbon is responsible. Metallic black minerals like galena and magnetite appear dark because their metallic bonding absorbs and re-emits light at all wavelengths equally.",
  },
  {
    slug: "white",
    name: "White & Colorless",
    hex: "#F5F5F4",
    gradient: "linear-gradient(135deg, #FAFAF9, #F5F5F4, #E7E5E4)",
    matchTerms: ["white", "clear", "colorless", "translucent", "milky", "ice", "snow"],
    science: "White and colorless minerals are 'pure' - they lack the transition metal impurities that produce color. Clear quartz is pure SiO₂ without iron (which would make it amethyst or citrine). Diamond is pure carbon. Calcite is pure CaCO₃. White minerals like howlite and selenite scatter light from their microcrystalline structure rather than transmitting it. The transparency difference between clear quartz and milky quartz comes from microscopic fluid inclusions that scatter light.",
  },
];

export function getColorFamily(slug: string): ColorFamily | undefined {
  return COLOR_FAMILIES.find((c) => c.slug === slug);
}
