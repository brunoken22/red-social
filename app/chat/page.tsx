import dynamic from "next/dynamic";
import { fetchApiSwr } from "@/lib/api";
import { DivMain } from "@/ui/container";
import { Metadata } from "next";
import { cookies } from "next/headers";

const TemMensaje = dynamic(() =>
  import("@/components/templateMensaje").then((mod) => mod.TemMensaje)
);

export const metadata: Metadata = {
  title: "Chat | UniRed",
  description: "Conversa con tus amig@s en tiempo real a través del chat de UniRed.",
  metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),

  openGraph: {
    title: "Chat | UniRed",
    description: "Conversa con tus amig@s en tiempo real a través del chat de UniRed.",
    images: "/icon512_rounded.png",
    url: "https://unired.vercel.app/chat",
    type: "website",
  },
  twitter: {
    title: "Chat | UniRed",
    description: "Conversa con tus amig@s en tiempo real a través del chat de UniRed.",
    creator: "@brunoken",
    images: "/icon512_rounded.png",
  },
};

export default async function Mensaje({ searchParams }: { searchParams: Promise<{ id: string }> }) {
  const token = (await cookies()).get("token")?.value;
  const id = (await searchParams).id;
  let userChat;
  if (id) {
    userChat = await fetchApiSwr(`/user/amigos/${id}`, {
      method: "GET",
      authorization: `Bearer ${token}`,
    });
  }
  return (
    <DivMain>
      <TemMensaje
        userChat={userChat && typeof userChat !== "string" && userChat.chat_rtdb ? userChat : null}
      />
    </DivMain>
  );
}
