import Dropzone from 'dropzone';
import {useEffect, useState} from 'react';
import {Body} from '../typography';
import 'dropzone/dist/dropzone.css';
import {OptimizarImage} from '@/lib/hook';
import {LoaderComponent} from '@/components/loader';
export function ImageSVG(props: any) {
  const [dataUrlOp, setDataUrlOp] = useState('');
  const {data, isLoading} = OptimizarImage(dataUrlOp);

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
        this.on('maxfilesexceeded', function (file) {
          alert('Solo un archivo porfavor!');
        });
      },
      maxfilesexceeded: async function (files) {
        (this as any).removeAllFiles();
        (this as any).addFile(files);
        setDataUrlOp(files.dataURL as string);
        props.archivo(true);
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
      setDataUrlOp(file.dataURL as string);
      props.archivo(true);
    });
    // }
  }, []);

  useEffect(() => {
    if (data) {
      props.dataUrl(data);
    }
  }, [data]);
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
