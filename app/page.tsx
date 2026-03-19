import { Suspense } from "react";
import { getAllCrystals } from "@/app/lib/crystals";
import { BrowsePage } from "@/app/components/BrowsePage";

function HomepageJsonLd({ crystalCount }: { crystalCount: number }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Crystal Almanac",
      url: "https://crystalalmanac.com",
      description: `Encyclopedia of ${crystalCount}+ crystals, minerals, and stones with scientific profiles, identification guides, and formation geology.`,
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://crystalalmanac.com/?search={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Crystal Almanac",
      url: "https://crystalalmanac.com",
      logo: "https://crystalalmanac.com/icon-512.png",
      description: "A science-first encyclopedia of crystals, minerals, and stones. Every profile covers formation geology, chemical composition, identification, and fake-spotting.",
      sameAs: [],
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function Home() {
  const crystals = getAllCrystals();
  return (
    <>
      <HomepageJsonLd crystalCount={crystals.length} />
      <Suspense fallback={<div className="min-h-screen" />}>
        <BrowsePage crystals={crystals} />
      </Suspense>
    </>
  );
}
