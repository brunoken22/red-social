import jwt from 'jsonwebtoken';
import {cloudinary} from '@/lib/cloudinary';
import {SolicitudAmistad, User} from '@/lib/models';
import {Op, Sequelize} from 'sequelize';
import {sequelize} from '@/lib/models/conn';
// const {Pool} = require('pg');

const secrect = process.env.SECRECT as string;

type Solicitud = {
  amigoId: string;
  estado: boolean;
  userId?: number;
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
  // const pool = new Pool();
  // const client = await pool.connect();
  try {
    const tokenData = jwt.verify(token, secrect);
    const user = await User.findOne({
      where: {id: (tokenData as Token).id},
    });
    sequelize.close();
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
export async function solicitudDeAmistad(token: string, data: Solicitud) {
  try {
    const tokenData = jwt.verify(token, secrect);
    const [solicitudUser, create] = await SolicitudAmistad.findOrCreate({
      where: {
        amigoId: data.amigoId,
        userId: (tokenData as Token).id,
      },
      defaults: {
        amigoId: data.amigoId,
        estado: data.estado,
        userId: (tokenData as Token).id,
      },
    });
    if (!create) return 'Ya existe solicitud';
    return solicitudUser;
  } catch (e) {
    return false;
  }
}
export async function getSolicitudAmistad(token: string) {
  try {
    const tokenData = jwt.verify(token, secrect);
    const solicitudesReci = await SolicitudAmistad.findAll({
      where: {
        amigoId: (tokenData as Token).id,
        estado: 'false',
      },
    });
    const solicitudesEnv = await SolicitudAmistad.findAll({
      where: {
        userId: (tokenData as Token).id,
        estado: 'false',
      },
    });

    if (solicitudesReci.length > 0 || solicitudesEnv.length > 0) {
      const solicitudidsReci = solicitudesReci.map((solicitud) =>
        solicitud.get('userId')
      );
      const solicitudidsEnv = solicitudesEnv.map((solicitud) =>
        solicitud.get('amigoId')
      );
      const usersReci = await User.findAll({
        where: {
          id: {
            [Op.in]: solicitudidsReci,
          },
        },
      });
      const usersEnv = await User.findAll({
        where: {
          id: {
            [Op.in]: solicitudidsEnv,
          },
        },
      });
      await sequelize.close();

      return {usersReci, usersEnv};
    }
    return [];
  } catch (e) {
    return e;
  }
}
export async function getSolicitudAmistadEnvi(token: string) {
  try {
    const tokenData = jwt.verify(token, secrect);
    const solicitudesReci = await SolicitudAmistad.findAll({
      where: {
        amigoId: (tokenData as Token).id,
        estado: 'false',
      },
    });
    const solicitudesEnv = await SolicitudAmistad.findAll({
      where: {
        userId: (tokenData as Token).id,
        estado: 'false',
      },
    });
    if (solicitudesReci.length > 0) {
      const solicitudidsReci = solicitudesReci.map((solicitud) =>
        solicitud.get('userId')
      );
      const users = await User.findAll({
        where: {
          id: {
            [Op.in]: solicitudidsReci,
          },
        },
      });
      await sequelize.close();

      return users;
    }
    await sequelize.close();

    return [];
  } catch (e) {
    return false;
  }
}
export async function aceptarSolicitud(token: string, data: Solicitud) {
  try {
    const tokenData = jwt.verify(token, secrect);
    const solicitud = await SolicitudAmistad.update(
      {estado: data.estado},
      {
        where: {
          userId: data.amigoId,
        },
      }
    );
    if (solicitud) {
      const ids = [{user: (tokenData as Token).id}, {user: data.amigoId}];
      const user1 = await User.update(
        {amigos: Sequelize.literal(`array_append(amigos, ${ids[1].user})`)},
        {
          where: {
            id: ids[0].user,
          },
        }
      );
      const user2 = await User.update(
        {amigos: Sequelize.literal(`array_append(amigos, ${ids[0].user})`)},
        {
          where: {
            id: ids[1].user,
          },
        }
      );
      if (user1 && user2) {
        return 'Ahora son Amigos';
      }
    }
    return 'Algo fallo';
  } catch (e) {
    return false;
  }
}
export async function eliminarSolicitud(token: string, data: Solicitud) {
  try {
    const tokenData = jwt.verify(token, secrect);
    const solicitudEnv = await SolicitudAmistad.destroy({
      where: {
        amigoId: (tokenData as Token).id,
        userId: data.userId,
      },
      force: true,
    });
    const solicitudReci = await SolicitudAmistad.destroy({
      where: {
        amigoId: data.userId,
        userId: (tokenData as Token).id,
      },
      force: true,
    });

    if (solicitudEnv || solicitudReci) {
      return 'Solicitud Eliminada';
    }
    return 'No existe solicitud';
  } catch (e) {
    return e;
  }
}
export async function eliminarAmigo(token: string, data: Solicitud) {
  try {
    const tokenData = jwt.verify(token, secrect);
    const user1 = await User.update(
      {amigos: sequelize.literal(`array_remove(amigos, ${data.userId})`)},
      {
        where: {
          id: (tokenData as Token).id,
        },
      }
    );
    const user2 = await User.update(
      {
        amigos: sequelize.literal(
          `array_remove(amigos, ${(tokenData as Token).id})`
        ),
      },
      {
        where: {
          id: data.userId,
        },
      }
    );
    if (user1 && user2) {
      return {user1, user2};
    }
    return 'No existe Amigo';
  } catch (e) {
    return e;
  }
}
export async function getAllAmigos(token: string) {
  try {
    const tokenData = jwt.verify(token, secrect);
    const user = await User.findByPk((tokenData as Token).id);
    if (user) {
      const amigos = user.get('amigos');
      if (amigos) {
        const users = await User.findAll({
          where: {
            id: amigos,
          },
        });
        await sequelize.close();

        return users;
      }
      await sequelize.close();

      return [];
    }
  } catch (e) {
    return false;
  }
}
export async function getAllUser(token: string) {
  try {
    const tokenData = jwt.verify(token, secrect);
    const user = await User.findByPk((tokenData as Token).id);
    const solicitudesReci = await SolicitudAmistad.findAll({
      where: {
        amigoId: (tokenData as Token).id,
        estado: 'false',
      },
    });
    const solicitudesEnv = await SolicitudAmistad.findAll({
      where: {
        userId: (tokenData as Token).id,
        estado: 'false',
      },
    });

    const solicitudIdsReci = solicitudesReci.map((solicitud) =>
      solicitud.get('userId')
    );
    const solicitudIdsEnv = solicitudesEnv.map((solicitud) =>
      solicitud.get('amigoId')
    );
    if (
      solicitudIdsReci.length > 0 ||
      solicitudIdsEnv.length > 0 ||
      user?.get('amigos')
    ) {
      const diferUsers = [
        ...solicitudIdsEnv,
        ...(user?.get('amigos') as []),
        (tokenData as Token).id,
        ...solicitudIdsReci,
      ];

      const usersAll = await User.findAll({
        where: {
          id: {
            [Op.notIn]: diferUsers,
          },
        },
      });
      if (usersAll) {
        await sequelize.close();

        return usersAll;
      }
    }
    await sequelize.close();

    return [];
  } catch (e) {
    return e;
  }
}
