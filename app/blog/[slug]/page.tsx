import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPostSlugs, getPostBySlug, getPostContent, getAllPosts } from "@/app/lib/blog";
import { getAllCrystals } from "@/app/lib/crystals";
import type { Crystal } from "@/app/lib/crystals";
import { marked } from "marked";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not Found" };

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: `${post.title} | Crystal Almanac`,
      description: post.description,
      type: "article",
      publishedTime: post.publishDate,
    },
  };
}

function BlogJsonLd({ title, description, date, slug }: { title: string; description: string; date: string; slug: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished: date,
    author: {
      "@type": "Organization",
      name: "Crystal Almanac",
      url: "https://crystalalmanac.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Crystal Almanac",
      url: "https://crystalalmanac.com",
      logo: {
        "@type": "ImageObject",
        url: "https://crystalalmanac.com/icon-512.png",
      },
    },
    mainEntityOfPage: `https://crystalalmanac.com/blog/${slug}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// Find crystals mentioned in the blog content by matching crystal names
function findMentionedCrystals(html: string, allCrystals: Crystal[]): Crystal[] {
  const mentioned: Crystal[] = [];
  const seen = new Set<string>();

  // Sort by name length descending so "Rose Quartz" matches before "Quartz"
  const sorted = [...allCrystals].sort((a, b) => b.name.length - a.name.length);

  for (const crystal of sorted) {
    if (seen.has(crystal.id)) continue;
    // Check if the crystal name appears in the text content (strip HTML tags first)
    const textContent = html.replace(/<[^>]+>/g, "");
    const regex = new RegExp(`\\b${crystal.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
    if (regex.test(textContent)) {
      mentioned.push(crystal);
      seen.add(crystal.id);
    }
  }

  return mentioned;
}

// Auto-link crystal names that aren't already inside <a> tags
function autoLinkCrystals(html: string, crystals: Crystal[]): string {
  // Sort by name length descending to match longer names first
  const sorted = [...crystals].sort((a, b) => b.name.length - a.name.length);
  const linked = new Set<string>();

  for (const crystal of sorted) {
    if (linked.has(crystal.id)) continue;
    const name = crystal.name;
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    // Match the crystal name but NOT inside an existing <a> tag or its href
    // Strategy: split by <a...>...</a> segments, only replace in non-link segments
    const parts = html.split(/(<a\b[^>]*>.*?<\/a>)/gi);
    let replaced = false;
    const newParts = parts.map((part) => {
      // Skip parts that are <a> tags
      if (part.startsWith("<a ") || part.startsWith("<a>")) return part;
      // Also skip if inside a tag attribute
      if (replaced) return part;
      const regex = new RegExp(`\\b(${escaped})\\b`, "i");
      if (regex.test(part)) {
        replaced = true;
        return part.replace(regex, `<a href="/crystals/${crystal.id}">$1</a>`);
      }
      return part;
    });
    if (replaced) {
      html = newParts.join("");
      linked.add(crystal.id);
    }
  }

  return html;
}

// Find related blog posts (shared crystal mentions)
function findRelatedPosts(currentSlug: string, mentionedIds: Set<string>) {
  const allPosts = getAllPosts();
  const allCrystals = getAllCrystals();
  const related: { slug: string; title: string; overlap: number }[] = [];

  for (const post of allPosts) {
    if (post.slug === currentSlug) continue;
    const content = getPostContent(post.file);
    const textContent = content.replace(/<[^>]+>/g, "");
    let overlap = 0;
    for (const crystal of allCrystals) {
      if (!mentionedIds.has(crystal.id)) continue;
      const regex = new RegExp(`\\b${crystal.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
      if (regex.test(textContent)) overlap++;
    }
    if (overlap > 0) related.push({ slug: post.slug, title: post.title, overlap });
  }

  return related
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, 3);
}

// Relevant guide pages to suggest based on content
const GUIDE_LINKS = [
  { href: "/care", title: "Crystal Care Guide", keywords: ["water", "sunlight", "toxic", "clean", "safe", "care", "fragile"] },
  { href: "/hardness", title: "Mohs Hardness Scale", keywords: ["hardness", "mohs", "scratch", "durable", "tough"] },
  { href: "/birthstones", title: "Birthstones by Month", keywords: ["birthstone", "birth", "month", "zodiac"] },
  { href: "/groups", title: "Mineral Groups", keywords: ["family", "group", "species", "mineral", "silicate", "quartz family"] },
  { href: "/collections", title: "Crystal Collections", keywords: ["collection", "calming", "protection", "love", "grounding", "meditation"] },
  { href: "/colors", title: "Crystals by Color", keywords: ["color", "purple", "blue", "green", "red", "pink", "black", "white"] },
];

function findRelevantGuides(text: string): { href: string; title: string }[] {
  const lower = text.toLowerCase();
  return GUIDE_LINKS
    .filter((g) => g.keywords.some((kw) => lower.includes(kw)))
    .slice(0, 3);
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const rawContent = getPostContent(post.file);
  const contentWithoutTitle = rawContent.replace(/^#\s+.+\n/, "");
  let htmlContent = await marked(contentWithoutTitle);

  const allCrystals = getAllCrystals();
  const mentioned = findMentionedCrystals(htmlContent, allCrystals);
  const mentionedIds = new Set(mentioned.map((c) => c.id));

  // Auto-link crystal names not already linked
  htmlContent = autoLinkCrystals(htmlContent, mentioned);

  // Find related content
  const relatedPosts = findRelatedPosts(slug, mentionedIds);
  const relevantGuides = findRelevantGuides(rawContent);

  return (
    <>
      <BlogJsonLd
        title={post.title}
        description={post.description}
        date={post.publishDate}
        slug={post.slug}
      />

      <article className="max-w-3xl mx-auto px-4 py-20">
        <nav className="mb-8">
          <Link
            href="/blog"
            className="text-brand-accent text-sm font-body hover:underline"
          >
            ← All Articles
          </Link>
        </nav>

        <header className="mb-10">
          <time className="text-brand-muted/60 text-sm font-body">
            {new Date(post.publishDate + "T12:00:00").toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </time>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white mt-3 leading-tight">
            {post.title}
          </h1>
        </header>

        <div
          className="blog-content font-body text-white/85 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Crystals Mentioned */}
        {mentioned.length > 0 && (
          <section className="mt-16 pt-10 border-t border-brand-border">
            <h2 className="font-heading text-2xl text-white mb-6">
              Crystals in This Article
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {mentioned.slice(0, 12).map((crystal) => {
                const gradient =
                  crystal.colorHexes.length >= 2
                    ? `linear-gradient(135deg, ${crystal.colorHexes.slice(0, 2).join(", ")})`
                    : crystal.colorHexes[0] || "#A78BFA";
                return (
                  <Link
                    key={crystal.id}
                    href={`/crystals/${crystal.id}`}
                    className="group bg-brand-surface border border-brand-border rounded-xl overflow-hidden hover:border-brand-accent/40 transition-colors"
                  >
                    <div
                      className="aspect-square relative overflow-hidden"
                      style={{ background: gradient }}
                    >
                      <img
                        src={`/crystals/${crystal.id}.webp`}
                        alt={crystal.name}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <p className="font-heading text-sm text-white group-hover:text-brand-accent transition-colors truncate">
                        {crystal.name}
                      </p>
                      <p className="text-brand-muted text-xs font-body truncate mt-0.5">
                        {crystal.subtitle}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Related Reading */}
        {(relatedPosts.length > 0 || relevantGuides.length > 0) && (
          <section className="mt-12 pt-10 border-t border-brand-border">
            <h2 className="font-heading text-2xl text-white mb-6">
              Keep Reading
            </h2>
            <div className="space-y-3">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  className="group flex items-center gap-3 bg-brand-surface border border-brand-border rounded-xl px-5 py-4 hover:border-brand-accent/40 transition-colors"
                >
                  <span className="text-brand-accent text-xs font-body uppercase tracking-wider shrink-0">Blog</span>
                  <span className="font-heading text-sm text-white group-hover:text-brand-accent transition-colors">
                    {rp.title}
                  </span>
                </Link>
              ))}
              {relevantGuides.map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="group flex items-center gap-3 bg-brand-surface border border-brand-border rounded-xl px-5 py-4 hover:border-brand-accent/40 transition-colors"
                >
                  <span className="text-emerald-400 text-xs font-body uppercase tracking-wider shrink-0">Guide</span>
                  <span className="font-heading text-sm text-white group-hover:text-brand-accent transition-colors">
                    {guide.title}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
