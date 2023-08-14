'use client';
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
      <DivPublicar>
        <Body>Visita mi portafolio</Body>
        <Link
          href={'https://portafolio-taupe-nine.vercel.app/'}
          target='_blank'>
          <Image
            src={'/portafolio.png'}
            width={10}
            height={0}
            alt='portafolio'
            layout='responsive'
          />
        </Link>
        <DivSvg>
          <Link
            href={'https://github.com/brunoken22'}
            target='_blank'
            style={{color: '#fff'}}>
            <Github />
          </Link>
          <Link
            href={'https://www.linkedin.com/in/brunoken18/'}
            target='_blank'
            style={{color: '#fff'}}>
            <Linkedin />
          </Link>
        </DivSvg>
      </DivPublicar>
    </DivSpan>
  );
}
