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
          target='_blank'
          style={{
            position: 'relative',
            height: '100px',
            width: '90%',
            margin: 'auto',
          }}>
          <Image
            src={'/portafolio.png'}
            alt='portafolio'
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            loading='lazy'
            style={{objectFit: 'cover'}}
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
