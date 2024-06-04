import {useForm, SubmitHandler} from 'react-hook-form';
import {Form} from '@/ui/container';
import {Input, Label} from '@/ui/input';
import {modificarUser} from '@/lib/hook';
import {useEffect, useState} from 'react';
import {user} from '@/lib/atom';
import {useRecoilValue} from 'recoil';
import {Loader} from '../loader';

type Inputs = {
  fullName: string;
  email: string;
};

export function EmailYName() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {errors: error1},
  } = useForm<Inputs>();
  const userData = useRecoilValue(user);

  const onSubmit: SubmitHandler<Inputs> = async (dataInputs) => {
    setIsLoading(true);
    const dataMod = await modificarUser({
      fullName: dataInputs.fullName || userData.user.fullName,
      email: dataInputs.email || userData.user.email,
    });
    setIsLoading(false);

    if (dataMod) {
      alert('Se modifico correctamente');
      return;
    }
    alert('Hubo algun problema, intentalo de nuevo');
    return;
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <div>
        <h3>Email y Nombre</h3>
      </div>
      <div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor='fullName'>Nombre</Label>
            <input
              {...register('fullName', {required: true})}
              defaultValue={userData?.user?.fullName}
              className='w-full h-[2.5rem] rounded-md border-[1px] text-black border-gray-700 indent-3 p-0'
              autoComplete='current-password'
            />
            {error1.fullName && (
              <span className='text-red-500 text-[0.8rem]'>
                Se requiere Nombre
              </span>
            )}
          </div>
          <div>
            <Label htmlFor='email'>Email</Label>
            <input
              {...register('email', {required: true})}
              type='email'
              defaultValue={userData?.user?.email}
              className='w-full h-[2.5rem] rounded-md border-[1px] text-black border-gray-700 indent-3 p-0'
              autoComplete='current-password'
            />
            {error1.email && (
              <span className='text-red-500 text-[0.8rem]'>
                Se requiere email
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
    </div>
  );
}
