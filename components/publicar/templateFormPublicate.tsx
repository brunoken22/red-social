'use client';
import { GetAllPublicaciones, GetAllPublicacionesUser } from '@/lib/hook';
import dynamic from 'next/dynamic';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
const Verification = dynamic(() => import('@/ui/verification'));
const CloseSvg = dynamic(() => import('@/ui/icons/close.svg'));
const Loader = dynamic(() => import('../loader').then((mod) => mod.Loader));
const DivForm = dynamic(() => import('./styled').then((mod) => mod.DivForm));
const Form = dynamic(() => import('./styled').then((mod) => mod.Form));
const Button = dynamic(() => import('./styled').then((mod) => mod.Button));
const DivButton = dynamic(() => import('./styled').then((mod) => mod.DivButton));
const ButtonPublicar = dynamic(() => import('./styled').then((mod) => mod.ButtonPublicar));

const ImageSVG = dynamic(() => import('@/ui/icons').then((mod) => mod.ImageSVG));
const FotoPerfil = dynamic(() => import('@/ui/FotoPerfil'));

export default function TemplateFormPublicar({
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
  const [dataUrl, setDataUrl] = useState<File[]>([]);
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = GetAllPublicaciones(true);
  const { mutatePublicacionesUser } = GetAllPublicacionesUser(true);
  const pathname = usePathname();

  const modalRef = useRef<HTMLDivElement>(null); // Referencia al modal para saber si el clic ocurrió dentro o fuera

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        close();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInput = (event: any) => {
    const textContent = event.target.value;
    setText(textContent);
  };

  const handleClickForm = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const CreatePublicacion = (await import('@/lib/hook')).CreatePublicacion;
    await CreatePublicacion({
      description: text,
      img: dataUrl,
    });
    if (pathname === '/perfil') {
      await mutatePublicacionesUser();
    } else {
      await mutate();
    }
    setIsLoading(false);
    close();
  };

  return (
    <>
      <DivForm>
        <div className='lg:max-w-[550px]  w-full max-lg:h-full' ref={modalRef}>
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
              className='flex-1 bg-transparent relative z-10 mt-8 mb-8 max-md:mt-4 max-md:mb-4 text-start p-2 outline-none overflow-auto min-h-[150px] resize-none placeholder:text-2xl'
              value={text}
              onChange={handleInput}></textarea>
            <div>
              <div className='bg-hoverPrimary dark:bg-dark rounded-md p-4'>
                <ImageSVG setDataUrl={setDataUrl} dataUrl={dataUrl}></ImageSVG>
              </div>
              <p className='text-xs mb-2 mt-1'>Máximo de 3 imagenes</p>
            </div>
            <DivButton>
              <ButtonPublicar
                color={text || dataUrl.length.toString()}
                disabled={!text && !dataUrl ? true : false}>
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
