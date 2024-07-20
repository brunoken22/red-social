'use client';
import dynamic from 'next/dynamic';
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
import {user, isConnect} from '@/lib/atom';
import {CreatePublicacion} from '@/lib/hook';

const Verification = dynamic(() => import('@/ui/verification'));
const CloseSvg = dynamic(() => import('@/ui/icons/close.svg'));
const ImageSubir = dynamic(() => import('@/ui/icons/image.svg'));
const VideoSubir = dynamic(() => import('@/ui/icons/video.svg'));

const Loader = dynamic(() => import('../loader').then((mod) => mod.Loader));
const SkeletonPlicate = dynamic(() =>
  import('@/ui/skeleton').then((mod) => mod.SkeletonPlicate)
);
const NotificationToastStatus = dynamic(() =>
  import('@/ui/toast').then((mod) => mod.NotificationToastStatus)
);
const ImageSVG = dynamic(() =>
  import('@/ui/icons').then((mod) => mod.ImageSVG)
);
const Body = dynamic(() => import('@/ui/typography').then((mod) => mod.Body));
const FotoPerfil = dynamic(() => import('@/ui/FotoPerfil'));

export default function Publicar() {
  const [formClick, setFormClick] = useState(false);
  const dataValor = useRecoilValue(user);
  const dataIsConnect = useRecoilValue(isConnect);
  const [alert, setAlert] = useState<
    {message: string; status: 'success' | 'error' | 'info' | 'warning'} | false
  >(false);

  return dataValor.user.id ? (
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
          <TemplateFormPublicar
            fullName={dataValor.user.fullName}
            image={dataValor.user.img}
            verification={dataValor.user.verification}
            close={() => setFormClick(false)}
          />
        ) : null}
        <DivASubir
          onClick={() => setAlert({message: 'Proximamente', status: 'info'})}>
          <VideoSubir />
          <Body>Video</Body>
        </DivASubir>
      </DivSubir>
      {alert && (
        <NotificationToastStatus
          message={alert.message}
          status={alert.status}
          close={() => setAlert(false)}
        />
      )}
    </DivPublicar>
  ) : (
    <SkeletonPlicate />
  );
}

function TemplateFormPublicar({
  fullName,
  image,
  verification,
  close,
}: {
  fullName: string;
  image: string;
  verification: boolean;
  close: () => any;
}) {
  const [dataUrl, setDataUrl] = useState('');
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = (event: any) => {
    const textContent = event.target.value;
    setText(textContent);
  };

  const handleClickForm = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await CreatePublicacion({
      description: text,
      img: dataUrl,
    });
    setIsLoading(false);
    close();
  };

  return (
    <>
      (
      <DivForm>
        <div className='max-w-[550px] w-[90%]'>
          <Form onSubmit={handleClickForm}>
            <div className='flex gap-4 items-start font-bold justify-between w-full'>
              <div className='flex gap-4 items-center'>
                <FotoPerfil className='w-[50px] h-[50px]' img={image} />
                <div className='flex items-center gap-2'>
                  <h3 className='text-xl'>{fullName}</h3>
                  {verification ? <Verification publication={false} /> : null}
                </div>
              </div>
              <Button onClick={() => close()}>
                <CloseSvg />
              </Button>
            </div>
            <textarea
              id='description'
              maxLength={1000}
              placeholder={`En qué estás pensando ${fullName.split(' ')[0]}?`}
              className='bg-transparent relative z-10 mt-8 mb-8 max-md:mt-4 max-md:mb-4 text-start p-2 outline-none overflow-auto min-h-[150px] resize-none placeholder:text-2xl'
              required={true}
              value={text}
              onChange={handleInput}></textarea>
            <div>
              <ImageSVG dataUrl={(data: string) => setDataUrl(data)}></ImageSVG>
            </div>
            <DivButton>
              <ButtonPublicar
                color={text || dataUrl}
                disabled={!text && !dataUrl ? true : false}>
                Publicar
              </ButtonPublicar>
            </DivButton>
          </Form>
        </div>
      </DivForm>
      ){isLoading ? <Loader /> : null}
    </>
  );
}
