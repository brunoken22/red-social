import {NextRequest, NextResponse} from 'next/server';
import {sequelize} from '@/lib/models/conn';

export async function GET(request: NextRequest) {
  try {
    sequelize.close().then(() => {
      console.log('Pool cerrado completamente');
    });
    return NextResponse.json('ok.');
  } catch (e) {
    console.log(e);
    return NextResponse.json({message: 'Falta Token'});
  }
}
