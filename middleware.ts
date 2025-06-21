import { auth } from '@/auth';

export default auth((req) => {
  const isAuth =
    req.nextUrl.pathname !== '/iniciarSesion' &&
    req.nextUrl.pathname !== '/crearCuenta' &&
    req.nextUrl.pathname !== '/';

  if (!req.auth && isAuth) {
    const newUrl = new URL('/iniciarSesion', req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
  const isLogin =
    req.nextUrl.pathname === '/iniciarSesion' ||
    req.nextUrl.pathname === '/crearCuenta' ||
    req.nextUrl.pathname === '/';
  if (req.auth && isLogin) {
    const newUrl = new URL('/inicio', req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

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
