'use server';
import { cookies } from 'next/headers';
const Api_url = process.env.NEXT_PUBLIC_PORT;

export async function fetchApiSwr(api: string, option: any) {
  const token = cookies().get('token')?.value;
  try {
    const newOption = {
      ...option,
      headers: {
        ...option.headers,
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(`${Api_url}/api${api}`, newOption);
    const data = await response.json();
    if (data.message === 'No hay Token') {
      if (typeof window !== 'undefined') {
        window.location.href = '/iniciarSesion';
      }
      return false;
    }
    return data;
  } catch (e: any) {
    console.error('A OCURRIDO ESTE ERROR: ', e);
    return false;
  }
}
