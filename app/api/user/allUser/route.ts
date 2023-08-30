import {NextResponse, NextRequest} from 'next/server';
import {getAllUser} from '@/lib/controllers/user';

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('token') as string;
    const users = await getAllUser(token);
    return NextResponse.json(users);
  } catch {
    return NextResponse.json({message: 'Token Incorrecto'});
  }
}
