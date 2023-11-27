import React from 'react';
import {DivSkeleton, PhotoSkeleton, TextSkeleton, SpanLuz} from './styled';
import {
  DivHeadPerfil,
  DivFotoName,
  DivPublicaciones,
} from '@/components/perfilUser/styled';
import {DivSubir, DivText} from '@/components/publicar/styled';
import {DivPublicar} from '../container';

export function SkeletonNoti(props: React.ComponentProps<any>) {
  return (
    <DivSkeleton {...props}>
      <DivPublicaciones>
        <DivPublicar>
          <DivText>
            <PhotoSkeleton $width='40px' $height='40px'>
              <SpanLuz></SpanLuz>
            </PhotoSkeleton>
            <TextSkeleton $width='50%' $height='30px'>
              <SpanLuz></SpanLuz>
            </TextSkeleton>
          </DivText>
          <TextSkeleton $width='100%' $height='300px'>
            <SpanLuz></SpanLuz>
          </TextSkeleton>
          <TextSkeleton $width='100%' $height='30px' $margin='0 0 1rem 0'>
            <SpanLuz></SpanLuz>
          </TextSkeleton>
        </DivPublicar>
      </DivPublicaciones>
      <DivPublicaciones>
        <DivPublicar>
          <DivText>
            <PhotoSkeleton $width='40px' $height='40px'>
              <SpanLuz></SpanLuz>
            </PhotoSkeleton>
            <TextSkeleton $width='50%' $height='30px'>
              <SpanLuz></SpanLuz>
            </TextSkeleton>
          </DivText>
          <TextSkeleton $width='100%' $height='300px'>
            <SpanLuz></SpanLuz>
          </TextSkeleton>
          <TextSkeleton $width='100%' $height='30px' $margin='0 0 1rem 0'>
            <SpanLuz></SpanLuz>
          </TextSkeleton>
        </DivPublicar>
      </DivPublicaciones>
    </DivSkeleton>
  );
}
export function SkeletonPerfil(props: React.ComponentProps<any>) {
  return (
    <DivSkeleton {...props}>
      <DivHeadPerfil>
        <DivFotoName>
          <PhotoSkeleton>
            <SpanLuz></SpanLuz>
          </PhotoSkeleton>
          <TextSkeleton $width='200px' $margin='1rem'>
            <SpanLuz></SpanLuz>
          </TextSkeleton>
        </DivFotoName>
        <TextSkeleton $margin='1rem'>
          <SpanLuz></SpanLuz>
        </TextSkeleton>
      </DivHeadPerfil>
      <DivPublicaciones>
        <DivPublicar>
          <DivText>
            <PhotoSkeleton $width='40px' $height='40px'>
              <SpanLuz></SpanLuz>
            </PhotoSkeleton>
            <TextSkeleton $width='90%' $height='40px'>
              <SpanLuz></SpanLuz>
            </TextSkeleton>
          </DivText>
          <DivSubir>
            <TextSkeleton $width='100px' $height='30px' $margin='1rem'>
              <SpanLuz></SpanLuz>
            </TextSkeleton>
            <TextSkeleton $width='100px' $height='30px' $margin='1rem'>
              <SpanLuz></SpanLuz>
            </TextSkeleton>
          </DivSubir>
        </DivPublicar>
        <DivPublicar>
          <DivText>
            <PhotoSkeleton $width='40px' $height='40px'>
              <SpanLuz></SpanLuz>
            </PhotoSkeleton>
            <TextSkeleton $width='50%' $height='30px'>
              <SpanLuz></SpanLuz>
            </TextSkeleton>
          </DivText>
          <TextSkeleton $width='100%' $height='300px'>
            <SpanLuz></SpanLuz>
          </TextSkeleton>
          <TextSkeleton $width='100%' $height='30px' $margin='0 0 1rem 0'>
            <SpanLuz></SpanLuz>
          </TextSkeleton>
        </DivPublicar>
      </DivPublicaciones>
    </DivSkeleton>
  );
}
export function SkeletonPerfilAmigo(props: React.ComponentProps<any>) {
  return (
    <DivSkeleton {...props}>
      <DivHeadPerfil>
        <DivFotoName>
          <PhotoSkeleton>
            <SpanLuz></SpanLuz>
          </PhotoSkeleton>
          <TextSkeleton $width='200px' $margin='1rem'>
            <SpanLuz></SpanLuz>
          </TextSkeleton>
        </DivFotoName>
        <TextSkeleton $margin='1rem'>
          <SpanLuz></SpanLuz>
        </TextSkeleton>
      </DivHeadPerfil>
      <DivPublicaciones>
        <DivPublicar>
          <DivText>
            <PhotoSkeleton $width='40px' $height='40px'>
              <SpanLuz></SpanLuz>
            </PhotoSkeleton>
            <TextSkeleton $width='50%' $height='30px'>
              <SpanLuz></SpanLuz>
            </TextSkeleton>
          </DivText>
          <TextSkeleton $width='100%' $height='300px'>
            <SpanLuz></SpanLuz>
          </TextSkeleton>
          <TextSkeleton $width='100%' $height='30px' $margin='0 0 1rem 0'>
            <SpanLuz></SpanLuz>
          </TextSkeleton>
        </DivPublicar>
      </DivPublicaciones>
    </DivSkeleton>
  );
}
export function SkeletonPublicacionAll(props: React.ComponentProps<any>) {
  return (
    <DivSkeleton {...props}>
      <DivPublicaciones>
        <DivPublicar>
          <DivText>
            <PhotoSkeleton $width='40px' $height='40px'>
              <SpanLuz></SpanLuz>
            </PhotoSkeleton>
            <TextSkeleton $width='50%' $height='30px'>
              <SpanLuz></SpanLuz>
            </TextSkeleton>
          </DivText>
          <TextSkeleton $width='100%' $height='300px'>
            <SpanLuz></SpanLuz>
          </TextSkeleton>
          <TextSkeleton $width='100%' $height='30px' $margin='0 0 1rem 0'>
            <SpanLuz></SpanLuz>
          </TextSkeleton>
        </DivPublicar>
      </DivPublicaciones>
      <DivPublicaciones>
        <DivPublicar>
          <DivText>
            <PhotoSkeleton $width='40px' $height='40px'>
              <SpanLuz></SpanLuz>
            </PhotoSkeleton>
            <TextSkeleton $width='50%' $height='30px'>
              <SpanLuz></SpanLuz>
            </TextSkeleton>
          </DivText>
          <TextSkeleton $width='100%' $height='300px'>
            <SpanLuz></SpanLuz>
          </TextSkeleton>
          <TextSkeleton $width='100%' $height='30px' $margin='0 0 1rem 0'>
            <SpanLuz></SpanLuz>
          </TextSkeleton>
        </DivPublicar>
      </DivPublicaciones>
    </DivSkeleton>
  );
}
