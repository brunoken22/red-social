import {User} from '@/lib/models';
import jwt from 'jsonwebtoken';
import {isGeneratorFunction} from 'util/types';

const secrect = process.env.SECRECT as string;
type Data = {
  email: string;
  fullName: string;
};
type Token = {
  id: number;
};
export async function findOrCreateUser(data: Data) {
  console.log(data);
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
    const user = await User.findOne({
      where: {id: (tokenData as Token).id},
    });
    return user;
  } catch (e) {
    return false;
  }
}
