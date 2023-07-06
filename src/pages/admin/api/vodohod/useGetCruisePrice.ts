import { useEffect, useState } from 'react';
import { useGetToken } from './useGetToken';

const URL = 'https://api-crs.vodohod.com/json/v3/cruise';
const LIMIT = 200;


export const useGetCruisePrice = () => {
  const [price, setPrice] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { getToken, tokenError } = useGetToken();
  const [token, setToken] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  // https://api-crs.vodohod.com/json/v3/cruise/room-tariffs?id=16430

  const getCruisePrice = async (cruises: any[]) => {
    const restoken = (await getToken()).result?.accessToken?.token;
    let prices: any[] = [];
    try {
      cruises.forEach(async (cruise) => {
        const url = `${URL}?&id=${cruise?.exId}`;
        const res = await fetch(url, {
          method: 'Get',
          headers: {
            Authorization: `Bearer ${restoken}`,
          },
        });
        const data = await res.json();
        prices.push({
          [cruise?.exId]: data?.result,
        });
      });
      setPrice(prices);
    } catch (error) {
      setIsFetching(false);
      setError('Ошибка при получении списка круизов');
    }
  };

  useEffect(() => {}, []);

  useEffect(() => {
    if (tokenError) {
      setError(tokenError);
    }
  }, [tokenError]);

  return { error, getCruisePrice, price, isFetching };
};
