"use client";

import { useEffect } from "react";
import Head from "next/head";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Error capturado:", error);
  }, [error]);

  return (
    <>
      <Head>
        <title>Error | Unired</title>
      </Head>

      <div className='min-h-screen flex flex-col items-center justify-center  p-4'>
        <div className='w-full max-w-md bg-white dark:bg-darkComponet rounded-lg shadow-lg p-8 text-center'>
          {/* Icono de error */}
          <div className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 mb-4'>
            <svg
              className='h-6 w-6 text-red-600 dark:text-red-400'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </div>

          <h1 className='text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2'>
            ¡Algo salió mal!
          </h1>

          <p className='text-gray-600 dark:text-gray-300 mb-6'>
            {error.message || "Ocurrió un error inesperado"}
          </p>

          {error.digest && (
            <div className='mb-6 p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm text-gray-700 dark:text-gray-300'>
              <p className='font-medium'>Error ID:</p>
              <code className='break-all'>{error.digest}</code>
            </div>
          )}

          <div className='flex flex-col sm:flex-row gap-3 justify-center'>
            <button
              onClick={reset}
              className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
            >
              Intentar de nuevo
            </button>

            <a
              href='/'
              className='px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 text-center'
            >
              Volver al inicio
            </a>
          </div>
        </div>

        {/* Información adicional para desarrollo */}
        {process.env.NODE_ENV === "development" && (
          <div className='mt-8 w-full max-w-3xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4'>
            <h3 className='text-lg font-medium text-red-800 dark:text-red-200 mb-2'>
              Detalles del error (solo desarrollo)
            </h3>
            <pre className='text-sm text-red-700 dark:text-red-300 overflow-x-auto p-2 bg-white dark:bg-gray-900 rounded'>
              {error.stack || "No hay stack trace disponible"}
            </pre>
          </div>
        )}
      </div>
    </>
  );
}
