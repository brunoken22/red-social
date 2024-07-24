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
    const text = event.target.value;
    setContent(text);
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
              <textarea
                id='description'
                rows={1}
                maxLength={1000}
                placeholder={`Añadir un comentario`}
                className='w-full bg-transparent rounded-md outline outline-1 outline-gray-400 focus:outline-gray-600 dark:focus:outline-gray-100  p-2  overflow-auto  resize-none '
                required={true}
                value={content}
                onChange={handleInput}></textarea>
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
