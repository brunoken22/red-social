import NextAuth, { CredentialsSignin, DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { fetchApiSwr } from "./lib/api";
import { cookies } from "next/headers";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    id?: string;
    accessToken?: string;
  }
}

class CustomAuthError extends CredentialsSignin {
  constructor(code: string) {
    super();
    this.code = code;
    this.message = code;
    this.stack = undefined;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    error: "/iniciarSesion",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: { prompt: "consent" },
      },
      profile(profile) {
        return profile;
      },
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "bruno_am_22@hotmail.com" },
        password: { label: "Contraseña", type: "password", placeholder: "••••••" },
        fullName: { label: "Nombre Completo", type: "text", placeholder: "Bruno ken" },
        signup: { label: "Crear cuenta", type: "hidden", value: "false" },
      },
      async authorize(credentials) {
        try {
          if (credentials?.email === "" || credentials?.password === "") return null;

          if (credentials?.signup && credentials.signup === "true") {
            const api = "/auth";
            const option = {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                fullName: credentials.fullName,
                email: credentials.email,
                password: credentials.password,
              }),
            };
            const data = await fetchApiSwr(api, option);

            if (data === "Usuario Registrado") {
              throw new CustomAuthError(data || "Credenciales incorrectas");
            }

            if (data?.user?.id) {
              (await cookies()).set("token", data.token);
            }
            return data;
          } else {
            const api = "/signin";
            const option = {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(credentials),
            };
            const data = credentials?.email ? await fetchApiSwr(api, option) : null;

            if (data?.user?.id) {
              (await cookies()).set("token", data.token);
            }
            return data;
          }
        } catch (err: any) {
          throw new CustomAuthError(err.message);
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        token.accessToken = account.access_token;

        if (!token.backendToken) {
          try {
            // URL corregida - usando solo BACKEND_URL
            const backendUrl = process.env.NEXT_PUBLIC_PORT || "http://localhost:3001";
            console.log("ESTE ES EL BACKENDURL: ", backendUrl);
            const response = await fetch(`${backendUrl}/api/auth-google`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify({
                email: user.email,
                fullName: user.name,
                img: user.image,
                accessToken: account.access_token,
              }),
            });

            if (!response.ok) {
              console.error("Error del backend:", response);
            } else {
              const data = await response.json();
              if (data.token) {
                (await cookies()).set("token", data.token);
                token.backendToken = data.token;
              }
            }
          } catch (error) {
            console.error("Error al obtener backendToken:", error);
          }
        }
      }

      if (user?.id) {
        token.id = user.id;
      }

      const token_auth = (await cookies()).get("token")?.value;
      if (!token_auth) return null;

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  // debug: process.env.NODE_ENV === "development",
});
