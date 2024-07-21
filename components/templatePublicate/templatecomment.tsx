import dynamic from 'next/dynamic';
import {DivPerfil} from '@/components/publicaciones/styled';
import Link from 'next/link';
import diferenteDate from './diferenteDate';
import FotoPerfil from '@/ui/FotoPerfil';

const Verification = dynamic(() => import('@/ui/verification'));

export default function TemplateComment(props: {
  userId: number;
  imgUser: string;
  userName: string;
  description: string;
  verification: boolean;
  createdAt: string;
}) {
  return (
    <div className='m-4'>
      <DivPerfil>
        {props.userName !== 'Tú' ? (
          <Link href={'/amigos/' + props.userId + '/' + props.userName}>
            <FotoPerfil
              className='h-[30px] w-[30px]'
              img={props.imgUser}></FotoPerfil>
          </Link>
        ) : (
          <FotoPerfil
            className='h-[30px] w-[30px]'
            img={props.imgUser}></FotoPerfil>
        )}

        <div className='w-[95%]'>
          <div className=' p-2 bg-[#ddddddb0] rounded-[0px_0.5rem_0.5rem] dark:bg-dark'>
            {props.userName !== 'Tú' ? (
              <div className='flex items-center gap-2'>
                <Link
                  href={'/amigos/' + props.userId + '/' + props.userName}
                  className='font-medium m-0 max-w-[250px]  opacity-80 whitespace-nowrap overflow-hidden text-ellipsis '>
                  {props.userName}
                </Link>
                {props.verification ? (
                  <Verification publication={true} />
                ) : null}
              </div>
            ) : (
              <div className='flex items-center gap-2'>
                <p className='font-medium m-0 opacity-80'>{props.userName}</p>
                {props.verification ? (
                  <Verification publication={true} />
                ) : null}
              </div>
            )}
            <p className='text-[0.9rem] m-0 break-words'>{props.description}</p>
          </div>
          <span className='text-[0.7rem] pl-2'>
            {diferenteDate(props.createdAt)}
          </span>
        </div>
      </DivPerfil>
    </div>
  );
}
