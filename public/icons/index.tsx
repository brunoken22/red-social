import React, { memo } from "react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaPhotoVideo } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { MdDelete } from "react-icons/md";

// Interface para las props
interface ImageSVGProps {
  setDataUrl: React.Dispatch<React.SetStateAction<File[]>>;
  dataUrl: File[];
}

const ImageSVG = memo(({ setDataUrl, dataUrl }: ImageSVGProps) => {
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

  const handleRemove = useCallback(
    (index: number) => {
      setDataUrl((prev) => prev.filter((_, i) => i !== index));
    },
    [setDataUrl]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".webp"],
      "video/*": [".mp4", ".webm", ".mov"],
    },
    multiple: true,
    maxFiles: 3,
    maxSize: 25 * 1024 * 1024,
  });
  return (
    <>
      <section className='flex items-center justify-center flex-col'>
        {dataUrl?.length < 3 && (
          <div
            {...getRootProps()}
            className='p-4 max-md:p-2 cursor-pointer flex items-center flex-col w-full hover:opacity-70'
          >
            <input {...getInputProps()} />
            <FaPhotoVideo size={"4rem"} className='text-light' />
            <p className='opacity-80 max-md:text-[0.9rem]'>
              <strong>Agregar Fotos o Videos</strong> <br />o Arrastra y suelta
            </p>
          </div>
        )}

        {dataUrl.length > 0 && (
          <div className='w-full space-y-2'>
            {dataUrl.map((file, index) => {
              const previewUrl = URL.createObjectURL(file);
              const isVideo = file.type.startsWith("video/");

              return (
                <div key={`${file.name}-${index}`} className='relative group w-full h-28'>
                  {isVideo ? (
                    <>
                      <video
                        src={previewUrl}
                        controls={false}
                        className='p-2 w-full h-28 object-cover'
                        muted
                        loop
                      />
                      <div className='absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs'>
                        Video
                      </div>
                    </>
                  ) : (
                    <img
                      src={previewUrl}
                      alt='preview'
                      height={150}
                      className='p-2 w-full h-28 object-cover'
                    />
                  )}

                  <div className='absolute inset-0 flex items-center justify-center bg-black/50 bg-opacity-0 group-hover:bg-black/90 transition-all duration-300'>
                    <button
                      onClick={() => {
                        URL.revokeObjectURL(previewUrl);
                        handleRemove(index);
                      }}
                      className='p-2 text-red-500 bg-white bg-opacity-75 rounded transition-opacity duration-300 opacity-0 group-hover:opacity-100 flex items-center'
                    >
                      <MdDelete />
                      Eliminar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
      {isLoading && <div>Cargando...</div>}
    </>
  );
});

export function SendComentPubli() {
  return <IoMdSend size={20} />;
}
export { ImageSVG };
