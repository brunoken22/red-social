import {NextResponse, NextRequest} from 'next/server';
import {getAllUser} from '@/lib/controllers/user';
import {sequelize} from '@/lib/models/conn';
export const dynamic = 'force-dynamic';
export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('token') as string;
    const users = await getAllUser(token);
    await sequelize.close();
    return NextResponse.json(users);
  } catch (e) {
    return NextResponse.json(e);
  }
}
