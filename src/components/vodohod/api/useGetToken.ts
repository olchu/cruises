import { stringify } from 'querystring';
import { useState } from 'react';

const LOGIN = 'vbp+vodohodapi@vbp.ru';
const PWD = 'huiP8o43uaaekMAMn';
const URL = 'https://api-crs.vodohod.com/security/authorise';

export const useGetToken = () => {
  const [tokenError, setTokenError] = useState<string | null>(null);

  const body = {
    login: LOGIN,
    password: PWD,
  };

  const getToken = async() => {
    try {
      const res = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      return data;
    } catch(err) {
      setTokenError('Ошибка в получении токена')
    }
  }
  return { getToken, tokenError };
};
