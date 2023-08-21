import {useForm} from 'react-hook-form';
import {Form} from '@/ui/container';
import {Label, Input} from '@/ui/input';
import {BotonForm} from '@/ui/boton';
import {Span} from '../inicioSesion/styled';
import {useRouter} from 'next/navigation';
import {CreateUser} from '@/lib/hook';
import {useState} from 'react';

function ValidarPassword(con1: string, con2: string) {
  if (con1 === con2) return true;
  return false;
}

export function Signup() {
  const router = useRouter();
  const [dataUser, setDataUser] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const {data, isLoading} = CreateUser(dataUser);

  const {
    register,
    handleSubmit,
    formState: {errors: error1},
  } = useForm();

  const onSubmit = (data: any) => {
    if (data) {
      const validar = ValidarPassword(data.repassword, data.password);
      if (validar) {
        const newDataUser = {
          fullName: data.fullName,
          email: data.email,
          password: data.password,
        };
        setDataUser(newDataUser);
      }
    }
  };
  if (data == 'Usuario Registrado') {
    alert('Usuario registrado');
  }
  if (data?.user?.id) {
    localStorage.setItem('token', data.token);
    router.push('/home');
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label htmlFor='fullName'>
          Nombre <Span>*</Span>
        </Label>
        <Input
          type='text'
          {...register('fullName', {required: true})}
          id='name'
        />
      </div>
      <div>
        <Label htmlFor='email'>
          Email <Span>*</Span>
        </Label>
        <Input
          type='email'
          {...register('email', {required: true})}
          id='email'
        />
      </div>
      <div>
        <Label htmlFor='password'>
          Contraseña <Span>*</Span>
        </Label>
        <Input
          type='password'
          {...register('password', {required: true})}
          id='password'
        />
      </div>
      <div>
        {' '}
        <Label htmlFor='repassword'>
          Repetir Contraseña <Span>*</Span>
        </Label>
        <Input
          type='password'
          {...register('repassword', {required: true})}
          id='repassword'
        />
      </div>
      {error1.exampleRequired && <span>This field is required</span>}

      <div style={{textAlign: 'center'}}>
        {' '}
        <BotonForm type='submit'>Continuar</BotonForm>
      </div>
    </Form>
  );
}
