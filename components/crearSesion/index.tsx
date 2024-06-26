'use client';
import {useForm} from 'react-hook-form';
import {useRouter} from 'next/navigation';
import {CreateUser} from '@/lib/hook';
import {useEffect, useState} from 'react';
import {Loader} from '../loader';

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
  const {data, isLoading} = CreateUser(dataUser);

  const {
    register,
    handleSubmit,
    formState: {errors: error1},
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
      }
    }
  };

  useEffect(() => {
    if (data == 'Usuario Registrado') {
      alert('Usuario Registrado');
      return;
    }
    if (data?.user?.id) {
      setDataUser({
        fullName: '',
        email: '',
        password: '',
      });
      alert('Usuario registrado con exito');
      router.push('/home');
    }
  }, [data]);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-4 w-full '>
      <div>
        <label className='block' htmlFor='fullName'>
          Nombre <span className='text-[#f57888]'>*</span>
        </label>
        <input
          className='w-full h-12 rounded-xl border-[1px] border-[#ddd] indent-2 p-2 dark:text-secundary'
          type='text'
          {...register('fullName', {required: true})}
          id='fullName'
          autoComplete='on'
        />
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
          autoComplete='on'
        />
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
          autoComplete='on'
        />
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
          autoComplete='on'
        />
      </div>
      {error1.exampleRequired && <span>This field is required</span>}

      <div className='mt-6'>
        <button
          type='submit'
          className='w-full p-2 bg-secundary text-primary rounded-md hover:opacity-70'>
          Continuar
        </button>
      </div>
    </form>
  );
}
