import {DivEmailName} from './styled';
import {useForm} from 'react-hook-form';
import {Form} from '@/ui/container';
import {Input, Label} from '@/ui/input';
import {BotonForm} from '@/ui/boton';
import {ModificarUser} from '@/lib/hook';
import {useEffect, useState} from 'react';
import {user} from '@/lib/atom';
import {useRecoilState} from 'recoil';

export function EmailYName() {
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
  const [userData, setUserData] = useRecoilState(user);

  const onSubmit = (data: any) => {
    setNewData({
      token: localStorage.getItem('token') as string,
      data: {
        fullName: data?.fullName,
        email: data?.email,
      },
    });
  };
  useEffect(() => {
    if (data) {
      alert('Modificado');
      setNewData({
        token: '',
        data: {
          fullName: '',
          email: '',
        },
      });
    }
  }, [data]);
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
              value={userData.user.fullName}
              onChange={(e: any) =>
                setUserData({
                  ...userData,
                  user: {
                    ...userData.user,
                    fullName: e.target.value || '', // Asegúrate de manejar el caso de valor falsy
                  },
                })
              }
            />
          </div>
          <div>
            <Label htmlFor='email'>Email</Label>
            <Input
              type='email'
              {...register('email', {required: true})}
              id='email'
              value={userData.user.email}
              onChange={(e: any) =>
                setUserData({
                  ...userData,
                  user: {
                    ...userData.user,
                    email: e.target.value || '', // Asegúrate de manejar el caso de valor falsy
                  },
                })
              }
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
