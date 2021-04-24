export const API_ENDPOINT =
  'https://my-json-server.typicode.com/kakaopay-fe/resources';

export async function requestAPI(url) {
  const res = await fetch(`${API_ENDPOINT}${url}`);
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    const errorData = await res.json();
    throw errorData;
  }
}
