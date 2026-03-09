export interface Collection {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  disclaimer: string;
  accentColor: string;
  crystalIds: string[];
  reasons: Record<string, string>; // crystalId -> why it belongs
}

export const COLLECTIONS: Collection[] = [
  {
    slug: "calming",
    title: "The Calming Collection",
    subtitle: "Stones Traditionally Associated with Calm & Anxiety Relief",
    description: "Across cultures and centuries, certain minerals have been consistently associated with calming energy and emotional regulation. Whether through the ritual of holding a smooth stone during stress, the meditative focus of examining a crystal's internal structure, or the cultural weight of a 3,000-year tradition, these stones have earned their reputation as tools for finding stillness.",
    disclaimer: "These associations are cultural traditions, not medical claims. If you experience anxiety, please consult a healthcare professional. Crystals are not substitutes for professional care.",
    accentColor: "#93C5FD",
    crystalIds: ["amethyst", "lepidolite", "blue-lace-agate", "howlite", "smoky-quartz", "celestite", "angelite", "amazonite", "kunzite", "chrysocolla"],
    reasons: {
      "amethyst": "The ancient Greeks' anti-anxiety stone. Its name literally means 'not intoxicated' - they believed it calmed the mind.",
      "lepidolite": "Contains lithium, the element used in mood-stabilizing medication. The lithium isn't bioavailable through touch, but the association is notable.",
      "blue-lace-agate": "The quintessential throat-chakra stone. Practitioners use it for calming anxiety around speaking and communication.",
      "howlite": "Associated with slowing an overactive mind. Its white color with gray veining suggests marble calm.",
      "smoky-quartz": "Considered the premier grounding stone. Scottish Highlanders carried cairngorm (smoky quartz) for stability.",
      "celestite": "Named for its heavenly blue color. Placed in bedrooms for peaceful energy.",
      "angelite": "Blue anhydrite associated with gentle, calming energy and angelic connection.",
      "amazonite": "Called the 'hope stone.' Associated with setting healthy boundaries and reducing worry.",
      "kunzite": "Connected to unconditional love and emotional calming. Its gentle pink energy is considered soothing.",
      "chrysocolla": "Cleopatra reportedly carried it for diplomatic calm. Associated with thoughtful communication.",
    },
  },
  {
    slug: "protection",
    title: "The Protection Collection",
    subtitle: "Stones with the Longest Traditions of Protective Use",
    description: "Protection stones represent one of the oldest and most universal uses of minerals in human culture. Roman soldiers rubbed hematite on their bodies before battle. Aztec priests carved obsidian mirrors to ward off evil. Turquoise has been sewn into horse bridles, set in sword hilts, and worn as amulets across four continents. Whatever your relationship with these traditions, the cultural history is rich and genuinely ancient.",
    disclaimer: "Protective associations are cultural and historical traditions. Crystal Almanac documents these traditions without endorsing supernatural claims.",
    accentColor: "#1C1917",
    crystalIds: ["black-tourmaline", "obsidian", "hematite", "tiger-eye", "labradorite", "smoky-quartz", "amethyst", "turquoise", "malachite", "shungite"],
    reasons: {
      "black-tourmaline": "The most popular protection stone in the modern crystal market. Pyroelectric and piezoelectric properties were observed centuries before they were scientifically explained.",
      "obsidian": "Aztec priests used obsidian mirrors for scrying and protection. The volcanic glass has been associated with shielding across Mesoamerican cultures for millennia.",
      "hematite": "Roman soldiers rubbed it on their bodies believing it made them invincible. The name means 'blood stone' in Greek.",
      "tiger-eye": "Ancient Egyptian deity statues had tiger's eye eyes. The chatoyant shimmer was believed to represent all-seeing divine vision.",
      "labradorite": "Inuit legend says the Northern Lights were trapped in coastal rocks until a warrior freed them with his spear - the remaining light became labradorite.",
      "smoky-quartz": "Scottish Highlanders set smoky quartz (cairngorm) in dagger handles and brooches for protection in battle and travel.",
      "amethyst": "Medieval European soldiers wore amethyst amulets for protection in battle. The stone has been associated with sobriety and clear-headedness since antiquity.",
      "turquoise": "One of the most universally protective stones. Persian horsemen attached it to bridles, believing it prevented falls. Native American peoples used it in ceremony for thousands of years.",
      "malachite": "Ancient Egyptians associated malachite with protective goddess Hathor. Used as eye paint partly for its perceived protective qualities.",
      "shungite": "Peter the Great established the first Russian spa at Karelian shungite deposits. Russian folk tradition associates it with purification.",
    },
  },
  {
    slug: "love",
    title: "The Love Collection",
    subtitle: "Stones Associated with Love, Relationships & the Heart",
    description: "The connection between pink and green stones and matters of the heart stretches across cultures and centuries. Rose quartz was placed in tombs by ancient Egyptians as a love token. Emerald was Cleopatra's obsession. Rhodochrosite carries the Incan tradition of petrified rulers' blood. These associations aren't random - they reflect deep cultural patterns connecting color, beauty, and emotional meaning.",
    disclaimer: "These are cultural and historical traditions. Crystals do not cause romantic attraction or heal relationships. They can, however, serve as meaningful tokens and meditation tools.",
    accentColor: "#EC4899",
    crystalIds: ["rose-quartz", "rhodochrosite", "emerald", "morganite", "kunzite", "rhodonite", "pink-opal", "watermelon-tourmaline", "chrysoprase", "unakite"],
    reasons: {
      "rose-quartz": "The universal love stone. Ancient Egyptians placed rose quartz face masks in tombs. Romans and Greeks associated it with Aphrodite/Venus.",
      "rhodochrosite": "Called 'Rosa del Inca' - the Incan rose. Argentina's national gemstone, associated with passionate, compassionate love.",
      "emerald": "Cleopatra's stone. Associated with successful love and loyalty across cultures from Egyptian to Mughal to European.",
      "morganite": "Named after J.P. Morgan. Rising as an engagement ring alternative - its gentle pink and beryl durability make it practical and beautiful.",
      "kunzite": "Named by Tiffany's gemologist. Connected to unconditional love and vulnerability. Its light-sensitivity is interpreted as a metaphor for protecting tender feelings.",
      "rhodonite": "The 'rescue stone.' Associated with emotional healing after heartbreak, particularly forgiveness and rebuilding trust.",
      "pink-opal": "Peru's national stone. Inca tradition connects it to Pachamama (Earth Mother) energy. Considered the gentlest heart stone.",
      "watermelon-tourmaline": "Pink core + green rim maps to the heart chakra's dual energy: emotional love (pink) and growth (green).",
      "chrysoprase": "Alexander the Great wore chrysoprase into battle. Associated with Venus in medieval tradition.",
      "unakite": "Green epidote + pink feldspar. Used in fertility-related traditions and for balancing giving and receiving in relationships.",
    },
  },
  {
    slug: "creativity",
    title: "The Creative Collection",
    subtitle: "Stones Associated with Creative Expression & Inspiration",
    description: "Artists, writers, and musicians have reached for specific stones for centuries. Carnelian was the signet stone of architects and builders in ancient Egypt. Citrine sat on the desks of Renaissance merchants who valued both creative problem-solving and prosperity. The connection between warm-colored stones and creative fire runs deep in Western and Eastern traditions alike.",
    disclaimer: "Creative associations are cultural traditions. Crystals don't generate ideas, but they can serve as focus objects during creative practice.",
    accentColor: "#F97316",
    crystalIds: ["carnelian", "citrine", "sunstone", "fire-agate", "ametrine", "fluorite", "labradorite", "azurite", "wulfenite", "sphalerite"],
    reasons: {
      "carnelian": "Ancient Egyptian architects and builders wore carnelian. Associated with bold creative action and the courage to present work publicly.",
      "citrine": "Called 'the merchant's stone.' Associated with both creative vision and the ability to manifest ideas into reality.",
      "sunstone": "Contains actual metallic copper. The internal fire is associated with creative warmth, enthusiasm, and leadership in artistic pursuits.",
      "fire-agate": "Thin-film interference creates literal fire inside the stone. Associated with creative passion and the courage to reveal hidden beauty.",
      "ametrine": "Half amethyst, half citrine. The dual nature represents integrating creative intuition (purple) with practical execution (gold).",
      "fluorite": "Called 'the genius stone' by some practitioners. Its wide color range and geometric crystal forms are associated with mental clarity and creative organization.",
      "labradorite": "The flash of color from within represents the spark of inspiration emerging from the subconscious.",
      "azurite": "Renaissance painters ground it into blue pigment. Literally the color of creative expression in medieval and Renaissance art.",
      "wulfenite": "Called 'the painter's stone.' Its vivid orange and thin tabular form are associated with artistic vision.",
      "sphalerite": "Has three times diamond's fire. Associated with creative brilliance and the energy to pursue ambitious projects.",
    },
  },
  {
    slug: "grounding",
    title: "The Grounding Collection",
    subtitle: "Stones Associated with Stability, Focus & Earth Connection",
    description: "Grounding stones share a pattern: they're typically dark, dense, and often metallic or earthy in appearance. This isn't coincidence. The heaviest, most earth-connected minerals naturally suggest stability. When you hold a piece of hematite and feel its unexpected weight, or run your thumb across a polished obsidian surface, the physical experience itself is grounding. These stones have been used for centering practices across cultures.",
    disclaimer: "Grounding associations are cultural traditions. The physical experience of holding a dense, smooth stone can be genuinely calming through tactile focus, but this is a sensory effect, not a metaphysical one.",
    accentColor: "#78716C",
    crystalIds: ["hematite", "black-tourmaline", "obsidian", "smoky-quartz", "tiger-eye", "jasper", "garnet", "bloodstone", "shungite", "magnetite"],
    reasons: {
      "hematite": "Specific gravity 5.26 - it feels shockingly heavy. The physical weight creates an immediate sense of substance and connection to earth.",
      "black-tourmaline": "The most popular grounding crystal. Its striated crystal faces and solid black color reinforce the 'rooted' association.",
      "obsidian": "Volcanic glass - literally born from the Earth's interior. Its solid, grounding quality has been recognized since the Stone Age.",
      "smoky-quartz": "Scotland's national gemstone. The Gaelic tradition of carrying cairngorm for grounding is centuries old.",
      "tiger-eye": "The chatoyant shimmer requires slow, focused observation. The act of watching the light move is itself a grounding practice.",
      "jasper": "Called 'the supreme nurturer.' Jasper varieties have been used as grounding stones across virtually every culture with access to the mineral.",
      "garnet": "Deep red, dense, and ancient. Associated with root chakra stability and physical vitality across Hindu and Western traditions.",
      "bloodstone": "Roman gladiators carried it for endurance. The combination of earth-green with blood-red spots symbolizes life force rooted in the physical world.",
      "shungite": "2 billion years old. The sheer geological age of this carbon-rich rock connects it to deep Earth history.",
      "magnetite": "Literally magnetic. Lodestone's physical pull on iron is the most dramatic demonstration of Earth energy in any mineral.",
    },
  },
  {
    slug: "abundance",
    title: "The Abundance Collection",
    subtitle: "Stones Traditionally Associated with Prosperity & Success",
    description: "Gold-colored and green stones have been associated with wealth across cultures for obvious symbolic reasons - they resemble the things they're meant to attract. But the traditions run deeper than simple color association. Jade has been more valuable than gold in Chinese culture for millennia. Pyrite's metallic luster earned it the name 'fool's gold' precisely because people confused it with the real thing. These stones represent humanity's long relationship with material aspiration.",
    disclaimer: "Prosperity associations are cultural traditions. No mineral attracts money. These stones can serve as reminders of financial goals during intentional practice.",
    accentColor: "#F59E0B",
    crystalIds: ["citrine", "pyrite", "jade", "aventurine", "gold", "tiger-eye", "malachite", "sunstone", "emerald", "moss-agate"],
    reasons: {
      "citrine": "Called 'the merchant's stone.' Shopkeepers historically placed citrine in cash registers. Associated with abundance and manifestation.",
      "pyrite": "'Fool's gold' - its resemblance to gold is so convincing it fooled prospectors. Associated with attracting wealth and recognizing opportunity.",
      "jade": "More valuable than gold in imperial Chinese culture. Associated with prosperity, longevity, and nobility for over 5,000 years.",
      "aventurine": "Called 'the stone of opportunity.' Green aventurine is one of the most popular prosperity stones in the crystal market.",
      "gold": "The eternal metal. Every civilization in human history has associated gold with wealth, power, and divine favor.",
      "tiger-eye": "Associated with practical decision-making and financial wisdom. The chatoyant eye is said to see through deception in business.",
      "malachite": "Used as a merchant's talisman in the Middle Ages. Its banded green patterns were associated with growing wealth.",
      "sunstone": "Contains actual copper. The warm metallic shimmer is associated with solar energy, leadership, and attracting success.",
      "emerald": "The gem of royalty and wealth. Cleopatra, Mughal emperors, and European monarchs all hoarded emeralds as symbols of power.",
      "moss-agate": "European farmers placed moss agate in fields for abundant harvests. The oldest agricultural prosperity stone tradition in Western culture.",
    },
  },
  {
    slug: "communication",
    title: "The Communication Collection",
    subtitle: "Stones Associated with Expression, Truth & Clear Thinking",
    description: "Blue and blue-green stones dominate the communication category across crystal traditions - a pattern that maps to throat chakra associations in Hindu tradition and to sky/heaven symbolism in Western and Middle Eastern cultures. The association between blue stones and truth-telling is remarkably consistent: lapis lazuli was the stone of Ma'at (Egyptian goddess of truth), turquoise was the 'truth stone' in Persian culture, and aquamarine was carried by sailors who needed to speak clearly under pressure.",
    disclaimer: "Communication associations are cultural traditions. Crystals do not improve speaking ability. They can serve as focus objects for communication-related intentions.",
    accentColor: "#38BDF8",
    crystalIds: ["blue-lace-agate", "aquamarine", "sodalite", "amazonite", "lapis-lazuli", "chrysocolla", "kyanite", "turquoise", "larimar", "celestite"],
    reasons: {
      "blue-lace-agate": "The quintessential communication stone. Its soft blue color and gentle banding are associated with calm, clear self-expression.",
      "aquamarine": "The 'sailor's stone.' Associated with courage under pressure and clear communication in difficult situations.",
      "sodalite": "Called 'the poet's stone.' Associated with articulating complex ideas and finding the right words.",
      "amazonite": "Found in Tutankhamun's tomb. Associated with honest communication and setting clear boundaries.",
      "lapis-lazuli": "The stone of the Egyptian goddess Ma'at, who represented truth. Ground into pigment for medieval illuminated manuscripts.",
      "chrysocolla": "Cleopatra's diplomatic stone. Associated with negotiation, teaching, and compassionate communication.",
      "kyanite": "Said to 'never need cleansing.' Associated with cutting through confusion and speaking truth without fear.",
      "turquoise": "Truth stone in Persian culture. Given as a gift symbolizing friendship and honest exchange across many traditions.",
      "larimar": "Dominican Republic's stone. Associated with calm expression and translating spiritual insight into words.",
      "celestite": "Named 'celestial' for its sky color. Associated with angelic communication and expressing higher truths.",
    },
  },
  {
    slug: "meditation",
    title: "The Meditation Collection",
    subtitle: "Stones Used as Focus Objects in Contemplative Practice",
    description: "Using stones as meditation aids is one of the oldest and most pragmatic applications of crystals. The practice is straightforward: holding a smooth, cool stone provides tactile focus that anchors attention. Examining a crystal's internal structure under light gives the mind a genuinely complex visual object to explore. These are attention tools, not magic - and they work for the same reason worry stones, prayer beads, and fidget tools work: they give the body something to do while the mind settles.",
    disclaimer: "Meditation associations are cultural traditions. The tactile and visual focus benefits of holding minerals during meditation are practical, not supernatural.",
    accentColor: "#A78BFA",
    crystalIds: ["amethyst", "clear-quartz", "selenite", "labradorite", "fluorite", "apophyllite", "scolecite", "phantom-quartz", "lemurian-quartz", "danburite"],
    reasons: {
      "amethyst": "Tibetan Buddhist tradition uses amethyst rosaries for meditation. Its purple color and accessible price make it the most widely used meditation crystal.",
      "clear-quartz": "The most versatile meditation stone. Its internal structures (phantoms, veils, rainbows) provide complex visual focus during contemplative practice.",
      "selenite": "Named after Selene, Greek moon goddess. Its translucent, luminous quality creates a calming visual focus in low light.",
      "labradorite": "The shifting iridescent play of color provides an ever-changing visual meditation focus. No two viewing angles are identical.",
      "fluorite": "Geometric cubic and octahedral crystals provide satisfying tactile objects. The color range offers variety for different meditation intentions.",
      "apophyllite": "Exceptional transparency acts as a natural meditation lens. Practitioners look into the crystal as a focus practice.",
      "scolecite": "The radiating needle sprays provide a mandala-like visual structure for meditation focus.",
      "phantom-quartz": "The visible 'ghost' crystal inside provides a meditation focus on growth, layers, and the passage of time.",
      "lemurian-quartz": "The horizontal striations provide a tactile meditation practice - running a finger along the ridges as a focus technique.",
      "danburite": "Called 'angel stone.' Its clarity and gentle energy are associated with deep, peaceful meditation states.",
    },
  },
];

export function getCollectionBySlug(slug: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.slug === slug);
}

export function getAllCollectionSlugs(): string[] {
  return COLLECTIONS.map((c) => c.slug);
}
