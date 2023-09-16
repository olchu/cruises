import { DBShipsData } from '@/components/vodohod/ui/ships/utils/prepareShips';
import { ShipsDataType } from '@/pages/admin/vodohod';
import { useEffect, useMemo, useState } from 'react';
import {
  DBCruiseData,
  prepareCruises,
} from '../ui/cruises/utils/prepareCruises';
import { useGetTarifs } from './useGetTarifs';
import { useGetToken } from './useGetToken';

const URL = 'https://api-crs.vodohod.com/json/v3/cruises';
const LIMIT = 500;

type CruiseDataTypeItem = {
  preparedData: DBCruiseData[];
  count: number;
};

type CruiseDataType = Record<number, CruiseDataTypeItem>;

export const useGetCruiseList = (dbShips: ShipsDataType[]) => {
  const [cruiseData, setCruiseData] = useState<CruiseDataType | null>(null);
  const [cruiseListError, setCruiseListError] = useState<string | null>(null);
  const { getToken, tokenError } = useGetToken();
  const [isFetchingCruiseList, setIsFetchingCruiseList] = useState(false);

  const { getTarifs } = useGetTarifs();

  const dateFrom = Date.now() / 1000;
  const ships = useMemo(() => {
    return dbShips.map(({ extId }) => extId);
  }, [dbShips]); //TODO проверить без мемо что будет

  const getCruises4Ship = async (id: number, token: any) => {
    const strShips = `filter[motorships]=${id}`;
    const url = `${URL}?limit=${LIMIT}&filter[dateFrom]=${dateFrom}&${strShips}`;
    try {
      const res = await fetch(url, {
        method: 'Get',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data: Main = await res.json();

      return {
        preparedData: prepareCruises(data.result.data, id),
        count: data.result.count,
      };
    } catch (error) {
      setCruiseListError('Ошибка при получении списка круизов');
    }
  };

  const getCruiseList = async () => {
    setIsFetchingCruiseList(true);
    let prepare: CruiseDataType = {};
    const token = (await getToken()).result?.accessToken?.token;

    for (const id of [6]) {
      const shipCruises = (await getCruises4Ship(
        id,
        token
      )) as unknown as CruiseDataTypeItem; // TODO переделать на promise.all
      prepare[id] = shipCruises;
      const tarifs = await getTarifs(shipCruises.preparedData, token);
      console.log('tarifs', tarifs);
    }
    console.log('prepare', prepare);
    setCruiseData(prepare);
    setIsFetchingCruiseList(false);
  };

  useEffect(() => {
    if (tokenError) {
      setCruiseListError(tokenError);
    }
  }, [tokenError]);

  return { cruiseListError, getCruiseList, cruiseData, isFetchingCruiseList };
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
  data: CruisesDataRes[];
}

export interface CruisesDataRes {
  id: number;
  name: string;
  slug: string;
  dateStart: Date;
  dateEnd: Date;
  duration: number;
  updatedAt: Date;
  image: string;
  route_image: null;
  route_image_alt: string;
  annotation_image: null;
  annotation_image_alt: string;
  mainImageMobile: null | string;
  mainImageMobileAlt: string;
  discounts: Discount[];
  motorship: CityEnd;
  cityStart: CityEnd;
  cityEnd: CityEnd;
  cityUturn: CityEnd | null;
  theme: null;
  properties: Destination[] | null;
  destinations: Destination[];
  features: Destination[];
  offers: Destination[];
  route: Route[];
  cabinClasses: CabinClass[];
  decks: CabinClass[];
  rooms: number;
  price: number;
  registrationTime: Date;
}

interface CabinClass {
  id: number;
  name: string;
  meta_id: number;
  meta_name: string;
}

interface CityEnd {
  id: number;
  name: string;
  image: string;
  class?: Class;
}

enum Class {
  Водоход = 'Водоход',
  ВодоходЛайт = 'Водоход.Лайт',
  ВодоходПремиум = 'Водоход.Премиум',
}

interface Destination {
  id: number;
  name: string;
}

interface Discount {
  id: number;
  name: Name;
  annotation: null | string;
  percent: number;
  sort: number;
  updatedAt: number;
  isSelected: boolean;
  isConfirmed: boolean;
  accountable: null;
}

enum Name {
  СкидкаIDAD = 'Скидка ID/AD',
  СкидкаМедицинскимРаботникам = 'Скидка медицинским работникам',
  СкидкаМногодетнойСемьеРФ = 'Скидка многодетной семье РФ',
  СкидкаМолодоженам = 'Скидка молодоженам',
  СкидкаСотрудникамСиловыхВедомств = 'Скидка сотрудникам силовых ведомств',
}

interface Route {
  id: number;
  city_id: number;
  name: string;
  annotation: string;
  in: Date;
  out: Date;
}

// async function processArray(array) {
//   // делаем "map" массива в промисы
//   const promises = array.map(delayedLog);
//   // ждем когда всё промисы будут выполнены
//   await Promise.all(promises);
//   console.log('Done!');
// }
