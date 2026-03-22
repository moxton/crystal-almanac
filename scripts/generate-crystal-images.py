"""
Crystal Almanac - Batch Crystal Image Generator
Uses Gemini to generate scientific intaglio-style illustrations for all 300 crystals.

BEFORE RUNNING:
1. Install dependencies: pip3 install google-genai Pillow
2. Get an API key from aistudio.google.com
3. Set your API key below (or export GEMINI_API_KEY='your-key')
4. Run: python3 scripts/generate-crystal-images.py

ESTIMATED COST: ~$15-25 at Flash model pricing for 300 images
Resume-safe: re-run to pick up where you left off (skips existing images).
"""

import json
import os
import time
from pathlib import Path

# ═══════════════════════════════════════════
# CONFIGURATION
# ═══════════════════════════════════════════

API_KEY = ""  # Paste your key here, or export GEMINI_API_KEY='your-key'

# "gemini-2.5-flash-image"     - fast, good quality (start here)
# "gemini-3-pro-image-preview" - best quality (final batch)
MODEL = "gemini-2.5-flash-image"

DELAY = 5  # seconds between requests

OUTPUT_DIR = "crystal-images"

# Path to crystals.json (relative to where you run the script)
CRYSTALS_JSON_PATH = os.path.join(os.path.dirname(__file__), "..", "app", "data", "crystals.json")

# ═══════════════════════════════════════════
# CURATED RTF DATA (habit, texture, color)
# Keyed by crystals.json id
# ═══════════════════════════════════════════

