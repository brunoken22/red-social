import {NextResponse} from 'next/server';
// import '@/lib/sync';
export async function GET() {
  try {
    return NextResponse.json({
      message: 'Developer',
    });
  } catch (e) {
    console.log(e);
  }
}
