import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdWork } from 'react-icons/md';
import Image from 'next/image';
import Link from 'next/link';

const projects = [
  {
    title: 'Portfolio',
    description: 'Sitio web personal con proyectos',
    link: 'https://brunoken.vercel.app/',
    tags: ['Next.js', 'Tailwind', 'React.js', 'TypeScript', 'Contentful'],
  },
  {
    title: 'Servicio de Desarrollo Web',
    description:
      'Ofrecemos creación de Landing Pages personalizadas y optimizadas para impulsar tu presencia en línea.',
    link: 'https://innovaxweb.vercel.app/',
    tags: ['Next.js', 'Tailwind', 'TypeScript', 'React.js'],
  },
  {
    title: 'Tienda Alli',
    description:
      'Plataforma en línea para comprar mochilas, cartucheras y más, desarrollada con tecnologías modernas.',
    link: 'https://tienda-alli.vercel.app/',
    tags: [
      'React',
      'Next.js',
      'Airtable',
      'AlgoliaSearch',
      'Recoil',
      'Swiper',
      'SWR',
      'React-PDF',
      'TypeScript',
    ],
  },
];

export function Span() {
  return (
    <div className='min-w-[250px] max-w-[20%]  text-center  max-md:hidden'>
      <div className='sticky top-20 overflow-auto mb-20'>
        <div className='w-full max-w-md mx-auto space-y-6 '>
          <div className='bg-primary dark:bg-darkComponet rounded-xl  space-y-4 pb-4 pt-4 pr-2 pl-2'>
            <div className='flex flex-col items-center gap-4 text-center'>
              <div className='relative'>
                <Image
                  src='/brunoken.webp'
                  alt='Bruno ken'
                  width={120}
                  height={120}
                  className='rounded-full border-2 border-zinc-700'
                />
                <span className='absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-zinc-900' />
              </div>
              <div className='space-y-2'>
                <h3 className='text-2xl font-medium dark:text-primary text-secundary'>Bruno ken</h3>
                <p className='text-sm dark:text-primary text-secundary'>Software Developer</p>
              </div>
            </div>
            <div className='flex justify-center gap-3'>
              <Link
                href='https://github.com/brunoken22'
                className='p-2 rounded-lg bg-hoverPrimary dark:bg-zinc-700 hover:opacity-60'>
                <FaGithub className='w-5 h-5 dark:text-primary text-secundary' />
              </Link>
              <Link
                href='https://www.linkedin.com/in/brunoken18/'
                className='p-2 rounded-lg bg-hoverPrimary dark:bg-zinc-700 hover:opacity-60 '>
                <FaLinkedin className='w-5 h-5 dark:text-primary text-secundary' />
              </Link>
            </div>
          </div>

          <div className='rounded-xl '>
            <h3 className='text-lg font-medium dark:text-primary text-secundary mb-4 flex items-center gap-2'>
              <MdWork className='w-5 h-5' />
              Algunos proyectos
            </h3>
            <div className='space-y-4 '>
              {projects.map((project, index) => (
                <Link
                  key={index}
                  href={project.link}
                  className='block p-4 rounded-lg bg-primary dark:bg-darkComponet  hover:opacity-60 transition-colors'>
                  <h4 className='dark:text-primary text-secundary font-medium'>{project.title}</h4>
                  <p className='text-sm text-zinc-400 mt-1'>{project.description}</p>
                  <div className='flex gap-2 mt-2 justify-center items-center flex-wrap'>
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className='px-2 py-1 text-xs rounded-full bg-hoverPrimary dark:bg-zinc-700 dark:text-primary text-secundary'>
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
