import {Metadata} from 'next';
import {SearchUser} from '@/components/searchUsers';
export const metadata: Metadata = {
  title: 'Buscador | UniRed',
  description: 'Buscador de amig@s',
};
export default function Search() {
  return (
    <div className='w-[90%] m-auto max-w-[500px]'>
      <SearchUser></SearchUser>
    </div>
  );
}
