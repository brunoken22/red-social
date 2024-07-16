'use client';
import dynamic from 'next/dynamic';
import {useHits} from 'react-instantsearch';
import type {Hit} from 'instantsearch.js';
import Link from 'next/link';
import {isConnect} from '@/lib/atom';
import {useRecoilValue} from 'recoil';

const FotoPerfil = dynamic(() => import('@/ui/FotoPerfil'));
const Verification = dynamic(() => import('@/ui/verification'));
const Hits = dynamic(() =>
  import('react-instantsearch').then((mod) => mod.Hits)
);
const DivLinkUser = dynamic(() =>
  import('./styled').then((mod) => mod.DivLinkUser)
);
export function SearchUser() {
  const {hits} = useHits();

  return (
    <div className='relative'>
      {hits.length > 0 ? (
        <Hits
          hitComponent={Hit}
          className='dark:text-primary text-secundary  bg-primary dark:bg-dark p-2'
        />
      ) : (
        <p className='absolute bg-[#ff4a3d] p-4'>No se encontraron resultado</p>
      )}
    </div>
  );
}
type HitProps = {
  hit: Hit;
};
export function Hit({hit}: HitProps) {
  const dataIsConnect = useRecoilValue(isConnect);
  return (
    <Link
      className='w-full hover:opacity-70'
      href={'/amigos/' + hit.objectID + '/' + hit.fullName}>
      <DivLinkUser>
        <FotoPerfil
          className='w-[40px] h-[40px]'
          img={hit.img}
          connect={
            dataIsConnect?.find((eConnect: any) => hit.id == eConnect.id)
              ?.connect && true
          }></FotoPerfil>
        <div className='flex items-center gap-2 overflow-hidden'>
          <p className='whitespace-nowrap overflow-hidden text-ellipsis'>
            {hit.fullName}
          </p>
          {hit.verification ? <Verification publication={true} /> : null}
        </div>
      </DivLinkUser>
    </Link>
  );
}
