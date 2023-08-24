import {NextResponse, NextRequest} from 'next/server';
import {
  createPublicacion,
  getAllPulicacionUser,
} from '@/lib/controllers/publicacion';
// import '@/lib/sync';

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')!.split(' ')[1];
    const body = await request.json();
    const publicacion = await createPublicacion(token, body);

    if (!publicacion) return NextResponse.json({message: 'Token Incorrecto'});
    return NextResponse.json(publicacion);
  } catch {
    return NextResponse.json({message: 'Falta Token'});
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')!.split(' ')[1];
    const publicacion = await getAllPulicacionUser(token);

    if (!publicacion) return NextResponse.json({message: 'Token Incorrecto'});
    return NextResponse.json(publicacion);
  } catch {
    return NextResponse.json({message: 'Falta Token'});
  }
}
