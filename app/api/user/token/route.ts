import {NextResponse, NextRequest} from 'next/server';
import {modUser, getUser} from '@/lib/controllers/user';
import {modAuth} from '@/lib/controllers/auth';
export async function PATCH(request: NextRequest) {
  try {
    const data = await request.json();
    const token = request.headers.get('token') as string;
    const user = await modUser(token, data);
    const auth = await modAuth(token, data);
    return NextResponse.json({user, auth});
  } catch {
    return NextResponse.json({message: 'Token Incorrecto'});
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('token');
    const user = await getUser(token as string);
    return NextResponse.json(user);
  } catch (e) {
    return NextResponse.json({message: 'Token Incorrecto'});
  }
}
