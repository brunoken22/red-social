import {SubmitHandler, useForm} from 'react-hook-form';
import {Form} from '@/ui/container';
import {Input, Label} from '@/ui/input';
import React, {useState} from 'react';
import {generateCode, verificateCode} from '@/lib/hook';
import {Loader} from '../loader';
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

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors: error},
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (dataInputs) => {
    setIsLoading(true);
    const verificate = await verificateCode(dataInputs.code);
    setIsLoading(false);
    if (verificate) {
      reset();
      alert('Se modifico correctamente');
      return;
    }

    alert('Hubo algun problema, intentalo de nuevo');
  };
  const handleGenerateCode = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const data = await generateCode();
    setIsLoading(false);

    if (data) {
      alert('Revisa en tu correo el codigo proporsionado');
      return;
    }
    alert('Intenta con otro código');
  };

  return (
    <div>
      <div>
        <h3 className='text-xl font-semibold'>Verificar</h3>
      </div>
      {verification ? (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex items-center justify-between max-xl:flex-col max-xl:gap-4'>
            <div>
              <Label htmlFor='password'>Correo de verificación</Label>
              <p className='text-green-600'>{email}</p>
            </div>
            <button
              type='button'
              onClick={handleGenerateCode}
              className='h-full p-4 rounded-xl bg-cyan-600 hover:opacity-70'>
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
            className='w-full p-2 bg-secundary text-primary rounded-md hover:opacity-70'>
            Verificar
          </button>
        </Form>
      ) : (
        <div>
          <span className='text-2xl text-center font-bold'>YA VERIFICADO</span>
        </div>
      )}
      {isLoading ? <Loader /> : null}
    </div>
  );
}
