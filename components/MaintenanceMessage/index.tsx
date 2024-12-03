import { RiSettings4Line, RiTimeLine } from 'react-icons/ri';

export default function MaintenanceMessage() {
  return (
    <div className=' flex items-center justify-center'>
      <div className='bg-black bg-opacity-50 p-8 rounded-2xl shadow-2xl backdrop-blur-md max-w-md w-full text-center'>
        <div className='relative mb-8'>
          <RiSettings4Line className='text-primary text-6xl mx-auto animate-spin-slow' />
          <RiTimeLine className='text-primary text-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />
        </div>
        <h1 className='text-3xl font-bold text-white mb-4'>Sistema en Mantenimiento</h1>
        <p className='text-primary mb-6'>Estamos actualizando nuestros sistemas para ofrecerte una experiencia aún mejor. Volveremos pronto con nuevas funcionalidades.</p>
        <div className='w-full bg-blue-900 h-2 rounded-full overflow-hidden'>
          <div className='bg-primary h-full rounded-full animate-pulse' style={{ width: '60%' }}></div>
        </div>
        <p className='text-sm text-primary mt-4'>Tiempo estimado: Indefinido</p>
      </div>
    </div>
  );
}
