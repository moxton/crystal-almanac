import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Crystal Almanac bridges geological science and crystal traditions with accurate, beautifully presented mineral profiles.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <p className="text-brand-accent text-sm uppercase tracking-[0.15em] font-body mb-4">
        About
      </p>
      <h1 className="font-heading text-4xl md:text-5xl text-white">
        Why This <em>Exists</em>
      </h1>

      <div className="mt-10 space-y-6 text-white/85 font-body leading-relaxed">
        <p>
          Crystal Almanac was built out of frustration with a gap that shouldn't
          exist.
        </p>

        <p>
          On one side: geology databases with accurate mineralogical data buried
          in interfaces that look like they were built in 2003. On the other:
          crystal wellness sites full of gorgeous photography and deeply
          questionable science. Collectors and geology enthusiasts get rigorous
          data with no soul. Crystal and wellness communities get beautiful
          content with no accountability.
        </p>

        <p>Nobody was bridging both audiences with something that was both accurate and worth looking at.</p>

        <p>
          Crystal Almanac is that bridge. Every profile here is built on
          verifiable mineralogical science - hardness, crystal system, formation
          conditions, chemical composition, locality data. We write the way great
          science journalists write: vivid, specific, and fascinating. Not dry.
          Not dumbed down. Not making claims we can't support.
        </p>

        <p>
          When we cover metaphysical and cultural traditions, we present them as
          exactly that - traditions. Beliefs with deep historical roots and
          genuine cultural significance, clearly labeled as distinct from
          scientific evidence. We don't mock them. We don't endorse them as
          medical claims. We honor them as part of each mineral's full human
          story.
        </p>

        <p>
          Every crystal page includes a Spotting Fakes section because the
          crystal market is full of dyed, synthetic, and mislabeled material. If
          you're spending money on a stone, you should know what you're buying.
        </p>

        <p className="text-brand-accent font-medium">
          Beautiful, accurate, honest. That's the whole idea.
        </p>
      </div>

      <div className="mt-16 border-t border-brand-border pt-8">
        <h2 className="font-heading text-2xl text-white mb-4">
          Our Standards
        </h2>
        <div className="space-y-4 text-white/85 font-body leading-relaxed">
          <p>
            <strong className="text-white">Scientific accuracy first.</strong>{" "}
            Mineralogical data is sourced from peer-reviewed references and
            established geological databases. When information is uncertain, we
            say so.
          </p>
          <p>
            <strong className="text-white">Transparent about traditions.</strong>{" "}
            Metaphysical properties are presented as cultural beliefs, never as
            scientific fact or medical advice.
          </p>
          <p>
            <strong className="text-white">Practical fake-spotting.</strong>{" "}
            Every profile includes specific, actionable guidance on identifying
            treated, synthetic, and mislabeled specimens.
          </p>
          <p>
            <strong className="text-white">No affiliate bias.</strong> When we
            eventually add purchase links, our editorial content remains
            independent. We never adjust identification guidance to favor sellers.
          </p>
        </div>
      </div>
    </div>
  );
}
