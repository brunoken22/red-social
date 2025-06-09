import { NextResponse, NextRequest } from 'next/server';
import { fetchApiSwr } from './lib/api';

export async function middleware(request: NextRequest) {
  try {
    // Si el usuario está autenticado, inserta la cookie
    const token = request.cookies.get('token')?.value;
    if (!token) {
      if (
        request.nextUrl.pathname !== '/iniciarSesion' &&
        request.nextUrl.pathname !== '/' &&
        request.nextUrl.pathname !== '/crearCuenta'
      ) {
        return NextResponse.redirect(new URL('/', request.url));
      }
      return NextResponse.next();
    } else {
      const DATA = await fetchApiSwr('/user/middelware', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      console.log('ESTO ES LA RESPUESTA ', DATA);
      if (!DATA.success) {
        const response = NextResponse.next();
        response.cookies.delete('token');
        return NextResponse.redirect(new URL('/iniciarSesion', request.url));
      }
      if (
        request.nextUrl.pathname === '/iniciarSesion' ||
        request.nextUrl.pathname === '/crearCuenta' ||
        request.nextUrl.pathname === '/'
      ) {
        return NextResponse.redirect(new URL('/inicio', request.url));
      }
      return NextResponse.next();
    }
  } catch (e: any) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}
export const config = {
  matcher: [
    '/inicio',
    '/amigos',
    '/configuracion',
    '/chat',
    '/notificaciones/:path*',
    '/perfil',
    '/search',
    '/iniciarSesion',
    '/crearCuenta',
    '/',
  ],
};
