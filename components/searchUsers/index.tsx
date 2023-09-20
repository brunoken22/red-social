'use client';
import {DivLinkUser} from './styled';
import {SearchBox, Hits, Highlight, useHits} from 'react-instantsearch';
import type {Hit} from 'instantsearch.js';
import {FotoPerfil} from '@/ui/FotoPerfil';
import Link from 'next/link';
import {useState} from 'react';
import './style.css';

export function SearchUser() {
  const {hits} = useHits();
  const [search, setSearch] = useState('');

  return (
    <div style={{position: 'relative'}}>
      <SearchBox
        placeholder='UniRed'
        onChangeCapture={(e: any) => {
          e.target.form
            .querySelector('.ais-SearchBox-reset')
            .addEventListener('click', () => setSearch(''));
          setSearch(e.target.value);
        }}
      />
      {search ? (
        hits.length > 0 ? (
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
        )
      ) : null}
    </div>
  );
}
type HitProps = {
  hit: Hit;
};
export function Hit({hit}: HitProps) {
  return (
    <Link
      href={'/amigos/' + hit.objectID}
      style={{
        textDecoration: 'none',
        color: '#fff',
      }}>
      <DivLinkUser>
        <FotoPerfil img={hit.img}></FotoPerfil>
        <p>
          <Highlight attribute='fullName' hit={hit} />
        </p>
      </DivLinkUser>
    </Link>
  );
}
