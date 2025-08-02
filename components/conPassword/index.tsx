import dynamic from 'next/dynamic';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Form } from '@/ui/container';
import { Input, Label } from '@/ui/input';
import { useState } from 'react';
import { modificarUser } from '@/lib/hook';

type Inputs = {
  password: string;
  repassword: string;
};

function validarPassword(con1: string, con2: string) {
  if (con1 === con2) return true;
  return false;
}

const Loader = dynamic(() => import('../loader').then((mod) => mod.Loader));
const NotificationToastStatus = dynamic(() =>
  import('@/ui/toast').then((mod) => mod.NotificationToastStatus)
);

export function Password() {
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<
    { message: string; status: 'success' | 'error' | 'info' | 'warning' } | false
  >(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: error1 },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (dataInputs) => {
    console.log(dataInputs);
    setIsLoading(true);
    const validar = validarPassword(dataInputs.password, dataInputs.repassword);
    if (validar) {
      const dataMod = await modificarUser({
        password: dataInputs.password || '',
      });
      setIsLoading(false);
      if (dataMod) {
        reset();
        setAlert({ message: 'Se modifico correctamente', status: 'success' });
        return;
      }
      setAlert({
        message: 'Hubo algun problema, intentalo de nuevo',
        status: 'error',
      });

      return;
    }
    setIsLoading(false);

    setAlert({
      message: 'La contraseña no coinciden',
      status: 'error',
    });
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <div>
        <h3 className='text-xl font-semibold'>Contraseña</h3>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label htmlFor='password'>Nueva contraseña</Label>
          <input
            className='w-full h-[2.5rem] rounded-md border-[1px] text-black border-gray-700 indent-3 p-0'
            type='password'
            id='password'
            {...register('password', { required: true })}
            autoComplete='new-password'
          />
          {error1.password && (
            <span className='text-red-500 text-[0.8rem]'>Se requiere constraseña</span>
          )}
        </div>
        <div>
          <Label htmlFor='repassword'>Repetir contraseña</Label>
          <input
            className='w-full h-[2.5rem] rounded-md border-[1px] text-black border-gray-700 indent-3 p-0'
            type='password'
            id='repassword'
            {...register('repassword', { required: true })}
            autoComplete='current-password'
          />
          {error1.repassword && (
            <span className='text-red-500 text-[0.8rem]'>Se requiere repetir contraseña</span>
          )}
        </div>

        <button
          type='submit'
          className='w-full p-2 bg-light text-primary rounded-md hover:opacity-70'>
          Modificar
        </button>
      </Form>
      {alert && (
        <NotificationToastStatus
          message={alert.message}
          status={alert.status}
          close={() => setAlert(false)}
        />
      )}
    </div>
  );
}
