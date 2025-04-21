import dynamic from 'next/dynamic';
import { useCallback, useState } from 'react';
import Dropzone from 'react-dropzone';
import { MdDelete } from 'react-icons/md';

const LoaderComponent = dynamic(() =>
  import('@/components/loader').then((mod) => mod.LoaderComponent)
);

export function ImageSVG({
  setDataUrl,
  dataUrl,
}: {
  setDataUrl: React.Dispatch<React.SetStateAction<File[]>>;
  dataUrl: File[];
}) {
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setIsLoading(true);
        setDataUrl((prev) => [...prev, ...acceptedFiles.slice(0, 3 - prev.length)]);
        setIsLoading(false);
      }
    },
    [setDataUrl]
  );

  const handleRemove = (index: number) => {
    setDataUrl((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <Dropzone
        onDrop={onDrop}
        accept={{
          'image/png': [],
          'image/jpeg': [],
          'image/jpg': [],
          'image/webp': [],
        }}
        multiple={true}
        maxFiles={3}
        maxSize={30 * 1024 * 1024}>
        {({ getRootProps, getInputProps }) => (
          <section className='flex items-center justify-center flex-col'>
            {dataUrl?.length < 3 ? (
              <div
                {...getRootProps()}
                className='p-4 max-md:p-2 cursor-pointer flex items-center flex-col w-full hover:opacity-70'>
                <input {...getInputProps()} />
                <svg
                  className='w-[70px] max-md:w-[30px]'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 512 512'>
                  <path
                    fill='#2196F3'
                    d='M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z'
                  />
                </svg>
                <p className='opacity-80 max-md:text-[0.9rem]'>
                  <strong>Agregar Foto</strong> <br />o Arrastra y suelta
                </p>
              </div>
            ) : null}

            {dataUrl.length
              ? dataUrl.map((file, index) => {
                  const previewUrl = URL.createObjectURL(file);

                  return (
                    <div key={index} className='relative group w-full h-28'>
                      <img
                        src={previewUrl}
                        alt='preview'
                        className='p-2 w-full h-28 object-cover'
                      />
                      <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300'>
                        <button
                          onClick={() => {
                            URL.revokeObjectURL(previewUrl); // liberamos memoria
                            handleRemove(index);
                          }}
                          className='p-2 text-red-500 bg-white bg-opacity-75 rounded transition-opacity duration-300 opacity-0 group-hover:opacity-100 flex items-center'>
                          <MdDelete />
                          Eliminar
                        </button>
                      </div>
                    </div>
                  );
                })
              : null}
          </section>
        )}
      </Dropzone>
      {isLoading && <LoaderComponent />}
    </>
  );
}
