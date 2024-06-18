import {NextResponse} from 'next/server';
import {NextRequest} from 'next/server';

export async function middleware(request: NextRequest) {
  const isToken = request.cookies.get('login')?.value;

  try {
    if (isToken === 'false' || !isToken) {
      if (
        request.nextUrl.pathname !== '/signin' &&
        request.nextUrl.pathname !== '/signup'
      ) {
        return NextResponse.redirect(new URL('/signin', request.url));
      }
      console.log('isToken', isToken);

      return NextResponse.next();
    } else {
      if (
        request.nextUrl.pathname === '/signin' ||
        request.nextUrl.pathname === '/signup'
      ) {
        return NextResponse.redirect(new URL('/home', request.url));
      }
      return NextResponse.next();
    }
  } catch (e: any) {
    console.error(e.message);
    return NextResponse.next();
  }
}

// export const config = {
//   matcher: [
//     '/home',
//     '/amigos/:path*',
//     '/configuracion',
//     '/mensaje',
//     '/notificaciones/:path*',
//     '/perfil',
//     '/search',
//     '/signin',
//     '/signup',
//   ],
// };
