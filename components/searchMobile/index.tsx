'use client';

import dynamic from 'next/dynamic';
const SearchBox = dynamic(() =>
  import('react-instantsearch').then((mod) => mod.SearchBox)
);
const SearchUser = dynamic(() =>
  import('../searchUsers').then((mod) => mod.SearchUser)
);

export default function SearchMobile() {
  return (
    <div className='relative'>
      <SearchBox placeholder='UniRed' />
      <SearchUser />
    </div>
  );
}
