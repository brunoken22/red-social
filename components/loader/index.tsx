'use client';
import Ring from '@uiball/loaders/dist/components/Ring';
import { DivLoader, ImageLogo } from './styled';
import { useState } from 'react';

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
      <Ring size={40} lineWeight={5} speed={2} color='black' />
    </DivLoader>
  );
}

export function LoaderRequest() {
  return (
    <div className='flex items-center justify-center'>
      <Ring size={40} lineWeight={5} speed={2} color='#5495e3' />
    </div>
  );
}
