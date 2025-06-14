// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
import GoogleProvider from 'next-auth/providers/google';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    backendToken?: string; // Token de tu backend
  }
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: 'consent',
        },
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: 'user',
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token;
        // Llamar a tu API backend solo durante el primer login
        if (account.provider === 'google' && !token.backendToken) {
          try {
            const response = await fetch(`${process.env.PORT_BACKEND}/api/auth/google`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: user.email,
                fullName: user.name,
                img: user.image,
                accessToken: account.access_token,
              }),
              credentials: 'include',
            });
            console.log('response', response);
            const data = await response.json();
            console.log('PROBANDO RESPUESTA Y TOKEN DE GOOGLE ', data, account.access_token);
            if (data.token) {
              token.backendToken = data.token;
            }
          } catch (error) {
            console.error('Error calling backend API:', error);
          }
        }
      }

      if (user) {
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.accessToken = token.accessToken as string;
        session.backendToken = token.backendToken as string;
      }
      // console.log('SESSION: ', session);
      return session;
    },
  },
});

export { handler as GET, handler as POST };
