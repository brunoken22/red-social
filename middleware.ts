import {NextResponse} from 'next/server';
import {NextRequest} from 'next/server';
import {fetchApiSwr} from './lib/api';
export async function middleware(request: NextRequest) {
  // const isToken = request.cookies.get('login')?.value;
  // if (!isToken) {
  //   // if (
  //   //   request.nextUrl.pathname !== '/signin' &&
  //   //   request.nextUrl.pathname !== '/signup'
  //   // ) {
  //   //   return NextResponse.redirect(new URL('/signin', request.url));
  //   // }
  //   //   console.log(isToken);
  //   return NextResponse.next();
  // } else {
  //   console.log(isToken);
  //   const data = await fetchApiSwr('/api/verify', {
  //     method: 'GET',
  //     credentials: 'include',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //   console.log(data);
  //   if (!data.message) {
  //     return NextResponse.redirect(new URL('/signin', request.url));
  //   }
  //   if (
  //     request.nextUrl.pathname == '/signin' ||
  //     request.nextUrl.pathname == '/signup'
  //   ) {
  //     return NextResponse.redirect(new URL('/home', request.url));
  //   }
  //   return NextResponse.next();
  // }
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
