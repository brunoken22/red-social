import {User} from '@/lib/models';
import jwt from 'jsonwebtoken';
import {cloudinary} from '@/lib/cloudinary';

const secrect = process.env.SECRECT as string;

type Data = {
  email: string;
  fullName: string;
  img: string;
  amigos: [];
};
type DataAmigo = {
  amigoId: number;
  mod: boolean;
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
      });
    }
    const user = await User.update(
      {
        email: data.email,
        fullName: data.fullName,
        img: imagenUrl ? imagenUrl.secure_url : '',
      },
      {where: {id: (tokenData as Token).id}}
    );
    return user;
  } catch (e) {
    return false;
  }
}
export async function modAmigos(token: string, data: DataAmigo) {
  try {
    const tokenData = jwt.verify(token, secrect);
    if (data.mod) {
      const user: any = await User.findByPk((tokenData as Token).id);
      if (user) {
        const amigosUser = user.get('amigos');
        if (amigosUser?.length > 0) {
          const updatedAmigos = [...user.get('amigos')];
          if (updatedAmigos.indexOf(Number(data.amigoId)) !== -1)
            return 'Ya existe este Id';
          updatedAmigos.push(Number(data.amigoId));
          const userResult = await User.update(
            {
              amigos: updatedAmigos,
            },
            {where: {id: (tokenData as Token).id}}
          );

          return userResult;
        }

        const userResult = await User.update(
          {
            amigos: [Number(data.amigoId)],
          },
          {where: {id: (tokenData as Token).id}}
        );
        return userResult;
      }
    }
    const user: any = await User.findByPk((tokenData as Token).id);
    const updatedAmigos = [...user.get('amigos')];
    const indiceAmigo = updatedAmigos.indexOf(Number(data.amigoId));
    if (indiceAmigo !== -1) {
      updatedAmigos.splice(indiceAmigo, 1);
      const userResult = await User.update(
        {
          amigos: updatedAmigos,
        },
        {where: {id: (tokenData as Token).id}}
      );
      return userResult;
    }
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
