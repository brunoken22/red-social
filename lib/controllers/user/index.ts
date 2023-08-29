import jwt from 'jsonwebtoken';
import {cloudinary} from '@/lib/cloudinary';
import {SolicitudAmistad, User} from '@/lib/models';

const secrect = process.env.SECRECT as string;
type Solicitud = {
  amigoId: 2;
  estado: 'pendiente';
};

type Data = {
  email: string;
  fullName: string;
  img: string;
  amigos: [];
};

type Token = {
  id: number;
};
export async function findOrCreateUser(data: Data) {
  const [user, userCreated] = await User.findOrCreate({
    where: {email: data.email},
    defaults: {
      email: data.email,
      fullName: data.fullName,
    },
  });

  return [user, userCreated];
}
export async function getUser(token: string) {
  try {
    const tokenData = jwt.verify(token, secrect);
    const user = await User.findOne({
      where: {id: (tokenData as Token).id},
    });

    return user;
  } catch (e) {
    return false;
  }
}
export async function modUser(token: string, data: Data) {
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
    const newuser = await User.update(
      {
        email: data.email,
        fullName: data.fullName,
        img: imagenUrl && imagenUrl.secure_url,
      },
      {where: {id: (tokenData as Token).id}}
    );
    return {newuser, img: imagenUrl?.secure_url ? imagenUrl.secure_url : null};
  } catch (e) {
    return false;
  }
}
export async function SolicitudDeAmistad(token: string, data: Solicitud) {
  try {
    const tokenData = jwt.verify(token, secrect);
    const solicitudUser = await SolicitudAmistad.create({
      amigoId: data.amigoId,
      estado: data.estado,
      userId: (tokenData as Token).id,
    });
    const solicitudAmigo = await SolicitudAmistad.create({
      amigoId: (tokenData as Token).id,
      estado: data.estado,
      userId: data.amigoId,
    });
    return solicitudAmigo;
  } catch (e) {
    return false;
  }
}
export async function aceptarSolicitud(token: string, data: Solicitud) {
  try {
    const tokenData = jwt.verify(token, secrect);
    await SolicitudAmistad.update(
      {estado: data.estado},
      {
        where: {
          amigoId: data.amigoId,
          userId: (tokenData as Token).id,
        },
      }
    );

    const user = await User.findByPk((tokenData as Token).id);
    if (user) {
      // await User.update({
      // })
    }

    await SolicitudAmistad.update(
      {estado: data.estado},
      {
        where: {
          amigoId: (tokenData as Token).id,
          userId: data.amigoId,
        },
      }
    );
  } catch (e) {
    return false;
  }
}
export async function eliminarSolicitud(token: string, data: Solicitud) {
  try {
  } catch (e) {
    return false;
  }
}
export async function getAllAmigos(token: string) {
  try {
    const tokenData = jwt.verify(token, secrect);
    const user = await User.findByPk((tokenData as Token).id);
    if (user) {
      const amigos = user.get('amigos');
      if (amigos) {
        return amigos;
      }
      return 'Sin amigos';
    }
  } catch (e) {
    return false;
  }
}
