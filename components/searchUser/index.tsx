import {Hits, useHits} from 'react-instantsearch';
import {Hit} from '../searchUsers';

export function SearchUser() {
  const {hits} = useHits();
  return hits.length ? (
    <Hits hitComponent={Hit} />
  ) : (
    <p
      style={{
        position: 'absolute',
        backgroundColor: '#ff1100',
        padding: '1rem',
      }}>
      No se encontraron resultado
    </p>
  );
}
