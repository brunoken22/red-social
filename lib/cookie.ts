import {getCookie} from 'cookies-next';

export function getTokenCookie() {
  const token = getCookie('token');
  console.log(token);
  return token;
}
