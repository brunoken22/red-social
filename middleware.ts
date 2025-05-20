import { NextResponse, NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  try {
    // Si el usuario está autenticado, inserta la cookie
    const isToken = request.cookies.get('login')?.value;

    if (isToken !== 'true') {
      const response = NextResponse.next();
      response.cookies.delete('__Host-next-auth.csrf-token');
      response.cookies.delete('__Secure-next-auth.callback-url');
      response.cookies.delete('__Secure-next-auth.session-token');

      if (
        request.nextUrl.pathname !== '/iniciarSesion' &&
        request.nextUrl.pathname !== '/' &&
        request.nextUrl.pathname !== '/crearCuenta'
      ) {
        return NextResponse.redirect(new URL('/', request.url));
      }
      return NextResponse.next();
    } else {
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
