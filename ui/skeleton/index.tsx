import React from 'react';
import {DivSkeleton, PhotoSkeleton, SpanLuz, TextSkeleton} from './styled';
import {
  DivHeadPerfil,
  DivFotoName,
  DivPublicaciones,
} from '@/components/perfilUser/styled';
import {DivSubir, DivText} from '@/components/publicar/styled';
import {DivAllChat, DivPublicar} from '../container';
import {TemplChat} from '@/components/templateMensaje/styled';

export function SkeletonNoti(props: React.ComponentProps<any>) {
  return (
    <DivSkeleton {...props}>
      <DivPublicaciones>
        <DivPublicar>
          <DivText>
            <PhotoSkeleton className='w-[40px] h-[40px]'>
              <SpanLuz></SpanLuz>
            </PhotoSkeleton>
            <TextSkeleton className='w-[50%] h-[30px]'>
              <SpanLuz></SpanLuz>
            </TextSkeleton>
          </DivText>
          <TextSkeleton className='w-full h-[300px]'>
            <SpanLuz></SpanLuz>
          </TextSkeleton>
          <TextSkeleton className='w-full h-[30px] m-[0_0_1rem_0]'>
            <SpanLuz></SpanLuz>
          </TextSkeleton>
        </DivPublicar>
      </DivPublicaciones>
      <DivPublicaciones>
        <DivPublicar>
          <DivText>
            <PhotoSkeleton className='w-[40px] h-[40px]'>
              <SpanLuz></SpanLuz>
            </PhotoSkeleton>
            <TextSkeleton className='w-[50%] h-[30px] '>
              <SpanLuz></SpanLuz>
            </TextSkeleton>
          </DivText>
          <TextSkeleton className='w-full h-[300px] '>
            <SpanLuz></SpanLuz>
          </TextSkeleton>
          <TextSkeleton className='w-full h-[30px] m-[0_0_1rem_0]'>
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
          <TextSkeleton className='w-[200px] m-4'>
            <SpanLuz></SpanLuz>
          </TextSkeleton>
        </DivFotoName>
        <TextSkeleton className=' m-4'>
          <SpanLuz></SpanLuz>
        </TextSkeleton>
      </DivHeadPerfil>
      <DivPublicaciones>
        <DivPublicar>
          <DivText>
            <PhotoSkeleton className='w-[40px] h-[40px]'>
              <SpanLuz></SpanLuz>
            </PhotoSkeleton>
            <TextSkeleton className='w-[90%] h-[40px]'>
              <SpanLuz></SpanLuz>
            </TextSkeleton>
          </DivText>
          <DivSubir>
            <TextSkeleton className='w-[100px] h-[30px] m-4'>
              <SpanLuz></SpanLuz>
            </TextSkeleton>
            <TextSkeleton className='w-[100px] h-[30px] m-4'>
              <SpanLuz></SpanLuz>
            </TextSkeleton>
          </DivSubir>
        </DivPublicar>
        <DivPublicar>
          <DivText>
            <PhotoSkeleton className='w-[40px] h-[40px]'>
              <SpanLuz></SpanLuz>
            </PhotoSkeleton>
            <TextSkeleton className='w-[50%] h-[30px]'>
              <SpanLuz></SpanLuz>
            </TextSkeleton>
          </DivText>
          <TextSkeleton className='w-full h-[300px]'>
            <SpanLuz></SpanLuz>
          </TextSkeleton>
          <TextSkeleton className='w-full h-[30px] m-[0_0_1rem_0]'>
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
          <TextSkeleton className='w-[200px] m-4'>
            <SpanLuz></SpanLuz>
          </TextSkeleton>
        </DivFotoName>
        <TextSkeleton className='m-4'>
          <SpanLuz></SpanLuz>
        </TextSkeleton>
      </DivHeadPerfil>
      <SkeletonPublicacionAll />
    </DivSkeleton>
  );
}
export function SkeletonPublicacionAll(props: React.ComponentProps<any>) {
  return (
    <DivSkeleton {...props}>
      <DivPublicaciones>
        <DivPublicar>
          <DivText>
            <PhotoSkeleton className='w-[40px] h-[40px]'>
              <SpanLuz></SpanLuz>
            </PhotoSkeleton>
            <TextSkeleton className='w-[50%] h-[30px]'>
              <SpanLuz></SpanLuz>
            </TextSkeleton>
          </DivText>
          <TextSkeleton className='w-full h-[300px]'>
            <SpanLuz></SpanLuz>
          </TextSkeleton>
          <TextSkeleton className='w-full h-[30px] m-[0_0_1rem_0]'>
            <SpanLuz></SpanLuz>
          </TextSkeleton>
        </DivPublicar>
      </DivPublicaciones>
      <DivPublicaciones>
        <DivPublicar>
          <DivText>
            <PhotoSkeleton className='w-[40px] h-[40px]'>
              <SpanLuz></SpanLuz>
            </PhotoSkeleton>
            <TextSkeleton className='w-[50%] h-[30px] '>
              <SpanLuz></SpanLuz>
            </TextSkeleton>
          </DivText>
          <TextSkeleton className='w-full h-[300px] '>
            <SpanLuz></SpanLuz>
          </TextSkeleton>
          <TextSkeleton className='w-full h-[30px] m-[0_0_1rem_0]'>
            <SpanLuz></SpanLuz>
          </TextSkeleton>
        </DivPublicar>
      </DivPublicaciones>
    </DivSkeleton>
  );
}
export function SkeletonMenssage() {
  return (
    <TemplChat>
      <DivAllChat className='w-[250px]'>
        <DivText>
          <PhotoSkeleton className='w-[40px] h-[40px]'>
            <SpanLuz></SpanLuz>
          </PhotoSkeleton>
          <TextSkeleton className='w-[90%] h-[30px] '>
            <SpanLuz></SpanLuz>
          </TextSkeleton>
        </DivText>
      </DivAllChat>
      <DivAllChat className='w-[250px]'>
        <DivText>
          <PhotoSkeleton className='w-[40px] h-[40px]'>
            <SpanLuz></SpanLuz>
          </PhotoSkeleton>
          <TextSkeleton className='w-[90%] h-[30px] '>
            <SpanLuz></SpanLuz>
          </TextSkeleton>
        </DivText>
      </DivAllChat>
      <DivAllChat className='w-[250px]'>
        <DivText>
          <PhotoSkeleton className='w-[40px] h-[40px]'>
            <SpanLuz></SpanLuz>
          </PhotoSkeleton>
          <TextSkeleton className='w-[90%] h-[30px] '>
            <SpanLuz></SpanLuz>
          </TextSkeleton>
        </DivText>
      </DivAllChat>
      <DivAllChat className='w-[250px]'>
        <DivText>
          <PhotoSkeleton className='w-[40px] h-[40px]'>
            <SpanLuz></SpanLuz>
          </PhotoSkeleton>
          <TextSkeleton className='w-[90%] h-[30px] '>
            <SpanLuz></SpanLuz>
          </TextSkeleton>
        </DivText>
      </DivAllChat>
      <DivAllChat className='w-[250px]'>
        <DivText>
          <PhotoSkeleton className='w-[40px] h-[40px]'>
            <SpanLuz></SpanLuz>
          </PhotoSkeleton>
          <TextSkeleton className='w-[90%] h-[30px] '>
            <SpanLuz></SpanLuz>
          </TextSkeleton>
        </DivText>
      </DivAllChat>
    </TemplChat>
  );
}
export function SkeletonNav() {
  return (
    <div className='p-2 sticky top-0 right-0 left-0 z-10 bg-primary dark:bg-darkComponet dark:transition-dark'>
      <div className='flex justify-between items-center max-md:justify-between max-w-[850px] m-auto'>
        <TextSkeleton className='w-[40px] h-[40px]'></TextSkeleton>
        <div className='flex max-md:gap-2 gap-4'>
          <TextSkeleton className='w-[35px] h-[35px]'></TextSkeleton>
          <TextSkeleton className='w-[35px] h-[35px]'></TextSkeleton>
          <TextSkeleton className='w-[35px] h-[35px]'></TextSkeleton>
          <TextSkeleton className='w-[35px] h-[35px]'></TextSkeleton>
        </div>
        <PhotoSkeleton className='w-[40px] h-[40px]'></PhotoSkeleton>
      </div>
    </div>
  );
}
