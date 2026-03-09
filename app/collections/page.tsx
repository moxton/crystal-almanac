import Link from "next/link";
import { COLLECTIONS } from "@/app/lib/collections";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crystal Collections",
  description:
    "Curated crystal collections by tradition and use - calming, protection, love, creativity, grounding, abundance, communication, and meditation stones.",
};

export default function CollectionsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <p className="text-brand-accent text-sm uppercase tracking-[0.15em] font-body mb-4">
        Curated
      </p>
      <h1 className="font-heading text-4xl md:text-5xl text-white">
        Crystal <em>Collections</em>
      </h1>
      <p className="text-brand-muted text-lg font-body mt-4 max-w-2xl leading-relaxed">
        Crystals grouped by their longest-standing cultural associations.
        Each collection documents the traditions behind the stones, not
        prescriptions for their use.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
        {COLLECTIONS.map((col) => (
          <Link
            key={col.slug}
            href={`/collections/${col.slug}`}
            className="group bg-brand-surface border border-brand-border rounded-xl p-5 hover:border-brand-accent/40 transition-all duration-300 hover:-translate-y-1"
          >
            <div
              className="w-8 h-8 rounded-full mb-4 opacity-60 group-hover:opacity-100 transition-opacity"
              style={{ backgroundColor: col.accentColor }}
            />
            <h2 className="font-heading text-lg text-white group-hover:text-brand-accent transition-colors">
              {col.title}
            </h2>
            <p className="text-brand-muted text-sm font-body mt-2 line-clamp-2">
              {col.subtitle}
            </p>
            <p className="text-brand-muted/50 text-xs font-body mt-3">
              {col.crystalIds.length} stones
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
