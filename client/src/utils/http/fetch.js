// @TODO: move to proxy or something
const BASE_URL = 'http://localhost:3000/';

async function ffetch(url, options) {
  try {
    const response = await fetch(BASE_URL + url, options);

    if (!response.ok) {
      const json = await response.json();
      throw json;
    }

    if (response.status === 204) {
      return;
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}

ffetch.post = function post(url, body, options = {}) {
  options = {
    ...options,
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
    },
  };

  return ffetch(url, options);
};

module.exports = {BASE_URL, ffetch};
