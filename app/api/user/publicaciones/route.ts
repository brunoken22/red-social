import {NextResponse, NextRequest} from 'next/server';
import {getAllPulicacionRedAmigos} from '@/lib/controllers/publicacion';
import '@/lib/sync';

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')!.split(' ')[1];
    const publicacion = await getAllPulicacionRedAmigos(token);

    if (!publicacion) return NextResponse.json({message: 'Token Incorrecto'});
    return NextResponse.json(publicacion);
  } catch {
    return NextResponse.json({message: 'Falta Token'});
  }
}
