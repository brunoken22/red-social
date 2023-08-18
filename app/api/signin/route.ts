import {NextResponse, NextRequest} from 'next/server';
import {signin} from '@/lib/controllers/auth';
// import '@/lib/sync';
export async function POST(request: NextRequest) {
  const body = await request.json();
  try {
    const [auth, token] = await signin(body);
    return NextResponse.json({
      auth,
      token,
    });
  } catch (e) {
    console.log(e);
  }
}
