import {NextResponse, NextRequest} from 'next/server';
import jwt from 'jsonwebtoken';

export function token(id: number) {
  const token = jwt.sign({id}, process.env.SECRECT as string);
  return token;
}

export function decode(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.SECRECT as string);
    return decoded;
  } catch (e) {
    return null;
  }
}

export function authMiddelware(callback: any) {
  return function (request: NextRequest) {
    const token = request.headers.get('authorization')!.split(' ')[1];

    if (!token) {
      NextResponse.json('No hay Token');
    }

    const tokenVerify = decode(token);

    if (tokenVerify) {
      callback(request, NextResponse, tokenVerify);
    } else {
      NextResponse.json('Token invalido');
    }
  };
}
