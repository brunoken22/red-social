import { NextResponse } from 'next/server';
import { fetchApiSwr } from '@/lib/api';

type GoogleUserData = {
  email: string;
  name: string;
  picture?: string;
  accessToken: string;
};

type BackendResponse = {
  user: {
    id: string;
    email: string;
    name: string;
    token: string;
  };
  error?: string;
};

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');

    if (!code) {
      throw new Error('Código de autorización no recibido');
    }

    // 1. Intercambiar código por token con Google
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/google`,
        grant_type: 'authorization_code',
      }),
    });

    const tokens = await tokenResponse.json();

    if (!tokens.access_token) {
      throw new Error('No se pudo obtener token de acceso');
    }

    // 2. Obtener datos del usuario desde Google
    const userInfo = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    });

    const googleUser: GoogleUserData = await userInfo.json();

    // 3. Usar TU fetchApiSwr para crear/autenticar usuario
    const apiEndpoint = '/auth/google';
    const userPayload = {
      email: googleUser.email,
      fullName: googleUser.name,
      img: googleUser.picture,
      googleToken: tokens.access_token,
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include' as const,
      body: JSON.stringify(userPayload),
    };

    // Usando tu fetchApiSwr personalizado
    const response = await fetchApiSwr(apiEndpoint, options);
    console.log('ESTE ES EL RESPONSE ', response);
    if (!response?.user) {
      throw new Error(response?.error || 'Error al crear usuario');
    }

    // 4. Configurar respuesta con cookies
    const redirectResponse = NextResponse.redirect(new URL('/inicio', request.url));

    // Cookie de autenticación
    redirectResponse.cookies.set('auth_token', response.user.token, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 1 semana
      domain: process.env.COOKIE_DOMAIN || 'localhost',
    });

    return redirectResponse;
  } catch (error: any) {
    console.error('Error en autenticación Google:', error);
    return NextResponse.redirect(new URL(`/iniciarSesion`, request.url));
  }
}
