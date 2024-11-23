'use client';
import dynamic from 'next/dynamic';
import { signinUser } from '@/lib/hook';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
type typeForm = {
  email: string;
  password: string;
};

const NotificationToastStatus = dynamic(() => import('@/ui/toast').then((mod) => mod.NotificationToastStatus));

export default function Signin() {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors: error1 },
  } = useForm<typeForm>();

  const onSubmit: SubmitHandler<typeForm> = async (dataForm) => {
    setIsLoading(true);

    if (dataForm) {
      const data = await signinUser({
        email: dataForm.email,
        password: dataForm.password,
      });
      if (data) {
        push('/inicio');
        return;
      }
      setIsLoading(false);
      setError(true);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 w-full mt-4 mb-4'>
        <div>
          <label className='block' htmlFor='email'>
            Email <span className='text-[#f57888]'>*</span>
          </label>
          <input className='w-full h-12 rounded-xl border-[1px] border-[#ddd] indent-2 p-2 dark:text-secundary' type='email' id='email' {...register('email', { required: true })} placeholder='UniRed@gmail.com' autoComplete='email ' disabled={isLoading} />
          {error1.email && <span className='text-red-500 text-[0.8rem]'>Se requiere Email</span>}
        </div>
        <div>
          <label className='block' htmlFor='password'>
            Contraseña <span className='text-[#f57888]'>*</span>
          </label>
          <input className='w-full h-12 rounded-xl border-[1px] border-[#ddd] indent-2 p-2 dark:text-secundary' type='password' id='password' {...register('password', { required: true })} placeholder='**********' autoComplete='one-time-code' disabled={isLoading} />
          {error1.password && <span className='text-red-500 text-[0.8rem]'>Se requiere constraseña</span>}
        </div>
        <div className='mt-6'>
          {!isLoading ? (
            <button type='submit' className='w-full p-2 bg-light text-primary rounded-md hover:opacity-70'>
              Continuar
            </button>
          ) : (
            <button type='button' disabled className='w-full p-2 bg-light text-primary rounded-md opacity-70'>
              Cargando...
            </button>
          )}
        </div>
      </form>
      {isError ? <NotificationToastStatus close={() => setError(false)} message='Contraseña o email incorrecto' status='error' /> : null}
    </>
  );
}
