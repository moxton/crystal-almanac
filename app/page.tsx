import { getAllCrystals } from "@/app/lib/crystals";
import { BrowsePage } from "@/app/components/BrowsePage";

export default function Home() {
  const crystals = getAllCrystals();
  return <BrowsePage crystals={crystals} />;
}
