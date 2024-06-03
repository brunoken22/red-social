'use client';
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
  InputP,
  DivButton,
  ButtonPublicar,
  DivCrear,
} from './styled';
import VideoSubir from '@/ui/icons/video.svg';
import {FormEvent, useEffect, useState} from 'react';
import {ImageSVG} from '@/ui/icons';
import ImageSubir from '@/ui/icons/image.svg';
import CloseSvg from '@/ui/icons/close.svg';
import {user, isConnect} from '@/lib/atom';
import {CreatePublicacion} from '@/lib/hook';
import {Loader} from '../loader';

export function Publicar() {
  const [formClick, setFormClick] = useState(false);
  const dataValor = useRecoilValue(user);
  const dataIsConnect = useRecoilValue(isConnect);

  useEffect(() => {
    if (formClick) {
      (document as any).body.style.overflow = 'hidden';
    } else {
      (document as any).body.style.overflow = 'auto';
    }
  }, [formClick]);

  return (
    <DivPublicar>
      <DivText>
        <FotoPerfil
          img={dataValor?.user?.img}
          className='w-[40px] h-[40px]'
          // fullName={dataValor?.user?.fullName}
          connect={
            dataIsConnect?.find((e: any) => e.id == dataValor?.user?.id)
              ?.connect && true
          }
        />
        <DivCrear onClick={() => setFormClick(true)}>
          <p style={{margin: '0'}}>Crear publicacion</p>
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
  const [placeInput, setPlaceinput] = useState(true);
  const [dataUrl, setDataUrl] = useState('');
  const [content, setContent] = useState('');
  const [openSwr, setOpenSwr] = useState(false);

  const {data, isLoading} = CreatePublicacion({
    description: content,
    img: dataUrl,
    openSwr,
  });
  useEffect(() => {
    if (content.length <= 0) {
      setPlaceinput(true);
      return;
    }
  }, [content]);

  useEffect(() => {
    if (data) {
      setOpenSwr(false);
      return props.close(false);
    }
  }, [data]);

  useEffect(() => {
    if (dataUrl !== '') {
      setPlaceinput(false);
    }
  }, [dataUrl]);
  const handleclose = (e: any) => {
    e.preventDefault();
    props.close(false);
  };

  const handleInput = (event: any) => {
    const text = event.target.textContent;
    setPlaceinput(false);
    if (text.length <= 250) {
      setContent(text);
    }
    if (text.length >= 250) {
      event.target.textContent = content;
    }
  };

  const handleClickForm = (e: FormEvent) => {
    e.preventDefault();
    setOpenSwr(true);
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <DivForm>
      <div style={{maxWidth: '550px', width: '90%'}}>
        <Form onSubmit={handleClickForm}>
          <div
            style={{
              display: 'flex',
              gap: '1rem',

              alignItems: 'flex-start',
              fontWeight: 'bolder',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <div
              style={{
                display: 'flex',
                gap: '1rem',

                alignItems: 'center',
              }}>
              <FotoPerfil
                className='w-[80px] h-[80px]'
                img={dataUser?.user?.img}
                // fullName={dataUser?.user?.fullName}
              />
              <h3 className='text-2xl'>{dataUser?.user?.fullName}</h3>
            </div>
            <Button onClick={handleclose}>
              <CloseSvg />
            </Button>
          </div>
          <InputP
            onInput={handleInput}
            suppressContentEditableWarning={true}
            contentEditable={true}
            text={placeInput}
            placeholder={
              content == ''
                ? `Qué estás pensado, ${
                    dataUser?.user?.fullName.split(' ')[0]
                  }?`
                : ''
            }
          />
          <div>
            <div>
              <Body>Agregar a tu publicación</Body>
            </div>
            <ImageSVG
              dataUrl={(data: string) => setDataUrl(data)}
              archivo={(data: boolean) => setPlaceinput(data)}></ImageSVG>
          </div>
          <DivButton>
            <ButtonPublicar color={!placeInput} disabled={placeInput}>
              Publicar
            </ButtonPublicar>
          </DivButton>
        </Form>
      </div>
    </DivForm>
  );
}
