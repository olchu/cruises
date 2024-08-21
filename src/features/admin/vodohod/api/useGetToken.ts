import { useState } from 'react';

const LOGIN = process.env.NEXT_PUBLIC_VODOHOD_LOGIN;
const PWD = "pCvJ}CDD?&1EylCV$*0!t?C.9";
const URL = 'https://api-crs.vodohod.com/security/authorise';

export const useGetToken = () => {
  const [tokenError, setTokenError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const body = {
    login: LOGIN,
    password: PWD,
  };

  const getToken = async () => {
    try {
      const res = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      setToken(data.result?.accessToken?.token);
      return data.result?.accessToken?.token;
    } catch (err) {
      setTokenError('Ошибка в получении токена');
    }
  };
  return { getToken, tokenError, token };
};
