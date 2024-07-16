'use client';
import dynamic from 'next/dynamic';
import FotoPerfil from '@/ui/FotoPerfil';
import {Body} from '@/ui/typography';
import {DivPublicar} from '@/ui/container';
import {useRecoilValue} from 'recoil';
import {
  DivSubir,
  DivASubir,
  DivText,
  DivForm,
  Form,
  Button,
  DivButton,
  ButtonPublicar,
  DivCrear,
} from './styled';
import {FormEvent, useState} from 'react';
import {ImageSVG} from '@/ui/icons';
import {user, isConnect} from '@/lib/atom';
import {CreatePublicacion} from '@/lib/hook';

const Verification = dynamic(() => import('@/ui/verification'));
const CloseSvg = dynamic(() => import('@/ui/icons/close.svg'));
const ImageSubir = dynamic(() => import('@/ui/icons/image.svg'));
const VideoSubir = dynamic(() => import('@/ui/icons/video.svg'));
const Loader = dynamic(() => import('../loader').then((mod) => mod.Loader));

export default function Publicar() {
  const [formClick, setFormClick] = useState(false);
  const dataValor = useRecoilValue(user);
  const dataIsConnect = useRecoilValue(isConnect);

  return (
    <DivPublicar>
      <DivText>
        <FotoPerfil
          img={dataValor?.user?.img}
          className='w-[40px] h-[40px]'
          connect={
            dataIsConnect?.find((e: any) => e.id == dataValor?.user?.id)
              ?.connect && true
          }
        />
        <DivCrear onClick={() => setFormClick(true)}>
          <p>Crear publicacion</p>
        </DivCrear>
      </DivText>
      <DivSubir>
        <DivASubir onClick={() => setFormClick(true)}>
          <ImageSubir /> <Body>Foto</Body>
        </DivASubir>
        {formClick ? (
          <TemplateFormPublicar close={(data: boolean) => setFormClick(data)} />
        ) : null}
        <DivASubir onClick={() => alert('Proximamente')}>
          <VideoSubir />
          <Body>Video</Body>
        </DivASubir>
      </DivSubir>
    </DivPublicar>
  );
}

function TemplateFormPublicar(props: any) {
  const dataUser = useRecoilValue(user);
  const [dataUrl, setDataUrl] = useState('');
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleclose = (e: any) => {
    e.preventDefault();
    props.close(false);
  };

  const handleInput = (event: any) => {
    const textContent = event.target.textContent;
    if (text.length <= 250) {
      setText(textContent);
    }
    if (text.length >= 250) {
      event.target.textContent = text;
    }
  };

  const handleClickForm = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await CreatePublicacion({
      description: text,
      img: dataUrl,
    });
    setIsLoading(false);
    props.close(false);
  };
  const fullName = dataUser?.user?.fullName.split(' ')[0];

  return (
    <>
      <DivForm>
        <div style={{maxWidth: '550px', width: '90%'}}>
          <Form onSubmit={handleClickForm}>
            <div className='flex gap-4 items-start font-bold justify-between w-full'>
              <div className='flex gap-4 items-center'>
                <FotoPerfil
                  className='w-[50px] h-[50px]'
                  img={dataUser?.user?.img}
                />
                <div className='flex items-center gap-2'>
                  <h3 className='text-xl'>{dataUser?.user?.fullName}</h3>
                  {dataUser.user.verification ? (
                    <Verification publication={false} />
                  ) : null}
                </div>
              </div>
              <Button onClick={handleclose}>
                <CloseSvg />
              </Button>
            </div>
            <p
              id='description'
              data-before={'En que estas pensando ' + fullName + ' ?'}
              className={`relative z-10 mt-8 mb-8 text-start indent-3 outline-none ${
                !text
                  ? `before:relative before:z-[-1]   before:content-[attr(data-before)] before:text-hoverPrimary  before:text-2xl`
                  : ''
              }`}
              onInput={handleInput}
              suppressContentEditableWarning={true}
              contentEditable={true}></p>
            <div>
              <div>
                <Body>Agregar a tu publicación</Body>
              </div>
              <ImageSVG dataUrl={(data: string) => setDataUrl(data)}></ImageSVG>
            </div>
            <DivButton>
              <ButtonPublicar color={text} disabled={!text ? true : false}>
                Publicar
              </ButtonPublicar>
            </DivButton>
          </Form>
        </div>
      </DivForm>
      {isLoading ? <Loader /> : null}
    </>
  );
}
