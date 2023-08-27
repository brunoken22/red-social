import jwt from 'jsonwebtoken';
import {Publicar, User} from '@/lib/models';
import {cloudinary} from '@/lib/cloudinary';
const secrect = process.env.SECRECT as string;

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
      return 'No hay publicaciones';
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
      return 'No hay publicaciones';
    }
    return publicacion;
  } catch (e) {
    return false;
  }
}
