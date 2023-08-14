'use client';
import {FotoPerfil} from '@/ui/FotoPerfil';
import {Input} from '@/ui/input';
import {Body} from '@/ui/typography';
import {DivPublicar} from '@/ui/container';
import {DivSubir, DivASubir, DivText} from './styled';
import VideoSubir from '@/ui/icons/video.svg';
import ImageSubir from '@/ui/icons/image.svg';
export function Publicar() {
  return (
    <DivPublicar>
      <DivText>
        <FotoPerfil />
        <Input type='text' placeholder='Crear publicacion' />
      </DivText>
      <DivSubir>
        <DivASubir>
          <ImageSubir />
          <Body>Foto</Body>
        </DivASubir>
        <DivASubir>
          <VideoSubir />
          <Body>Video</Body>
        </DivASubir>
      </DivSubir>
    </DivPublicar>
  );
}
