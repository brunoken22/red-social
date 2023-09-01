import {NextResponse, NextRequest} from 'next/server';
import {getAllPulicacionRedAmigos} from '@/lib/controllers/publicacion';
export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('token') as string;
    const publicacion = await getAllPulicacionRedAmigos(token);
    return NextResponse.json(publicacion);
  } catch {
    return NextResponse.json({message: 'Token Incorrecto'});
  }
}
