import {Metadata} from 'next';
import {SearchUser} from '@/components/searchUsers';
export const metadata: Metadata = {
  title: 'Search | UniRed',
};
export default function Search() {
  return (
    <div
      style={{
        color: 'white',
        marginTop: '5rem',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
      <SearchUser></SearchUser>
    </div>
  );
}
