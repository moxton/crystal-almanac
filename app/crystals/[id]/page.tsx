import { notFound } from "next/navigation";
import Link from "next/link";
import { getCrystalById, getAllCrystalIds } from "@/app/lib/crystals";
import type { Crystal } from "@/app/lib/crystals";
import type { Metadata } from "next";

// Generate static pages for all crystals at build time
export function generateStaticParams() {
  return getAllCrystalIds().map((id) => ({ id }));
}

// Dynamic metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const crystal = getCrystalById(id);
  if (!crystal) return { title: "Not Found" };

  return {
    title: `${crystal.name} - ${crystal.subtitle}`,
    description: crystal.seoDescription,
    openGraph: {
      title: `${crystal.name} - ${crystal.subtitle} | Crystal Almanac`,
      description: crystal.seoDescription,
      type: "article",
    },
  };
}

function HardnessBar({ hardness }: { hardness: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-brand-border rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-accent/60 to-brand-accent"
          style={{ width: `${(hardness / 10) * 100}%` }}
        />
      </div>
      <span className="text-sm font-body text-brand-muted w-8">{hardness}</span>
    </div>
  );
}

function PropertyRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start py-2.5 border-b border-brand-border/50 last:border-0">
      <span className="text-brand-muted text-sm font-body">{label}</span>
      <span className="text-white text-sm font-body text-right ml-4">{value}</span>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      <h2 className="font-heading text-2xl text-white mb-4">{title}</h2>
      {children}
    </section>
  );
}

function CrystalJsonLd({ crystal }: { crystal: Crystal }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    name: crystal.name,
    headline: `${crystal.name} - ${crystal.subtitle}`,
    description: crystal.seoDescription,
    publisher: {
      "@type": "Organization",
      name: "Crystal Almanac",
      url: "https://crystalalmanac.com",
    },
    mainEntityOfPage: `https://crystalalmanac.com/crystals/${crystal.id}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function CrystalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const crystal = getCrystalById(id);
  if (!crystal) notFound();

  const gradientColors = crystal.colorHexes.slice(0, 3);
  const gradient =
    gradientColors.length >= 2
      ? `linear-gradient(135deg, ${gradientColors.join(", ")})`
      : gradientColors[0] || "#A78BFA";

  return (
    <>
      <CrystalJsonLd crystal={crystal} />

      {/* Hero section with color gradient */}
      <div className="relative">
        <div
          className="h-48 md:h-64"
          style={{ background: gradient }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/50 to-transparent" />
        </div>

        <div className="max-w-4xl mx-auto px-4 -mt-20 relative">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <Link
              href="/"
              className="text-brand-accent text-sm font-body hover:underline"
            >
              ← All Crystals
            </Link>
          </nav>

          {/* Title block */}
          <div className="mb-8">
            <p className="text-brand-accent text-sm uppercase tracking-[0.15em] font-body mb-2">
              {crystal.category}
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white">
              {crystal.name}
            </h1>
            <p className="font-heading text-xl md:text-2xl text-brand-muted italic mt-2">
              {crystal.subtitle}
            </p>
          </div>

          {/* Color swatches */}
          <div className="flex flex-wrap gap-3 mb-8">
            {crystal.colors.map((color, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className="w-5 h-5 rounded-full border border-white/20"
                  style={{ backgroundColor: crystal.colorHexes[i] }}
                />
                <span className="text-sm text-brand-muted font-body">
                  {color}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content - left 2 columns */}
          <div className="lg:col-span-2">
            {/* Formation */}
            <Section title="Formation & Origin">
              <div className="prose-custom">
                {crystal.formation.split("\n\n").map((para, i) => (
                  <p
                    key={i}
                    className="text-white/85 font-body leading-relaxed mb-4"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </Section>

            {/* Identification */}
            <Section title="Identification Guide">
              <div className="prose-custom">
                {crystal.identification.split("\n\n").map((para, i) => (
                  <p
                    key={i}
                    className="text-white/85 font-body leading-relaxed mb-4"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </Section>

            {/* Spotting Fakes - amber callout */}
            <Section title="Spotting Fakes">
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-amber-400 mt-0.5 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                  <p className="text-amber-100/90 font-body leading-relaxed text-sm">
                    {crystal.howToSpotFakes}
                  </p>
                </div>
              </div>
            </Section>

            {/* Cultural Traditions */}
            <Section title="Cultural & Metaphysical Traditions">
              <p className="text-brand-muted/60 text-xs font-body uppercase tracking-wider mb-3">
                Presented as cultural traditions, not scientific evidence
              </p>
              <p className="text-white/85 font-body leading-relaxed">
                {crystal.metaphysical.traditions}
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="text-sm font-body">
                  <span className="text-brand-muted">Chakra: </span>
                  <span className="text-white/85">
                    {crystal.metaphysical.chakra}
                  </span>
                </div>
                <div className="text-sm font-body">
                  <span className="text-brand-muted">Zodiac: </span>
                  <span className="text-white/85">
                    {crystal.metaphysical.zodiac}
                  </span>
                </div>
                <div className="text-sm font-body">
                  <span className="text-brand-muted">Element: </span>
                  <span className="text-white/85">
                    {crystal.metaphysical.element}
                  </span>
                </div>
              </div>
            </Section>

            {/* Where It's Found */}
            <Section title="Where It's Found">
              <div className="space-y-3">
                {crystal.localities.map((loc, i) => (
                  <div
                    key={i}
                    className="bg-brand-surface border border-brand-border rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-white font-body font-medium">
                          {loc.name}
                        </span>
                        <span className="text-brand-muted font-body">
                          {" "}
                          - {loc.region}
                        </span>
                      </div>
                    </div>
                    <p className="text-brand-muted text-sm font-body mt-1">
                      {loc.note}
                    </p>
                  </div>
                ))}
              </div>
            </Section>

            {/* Price Range */}
            <Section title="Price Guide">
              <p className="text-white/85 font-body">{crystal.priceRange}</p>
            </Section>
          </div>

          {/* Sidebar - right column */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Quick Facts card */}
              <div className="bg-brand-surface border border-brand-border rounded-xl p-5">
                <h3 className="font-heading text-lg text-white mb-4">
                  Quick Facts
                </h3>
                <PropertyRow label="Formula" value={crystal.chemicalFormula} />
                <PropertyRow label="Crystal System" value={crystal.crystalSystem} />
                <PropertyRow label="Luster" value={crystal.luster} />
                <PropertyRow label="Streak" value={crystal.streak} />
                <PropertyRow label="Transparency" value={crystal.transparency} />
                <PropertyRow
                  label="Specific Gravity"
                  value={crystal.specificGravity}
                />

                <div className="mt-4">
                  <span className="text-brand-muted text-sm font-body">
                    Mohs Hardness
                  </span>
                  <div className="mt-2">
                    <HardnessBar hardness={crystal.hardness} />
                  </div>
                </div>
              </div>

              {/* Related Minerals */}
              <div className="bg-brand-surface border border-brand-border rounded-xl p-5">
                <h3 className="font-heading text-lg text-white mb-4">
                  Related Minerals
                </h3>
                <div className="space-y-3">
                  {crystal.relatedMinerals.map((rel, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div
                        className="w-4 h-4 rounded-full border border-white/10 mt-0.5 shrink-0"
                        style={{ backgroundColor: rel.color }}
                      />
                      <div>
                        <span className="text-white text-sm font-body font-medium">
                          {rel.name}
                        </span>
                        <p className="text-brand-muted text-xs font-body mt-0.5">
                          {rel.relation}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
