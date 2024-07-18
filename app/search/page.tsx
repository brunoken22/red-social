import {Metadata} from 'next';
import SearchMobile from '@/components/searchMobile';
export const metadata: Metadata = {
  title: 'Buscador | UniRed',
  description: 'Buscador de amig@s',
};
export default function Search() {
  return (
    <div className='w-[90%] m-auto max-w-[500px]'>
      <SearchMobile/>
    </div>
  );
}
