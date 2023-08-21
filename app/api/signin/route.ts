import {NextResponse, NextRequest} from 'next/server';
import {signin} from '@/lib/controllers/auth';
// import '@/lib/sync';
export async function POST(request: NextRequest) {
  const body = await request.json();
  try {
    const [user, token] = await signin(body);
    return NextResponse.json({
      user,
      token,
    });
  } catch (e) {
    console.log(e);
  }
}
