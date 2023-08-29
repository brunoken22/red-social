import {NextResponse, NextRequest} from 'next/server';
import {
  aceptarSolicitud,
  getAllAmigos,
  eliminarSolicitud,
} from '@/lib/controllers/user';
// import '@/lib/sync';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const token = request.headers.get('token') as string;
    const user = await aceptarSolicitud(token, body);
    return NextResponse.json(user);
  } catch {
    return NextResponse.json({message: 'Token Incorrecto'});
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('token') as string;
    const user = await getAllAmigos(token);
    return NextResponse.json(user);
  } catch {
    return NextResponse.json({message: 'Token Incorrecto'});
  }
}
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const token = request.headers.get('token') as string;
    const user = await eliminarSolicitud(token, body);
    return NextResponse.json(user);
  } catch {
    return NextResponse.json({message: 'Token Incorrecto'});
  }
}
