import {NextRequest, NextResponse} from 'next/server';
import {SolicitudDeAmistad} from '@/lib/controllers/user';
export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('token') as string;
    const body = await request.json();
    const solicitud = await SolicitudDeAmistad(token, body);
    return NextResponse.json(solicitud);
  } catch {
    return NextResponse.json({message: 'Token Incorrecto'});
  }
}
