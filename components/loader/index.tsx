'use client';
import {Ring} from '@uiball/loaders';
import {DivLoader} from './styled';
export function Loader() {
  return (
    <DivLoader>
      <Ring size={40} lineWeight={5} speed={2} color='white' />
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
