import {DivEmailName} from './styled';
import {useForm} from 'react-hook-form';
import {Form} from '@/ui/container';
import {Input, Label} from '@/ui/input';
import {BotonForm} from '@/ui/boton';
import {ModificarUser} from '@/lib/hook';
import {useState} from 'react';
import {useRecoilValue} from 'recoil';
import {user} from '@/lib/atom';

export function EmailYName() {
  const dataValor = useRecoilValue(user);
  const [fullName, setFullName] = useState(dataValor?.user?.fullName);
  const [email, setEmail] = useState(dataValor?.user?.email);
  const [newData, setNewData] = useState({
    token: '',
    data: {
      fullName: '',
      email: '',
    },
  });

  const {data} = ModificarUser(newData.data, newData.token);
  const {
    register,
    handleSubmit,
    formState: {errors: error1},
  } = useForm();
  const onSubmit = (data: any) => {
    setNewData({
      token: localStorage.getItem('token') as string,
      data: {
        fullName: data?.fullName,
        email: data?.email,
      },
    });
  };
  if (data) {
    alert('Modificado');
  }
  return (
    <DivEmailName>
      <div>
        <h3>Email y Nombre</h3>
      </div>
      <div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor='fullName'>Nombre</Label>
            <Input
              type='text'
              {...register('fullName', {required: true})}
              id='fullName'
              value={fullName}
              onChange={(e: any) => setFullName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor='email'>Email</Label>
            <Input
              type='email'
              {...register('email', {required: true})}
              id='email'
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
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
