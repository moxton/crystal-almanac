import { notFound } from "next/navigation";
import Link from "next/link";
import { getColorFamily, COLOR_FAMILIES } from "@/app/lib/colors";
import { getAllCrystals } from "@/app/lib/crystals";
import type { Crystal } from "@/app/lib/crystals";
import type { Metadata } from "next";

export function generateStaticParams() {
  return COLOR_FAMILIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const family = getColorFamily(slug);
  if (!family) return { title: "Not Found" };

  return {
    title: `${family.name} Crystals - The Science of ${family.name} in Minerals`,
    description: `All ${family.name.toLowerCase()} crystals and minerals, with the geological explanation of what makes them this color.`,
  };
}

export default async function ColorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const family = getColorFamily(slug);
  if (!family) notFound();

  const allCrystals = getAllCrystals();
  const matching = allCrystals.filter((c) =>
    c.colors.some((col) =>
      family.matchTerms.some((m) => col.toLowerCase().includes(m))
    )
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <nav className="mb-6">
        <Link
          href="/colors"
          className="text-brand-accent text-sm font-body hover:underline"
        >
          ← All Colors
        </Link>
      </nav>

      {/* Hero with color gradient */}
      <div
        className="rounded-xl p-8 md:p-12 mb-10 relative overflow-hidden"
        style={{ background: family.gradient }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-brand-bg/70 to-brand-bg/30" />
        <div className="relative">
          <p className="text-white/60 text-sm uppercase tracking-[0.15em] font-body mb-2">
            {matching.length} crystals
          </p>
          <h1 className="font-heading text-4xl md:text-5xl text-white">
            {family.name} <em>Crystals</em>
          </h1>
        </div>
      </div>

      {/* Science of this color */}
      <div className="bg-brand-surface border border-brand-border rounded-xl p-6 mb-10">
        <h2 className="font-heading text-lg text-white mb-3">
          What Makes Minerals {family.name}?
        </h2>
        <p className="text-white/80 text-sm font-body leading-relaxed">
          {family.science}
        </p>
      </div>

      {/* Crystal grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {matching
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((crystal) => {
            const gradient =
              crystal.colorHexes.length >= 2
                ? `linear-gradient(135deg, ${crystal.colorHexes.slice(0, 3).join(", ")})`
                : crystal.colorHexes[0] || "#A78BFA";

            return (
              <Link
                key={crystal.id}
                href={`/crystals/${crystal.id}`}
                className="group bg-brand-surface border border-brand-border rounded-xl overflow-hidden hover:border-brand-accent/40 transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className="h-20 relative"
                  style={{ background: gradient }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/40 to-transparent" />
                </div>
                <div className="p-4">
                  <h3 className="font-heading text-base text-white group-hover:text-brand-accent transition-colors">
                    {crystal.name}
                  </h3>
                  <p className="text-brand-muted text-sm font-body italic mt-0.5">
                    {crystal.subtitle}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-brand-muted text-xs font-body">
                      Hardness {crystal.hardness}
                    </span>
                    <span className="text-brand-border">·</span>
                    <span className="text-brand-muted text-xs font-body">
                      {crystal.category}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}
