import {NextResponse, NextRequest} from 'next/server';
import {getUser} from '@/lib/controllers/user';
// import '@/lib/sync';
export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')!.split(' ')[1];
    const user = await getUser(token);
    if (!user) return NextResponse.json({message: 'Token Incorrecto'});
    return NextResponse.json(user);
  } catch {
    return NextResponse.json({message: 'Falta Token'});
  }
}
