import Link from "next/link";
import { COLOR_FAMILIES } from "@/app/lib/colors";
import { getAllCrystals } from "@/app/lib/crystals";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crystals by Color",
  description:
    "Browse crystals by color family - and learn the geology behind why minerals are purple, blue, green, red, or any other color.",
};

export default function ColorsPage() {
  const crystals = getAllCrystals();

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <p className="text-brand-accent text-sm uppercase tracking-[0.15em] font-body mb-4">
        Browse by Color
      </p>
      <h1 className="font-heading text-4xl md:text-5xl text-white">
        The Geology of <em>Color</em>
      </h1>
      <p className="text-brand-muted text-lg font-body mt-4 max-w-2xl leading-relaxed">
        Why are crystals the colors they are? Every color in the mineral kingdom
        has a specific chemical cause - trace elements, crystal defects, or light
        physics. Explore by color family.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12">
        {COLOR_FAMILIES.map((family) => {
          const count = crystals.filter((c) =>
            c.colors.some((col) =>
              family.matchTerms.some((m) => col.toLowerCase().includes(m))
            )
          ).length;

          return (
            <Link
              key={family.slug}
              href={`/colors/${family.slug}`}
              className="group relative overflow-hidden rounded-xl border border-brand-border hover:border-brand-accent/40 transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className="aspect-square flex flex-col justify-end p-4"
                style={{ background: family.gradient }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/80 via-brand-bg/20 to-transparent" />
                <div className="relative">
                  <h2 className="font-heading text-lg text-white group-hover:text-brand-accent transition-colors">
                    {family.name}
                  </h2>
                  <p className="text-white/60 text-xs font-body mt-1">
                    {count} crystals
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-16 bg-brand-surface border border-brand-border rounded-xl p-6 max-w-2xl">
        <h2 className="font-heading text-xl text-white mb-3">
          Why Minerals Have Color
        </h2>
        <div className="space-y-3 text-white/80 text-sm font-body leading-relaxed">
          <p>
            Color in minerals comes from three main mechanisms.
            <strong className="text-white"> Transition metal impurities</strong> are
            the most common - atoms of iron, copper, chromium, or manganese
            substituting into a crystal's structure absorb specific wavelengths
            of light and transmit the rest as visible color.
          </p>
          <p>
            <strong className="text-white">Crystal field effects</strong> determine
            exactly which wavelengths are absorbed - the same element can produce
            different colors in different mineral structures. Chromium makes ruby
            red and emerald green because the surrounding crystal geometry
            changes which wavelengths chromium absorbs.
          </p>
          <p>
            <strong className="text-white">Physical optics</strong> produce color
            without any chromophore element at all. Opal's play of color comes
            from diffraction. Labradorite's flash comes from thin-film
            interference. Blue lace agate's blue comes from Rayleigh scattering.
            These are the same physics that make rainbows, soap bubbles, and the
            sky blue.
          </p>
        </div>
      </div>
    </div>
  );
}
