import Link from "next/link";
import { getCrystalById } from "@/app/lib/crystals";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Birthstones by Month",
  description:
    "The complete birthstone guide - modern and traditional birthstones for every month, with geological origins, historical designations, and buying guidance.",
};

interface BirthstoneMonth {
  month: string;
  number: number;
  modern: { name: string; id: string | null };
  traditional: { name: string; id: string | null } | null;
  alternative: { name: string; id: string | null }[];
  history: string;
  color: string;
}

const BIRTHSTONES: BirthstoneMonth[] = [
  {
    month: "January",
    number: 1,
    modern: { name: "Garnet", id: "garnet" },
    traditional: null,
    alternative: [{ name: "Rose Quartz", id: "rose-quartz" }],
    history: "Garnet has represented January since the ancient world. The name comes from the Latin 'granatum' (pomegranate) for the stone's resemblance to the fruit's seeds. The National Association of Jewelers formalized it in 1912.",
    color: "#991B1B",
  },
  {
    month: "February",
    number: 2,
    modern: { name: "Amethyst", id: "amethyst" },
    traditional: null,
    alternative: [{ name: "Bloodstone", id: "bloodstone" }],
    history: "Amethyst was considered as valuable as diamond until massive Brazilian deposits were found in the 18th century. The ancient Greeks believed it prevented intoxication - the name literally means 'not drunk.'",
    color: "#7C3AED",
  },
  {
    month: "March",
    number: 3,
    modern: { name: "Aquamarine", id: "aquamarine" },
    traditional: { name: "Bloodstone", id: "bloodstone" },
    alternative: [],
    history: "Bloodstone was March's original birthstone for centuries before the jewelry industry replaced it with the more commercially appealing aquamarine in 1912. Bloodstone remains the traditional alternative.",
    color: "#38BDF8",
  },
  {
    month: "April",
    number: 4,
    modern: { name: "Diamond", id: "diamond" },
    traditional: null,
    alternative: [{ name: "Clear Quartz", id: "clear-quartz" }, { name: "Herkimer Diamond", id: null }],
    history: "Diamond's association with April dates to the 15th century. Its status as the engagement stone is largely a 20th century invention by De Beers. Before industrial mining, diamonds were genuinely rare and restricted to royalty.",
    color: "#F0F9FF",
  },
  {
    month: "May",
    number: 5,
    modern: { name: "Emerald", id: "emerald" },
    traditional: null,
    alternative: [{ name: "Chrysoprase", id: "chrysoprase" }],
    history: "Emerald has been May's birthstone since antiquity. Cleopatra claimed ownership of all Egyptian emerald mines. The Incas and Aztecs revered emeralds as sacred. Colombian mines remain the world's finest source.",
    color: "#059669",
  },
  {
    month: "June",
    number: 6,
    modern: { name: "Pearl", id: "pearl" },
    traditional: { name: "Alexandrite", id: "alexandrite" },
    alternative: [{ name: "Moonstone", id: "moonstone" }],
    history: "June is unusual in having three recognized birthstones. Pearl is the traditional choice, alexandrite was added in 1952 for its rarity, and moonstone offers an affordable alternative. All three share an ethereal, light-playing quality.",
    color: "#E2E8F0",
  },
  {
    month: "July",
    number: 7,
    modern: { name: "Ruby", id: "ruby" },
    traditional: null,
    alternative: [{ name: "Carnelian", id: "carnelian" }],
    history: "Ruby has been the king of July since ancient Hindu tradition assigned gemstones to celestial bodies. Sanskrit texts call ruby 'ratnaraj' - king of precious stones. Fine rubies have sold for more per carat than diamonds.",
    color: "#DC2626",
  },
  {
    month: "August",
    number: 8,
    modern: { name: "Peridot", id: "peridot" },
    traditional: { name: "Spinel", id: "spinel" },
    alternative: [{ name: "Sardonyx", id: null }],
    history: "Peridot was mined on the Egyptian island of Zabargad for over 3,500 years. Spinel was added as an August birthstone in 2016 - a long overdue recognition after centuries of being confused with ruby.",
    color: "#84CC16",
  },
  {
    month: "September",
    number: 9,
    modern: { name: "Sapphire", id: "sapphire" },
    traditional: null,
    alternative: [{ name: "Lapis Lazuli", id: "lapis-lazuli" }],
    history: "Sapphire has represented September since the Middle Ages, when clergy wore blue sapphires to symbolize heaven. The most famous sapphire in modern history is Princess Diana's engagement ring, now worn by Catherine, Princess of Wales.",
    color: "#2563EB",
  },
  {
    month: "October",
    number: 10,
    modern: { name: "Opal", id: "opal" },
    traditional: { name: "Tourmaline", id: "tourmaline" },
    alternative: [],
    history: "Opal suffered a reputation crisis in the 19th century after Walter Scott's novel 'Anne of Geierstein' associated it with bad luck. The Australian opal industry spent decades rehabilitating the stone's image. Tourmaline was added as an alternative in 1912.",
    color: "#F0F9FF",
  },
  {
    month: "November",
    number: 11,
    modern: { name: "Topaz", id: "topaz" },
    traditional: { name: "Citrine", id: "citrine" },
    alternative: [],
    history: "Topaz and citrine share November. Most 'citrine' in jewelry stores is actually heat-treated amethyst. Imperial topaz from Brazil (natural orange) is vastly more valuable than the ubiquitous treated blue topaz.",
    color: "#F59E0B",
  },
  {
    month: "December",
    number: 12,
    modern: { name: "Tanzanite", id: "tanzanite" },
    traditional: { name: "Turquoise", id: "turquoise" },
    alternative: [{ name: "Zircon", id: "zircon" }, { name: "Blue Topaz", id: "topaz" }],
    history: "December has the most birthstones of any month. Turquoise is ancient, zircon is historic, and tanzanite was added in 2002 after heavy lobbying by Tiffany & Co. All share a blue palette but are vastly different minerals.",
    color: "#06B6D4",
  },
];

