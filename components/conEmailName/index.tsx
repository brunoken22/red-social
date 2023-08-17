import {DivEmailName} from './styled';
import {useForm} from 'react-hook-form';
import {Form} from '@/ui/container';
import {Input, Label} from '@/ui/input';
import {BotonForm} from '@/ui/boton';
export function EmailYName() {
  const {
    register,
    handleSubmit,
    formState: {errors: error1},
  } = useForm();
  const onSubmit = (data: any) => {};
  return (
    <DivEmailName>
      <div>
        <h3>Email y Nombre</h3>
      </div>
      <div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor='name'>Nombre</Label>
            <Input
              type='text'
              {...register('name', {required: true})}
              id='name'
              value={'Allison Lucia'}
            />
          </div>
          <div>
            <Label htmlFor='email'>Email</Label>
            <Input
              type='email'
              {...register('email', {required: true})}
              id='email'
              value={'bruno_am_22@hotmail.com'}
            />
          </div>
          {error1.exampleRequired && <span>This field is required</span>}

          <div style={{textAlign: 'center'}}>
            <BotonForm type='submit'>Modificar</BotonForm>
          </div>
        </Form>
      </div>
    </DivEmailName>
  );
}
