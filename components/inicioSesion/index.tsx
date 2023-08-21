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
  const {data, isLoading} = SigninUser(dataUser);
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

  if (data?.auth == false) {
    alert('Contraseña o usuario incorrecto');
  }
  if (data?.auth.id) {
    localStorage.setItem('token', data.token);
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
