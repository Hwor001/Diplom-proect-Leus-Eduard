import { baseUrl, jsonContentTypeHeaders } from './constants';
import { getTokens, setTokens } from './tokens';

let isRefreshInProgress = false;

export const request: typeof fetch = (
  input: RequestInfo | URL,
  init?: RequestInit
) => {
  return fetch(input, init).then((response) => {
    const refresh = getTokens()?.refresh;
    if (response.status === 401 && !isRefreshInProgress) {
      isRefreshInProgress = true;
      return fetch(baseUrl + 'auth/jwt/refresh/', {
        method: 'POST',
        headers: { ...jsonContentTypeHeaders },
        body: JSON.stringify({ refresh: refresh }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('SERVER_ERROR');
          }
          return response.json();
        })
        .then((result) => {
          setTokens({ access: result.access, refresh: refresh! });
        })
        .finally(() => (isRefreshInProgress = false))
        .then(() => {
          return fetch(input, updateAuthorizationHeader(init));
        });
    }
    return response;
  });
};

function updateAuthorizationHeader(init: RequestInit | undefined) {
  return {
    ...init,
    headers: {
      ...init?.headers,
      authorization: 'Bearer ' + getTokens()?.access,
    },
  };
}
