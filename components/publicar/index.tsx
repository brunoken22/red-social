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
} from './styled';
import VideoSubir from '@/ui/icons/video.svg';
import {useEffect, useState} from 'react';
import {ImageSVG} from '@/ui/icons';
import ImageSubir from '@/ui/icons/image.svg';
import CloseSvg from '@/ui/icons/close.svg';
import 'dropzone/dist/basic.css';

export function Publicar() {
  const [dataImg, setDataImg] = useState('');
  const [formClick, setFormClick] = useState(false);
  // const dataUrlSvg = (dataUrl: string) => {
  //   console.log(dataUrl);
  //   // setDataImg(dataUrl);
  // };
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
        <Input type='text' placeholder='Crear publicacion' />
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
// className='previews-container'
function TemplateFormPublicar(props: any) {
  const dataUser = useRecoilValue(user);
  const [placeInput, setPlaceinput] = useState(true);
  const [inputValue, setInputValue] = useState('');

  const handleclose = (e: any) => {
    e.preventDefault();
    props.close(false);
  };

  const handleClickInput = (e: any) => {
    e.preventDefault();
    // console.log(e.target.textContent.length);
    if (e.target.textContent.length !== 0) {
      setPlaceinput(false);
      return;
    } else {
      setPlaceinput(!placeInput);
    }
  };
  const handleClickChange = (e: any) => {
    // e.preventDefault();
    console.log(e.target);
    setInputValue(e.target.value);

    if (e.target.textContent.length) {
      // console.log(e.target.textContent.length);
    }
  };
  return (
    <DivForm>
      <div style={{maxWidth: '550px', width: '90%'}}>
        <Form action=''>
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              color: '#000',
              alignItems: 'flex-start',
              fontWeight: 'bolder',
              justifyContent: 'space-between',
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
            // onFocus={handleFocus}
            // onBlur={handleBlur}
            onChange={handleClickChange}
            // onFocus={handleClickInput}
            contentEditable='true'
            content={placeInput}
            placeholder={`Qué estás pensado, ${
              dataUser?.user?.fullName.split(' ')[0]
            }?`}>
            {inputValue}
          </InputP>
          <div className='previews-container'></div>
          <ImageSVG></ImageSVG>
        </Form>
      </div>
    </DivForm>
  );
}
