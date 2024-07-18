const Api_url = process.env.NEXT_PUBLIC_PORT;
export async function fetchApiSwr(api: string, option: any) {
  try {
    const response = await fetch(`${Api_url}/api${api}`, option);
    const data = await response.json();

    if (data === 'No hay Token') {
      import('cookies-next').then((cookie) => {
        cookie.setCookie('login', 'false');
      });
    }
    return data;
  } catch (e: any) {
    if (
      e.message === `Unexpected token 'N', "No hay Token" is not valid JSON`
    ) {
      import('cookies-next').then((cookie) => {
        cookie.setCookie('login', 'false');
        window.location.replace(window.location.origin + '/');
      });
    }
    return false;
  }
}
