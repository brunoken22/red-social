const Api_url = 'https://backend-red-social-theta.vercel.app';
export async function fetchApiSwr(prop: [string, object]) {
  const api = prop[1] || {};
  const response = await fetch(`${Api_url}/api` + prop[0], api);
  const data = await response.json();
  return data;
}
// ||' http://localhost:3001'
