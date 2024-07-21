'use client';
import dynamic from 'next/dynamic';
import {
  DivPerfil,
  DivAñadirComentar,
  BottonSendComentario,
} from '@/components/publicaciones/styled';
import {useState} from 'react';
const NotificationToastStatus = dynamic(() =>
  import('@/ui/toast').then((mod) => mod.NotificationToastStatus)
);
const SendComentPubli = dynamic(() =>
  import('@/ui/icons').then((mod) => mod.SendComentPubli)
);

const TemplateComment = dynamic(() => import('./templatecomment'));
const FotoPerfil = dynamic(() => import('@/ui/FotoPerfil'));

export default function Comment(props: any) {
  const [content, setContent] = useState('');
  const [dataComentariosAll, setDataComentariosAll] = useState<any[]>(
    props.comentarios
  );
  const [alert, setAlert] = useState<
    {message: string; status: 'success' | 'error' | 'info' | 'warning'} | false
  >(false);
  const handleInput = (event: any) => {
    const text = event.target.textContent;
    if (text.length <= 250) {
      setContent(text);
    }
    if (text.length >= 250) {
      event.target.textContent = content;
    }
  };
  const handleComment = async () => {
    if (content) {
      const comentarPublicacion = (await import('@/lib/hook'))
        .comentarPublicacion;

      await comentarPublicacion({
        id: props.idPublicacion,
        description: content,
      });
      setContent('');
      setDataComentariosAll((prev: any) => [
        ...prev,
        {
          id: Math.random() * (1000 - 100) + 100,
          description: content,
          user: {
            id: props.userId,
            img: props.imgUserPro,
            fullName: props.userName,
            verification: props.verification,
          },
        },
      ]);
      props.publicComentario(true);
      return;
    }
    setAlert({message: 'Escribe Algo', status: 'error'});
  };
  return (
    <div className='p-4 mt-0 max-md:p-2 max-md:pt-0'>
      <div className='mt-2 mb-2'>
        <DivPerfil className='items-center'>
          <FotoPerfil
            className='h-[30px] w-[30px]'
            img={props.imgUserPro}
            connect={props.connect}></FotoPerfil>
          <DivAñadirComentar>
            <div className='min-w-[200px] max-w-full '>
              <p
                onInput={handleInput}
                suppressContentEditableWarning={true}
                contentEditable={true}
                className={`outline-none w-full p-2 border-[1px] dark:border-[#ddd] border-[#616161] rounded-md dark:focus:bg-[#363636] focus:border-white focus:bg-[#ddd] text-secundary dark:text-primary ${
                  !content
                    ? 'before:text-secundary dark:before:text-primary  before:content-["Añadir_un_comentario"]'
                    : ''
                } `}>
                {!content ? '' : null}
              </p>
            </div>
            <BottonSendComentario onClick={handleComment}>
              <SendComentPubli />
            </BottonSendComentario>
          </DivAñadirComentar>
        </DivPerfil>
      </div>
      <div>
        {dataComentariosAll?.length > 0
          ? dataComentariosAll.map((e) => {
              return (
                <TemplateComment
                  key={e.id}
                  userId={e.user.id}
                  imgUser={e.user.img}
                  userName={e.user.id == props.userId ? 'Tú' : e.user.fullName}
                  description={e.description}
                  createdAt={e.createdAt}
                  verification={e.user.verification}
                />
              );
            })
          : null}
      </div>
      {alert && (
        <NotificationToastStatus
          message={alert.message}
          status={alert.status}
          close={() => setAlert(false)}
        />
      )}
    </div>
  );
}
