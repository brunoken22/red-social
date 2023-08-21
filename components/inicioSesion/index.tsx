import {useForm} from 'react-hook-form';
import {Form} from '@/ui/container';
import {Label, Input} from '@/ui/input';
import {BotonForm} from '@/ui/boton';
import {Span} from './styled';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import {SigninUser} from '@/lib/hook';

export function Signin() {
  const [dataUser, setDataUser] = useState({
    email: '',
    password: '',
  });
  const {userData, isLoading} = SigninUser(dataUser);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: {errors: error1},
  } = useForm();

  const onSubmit = (data: any) => {
    if (data) {
      setDataUser({
        email: data.email,
        password: data.password,
      });
    }
  };

  if (userData?.token == '') {
    alert('Contraseña o usuario incorrecto');
  }
  if (userData?.token) {
    localStorage.setItem('token', userData.token);
    router.push('/home');
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
