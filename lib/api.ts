import {getTokenCookie} from './cookie';

const Api_url = process.env.NEXT_PUBLIC_PORT;
export async function fetchApiSwr(api: string, option: any) {
  const response = await fetch(`${Api_url}/api${api}`, option);
  const data = await response.json();
  console.log(data);
  return data;
}
