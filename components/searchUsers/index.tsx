"use client";

import dynamic from "next/dynamic";
import { useIsConnected, User } from "@/lib/store";
import { useCallback, useEffect, useRef, useState } from "react";
import { getSearchUsers } from "@/lib/hook";
import { useDebouncedCallback } from "use-debounce";

const FotoPerfil = dynamic(() => import("@/ui/FotoPerfil"));
const Verification = dynamic(() => import("@/ui/verification"));
const Link = dynamic(() => import("next/link"));

const DivLinkUser = dynamic(() => import("./styled").then((mod) => mod.DivLinkUser));

export function SearchUsers() {
  const inputSearchRef = useRef<HTMLInputElement | null>(null);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState({
    hidden: false,
    loading: true,
    users: [],
  });

  const useDebounce = useDebouncedCallback((value: string) => {
    setSearch(value);
  }, 300);

  useEffect(() => {
    const getSearch = async () => {
      if (search.trim()) {
        const responseData = await getSearchUsers(search);
        setUsers(() => ({ users: responseData.data, loading: false, hidden: false }));
      }
    };
    getSearch();
  }, [search]);

  const updateFocusState = useCallback(() => {
    const input = inputSearchRef.current;
    if (input) {
      const hasFocus = document.activeElement === input;

      if (!hasFocus) {
        setUsers((prev) => ({ ...prev, hidden: true }));
      } else if (users.users.length > 0) {
        setUsers((prev) => ({ ...prev, hidden: false }));
      }
    }
  }, [users.users.length]);

  // Efecto para detectar cambios de focus en el documento
  useEffect(() => {
    const handleFocusChange = () => {
      updateFocusState();
    };

    document.addEventListener("focusin", handleFocusChange);
    document.addEventListener("focusout", handleFocusChange);

    return () => {
      document.removeEventListener("focusin", handleFocusChange);
      document.removeEventListener("focusout", handleFocusChange);
    };
  }, [updateFocusState]);

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (!value.trim()) {
      setUsers((users) => ({ ...users, loading: false }));
      setSearch("");
      return;
    }
    setUsers((users) => ({ ...users, loading: true }));
    useDebounce(value);
  };

  const handleClearSearch = () => {
    setSearch("");
    setUsers(() => ({
      loading: true,
      users: [],
      hidden: false,
    }));
  };

  return (
    <>
      <input
        type='text'
        ref={inputSearchRef}
        onChange={handleChangeSearch}
        placeholder='UniRed'
        className='text-primary dark:text-black p-2 '
      />
      {search.trim() && !users.hidden ? (
        <div className='relative'>
          <div className='absolute inset-0 '>
            <div
              className={`dark:bg-darkComponet bg-primary p-2  my-3 flex flex-col gap-3  ${
                !users.loading && !users.users.length ? " bg-[#ff4a3d]" : ""
              }`}
            >
              {users.loading ? (
                <p>Cargando...</p>
              ) : users.users.length ? (
                users.users.map((user: User) => (
                  <TemplateUser user={user} key={user.id} clear={handleClearSearch} />
                ))
              ) : (
                <p className=' '>No se encontraron resultado</p>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function TemplateUser({ user, clear }: { user: User; clear: () => void }) {
  const connected = useIsConnected((state) => state.connected);
  return (
    <Link onClick={clear} className='w-full hover:opacity-70' href={"/amigos/" + user.id}>
      <DivLinkUser>
        <FotoPerfil
          className='w-[40px] h-[40px]'
          title={user.fullName}
          img={user.img}
          connect={connected?.find((eConnect: any) => user.id == eConnect.id)?.connect && true}
        ></FotoPerfil>
        <div className='flex items-center gap-2 overflow-hidden'>
          <p className='whitespace-nowrap overflow-hidden text-ellipsis'>{user.fullName}</p>
          {user.verification ? <Verification publication={true} /> : null}
        </div>
      </DivLinkUser>
    </Link>
  );
}
