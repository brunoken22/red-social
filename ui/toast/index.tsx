import {useEffect} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FotoPerfil from '../FotoPerfil';
export function NotificationToastUser({
  fullName,
  img,
  close,
}: {
  fullName: string;
  img: string;
  close: () => any;
}) {
  const theme =
    typeof window != undefined
      ? localStorage.getItem('theme') == 'false'
        ? 'light'
        : 'dark'
      : 'light';

  useEffect(() => {
    toast(<Message fullName={fullName} img={img} />, {
      theme: theme,
      autoClose: 3000,
    });
    setTimeout(() => {
      close();
    }, 3000);
  }, []);
  return (
    <div>
      <ToastContainer />
    </div>
  );
}

export function NotificationToastStatus({
  message,
  status,
  close,
}: {
  message: string;
  status: 'info' | 'success' | 'warning' | 'error';
  close: () => any;
}) {
  useEffect(() => {
    const theme =
      typeof window != undefined
        ? localStorage.getItem('theme') == 'false'
          ? 'light'
          : 'dark'
        : 'light';

    toast[status](message, {
      autoClose: 3000,
      theme: theme,
    });
    setTimeout(() => {
      close();
    }, 3000);
  }, []);
  return (
    <div>
      <ToastContainer />
    </div>
  );
}
function Message({fullName, img}: {fullName: string; img: string}) {
  return (
    <div className='flex items-center gap-4'>
      <FotoPerfil img={img} className='' />
      Bienvenido {fullName}
    </div>
  );
}
