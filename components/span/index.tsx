import {DivSpan, DivSvg} from './styled';
import {DivPublicar} from '@/ui/container';
import {Body} from '@/ui/typography';
import Image from 'next/image';
import Link from 'next/link';
import Github from '@/ui/icons/github.svg';
import Linkedin from '@/ui/icons/linkedin.svg';

export function Span() {
  return (
    <DivSpan>
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
          <DivSvg>
            <Link
              href={'https://github.com/brunoken22'}
              target='_blank'
              className=' hover:opacity-70 dark:fill-white'>
              <Github />
            </Link>
            <Link
              href={'https://www.linkedin.com/in/brunoken18/'}
              target='_blank'
              className=' hover:opacity-70 dark:fill-white'>
              <Linkedin />
            </Link>
          </DivSvg>
        </DivPublicar>
      </div>
    </DivSpan>
  );
}
