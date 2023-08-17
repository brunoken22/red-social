import {BotonForm} from '@/ui/boton';
import {DivEmailName} from './styled';
import {useForm} from 'react-hook-form';
import {Form} from '@/ui/container';
import {Input, Label} from '@/ui/input';

export function Password() {
  const {
    register,
    handleSubmit,
    formState: {errors: error1},
  } = useForm();
  const onSubmit = (data: any) => {};
  return (
    <DivEmailName>
      <div>
        <h3>Password</h3>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label htmlFor='password'>Nueva contraseña</Label>
          <Input
            type='password'
            {...register('password', {required: true})}
            id='password'
          />
        </div>
        <div>
          <Label htmlFor='password'>Repetir contraseña</Label>
          <Input
            type='password'
            {...register('password', {required: true})}
            id='password  '
          />
        </div>
        {error1.exampleRequired && <span>This field is required</span>}

        <div style={{textAlign: 'center'}}>
          {' '}
          <BotonForm type='submit'>Modificar</BotonForm>
        </div>
      </Form>
    </DivEmailName>
  );
}
