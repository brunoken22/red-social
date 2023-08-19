import {Auth} from '@/lib/models';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const secrect = process.env.SECRECT as string;

type Data = {
  email: string;
  password: string;
};
type Token = {
  id: number;
};
function getSHA256ofString(text: string) {
  return crypto.createHash('sha256').update(text).digest('hex');
}

export async function findOrCreateAuth(id: string, data: Data) {
  const token = jwt.sign({id}, secrect);

  const [auth, created] = await Auth.findOrCreate({
    where: {email: data.email},
    defaults: {
      email: data.email,
      password: getSHA256ofString(data.password),
      userId: id,
    },
  });
  return [auth, token];
}
export async function signin(data: Data) {
  const auth = await Auth.findOne({
    where: {email: data.email, password: getSHA256ofString(data.password)},
  });
  if (auth) {
    const token = jwt.sign({id: auth.get('userId')}, secrect);
    return [auth, token];
  }
  return [false, null];
}

export async function modAuth(token: string, data: Data) {
  try {
    const tokenData = jwt.verify(token, secrect);
    const auth = await Auth.update(
      {
        password: getSHA256ofString(data.password),
      },
      {where: {userId: (tokenData as Token).id}}
    );
    return auth;
  } catch (e) {
    return false;
  }
}
