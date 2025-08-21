import { getCookie } from "cookies-next";
const Api_url = process.env.NEXT_PUBLIC_PORT || "https://red-social-node-production.up.railway.app";

export async function fetchApiClient(api: string, option: any) {
  const token = getCookie("token");
  try {
    const newOption = {
      ...option,
      headers: {
        ...option.headers,
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(`${Api_url}/api${api}`, newOption);
    const data = await response.json();
    if (data.message === "No hay Token") {
      if (typeof window !== "undefined") {
        window.location.href = "/iniciarSesion";
      }
      return false;
    }
    return data;
  } catch (e: any) {
    console.error("A OCURRIDO ESTE ERROR: ", e);
    return false;
  }
}
