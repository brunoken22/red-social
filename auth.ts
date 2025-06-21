import NextAuth, { AuthError, CredentialsSignin } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { fetchApiSwr } from './lib/api';
import { cookies } from 'next/headers';

class CustomAuthError extends CredentialsSignin {
  constructor(code: string) {
    super();
    this.code = code;
    this.message = code;
    this.stack = undefined;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: { prompt: 'consent' },
      },
      profile(profile) {
        return profile;
      },
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'bruno_am_22@hotmail.com' },
        password: { label: 'Contraseña', type: 'password', placeholder: '••••••' },
        fullName: { label: 'Nombre Completo', type: 'text', placeholder: 'Bruno ken' },
        signup: { label: 'Crear cuenta', type: 'hidden', value: 'false' },
      },
      async authorize(credentials) {
        try {
          if (credentials.email === '' || credentials.password === '') return null;
          if (credentials.signup && credentials.signup === 'true') {
            const api = '/auth';
            const option = {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                fullName: credentials.fullName,
                email: credentials.email,
                password: credentials.password,
              }),
            };
            const data = await fetchApiSwr(api, option);
            if (data === 'Usuario Registrado') {
              throw new CustomAuthError(data || 'Credenciales incorrectas');
            }
            if (data?.user?.id) {
              cookies().set('token', data.token);
            }
            return data;
          } else {
            const api = '/signin';
            const option = {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(credentials),
            };
            const data = credentials.email ? await fetchApiSwr(api, option) : null;
            if (data?.user?.id) {
              cookies().set('token', data.token);
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
    strategy: 'jwt',
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
            const response = await fetch(`${process.env.PORT_BACKEND}/api/auth-google`, {
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
            });

            const data = await response.json();
            if (data.token) {
              cookies().set('token', data.token);
            }
          } catch (error) {
            console.error('Error al obtener backendToken:', error);
          }
        }
      }

      if (user?.id) {
        token.id = user.id;
      }
      const token_auth = cookies().get('token')?.value;
      if (!token_auth) return null;
      return token;
    },
  },
});
