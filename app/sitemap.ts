import { getAllCrystals } from "@/app/lib/crystals";
import { getAllCollectionSlugs } from "@/app/lib/collections";
import { COLOR_FAMILIES } from "@/app/lib/colors";
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

  const collectionPages = getAllCollectionSlugs().map((slug) => ({
    url: `${baseUrl}/collections/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const colorPages = COLOR_FAMILIES.map((family) => ({
    url: `${baseUrl}/colors/${family.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
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
    {
      url: `${baseUrl}/birthstones`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/hardness`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/care`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...crystalPages,
    {
      url: `${baseUrl}/collections`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...collectionPages,
    {
      url: `${baseUrl}/colors`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...colorPages,
  ];
}
