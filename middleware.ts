import {NextResponse} from 'next/server';
import {NextRequest} from 'next/server';
import {cookies} from 'next/headers';
export async function middleware(request: NextRequest) {
  const isToken = request.cookies.get('login')?.value;
  try {
    if (isToken == 'false' || !isToken) {
      if (
        request.nextUrl.pathname !== '/signin' &&
        request.nextUrl.pathname !== '/signup'
      ) {
        return NextResponse.redirect(new URL('/signin', request.url));
      }
      return NextResponse.next();
    } else {
      if (
        request.nextUrl.pathname === '/signin' ||
        request.nextUrl.pathname === '/signup' ||
        request.nextUrl.pathname === '/'
      ) {
        return NextResponse.redirect(new URL('/home', request.url));
      }
      return NextResponse.next();
    }
  } catch (e) {
    cookies().set('login', 'false');
    return NextResponse.redirect(new URL('/signin', request.url));
  }
}

export const config = {
  matcher: [
    '/home',
    '/amigos/:path*',
    '/configuracion',
    '/mensaje',
    '/notificaciones/:path*',
    '/perfil',
    '/search',
    '/signin',
    '/signup',
    '/',
  ],
};
