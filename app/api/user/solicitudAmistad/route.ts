import {NextRequest, NextResponse} from 'next/server';
import {SolicitudDeAmistad} from '@/lib/controllers/user';
export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')!.split(' ')[1];
    const body = await request.json();
    const solicitud = await SolicitudDeAmistad(token, body);

    if (!solicitud) return NextResponse.json({message: 'Token Incorrecto'});
    return NextResponse.json(solicitud);
  } catch {
    return NextResponse.json({message: 'Falta Token'});
  }
}
