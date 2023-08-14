import {useForm} from 'react-hook-form';
import {Form} from '@/ui/container';
import {Label, Input} from '@/ui/input';

export function Signup() {
  const {
    register: registerForm1,
    handleSubmit: handleSubmitForm1,
    formState: {errors: error1},
  } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <Form onSubmit={handleSubmitForm1(onSubmit)}>
      <div>
        <Label htmlFor='name'>Nombre: </Label>
        <Input
          type='text'
          defaultValue='test'
          {...(registerForm1('name'), {required: true})}
          id='name'
        />
      </div>
      <div>
        <Label htmlFor='email'>Email: </Label>
        <Input
          type='text'
          defaultValue='test'
          {...(registerForm1('email'), {required: true})}
          id='email'
        />
      </div>
      <div>
        <Label htmlFor='password'>Contraseña</Label>
        <Input
          type='password'
          {...registerForm1('password', {required: true})}
          id='password'
        />
      </div>
      <div>
        {' '}
        <Label htmlFor='repassword'>RepetirContraseña</Label>
        <Input
          type='password'
          {...registerForm1('repassword', {required: true})}
          id='repassword'
        />
      </div>
      {error1.exampleRequired && <span>This field is required</span>}

      <Input type='submit' />
    </Form>
  );
}
