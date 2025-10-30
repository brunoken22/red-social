import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { cookies } from "next/headers";
import Layout from "@/components/layout";
const poppins = Poppins({ weight: "400", subsets: ["latin"] });
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),
  title: "UniRed",
  description: "Red social",
  keywords:
    "La red social líder para conectar con amigos, compartir fotos. Únete hoy mismo y forma parte de nuestra comunidad.",
  facebook: {
    appId: "501335862562150",
  },
  manifest: "/manifest.json",
  verification: {
    google: "CnmK8AWJQTO2MYQ5J7dOu9_dhCFy-ttErrYHDEWbOyw",
  },
  openGraph: {
    title: "Bienvenid@ a UniRed",
    description: "Conéctate con amigos y descubre nuevas personas en nuestra red social(UniRed)",
    images: "/icon512_rounded.png",
    url: "https://unired.vercel.app/",
    type: "website",
  },
  twitter: {
    title: "Bienvenid@ a UniRed",
    description: "Conéctate con amigos y descubre nuevas personas en nuestra red social(UniRed)",
    creator: "@brunoken",
    images: "/icon512_rounded.png",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = (await cookies()).get("theme")?.value || "false";
  return (
    <html lang='es' className={`${theme !== "true" ? "" : "dark"}`}>
      <head>
        <link rel='preconnect' href='https://red-social-node.onrender.com' />
        <link rel='preconnect' href='https://res.cloudinary.com' />
        <meta name='color-scheme' content='only light' />
      </head>
      <body className={`${poppins.className} dark:bg-dark dark:text-white dark:transition-dark`}>
        <Layout themeDate={theme}>{children}</Layout>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
