import Link from 'next/link';

export default function LogoPage() {
  return (
    <div className={`flex items-center justify-center`}>
      <Link href='/home' className='flex items-center gap-2 font-bold '>
        <img src='/logo.webp' alt='uniRed' className='w-[40px] rounded-[50%]' />
        <p>UniRed</p>
      </Link>
    </div>
  );
}
