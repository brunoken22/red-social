'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { CreateUser } from '@/lib/hook';
import { useState } from 'react';
import { NotificationToastStatus } from '@/ui/toast';

type FormSignup = { fullName: string; email: string; password: string; repassword: string };

export function Signup() {
  const router = useRouter();

  const [isError, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors: error },
  } = useForm<FormSignup>();

  const onSubmit: SubmitHandler<FormSignup> = async (data) => {
    setIsLoading(true);
    if (data) {
      if (data.repassword === data.password) {
        const newDataUser = {
          fullName: data.fullName,
          email: data.email,
          password: data.password,
        };
        const dataResponse = await CreateUser(newDataUser);
        if (dataResponse === 'Usuario Registrado') {
          setIsLoading(false);
          setError('Este usuario ya existe');
        } else if (dataResponse?.user?.id) {
          router.push('/inicio');
        }
        return;
      }
      setIsLoading(false);
      setError('La contraseña no coinciden');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 w-full mt-4 mb-4'>
        <div>
          <label className='block' htmlFor='fullName'>
            Nombre <span className='text-[#f57888]'>*</span>
          </label>
          <input className='w-full h-12 rounded-xl border-[1px] border-[#ddd] indent-2 p-2 dark:text-secundary' type='text' {...register('fullName', { required: true })} id='fullName' placeholder='UniRed' autoComplete='username' disabled={isLoading} />
          {error.fullName && <span className='text-red-500 text-[0.8rem]'>Se requiere nombre</span>}
        </div>
        <div>
          <label className='block' htmlFor='email'>
            Email <span className='text-[#f57888]'>*</span>
          </label>
          <input className='w-full h-12 rounded-xl border-[1px] border-[#ddd] indent-2 p-2 dark:text-secundary' type='email' {...register('email', { required: true })} id='email' placeholder='Unired@unired.com' autoComplete='email' disabled={isLoading} />
          {error.email && <span className='text-red-500 text-[0.8rem]'>Se requiere email</span>}
        </div>
        <div>
          <label className='block' htmlFor='password'>
            Contraseña <span className='text-[#f57888]'>*</span>
          </label>
          <input className='w-full h-12 rounded-xl border-[1px] border-[#ddd] indent-2 p-2  dark:text-secundary' type='password' {...register('password', { required: true })} id='password' placeholder='********' autoComplete='new-password' disabled={isLoading} />
          {error.password && <span className='text-red-500 text-[0.8rem]'>Se requiere contraseña</span>}
        </div>
        <div>
          {' '}
          <label className='block' htmlFor='repassword'>
            Repetir Contraseña <span className='text-[#f57888]'>*</span>
          </label>
          <input className='w-full h-12 rounded-xl border-[1px] border-[#ddd] indent-2 p-2  dark:text-secundary' type='password' {...register('repassword', { required: true })} id='repassword' placeholder='********' autoComplete='current-password' disabled={isLoading} />
          {error.repassword && <span className='text-red-500 text-[0.8rem]'>Se requiere repetir contraseña</span>}
        </div>
        <div className='mt-6'>
          {!isLoading ? (
            <button type='submit' className='w-full p-2 bg-light text-primary rounded-md hover:opacity-70'>
              Continuar
            </button>
          ) : (
            <button type='button' disabled className='w-full p-2 bg-light text-primary opacity-70'>
              Cargando ...
            </button>
          )}
        </div>
      </form>
      {isError ? <NotificationToastStatus close={() => setError('')} message={isError} status='error' /> : null}
    </>
  );
}
