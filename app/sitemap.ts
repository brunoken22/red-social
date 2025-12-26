// app/sitemap.ts
import { MetadataRoute } from "next";

const Api_url = process.env.NEXT_PUBLIC_PORT || "https://red-social-node-production.up.railway.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://unired.vercel.app";
  const response = await fetch(`${Api_url}/api/users/sitemap`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  const sitemapIdsUser = data.map((user: { id: string }) => ({
    url: `${baseUrl}/amigos/${user.id}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/crearCuenta`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    },
    ...sitemapIdsUser,
  ];
}
