import { DBCruiseData, getCruiseInfo } from '../ui/cruises/utils/getCruiseInfo';

const URL = 'https://api-crs.vodohod.com/json/v3/cruises';
const LIMIT = 500;

type CruiseDataTypeItem = {
  preparedData: DBCruiseData[];
  count: number;
};

export type CruiseDataType = Record<number, CruiseDataTypeItem>;

export const getCruiseList = async (
  extShipId: number,
  shipId: number,
  token: string
) => {
  const dateFrom = Date.now() / 1000;
  let prepare: CruiseDataType = {};

  const strShips = `filter[motorships]=${extShipId}`;
  const url = `${URL}?limit=${LIMIT}&filter[dateFrom]=${dateFrom}&${strShips}`;
  try {
    const res = await fetch(url, {
      method: 'Get',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data: CruiseListResponce = await res.json();

    const cruises = await getCruiseInfo(data.result.data, shipId, token);

    return {
      preparedData: cruises,
      count: data.result.count,
    };
  } catch (error) {
    console.log('Ошибка при получении списка круизов для', extShipId);
  }
};

interface CruiseListResponce {
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
