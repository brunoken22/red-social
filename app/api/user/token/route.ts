import {NextResponse, NextRequest} from 'next/server';
import {modUser} from '@/lib/controllers/user';
import {modAuth} from '@/lib/controllers/auth';
// import '@/lib/sync';

export async function PATCH(request: NextRequest) {
  try {
    const data = await request.json();
    const token = request.headers.get('authorization')!.split(' ')[1];
    const user = await modUser(token, data);
    const auth = await modAuth(token, data);
    if (!user) return NextResponse.json({message: 'Token Incorñrecto'});
    return NextResponse.json({user, auth});
  } catch {
    return NextResponse.json({message: 'Falta Token'});
  }
}
