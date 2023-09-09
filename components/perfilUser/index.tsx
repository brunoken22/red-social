'use client';
import Dropzone from 'dropzone';
import {FotoPerfil} from '@/ui/FotoPerfil';
import {
  DivPerfilUser,
  DivHeadPerfil,
  DivFotoName,
  DivFotoNameLink,
  DivButton,
  DivPublicaciones,
  DivButtonEliAcep,
} from './styled';
import {Publicar} from '../publicar';
import {PublicacionesUser, ThemplatePubli} from '../publicaciones';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {
  user,
  getAllSolicitudesEnviadas,
  getAllSolicitudesRecibidas,
} from '@/lib/atom';
import {useRecoilValue} from 'recoil';
import {
  ModificarUser,
  GetAmigo,
  EliminarAmigo,
  CreateSolicitud,
  RechazarSolicitud,
  AceptarSolicitud,
} from '@/lib/hook';
import {Loader} from '../loader';
import {urltoBlob, filetoDataURL, compressAccurately} from 'image-conversion';
import {useParams} from 'next/navigation';
import {DivAllPublicaciones} from '@/ui/container';
import {ButtonAgregar} from '@/ui/boton';

export function PerfilUser() {
  const dataValor = useRecoilValue(user);
  const [dataImg, setDataImg] = useState('');
  const [subirImg, setSubirImg] = useState(false);
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const {data, isLoading} = ModificarUser({img: dataImg}, token as string);
  useEffect(() => {
    const dropzoneElement = document.querySelector('.dropzoneClick');

    if (dropzoneElement && data) {
      const existingDropzoneInstance = Dropzone.forElement(
        dropzoneElement as HTMLElement
      );
      if (existingDropzoneInstance) {
        existingDropzoneInstance.destroy(); // Elimina la instancia anterior
      }
    }
    if (dropzoneElement) {
      const myDropzone = new Dropzone('.dropzoneClick', {
        url: '/perfil',
        autoProcessQueue: false,
        uploadMultiple: false,
        maxFiles: 1,
        maxFilesize: 100,
        maxThumbnailFilesize: 100,
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

        const dataFinal = await optimizar(file.dataURL as string);
        setDataImg(dataFinal);
      });
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      setDataImg('');
      setSubirImg(false);
    }
  }, [data]);

  if (isLoading || subirImg) {
    return <Loader />;
  }
  return (
    <DivPerfilUser>
      <DivHeadPerfil>
        <DivFotoName>
          <div style={{position: 'relative'}}>
            <div
              style={{
                position: 'absolute',
                bottom: '0',
                right: '0',
              }}>
              <div className='dropzoneClick' style={{height: '24px'}}>
                <div
                  className='dz-default dz-message'
                  style={{margin: '0', height: '24px'}}>
                  <button
                    className='dz-button'
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
            <FotoPerfil wid='80' hei='80' img={dataValor.user.img} />
          </div>
          <h2 style={{textAlign: 'center'}}>{dataValor?.user?.fullName}</h2>
        </DivFotoName>
        <DivButton>
          <Link
            href='/configuracion'
            style={{textDecoration: 'none', color: '#00bdff'}}>
            Editar perfil
          </Link>
        </DivButton>
      </DivHeadPerfil>

      <DivPublicaciones>
        <Publicar />
        <PublicacionesUser />
      </DivPublicaciones>
    </DivPerfilUser>
  );
}

