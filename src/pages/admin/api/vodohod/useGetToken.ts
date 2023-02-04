import { stringify } from 'querystring';
import { useState } from 'react';

const LOGIN = 'vbp+vodohodapi@vbp.ru';
const PWD = 'huiP8o43uaaekMAMn';
const URL = 'https://api-crs.vodohod.com/security/authorise';

export const useGetToken = () => {
  const [token, setToken] = useState<string | null>(null);
  const [tokenError, setTokenError] = useState<string | null>(null);

  const body = {
    login: LOGIN,
    password: PWD,
  };

  const getToken = () => {
    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((json) => setToken(json?.result?.accessToken?.token))
      .catch((error) => setTokenError('Ошибка в получении токена'));
  };
  return { token, getToken, tokenError };
};
