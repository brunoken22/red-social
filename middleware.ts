import { NextResponse, NextRequest } from 'next/server';
import { fetchApiSwr } from './lib/api';

export async function middleware(request: NextRequest) {
  try {
    // Si el usuario está autenticado, inserta la cookie
    const token = request.cookies.get('token')?.value;
    const pathname = request.nextUrl.pathname;
    if (!token) {
      if (pathname !== '/iniciarSesion' && pathname !== '/' && pathname !== '/crearCuenta') {
        return NextResponse.redirect(new URL('/', request.url));
      }
      return NextResponse.next();
    } else {
      const DATA = await fetchApiSwr('/user/middelware', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      });
      if (!DATA.success || DATA.error) {
        // if (pathname !== '/iniciarSesion') return NextResponse.next();
        const response = NextResponse.next();
        response.cookies.delete('token');
        return NextResponse.next();
        // return NextResponse.redirect(new URL('/iniciarSesion', request.url));
      }
      if (pathname === '/iniciarSesion' || pathname === '/crearCuenta' || pathname === '/') {
        return NextResponse.redirect(new URL('/inicio', request.url));
      }
      return NextResponse.next();
    }
  } catch (error: any) {
    console.error('ESTE ES UN ERROR EN EL MIDDLEWARE', error);
    return NextResponse.redirect(new URL('/', request.url));
  }
}

// export { default } from 'next-auth/middleware';
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
