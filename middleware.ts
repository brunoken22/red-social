import {NextResponse} from 'next/server';
import {NextRequest} from 'next/server';

export async function middleware(request: NextRequest) {
  const isToken = request.cookies.get('login')?.value;
  try {
    console.log(isToken, request.nextUrl.pathname);

    if (isToken == 'false' || !isToken) {
      if (
        request.nextUrl.pathname !== '/signin' &&
        request.nextUrl.pathname !== '/signup'
      ) {
        return NextResponse.redirect(new URL('/signin', request.url));
      }
      // console.log('isToken', isToken);

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
  } catch (e: any) {
    console.log(e.message);
    return NextResponse.next();
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