export function PerfilAmigo() {
  const {id} = useParams();
  const soliReci = useRecoilValue(getAllSolicitudesRecibidas);
  const dataUser = useRecoilValue(user);
  const {data, isLoading} = GetAmigo(id as string);
  const [isClient, setIsClient] = useState(false);
  const [eliminarAmigo, setEliminarAmigo] = useState(Number(-1));
  const [rechazarAmigo, setRechazarAmigo] = useState(Number(-1));
  const [amigoId, setAmigoId] = useState(Number(-1));
  const [acepAmigoId, setAcepAmigoId] = useState(Number(-1));

  const {dataElimAmigo, isLoadingElimAmigo} = EliminarAmigo({
    userId: eliminarAmigo,
  });
  const {dataCreateSoli, isLoadCreateSoli} = CreateSolicitud({
    amigoId,
    estado: false,
  });
  const {dataAcep, isLoadingAcep} = AceptarSolicitud({
    amigoId: acepAmigoId,
    estado: true,
  });
  const {dataRech, isLoadingRech} = RechazarSolicitud({
    userId: rechazarAmigo,
  });
  useEffect(() => {
    if (
      isLoading ||
      isLoadingElimAmigo ||
      isLoadCreateSoli ||
      isLoadingRech ||
      isLoadingAcep
    ) {
      setIsClient(true);
    }
    if (dataElimAmigo || dataCreateSoli || dataAcep || dataRech || data) {
      setEliminarAmigo(Number(-1));
      setAmigoId(Number(-1));
      setAcepAmigoId(Number(-1));
      setRechazarAmigo(Number(-1));
      setIsClient(false);
    }
  }, [
    isLoading,
    isLoadingElimAmigo,
    isLoadCreateSoli,
    isLoadingRech,
    isLoadingAcep,
  ]);
  const handleSolicitudAcep = (e: any) => {
    const id = e.target.id;
    setAcepAmigoId(Number(id));
    // setIsClient(true);
  };
  const handleEliminarAmigo = (e: any) => {
    const id = e.target.id;

    setEliminarAmigo(Number(id));
    // setIsClient(true);
  };
  const handleSolicitudEnv = (e: any) => {
    const id = e.target.id;
    setAmigoId(Number(id));
    setAmigoId(Number(-1));
    // setIsClient(true);
  };
  const handleSolicitudRecha = (e: any) => {
    const id = e.target.id;
    setRechazarAmigo(Number(id));
    setAmigoId(Number(-1));
  };

  return data && !isClient ? (
    <DivPerfilUser>
      <DivHeadPerfil>
        <DivFotoNameLink>
          {data?.user?.id && (
            <FotoPerfil wid='80' hei='80' img={data?.user?.img} />
          )}
          <h2 style={{textAlign: 'center', marginTop: '0'}}>
            {data?.user?.fullName}
          </h2>
        </DivFotoNameLink>
        <div>
          {amigoId < 0 && data.amigo !== 'pendiente' ? (
            <ButtonAgregar
              id={data?.user?.id}
              onClick={data?.amigo ? handleEliminarAmigo : handleSolicitudEnv}
              $bg={data?.amigo !== false ? 'red' : 'blue'}>
              {data?.amigo ? 'Eliminar Amigo' : 'Agregar'}
            </ButtonAgregar>
          ) : data.amigo == 'pendiente' &&
            soliReci?.length > 0 &&
            soliReci.find((user) => user.id == data.user.id) ? (
            <DivButtonEliAcep>
              <ButtonAgregar
                id={data?.user?.id}
                onClick={handleSolicitudRecha}
                $bg='red'>
                Eliminar solicitud
              </ButtonAgregar>
              <ButtonAgregar id={data?.user?.id} onClick={handleSolicitudAcep}>
                Aceptar
              </ButtonAgregar>
            </DivButtonEliAcep>
          ) : (
            <>
              <ButtonAgregar
                id={data?.user?.id}
                onClick={handleSolicitudRecha}
                $bg='red'>
                Eliminar solicitud
              </ButtonAgregar>
            </>
          )}
        </div>
      </DivHeadPerfil>
      <DivPublicaciones>
        {data?.publicaciones?.length > 0 ? (
          data.publicaciones
            .slice()
            .reverse()
            .map((item: any) => (
              <DivAllPublicaciones key={item.id}>
                <ThemplatePubli
                  name={data?.user.fullName}
                  description={item.description}
                  img={item.img}
                  fecha={item.fecha}
                  like={item.like}
                  comentarios={item.comentarios?.length}
                  imgUser={data?.user?.img}
                  idPublicacion={item.id}
                  userId={dataUser.user.id}
                />
              </DivAllPublicaciones>
            ))
        ) : (
          <p style={{textAlign: 'center'}}>No hay publicaciones</p>
        )}
      </DivPublicaciones>
    </DivPerfilUser>
  ) : (
    <Loader />
  );
}

export async function optimizar(dataUrl: string): Promise<string> {
  const optimizedBase64 = await urltoBlob(dataUrl);
  const optimizedBase = await compressAccurately(optimizedBase64, {
    size: 520,
    quality: 0.6,
  });

  const dataFinal = await filetoDataURL(optimizedBase);
  var data = dataFinal.split(',')[1];
  var decodedData = atob(data);

  return dataFinal;
}
