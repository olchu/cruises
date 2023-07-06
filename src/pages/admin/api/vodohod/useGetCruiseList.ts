import { useEffect, useState } from 'react';
import { useGetToken } from './useGetToken';

const URL = 'https://api-crs.vodohod.com/json/v3/cruises';
const LIMIT = 200;

export const useGetCruiseList = () => {
  const [cruiseData, setCruiseData] = useState<any>(null);
  const [cruiseListError, setCruiseListError] = useState<string | null>(null);
  const { getToken, tokenError } = useGetToken();
  const [isFetchingCruiseList, setIsFetchingCruiseList] = useState(false);

  const dateFrom = Date.now() / 1000;
  const ships = [90]; //TODO выгружать/получать номера кораблей из базы
  const strShips = ships.map((ship) => `filter[motorships]=${ship}`).join('&');
  const url = `${URL}?limit=${LIMIT}&filter[dateFrom]=${dateFrom}&${strShips}`;

  const getCruiseList = async () => {
    setIsFetchingCruiseList(true);
    const token = (await getToken()).result?.accessToken?.token;
    try {
      const res = await fetch(url, {
        method: 'Get',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setIsFetchingCruiseList(false)
      setCruiseData(data?.result?.data);
    } catch (error) {
      setIsFetchingCruiseList(false)
      setCruiseListError('Ошибка при получении списка круизов');
    }
  };

  useEffect(() => {
    if (tokenError) {
      setCruiseListError(tokenError);
    }
  }, [tokenError]);

  return { cruiseListError, getCruiseList, cruiseData, isFetchingCruiseList };
};
