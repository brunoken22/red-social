import {cookies} from 'next/headers';
export default function Signin() {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  console.log(token);

  // useEffect(() => {
  //   if (data && !data?.user) {
  //     alert('Contraseña o usuario incorrecto');
  //     return;
  //   }
  //   if (data?.token) {
  //     if (data?.token) {
  //       localStorage.setItem('token', data?.token);
  //     }
  //     router.push('/home');
  //   }
  // }, [data]);

  // fetch((process.env.NEXT_PUBLIC_PORT as string) + '/api/signin', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   credentials: 'include',
  //   body: JSON.stringify({
  //     email: 'bruno.am.59@gmail.com',
  //     password: '1234',
  //   }),
  // }).then((response) => {
  //   response.json().then((data) => console.log(data));
  // });
  // if (isLoading) {
  //   return <Loader />;
  // }
  return <div>hola</div>;
  // return (
  //   <form onSubmit={onSubmit} className='flex flex-col gap-4 w-full '>
  //     {/* {data && !data?.user && (
  //       <div style={{color: '#ff4444', textAlign: 'center'}}>
  //         Datos incorrectos
  //       </div>
  //     )} */}
  //     <div>
  //       <label className='block' htmlFor='email'>
  //         Email <span className='text-[#f57888]'>*</span>
  //       </label>
  //       <input
  //         className='w-full h-12 rounded-xl border-[1px] border-[#ddd] indent-2 p-2'
  //         type='email'
  //         id='email'
  //         placeholder='UniRed@gmail.com'
  //         autoComplete='email'
  //       />
  //     </div>
  //     <div>
  //       <label className='block' htmlFor='password'>
  //         Contraseña <span className='text-[#f57888]'>*</span>
  //       </label>
  //       <input
  //         className='w-full h-12 rounded-xl border-[1px] border-[#ddd] indent-2 p-2'
  //         type='password'
  //         id='password'
  //         placeholder='**********'
  //         autoComplete='password'
  //       />
  //     </div>
  //     <div className='mt-6'>
  //       <button
  //         type='submit'
  //         className='w-full p-2 bg-secundary text-primary rounded-md hover:opacity-70'>
  //         Continuar
  //       </button>
  //     </div>{' '}
  //   </form>
  // );
}
