import {useForm} from 'react-hook-form';
import {Form} from '@/ui/container';
import {Label, Input} from '@/ui/input';
import {BotonForm} from '@/ui/boton';
import {Span} from './styled';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {SigninUser} from '@/lib/hook';
import {Loader} from '../loader';

export function Signin() {
  const [dataUser, setDataUser] = useState({
    email: '',
    password: '',
  });
  const {data, isLoading} = SigninUser(dataUser);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: {errors: error1},
  } = useForm();

  useEffect(() => {
    if (data && !data?.user) {
      alert('Contraseña o usuario incorrecto');
      return;
    }
    if (data?.token) {
      if (data?.token) {
        localStorage.setItem('token', data?.token);
      }
      router.push('/home');
    }
  }, [data]);

  const onSubmit = (data: any) => {
    if (data) {
      setDataUser({
        email: data.email,
        password: data.password,
      });
    }
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label htmlFor='email'>
          Email <Span>*</Span>
        </Label>
        <Input
          type='email'
          id='email'
          {...register('email', {required: true})}
          autoComplete='email'
        />
      </div>
      <div>
        <Label htmlFor='password'>
          Contraseña <Span>*</Span>
        </Label>
        <Input
          type='password'
          id='password'
          {...register('password', {required: true})}
          autoComplete='password'
        />

        {error1.email && <span>This field is required</span>}
      </div>
      <div style={{textAlign: 'center'}}>
        {' '}
        <BotonForm type='submit'>Continuar</BotonForm>
      </div>{' '}
    </Form>
  );
}
