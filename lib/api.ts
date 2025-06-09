const Api_url = process.env.NEXT_PUBLIC_PORT;
export async function fetchApiSwr(api: string, option: any) {
  try {
    const response = await fetch(`${Api_url}/api${api}`, option);
    const data = await response.json();
    if (data.message === 'No hay Token') {
      if (typeof window !== 'undefined') {
        window.location.href = '/iniciarSesion';
      }
      return false;
    }
    return data;
  } catch (e: any) {
    console.error(e);
    return false;
  }
}
