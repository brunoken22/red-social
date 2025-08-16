"use client";
import { DivLoader, ImageLogo } from "./styled";
import { useState } from "react";

export function Loader() {
  const [loadingText, setLoadingText] = useState(false);

  setTimeout(() => {
    setLoadingText(true);
  }, 3000);

  return (
    <DivLoader>
      <ImageLogo src='/logo.webp' alt='logo' />
      {loadingText ? (
        <p>
          Esto puede tardar hasta 1 minuto <br />
          (Solo la primera vez)
        </p>
      ) : null}
    </DivLoader>
  );
}

export function LoaderComponent() {
  return (
    <DivLoader>
      <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-light' />
    </DivLoader>
  );
}

export function LoaderRequest() {
  return (
    <div className='flex items-center justify-center'>
      <div className='animate-spin rounded-full h-7 w-7 border-b-4 border-light' />
    </div>
  );
}