RTF_DATA = {
    "topaz": (
        "orthorhombic prismatic crystal with vertical striations and pyramidal terminations",
        "perfect basal cleavage and internal liquid inclusions",
        "golden-amber to sherry-orange"
    ),
    "gold": (
        "complex branching dendritic and arborescent (tree-like) crystalline structure",
        "hackly fracture and smooth metallic surfaces",
        "deep 24k yellow-gold and brilliant metallic saffron"
    ),
    "diamond": (
        "octahedral crystal with triangular \"trigons\" growth markings on the faces",
        "characteristic conchoidal fracture",
        "brilliant colorless wash with subtle icy-blue light refractions on the facets"
    ),
    "ruby": (
        "hexagonal prismatic crystal with flat terminations often showing triangular growth markings",
        "uneven or conchoidal fracture",
        "vivid pigeon-blood red with deep crimson and magenta undertones"
    ),
    "emerald": (
        "hexagonal prismatic (columnar) crystal often showing inclusions known as \"jardin\"",
        "uneven or conchoidal fracture",
        "vibrant chrome-green and deep forest green with transparent internal inclusions"
    ),
    "moldavite": (
        "aerodynamic deeply etched and pitted glass-like texture with distinctive \"sculpted\" ridges",
        "lechatelierite inclusions and bubbles within the translucent glass",
        "forest green to olive-green translucent"
    ),
    "diaspore": (
        "orthorhombic tabular or bladed crystals",
        "perfect cleavage and pearly luster",
        "luminous transparent pale yellowish-green with pinkish-brown pleochroism"
    ),
    "dioptase": (
        "hexagonal rhombohedral crystals with distinct terminations",
        "perfect cleavage and vitreous luster",
        "luminous transparent vibrant emerald-green and deep teal"
    ),
    "dolomite": (
        "saddle-shaped rhombohedral crystal clusters",
        "perfect rhombohedral cleavage and pearly to vitreous luster",
        "luminous translucent pearly-white and vibrant pale-pink"
    ),
    "dumortierite": (
        "fibrous radiating acicular crystal aggregates",
        "fibrous fracture and silky luster",
        "highly saturated opaque vibrant denim-blue and deep violet"
    ),
    "epidote": (
        "elongated monoclinic prismatic crystals with deep vertical striations",
        "perfect basal cleavage and vitreous luster",
        "luminous translucent vibrant pistachio-green and deep olive"
    ),
    "erythrite": (
        "radiating acicular sprays or crusts of bladed crystals",
        "perfect cleavage and pearly to dull luster",
        "highly saturated vibrant magenta and deep crimson-pink"
    ),
    "eudialyte": (
        "massive granular habit or rare rhombohedral crystals",
        "uneven fracture and vitreous to dull luster",
        "highly saturated vibrant carmine-red and bright magenta mottled with black"
    ),
    "fuchsite": (
        "massive micaceous aggregates forming scaly plates",
        "perfect basal cleavage and sparkling pearly luster",
        "highly saturated vibrant emerald-green with a luminous silvery shimmer"
    ),
    "galena": (
        "perfect cubic crystal clusters or cubo-octahedral forms",
        "perfect cubic cleavage in three directions and highly metallic luster",
        "highly saturated bright silver-grey and luminous lead-grey metallic wash"
    ),
    "goethite": (
        "botryoidal reniform crusts or radiating fibrous stalactitic forms",
        "uneven fracture and sub-metallic to silky luster",
        "highly saturated opaque deep brownish-black and luminous metallic iron-grey"
    ),
    "desert-rose": (
        "intersecting tabular crystal blades forming rosette clusters",
        "perfect micaceous cleavage and earthy to sandy texture",
        "highly saturated opaque warm desert-sand brown and soft beige"
    ),
    "blue-halite": (
        "cubic hopper crystals with skeletal stair-step indentations",
        "perfect cubic cleavage and vitreous luster",
        "luminous transparent bright icy-white to pale translucent-pink"
    ),
    "hemimorphite": (
        "radiating botryoidal crusts or sheaf-like crystalline aggregates",
        "perfect prismatic cleavage and vitreous luster",
        "highly saturated vibrant sky-blue and luminous bright turquoise"
    ),
    "hiddenite": (
        "flattened tabular monoclinic spodumene crystals with deep vertical striations",
        "perfect prismatic cleavage and vitreous luster",
        "luminous transparent vibrant pale yellow-green and bright emerald-green"
    ),
    "actinolite": (
        "elongated bladed or radiating fibrous crystals",
        "perfect cleavage and vitreous to silky luster",
        "vibrant translucent bright-green to dark emerald-green"
    ),
    "bismuth": (
        "hoppered skeletal pseudo-cubic crystals with intricate stair-step structures",
        "perfect basal cleavage and brilliant metallic luster",
        "highly saturated iridescent neon-pink gold and electric-blue metallic wash"
    ),
    "red-beryl": (
        "hexagonal prismatic crystals with flat terminations",
        "conchoidal fracture and vitreous luster",
        "luminous transparent vivid gooseberry-red and vibrant crimson"
    ),
    "marcasite": (
        "tabular or pyramidal orthorhombic crystals forming cockscomb aggregates",
        "uneven fracture and opaque metallic luster",
        "highly saturated bright pale-bronze and shimmering brass-yellow"
    ),
    "cavansite": (
        "radiating spherical rosettes of acicular crystals",
        "perfect cleavage and vitreous luster",
        "luminous opaque electric ultramarine-blue and vibrant cyan"
    ),
    "charoite": (
        "massive fibrous interlocking swirling crystal habit",
        "splintery fracture and pearly to silky luster",
        "highly saturated swirling bands of vibrant violet deep purple and opaque white"
    ),
    "cinnabar": (
        "massive granular or rarely rhombohedral crystals",
        "perfect prismatic cleavage and sub-adamantine luster",
        "highly saturated opaque vivid brick-red and bright scarlet"
    ),
    "seraphinite": (
        "massive micaceous aggregates forming feathery chatoyant patterns",
        "perfect basal cleavage and pearly luster",
        "highly saturated deep forest-green with luminous silvery-white feathery flashes"
    ),
    "covellite": (
        "massive or rare tabular hexagonal plates",
        "perfect basal cleavage and sub-metallic luster",
        "highly saturated iridescent indigo-blue with vibrant purple and brassy-red tarnish"
    ),
    "crocoite": (
        "elongated hollow acicular or prismatic monoclinic crystals",
        "conchoidal fracture and brilliant adamantine luster",
        "luminous translucent vibrant saffron-orange and bright fiery-red"
    ),
    "cuprite": (
        "cubic or octahedral isometric crystals",
        "conchoidal fracture and sub-metallic to adamantine luster",
        "luminous semi-transparent deep cochineal-red and vibrant crimson"
    ),
    "danburite": (
        "orthorhombic prismatic crystals with wedge-shaped terminations",
        "poor cleavage and brilliant vitreous luster",
        "luminous transparent bright colorless-white to vibrant pale-pink"
    ),
    "prehnite": (
        "botryoidal or globular crystalline aggregates",
        "uneven fracture and vitreous to pearly luster",
        "luminous translucent pale apple-green and vibrant mint"
    ),
    "pyrite": (
        "cubic or pyritohedral crystal clusters with striated faces",
        "conchoidal fracture and brilliant metallic luster",
        "highly saturated brass-yellow to rich pale-gold"
    ),
    "clear-quartz": (
        "six-sided hexagonal prisms with pyramidal terminations",
        "conchoidal fracture and glass-like clarity",
        "luminous transparent water-clear with brilliant light refraction"
    ),
    "rose-quartz": (
        "massive microcrystalline habit or forming small euhedral crystals",
        "conchoidal fracture and vitreous luster",
        "luminous translucent soft blush-pink and vibrant rose"
    ),
    "smoky-quartz": (
        "hexagonal prismatic crystals with pyramidal terminations",
        "conchoidal fracture and internal quartz fracturing",
        "luminous transparent rich cognac-brown to deep charcoal-grey"
    ),
    "rhodochrosite": (
        "rhombohedral crystals or botryoidal banded crusts",
        "perfect rhombohedral cleavage and pearly luster",
        "highly saturated vibrant raspberry-red and deep rose-pink bands"
    ),
    "rhodonite": (
        "tabular triclinic crystals or massive granular habit",
        "perfect prismatic cleavage and uneven fracture",
        "vibrant opaque rosy-pink with striking dendritic black manganese oxide veins"
    ),
    "sapphire": (
        "barrel-shaped hexagonal bipyramidal crystals",
        "conchoidal fracture and adamantine luster",
        "luminous transparent deep velvety royal-blue and vibrant cornflower-blue"
    ),
    "selenite": (
        "elongated tabular monoclinic crystals with vertical striations",
        "perfect micaceous cleavage and pearly luster",
        "luminous transparent icy-white with a vibrant moon-like glow"
    ),
    "serpentine": (
        "massive fine-grained to fibrous habit",
        "splintery fracture and greasy or waxy luster",
        "highly saturated mottled olive-green and vibrant yellowish-green"
    ),
    "sodalite": (
        "massive granular habit or rarely dodecahedral crystals",
        "uneven fracture and vitreous to greasy luster",
        "highly saturated opaque royal-blue mottled with stark white calcite veins"
    ),
    "spinel": (
        "distinct octahedral crystal clusters",
        "conchoidal fracture and vitreous luster",
        "luminous transparent vivid ruby-red and deep magenta"
    ),
    "sugilite": (
        "massive granular habit",
        "uneven fracture and waxy luster",
        "highly saturated opaque vivid grape-jelly purple and deep magenta"
    ),
    "sunstone": (
        "massive triclinic formation with plate-like inclusions",
        "perfect cleavage and distinct aventurescence (schiller)",
        "luminous translucent warm peach-orange with vibrant glittering metallic-copper flashes"
    ),
    "tanzanite": (
        "orthorhombic prismatic crystals with distinct striations",
        "perfect cleavage and strong trichroism",
        "luminous transparent vibrant ultramarine-blue and deep violet"
    ),
    "tiger-eye": (
        "massive fibrous quartz pseudomorph after crocidolite",
        "silky luster and distinct chatoyancy (cat's-eye effect)",
        "highly saturated undulating bands of vibrant golden-yellow and deep mahogany-brown"
    ),
    "black-tourmaline": (
        "elongated columnar hexagonal prisms with heavy vertical striations",
        "uneven fracture and vitreous luster",
        "highly saturated opaque jet-black and glossy charcoal"
    ),
    "watermelon-tourmaline": (
        "concentric color-zoned hexagonal crystals",
        "uneven fracture and vitreous luster",
        "luminous transparent vivid hot-pink core surrounded by a vibrant emerald-green rind"
    ),
    "turquoise": (
        "cryptocrystalline massive or botryoidal nodules",
        "waxy luster and conchoidal fracture",
        "highly saturated opaque robin's-egg blue with intricate dark brown limonite matrix webbing"
    ),
    "zircon": (
        "tetragonal prismatic crystals with dipyramidal terminations",
        "conchoidal fracture and brilliant adamantine luster",
        "luminous transparent fiery reddish-brown and vibrant golden-orange"
    ),
    "ruby-zoisite": (
        "massive granular crystalline habit",
        "uneven fracture and vitreous luster",
        "highly saturated opaque vibrant earthy-green matrix heavily spotted with vivid ruby-red corundum inclusions"
    ),
    "calcite": (
        "rhombohedral or scalenohedral (dogtooth) crystal clusters",
        "perfect rhombohedral cleavage",
        "luminous translucent golden-yellow to pale white"
    ),
    "carnelian": (
        "massive microcrystalline nodular formation",
        "smooth waxy luster with conchoidal fracture",
        "vibrant translucent fiery orange and deep reddish-orange"
    ),
    "celestite": (
        "tabular or prismatic orthorhombic crystal clusters",
        "perfect basal cleavage and vitreous luster",
        "saturated icy pale blue and translucent sky blue"
    ),
    "chalcedony": (
        "botryoidal or mammillary cryptocrystalline crusts",
        "smooth waxy luster and microcrystalline texture",
        "luminous translucent milky white to pale lavender-blue"
    ),
    "chrysocolla": (
        "botryoidal massive or stalactitic crusts",
        "earthy to vitreous luster and uneven fracture",
        "vibrant opaque cyan-blue and bright malachite-green"
    ),
    "chrysoprase": (
        "massive cryptocrystalline nodular formation",
        "smooth waxy luster with conchoidal fracture",
        "luminous translucent apple-green and vibrant mint-green"
    ),
    "citrine": (
        "hexagonal prismatic crystals with pyramidal terminations",
        "conchoidal fracture and internal quartz fracturing",
        "bright translucent lemon-yellow to rich amber-gold"
    ),
    "fluorite": (
        "cubic crystal clusters with distinct penetration twins",
        "perfect octahedral cleavage planes",
        "highly saturated zoned bands of luminous purple and emerald green"
    ),
    "garnet": (
        "complex isometric dodecahedral and trapezohedral crystals",
        "subconchoidal fracture and vitreous luster",
        "deep saturated burgundy-red to vibrant crimson"
    ),
    "hematite": (
        "botryoidal reniform (kidney ore) massive crusts",
        "sub-metallic luster and uneven fracture",
        "deep metallic steel-gray to shimmering iron-black"
    ),
    "howlite": (
        "massive nodular formation resembling cauliflower heads",
        "dull earthy luster with subconchoidal fracture",
        "bright opaque chalky white with intricate dark grey matrix webbing"
    ),
    "jade": (
        "dense massive fibrous interlocking crystalline structure",
        "smooth greasy to waxy luster and splintery fracture",
        "luminous rich spinach-green and vibrant sage"
    ),
    "jasper": (
        "massive microcrystalline quartz formation",
        "smooth opaque texture with conchoidal fracture",
        "highly saturated deep brick-red and vibrant terracotta"
    ),
    "kunzite": (
        "flattened tabular monoclinic crystals with vertical striations",
        "perfect prismatic cleavage and vitreous luster",
        "luminous transparent lilac-pink and vibrant soft magenta"
    ),
    "kyanite": (
        "elongated bladed triclinic crystal clusters",
        "perfect basal cleavage and splintery cross-fracture",
        "highly saturated deep cornflower-blue to vibrant sapphire-blue"
    ),
    "malachite": (
        "botryoidal mammillary fibrous crusts showing concentric banding",
        "silky to dull luster and uneven fracture",
        "highly saturated vivid emerald-green and deep forest-green bands"
    ),
    "moonstone": (
        "massive formation showing distinct lamellar twinning",
        "characteristic adularescence and perfect two-directional cleavage",
        "luminous milky-white with a vibrant shimmering electric-blue schiller"
    ),
    "morganite": (
        "tabular hexagonal crystal plates",
        "conchoidal fracture and glassy vitreous luster",
        "luminous transparent peach-pink and vibrant soft rose"
    ),
    "black-onyx": (
        "massive cryptocrystalline formation with parallel straight color banding",
        "smooth waxy luster and conchoidal fracture",
        "highly saturated alternating bands of opaque jet-black and stark white"
    ),
    "peridot": (
        "orthorhombic prismatic crystals with wedge-shaped terminations",
        "conchoidal fracture and oily to vitreous luster",
        "luminous transparent olive-green and vibrant lime-green"
    ),
    "vesuvianite": (
        "tetragonal prismatic crystals with pyramidal terminations",
        "uneven fracture and vitreous luster",
        "luminous translucent olive-green and vibrant yellowish-brown"
    ),
    "indicolite": (
        "elongated columnar hexagonal prisms with deep vertical striations",
        "uneven fracture and vitreous luster",
        "luminous transparent deep indigo-blue and vibrant neon-blue"
    ),
    "iolite": (
        "short orthorhombic prismatic crystals",
        "subconchoidal fracture and distinct strong trichroism",
        "luminous transparent violet-blue and vibrant greyish-blue"
    ),
    "kambaba-jasper": (
        "massive microcrystalline quartz with distinctive orbicular circular patterns",
        "smooth opaque texture with conchoidal fracture",
        "highly saturated deep forest-green and vibrant blackish-green orbs"
    ),
    "kornerupine": (
        "orthorhombic prismatic crystals",
        "uneven fracture and vitreous luster",
        "luminous transparent earthy brownish-green and vibrant yellowish-green"
    ),
    "larimar": (
        "massive radiating fibrous crystalline aggregates",
        "splintery fracture and silky to sub-vitreous luster",
        "highly saturated opaque vibrant Caribbean-blue and luminous stark-white webbing"
    ),
    "lepidolite": (
        "massive micaceous aggregates forming scaly plates",
        "perfect basal cleavage and sparkling pearly luster",
        "luminous translucent vibrant lilac-purple and soft rose-pink"
    ),
    "magnesite": (
        "massive nodular or chalky porcelain-like aggregates",
        "conchoidal fracture and dull earthy luster",
        "luminous opaque stark-white with vibrant greyish-black web matrix"
    ),
    "magnetite": (
        "prominent octahedral isometric crystals",
        "subconchoidal fracture and strong metallic luster",
        "highly saturated opaque deep iron-black with a brilliant metallic sheen"
    ),
    "mangano-calcite": (
        "rhombohedral crystals or massive granular habit",
        "perfect rhombohedral cleavage and vitreous luster",
        "luminous translucent vibrant baby-pink and soft pale-rose"
    ),
    "mimetite": (
        "botryoidal crusts or barrel-shaped hexagonal crystals",
        "subconchoidal fracture and resinous luster",
        "highly saturated luminous vibrant canary-yellow and deep orange"
    ),
    "mookaite": (
        "massive microcrystalline silica formation",
        "smooth opaque texture with conchoidal fracture",
        "highly saturated vibrant mustard-yellow and deep maroon-red"
    ),
    "muscovite": (
        "layered micaceous sheets forming pseudo-hexagonal \"books\"",
        "perfect basal cleavage and brilliant pearly luster",
        "luminous transparent silvery-white and pale glimmering-gold"
    ),
    "nephrite": (
        "massive fine-grained interlocking fibrous structure",
        "splintery fracture and greasy to waxy luster",
        "highly saturated luminous deep spinach-green and vibrant pale-green"
    ),
    "okenite": (
        "radiating spherical clusters of flexible straight acicular crystals",
        "fibrous texture and pearly luster",
        "luminous opaque stark-white and pale-yellow"
    ),
    "orpiment": (
        "foliated or columnar orthorhombic masses",
        "perfect micaceous cleavage and resinous to pearly luster",
        "highly saturated vibrant lemon-yellow and deep golden-orange"
    ),
    "pietersite": (
        "brecciated massive quartz with swirling fibrous amphibole inclusions",
        "distinct chaotic chatoyancy and silky luster",
        "highly saturated swirling bands of luminous gold and vibrant midnight-blue"
    ),
    "prasiolite": (
        "hexagonal prismatic crystals with pyramidal terminations",
        "conchoidal fracture and vitreous luster",
        "luminous transparent soft leek-green and vibrant mint"
    ),
    "purpurite": (
        "massive granular or earthy habit",
        "uneven fracture and dull to earthy luster",
        "highly saturated opaque intensely vibrant magenta and deep royal-purple"
    ),
    "pyromorphite": (
        "barrel-shaped hexagonal prismatic crystals or branching botryoidal crusts",
        "subconchoidal fracture and resinous luster",
        "highly saturated vibrant apple-green and bright yellowish-green"
    ),
    "realgar": (
        "monoclinic prismatic crystals with vertical striations",
        "conchoidal fracture and resinous to greasy luster",
        "luminous transparent vibrant aurora-red and deep fiery-orange"
    ),
    "rubellite": (
        "elongated columnar hexagonal prisms with heavy vertical striations",
        "uneven fracture and vitreous luster",
        "luminous transparent deep raspberry-red and vibrant hot-pink"
    ),
    "rutile": (
        "slender acicular tetragonal crystals or reticulated twinned lattices",
        "uneven fracture and brilliant metallic-adamantine luster",
        "highly saturated deep blood-red and brilliant metallic golden-yellow"
    ),
    "scapolite": (
        "tetragonal prismatic crystals with pyramidal terminations",
        "uneven fracture and vitreous to pearly luster",
        "luminous transparent pale-yellow and vibrant lilac"
    ),
    "scolecite": (
        "radiating acicular monoclinic needle-like sprays",
        "perfect cleavage and silky luster",
        "luminous translucent stark-white and icy clear"
    ),
    "shattuckite": (
        "botryoidal radiating fibrous spherules",
        "uneven fracture and dull to silky luster",
        "highly saturated opaque vibrant turquoise and deep navy-blue"
    ),
    "silver": (
        "complex branching dendritic and wire-like crystalline structures",
        "hackly fracture and metallic luster",
        "highly saturated bright metallic silver-white and luminous tarnished-grey"
    ),
    "smithsonite": (
        "massive botryoidal reniform crusts",
        "uneven fracture and pearly to vitreous luster",
        "luminous translucent vibrant cyan-blue and soft mint-green"
    ),
    "spessartine-garnet": (
        "well-formed isometric dodecahedral or trapezohedral crystals",
        "subconchoidal fracture and brilliant vitreous luster",
        "luminous transparent fiery mandarin-orange and vibrant reddish-orange"
    ),
    "sphalerite": (
        "complex tetrahedral or dodecahedral crystals",
        "perfect dodecahedral cleavage in six directions and resinous to adamantine luster",
        "highly saturated luminous deep honey-brown and vibrant ruby-red"
    ),
    "titanite": (
        "wedge-shaped monoclinic crystals",
        "distinct cleavage and brilliant adamantine luster",
        "luminous transparent vibrant yellowish-green and deep fiery-brown"
    ),
    "staurolite": (
        "orthorhombic prismatic crystals forming distinctive cruciform penetration twins",
        "subconchoidal fracture and dull to vitreous luster",
        "highly saturated opaque deep reddish-brown and earthy dark-brown"
    ),
    "stibnite": (
        "elongated bladed orthorhombic crystals with vertical striations",
        "perfect basal cleavage and highly metallic luster",
        "highly saturated bright metallic lead-grey and shimmering steel-grey"
    ),
    "stilbite": (
        "monoclinic tabular crystals forming distinctive sheaf-like or bow-tie aggregates",
        "perfect cleavage and pearly luster",
        "luminous translucent soft peach-pink and vibrant pale-orange"
    ),
    "native-sulfur": (
        "steep orthorhombic dipyramidal crystals",
        "conchoidal fracture and resinous to greasy luster",
        "highly saturated luminous vibrant canary-yellow and bright lemon-yellow"
    ),
    "tektite": (
        "aerodynamic deeply etched and pitted natural glass",
        "prominent conchoidal fracture and vitreous luster",
        "highly saturated luminous translucent dark olive-green and deep brownish-black"
    ),
    "thulite": (
        "massive fine-grained crystalline habit",
        "splintery fracture and dull to vitreous luster",
        "highly saturated opaque vibrant rose-pink and deep magenta"
    ),
    "blue-topaz": (
        "orthorhombic prismatic crystals with vertical striations",
        "perfect basal cleavage and vitreous luster",
        "luminous transparent vibrant sky-blue and deep aquamarine"
    ),
    "imperial-topaz": (
        "orthorhombic prismatic crystals with pyramidal terminations",
        "perfect basal cleavage and vitreous luster",
        "luminous transparent fiery golden-orange and vibrant peach"
    ),
    "tourmaline": (
        "elongated columnar hexagonal prisms with heavy vertical striations",
        "uneven fracture and vitreous luster",
        "luminous transparent deep mahogany-brown and vibrant amber"
    ),
    "paraiba-tourmaline": (
        "elongated columnar hexagonal prisms with deep vertical striations",
        "uneven fracture and vitreous luster",
        "luminous transparent intensely vibrant neon-blue and electric cyan"
    ),
    "tsavorite": (
        "well-formed isometric dodecahedral crystals",
        "subconchoidal fracture and brilliant vitreous luster",
        "luminous transparent intensely vibrant forest-green and rich emerald-green"
    ),
    "tugtupite": (
        "massive fine-grained interlocking crystalline habit",
        "uneven fracture and greasy to vitreous luster",
        "highly saturated opaque vibrant crimson-red and deep cyclamen-pink"
    ),
    "ulexite": (
        "parallel acicular fibrous crystal bundles",
        "silky luster and distinct fiber-optic light transmission",
        "luminous translucent stark-white and pale icy-grey"
    ),
    "unakite": (
        "massive granular granite composed of epidote and orthoclase",
        "uneven fracture and dull to earthy luster",
        "highly saturated mottled opaque pistachio-green and vibrant salmon-pink"
    ),
    "vanadinite": (
        "short hexagonal prismatic crystals with flat pinacoidal terminations",
        "uneven fracture and brilliant resinous luster",
        "highly saturated translucent vibrant scarlet-red and bright fiery-orange"
    ),
    "variscite": (
        "massive cryptocrystalline nodular crusts",
        "conchoidal fracture and waxy luster",
        "highly saturated opaque vibrant apple-green and deep mint-green"
    ),
    "vivianite": (
        "elongated monoclinic bladed crystals",
        "perfect micaceous cleavage and vitreous to pearly luster",
        "luminous transparent deep indigo-blue and vibrant emerald-green"
    ),
    "wavellite": (
        "radiating globular or hemispherical crystalline aggregates",
        "perfect cleavage and pearly to vitreous luster",
        "luminous translucent vibrant apple-green and pale yellowish-green"
    ),
    "wolframite": (
        "heavy monoclinic bladed or tabular crystals",
        "perfect cleavage and sub-metallic luster",
        "highly saturated opaque deep iron-black and luminous dark brownish-black"
    ),
    "wulfenite": (
        "square tabular tetragonal crystals with uniquely beveled edges",
        "subconchoidal fracture and resinous to adamantine luster",
        "highly saturated luminous fiery-orange and bright golden-yellow"
    ),
    "zincite": (
        "steep hexagonal pyramidal crystals with distinct vertical striations",
        "perfect basal cleavage and sub-adamantine luster",
        "highly saturated translucent fiery orange-red and bright golden-yellow"
    ),
    "phenakite": (
        "short hexagonal rhombohedral crystals",
        "conchoidal fracture and vitreous luster",
        "luminous transparent bright colorless-white and pale-yellow"
    ),
    # ── Batch 2: Gemini-generated descriptions ──
    "obsidian": (
        "massive form with sharp clean edges",
        "prominent conchoidal fracture swirls and vitreous luster",
        "luminous jet-black with subtle grey-blue reflections"
    ),
    "labradorite": (
        "massive formation showing distinct parallel lamellar twinning",
        "visible cleavage planes and internal fractures",
        "dark charcoal-gray matrix with vibrant iridescent peacock-blue and lime-green labradorescence"
    ),
    "amethyst": (
        "hexagonal columnar form with horizontal striations",
        "internal quartz fracturing and cleavage planes",
        "luminous deep violet and rich royal-purple"
    ),
    "lapis-lazuli": (
        "massive rock formation composed of lazurite calcite and pyrite",
        "irregular fracture and prominent dark matrix veins",
        "deep lazuli-blue speckled with metallic gold pyrite flecks"
    ),
    "aquamarine": (
        "hexagonal prismatic crystals with flat terminations",
        "uneven or conchoidal fracture and vitreous luster",
        "luminous light pastel-blue and pale turquoise"
    ),
    "opal": (
        "massive botryoidal or nodular form",
        "smooth vitreous surface and internal play-of-color",
        "milky white base with shimmering flashes of neon red blue and green"
    ),
    "aventurine": (
        "massive quartz formation with platey inclusions",
        "aventurescence shimmering effect and conchoidal fracture",
        "vivid rich forest-green with sparkling emerald flecks"
    ),
    "agate": (
        "nodular slice showing concentric parallel banding patterns",
        "microcrystalline texture and waxy luster",
        "vibrant layers of translucent orange sienna and milky-white"
    ),
    "amazonite": (
        "short prismatic crystals with a blocky habit",
        "grid-like perthitic twinning and perfect cleavage",
        "highly saturated vibrant turquoise-green and bright aqua"
    ),
    "bloodstone": (
        "massive chalcedony formation",
        "smooth opaque texture and conchoidal fracture",
        "rich hunter-green with vibrant spots of jasper-red"
    ),
    "azurite": (
        "monoclinic prismatic crystal clusters or radiating botryoidal forms",
        "conchoidal fracture and vitreous to dull luster",
        "luminous deep azure-blue and vibrant cobalt"
    ),
    "alexandrite": (
        "cyclic twin crystal forming a six-rayed star",
        "distinct pleochroism and conchoidal fracture",
        "luminous forest-green with flashes of raspberry-red"
    ),
    "ametrine": (
        "hexagonal columnar form with distinct color zoning",
        "internal quartz fracturing and conchoidal fracture",
        "luminous deep violet sharply zoned with vibrant golden-yellow"
    ),
    "shungite": (
        "massive amorphous carbon-rich mineraloid",
        "uneven fracture and sub-metallic to dull luster",
        "highly saturated opaque jet-black and metallic deep-grey"
    ),
    "rutilated-quartz": (
        "hexagonal prismatic crystals enclosing fine acicular needles",
        "glass-like clarity and conchoidal fracture",
        "luminous transparent water-clear with brilliant metallic golden-yellow rutile needles"
    ),
    "ocean-jasper": (
        "massive microcrystalline quartz with distinct orbicular patterns",
        "smooth opaque texture and conchoidal fracture",
        "highly saturated swirling bands of seafoam-green mustard-yellow and deep ocean-blue"
    ),
    "angelite": (
        "massive nodular formation of anhydrite",
        "uneven fracture and pearly to vitreous luster",
        "luminous opaque soft powder-blue and pale angel-blue"
    ),
    "aragonite": (
        "acicular radiating crystal clusters forming sputnik shapes",
        "cyclic twinning and distinct cleavage",
        "warm saturated reddish-brown and luminous amber"
    ),
    "hawks-eye": (
        "massive fibrous quartz pseudomorph after crocidolite",
        "silky luster and distinct chatoyancy",
        "highly saturated undulating bands of deep midnight-blue and luminous greyish-blue"
    ),
    "apophyllite": (
        "tetragonal dipyramidal crystals with flat basal terminations",
        "perfect basal cleavage and pearly luster",
        "bright light-filled saturated mint-green and transparent icy-white"
    ),
    "lava-rock": (
        "highly vesicular massive basaltic rock",
        "rough porous texture and dull earthy luster",
        "highly saturated opaque deep charcoal-grey and earthy matte-black"
    ),
    "ammolite": (
        "fossilized ammonite shell fragments with complex layered aragonite",
        "smooth platy texture and brilliant iridescent play-of-color",
        "shimmering iridescent sheets of fiery-red electric-green and vibrant-blue"
    ),
    "nuummite": (
        "massive metamorphic rock composed of anthophyllite and gedrite",
        "splintery fracture and distinct iridescent schiller effect",
        "opaque deep charcoal-black with brilliant flashing streaks of golden-yellow and metallic-blue"
    ),
    "dendritic-agate": (
        "translucent chalcedony with branching fern-like inclusions",
        "smooth waxy luster and microcrystalline texture",
        "luminous translucent milky-white heavily webbed with stark blackish-brown dendrites"
    ),
    "cats-eye-chrysoberyl": (
        "tabular or prismatic crystals enclosing fine parallel rutile needles",
        "conchoidal fracture and distinct chatoyant light band",
        "luminous translucent honey-yellow and pale greenish-brown with a bright silvery-white light ray"
    ),
    "rhodolite-garnet": (
        "well-formed isometric dodecahedral crystals",
        "subconchoidal fracture and brilliant vitreous luster",
        "luminous transparent vibrant raspberry-red and deep rose-pink"
    ),
    "native-copper": (
        "complex branching dendritic and arborescent crystalline structures",
        "hackly fracture and highly metallic luster",
        "highly saturated bright metallic penny-copper and luminous tarnished red-brown"
    ),
    "moss-agate": (
        "translucent chalcedony enclosing branching dendritic moss-like filaments",
        "smooth waxy luster and microcrystalline texture",
        "luminous translucent water-clear mottled with vibrant deep forest-green mossy inclusions"
    ),
    "blue-lace-agate": (
        "finely banded chalcedony showing delicate wavy layers",
        "translucent microcrystalline texture and waxy luster",
        "luminous soft sky-blue and saturated lavender-white bands"
    ),
    "snowflake-obsidian": (
        "massive volcanic glass with radial clusters of cristobalite spherulites",
        "prominent conchoidal fracture and vitreous luster",
        "highly saturated jet-black ink-like wash speckled with stark-white snowflake patterns"
    ),
    "fire-agate": (
        "botryoidal chalcedony with alternating layers of silica and iron oxide",
        "smooth waxy luster and internal iridescent schiller",
        "deep translucent rusty-brown with brilliant glowing flashes of fiery-orange and neon-green"
    ),
    "spirit-quartz": (
        "central hexagonal prism heavily encrusted with hundreds of smaller point terminations",
        "complex drusy texture and internal quartz fracturing",
        "luminous translucent soft lavender and pale lilac-purple"
    ),
    "septarian": (
        "massive nodular concretion with distinct angular shrinkage cracks",
        "smooth earthy texture with crystalline cavity linings",
        "opaque warm mud-brown matrix filled with luminous vibrant golden-yellow calcite veins"
    ),
    "phantom-quartz": (
        "hexagonal prismatic crystals enclosing distinct internal ghost-like growth layers",
        "glass-like clarity and conchoidal fracture",
        "luminous transparent water-clear with subtle internal pale-green and milky-white phantom pyramids"
    ),
    "lemurian-quartz": (
        "elongated tapering hexagonal prisms with heavy horizontal ladder-like striations on alternating faces",
        "internal quartz fracturing and brilliant vitreous luster",
        "luminous transparent soft peach-pink and icy water-clear"
    ),
    "k2-stone": (
        "massive white granite matrix spotted with distinct spherical azurite inclusions",
        "rough granular texture and dull earthy luster",
        "opaque stark snow-white matrix heavily spotted with intensely vibrant azure-blue orbs"
    ),
    "bumblebee-jasper": (
        "massive banded volcanic material containing sulfur and manganese oxides",
        "smooth opaque texture and earthy luster",
        "highly saturated undulating bands of brilliant canary-yellow bright orange and stark jet-black"
    ),
    "dragon-blood-jasper": (
        "massive cryptocrystalline quartz heavily mottled with epidote and piemontite",
        "smooth opaque texture and conchoidal fracture",
        "highly saturated deep forest-green matrix splattered with vivid dragon-blood red spots"
    ),
    "strawberry-quartz": (
        "massive quartz enclosing dense red flakes of lepidocrocite or hematite",
        "conchoidal fracture and vitreous luster",
        "luminous translucent soft pinkish-red densely speckled with vibrant sparkling crimson flakes"
    ),
    "fluorapatite": (
        "hexagonal prismatic crystals with pyramidal terminations",
        "conchoidal fracture and brilliant vitreous luster",
        "luminous transparent vibrant neon-teal and deep oceanic-blue"
    ),
    "amber": (
        "massive amorphous fossilized resin",
        "irregular conchoidal fracture and common organic inclusions",
        "translucent luminous honey-gold and warm cognac-brown"
    ),
    "pearl": (
        "spherical nacreous nodule with a smooth surface",
        "characteristic concentric layers of nacre growth",
        "lustrous cream-white wash with soft shimmering iridescent pink and blue overtones"
    ),
    "tourmalinated-quartz": (
        "hexagonal prismatic crystals enclosing distinct black tourmaline needles",
        "glass-like clarity and conchoidal fracture",
        "luminous transparent water-clear pierced by stark highly saturated jet-black needles"
    ),
    "crazy-lace-agate": (
        "cryptocrystalline chalcedony showing highly complex chaotic folded banding",
        "smooth waxy luster and microcrystalline texture",
        "highly saturated vibrant swirling bands of crimson-red mustard-yellow and opaque stark-white"
    ),
    "botswana-agate": (
        "nodular chalcedony showing extremely fine tightly packed concentric banding",
        "smooth waxy luster and microcrystalline texture",
        "luminous delicate bands of soft peach pale-grey and warm smoky-brown"
    ),
    "jet": (
        "massive amorphous lignite coal derived from fossilized wood",
        "smooth uniform texture with conchoidal fracture",
        "highly saturated opaque velvety jet-black with a soft resinous luster"
    ),
    "libyan-desert-glass": (
        "aerodynamic deeply etched and pitted natural tektite glass",
        "prominent conchoidal fracture and vitreous luster",
        "luminous translucent pale canary-yellow and bright desert-sun gold"
    ),
    "grape-agate": (
        "tightly packed clusters of spherical botryoidal chalcedony nodules",
        "drusy crystalline surface texture and waxy luster",
        "highly saturated vibrant violet-purple and deep lavender resembling a cluster of grapes"
    ),
    "pink-opal": (
        "massive amorphous nodular form",
        "smooth opaque texture and vitreous to waxy luster",
        "highly saturated opaque vibrant bubblegum-pink and soft blush-rose"
    ),
    "tiffany-stone": (
        "massive highly mineralized fluorite and bertrandite nodular breccia",
        "smooth opaque texture and dull to waxy luster",
        "highly saturated swirling mottled patterns of vibrant violet-purple stark-white and soft lavender"
    ),
    "benitoite": (
        "ditrigonal-dipyramidal triangular crystal habit",
        "strong dispersion and conchoidal fracture",
        "luminous transparent vibrant sapphire-blue and electric violet"
    ),
    "coral": (
        "branching arborescent calcareous skeletal structures",
        "porous textured surface and dull earthy luster",
        "highly saturated opaque vibrant coral-pink and deep fiery red-orange"
    ),
    "moissanite": (
        "hexagonal silicon carbide crystals often with flat basal facets",
        "brilliant adamantine luster and extreme fire dispersion",
        "luminous transparent icy water-clear with brilliant flashes of rainbow light refraction"
    ),
    "herkimer-diamond": (
        "short doubly-terminated hexagonal quartz crystals",
        "brilliant glass-like clarity and perfectly smooth natural facets",
        "luminous completely transparent water-clear with intense internal light reflection"
    ),
    "caribbean-calcite": (
        "massive rhombohedral calcite interspersed with pale brown aragonite",
        "perfect cleavage and granular texture",
        "luminous opaque vibrant ocean-blue and soft beach-sand brown"
    ),
    "apache-tear": (
        "small rounded nodular pebbles of volcanic black glass",
        "prominent conchoidal fracture and vitreous luster",
        "luminous translucent deep smoky-black and dark obsidian-grey"
    ),
    "mahogany-obsidian": (
        "massive volcanic glass with distinct swirling flow bands",
        "prominent conchoidal fracture and vitreous luster",
        "highly saturated deep jet-black swirled with vibrant mahogany-red and rust-brown bands"
    ),
    "rainbow-obsidian": (
        "massive volcanic glass showing distinct concentric rings of iridescence",
        "prominent conchoidal fracture and vitreous luster",
        "highly saturated jet-black with luminous glowing bands of iridescent purple green and gold"
    ),
    "peacock-ore": (
        "massive or granular metallic bornite and chalcopyrite formation",
        "uneven fracture and distinct iridescent tarnish",
        "intensely vibrant shimmering metallic purples electric blues and iridescent pinks"
    ),
    "super-seven": (
        "complex quartz matrix containing amethyst cacoxenite goethite lepidocrocite rutile and smoky quartz",
        "internal quartz fracturing and complex multi-mineral inclusions",
        "luminous swirling zones of deep amethyst-purple smoky-brown and golden-rutile flashes"
    ),
    "larvikite": (
        "massive coarse-grained igneous rock showing distinct large feldspar crystals",
        "distinct schiller effect and uneven fracture",
        "highly saturated dark silvery-grey matrix with luminous flashes of electric steel-blue iridescence"
    ),
    "scheelite": (
        "tetragonal dipyramidal pseudo-octahedral crystals",
        "subconchoidal fracture and sub-adamantine luster",
        "luminous translucent vibrant golden-orange and pale yellowish-white"
    ),
    "cassiterite": (
        "short tetragonal prismatic crystals with steep pyramidal terminations",
        "subconchoidal fracture and brilliant adamantine metallic luster",
        "highly saturated opaque deep brownish-black and luminous metallic iron-grey"
    ),
    "black-kyanite": (
        "elongated bladed triclinic crystal clusters forming fan-like radiating sprays",
        "perfect basal cleavage and splintery cross-fracture",
        "highly saturated opaque deep charcoal-black and metallic dark-grey"
    ),
    "enhydro-quartz": (
        "hexagonal quartz crystals containing visible internal cavities filled with ancient trapped water and moving gas bubbles",
        "glass-like clarity and internal chambering",
        "luminous transparent water-clear enclosing a distinct pale-yellow liquid bubble"
    ),
    "nebula-stone": (
        "massive fine-grained dark matrix spotted with distinct green orbicular spherulites",
        "smooth opaque texture and dull luster",
        "highly saturated opaque deep blackish-green matrix heavily spotted with luminous bright emerald-green orbs"
    ),
    "adamite": (
        "radiating botryoidal or fan-like sheaves of orthorhombic crystals",
        "uneven fracture and brilliant vitreous luster",
        "luminous translucent intensely vibrant neon yellow-green and bright lime-green"
    ),
    "preseli-bluestone": (
        "massive fine-grained dolerite rock with distinct white plagioclase spotting",
        "rough granular texture and dull earthy luster",
        "highly saturated opaque deep greyish-blue mottled with stark-white starry flecks"
    ),
    "tibetan-quartz": (
        "doubly-terminated hexagonal prismatic crystals with distinct black carbon inclusions",
        "internal quartz fracturing and conchoidal fracture",
        "luminous transparent pale smoky-grey mottled with stark opaque black carbon speckles"
    ),
    "fire-opal": (
        "massive amorphous nodular form with high transparency",
        "smooth vitreous surface and internal play-of-color",
        "luminous transparent highly saturated vibrant fiery-orange and deep cherry-red"
    ),
    "boulder-opal": (
        "thin seams of precious opal naturally embedded within a dark ironstone host rock matrix",
        "smooth vitreous opal veins contrasting with rough earthy ironstone",
        "highly saturated opaque earthy brown-black matrix sliced by luminous veins of flashing iridescent neon-blue and green"
    ),
    "picture-jasper": (
        "massive microcrystalline quartz showing distinct landscape-like banding and dendritic patterns",
        "smooth opaque texture and conchoidal fracture",
        "highly saturated complex bands of warm desert-sand brown pale beige and deep earthy-sienna"
    ),
    "dalmatian-stone": (
        "massive pale igneous rock heavily spotted with distinct black arfvedsonite tourmaline nodules",
        "smooth opaque texture and dull luster",
        "highly saturated opaque pale cream-white heavily speckled with stark jet-black spots"
    ),
    "tigers-iron": (
        "massive banded metamorphic rock composed of tiger's eye red jasper and black hematite",
        "distinct chatoyancy and smooth opaque texture",
        "highly saturated undulating bands of luminous golden-yellow vibrant brick-red and metallic iron-black"
    ),
    "petrified-wood": (
        "massive fossilized wood pseudomorph showing perfectly preserved ancient tree bark and wood grain rings",
        "smooth microcrystalline quartz texture and conchoidal fracture",
        "highly saturated rich earthy tones of deep mahogany-brown warm amber and stark charcoal-black"
    ),
    "fulgurite": (
        "hollow branching tubular glass structures formed by lightning striking sand",
        "rough sandy heavily fused exterior with a smooth glassy interior bore",
        "luminous translucent pale desert-sand beige and fused ashy-grey"
    ),
    "sardonyx": (
        "cryptocrystalline chalcedony showing distinct straight parallel bands of sard and onyx",
        "smooth waxy luster and microcrystalline texture",
        "highly saturated distinct alternating bands of vibrant rusty reddish-brown and stark opaque white"
    ),
    "barite": (
        "tabular crystal clusters often forming distinctive desert rose rosettes",
        "perfect basal cleavage and vitreous to pearly luster",
        "bright luminous saturated golden-yellow and warm cream"
    ),
    "optical-calcite": (
        "perfectly clear rhombohedral cleavage blocks",
        "perfect rhombohedral cleavage and distinct double-refraction effect",
        "luminous completely transparent water-clear with brilliant icy-white light transmission"
    ),
    "cobaltocalcite": (
        "rhombohedral crystal clusters or drusy crusts",
        "perfect rhombohedral cleavage and vitreous luster",
        "luminous translucent intensely vibrant hot-pink and deep magenta"
    ),
    "hackmanite": (
        "massive granular pseudo-cubic crystalline habit",
        "uneven fracture and distinct tenebrescence UV color change",
        "luminous translucent pale greyish-white that blushes to a vibrant deep plum-purple"
    ),
    "chrysoberyl": (
        "tabular or short prismatic crystals with distinct cyclic twinning",
        "conchoidal fracture and brilliant vitreous luster",
        "luminous transparent vibrant yellowish-green and bright golden-yellow"
    ),
    "lodolite": (
        "clear hexagonal quartz crystals heavily packed with complex garden-like chlorite and iron inclusions",
        "glass-like clarity and internal mossy structures",
        "luminous transparent water-clear housing highly saturated internal landscapes of earthy-green rust-red and pale-brown"
    ),
    "tangerine-quartz": (
        "hexagonal prismatic crystals coated in a distinct natural layer of bright iron oxide hematite",
        "conchoidal fracture and vitreous luster",
        "highly saturated luminous translucent vibrant tangerine-orange and bright rust-orange"
    ),
    "blue-apatite": (
        "hexagonal prismatic crystals with pyramidal terminations or massive granular habit",
        "conchoidal fracture and brilliant vitreous luster",
        "luminous transparent intensely vibrant neon sea-blue and deep azure"
    ),
    "chrysanthemum-stone": (
        "massive dark limestone matrix containing distinct white radiating celestite crystals forming floral patterns",
        "smooth opaque texture and dull earthy luster",
        "highly saturated opaque deep charcoal-black matrix framing stark snow-white radial floral bursts"
    ),
    "aqua-aura-quartz": (
        "hexagonal quartz crystals artificially vapor-coated with pure gold to create intense iridescence",
        "conchoidal fracture and brilliant metallic-vitreous luster",
        "luminous transparent intensely vibrant electric-blue and shimmering neon-cyan with rainbow surface flashes"
    ),
    "demantoid-garnet": (
        "well-formed isometric dodecahedral crystals often containing curving horsetail inclusions",
        "subconchoidal fracture and brilliant adamantine fire",
        "luminous transparent intensely vibrant vivid emerald-green and bright grass-green"
    ),
    "legrandite": (
        "radiating acicular orthorhombic crystal sprays or sheaf-like bundles",
        "uneven fracture and brilliant vitreous luster",
        "luminous translucent highly saturated vibrant canary-yellow and bright sun-yellow"
    ),
    "aurichalcite": (
        "delicate feathery acicular crystal sprays or tufted radiating crusts",
        "perfect cleavage and silky to pearly luster",
        "luminous translucent intensely vibrant pale sky-blue and soft mint-green"
    ),
    "amblygonite": (
        "short prismatic triclinic crystals or massive cleavable blocks",
        "perfect basal cleavage and vitreous to greasy luster",
        "luminous translucent pale straw-yellow and bright icy-white"
    ),
    "auralite-23": (
        "complex chevron-banded amethyst crystals with multiple complex mineral inclusions and a distinct red cap",
        "internal quartz fracturing and distinct V-shaped growth zoning",
        "highly saturated swirling zones of deep amethyst-purple pale smoky-brown and vibrant hematite-red"
    ),
    "chiastolite": (
        "orthorhombic prismatic andalusite crystals containing a distinct natural black carbon cross in cross-section",
        "uneven fracture and dull to earthy luster",
        "highly saturated opaque earthy reddish-brown perfectly framing a stark jet-black cruciform core"
    ),
    "leopardskin-jasper": (
        "massive microcrystalline quartz heavily spotted with distinct orbicular ring patterns",
        "smooth opaque texture and conchoidal fracture",
        "highly saturated opaque mustard-yellow and deep brick-red matrix covered in dark black and pale-pink leopard spots"
    ),
    "bronzite": (
        "massive enstatite showing a distinct sub-metallic fibrous luster",
        "prominent cleavage planes and brilliant schiller effect",
        "highly saturated opaque rich bronze-brown and deep golden-brown metallic tones"
    ),
    "creedite": (
        "radiating spherical clusters of bladed monoclinic crystals",
        "perfect cleavage and brilliant vitreous luster",
        "luminous transparent vibrant fiery-orange and bright pale-purple"
    ),
    "blue-chalcedony": (
        "massive botryoidal or nodular cryptocrystalline silica crusts",
        "smooth waxy luster and microcrystalline texture",
        "luminous translucent soft glowing lavender-blue and pale periwinkle"
    ),
    "lithium-quartz": (
        "hexagonal quartz crystals coated or fully included with pale pinkish-purple lithium-rich minerals",
        "conchoidal fracture and vitreous luster",
        "luminous translucent soft dusty-rose and pale greyish-mauve"
    ),
    "rainbow-moonstone": (
        "massive plagioclase feldspar showing distinct lamellar twinning",
        "characteristic adularescence and perfect cleavage",
        "luminous translucent milky-white bursting with vibrant shimmering flashes of electric-blue pink and gold"
    ),
    "red-jasper": (
        "massive microcrystalline quartz formation",
        "smooth opaque texture with conchoidal fracture",
        "highly saturated deep brick-red and vibrant terracotta"
    ),
    "green-calcite": (
        "massive rhombohedral cleavage blocks or complex crystal clusters",
        "perfect rhombohedral cleavage and vitreous luster",
        "luminous translucent intensely vibrant pale apple-green and bright mint-green"
    ),
    "orange-calcite": (
        "massive rhombohedral cleavage blocks",
        "perfect rhombohedral cleavage and vitreous luster",
        "luminous translucent intensely vibrant juicy mandarin-orange and bright pale-tangerine"
    ),
    "tree-agate": (
        "opaque white chalcedony heavily included with branching green dendritic filaments",
        "smooth opaque texture and waxy luster",
        "highly saturated opaque stark snow-white heavily mottled with vibrant forest-green foliage-like veins"
    ),
    "chalcopyrite": (
        "massive or tetrahedral metallic crystalline habit",
        "uneven fracture and brilliant metallic luster",
        "highly saturated bright metallic brass-yellow heavily tarnished with iridescent purple blue and green"
    ),
    "golden-healer-quartz": (
        "hexagonal quartz crystals heavily included or coated with luminous yellow iron oxide",
        "internal quartz fracturing and conchoidal fracture",
        "luminous transparent intensely saturated vibrant golden-yellow and warm sunshine-yellow"
    ),
    "astrophyllite": (
        "radiating star-like bladed crystal aggregates embedded in a light matrix",
        "perfect micaceous cleavage and sub-metallic pearly luster",
        "highly saturated stark-white matrix exploding with luminous brilliant golden-bronze and copper-brown stellar bursts"
    ),
    "pink-amethyst": (
        "hexagonal quartz crystals with a pale hematite-induced pink coloration",
        "internal quartz fracturing and vitreous luster",
        "luminous translucent soft dusty-rose and vibrant pale blush-pink"
    ),
    "piemontite": (
        "massive granular or prismatic crystalline habit within a quartz matrix",
        "uneven fracture and vitreous luster",
        "highly saturated opaque vibrant cherry-red and deep purplish-crimson"
    ),
    "gaspeite": (
        "massive botryoidal crusts or granular crystalline habit",
        "uneven fracture and dull earthy to waxy luster",
        "highly saturated opaque intensely vibrant neon apple-green and bright yellow-green"
    ),
    "platinum": (
        "massive metallic nuggets or rare cubic crystal grains",
        "hackly fracture and highly metallic luster",
        "highly saturated bright metallic silvery-white and luminous steel-grey"
    ),
    "iron-meteorite": (
        "massive solid nickel-iron metallic alloy showing distinct interlocking Widmanstatten crystalline patterns",
        "hackly fracture and brilliant metallic luster",
        "highly saturated bright metallic silver-grey deeply etched with luminous geometric cross-hatching"
    ),
    "granite": (
        "massive coarse-grained intrusive igneous rock composed of interlocking quartz feldspar and mica",
        "rough granular texture and uneven fracture",
        "highly saturated speckled opaque salt-and-pepper matrix of stark-white deep-black and pale-pink feldspar"
    ),
    "marble": (
        "massive fine-grained metamorphic rock composed of interlocking recrystallized carbonate minerals",
        "smooth sugary granular texture and dull luster",
        "luminous opaque stark snow-white heavily veined with saturated dark charcoal-grey"
    ),
    "basalt": (
        "massive dense fine-grained extrusive igneous rock often highly vesicular",
        "rough porous or finely granular texture and dull earthy luster",
        "highly saturated opaque deep charcoal-black and dark matte-grey"
    ),
    "limestone": (
        "massive fine-grained sedimentary rock composed of microscopic skeletal fragments",
        "smooth earthy texture and dull luster",
        "highly saturated opaque warm pale-beige and soft earthy-grey"
    ),
    "slate": (
        "massive extremely fine-grained metamorphic rock with perfect planar foliation",
        "perfect slaty cleavage splitting into flat smooth sheets",
        "highly saturated opaque deep slate-grey and dark bluish-black"
    ),
    "quartzite": (
        "massive extremely hard metamorphic rock composed of fused interlocking quartz grains",
        "sugary crystalline texture and conchoidal fracture",
        "luminous translucent stark frosty-white and pale silvery-grey"
    ),
    "sandstone": (
        "massive sedimentary rock composed of sand-sized silicate grains cemented together",
        "rough gritty sandy texture and dull earthy luster",
        "highly saturated opaque warm desert-sand brown and rich earthy rusty-red"
    ),
    "soapstone": (
        "massive dense metamorphic rock composed entirely of soft talc",
        "smooth soapy or greasy texture and dull luster",
        "highly saturated opaque pale mottled sea-green and soft greyish-white"
    ),
    "painite": (
        "elongated hexagonal pseudo-orthorhombic prismatic crystals",
        "conchoidal fracture and brilliant vitreous luster",
        "luminous transparent highly saturated deep garnet-red and dark brownish-orange"
    ),
    "grandidierite": (
        "orthorhombic prismatic crystals with distinct pleochroism",
        "perfect cleavage and brilliant vitreous luster",
        "luminous transparent highly saturated vibrant neon cyan-blue and deep sea-green"
    ),
    "taaffeite": (
        "hexagonal prismatic crystals with flat basal terminations",
        "conchoidal fracture and brilliant vitreous luster",
        "luminous transparent soft pale-mauve and vibrant lilac-purple"
    ),
    "musgravite": (
        "hexagonal prismatic crystals nearly visually identical to taaffeite",
        "conchoidal fracture and brilliant vitreous luster",
        "luminous transparent deep olive-green and pale greyish-purple"
    ),
    "flower-agate": (
        "translucent chalcedony enclosing distinct opaque white three-dimensional floral chalcedony plumes",
        "smooth waxy luster and microcrystalline texture",
        "luminous translucent soft pale-pink perfectly framing opaque stark-white cherry-blossom plumes"
    ),
    "polychrome-jasper": (
        "massive microcrystalline quartz showing large sweeping swirling color fields",
        "smooth opaque texture and conchoidal fracture",
        "highly saturated large smooth undulating bands of vibrant desert-sand brown rusty-red and muted teal-blue"
    ),
    "chrome-diopside": (
        "monoclinic prismatic crystals with distinct vertical striations",
        "perfect prismatic cleavage and brilliant vitreous luster",
        "luminous transparent intensely vibrant neon forest-green and deep emerald-green"
    ),
    "hematoid-quartz": (
        "hexagonal quartz crystals heavily included with opaque reddish-black hematite flakes or phantoms",
        "internal quartz fracturing and vitreous luster",
        "luminous transparent water-clear heavily saturated with opaque deep rust-red and metallic-black flakes"
    ),
    "black-moonstone": (
        "massive dark plagioclase feldspar showing distinct lamellar twinning",
        "characteristic silvery adularescence and perfect cleavage",
        "highly saturated opaque deep brownish-black with a luminous sweeping silvery-white light reflection"
    ),
    "talc": (
        "massive foliated or micaceous sheets",
        "perfect basal cleavage and completely smooth greasy soapy feel",
        "luminous translucent pale pearly-white and soft sea-green"
    ),
    "gypsum": (
        "massive tabular monoclinic crystals or fibrous satin spar varieties",
        "perfect micaceous cleavage and silky to pearly luster",
        "luminous completely transparent icy-white and pale translucent-grey"
    ),
    "diopside": (
        "monoclinic prismatic crystals",
        "perfect cleavage and vitreous luster",
        "luminous transparent deep earthy bottle-green and pale yellowish-green"
    ),
    "brazilianite": (
        "monoclinic spear-shaped or prismatic crystals",
        "perfect cleavage and brilliant vitreous luster",
        "luminous transparent vibrant neon chartreuse-yellow and bright yellow-green"
    ),
    # ── NEW BATCH: 42 crystals (258→300) ──
    "heliodor": (
        "hexagonal prismatic crystal with flat terminations and vertical striations",
        "vitreous luster with conchoidal fracture and transparent to translucent clarity",
        "luminous golden-yellow to greenish-yellow"
    ),
    "goshenite": (
        "hexagonal prismatic crystal with flat terminations",
        "vitreous luster with exceptional transparency and clean conchoidal fracture",
        "colorless to ice-white with brilliant clarity"
    ),
    "verdelite": (
        "trigonal prismatic crystal with rounded triangular cross-section and vertical striations",
        "vitreous luster with conchoidal fracture",
        "vivid forest-green to emerald-green"
    ),
    "dravite": (
        "trigonal prismatic crystal with rounded triangular cross-section",
        "vitreous to resinous luster with vertical striations",
        "rich dark brown to golden-brown"
    ),
    "almandine-garnet": (
        "isometric dodecahedral or trapezohedral crystal",
        "vitreous luster with conchoidal to uneven fracture",
        "deep wine-red to purplish-red"
    ),
    "pyrope-garnet": (
        "isometric rounded dodecahedral crystal",
        "vitreous luster with transparent clarity",
        "fiery blood-red to deep crimson"
    ),
    "grossular-garnet": (
        "isometric dodecahedral crystal often massive",
        "vitreous to resinous luster",
        "honey-orange to cinnamon-brown and mint-green"
    ),
    "andradite-garnet": (
        "isometric dodecahedral crystal with sharp faces",
        "adamantine to vitreous luster with exceptional brilliance",
        "deep olive-green to emerald-green and black"
    ),
    "uvarovite": (
        "tiny isometric crystal druzy coating on dark matrix",
        "vitreous luster with sparkling crystalline surface",
        "vivid emerald-green druzy crystals on dark chromite matrix"
    ),
    "hessonite-garnet": (
        "isometric dodecahedral crystal with characteristic roiled internal texture",
        "vitreous to resinous luster with honey-like inclusions",
        "warm cinnamon-orange to honey-brown"
    ),
    "shiva-lingam": (
        "naturally tumbled elongated egg-shaped river stone",
        "smooth polished surface with iron oxide patterns and bands",
        "tan to brown with reddish-brown iron oxide markings"
    ),
    "satin-spar": (
        "fibrous elongated mass with chatoyant silky surface",
        "silky pearly luster with parallel fibrous structure",
        "luminous pearlescent white with silvery chatoyancy"
    ),
    "spodumene": (
        "monoclinic elongated prismatic crystal with flat terminations",
        "perfect cleavage in two directions and vitreous luster",
        "pale grayish-white to yellowish-green"
    ),
    "olivine": (
        "orthorhombic granular crystals embedded in basalt matrix",
        "vitreous luster with conchoidal fracture",
        "bright olive-green to yellowish-green"
    ),
    "orthoclase": (
        "monoclinic prismatic crystal with rectangular cross-section and carlsbad twinning",
        "vitreous to pearly luster with two perfect cleavage directions at 90 degrees",
        "pale cream to salmon-pink"
    ),
    "ajoite": (
        "blue-green phantoms and inclusions within transparent quartz crystal",
        "silky to vitreous luster within quartz host",
        "vivid turquoise-blue to teal-green inclusions in clear quartz"
    ),
    "heulandite": (
        "monoclinic coffin-shaped tabular crystals in cluster",
        "vitreous to pearly luster on cleavage surfaces",
        "warm peach to salmon-pink and white"
    ),
    "zoisite": (
        "orthorhombic prismatic crystal with vertical striations",
        "vitreous luster with conchoidal fracture",
        "pistachio-green to gray-green"
    ),
    "merlinite": (
        "rounded cabochon-shaped specimen with dendritic patterns",
        "waxy luster with intricate black dendritic inclusions in white matrix",
        "stark black dendritic patterns on white chalcedony"
    ),
    "girasol-quartz": (
        "trigonal prismatic crystal with milky translucent body",
        "vitreous luster with internal bluish adularescent glow",
        "milky translucent white with ethereal blue internal sheen"
    ),
    "rainforest-jasper": (
        "polished rounded specimen showing orbicular and flowing patterns",
        "waxy luster with complex green and brown patterns",
        "deep forest-green with tan and brown orbs"
    ),
    "blue-obsidian": (
        "glassy mass with conchoidal fracture surfaces",
        "brilliant vitreous luster with sharp conchoidal edges",
        "deep midnight-blue to steel-blue with glassy sheen"
    ),
    "star-rose-quartz": (
        "large rounded cabochon showing six-rayed star (asterism)",
        "translucent with silky luster from aligned rutile needles",
        "soft rose-pink with silvery six-rayed star on surface"
    ),
    "biotite": (
        "monoclinic hexagonal tabular crystal with perfect basal cleavage",
        "metallic to vitreous luster on cleavage faces, flexible thin sheets",
        "deep black to dark brown with brilliant metallic sheen"
    ),
    "hornblende": (
        "monoclinic prismatic crystal with diamond-shaped cross-section at 56/124 degrees",
        "vitreous to dull luster with two cleavage planes",
        "dark green to jet black"
    ),
    "enstatite": (
        "orthorhombic prismatic crystal with rectangular cross-section",
        "vitreous to pearly luster with bronzy schiller",
        "bronze-brown to olive-green with metallic sheen"
    ),
    "tremolite": (
        "monoclinic elongated prismatic crystal in radiating clusters",
        "vitreous to silky luster with splintery fracture",
        "white to pale gray-green"
    ),
    "cryolite": (
        "monoclinic pseudo-cubic crystal nearly invisible against white background",
        "vitreous to greasy luster, appears to vanish in water",
        "colorless to white, nearly invisible"
    ),
    "anhydrite": (
        "orthorhombic tabular to prismatic crystal",
        "vitreous to pearly luster with three perfect cleavage directions",
        "pale blue-gray to lilac-blue"
    ),
    "natrolite": (
        "orthorhombic acicular (needle-like) crystals in radiating spray",
        "vitreous to silky luster with perfect prismatic cleavage",
        "colorless to white needle-like crystals in radiating fan"
    ),
    "tanzan-aura-quartz": (
        "trigonal prismatic quartz crystal cluster with iridescent coating",
        "metallic rainbow iridescence over natural quartz crystal surfaces",
        "vivid indigo-blue to violet with rainbow iridescent sheen"
    ),
    "elbaite": (
        "trigonal prismatic crystal with rounded triangular cross-section showing color zoning",
        "vitreous luster with vertical striations",
        "vivid multicolored - pink, green, blue zoning in single crystal"
    ),
    "chrysotile": (
        "monoclinic fibrous serpentine in cross-fiber veins",
        "silky to waxy luster with flexible fiber bundles",
        "pale green to white silky fibers"
    ),
    "wollastonite": (
        "triclinic elongated tabular to acicular crystals",
        "vitreous to silky luster with splintery fracture",
        "bright white to pale gray"
    ),
    "proustite": (
        "trigonal prismatic crystal with brilliant adamantine luster",
        "adamantine luster with conchoidal fracture, translucent to transparent",
        "brilliant scarlet-red to vermillion with ruby-like fire"
    ),
    "arsenopyrite": (
        "monoclinic prismatic crystal with diamond-shaped cross-section and striated faces",
        "metallic luster with uneven fracture",
        "bright silvery-white to steel-gray metallic"
    ),
    "anglesite": (
        "orthorhombic tabular to prismatic crystal with adamantine luster",
        "adamantine to vitreous luster with conchoidal fracture",
        "colorless to pale yellow with brilliant diamond-like luster"
    ),
    "coltan": (
        "orthorhombic short prismatic crystal with blunt terminations",
        "submetallic to resinous luster with subconchoidal fracture",
        "jet black to dark brown with submetallic sheen"
    ),
    "oligoclase": (
        "triclinic tabular crystal showing polysynthetic twinning striations",
        "vitreous to pearly luster with aventurescent copper platelets",
        "warm golden-orange with glittering copper aventurescence"
    ),
    "analcime": (
        "isometric trapezohedral crystal (rounded cube-like shape)",
        "vitreous luster with conchoidal fracture",
        "colorless to white with glassy transparency"
    ),
    "schorl": (
        "trigonal prismatic crystal with rounded triangular cross-section and vertical striations",
        "vitreous to resinous luster with conchoidal fracture",
        "jet black and opaque"
    ),
    "star-sapphire": (
        "hexagonal barrel-shaped cabochon showing six-rayed star (asterism)",
        "vitreous luster with silk of aligned rutile needles creating star",
        "deep blue to grayish-blue with sharp silver six-rayed star"
    ),
}

