'use client';
import {useForm} from 'react-hook-form';
import {useRouter} from 'next/navigation';
import {CreateUser} from '@/lib/hook';
import {useEffect, useState} from 'react';
import {Loader} from '../loader';
import {NotificationToastStatus, NotificationToastUser} from '@/ui/toast';

function validarPassword(con1: string, con2: string) {
  if (con1 === con2) return true;
  return false;
}

export function Signup() {
  const router = useRouter();
  const [dataUser, setDataUser] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [isError, setError] = useState('');
  const {data, isLoading} = CreateUser(dataUser);

  const {
    register,
    handleSubmit,
    formState: {errors: error},
  } = useForm();

  const onSubmit = (data: any) => {
    if (data) {
      const validar = validarPassword(data.repassword, data.password);
      if (validar) {
        const newDataUser = {
          fullName: data.fullName,
          email: data.email,
          password: data.password,
        };
        setDataUser(newDataUser);
        return;
      }
      setError('La contraseña no coinciden');
    }
  };

  useEffect(() => {
    if (data == 'Usuario Registrado') {
      setError('Usuario existente');
      return;
    }
    if (data?.user?.id) {
      setTimeout(() => {
        router.push('/inicio');
      }, 3500);
    }
  }, [data]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-4 w-full mt-4 mb-4'>
      <div>
        <label className='block' htmlFor='fullName'>
          Nombre <span className='text-[#f57888]'>*</span>
        </label>
        <input
          className='w-full h-12 rounded-xl border-[1px] border-[#ddd] indent-2 p-2 dark:text-secundary'
          type='text'
          {...register('fullName', {required: true})}
          id='fullName'
          placeholder='UniRed'
          autoComplete='username'
        />
        {error.fullName && (
          <span className='text-red-500 text-[0.8rem]'>Se requiere nombre</span>
        )}
      </div>
      <div>
        <label className='block' htmlFor='email'>
          Email <span className='text-[#f57888]'>*</span>
        </label>
        <input
          className='w-full h-12 rounded-xl border-[1px] border-[#ddd] indent-2 p-2 dark:text-secundary'
          type='email'
          {...register('email', {required: true})}
          id='email'
          placeholder='Unired@unired.com'
          autoComplete='email'
        />
        {error.email && (
          <span className='text-red-500 text-[0.8rem]'>Se requiere email</span>
        )}
      </div>
      <div>
        <label className='block' htmlFor='password'>
          Contraseña <span className='text-[#f57888]'>*</span>
        </label>
        <input
          className='w-full h-12 rounded-xl border-[1px] border-[#ddd] indent-2 p-2  dark:text-secundary'
          type='password'
          {...register('password', {required: true})}
          id='password'
          placeholder='********'
          autoComplete='new-password'
        />
        {error.password && (
          <span className='text-red-500 text-[0.8rem]'>
            Se requiere contraseña
          </span>
        )}
      </div>
      <div>
        {' '}
        <label className='block' htmlFor='repassword'>
          Repetir Contraseña <span className='text-[#f57888]'>*</span>
        </label>
        <input
          className='w-full h-12 rounded-xl border-[1px] border-[#ddd] indent-2 p-2  dark:text-secundary'
          type='password'
          {...register('repassword', {required: true})}
          id='repassword'
          placeholder='********'
          autoComplete='current-password'
        />
        {error.repassword && (
          <span className='text-red-500 text-[0.8rem]'>
            Se requiere repetir contraseña
          </span>
        )}
      </div>
      <div className='mt-6'>
        <button
          type='submit'
          className='w-full p-2 bg-secundary text-primary rounded-md hover:opacity-70'>
          Continuar
        </button>
      </div>
      {dataUser && data && data.user ? (
        <NotificationToastUser
          close={() => setDataUser({fullName: '', password: '', email: ''})}
          fullName={data.user.fullName}
          img={''}></NotificationToastUser>
      ) : null}
      {isLoading ? <Loader /> : null}
      {isError ? (
        <NotificationToastStatus
          close={() => setError('')}
          message={isError}
          status='error'
        />
      ) : null}
    </form>
  );
}
