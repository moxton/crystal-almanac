import crystalsData from "@/app/data/crystals.json";

export interface Locality {
  name: string;
  region: string;
  note: string;
}

export interface Metaphysical {
  chakra: string;
  zodiac: string;
  element: string;
  traditions: string;
}

export interface RelatedMineral {
  name: string;
  relation: string;
  color: string;
}

export interface Crystal {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  colors: string[];
  colorHexes: string[];
  hardness: number;
  chemicalFormula: string;
  crystalSystem: string;
  luster: string;
  streak: string;
  transparency: string;
  specificGravity: string;
  localities: Locality[];
  formation: string;
  identification: string;
  howToSpotFakes: string;
  metaphysical: Metaphysical;
  relatedMinerals: RelatedMineral[];
  priceRange: string;
  seoDescription: string;
  imageUrl: string;
  imageSmall: string;
  imageCredit: string;
  imageCreditUrl: string;
  imageUnsplashUrl: string;
}

export function getAllCrystals(): Crystal[] {
  return crystalsData as Crystal[];
}

export function getCrystalById(id: string): Crystal | undefined {
  return (crystalsData as Crystal[]).find((c) => c.id === id);
}

export function getAllCrystalIds(): string[] {
  return (crystalsData as Crystal[]).map((c) => c.id);
}

export function getCrystalsByCategory(): Record<string, Crystal[]> {
  const grouped: Record<string, Crystal[]> = {};
  for (const crystal of crystalsData as Crystal[]) {
    const cat = crystal.category;
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(crystal);
  }
  return grouped;
}
