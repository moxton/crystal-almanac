import { Suspense } from "react";
import { getAllCrystals } from "@/app/lib/crystals";
import { BrowsePage } from "@/app/components/BrowsePage";

export default function Home() {
  const crystals = getAllCrystals();
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <BrowsePage crystals={crystals} />
    </Suspense>
  );
}
