import {NextResponse, NextRequest} from 'next/server';
import {
  createPublicacion,
  getAllPulicacionUser,
} from '@/lib/controllers/publicacion';
// import '@/lib/sync';

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('token') as string;
    const body = await request.json();
    const publicacion = await createPublicacion(token, body);
    return NextResponse.json(publicacion);
  } catch {
    return NextResponse.json({message: 'Token Incorrecto'});
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('token') as string;
    const publicacion = await getAllPulicacionUser(token);
    return NextResponse.json(publicacion);
  } catch {
    return NextResponse.json({message: 'Token Incorrecto'});
  }
}
