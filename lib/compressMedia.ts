import { compressAccurately, EImageType } from "image-conversion";

// Función optimizada para comprimir archivos
const compressFiles = async (files: File[]): Promise<File[]> => {
  const compressionPromises = files.map(async (file) => {
    try {
      if (file.type.startsWith("image/")) {
        return await compressImage(file);
      } else if (file.type.startsWith("video/")) {
        return await handleVideo(file); // Ahora mantiene el video
      }
      return file;
    } catch (error) {
      // console.error(`Error procesando ${file.name}:`, error);
      return file;
    }
  });

  return await Promise.all(compressionPromises);
};

// Compresión de imágenes (igual)
const compressImage = async (file: File): Promise<File> => {
  try {
    const compressedBlob = await compressAccurately(file, {
      size: 500,
      accuracy: 0.9,
      type: EImageType.JPEG,
      width: 1920,
      height: 1920,
    });

    return new File([compressedBlob], file.name, {
      type: "image/jpeg",
      lastModified: Date.now(),
    });
  } catch (error) {
    console.error("Error comprimiendo imagen:", error);
    return file;
  }
};

// NUEVA: Manejo de videos (mantiene como video)
const handleVideo = async (videoFile: File): Promise<File> => {
  const MAX_VIDEO_SIZE = 30 * 1024 * 1024; // 30MB

  // Si el video es menor al límite, dejarlo como está
  if (videoFile.size <= MAX_VIDEO_SIZE) {
    return videoFile;
  }

  // Si es muy grande, mostrar advertencia y no subirlo
  console.warn(
    `Video demasiado grande: ${videoFile.name} (${(videoFile.size / 1024 / 1024).toFixed(1)}MB)`
  );

  // Opción 1: Lanzar error para manejarlo en el UI
  throw new Error(`El video ${videoFile.name} es demasiado grande. Máximo permitido: 30MB`);

  // Opción 2: Devolver null y filtrar después
  // return null as unknown as File; // Luego filtrar los null
};

export { compressFiles };
