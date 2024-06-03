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
import css from './css.module.css';
import {SkeletonPerfil} from '@/ui/skeleton';
import {PublicacionesUser} from '../publicaciones/publicationsUser';

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
        const data = await modificarUser({img: dataObtimizado});
        setIsLoading(false);

        // setDataImg(file.dataURL);
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
          <div style={{position: 'relative'}}>
            <div
              style={{
                position: 'absolute',
                bottom: '0',
                right: '0',
                zIndex: 9,
              }}>
              <div className='dropzoneClick' style={{height: '24px'}}>
                <div
                  className='dz-default dz-message'
                  style={{margin: '0', height: '24px'}}>
                  <button
                    className='dz-button'
                    aria-label='dropzonePerfil'
                    type='button'
                    style={{
                      padding: '0',
                      border: 'none',
                      backgroundColor: 'transparent',
                      height: '24px',
                    }}>
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
          <h2 className='font-semibold text-2xl'>
            {dataValor?.user?.fullName}
          </h2>
        </DivFotoName>
        <DivButton>
          <Link className={css.editPerfil} href='/configuracion'>
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
