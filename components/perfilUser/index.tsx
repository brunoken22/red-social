'use client';
import dynamic from 'next/dynamic';
import FotoPerfil from '@/ui/FotoPerfil';
import {
  DivPerfilUser,
  DivHeadPerfil,
  DivFotoName,
  DivButton,
  DivPublicaciones,
} from './styled';
import Publicar from '../publicar';
import Link from 'next/link';
import {useCallback, useState} from 'react';
import {user} from '@/lib/atom';
import {useRecoilValue} from 'recoil';
import {modificarUser, optimizarImage} from '@/lib/hook';
import Dropzone from 'react-dropzone';

const Verification = dynamic(() => import('@/ui/verification'));
const Loader = dynamic(() => import('../loader').then((mod) => mod.Loader));
const SkeletonPerfil = dynamic(() =>
  import('@/ui/skeleton').then((mod) => mod.SkeletonPerfil)
);
const PublicacionesUser = dynamic(() =>
  import('../publicaciones/publicationsUser').then(
    (mod) => mod.PublicacionesUser
  )
);

export default function PerfilUser() {
  const dataValor = useRecoilValue(user);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setIsLoading(true);
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = async () => {
        const result = reader.result as string;
        const imageOptimizate = await optimizarImage(result);
        await modificarUser({img: imageOptimizate});
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  return dataValor?.user?.id ? (
    <DivPerfilUser>
      <DivHeadPerfil>
        <DivFotoName>
          <div className='relative'>
            <Dropzone
              onDrop={onDrop}
              accept={{
                'image/png': [],
                'image/jpeg': [],
                'image/jpg': [],
                'image/webp': [],
              }}
              maxFiles={1}
              maxSize={30 * 1024 * 1024}>
              {({getRootProps, getInputProps}) => (
                <div
                  {...getRootProps()}
                  className='absolute bottom-0 right-0 z-[9]'>
                  <input {...getInputProps()} />
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 512 512'
                    width='24'
                    height='24'
                    cursor='pointer'>
                    <path
                      fill='#ddd'
                      d='M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z'
                    />
                  </svg>
                </div>
              )}
            </Dropzone>
            <FotoPerfil
              className='w-[80px] h-[80px]'
              img={dataValor.user.img}
            />
          </div>
          <div className='flex gap-2 items-center'>
            <h2 className='font-semibold text-2xl max-w-[250px] whitespace-nowrap overflow-hidden text-ellipsis'>
              {dataValor?.user?.fullName}
            </h2>
            {dataValor.user.verification ? (
              <Verification publication={false} />
            ) : null}
          </div>
        </DivFotoName>
        <DivButton>
          <Link
            className='p-2 bg-[#51bae9] hover:opacity-60'
            href='/configuracion'>
            Editar perfil
          </Link>
        </DivButton>
      </DivHeadPerfil>
      <DivPublicaciones>
        <Publicar />
        <PublicacionesUser />
      </DivPublicaciones>
      {isLoading ? <Loader /> : null}
    </DivPerfilUser>
  ) : (
    <SkeletonPerfil />
  );
}
