import {Auth} from '@/lib/models';
import {NextResponse} from 'next/server';

// sequelize.sync({force: true}).then((res: any) => {
//   console.log('data', res);
// });

export async function GET() {
  try {
    return NextResponse.json({
      message: 'Developer user',
    });
  } catch (e) {
    console.log(e);
  }
}
