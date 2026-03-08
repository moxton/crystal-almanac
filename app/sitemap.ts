import { getAllCrystals } from "@/app/lib/crystals";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const crystals = getAllCrystals();
  const baseUrl = "https://crystalalmanac.com";

  const crystalPages = crystals.map((crystal) => ({
    url: `${baseUrl}/crystals/${crystal.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...crystalPages,
  ];
}
