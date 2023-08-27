'use client';
import {FotoPerfil} from '@/ui/FotoPerfil';
import {Input} from '@/ui/input';
import {Body} from '@/ui/typography';
import {DivPublicar} from '@/ui/container';
import {user} from '@/lib/atom';
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
} from './styled';
import VideoSubir from '@/ui/icons/video.svg';
import {useEffect, useState} from 'react';
import {ImageSVG} from '@/ui/icons';
import ImageSubir from '@/ui/icons/image.svg';
import CloseSvg from '@/ui/icons/close.svg';
import {publicacionUser} from '@/lib/atom';
import {useRecoilState} from 'recoil';
import {CreatePublicacion} from '@/lib/hook';
import {Loader} from '../loader';
export function Publicar() {
  const [formClick, setFormClick] = useState(false);

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
        <FotoPerfil />
        <Input
          type='text'
          placeholder='Crear publicacion'
          onClick={() => setFormClick(true)}
        />
      </DivText>
      <DivSubir>
        <DivASubir onClick={() => setFormClick(true)}>
          <ImageSubir /> <Body $margin='0px'>Foto</Body>
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
  const [newPublicacion, setNewPublicacion] = useRecoilState(publicacionUser);
  const dataUser = useRecoilValue(user);
  const [placeInput, setPlaceinput] = useState(true);
  const [dataUrl, setDataUrl] = useState('');
  const [content, setContent] = useState('');
  const [newid, setNewId] = useState(0);

  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const {data, isLoading} = CreatePublicacion(
    {
      description: content,
      id: newid,
      like: 0,
      img: dataUrl,
      comentarios: [],
    },
    token as string
  );

  useEffect(() => {
    if (content.length == 0) {
      setPlaceinput(true);
      setContent('');
    }
    if (content.length < 250 && content.length > 0) {
      setPlaceinput(false);
    }
  }, [content]);

  useEffect(() => {
    if (data) {
      props.close(false);
    }
  }, [data]);

  const handleclose = (e: any) => {
    e.preventDefault();
    props.close(false);
  };

  const handleInput = (event: any) => {
    const text = event.target.textContent;

    if (text.length <= 250) {
      setContent(text);
    } else {
      event.target.textContent = content;
    }
  };
  const dataUrlImg = (data: string) => {
    setDataUrl(data);
  };
  const handleClickForm = (e: any) => {
    e.preventDefault();
    const nuevaPublicacion = {
      id: Date.now(),
      description: content,
      img: dataUrl,
    };
    setNewPublicacion((prevPublicaciones: any) => [
      ...prevPublicaciones,
      nuevaPublicacion,
    ]);
    setNewId(Date.now() as number);
    setDataUrl('');
    setContent('');
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
              color: '#000',
              alignItems: 'flex-start',
              fontWeight: 'bolder',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <div
              style={{
                display: 'flex',
                gap: '1rem',
                color: '#000',
                alignItems: 'flex-start',
              }}>
              <FotoPerfil wid='80' hei='80' />
              <h3>{dataUser?.user?.fullName}</h3>
            </div>
            <Button onClick={handleclose}>
              <CloseSvg />
            </Button>
          </div>
          <InputP
            onInput={handleInput}
            required
            suppressContentEditableWarning={true}
            contentEditable={true}
            $content={placeInput}
            placeholder={
              placeInput
                ? `Qué estás pensado, ${
                    dataUser?.user?.fullName.split(' ')[0]
                  }?`
                : null
            }>
            {content.length === 0 && content}
          </InputP>
          <div>
            <div>
              <Body>Agregar a tu publicación</Body>
            </div>
            <ImageSVG dataUrl={dataUrlImg}></ImageSVG>
          </div>
          <DivButton>
            <ButtonPublicar $color={!placeInput} disabled={placeInput}>
              Publicar
            </ButtonPublicar>
          </DivButton>
        </Form>
      </div>
    </DivForm>
  );
}
