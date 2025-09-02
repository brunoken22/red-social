import React, { useState, useEffect } from "react";
import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgFullScreen from "lightgallery/plugins/fullscreen";
import lgVideo from "lightgallery/plugins/video";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-fullscreen.css";
import "lightgallery/css/lg-video.css";
import { FaPlay } from "react-icons/fa";
import { Media } from "@/lib/atom";

export default function GalleryMedia({ media = [] }: { media: Media[] }) {
  const firstThreeMedia = media.slice(0, 3);
  const [videoThumbnails, setVideoThumbnails] = useState<Record<string, string>>({});

  // Función para generar miniaturas de videos locales
  const generateVideoThumbnail = (videoUrl: string): Promise<string> => {
    return new Promise((resolve) => {
      const video = document.createElement("video");
      const canvas = document.createElement("canvas");
      video.src = videoUrl;
      video.crossOrigin = "anonymous";
      video.addEventListener("loadedmetadata", () => {
        video.currentTime = 0.5; // Capturar frame a medio segundo
      });
      video.addEventListener("seeked", () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL("image/jpeg"));
        } else {
          resolve("");
        }
      });
      video.addEventListener("error", () => {
        resolve(""); // Fallback si hay error
      });
    });
  };

  // Efecto para generar miniaturas de videos
  useEffect(() => {
    const generateThumbnails = async () => {
      const thumbnails: Record<string, string> = {};

      for (const item of media) {
        if (item.type === "video" && !item.url.includes("youtube") && !item.url.includes("vimeo")) {
          try {
            const thumbnail = await generateVideoThumbnail(item.url);
            if (thumbnail) {
              thumbnails[item.url] = thumbnail;
            }
          } catch (error) {
            console.error("Error generating thumbnail for", item.url, error);
          }
        }
      }

      setVideoThumbnails(thumbnails);
    };

    generateThumbnails();
  }, [media]);

  const renderMediaItem = (item: Media, index: number) => {
    const isVideo = item.type === "video";
    const thumbnailUrl = isVideo
      ? videoThumbnails[item.url] || getCloudinaryThumbnail(item.url)
      : item.url;

    return (
      <a
        key={`${item.url}-${index}`}
        href={item.url}
        data-src={item.url}
        data-thumb={thumbnailUrl}
        data-iframe={isVideo ? "true" : undefined}
        data-sub-html={`<h6 class="text-sm text-primary">${isVideo ? "Video" : "Imagen"} ${
          index + 1
        }</h6>`}
        className={`gallery-item block w-full h-full group relative hover:opacity-70 overflow-hidden transition-all duration-300 ${
          isVideo ? "lg-video-item" : ""
        }`}
        data-poster={isVideo ? thumbnailUrl : undefined}
      >
        <div className='w-full h-full relative'>
          {isVideo ? (
            <>
              {thumbnailUrl ? (
                <img
                  src={thumbnailUrl}
                  alt={`Video thumbnail ${index + 1}`}
                  className='rounded-lg object-cover w-full h-full'
                  title={`Video thumbnail ${index + 1}`}
                />
              ) : (
                <div className='rounded-lg bg-gray-800 w-full h-full flex items-center justify-center'>
                  <FaPlay className='text-white text-4xl' />
                </div>
              )}
              <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-all'>
                <div className='bg-white bg-opacity-80 p-3 rounded-full'>
                  <FaPlay className='text-light text-lg' />
                </div>
              </div>
            </>
          ) : (
            <img
              src={item.url}
              alt={`Media ${index + 1}`}
              className='rounded-lg object-cover w-full h-full'
              loading='lazy'
              title={`Media ${index + 1}`}
            />
          )}
        </div>
      </a>
    );
  };

  return (
    <div className='w-full'>
      <LightGallery
        plugins={[lgThumbnail, lgZoom, lgFullScreen, lgVideo]}
        selector='.gallery-item'
        licenseKey='D4194FDD-48924833-A54AECA3-D6F8E646'
        zoomFromOrigin={false}
        videojs={true}
        addClass='lg-video-container'
        mode='lg-fade'
        fullScreen={true}
        autoplayVideoOnSlide={true}
        loadYouTubeThumbnail={false}
        thumbnail={true}
        mobileSettings={{
          controls: true,
          showCloseIcon: true,
          download: true,
          rotate: false,
          share: false,
        }}
      >
        <div className='grid grid-cols-12 gap-2 px-1 w-full'>
          {firstThreeMedia.length === 1 && (
            <div className='col-span-12 h-full max-h-[500px]'>
              {renderMediaItem(firstThreeMedia[0], 0)}
            </div>
          )}

          {firstThreeMedia.length === 2 && (
            <>
              <div className='col-span-12 md:col-span-6 h-full'>
                {renderMediaItem(firstThreeMedia[0], 0)}
              </div>
              <div className='col-span-12 md:col-span-6 h-full'>
                {renderMediaItem(firstThreeMedia[1], 1)}
              </div>
            </>
          )}

          {firstThreeMedia.length === 3 && (
            <>
              <div className='col-span-12 md:col-span-8 h-full'>
                {renderMediaItem(firstThreeMedia[0], 0)}
              </div>
              <div className='col-span-12 md:col-span-4 flex flex-col gap-2 h-full'>
                <div className='flex-1 h-full'>{renderMediaItem(firstThreeMedia[1], 1)}</div>
                <div className='flex-1 h-full'>{renderMediaItem(firstThreeMedia[2], 2)}</div>
              </div>
            </>
          )}
        </div>
      </LightGallery>
    </div>
  );
}

// Función específica para Cloudinary
function getCloudinaryThumbnail(videoUrl: string): string {
  if (videoUrl.includes("res.cloudinary.com/video/upload")) {
    // Reemplaza el formato de video por una imagen jpg
    return videoUrl.replace(/\.mp4|\.webm|\.mov/, ".jpg") + "?_a=BAJ";
  }
  return "";
}
