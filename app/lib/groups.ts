import { getAllCrystals } from "@/app/lib/crystals";
import type { Crystal } from "@/app/lib/crystals";

export interface MineralGroup {
  slug: string;
  name: string;
  shortName: string;
  hex: string;
  description: string;
  matchPatterns: string[]; // matched against crystal.category (case-insensitive contains)
  matchIds?: string[]; // override: specific crystal IDs that belong here regardless of category
}

export const MINERAL_GROUPS: MineralGroup[] = [
  {
    slug: "quartz",
    name: "Quartz & Chalcedony",
    shortName: "Quartz",
    hex: "#A78BFA",
    description: "The most abundant mineral family on Earth's surface. Includes macrocrystalline quartz (amethyst, citrine, smoky quartz) and microcrystalline chalcedony (agate, jasper, carnelian). All share the formula SiO₂ but form under different conditions, producing an enormous variety of colors and patterns.",
    matchPatterns: ["quartz", "chalcedony"],
    matchIds: ["aqua-aura-quartz", "opal", "pink-opal", "fire-opal", "boulder-opal", "merlinite", "tanzan-aura-quartz"],
  },
  {
    slug: "feldspar",
    name: "Feldspar Group",
    shortName: "Feldspar",
    hex: "#60A5FA",
    description: "Feldspars make up roughly 60% of Earth's crust, making them the most abundant mineral group on the planet. The family splits into potassium feldspars (moonstone, amazonite) and plagioclase feldspars (labradorite, sunstone). Their optical phenomena - adularescence, labradorescence, aventurescence - make them favorites among gem collectors.",
    matchPatterns: ["feldspar", "feldspathoid"],
    matchIds: ["rainbow-moonstone"],
  },
  {
    slug: "garnet",
    name: "Garnet Group",
    shortName: "Garnet",
    hex: "#EF4444",
    description: "A family of silicate minerals sharing the same crystal structure (isometric) but varying widely in composition. The six main species - almandine, pyrope, spessartine, grossular, andradite, and uvarovite - produce colors from deep red to vivid green. Garnets have been used as gemstones since the Bronze Age.",
    matchPatterns: ["garnet"],
  },
  {
    slug: "tourmaline",
    name: "Tourmaline Group",
    shortName: "Tourmaline",
    hex: "#EC4899",
    description: "Complex borosilicate minerals known for the widest color range of any gem family. The main gem species is elbaite, which produces rubellite (red), indicolite (blue), and verdelite (green). Tourmalines are both pyroelectric and piezoelectric, generating electrical charge from heat and pressure.",
    matchPatterns: ["tourmaline"],
    matchIds: ["tourmaline", "black-tourmaline", "watermelon-tourmaline", "tourmalinated-quartz", "rubellite", "indicolite", "paraiba-tourmaline"],
  },
  {
    slug: "beryl",
    name: "Beryl Family",
    shortName: "Beryl",
    hex: "#34D399",
    description: "One mineral, many gems. Beryl (Be₃Al₂Si₆O₁₈) produces emerald (chromium-green), aquamarine (iron-blue), morganite (manganese-pink), heliodor (iron-yellow), and goshenite (colorless). Trace elements measured in parts per million create entirely different gem identities from the same base mineral.",
    matchPatterns: ["beryl"],
  },
  {
    slug: "carbonate",
    name: "Carbonate Minerals",
    shortName: "Carbonates",
    hex: "#F59E0B",
    description: "Minerals built around the carbonate ion (CO₃²⁻). Calcite and aragonite (both CaCO₃) are the most common, but the group includes vividly colored members like rhodochrosite (pink, manganese), malachite (green, copper), and azurite (blue, copper). All effervesce in acid, the classic field test.",
    matchPatterns: ["carbonate"],
    matchIds: ["malachite", "azurite", "rhodochrosite", "smithsonite", "dolomite", "aragonite", "calcite", "caribbean-calcite", "green-calcite", "orange-calcite", "mangano-calcite", "cobaltocalcite", "optical-calcite", "gaspeite"],
  },
  {
    slug: "sulfide",
    name: "Sulfide Minerals",
    shortName: "Sulfides",
    hex: "#EAB308",
    description: "Metal-sulfur compounds with characteristically metallic lusters. Includes pyrite (fool's gold), galena (lead ore), chalcopyrite (copper ore), and stibnite (antimony ore). Many are important industrial ores. Their metallic appearance and crystal habits make them popular display specimens.",
    matchPatterns: ["sulfide", "sulfosalt"],
  },
  {
    slug: "oxide",
    name: "Oxide & Hydroxide Minerals",
    shortName: "Oxides",
    hex: "#6B7280",
    description: "Metal-oxygen compounds ranging from the hardest natural substances (corundum, Mohs 9) to common iron ores (hematite, magnetite). Includes ruby and sapphire (both corundum), spinel, rutile, and chrysoberyl. This group contains some of the most economically important and gemologically prized minerals.",
    matchPatterns: ["oxide", "hydroxide", "corundum", "chrysoberyl", "spinel"],
    matchIds: ["ruby", "sapphire", "star-sapphire", "spinel", "chrysoberyl", "cats-eye-chrysoberyl", "alexandrite", "goethite", "diaspore", "coltan"],
  },
  {
    slug: "phosphate",
    name: "Phosphate Minerals",
    shortName: "Phosphates",
    hex: "#06B6D4",
    description: "Built around the phosphate ion (PO₄³⁻), this diverse group includes turquoise, apatite (the mineral in your teeth and bones), and vivid collector minerals like wavellite and legrandite. Also includes the arsenate and vanadate subgroups, which share similar crystal structures.",
    matchPatterns: ["phosphate", "arsenate", "vanadate", "apatite"],
    matchIds: ["turquoise", "variscite", "wavellite", "blue-apatite", "fluorapatite", "amblygonite"],
  },
  {
    slug: "sulfate",
    name: "Sulfate Minerals",
    shortName: "Sulfates",
    hex: "#BFDBFE",
    description: "Built around the sulfate ion (SO₄²⁻). Includes selenite/gypsum (the crystal cave mineral), celestite (sky-blue strontium sulfate), and barite (the heaviest common non-metallic mineral). Many form beautiful crystals from evaporating water, giving them associations with clarity and purification.",
    matchPatterns: ["sulfate"],
    matchIds: ["selenite", "celestite", "barite", "desert-rose", "satin-spar", "anhydrite", "anglesite"],
  },
  {
    slug: "native-elements",
    name: "Native Elements & Metals",
    shortName: "Elements",
    hex: "#FCD34D",
    description: "Elements found in their pure, uncombined state in nature. Gold, silver, copper, and platinum occur as native metals. Diamond and graphite are native carbon. Native sulfur forms vivid yellow crystals around volcanoes. These minerals represent nature at its most elemental, literally.",
    matchPatterns: ["native element", "carbide"],
    matchIds: ["gold", "silver", "native-copper", "platinum", "diamond", "native-sulfur", "bismuth"],
  },
  {
    slug: "organic",
    name: "Organic & Biogenic Gems",
    shortName: "Organic",
    hex: "#D97706",
    description: "Not minerals in the strict sense, but natural gem materials produced by biological processes or preserved organic material. Amber is fossilized tree resin. Pearl is layers of aragonite deposited by mollusks. Coral is calcium carbonate from marine organisms. Jet is fossilized wood. Ammolite is iridescent fossilized shell.",
    matchPatterns: ["organic"],
    matchIds: ["amber", "pearl", "coral", "jet", "ammolite", "petrified-wood"],
  },
  {
    slug: "volcanic-glass",
    name: "Volcanic & Impact Glass",
    shortName: "Glass",
    hex: "#1C1917",
    description: "Natural glasses formed by extreme heat events: volcanic eruptions (obsidian), meteorite impacts (tektites, moldavite, Libyan desert glass), and lightning strikes (fulgurite). These lack crystal structure entirely, making them mineraloids rather than true minerals. Their formation stories are among the most dramatic in geology.",
    matchPatterns: ["volcanic glass", "volcanic rock", "impact glass", "tektite", "natural glass", "rhyolite"],
    matchIds: ["obsidian", "mahogany-obsidian", "rainbow-obsidian", "snowflake-obsidian", "moldavite", "tektite", "fulgurite", "libyan-desert-glass", "apache-tear", "lava-rock"],
  },
  {
    slug: "pyroxene-amphibole",
    name: "Pyroxene & Amphibole",
    shortName: "Chain Silicates",
    hex: "#166534",
    description: "Single-chain (pyroxene) and double-chain (amphibole) silicate minerals. Pyroxenes include diopside, spodumene (kunzite/hiddenite), and enstatite. Amphiboles include actinolite, tremolite, and hornblende. When actinolite forms dense interlocking fibers, the result is nephrite jade, one of the toughest natural materials known.",
    matchPatterns: ["pyroxene", "amphibole", "inosilicate", "spodumene"],
    matchIds: ["nephrite", "actinolite", "kunzite", "hiddenite", "bronzite"],
  },
  {
    slug: "mica",
    name: "Mica & Sheet Silicates",
    shortName: "Micas",
    hex: "#C4B5FD",
    description: "Sheet silicates characterized by perfect basal cleavage that allows them to split into thin, flexible sheets. Muscovite (clear), biotite (black), lepidolite (purple, lithium-bearing), and fuchsite (green, chromium-bearing) are the major species. Micas are found in virtually every type of rock on Earth.",
    matchPatterns: ["mica", "phyllosilicate", "clinochlore"],
    matchIds: ["muscovite", "lepidolite", "fuchsite", "seraphinite", "serpentine", "soapstone", "talc", "chrysotile"],
  },
  {
    slug: "zeolite",
    name: "Zeolite Group",
    shortName: "Zeolites",
    hex: "#D1FAE5",
    description: "Hydrated aluminosilicate minerals that form in volcanic cavities (vesicles) when hot groundwater deposits minerals over millions of years. Their open crystal structures can trap and release water and ions, making them natural molecular sieves. Includes stilbite, apophyllite, and scolecite, often found together in spectacular basalt cavity specimens.",
    matchPatterns: ["zeolite"],
    matchIds: ["stilbite", "apophyllite", "scolecite", "prehnite", "okenite", "cavansite"],
  },
  {
    slug: "epidote-zoisite",
    name: "Epidote & Zoisite",
    shortName: "Epidote",
    hex: "#65A30D",
    description: "Calcium-aluminum silicates that form during metamorphism. The epidote group includes pistachio-green epidote and red piemontite. Zoisite produces three dramatically different gem varieties: blue-violet tanzanite, pink thulite, and green anyolite (ruby zoisite). All form through the transformation of existing rocks under heat and pressure.",
    matchPatterns: ["epidote", "zoisite", "sorosilicate"],
    matchIds: ["epidote", "tanzanite", "thulite", "ruby-zoisite", "vesuvianite", "piemontite"],
  },
  {
    slug: "halide",
    name: "Halide Minerals",
    shortName: "Halides",
    hex: "#A78BFA",
    description: "Minerals formed from halogen elements (fluorine, chlorine) bonding with metals. Fluorite (CaF₂) is the definitive member, famous for its cubic crystals and fluorescence (a property literally named after it). Blue halite is ordinary table salt colored by millions of years of natural radiation.",
    matchPatterns: ["halide", "fluorite"],
    matchIds: ["fluorite", "blue-halite"],
  },
  {
    slug: "extraterrestrial",
    name: "Extraterrestrial Materials",
    shortName: "Space",
    hex: "#374151",
    description: "Materials with origins beyond Earth. Iron meteorites are fragments of ancient protoplanetary cores, 4.5 billion years old. Tektites and moldavite are terrestrial rock melted by meteorite impacts and ejected into the atmosphere. Libyan desert glass may have formed from a cosmic airburst over the Sahara.",
    matchPatterns: ["extraterrestrial"],
    matchIds: ["iron-meteorite", "moldavite", "tektite", "libyan-desert-glass"],
  },
  {
    slug: "other-silicates",
    name: "Other Silicates & Gems",
    shortName: "Silicates",
    hex: "#8B5CF6",
    description: "Silicate minerals that don't fit neatly into the major families above. Includes nesosilicates (isolated tetrahedra) like topaz, zircon, and peridot; cyclosilicates (ring structures) like beryl, tourmaline, and dioptase; and unique minerals like charoite, sugilite, and larimar that defy easy categorization. The silicate class is the largest in mineralogy, comprising about 90% of Earth's crust.",
    matchPatterns: ["nesosilicate", "cyclosilicate", "tectosilicate", "silicate mineral", "silicate group", "olivine", "cordierite", "pectolite", "charoite"],
    matchIds: ["topaz", "imperial-topaz", "blue-topaz", "kyanite", "black-kyanite", "zircon", "staurolite", "dumortierite", "peridot", "titanite", "chiastolite", "iolite", "sugilite", "dioptase", "benitoite", "eudialyte", "danburite", "larimar", "charoite", "jade", "wollastonite"],
  },
  {
    slug: "borate-tungstate",
    name: "Borates, Tungstates & Rare Groups",
    shortName: "Rare Groups",
    hex: "#F472B6",
    description: "Smaller mineral groups that each contain only a handful of well-known species. Borates include howlite and ulexite (the television stone). Tungstates include scheelite and wolframite, the ores of the highest-melting metal. Molybdates (wulfenite) and chromates (crocoite) round out these uncommon but visually striking mineral families.",
    matchPatterns: ["borate", "tungstate", "molybdate", "chromate"],
    matchIds: ["howlite", "ulexite", "kornerupine", "scheelite", "wolframite", "wulfenite", "crocoite", "grandidierite", "painite"],
  },
  {
    slug: "rocks-composites",
    name: "Rocks & Multi-Mineral Composites",
    shortName: "Rocks",
    hex: "#78716C",
    description: "Not single minerals but rocks or multi-mineral assemblages valued as gem materials. Lapis lazuli combines lazurite, pyrite, and calcite. Unakite mixes epidote and feldspar. Tiger iron bands tiger eye, hematite, and jasper. These composite stones often tell richer geological stories than any single mineral could.",
    matchPatterns: ["igneous rock", "metamorphic rock", "altered granite", "granite with", "banded iron", "concretion", "sedimentary rock"],
    matchIds: ["lapis-lazuli", "unakite", "septarian", "k2-stone", "nuummite", "preseli-bluestone", "dalmatian-stone", "tigers-iron", "chrysanthemum-stone", "shungite", "tiffany-stone"],
  },
];

// Assign a crystal to its best-fit group
export function getCrystalGroup(crystal: Crystal): MineralGroup | undefined {
  // First check explicit ID matches (highest priority)
  for (const group of MINERAL_GROUPS) {
    if (group.matchIds?.includes(crystal.id)) return group;
  }
  // Then check category pattern matches
  const cat = crystal.category.toLowerCase();
  for (const group of MINERAL_GROUPS) {
    if (group.matchPatterns.some((p) => cat.includes(p.toLowerCase()))) return group;
  }
  return undefined;
}

// Get all groups with their crystals
export function getGroupsWithCrystals(): { group: MineralGroup; crystals: Crystal[] }[] {
  const allCrystals = getAllCrystals();
  return MINERAL_GROUPS.map((group) => ({
    group,
    crystals: allCrystals
      .filter((c) => getCrystalGroup(c)?.slug === group.slug)
      .sort((a, b) => a.name.localeCompare(b.name)),
  })).filter((g) => g.crystals.length > 0);
}
