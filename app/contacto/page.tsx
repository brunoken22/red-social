'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';
import { SkeletonNav } from '@/ui/skeleton';
import { useRecoilValue } from 'recoil';
import { user } from '@/lib/atom';

const Header = dynamic(() => import('@/components/header'), { loading: () => <SkeletonNav /> });

type TypeContactForm = {
  name: string;
  email: string;
  message: string;
};

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TypeContactForm>();
  const dataUser = useRecoilValue(user);

  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  useEffect(() => {
    const lastSubmission = localStorage.getItem('lastSubmission');
    if (lastSubmission) {
      const lastSubmissionDate = new Date(lastSubmission);
      const now = new Date();
      const oneHourInMilliseconds = 60 * 60 * 1000;

      const timeDiff = now.getTime() - lastSubmissionDate.getTime();
      if (timeDiff < oneHourInMilliseconds) {
        setTimeRemaining(oneHourInMilliseconds - timeDiff);
      }
    }
  }, []);

  const onSubmit = async (data: TypeContactForm) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_PORT}/contact/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`Error en el servidor: ${response.statusText}`);
      }

      localStorage.setItem('lastSubmission', new Date().toISOString());
      reset();
      setTimeRemaining(60 * 60 * 1000); // Inicia el temporizador de 1 hora
    } catch (error) {
      alert('Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  useEffect(() => {
    if (timeRemaining !== null) {
      const interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev === null || prev <= 1000) {
            clearInterval(interval);
            return null;
          }
          return prev - 1000;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timeRemaining]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes} min ${seconds} seg`;
  };

  return (
    <div className='flex flex-col justify-between'>
      <main className='h-full bg-transparent dark:bg-dark py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md mx-auto bg-primary dark:bg-darkComponet rounded-lg shadow-md overflow-hidden md:max-w-2xl'>
          <div className='md:flex'>
            <div className='p-8 w-full'>
              <div className='uppercase tracking-wide text-sm text-light font-semibold mb-1'>
                Contacto
              </div>
              <h1 className='block mt-1 text-3xl leading-tight font-bold text-secundary dark:text-primary mb-6'>
                UniRed
              </h1>
              <p className='mt-2 text-secundary dark:text-primary mb-6'>
                ¿Tienes alguna pregunta, sugerencia o simplemente quieres saludar? Nos encantaría
                saber de ti.
              </p>

              {timeRemaining !== null ? (
                <div className='mb-8 p-4 text-yellow-700 bg-yellow-100 border border-yellow-400 rounded'>
                  Ya has enviado un mensaje. Podrás enviar otro en {formatTime(timeRemaining)}.
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                  <div>
                    <label
                      htmlFor='name'
                      className='block text-sm font-medium text-secundary dark:text-primary'>
                      Nombre
                    </label>
                    <input
                      type='text'
                      placeholder='Bruno Ken'
                      defaultValue={dataUser?.user.fullName}
                      id='name'
                      {...register('name', { required: 'El nombre es obligatorio' })}
                      className={`mt-1 pt-2 pb-2 indent-1 block w-full rounded-md border-gray-300 shadow-sm bg-primary dark:bg-darkComponetLight ${
                        errors.name ? 'border-red-500' : ''
                      }`}
                      aria-invalid={errors.name ? 'true' : 'false'}
                    />
                    {errors.name && (
                      <p className='mt-1 text-sm text-red-500'>{String(errors.name.message)}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor='email'
                      className='block text-sm font-medium text-secundary dark:text-primary'>
                      Correo electrónico
                    </label>
                    <input
                      type='email'
                      id='email'
                      defaultValue={dataUser?.user.email}
                      placeholder='bruno_am_22@hotmail.com'
                      {...register('email', {
                        required: 'El correo electrónico es obligatorio',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Por favor, ingresa un correo electrónico válido',
                        },
                      })}
                      className={`mt-1 pt-2 pb-2 indent-1 block w-full rounded-md border-gray-300 shadow-sm bg-primary dark:bg-darkComponetLight ${
                        errors.email ? 'border-red-500' : ''
                      }`}
                      aria-invalid={errors.email ? 'true' : 'false'}
                    />
                    {errors.email && (
                      <p className='mt-1 text-sm text-red-500'>{String(errors.email.message)}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor='message'
                      className='block text-sm font-medium text-secundary dark:text-primary'>
                      Mensaje
                    </label>
                    <textarea
                      id='message'
                      {...register('message', { required: 'El mensaje no puede estar vacío' })}
                      rows={4}
                      placeholder='Escribe tu mensaje aquí...'
                      minLength={20}
                      maxLength={1500}
                      className={`mt-1 pt-2 pb-2 indent-1 block w-full rounded-md border-gray-300 shadow-sm bg-primary dark:bg-darkComponetLight ${
                        errors.message ? 'border-red-500' : ''
                      }`}
                      aria-invalid={errors.message ? 'true' : 'false'}></textarea>
                    {errors.message && (
                      <p className='mt-1 text-sm text-red-500'>{String(errors.message.message)}</p>
                    )}
                  </div>

                  <div>
                    <button
                      type='submit'
                      className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary hover:opacity-60  bg-light  focus:outline-none focus:ring-2 focus:ring-offset-2'>
                      Enviar mensaje
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
