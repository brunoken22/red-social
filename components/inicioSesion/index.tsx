'use client';

import dynamic from 'next/dynamic';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';

type FormData = {
  email: string;
  password: string;
};

const NotificationToastStatus = dynamic(() =>
  import('@/ui/toast').then((mod) => mod.NotificationToastStatus)
);

export default function Signin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [isError, setError] = useState(false);
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    setIsLoading(true);
    const { signinUser } = await import('@/lib/hook');

    const result = await signinUser(formData);
    if (result) {
      router.push('/inicio');
    } else {
      setError(true);
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setGoogleLoading(true);
    signIn('google');
  };

  const handleGoogleSession = useCallback(async () => {
    if (session?.user?.email && session?.user?.name && !googleLoading) {
      setGoogleLoading(true);
      const { CreateOrLoginGoogle } = await import('@/lib/hook');
      const result = await CreateOrLoginGoogle({
        email: session.user.email,
        fullName: session.user.name,
        accessToken: session.accessToken,
      });

      if (result) router.push('/inicio');
      else setGoogleLoading(false);
    }
  }, [session, router]);

  useEffect(() => {
    handleGoogleSession();
  }, [handleGoogleSession]);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg space-y-6'>
        <button
          type='button'
          onClick={handleGoogleLogin}
          disabled={googleLoading}
          className='w-full flex items-center justify-center gap-3 bg-white text-black border border-gray-300 px-4 py-3 rounded-lg shadow hover:bg-gray-100 transition disabled:opacity-60'>
          {googleLoading ? (
            <>
              <span className='h-5 w-5 border-2 border-black border-t-transparent rounded-full animate-spin'></span>
              Conectando...
            </>
          ) : (
            <>
              <FcGoogle className='text-2xl' />
              Iniciar sesión con Google
            </>
          )}
        </button>

        <div>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
            Email <span className='text-red-500'>*</span>
          </label>
          <input
            id='email'
            type='email'
            placeholder='ejemplo@correo.com'
            autoComplete='email'
            disabled={isLoading || googleLoading}
            {...register('email', { required: true })}
            className='mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white'
          />
          {errors.email && <p className='text-sm text-red-500 mt-1'>Se requiere Email</p>}
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
            placeholder='••••••••'
            autoComplete='current-password'
            disabled={isLoading || googleLoading}
            {...register('password', { required: true })}
            className='mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white'
          />
          {errors.password && <p className='text-sm text-red-500 mt-1'>Se requiere contraseña</p>}
        </div>

        <div>
          <button
            type='submit'
            disabled={isLoading || googleLoading}
            className='w-full flex justify-center items-center gap-2 py-3 rounded-xl bg-light text-white hover:opacity-90 transition disabled:opacity-60'>
            {isLoading ? (
              <>
                <span className='h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin'></span>
                Cargando...
              </>
            ) : (
              'Continuar'
            )}
          </button>
        </div>
      </form>

      {isError && (
        <NotificationToastStatus
          close={() => setError(false)}
          message='Email o contraseña incorrectos'
          status='error'
        />
      )}
    </>
  );
}
