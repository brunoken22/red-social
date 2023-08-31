import {NextRequest, NextResponse} from 'next/server';
import {
  solicitudDeAmistad,
  getSolicitudAmistad,
  eliminarSolicitud,
} from '@/lib/controllers/user';
// import '@/lib/sync';

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('token') as string;
    const body = await request.json();
    const solicitud = await solicitudDeAmistad(token, body);
    return NextResponse.json(solicitud);
  } catch (e) {
    return NextResponse.json({message: 'Token Incorrecto'});
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('token') as string;
    const solicitudes = await getSolicitudAmistad(token);
    return NextResponse.json(solicitudes);
  } catch {
    return NextResponse.json({message: 'Token Incorrecto'});
  }
}
export async function DELETE(request: NextRequest) {
  try {
    const token = request.headers.get('token') as string;
    const body = await request.json();
    const user = await eliminarSolicitud(token, body);
    return NextResponse.json(user);
  } catch {
    return NextResponse.json({message: 'Token Incorrecto'});
  }
}
