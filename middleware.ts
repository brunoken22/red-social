import {NextResponse} from 'next/server';
import {NextRequest} from 'next/server';
import {cookies} from 'next/headers';
export async function middleware(request: NextRequest) {
  const isToken = request.cookies.get('login')?.value;
  try {
    if (isToken == 'false' || !isToken) {
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
  } catch (e) {
    cookies().set('login', 'false');
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: [
    '/inicio',
    '/amigos/:path*',
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
