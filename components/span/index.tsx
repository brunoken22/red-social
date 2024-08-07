import dynamic from 'next/dynamic';
import {DivPublicar} from '@/ui/container';
import Image from 'next/image';
import Link from 'next/link';
import Github from '@/ui/icons/github.svg';
import Linkedin from '@/ui/icons/linkedin.svg';

const Body = dynamic(() => import('@/ui/typography').then((mod) => mod.Body));

export function Span() {
  return (
    <div className='min-w-[250px] max-w-[20%]  text-center  max-md:hidden'>
      <div className='sticky top-20'>
        <DivPublicar>
          <Body>Visita mi portafolio</Body>
          <Link
            href={'https://brunoken.vercel.app/'}
            target='_blank'
            className='relative h-[100px] w-[90%] m-auto rounded-md overflow-hidden'>
            <Image
              src={'/portafolio.webp'}
              alt='portafolio'
              width={200}
              height={100}
              priority={true}
              className='object-fill  hover:scale-[1.1]  rounded-md hover:opacity-70'
            />
          </Link>
          <div className='flex justify-around items-center'>
            <Link
              aria-label='github'
              href={'https://github.com/brunoken22'}
              target='_blank'
              className=' hover:opacity-70 dark:fill-white'>
              <Github />
            </Link>
            <Link
              aria-label='linkedin'
              href={'https://www.linkedin.com/in/brunoken18/'}
              target='_blank'
              className=' hover:opacity-70 dark:fill-white'>
              <Linkedin />
            </Link>
          </div>
        </DivPublicar>
      </div>
    </div>
  );
}
