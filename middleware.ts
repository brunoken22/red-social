import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

export default async function middleware(request: NextRequest) {
  const token = request.headers.get('authorization')!.split(' ')[1];
  if (!token) return NextResponse.json({message: 'Falta Token'});
  const newHeaders = new Headers(request.headers);
  newHeaders.set('token', token);
  return NextResponse.next({
    request: {
      headers: newHeaders,
    },
  });
}
export const config = {
  matcher: '/api/:path*',
};
