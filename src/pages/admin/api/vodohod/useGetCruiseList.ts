import { useState } from 'react';

const URL = 'https://api-crs.vodohod.com/json/v3/cruises';
const LIMIT = 200;

export const useGetCruiseList = () => {
  const [cruiseData, setCruiseData] = useState<any>(null);
  const [cruiseListError, setCruiseListError] = useState<string | null>(null);

  const dateFrom = Date.now()/ 1000;
  const ships = [90];
  const strShips = ships.map((ship) => `filter[motorships]=${ship}`).join('&');
  const url = `${URL}?limit=${LIMIT}&filter[dateFrom]=${dateFrom}&${strShips}`;

  const getCruiseList = (token: string) => {
    fetch(url, {
      method: 'Get',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setCruiseData(data))
      .catch((error) =>
        setCruiseListError('ошибка при получении списка круизов')
      );
  };

  return { cruiseListError, getCruiseList, cruiseData };
};
