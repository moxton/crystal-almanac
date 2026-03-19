import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPostSlugs, getPostBySlug, getPostContent } from "@/app/lib/blog";
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

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const rawContent = getPostContent(post.file);
  // Remove the title line since we render it separately
  const contentWithoutTitle = rawContent.replace(/^#\s+.+\n/, "");
  const htmlContent = marked(contentWithoutTitle);

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
      </article>
    </>
  );
}
