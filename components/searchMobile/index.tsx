"use client";

import dynamic from "next/dynamic";
const SearchUsers = dynamic(() => import("../searchUsers").then((mod) => mod.SearchUsers));

export default function SearchMobile() {
  return (
    <div className='relative'>
      <SearchUsers />
    </div>
  );
}
