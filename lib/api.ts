export async function fetchApiSwr(prop: [string, object]) {
  const api = prop[1] || {};
  const response = await fetch('http://localhost:3000/api' + prop[0], api);
  const data = await response.json();
  return data;
}
