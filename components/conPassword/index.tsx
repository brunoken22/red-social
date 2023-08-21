import {BotonForm} from '@/ui/boton';
import {DivEmailName} from './styled';
import {useForm} from 'react-hook-form';
import {Form} from '@/ui/container';
import {Input, Label} from '@/ui/input';
import {useState} from 'react';
import {ModificarUser} from '@/lib/hook';

function ValidarPassword(con1: string, con2: string) {
  if (con1 === con2) return true;
  return false;
}

export function Password() {
  const [newData, setNewData] = useState({
    token: '',
    data: {
      password: '',
    },
  });
  const {data, isLoading} = ModificarUser(newData.data, newData.token);
  const {
    register,
    handleSubmit,
    formState: {errors: error1},
  } = useForm();

  const onSubmit = (data: any) => {
    const validar = ValidarPassword(data.password, data.repassword);
    if (validar) {
      setNewData({
        token: localStorage.getItem('token') as string,
        data: {
          password: data?.password,
        },
      });
    }
  };
  if (data) {
    alert('Cambiado');
  }
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
          <Label htmlFor='repassword'>Repetir contraseña</Label>
          <Input
            type='password'
            {...register('repassword', {required: true})}
            id='repassword'
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
