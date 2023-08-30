import {NextResponse, NextRequest} from 'next/server';
import {getAllUser} from '@/lib/controllers/user';

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('token') as string;
    const users = await getAllUser(token);
    console.log(users);
    return NextResponse.json(users);
  } catch (e) {
    return NextResponse.json(e);
  }
}
