const Api_url =
  process.env.NEXT_PUBLIC_API_HOST || 'https://red-social-omega.vercel.app';
export async function fetchApiSwr(prop: [string, object]) {
  const api = prop[1] || {};
  const response = await fetch(`${Api_url}/api` + prop[0], api);
  const data = await response.json();
  return data;
}