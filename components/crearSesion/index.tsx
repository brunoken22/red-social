import {useForm} from 'react-hook-form';
export function Signup() {
  const {
    register: registerForm1,
    handleSubmit: handleSubmitForm1,
    formState: {errors: error1},
  } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <div>
      <form onSubmit={handleSubmitForm1(onSubmit)}>
        <label htmlFor='email'>Email: </label>
        <input
          type='text'
          defaultValue='test'
          {...(registerForm1('email'), {required: true})}
          id='email'
        />

        <label htmlFor='password'>Contraseña</label>
        <input
          type='password'
          {...registerForm1('password', {required: true})}
          id='password'
        />
        {error1.exampleRequired && <span>This field is required</span>}

        <input type='submit' />
      </form>
    </div>
  );
}
