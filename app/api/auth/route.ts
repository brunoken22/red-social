import {NextResponse, NextRequest} from 'next/server';
import {findOrCreateAuth} from '@/lib/controllers/auth';
import {findOrCreateUser} from '@/lib/controllers/user';
// import '@/lib/sync';

export async function POST(request: NextRequest) {
  const body = await request.json();
  if (!body) {
    return NextResponse.json({message: 'Faltan datos'});
  }
  try {
    const [user, userCreated] = await findOrCreateUser(body);
    if (userCreated) {
      const [auth, token] = await findOrCreateAuth((user as any).id, body);
      return NextResponse.json({user, token});
    }
    return NextResponse.json('Usuario Registrado');
  } catch (e) {
    console.log(e);
  }
}

export async function GET() {}
