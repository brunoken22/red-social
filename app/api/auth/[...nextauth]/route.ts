import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
import GoogleProvider from 'next-auth/providers/google';
// types/next-auth.d.ts

declare module 'next-auth' {
  interface Session {
    accessToken: JWT; // Extiende la sesión para incluir accessToken
  }
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: 'user', // Campo personalizado
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  session: {
    strategy: 'jwt', // ¡Obligatorio para token!
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Paso 1: Guardar datos iniciales del usuario
      if (user) {
        token.id = user.id;
      }

      // Paso 2: Guardar el access_token de Google
      if (account) {
        token.accessToken = account.access_token; // Guardar el token de acceso de Google
      }

      return token;
    },
    async session({ session, token }) {
      // Paso 3: Enviar datos al cliente
      if (session.user) {
        session.accessToken = token.accessToken as JWT; // Añadir accessToken a la sesión
      }
      return session;
    },
  },
  debug: true, // Ver logs en consola
});

export { handler as GET, handler as POST };
