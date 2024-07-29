import {SubmitHandler, useForm} from 'react-hook-form';
import {Form} from '@/ui/container';
import {Label} from '@/ui/input';
import React, {useState} from 'react';
import {generateCode, verificateCode} from '@/lib/hook';
import {Loader} from '../loader';
import {NotificationToastStatus} from '@/ui/toast';
type Inputs = {
  code: string;
};
export default function VerificationUser({
  email,
  verification,
}: {
  email: string;
  verification: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    message: string;
    status: 'info' | 'success' | 'warning' | 'error';
  } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors: error},
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (dataInputs) => {
    setIsLoading(true);
    const verificate = await verificateCode(dataInputs.code);
    const {mutate} = await import('swr');
    mutate('/user/token');
    setIsLoading(false);
    if (verificate.error) {
      setMessage({
        message: verificate.message || 'Hubo un error',
        status: 'error',
      });
      return;
    }
    reset();
    setMessage({message: 'Cuenta verificada', status: 'success'});
  };
  const handleGenerateCode = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const data = await generateCode();
    setIsLoading(false);

    if (data.error) {
      setMessage({
        message: data.message || 'Hubo un error',
        status: 'error',
      });
      return;
    }
    setMessage({
      message: 'Revisa en tu correo el codigo proporsionado',
      status: 'success',
    });
  };

  return (
    <div>
      <div>
        <h3 className='text-xl font-semibold'>Verificar</h3>
      </div>
      {!verification ? (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex items-center justify-between max-xl:flex-col max-xl:gap-4'>
            <div>
              <Label htmlFor='password'>Correo de verificación</Label>
              <p className='text-green-600'>{email}</p>
            </div>
            <button
              type='button'
              onClick={handleGenerateCode}
              className='h-full p-4 rounded-xl text-primary bg-cyan-600 hover:opacity-70'>
              Enviar código
            </button>
          </div>
          <div>
            <Label htmlFor='code'>Código</Label>
            <input
              className='w-full h-[2.5rem] rounded-md border-[1px] text-black border-gray-700 indent-3 p-0'
              type='text'
              {...register('code', {required: true})}
              id='code'
            />
            {error.code && (
              <span className='text-red-500 text-[0.8rem]'>
                Se requiere Código
              </span>
            )}
          </div>
          <button
            type='submit'
            className='w-full p-2 bg-light text-primary rounded-md hover:opacity-70'>
            Verificar
          </button>
        </Form>
      ) : (
        <div className='flex items-center flex-col justify-center'>
          <img src='/verify.svg' alt='verify' />
          <span className='text-2xl text-center font-bold'>YA VERIFICADO</span>
        </div>
      )}
      {isLoading ? <Loader /> : null}
      {message ? (
        <NotificationToastStatus
          message={message.message}
          status={message.status}
          close={() => setMessage(null)}
        />
      ) : null}{' '}
    </div>
  );
}
