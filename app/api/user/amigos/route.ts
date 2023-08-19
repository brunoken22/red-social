import {NextResponse, NextRequest} from 'next/server';
import {getUser, modUser} from '@/lib/controllers/user';
import {modAmigos, getAllAmigos} from '@/lib/controllers/user';
// import '@/lib/sync';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const token = request.headers.get('authorization')!.split(' ')[1];
    const user = await modAmigos(token, body);
    if (!user) return NextResponse.json({message: 'Token Incorrecto'});
    return NextResponse.json(user);
  } catch {
    return NextResponse.json({message: 'Falta Token'});
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')!.split(' ')[1];
    const user = await getAllAmigos(token);
    if (!user) return NextResponse.json({message: 'Token Incorrecto'});
    return NextResponse.json(user);
  } catch {
    return NextResponse.json({message: 'Falta Token'});
  }
}