# ═══════════════════════════════════════════
# FALLBACK BUILDERS (for crystals not in RTF)
# ═══════════════════════════════════════════

SYSTEM_TO_HABIT = {
    "Cubic": "cubic crystal clusters",
    "Isometric": "well-formed isometric dodecahedral crystals",
    "Hexagonal": "hexagonal prismatic crystals with flat terminations",
    "Trigonal": "trigonal prismatic crystals",
    "Tetragonal": "tetragonal prismatic crystals with pyramidal terminations",
    "Orthorhombic": "orthorhombic prismatic crystals",
    "Monoclinic": "monoclinic prismatic crystals",
    "Triclinic": "triclinic tabular crystals",
    "Amorphous": "massive amorphous formation with conchoidal fracture",
}


def build_fallback_habit(crystal_system):
    """Maps crystalSystem to a descriptive habit phrase."""
    if not crystal_system:
        return "massive geological specimen"
    # Extract base system (handle annotations like "Trigonal (microcrystalline)")
    base = crystal_system.split("(")[0].strip()
    return SYSTEM_TO_HABIT.get(base, "massive geological specimen")


def build_fallback_texture(crystal):
    """Constructs texture from luster + transparency."""
    luster = crystal.get("luster", "vitreous")
    transparency = crystal.get("transparency", "translucent")
    # Take the primary luster term
    primary_luster = luster.split(" to ")[0].lower()
    return f"{primary_luster} luster and {transparency.lower()}"


