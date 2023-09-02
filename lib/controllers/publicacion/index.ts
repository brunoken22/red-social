import jwt from 'jsonwebtoken';
import {cloudinary} from '@/lib/cloudinary';
import {conn} from '@/lib/models/conn';
(async () => {
  if (!conn.initialized) {
    await conn.connection();
  }
})();
const secrect = process.env.SECRECT as string;
const Publicar = conn.Publicacion;
const User = conn.User;

type Data = {
  description: string;
  like: number;
  img: string;
  comentarios: any;
  fecha: string;
};

type Token = {
  id: number;
};

export async function createPublicacion(token: string, data: Data) {
  try {
    const tokenData = jwt.verify(token, secrect);
    let imagenUrl;
    if (data.img) {
      imagenUrl = await cloudinary.v2.uploader.upload(data.img, {
        resource_type: 'image',
        discard_original_filename: true,
        format: 'webp',
      });
    }
    const publicacion = await Publicar.create({
      description: data.description,
      like: Number(data.like),
      img: imagenUrl?.secure_url ? imagenUrl.secure_url : '',
      comentarios: data.comentarios,
      fecha: data.fecha,
      userId: (tokenData as Token).id,
    });

    return publicacion;
  } catch (e) {
    return false;
  }
}

export async function getAllPulicacionUser(token: string) {
  try {
    const tokenData = jwt.verify(token, secrect);

    const publicacion = await Publicar.findAll({
      where: {
        userId: (tokenData as Token).id,
      },
    });
    if (!publicacion) {
      return [];
    }
    return publicacion;
  } catch (e) {
    return false;
  }
}

export async function getAllPulicacionRedAmigos(token: string) {
  try {
    const tokenData = jwt.verify(token, secrect);
    const amigosUser = await User.findByPk((tokenData as Token).id);
    const publicacion = await Publicar.findAll({
      where: {
        userId: amigosUser?.get('amigos'),
      },
    });
    if (!publicacion) {
      return [];
    }
    return publicacion;
  } catch (e) {
    return false;
  }
}
