import React from 'react';
import LightGallery from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import lgFullScreen from 'lightgallery/plugins/fullscreen';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-fullscreen.css';

export default function GalleryServiceId({ images = [], isOne = false }: { images: string[]; isOne?: boolean }) {
  const firstThreeImages = images.slice(0, 3);

  return (
    <LightGallery plugins={[lgThumbnail, lgZoom, lgFullScreen]} selector='.gallery-item' licenseKey='D4194FDD-48924833-A54AECA3-D6F8E646' zoomFromOrigin={false} exThumbImage='data-external-thumb-image' onInit={() => console.log('LightGallery Initialized')}>
      <div className='grid grid-cols-12 gap-2 pr-1 pl-1'>
        {/* Una sola imagen */}
        {firstThreeImages.length === 1 && (
          <div className='col-span-12 overflow-hidden'>
            <a href={firstThreeImages[0]} data-external-thumb-image={firstThreeImages[0]} data-sub-html={`<h6 class='text-sm text-light'>Imagen única</h6>`} className='gallery-item hover:opacity-70 hover:scale-105 overflow-hidden hover:ease-in duration-300'>
              <img src={firstThreeImages[0]} alt='Image 1' className='rounded-lg object-cover w-full h-full' />
            </a>
          </div>
        )}

        {/* Dos imágenes */}
        {firstThreeImages.length === 2 && (
          <>
            <div className='col-span-12 md:col-span-6 overflow-hidden'>
              <a href={firstThreeImages[0]} data-external-thumb-image={firstThreeImages[0]} data-sub-html={`<h6 class='text-sm text-light'>Imagen 1</h6>`} className='gallery-item hover:opacity-70 hover:scale-105 overflow-hidden hover:ease-in duration-300'>
                <img src={firstThreeImages[0]} alt='Image 1' className='rounded-lg object-cover w-full h-full' />
              </a>
            </div>
            <div className='col-span-12 md:col-span-6 overflow-hidden max-md:h-[150px]'>
              <a href={firstThreeImages[1]} data-external-thumb-image={firstThreeImages[1]} data-sub-html={`<h6 class='text-sm text-light'>Imagen 2</h6>`} className='gallery-item hover:opacity-70 hover:scale-105 overflow-hidden hover:ease-in duration-300'>
                <img src={firstThreeImages[1]} alt='Image 2' className='rounded-lg object-cover w-full h-full' />
              </a>
            </div>
          </>
        )}

        {/* Tres imágenes */}
        {firstThreeImages.length === 3 && (
          <>
            <div className='col-span-12 md:col-span-8 overflow-hidden'>
              <a href={firstThreeImages[0]} data-external-thumb-image={firstThreeImages[0]} data-sub-html={`<h6 class='text-sm text-light'>Imagen 1</h6>`} className='gallery-item hover:opacity-70 hover:scale-105 overflow-hidden hover:ease-in duration-300'>
                <img src={firstThreeImages[0]} alt='Image 1' className='rounded-lg object-cover w-full h-full' />
              </a>
            </div>
            <div className='col-span-12 md:col-span-4 flex flex-row gap-2 md:flex-col overflow-hidden max-md:h-[150px]'>
              <a href={firstThreeImages[1]} data-external-thumb-image={firstThreeImages[1]} className='gallery-item hover:opacity-70 flex-1 hover:scale-105 overflow-hidden hover:ease-in duration-300'>
                <img src={firstThreeImages[1]} alt='Image 2' className='rounded-lg object-cover w-full h-full' />
              </a>
              <a href={firstThreeImages[2]} data-external-thumb-image={firstThreeImages[2]} className='gallery-item hover:opacity-70 flex-1 hover:scale-105 overflow-hidden hover:ease-in duration-300'>
                <img src={firstThreeImages[2]} alt='Image 3' className='rounded-lg object-cover w-full h-full' />
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
