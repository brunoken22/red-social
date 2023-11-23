const Api_url = 'https://red-social-node.onrender.com';
export async function fetchApiSwr(prop: [string, object]) {
  const api = prop[1] || {};
  const response = await fetch(`${Api_url}/api` + prop[0], api);
  const data = await response.json();
  return data;
}
//
// 'http://localhost:3000'
// 'https://5kd3mkwn-3000.brs.devtunnels.ms'
//https://backend-red-social-theta.vercel.app/
//"https://red-social-node.onrender.com"
