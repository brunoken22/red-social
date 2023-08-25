import Dropzone from 'dropzone';
import {useEffect, useRef} from 'react';
import {Body} from '../typography';
import 'dropzone/dist/dropzone.css';

export function ImageSVG(props: any) {
  const image: any = useRef(null);
  useEffect(() => {
    // if (image?.current) {
    //   if (image?.current?.dropzone) {
    //     image.current.dropzone.destroy();
    //   }
    const myDropzone = new Dropzone('.dropzone', {
      url: '/perfil',
      autoProcessQueue: false,
      maxFiles: 1,
      maxFilesize: 2,
      addRemoveLinks: true,
      acceptedFiles: 'image/png, image/jpeg',
      previewsContainer: '.previews-container',
    });

    myDropzone.on('thumbnail', function (file) {
      console.log(file.dataURL);
      // setDataImg(file.dataURL as string);
    });
    // }
  }, []);

  return (
    <>
      <div className='dropzone'>
        <div className='dz-default dz-message'>
          <button className='dz-button' type='button'>
            {' '}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 512 512'
              width='20px'>
              <path
                fill='#2196F3'
                d='M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z'
              />
            </svg>
            <Body $margin='0px'>Foto</Body>
          </button>
        </div>
      </div>
    </>
  );
}