def build_fallback_color(crystal):
    """Constructs color description from the colors array."""
    colors = crystal.get("colors", [])
    if not colors:
        return "neutral grey"
    if len(colors) == 1:
        return f"vibrant {colors[0].lower()}"
    return f"luminous {colors[0].lower()} and vibrant {colors[1].lower()}"


def get_prompt_data(crystal_id, crystal):
    """Returns (habit, texture, color) from curated data or fallback."""
    if crystal_id in RTF_DATA:
        return RTF_DATA[crystal_id]
    habit = build_fallback_habit(crystal.get("crystalSystem", ""))
    texture = build_fallback_texture(crystal)
    color = build_fallback_color(crystal)
    return (habit, texture, color)


# ═══════════════════════════════════════════
# PROMPT TEMPLATE
# ═══════════════════════════════════════════

PROMPT_TEMPLATE = (
    "A square-format, highly detailed scientific intaglio print illustration of {mineral_name}. "
    "The style is a precise 19th-century scientific plate etching with intricate cross-hatching. "
    "The illustration depicts a single, complete geological specimen showing diagnostic {habit} "
    "and {texture}. The color palette is bright, light-filled, and highly saturated, utilizing "
    "a luminous and vibrant {color} wash that appears translucent and glowing, emphasizing "
    "internal light refraction. The colors are applied with high clarity over clean black ink work. "
    "The specimen is perfectly centered against a bright, clean, off-white antique paper background "
    "with very minimal, subtle texture. The entire composition is focused on this solitary, "
    "brilliant cluster. No text overlay. Pure square ratio."
)

