'use server';
import {cookies} from 'next/headers';

async function clearCookie() {
  const cookieStore = cookies();
  cookieStore.delete('token');
  return 'ok.';
}

async function getToken() {
  const token = cookies().get('token');
  return token?.value;
}

function getTheme() {
  const theme = cookies().get('theme');
  console.log(theme);
  return theme?.value && JSON.parse(theme.value) ? true : false;
}

async function setTheme({theme}: {theme: boolean}) {
  cookies().set('theme', JSON.stringify(theme));
}

export {clearCookie, getToken, getTheme, setTheme};
