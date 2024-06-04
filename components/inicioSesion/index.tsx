'use client';
import {useRouter} from 'next/navigation';
import {signinUser} from '@/lib/hook';
import {Loader} from '../loader';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useRecoilState} from 'recoil';
import {user} from '@/lib/atom';
import {useState} from 'react';

type typeForm = {
  email: string;
  password: string;
};
export function Signin() {
  const router = useRouter();
  const [dataUser, setDataUser] = useRecoilState(user);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {errors: error1},
  } = useForm<typeForm>();

  // useEffect(() => {
  //   if (data && data.user == false) {
  //     alert('Contraseña o usuario incorrecto');
  //     return;
  //   }
  //   if (data && data.id) {
  //     router.replace('/home');
  //     console.log(data);
  //   }
  // }, [data]);

  const onSubmit: SubmitHandler<typeForm> = async (dataForm) => {
    setIsLoading(true);
    if (dataForm) {
      const data = await signinUser({
        email: dataForm.email,
        password: dataForm.password,
      });
      setIsLoading(false);

      if (data) {
        setDataUser(data);
        router.push('/home', {scroll: true});
        return;
      }
      alert('Intentalo de nuevo');
    }
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-4 w-full '>
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
        {error1.email && (
          <span className='text-red-500 text-[0.8rem]'>Se requiere Email</span>
        )}
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
        {error1.password && (
          <span className='text-red-500 text-[0.8rem]'>
            Se requiere constraseña
          </span>
        )}
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
