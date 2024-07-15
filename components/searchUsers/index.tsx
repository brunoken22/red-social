'use client';
import {DivLinkUser} from './styled';
import {Hits, Highlight, useHits} from 'react-instantsearch';
import type {Hit} from 'instantsearch.js';
import FotoPerfil from '@/ui/FotoPerfil';
import Link from 'next/link';
import {isConnect} from '@/lib/atom';
import {useRecoilValue} from 'recoil';

export function SearchUser() {
  const {hits} = useHits();

  return (
    <div style={{position: 'relative'}}>
      {hits.length > 0 ? (
        <>
          <Hits hitComponent={Hit} />
          {/* <Pagination /> */}
        </>
      ) : (
        <p
          style={{
            position: 'absolute',
            backgroundColor: '#ff1100',
            padding: '1rem',
          }}>
          {' '}
          No se encontraron resultado
        </p>
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
      href={'/amigos/' + hit.objectID + '/' + hit.fullName}
      style={{
        textDecoration: 'none',
        color: '#fff',
        width: '100%',
      }}>
      <DivLinkUser>
        <FotoPerfil
          className='w-[40px] h-[40px]'
          img={hit.img}
          connect={
            dataIsConnect?.find((eConnect: any) => hit.id == eConnect.id)
              ?.connect && true
          }></FotoPerfil>
        <p>
          <Highlight attribute='fullName' hit={hit} />
        </p>
      </DivLinkUser>
    </Link>
  );
}
