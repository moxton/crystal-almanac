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
          Crystal Almanac is a modern encyclopedia of crystals, minerals, and
          stones. Every profile covers real geology - how it forms, how to
          identify it, what makes it special - written to be genuinely
          interesting, not dry. We also cover metaphysical and cultural
          traditions as part of each mineral's story, clearly presented as
          traditions rather than scientific claims.
        </p>

        <p>
          Whether you're a collector, a geology nerd, or just someone who
          picked up a pretty rock and wants to know what it is, this is
          built for you.
        </p>
      </div>
    </div>
  );
}
