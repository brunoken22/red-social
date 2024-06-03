import Dropzone from 'dropzone';
import {useEffect, useState} from 'react';
import {Body} from '../typography';
import 'dropzone/dist/dropzone.css';
import {optimizarImage} from '@/lib/hook';
import {LoaderComponent} from '@/components/loader';
export function ImageSVG(props: any) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const myDropzone = new Dropzone('.dropzone', {
      url: '/perfil',
      autoProcessQueue: false,
      uploadMultiple: false,
      maxFiles: 1,
      maxFilesize: 100,
      maxThumbnailFilesize: 100,
      resizeQuality: 0.5,
      acceptedFiles: 'image/png, image/jpeg, image/jpg',
      addRemoveLinks: true,
      dictRemoveFile: 'Eliminar',
      init: function () {
        this.on('maxfilesexceeded', function () {
          alert('Solo un archivo porfavor!');
        });
      },
      maxfilesexceeded: async function (files) {
        (this as any).removeAllFiles();
        (this as any).addFile(files);
        setIsLoading(true);
        const dataObtimizado = await optimizarImage(files.dataURL as string);
        setIsLoading(false);
        props.dataUrl(dataObtimizado);
        props.archivo(true);
        return;
      },
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
      const dataObtimizado = await optimizarImage(file.dataURL as string);
      props.dataUrl(dataObtimizado);
      props.archivo(true);
    });
  }, []);

  return (
    <>
      <div className='dropzone' style={{position: 'relative'}}>
        <div className='dz-default dz-message'>
          <button className='dz-button' type='button'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 512 512'
              width='80px'>
              <path
                fill='#2196F3'
                d='M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z'
              />
            </svg>
            <div>
              <Body>
                <strong>Agregar Foto</strong> <br />o Arrastra y suelta
              </Body>
            </div>
          </button>
        </div>
        {!isLoading ? (
          <div
            className='dz-default dz-message"
      '></div>
        ) : (
          <LoaderComponent />
        )}
      </div>
    </>
  );
}
export function SendComentPubli() {
  return (
    <svg
      className='hover:fill-[#2684ff]'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 32 32'
      id='send'
      height={'20px'}
      width={'20px'}
      style={{marginLeft: '1rem', float: 'right'}}
      fill='#66a1ee'>
      <path d='M30.50443,14.58744l-28-10C1.95023,4.38871,1.32913,4.5352,0.91947,4.95951c-0.40918,0.4248-0.53125,1.0498-0.31201,1.59766l3.77686,9.44287l-3.77686,9.44287c-0.21924,0.54785-0.09717,1.17285,0.31201,1.59766c0.28809,0.29883,0.68018,0.45947,1.08105,0.45947c0.16895,0,0.33936-0.02832,0.50391-0.0874l28-10c0.59717-0.21338,0.99561-0.77881,0.99561-1.4126C31.50003,15.36625,31.10159,14.80082,30.50443,14.58744z M4.62796,23.46879l2.38751-5.96875h5.14374c0.82861,0,1.5-0.67139,1.5-1.5c0-0.82861-0.67139-1.5-1.5-1.5H7.01548L4.62796,8.53129l20.91211,7.46875L4.62796,23.46879z'></path>
    </svg>
  );
}
