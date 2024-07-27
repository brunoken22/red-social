import dynamic from 'next/dynamic';
import {User} from '@/lib/atom';
import {useRouter} from 'next/navigation';

const DivConnectAll = dynamic(() =>
  import('./styled').then((mod) => mod.DivConnectAll)
);
const ButtonSmsConnect = dynamic(() =>
  import('@/ui/boton').then((mod) => mod.ButtonSmsConnect)
);
const FotoPerfil = dynamic(() => import('@/ui/FotoPerfil'));

export default function ConnectedUsers({
  allConnectAmigos,
  dataIsConnect,
}: {
  allConnectAmigos: User[];
  dataIsConnect: any;
}) {
  const {push} = useRouter();
  return (
    <>
      <DivConnectAll>
        {allConnectAmigos.length ? (
          allConnectAmigos.map((e) => (
            <ButtonSmsConnect
              key={e.id}
              onClick={() =>
                push(
                  '/chat?fullName=' +
                    e.fullName +
                    '&rtdb=' +
                    e.rtdb +
                    '&id=' +
                    e.id +
                    '&img=' +
                    e.img
                )
              }>
              <FotoPerfil
                img={e.img}
                className='h-[30px] w-[30px]'
                connect={
                  dataIsConnect?.find((eConnect: any) => e.id == eConnect.id)
                    ?.connect && true
                }
              />

              <span className='text-black whitespace-nowrap overflow-hidden text-ellipsis'>
                {e.fullName}
              </span>
            </ButtonSmsConnect>
          ))
        ) : (
          <div className='text-center'>No hay conectados</div>
        )}
      </DivConnectAll>
    </>
  );
}
