import ContactForm from "@/components/contactForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto | UniRed",
  description: "Contacto",
  metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),

  openGraph: {
    title: "Contacto | UniRed",
    description:
      "Ponte en contacto con nosotros para enviar tus comentarios, reportar errores o hacer preguntas sobre UniRed.",
    images: "/icon512_rounded.png",
    url: "https://unired.vercel.app/contacto",
    type: "website",
  },
  twitter: {
    title: "Contacto | UniRed",
    description:
      "Ponte en contacto con nosotros para enviar tus comentarios, reportar errores o hacer preguntas sobre UniRed.",
    creator: "@brunoken",
    images: "/icon512_rounded.png",
  },
};

export default function ContactPage() {
  return (
    <div className='flex flex-col justify-between'>
      <main className='h-full bg-transparent dark:bg-dark py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md mx-auto bg-primary dark:bg-darkComponet rounded-lg shadow-md overflow-hidden md:max-w-2xl'>
          <div className='md:flex'>
            <div className='p-8 w-full'>
              <div className='uppercase tracking-wide text-sm text-light font-semibold mb-1'>
                Contacto
              </div>
              <h1 className='block mt-1 text-3xl leading-tight font-bold text-secundary dark:text-primary mb-6'>
                UniRed
              </h1>
              <p className='mt-2 text-secundary dark:text-primary mb-6'>
                ¿Tienes alguna pregunta, sugerencia o simplemente quieres saludar? Nos encantaría
                saber de ti.
              </p>

              <ContactForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