function BirthstoneCard({ data }: { data: BirthstoneMonth }) {
  const modernCrystal = data.modern.id ? getCrystalById(data.modern.id) : null;
  const gradientColor = data.color;

  return (
    <div className="bg-brand-surface border border-brand-border rounded-xl overflow-hidden">
      {/* Color banner */}
      <div
        className="h-2"
        style={{ backgroundColor: gradientColor }}
      />
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-brand-accent text-xs uppercase tracking-[0.15em] font-body">
              Month {data.number}
            </p>
            <h2 className="font-heading text-2xl text-white mt-1">
              {data.month}
            </h2>
          </div>
          <div
            className="w-10 h-10 rounded-full border border-white/10 shrink-0"
            style={{ backgroundColor: gradientColor }}
          />
        </div>

        {/* Modern birthstone */}
        <div className="mt-4">
          <p className="text-brand-muted text-xs uppercase tracking-wider font-body mb-2">
            Modern Birthstone
          </p>
          {data.modern.id ? (
            <Link
              href={`/crystals/${data.modern.id}`}
              className="text-white font-body font-medium text-lg hover:text-brand-accent transition-colors"
            >
              {data.modern.name} →
            </Link>
          ) : (
            <span className="text-white font-body font-medium text-lg">
              {data.modern.name}
            </span>
          )}
          {modernCrystal && (
            <p className="text-brand-muted text-sm font-body mt-1 italic">
              {modernCrystal.subtitle}
            </p>
          )}
        </div>

        {/* Traditional */}
        {data.traditional && (
          <div className="mt-3">
            <p className="text-brand-muted text-xs uppercase tracking-wider font-body mb-1">
              Traditional
            </p>
            {data.traditional.id ? (
              <Link
                href={`/crystals/${data.traditional.id}`}
                className="text-white/80 font-body hover:text-brand-accent transition-colors"
              >
                {data.traditional.name} →
              </Link>
            ) : (
              <span className="text-white/80 font-body">
                {data.traditional.name}
              </span>
            )}
          </div>
        )}

        {/* Alternatives */}
        {data.alternative.length > 0 && (
          <div className="mt-3">
            <p className="text-brand-muted text-xs uppercase tracking-wider font-body mb-1">
              Alternative{data.alternative.length > 1 ? "s" : ""}
            </p>
            <div className="flex flex-wrap gap-2">
              {data.alternative.map((alt, i) =>
                alt.id ? (
                  <Link
                    key={i}
                    href={`/crystals/${alt.id}`}
                    className="text-white/60 text-sm font-body hover:text-brand-accent transition-colors"
                  >
                    {alt.name} →
                  </Link>
                ) : (
                  <span key={i} className="text-white/60 text-sm font-body">
                    {alt.name}
                  </span>
                )
              )}
            </div>
          </div>
        )}

        {/* History */}
        <p className="text-white/70 text-sm font-body leading-relaxed mt-4 pt-4 border-t border-brand-border/50">
          {data.history}
        </p>
      </div>
    </div>
  );
}

export default function BirthstonesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <p className="text-brand-accent text-sm uppercase tracking-[0.15em] font-body mb-4">
        Reference
      </p>
      <h1 className="font-heading text-4xl md:text-5xl text-white">
        Birthstones by <em>Month</em>
      </h1>
      <p className="text-brand-muted text-lg font-body mt-4 max-w-2xl leading-relaxed">
        Modern and traditional birthstone designations, the history behind each
        assignment, and links to the full geological profile for every stone.
      </p>
      <p className="text-brand-muted/60 text-sm font-body mt-2">
        Modern designations follow the American Gem Trade Association and Jewelers
        of America standards. Traditional designations predate the 1912
        standardization.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {BIRTHSTONES.map((data) => (
          <BirthstoneCard key={data.month} data={data} />
        ))}
      </div>

      <div className="mt-16 bg-brand-surface border border-brand-border rounded-xl p-6 max-w-2xl">
        <h2 className="font-heading text-xl text-white mb-3">
          A Brief History of Birthstones
        </h2>
        <div className="space-y-3 text-white/80 text-sm font-body leading-relaxed">
          <p>
            The concept of birthstones traces to the biblical Breastplate of
            Aaron, which contained twelve stones representing the twelve tribes
            of Israel. By the 18th century, the practice of wearing a stone
            corresponding to one's birth month had become popular in Europe.
          </p>
          <p>
            In 1912, the National Association of Jewelers (now Jewelers of
            America) standardized the modern birthstone list in the United
            States. This list has been updated several times since: alexandrite
            was added for June in 1952, tanzanite for December in 2002, and
            spinel for August in 2016.
          </p>
          <p>
            The selections reflect both historical tradition and commercial
            interests. Some changes were driven by availability (bloodstone
            replaced by aquamarine for March) while others were driven by
            industry lobbying (tanzanite's addition by Tiffany & Co.).
          </p>
        </div>
      </div>
    </div>
  );
}
