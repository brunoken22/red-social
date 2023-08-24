'use client';
import {FotoPerfil} from '@/ui/FotoPerfil';
import {Input} from '@/ui/input';
import {Body} from '@/ui/typography';
import {DivPublicar} from '@/ui/container';
import {DivSubir, DivASubir, DivText} from './styled';
import VideoSubir from '@/ui/icons/video.svg';
import ImageSubir from '@/ui/icons/image.svg';
import {useEffect, useRef, useState} from 'react';
import Dropzone from 'dropzone';

export function Publicar() {
  const image: any = useRef(null);
  const [dataImg, setDataImg] = useState('');

  useEffect(() => {
    if (image.current) {
      if (image.current.dropzone) {
        image.current.dropzone.destroy();
      }
      const myDropzone = new Dropzone(image.current, {
        url: '/false',
        autoProcessQueue: false,
      });

      myDropzone.on('thumbnail', function (file) {
        setDataImg(file.dataURL as string);
      });
    }
  }, [image]);

  return (
    <DivPublicar>
      <DivText>
        <FotoPerfil />
        <Input type='text' placeholder='Crear publicacion' />
      </DivText>
      <DivSubir>
        <DivASubir ref={image}>
          <ImageSubir />
          <Body $margin='0px'>Foto</Body>
        </DivASubir>
        <DivASubir onClick={() => alert('Proximamente')}>
          <VideoSubir />
          <Body>Video</Body>
        </DivASubir>
      </DivSubir>
    </DivPublicar>
  );
}
