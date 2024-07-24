'use client';
import dynamic from 'next/dynamic';
import {signinUser} from '@/lib/hook';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useState} from 'react';
import {useRouter} from 'next/navigation';

type typeForm = {
  email: string;
  password: string;
};

const Loader = dynamic(() => import('../loader').then((mod) => mod.Loader));
const NotificationToastStatus = dynamic(() =>
  import('@/ui/toast').then((mod) => mod.NotificationToastStatus)
);
const NotificationToastUser = dynamic(() =>
  import('@/ui/toast').then((mod) => mod.NotificationToastUser)
);

export default function Signin() {
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
          push('/inicio');
        }, 3500);
        return;
      }
      setError(true);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-4 w-full mt-4 mb-4'>
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
          autoComplete='email '
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
          autoComplete='one-time-code'
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
          className='w-full p-2 bg-light text-primary rounded-md hover:opacity-70'>
          Continuar
        </button>
      </div>
      {isData && isData.id ? (
        <NotificationToastUser
          close={() => setData(null)}
          fullName={isData.fullName}
          img={isData.img}></NotificationToastUser>
      ) : null}
      {isLoading ? <Loader /> : null}
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
