import React from 'react';
import LightGallery from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import lgFullScreen from 'lightgallery/plugins/fullscreen';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-fullscreen.css';

export default function GalleryServiceId({
  images = [],
  isOne = false,
}: {
  images: string[];
  isOne?: boolean;
}) {
  const firstThreeImages = images.slice(0, 3);

  return (
    <LightGallery
      plugins={[lgThumbnail, lgZoom, lgFullScreen]}
      selector='.gallery-item'
      licenseKey='D4194FDD-48924833-A54AECA3-D6F8E646'
      zoomFromOrigin={false}
      exThumbImage='data-external-thumb-image'>
      <div className='grid grid-cols-12 gap-2 pr-1 pl-1'>
        {/* Una sola imagen */}
        {firstThreeImages.length === 1 && (
          <div className='col-span-12 overflow-hidden'>
            <a
              href={firstThreeImages[0]}
              data-external-thumb-image={firstThreeImages[0]}
              data-sub-html={`<h6 class='text-sm text-light'>Imagen única</h6>`}
              className='gallery-item hover:opacity-70 hover:scale-105 overflow-hidden hover:ease-in duration-300'>
              <div className='aspect-w-16 aspect-h-9'>
                <img
                  src={firstThreeImages[0]}
                  alt='Image 1'
                  className='rounded-lg object-cover w-full h-full'
                />
              </div>
            </a>
          </div>
        )}

        {/* Dos imágenes */}
        {firstThreeImages.length === 2 && (
          <>
            <div className='col-span-12 md:col-span-6 overflow-hidden'>
              <a
                href={firstThreeImages[0]}
                data-external-thumb-image={firstThreeImages[0]}
                data-sub-html={`<h6 class='text-sm text-light'>Imagen 1</h6>`}
                className='gallery-item hover:opacity-70 hover:scale-105 overflow-hidden hover:ease-in duration-300'>
                <div className='aspect-w-16 aspect-h-9'>
                  <img
                    src={firstThreeImages[0]}
                    alt='Image 1'
                    className='rounded-lg object-cover w-full h-full'
                  />
                </div>
              </a>
            </div>
            <div className='col-span-12 md:col-span-6 overflow-hidden'>
              <a
                href={firstThreeImages[1]}
                data-external-thumb-image={firstThreeImages[1]}
                data-sub-html={`<h6 class='text-sm text-light'>Imagen 2</h6>`}
                className='gallery-item flex w-full h-full hover:opacity-70 hover:scale-105 overflow-hidden hover:ease-in duration-300'>
                <div className='aspect-w-16 aspect-h-9'>
                  <img
                    src={firstThreeImages[1]}
                    alt='Image 2'
                    className='rounded-lg object-cover w-full h-full'
                  />
                </div>
              </a>
            </div>
          </>
        )}

        {/* Tres imágenes */}
        {firstThreeImages.length === 3 && (
          <>
            <div className='col-span-12 md:col-span-8 overflow-hidden'>
              <a
                href={firstThreeImages[0]}
                data-external-thumb-image={firstThreeImages[0]}
                data-sub-html={`<h6 class='text-sm text-light'>Imagen 1</h6>`}
                className='gallery-item hover:opacity-70 hover:scale-105 overflow-hidden hover:ease-in duration-300'>
                <div className='aspect-w-16 aspect-h-9 h-full'>
                  <img
                    src={firstThreeImages[0]}
                    alt='Image 1'
                    className='rounded-lg object-cover w-full h-full'
                  />
                </div>
              </a>
            </div>
            <div className='max-md:h-[100px] col-span-12 md:col-span-4 flex flex-row gap-2 md:flex-col overflow-hidden'>
              <a
                href={firstThreeImages[1]}
                data-external-thumb-image={firstThreeImages[1]}
                className='gallery-item flex w-full h-full hover:opacity-70 flex-1 hover:scale-105 overflow-hidden hover:ease-in duration-300'>
                <div className='aspect-w-1 aspect-h-1 md:aspect-w-full md:aspect-h-9 w-full '>
                  <img
                    src={firstThreeImages[1]}
                    alt='Image 2'
                    className='rounded-lg object-cover w-full h-full'
                  />
                </div>
              </a>
              <a
                href={firstThreeImages[2]}
                data-external-thumb-image={firstThreeImages[2]}
                className='gallery-item flex w-full h-full hover:opacity-70 flex-1 hover:scale-105 overflow-hidden hover:ease-in duration-300'>
                <div className='aspect-w-1 aspect-h-1 md:aspect-w-full md:aspect-h-9 w-full'>
                  <img
                    src={firstThreeImages[2]}
                    alt='Image 3'
                    className='rounded-lg object-cover w-full h-full'
                  />
                </div>
              </a>
            </div>
          </>
        )}
      </div>
    </LightGallery>
  );
}

{
  /* Slider para las imágenes o videos restantes */
}
{
  /* {remainingMedia.length > 0 && (
          <div className="col-span-12 mt-4">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={10}
              slidesPerView={2}
              breakpoints={{
                640: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 6 },
              }}
              navigation
              pagination={{ clickable: true }}
              className="swiper-container"
            >
              {remainingMedia.map((item, index) => (
                <SwiperSlide key={index}>
                  <a href={item} className="gallery-item">
                    <img
                      src={item}
                      alt={`Media ${index + 4}`}
                      className="rounded-lg object-cover w-full h-full"
                    />
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )} */
}
