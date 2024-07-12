'use client';
import Dropzone from 'dropzone';
import FotoPerfil from '@/ui/FotoPerfil';
import {
  DivPerfilUser,
  DivHeadPerfil,
  DivFotoName,
  DivButton,
  DivPublicaciones,
} from './styled';
import {Publicar} from '../publicar';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {user} from '@/lib/atom';
import {useRecoilValue} from 'recoil';
import {modificarUser, optimizarImage} from '@/lib/hook';
import {Loader} from '../loader';
import {SkeletonPerfil} from '@/ui/skeleton';
import {PublicacionesUser} from '../publicaciones/publicationsUser';
import Verification from '@/ui/verification';

export function PerfilUser() {
  const dataValor = useRecoilValue(user);
  const [isLoading, setIsLoading] = useState(false);
  const [subirImg, setSubirImg] = useState(false);
  useEffect(() => {
    const dropzoneElement = document.querySelector('.dropzoneClick');

    if (dropzoneElement && isLoading) {
      const existingDropzoneInstance = Dropzone.forElement(
        dropzoneElement as HTMLElement
      );
      if (existingDropzoneInstance) {
        existingDropzoneInstance.destroy();
      }
    }
    if (dropzoneElement) {
      const myDropzone = new Dropzone('.dropzoneClick', {
        url: '/perfil',
        autoProcessQueue: false,
        uploadMultiple: false,
        maxFiles: 1,
        maxFilesize: 50,
        maxThumbnailFilesize: 100,
        resizeWidth: 100,
        resizeHeight: 100,
        resizeQuality: 0.5,
        acceptedFiles: 'image/png, image/jpeg, image/jpg',
      });
      myDropzone.on('addedfile', (file: any) => {
        setSubirImg(true);
        file.previewElement.innerHTML = '';
      });
      myDropzone.on('thumbnail', async function (file) {
        const fileSizeInBytes = file.size;
        const fileSizeInKB = fileSizeInBytes / 1024;
        const fileSizeInMB = fileSizeInKB / 1024;
        if (fileSizeInMB > 30) {
          alert(
            `Tamaño del archivo excedido: ${fileSizeInMB.toFixed(
              2
            )}MB (MAXIMO 30MB)`
          );
          myDropzone.removeFile(file);
          return;
        }
        setIsLoading(true);
        const dataObtimizado = await optimizarImage(file.dataURL!);
        await modificarUser({img: dataObtimizado});
        setIsLoading(false);
        setSubirImg(false);

        myDropzone.removeFile(file);
      });
    }
  }, [isLoading]);

  if (isLoading || subirImg) {
    return <Loader />;
  }
  return dataValor?.user?.id ? (
    <DivPerfilUser>
      <DivHeadPerfil>
        <DivFotoName>
          <div className='relative'>
            <div className='absolute bottom-0 right-0 z-[9]'>
              <div className='dropzoneClick h-[24px]'>
                <div className='dz-default dz-message m-0 h-[24px]'>
                  <button
                    className='dz-button p-0 border-none bg-transparent h-[24px]'
                    aria-label='dropzonePerfil'
                    type='button'>
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
                  </button>
                </div>
              </div>
            </div>
            <FotoPerfil
              className='w-[80px] h-[80px]'
              img={dataValor.user.img}
            />
          </div>
          <div className='flex gap-2 items-center'>
            <h2 className='font-semibold text-2xl'>
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
    </DivPerfilUser>
  ) : (
    <SkeletonPerfil />
  );
}
