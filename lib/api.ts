const Api_url =
  process.env.NEXT_PUBLIC_PORT || 'https://red-social-node.onrender.com';
export async function fetchApiSwr(api: string, option: any) {
  const response = await fetch(`${Api_url}/api${api}`, option);
  const data = await response.json();
  return data;
}
