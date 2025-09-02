"use client";

import dynamic from "next/dynamic";
import { useHits, useSearchBox } from "react-instantsearch";
import type { Hit } from "instantsearch.js";
import { isConnect } from "@/lib/atom";
import { useRecoilValue } from "recoil";

const FotoPerfil = dynamic(() => import("@/ui/FotoPerfil"));
const Verification = dynamic(() => import("@/ui/verification"));
const Link = dynamic(() => import("next/link"));

const Hits = dynamic(() => import("react-instantsearch").then((mod) => mod.Hits));
const DivLinkUser = dynamic(() => import("./styled").then((mod) => mod.DivLinkUser));
export function SearchUser() {
  const { hits } = useHits();
  const { query } = useSearchBox();
  return (
    <div className='relative'>
      {query ? (
        hits.length ? (
          <Hits
            hitComponent={Hit}
            className='dark:text-primary text-secundary  bg-primary dark:bg-dark p-2'
          />
        ) : (
          <p className='absolute bg-[#ff4a3d] p-4'>No se encontraron resultado</p>
        )
      ) : null}
    </div>
  );
}
type HitProps = {
  hit: Hit;
};
function Hit({ hit }: HitProps) {
  const dataIsConnect = useRecoilValue(isConnect);
  return (
    <Link className='w-full hover:opacity-70' href={"/amigos/" + hit.objectID}>
      <DivLinkUser>
        <FotoPerfil
          className='w-[40px] h-[40px]'
          title={hit.fullName}
          img={hit.img}
          connect={dataIsConnect?.find((eConnect: any) => hit.id == eConnect.id)?.connect && true}
        ></FotoPerfil>
        <div className='flex items-center gap-2 overflow-hidden'>
          <p className='whitespace-nowrap overflow-hidden text-ellipsis'>{hit.fullName}</p>
          {hit.verification ? <Verification publication={true} /> : null}
        </div>
      </DivLinkUser>
    </Link>
  );
}
