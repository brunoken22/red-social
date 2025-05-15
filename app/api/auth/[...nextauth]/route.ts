// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
import GoogleProvider from 'next-auth/providers/google';

declare module 'next-auth' {
  interface Session {
    accessToken?: JWT;
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
          role: 'user', // Campo personalizado opcional
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Guardar el token de acceso de Google
      if (account) {
        token.accessToken = account.access_token;
      }

      if (user) {
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token }) {
      // Pasar el accessToken a la sesión del cliente
      if (session.user) {
        session.accessToken = token.accessToken as JWT;
      }
      return session;
    },
  },
  debug: true, // Muestra logs en consola para depurar
});

export { handler as GET, handler as POST };
