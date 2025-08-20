import { compressAccurately, EImageType, filetoDataURL } from "image-conversion";

// Función optimizada para comprimir archivos
const compressFiles = async (files: File[]): Promise<File[]> => {
  const compressionPromises = files.map(async (file) => {
    try {
      if (file.type.startsWith("image/")) {
        return await compressImage(file);
      } else if (file.type.startsWith("video/")) {
        return await handleVideo(file);
      }
      return file;
    } catch (error) {
      console.error(`Error comprimiendo ${file.name}:`, error);
      return file;
    }
  });

  return await Promise.all(compressionPromises);
};

// Compresión de imágenes con image-conversion (CORREGIDO)
const compressImage = async (file: File): Promise<File> => {
  try {
    // Comprimir a máximo 500KB con alta calidad
    const compressedBlob = await compressAccurately(file, {
      size: 500, // KB
      accuracy: 0.9,
      type: EImageType.JPEG, // Usar EImageType en lugar de string
      width: 1920,
      height: 1920,
    });

    // Convertir Blob a File
    return new File([compressedBlob], file.name, {
      type: "image/jpeg",
      lastModified: Date.now(),
    });
  } catch (error) {
    console.error("Error comprimiendo imagen:", error);
    return file;
  }
};

// Manejo de videos (sin compresión, solo validación)
const handleVideo = async (videoFile: File): Promise<File> => {
  // Validar tamaño máximo de video
  const MAX_VIDEO_SIZE = 10 * 1024 * 1024; // 10MB

  if (videoFile.size > MAX_VIDEO_SIZE) {
    // Crear miniatura del video si es muy grande
    return await createVideoThumbnail(videoFile);
  }

  return videoFile;
};

// Crear miniatura de video como fallback (CORREGIDO)
const createVideoThumbnail = async (videoFile: File): Promise<File> => {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    const url = URL.createObjectURL(videoFile);

    video.src = url;
    video.addEventListener("loadeddata", () => {
      video.currentTime = 1; // Tomar frame en el segundo 1
    });

    video.addEventListener("seeked", async () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        async (blob) => {
          if (blob) {
            try {
              // Comprimir la miniatura
              const compressedBlob = await compressAccurately(
                new File([blob], "thumbnail.jpg", { type: "image/jpeg", lastModified: Date.now() }),
                { size: 300, accuracy: 0.8 }
              );

              // Convertir Blob a File
              const compressedFile = new File(
                [compressedBlob],
                `${videoFile.name.split(".")[0]}_thumbnail.jpg`,
                { type: "image/jpeg", lastModified: Date.now() }
              );

              resolve(compressedFile);
            } catch (error) {
              console.error("Error comprimiendo miniatura:", error);
              resolve(videoFile);
            }
          } else {
            resolve(videoFile);
          }
        },
        "image/jpeg",
        0.7
      );

      URL.revokeObjectURL(url);
    });

    video.addEventListener("error", () => {
      URL.revokeObjectURL(url);
      resolve(videoFile);
    });
  });
};
export { compressFiles };
