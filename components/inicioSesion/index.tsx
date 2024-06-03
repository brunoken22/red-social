'use client';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {SigninUser} from '@/lib/hook';
import {Loader} from '../loader';
import {useForm} from 'react-hook-form';

export function Signin() {
  const router = useRouter();
  const [dataUser, setDataUser] = useState({
    email: '',
    password: '',
  });
  const {data, isLoading} = SigninUser(dataUser);

  const {
    register,
    handleSubmit,
    formState: {errors: error1},
  } = useForm();

  useEffect(() => {
    if (data && data.user == false) {
      alert('Contraseña o usuario incorrecto');
      return;
    }
    if (data && data.id) {
      console.log(data);
      router.push('/home');
    }
  }, [data]);

  const onSubmit = (data: any) => {
    if (data) {
      setDataUser({
        email: data.email,
        password: data.password,
      });
    }
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-4 w-full '>
      {data && !data?.id && (
        <div style={{color: '#ff4444', textAlign: 'center'}}>
          Datos incorrectos
        </div>
      )}
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
          autoComplete='email'
        />
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
          autoComplete='password'
        />

        {error1.email && <span>This field is required</span>}
      </div>
      <div className='mt-6'>
        <button
          type='submit'
          className='w-full p-2 bg-secundary text-primary rounded-md hover:opacity-70'>
          Continuar
        </button>
      </div>{' '}
    </form>
  );
}
