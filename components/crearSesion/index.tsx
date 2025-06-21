'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CreateUser } from '@/lib/hook';
import { NotificationToastStatus } from '@/ui/toast';
import { signIn } from 'next-auth/react';

type FormSignup = {
  fullName: string;
  email: string;
  password: string;
  repassword: string;
};

export function Signup() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSignup>();

  const onSubmit: SubmitHandler<FormSignup> = async (FormData) => {
    setIsLoading(true);
    if (FormData.repassword !== FormData.password) {
      setIsLoading(false);
      setError('Las contraseñas no coinciden');
      return;
    }

    const { fullName, email, password } = FormData;
    const response = await signIn('credentials', {
      email,
      password,
      fullName,
      signup: 'true',
      redirect: false,
    });
    if (response.error) {
      setIsLoading(false);
      setError(response.code || 'Error al registrarse');
    } else {
      router.push('/inicio');
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full max-w-md mx-auto mt-10 p-6 bg-white dark:bg-darkComponet rounded-2xl shadow-lg space-y-6'>
        <div>
          <label
            htmlFor='fullName'
            className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
            Nombre <span className='text-red-500'>*</span>
          </label>
          <input
            id='fullName'
            type='text'
            autoComplete='name'
            disabled={isLoading}
            placeholder='Bruno Ken'
            {...register('fullName', { required: true })}
            className='mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary dark:bg-darkComponet dark:text-white'
          />
          {errors.fullName && <p className='text-sm text-red-500 mt-1'>Se requiere nombre</p>}
        </div>

        <div>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
            Email <span className='text-red-500'>*</span>
          </label>
          <input
            id='email'
            type='email'
            autoComplete='email'
            disabled={isLoading}
            placeholder='bruno_am_22@hotmail.com'
            {...register('email', { required: true })}
            className='mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white'
          />
          {errors.email && <p className='text-sm text-red-500 mt-1'>Se requiere email</p>}
        </div>

        <div>
          <label
            htmlFor='password'
            className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
            Contraseña <span className='text-red-500'>*</span>
          </label>
          <input
            id='password'
            type='password'
            autoComplete='new-password'
            disabled={isLoading}
            placeholder='••••••••'
            {...register('password', { required: true })}
            className='mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white'
          />
          {errors.password && <p className='text-sm text-red-500 mt-1'>Se requiere contraseña</p>}
        </div>

        <div>
          <label
            htmlFor='repassword'
            className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
            Repetir Contraseña <span className='text-red-500'>*</span>
          </label>
          <input
            id='repassword'
            type='password'
            autoComplete='new-password'
            disabled={isLoading}
            placeholder='••••••••'
            {...register('repassword', { required: true })}
            className='mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white'
          />
          {errors.repassword && <p className='text-sm text-red-500 mt-1'>Repite la contraseña</p>}
        </div>

        <div>
          <button
            type='submit'
            disabled={isLoading}
            className='w-full flex justify-center items-center gap-2 py-3 rounded-xl bg-light text-white hover:opacity-90 transition disabled:opacity-60'>
            {isLoading ? (
              <>
                <span className='h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin'></span>
                Registrando...
              </>
            ) : (
              'Registrarse'
            )}
          </button>
        </div>
      </form>

      {isError && (
        <NotificationToastStatus close={() => setError('')} message={isError} status='error' />
      )}
    </>
  );
}
