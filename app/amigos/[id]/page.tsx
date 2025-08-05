import { PerfilAmigo } from "@/components/perfilAmigo";
import { fetchApiSwr } from "@/lib/api";
import { Main } from "@/ui/container";
import type { Metadata, ResolvingMetadata } from "next";
import { cookies } from "next/headers";

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
    title: data?.user?.fullName ? data?.user?.fullName + " | UniRed" : "Usuario no existe | Unired",
    description: `Usuario ${data?.user?.fullName || "unired"} de unired`,
    metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),

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

  return (
    <Main>
      <PerfilAmigo data={data} />
    </Main>
  );
}
