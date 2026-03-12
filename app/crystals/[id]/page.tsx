import { notFound } from "next/navigation";
import Link from "next/link";
import { getCrystalById, getAllCrystalIds, getAllCrystals } from "@/app/lib/crystals";
import type { Crystal } from "@/app/lib/crystals";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getAllCrystalIds().map((id) => ({ id }));
}

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
    <section className="mt-10">
      <h2 className="font-heading text-2xl text-white mb-4">{title}</h2>
      {children}
    </section>
  );
}

// Clickable tag that links to browse page with search param
function FilterTag({ label, value, type }: { label: string; value: string; type: string }) {
  return (
    <Link
      href={`/?${type}=${encodeURIComponent(value)}`}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-surface border border-brand-border rounded-full text-xs font-body text-brand-muted hover:text-white hover:border-brand-accent/40 transition-all"
    >
      <span className="text-brand-accent/60">{label}</span>
      <span>{value}</span>
    </Link>
  );
}

// Related mineral - linked if we have a page, plain text if not
function RelatedMineralItem({
  name,
  relation,
  color,
  hasPage,
  slug,
}: {
  name: string;
  relation: string;
  color: string;
  hasPage: boolean;
  slug?: string;
}) {
  const content = (
    <div className="flex items-start gap-3">
      <div
        className="w-4 h-4 rounded-full border border-white/10 mt-0.5 shrink-0"
        style={{ backgroundColor: color }}
      />
      <div>
        <span className={`text-sm font-body font-medium ${hasPage ? "group-hover:text-brand-accent transition-colors" : ""} text-white`}>
          {name}
          {hasPage && <span className="text-brand-accent/40 ml-1 text-xs">→</span>}
        </span>
        <p className="text-brand-muted text-xs font-body mt-0.5">
          {relation}
        </p>
      </div>
    </div>
  );

  if (hasPage && slug) {
    return (
      <Link href={`/crystals/${slug}`} className="group block hover:bg-brand-border/20 -mx-3 px-3 py-2 rounded-lg transition-colors">
        {content}
      </Link>
    );
  }

  return <div className="py-1">{content}</div>;
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

  // Build lookup of all crystal IDs for internal linking
  const allCrystals = getAllCrystals();
  const crystalIdSet = new Set(allCrystals.map((c) => c.id));
  const crystalNameToId = new Map<string, string>();
  for (const c of allCrystals) {
    crystalNameToId.set(c.name.toLowerCase(), c.id);
  }

  // Helper to find if a related mineral has a page
  function findCrystalSlug(name: string): string | undefined {
    // Direct name match
    const lower = name.toLowerCase();
    if (crystalNameToId.has(lower)) return crystalNameToId.get(lower);
    // Try common transformations
    const slug = lower.replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    if (crystalIdSet.has(slug)) return slug;
    // Try without "s" suffix
    if (crystalIdSet.has(slug.replace(/s$/, ""))) return slug.replace(/s$/, "");
    return undefined;
  }

  const gradientColors = crystal.colorHexes.slice(0, 3);
  const gradient =
    gradientColors.length >= 2
      ? `linear-gradient(135deg, ${gradientColors.join(", ")})`
      : gradientColors[0] || "#A78BFA";

  return (
    <>
      <CrystalJsonLd crystal={crystal} />

      {/* Hero - tighter */}
      <div className="relative">
        <div
          className="h-40 sm:h-48 md:h-56"
          style={{ background: gradient }}
        >
          {crystal.imageUrl && (
            <img
              src={crystal.imageUrl}
              alt={crystal.name}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/60 to-transparent" />
          {crystal.imageCredit && (
            <a
              href={crystal.imageUnsplashUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-3 right-4 text-white/30 hover:text-white/60 text-xs font-body transition-colors"
            >
              Photo: {crystal.imageCredit}
            </a>
          )}
        </div>

        <div className="max-w-4xl mx-auto px-4 -mt-8 relative">
          <nav className="mb-4">
            <Link
              href="/"
              className="text-white/70 hover:text-white text-sm font-body hover:underline transition-colors"
            >
              ← All Crystals
            </Link>
          </nav>

          <div className="mb-6">
            <Link
              href={`/?search=${encodeURIComponent(crystal.category)}`}
              className="text-white/70 hover:text-white text-sm uppercase tracking-[0.15em] font-body mb-2 inline-block hover:underline transition-colors"
            >
              {crystal.category}
            </Link>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white">
              {crystal.name}
            </h1>
            <p className="font-heading text-xl md:text-2xl text-brand-muted italic mt-1">
              {crystal.subtitle}
            </p>
          </div>

          {/* Color swatches - compact */}
          <div className="flex flex-wrap gap-2 mb-6">
            {crystal.colors.map((color, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div
                  className="w-4 h-4 rounded-full border border-white/20"
                  style={{ backgroundColor: crystal.colorHexes[i] }}
                />
                <span className="text-xs text-brand-muted font-body">
                  {color}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        {/* MOBILE: Quick Facts first, before prose */}
        <div className="lg:hidden mb-8">
          <div className="bg-brand-surface border border-brand-border rounded-xl p-5">
            <h3 className="font-heading text-lg text-white mb-3">
              Quick Facts
            </h3>
            <div className="grid grid-cols-2 gap-x-4">
              <PropertyRow label="Formula" value={crystal.chemicalFormula} />
              <PropertyRow label="System" value={crystal.crystalSystem} />
              <PropertyRow label="Luster" value={crystal.luster} />
              <PropertyRow label="Streak" value={crystal.streak} />
              <PropertyRow label="Transparency" value={crystal.transparency} />
              <PropertyRow label="Sp. Gravity" value={crystal.specificGravity} />
            </div>
            <div className="mt-3">
              <span className="text-brand-muted text-sm font-body">
                Mohs Hardness
              </span>
              <div className="mt-1.5">
                <HardnessBar hardness={crystal.hardness} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <Section title="Formation & Origin">
              <div className="prose-custom">
                {crystal.formation.split("\n\n").map((para, i) => (
                  <p key={i} className="text-white/85 font-body leading-relaxed mb-4">
                    {para}
                  </p>
                ))}
              </div>
            </Section>

            <Section title="Identification Guide">
              <div className="prose-custom">
                {crystal.identification.split("\n\n").map((para, i) => (
                  <p key={i} className="text-white/85 font-body leading-relaxed mb-4">
                    {para}
                  </p>
                ))}
              </div>
            </Section>

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

            {/* Cultural Traditions with clickable tags */}
            <Section title="Cultural & Metaphysical Traditions">
              <p className="text-brand-muted/60 text-xs font-body uppercase tracking-wider mb-3">
                Presented as cultural traditions, not scientific evidence
              </p>
              <p className="text-white/85 font-body leading-relaxed">
                {crystal.metaphysical.traditions}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {crystal.metaphysical.chakra.split(", ").map((c) => (
                  <FilterTag key={c} label="Chakra" value={c.trim()} type="chakra" />
                ))}
                {crystal.metaphysical.zodiac.split(", ").map((z) => (
                  <FilterTag key={z} label="Zodiac" value={z.trim()} type="zodiac" />
                ))}
                {crystal.metaphysical.element.split(", ").map((e) => (
                  <FilterTag key={e} label="Element" value={e.trim()} type="element" />
                ))}
              </div>
            </Section>

            <Section title="Where It's Found">
              <div className="space-y-3">
                {crystal.localities.map((loc, i) => (
                  <div
                    key={i}
                    className="bg-brand-surface border border-brand-border rounded-lg p-4"
                  >
                    <span className="text-white font-body font-medium">
                      {loc.name}
                    </span>
                    <span className="text-brand-muted font-body">
                      {" "}- {loc.region}
                    </span>
                    <p className="text-brand-muted text-sm font-body mt-1">
                      {loc.note}
                    </p>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Price Guide">
              <div className="space-y-2">
                {crystal.priceRange.split("  ·  ").map((tier, i) => {
                  const labels = ["Entry", "Mid-Range", "Collector"];
                  const colors = ["text-emerald-400", "text-amber-400", "text-rose-400"];
                  return (
                    <div
                      key={i}
                      className="flex items-center justify-between py-2 border-b border-brand-border/50 last:border-0"
                    >
                      <span className={`text-xs font-body uppercase tracking-wider ${colors[i] || "text-brand-muted"}`}>
                        {labels[i] || "Premium"}
                      </span>
                      <span className="text-white/85 text-sm font-body">
                        {tier.trim()}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Section>

            {/* Good to Know - fun facts that don't alienate serious collectors */}
            <Section title="Good to Know">
              <div className="bg-brand-surface border border-brand-border rounded-xl p-5 space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-lg">💎</span>
                  <p className="text-white/85 text-sm font-body">
                    <strong className="text-white">Scratch test:</strong>{" "}
                    {crystal.hardness >= 7
                      ? `At hardness ${crystal.hardness}, ${crystal.name} can scratch glass and steel. It's durable enough for any type of jewelry.`
                      : crystal.hardness >= 5
                      ? `At hardness ${crystal.hardness}, ${crystal.name} resists scratching from a knife but can be scratched by quartz. Best for pendants and earrings rather than rings.`
                      : crystal.hardness >= 3
                      ? `At hardness ${crystal.hardness}, ${crystal.name} can be scratched with a copper coin. Handle gently and keep away from harder stones in your collection.`
                      : `At hardness ${crystal.hardness}, ${crystal.name} can be scratched with a fingernail. This is a display specimen, not a wearable stone.`}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-lg">🌍</span>
                  <p className="text-white/85 text-sm font-body">
                    <strong className="text-white">Sources:</strong>{" "}
                    {crystal.localities.length === 1
                      ? `Found at only one location on Earth - ${crystal.localities[0].name}. Supply is inherently limited.`
                      : `Found in ${crystal.localities.length} notable locations worldwide, from ${crystal.localities[0].name} to ${crystal.localities[crystal.localities.length - 1].name}.`}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-lg">⚖️</span>
                  <p className="text-white/85 text-sm font-body">
                    <strong className="text-white">Heft test:</strong>{" "}
                    {parseFloat(crystal.specificGravity) >= 5
                      ? `With a specific gravity of ${crystal.specificGravity}, ${crystal.name} feels surprisingly heavy for its size. This weight is actually a useful identification tool.`
                      : parseFloat(crystal.specificGravity) >= 3.5
                      ? `${crystal.name} has a specific gravity of ${crystal.specificGravity} - noticeably heavier than quartz. You'll feel the density when you pick it up.`
                      : parseFloat(crystal.specificGravity) >= 2.5
                      ? `${crystal.name} has average mineral density (${crystal.specificGravity}). It feels about as heavy as you'd expect from a stone its size.`
                      : `With a specific gravity of ${crystal.specificGravity}, ${crystal.name} feels lighter than most minerals. This lightness can help identify it.`}
                  </p>
                </div>
              </div>
            </Section>
          </div>

          {/* DESKTOP sidebar - hidden on mobile (shown above instead) */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto space-y-6 pr-1 scrollbar-thin">
              <div className="bg-brand-surface border border-brand-border rounded-xl p-5">
                <h3 className="font-heading text-lg text-white mb-4">
                  Quick Facts
                </h3>
                <PropertyRow label="Formula" value={crystal.chemicalFormula} />
                <PropertyRow label="Crystal System" value={crystal.crystalSystem} />
                <PropertyRow label="Luster" value={crystal.luster} />
                <PropertyRow label="Streak" value={crystal.streak} />
                <PropertyRow label="Transparency" value={crystal.transparency} />
                <PropertyRow label="Specific Gravity" value={crystal.specificGravity} />
                <div className="mt-4">
                  <span className="text-brand-muted text-sm font-body">
                    Mohs Hardness
                  </span>
                  <div className="mt-2">
                    <HardnessBar hardness={crystal.hardness} />
                  </div>
                </div>
              </div>

              {/* Related Minerals - with internal links */}
              <div className="bg-brand-surface border border-brand-border rounded-xl p-5">
                <h3 className="font-heading text-lg text-white mb-4">
                  Related Minerals
                </h3>
                <div className="space-y-1">
                  {crystal.relatedMinerals.map((rel, i) => {
                    const slug = findCrystalSlug(rel.name);
                    return (
                      <RelatedMineralItem
                        key={i}
                        name={rel.name}
                        relation={rel.relation}
                        color={rel.color}
                        hasPage={!!slug}
                        slug={slug}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE: Related Minerals at bottom */}
        <div className="lg:hidden mt-10">
          <div className="bg-brand-surface border border-brand-border rounded-xl p-5">
            <h3 className="font-heading text-lg text-white mb-4">
              Related Minerals
            </h3>
            <div className="space-y-1">
              {crystal.relatedMinerals.map((rel, i) => {
                const slug = findCrystalSlug(rel.name);
                return (
                  <RelatedMineralItem
                    key={i}
                    name={rel.name}
                    relation={rel.relation}
                    color={rel.color}
                    hasPage={!!slug}
                    slug={slug}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
