import Link from "next/link";
import { getAllPosts } from "@/app/lib/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Crystal identification guides, collecting tips, and the science behind your favorite stones.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <p className="text-brand-accent text-sm uppercase tracking-[0.15em] font-body mb-4">
        Blog
      </p>
      <h1 className="font-heading text-4xl md:text-5xl text-white">
        Guides & <em>Articles</em>
      </h1>
      <p className="text-brand-muted text-lg font-body mt-4 max-w-2xl">
        Crystal identification, collecting tips, and the real science behind
        your favorite stones.
      </p>

      <div className="mt-12 space-y-6">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
            <article className="bg-brand-surface border border-brand-border rounded-xl p-6 hover:border-brand-accent/40 transition-all duration-300">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-heading text-xl text-white group-hover:text-brand-accent transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-brand-muted text-sm font-body mt-2 line-clamp-2">
                    {post.description}
                  </p>
                </div>
                <time className="text-brand-muted/60 text-xs font-body whitespace-nowrap mt-1">
                  {new Date(post.publishDate + "T12:00:00").toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </div>
            </article>
          </Link>
        ))}

        {posts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-brand-muted text-lg font-body">
              Blog posts coming soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
