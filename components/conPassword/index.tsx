import {SubmitHandler, useForm} from 'react-hook-form';
import {Form} from '@/ui/container';
import {Input, Label} from '@/ui/input';
import {useState} from 'react';
import {modificarUser} from '@/lib/hook';
import {Loader} from '../loader';
type Inputs = {
  password: string;
  repassword: string;
};

function validarPassword(con1: string, con2: string) {
  if (con1 === con2) return true;
  return false;
}

export function Password() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors: error1},
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (dataInputs) => {
    setIsLoading(true);
    const validar = validarPassword(dataInputs.password, dataInputs.repassword);
    if (validar) {
      const dataMod = await modificarUser({
        password: dataInputs.password || '',
      });
      setIsLoading(false);
      if (dataMod) {
        reset();

        alert('Se modifico correctamente');
        return;
      }
      alert('Hubo algun problema, intentalo de nuevo');
      return;
    }
    setIsLoading(false);
    alert('La contraseña no coinciden');
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
          <Input
            type='password'
            id='password'
            {...register('password', {required: true})}
            autoComplete='new-password'
          />
          {error1.password && (
            <span className='text-red-500 text-[0.8rem]'>
              Se requiere constraseña
            </span>
          )}
        </div>
        <div>
          <Label htmlFor='repassword'>Repetir contraseña</Label>
          <Input
            type='password'
            {...register('repassword', {required: true})}
            id='repassword'
            autoComplete='current-password'
          />
          {error1.repassword && (
            <span className='text-red-500 text-[0.8rem]'>
              Se requiere repetir contraseña
            </span>
          )}
        </div>

        <button
          type='submit'
          className='w-full p-2 bg-secundary text-primary rounded-md hover:opacity-70'>
          Modificar
        </button>
      </Form>
    </div>
  );
}
