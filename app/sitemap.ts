// app/sitemap.ts
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://unired.vercel.app";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    // {
    //   url: `${baseUrl}/amigos`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly' as const,
    //   priority: 0.8,
    // },
    // {
    //   url: `${baseUrl}/chat`,
    //   lastModified: new Date(),
    //   changeFrequency: 'daily' as const,
    //   priority: 0.9,
    // },
    // {
    //   url: `${baseUrl}/configuracion`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly' as const,
    //   priority: 0.5,
    // },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/crearCuenta`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    },
    // {
    //   url: `${baseUrl}/iniciarSesion`,
    //   lastModified: new Date(),
    //   changeFrequency: 'yearly' as const,
    //   priority: 0.7,
    // },
    // {
    //   url: `${baseUrl}/inicio`,
    //   lastModified: new Date(),
    //   changeFrequency: 'daily' as const,
    //   priority: 1,
    // },
    // {
    //   url: `${baseUrl}/notificaciones`,
    //   lastModified: new Date(),
    //   changeFrequency: 'daily' as const,
    //   priority: 0.8,
    // },
    // {
    //   url: `${baseUrl}/perfil`,
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly' as const,
    //   priority: 0.8,
    // },
    // {
    //   url: `${baseUrl}/search`,
    //   lastModified: new Date(),
    //   changeFrequency: 'daily' as const,
    //   priority: 0.7,
    // },
  ];
}
