'use client';

import dynamic from 'next/dynamic';
import {useState} from 'react';
const SearchBox = dynamic(() =>
  import('react-instantsearch').then((mod) => mod.SearchBox)
);
const SearchUser = dynamic(() =>
  import('../searchUsers').then((mod) => mod.SearchUser)
);

export default function SearchMobile() {
  const [search, setSearch] = useState(false);

  return (
    <div className='relative'>
      <SearchBox
        placeholder='UniRed'
        onChangeCapture={() => {
          setSearch(true);
        }}
      />
      {search && <SearchUser />}
    </div>
  );
}