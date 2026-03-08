import blogIndex from "@/app/data/blog-index.json";
import fs from "fs";
import path from "path";

export interface BlogPost {
  slug: string;
  file: string;
  title: string;
  description: string;
  publishDate: string;
}

export function getAllPosts(): BlogPost[] {
  const today = new Date().toISOString().split("T")[0];
  return (blogIndex as BlogPost[])
    .filter((p) => p.publishDate <= today)
    .sort((a, b) => b.publishDate.localeCompare(a.publishDate));
}

export function getAllPostSlugs(): string[] {
  return (blogIndex as BlogPost[]).map((p) => p.slug);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return (blogIndex as BlogPost[]).find((p) => p.slug === slug);
}

export function getPostContent(file: string): string {
  const filePath = path.join(process.cwd(), "app", "data", "blog", file);
  return fs.readFileSync(filePath, "utf-8");
}
