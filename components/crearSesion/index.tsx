import {useForm} from 'react-hook-form';
import {Form} from '@/ui/container';
import {Label, Input} from '@/ui/input';
import {BotonForm} from '@/ui/boton';
import {Span} from '../inicioSesion/styled';
import {useRouter} from 'next/navigation';
export function Signup() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: {errors: error1},
  } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
    if (data) {
      router.push('/perfil');
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label htmlFor='name'>
          Nombre <Span>*</Span>
        </Label>
        <Input type='text' {...register('name', {required: true})} id='name' />
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
