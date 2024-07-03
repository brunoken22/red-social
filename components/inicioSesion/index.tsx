'use client';
import {signinUser} from '@/lib/hook';
import {Loader} from '../loader';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useState} from 'react';
import {NotificationToastStatus, NotificationToastUser} from '@/ui/toast';
import {useRouter} from 'next/navigation';

type typeForm = {
  email: string;
  password: string;
};
export function Signin() {
  const {push} = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [isData, setData] = useState<any>();

  const {
    register,
    handleSubmit,
    formState: {errors: error1},
  } = useForm<typeForm>();

  const onSubmit: SubmitHandler<typeForm> = async (dataForm) => {
    setIsLoading(true);
    if (dataForm) {
      const data = await signinUser({
        email: dataForm.email,
        password: dataForm.password,
      });
      setIsLoading(false);
      if (data && data.id) {
        setData(data);
        setTimeout(() => {
          push('/home');
        }, 3500);
        // window.location.href = window.location.origin + '/home';
        return;
      }
      setError(true);
    }
  };
  if (isLoading) {
    return <Loader />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-4 w-full '>
      <div>
        <label className='block' htmlFor='email'>
          Email <span className='text-[#f57888]'>*</span>
        </label>
        <input
          className='w-full h-12 rounded-xl border-[1px] border-[#ddd] indent-2 p-2 dark:text-secundary'
          type='email'
          id='email'
          {...register('email', {required: true})}
          placeholder='UniRed@gmail.com'
          autoComplete='on'
        />
        {error1.email && (
          <span className='text-red-500 text-[0.8rem]'>Se requiere Email</span>
        )}
      </div>
      <div>
        <label className='block' htmlFor='password'>
          Contraseña <span className='text-[#f57888]'>*</span>
        </label>
        <input
          className='w-full h-12 rounded-xl border-[1px] border-[#ddd] indent-2 p-2 dark:text-secundary'
          type='password'
          id='password'
          {...register('password', {required: true})}
          placeholder='**********'
          autoComplete='on'
        />
        {error1.password && (
          <span className='text-red-500 text-[0.8rem]'>
            Se requiere constraseña
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
      {isData && isData.id ? (
        <NotificationToastUser
          close={() => setData(null)}
          fullName={isData.fullName}
          img={isData.img}></NotificationToastUser>
      ) : null}
      {isError ? (
        <NotificationToastStatus
          close={() => setError(false)}
          message='Contraseña o email incorrecto'
          status='error'
        />
      ) : null}
    </form>
  );
}
