import { PerfilAmigo } from "@/components/perfilAmigo";
import { fetchApiSwr } from "@/lib/api";
import metadataImport from "@/lib/metadatos";
import { Main } from "@/ui/container";
import type { Metadata, ResolvingMetadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = (await params).id;

  // fetch data
  const response = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/user/amigos/` + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await response.json();
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    ...metadataImport,
    title: data?.user?.fullName ? data?.user?.fullName + " | UniRed" : "Usuario no existe | Unired",
    description: `Conoce el perfil de ${data?.user?.fullName} de UniRed.`,
    keywords: [
      "UniRed",
      "Red Social",
      "Amigos",
      "Conectar",
      "Perfil de Usuario",
      "Comunidad",
      "Interacción Social",
      "Bruno Ken",
      data?.user?.fullName || "Usuario",
    ],
    alternates: {
      canonical: `https://unired.vercel.app/amigos/${data?.user?.id || 0}`,
    },
    openGraph: {
      images: [data?.user?.img || "/user.webp", ...previousImages],
      title: data?.user?.fullName ? data?.user?.fullName + " | UniRed" : "Unired",
      description: `Usuario ${data?.user?.fullName || "no existe"} de unired`,
      type: "website",
      url: `https://unired.vercel.app/amigos/${data?.user?.id | 0}`,
    },
    twitter: {
      images: [data?.user?.img || "/user.webp", ...previousImages],
      title: data?.user?.fullName
        ? data?.user?.fullName + " | UniRed"
        : "Usuario no existe | Unired",
      description: `Usuario ${data?.user?.fullName || "no existe"} de unired`,
      creator: "Bruno Ken",
      card: "summary_large_image",
      site: `https://unired.vercel.app/amigos/${data?.user?.id | 0}`,
    },
  };
}

export default async function ({ params }: { params: { id: string } }) {
  const api = `/user/amigos/${params.id}`;
  const token = cookies().get("token")?.value;
  const option = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Autorization: `Bearer ${token}`,
    },
    credentials: "include",
  };
  const data = await fetchApiSwr(api, option);
  if (data?.id_user === data?.user?.id) {
    redirect("/perfil");
  }

  return (
    <Main>
      <PerfilAmigo data={data} />
    </Main>
  );
}