# ═══════════════════════════════════════════
# SCRIPT
# ═══════════════════════════════════════════


def main():
    api_key = API_KEY or os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("ERROR: No API key found!")
        print("Paste your key into API_KEY in this script,")
        print("or: export GEMINI_API_KEY='your-key-here'")
        return

    # Load crystals.json
    json_path = os.path.abspath(CRYSTALS_JSON_PATH)
    if not os.path.exists(json_path):
        print(f"ERROR: crystals.json not found at {json_path}")
        print("Run this script from the project root, or update CRYSTALS_JSON_PATH")
        return

    with open(json_path, "r", encoding="utf-8") as f:
        crystals = json.load(f)

    print(f"Loaded {len(crystals)} crystals from {json_path}")

    from google import genai
    from google.genai import types

    client = genai.Client(api_key=api_key)

    output_path = Path(OUTPUT_DIR)
    output_path.mkdir(exist_ok=True)

    # Skip already-generated images (resume-safe)
    existing = {f.stem for f in output_path.glob("*.png")}
    remaining = [(c["id"], c) for c in crystals if c["id"] not in existing]

    if not remaining:
        print(f"All {len(crystals)} images already generated!")
        return

    curated_count = sum(1 for cid, _ in remaining if cid in RTF_DATA)
    fallback_count = len(remaining) - curated_count

    print(f"Generating {len(remaining)} images ({len(existing)} already exist)")
    print(f"  {curated_count} with curated descriptions, {fallback_count} with auto-generated")
    print(f"Model: {MODEL}")
    print(f"Delay: {DELAY}s between requests")
    print(f"Output: {output_path.absolute()}")
    print("-" * 50)

    successes = 0
    failures = []

    for i, (crystal_id, crystal) in enumerate(remaining):
        filename = output_path / f"{crystal_id}.png"
        name = crystal["name"]
        source = "curated" if crystal_id in RTF_DATA else "fallback"

        print(f"[{i+1}/{len(remaining)}] {name} ({source})...", end=" ", flush=True)

        try:
            habit, texture, color = get_prompt_data(crystal_id, crystal)

            prompt = PROMPT_TEMPLATE.format(
                mineral_name=name,
                habit=habit,
                texture=texture,
                color=color,
            )

            response = client.models.generate_content(
                model=MODEL,
                contents=[prompt],
                config=types.GenerateContentConfig(
                    response_modalities=["IMAGE", "TEXT"],
                ),
            )

            image_saved = False
            for part in response.candidates[0].content.parts:
                if part.inline_data is not None:
                    with open(filename, "wb") as f:
                        f.write(part.inline_data.data)
                    image_saved = True
                    break

            if image_saved:
                print(f"OK -> {crystal_id}.png")
                successes += 1
            else:
                print("FAILED (no image in response)")
                failures.append(name)

        except Exception as e:
            error_msg = str(e)
            print(f"ERROR: {error_msg[:80]}")
            failures.append(name)

            if "429" in error_msg or "rate" in error_msg.lower() or "quota" in error_msg.lower():
                print("  Rate limited - waiting 60 seconds...")
                time.sleep(60)

        time.sleep(DELAY)

    print("\n" + "=" * 50)
    print(f"DONE: {successes} generated, {len(failures)} failed")
    if failures:
        print(f"\nFailed (re-run to retry):")
        for f in failures:
            print(f"  - {f}")
    print(f"\nImages: {output_path.absolute()}")


if __name__ == "__main__":
    main()
