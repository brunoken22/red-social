import type { MetadataRoute } from "next";

const baseUrl = "https://unired.vercel.app";
const Api_url = process.env.NEXT_PUBLIC_PORT || "https://red-social-node-production.up.railway.app";

export async function generateSitemaps() {
  try {
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

    // Asegúrate de que la API retorna un array de objetos con { id: number }
    // Si no, transforma los datos aquí
    const sitemapIds = Array.isArray(data)
      ? data.map((item: any) => ({ id: item.id || item.userId || item._id }))
      : [{ id: 0 }]; // Fallback si la API falla

    console.log("Sitemap IDs generados:", sitemapIds);
    return sitemapIds;
  } catch (error) {
    console.error("Error fetching sitemap data:", error);
    // Fallback para evitar errores en build
    return [{ id: 0 }];
  }
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  try {
    console.log("Generando sitemap para ID:", id);

    // Obtener los usuarios para este segmento del sitemap
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

    const users = await response.json();

    // Transformar los usuarios en URLs del sitemap
    const userUrls = users.map((user: { id: string; fullName: string }) => ({
      url: `${baseUrl}/amigos/${user.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    return userUrls;
  } catch (error) {
    console.error(`Error generating sitemap for id ${id}:`, error);
    // Retornar array vacío en caso de error
    return [];
  }
}
