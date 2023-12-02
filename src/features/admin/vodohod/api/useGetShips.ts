import { useEffect, useState } from 'react';
import { useGetToken } from './useGetToken';

const endPoint = 'https://api-crs.vodohod.com/json/v3/motorships?limit=200';

export const useGetShips = () => {
  const [ships, setShips] = useState<null | ShipsData[]>(null);
  const [error, setError] = useState<string | null>(null);
  const { getToken, tokenError, token } = useGetToken();
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (token) return;
    getToken();
  }, [token]);

  const getShips = async () => {
    if (token) {
      try {
        const res = await fetch(endPoint, {
          method: 'Get',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data: Main = await res.json();
        setShips(data.result.data);
      } catch (error) {
        setIsFetching(false);
        setError('Ошибка при получении списка теплоходов');
      }
    }
  };

  useEffect(() => {
    if (tokenError) {
      setError(tokenError);
    }
  }, [tokenError]);

  return { error, getShips, ships, isFetching };
};

interface Main {
  code: number;
  message: string;
  result: Result;
}

interface Result {
  count: number;
  limit: number;
  offset: number;
  orderBy: string;
  orderDirection: string;
  data: ShipsData[];
}

export interface ShipsData {
  id: number;
  name: string;
  annotation: string;
  description: string;
  image: string;
  scheme: string;
  class: Class;
  features: Feature[];
  media: Media[];
}

enum Class {
  WildLife = 'Wild Life',
  Водоход = 'Водоход',
  ВодоходЛайт = 'Водоход.Лайт',
  ВодоходЛюкс = 'Водоход.Люкс',
  ВодоходПремиум = 'Водоход.Премиум',
}

interface Feature {
  id: number;
  name: string;
}

interface Media {
  id: number;
  title: null;
  alt: string;
  path: string;
  size: number;
  type: Type;
  updatedAt: number;
  sort: number;
}

enum Type {
  ImageJPEG = 'image/jpeg',
}
