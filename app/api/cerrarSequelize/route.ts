import {NextRequest, NextResponse} from 'next/server';
import {sequelize} from '@/lib/models/conn';

export async function GET(request: NextRequest) {
  try {
    sequelize.close().then(() => {
      return NextResponse.json('cerrado correctamente');
    });
  } catch (e) {
    return NextResponse.json({message: 'Falta Token'});
  }
}
