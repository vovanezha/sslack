// @TODO: move to proxy or something
export const BASE_URL = 'http://localhost:3000/';

export function ffetch(url, options) {
  return fetch(BASE_URL + url, options).then((response) => {
    if (response.status === 204) {
      return;
    }

    return response.json();
  });
}
