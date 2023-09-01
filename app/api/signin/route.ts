import {NextResponse, NextRequest} from 'next/server';
import {signin} from '@/lib/controllers/auth';
export async function POST(request: NextRequest) {
  const body = await request.json();
  try {
    const [user, token] = await signin(body);
    return NextResponse.json({
      user,
      token,
    });
  } catch (e) {
    return NextResponse.json('error');
  }
}
