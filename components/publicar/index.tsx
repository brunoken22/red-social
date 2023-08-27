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
  const [, setNewPublicacion] = useRecoilState(publicacionUser);
  const dataUser = useRecoilValue(user);
  const [placeInput, setPlaceinput] = useState(true);
  const [dataUrl, setDataUrl] = useState('');
  const [fecha, setFecha] = useState('');
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
      fecha: fecha,
    },
    token as string
  );

  useEffect(() => {
    if (content.length <= 0) {
      setPlaceinput(true);
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
    setPlaceinput(false);
    if (text.length <= 250) {
      setContent(text);
    }
    if (text.length >= 250) {
      event.target.textContent = content;
    }
  };

  const handleClickForm = (e: any) => {
    e.preventDefault();
    let fechaActual = new Date();

    let año = fechaActual.getFullYear();
    let mes = fechaActual.getMonth() + 1; // Los meses en JavaScript son indexados desde 0
    let dia = fechaActual.getDate();

    const nuevaPublicacion = {
      id: Date.now(),
      description: content,
      img: dataUrl,
      fecha: `${dia}/${mes}/${año}`,
    };
    setFecha(`${dia}/${mes}/${año}`);
    setNewPublicacion((prevPublicaciones: any) => [
      ...prevPublicaciones,
      nuevaPublicacion,
    ]);
    setNewId(Date.now() as number);
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
            suppressContentEditableWarning={true}
            contentEditable={true}
            $content={placeInput}
            placeholder={
              content == ''
                ? `Qué estás pensado, ${
                    dataUser?.user?.fullName.split(' ')[0]
                  }?`
                : null
            }></InputP>
          <div>
            <div>
              <Body>Agregar a tu publicación</Body>
            </div>
            <ImageSVG dataUrl={(data: string) => setDataUrl(data)}></ImageSVG>
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
