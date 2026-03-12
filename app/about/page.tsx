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
          Geology databases have accurate data and terrible interfaces. Crystal
          wellness sites have beautiful design and questionable science. Crystal
          Almanac bridges both: every profile is built on real mineralogy -
          formation conditions, chemical composition, hardness, locality data -
          written the way great science journalism reads. Vivid, specific, and
          honest.
        </p>

        <p>
          When we cover metaphysical traditions, we present them as exactly that -
          traditions with real cultural history, clearly distinct from scientific
          evidence. Every profile includes a fake-spotting section because the
          crystal market is full of dyed, synthetic, and mislabeled material. If
          you're spending money on a stone, you should know what you're buying.
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
