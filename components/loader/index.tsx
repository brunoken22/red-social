'use client';
import {Ring} from '@uiball/loaders';
import {DivLoader, ImageLogo} from './styled';
export function Loader() {
  return (
    <DivLoader>
      <Ring size={40} lineWeight={5} speed={2} color='white' />
      <ImageLogo src='/logo.png' alt='logo' />
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
