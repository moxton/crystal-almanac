import { notFound } from "next/navigation";
import Link from "next/link";
import { getCollectionBySlug, getAllCollectionSlugs } from "@/app/lib/collections";
import { getCrystalById } from "@/app/lib/crystals";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getAllCollectionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) return { title: "Not Found" };

  return {
    title: collection.title,
    description: collection.subtitle + ". " + collection.description.substring(0, 120),
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) notFound();

  const crystals = collection.crystalIds
    .map((id) => getCrystalById(id))
    .filter(Boolean);

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <nav className="mb-6">
        <Link
          href="/collections"
          className="text-brand-accent text-sm font-body hover:underline"
        >
          ← All Collections
        </Link>
      </nav>

      <div
        className="w-12 h-12 rounded-full mb-6 opacity-60"
        style={{ backgroundColor: collection.accentColor }}
      />
      <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white">
        {collection.title}
      </h1>
      <p className="font-heading text-lg text-brand-muted italic mt-2">
        {collection.subtitle}
      </p>

      <div className="mt-8 text-white/80 font-body leading-relaxed">
        <p>{collection.description}</p>
      </div>

      <div className="mt-4 bg-brand-surface border border-brand-border rounded-lg p-4">
        <p className="text-brand-muted/70 text-xs font-body italic">
          {collection.disclaimer}
        </p>
      </div>

      {/* Crystal cards */}
      <div className="mt-12 space-y-4">
        {crystals.map((crystal) => {
          if (!crystal) return null;
          const reason = collection.reasons[crystal.id] || "";
          const gradient =
            crystal.colorHexes.length >= 2
              ? `linear-gradient(135deg, ${crystal.colorHexes.slice(0, 3).join(", ")})`
              : crystal.colorHexes[0] || "#A78BFA";

          return (
            <Link
              key={crystal.id}
              href={`/crystals/${crystal.id}`}
              className="group block bg-brand-surface border border-brand-border rounded-xl overflow-hidden hover:border-brand-accent/40 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row">
                {/* Crystal image */}
                <div
                  className="h-24 sm:h-auto sm:w-28 shrink-0 relative overflow-hidden"
                  style={{ background: gradient }}
                >
                  <img
                    src={`/crystals/${crystal.id}.webp`}
                    alt={crystal.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="font-heading text-xl text-white group-hover:text-brand-accent transition-colors">
                        {crystal.name}
                      </h2>
                      <p className="text-brand-muted text-sm font-body italic">
                        {crystal.subtitle}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-brand-muted font-body shrink-0 ml-4">
                      <span>Hardness {crystal.hardness}</span>
                    </div>
                  </div>
                  {reason && (
                    <p className="text-white/70 text-sm font-body mt-3 leading-relaxed">
                      {reason}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
