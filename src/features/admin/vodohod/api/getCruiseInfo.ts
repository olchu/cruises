import { getCruiseDetails } from '@/features/admin/vodohod/api/getCruiseDetails';
import { getTarif } from '@/features/admin/vodohod/api/getTarif';
import { ShipsContext } from '@/pages/admin/vodohod';
import { DBCruiseData } from '@/shared/types/dbCruisesType';
import { ShipsType } from '@/shared/types/prismaResponse';
import { useContext } from 'react';

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const getCruiseInfo = async (
  cruises: CruisesDataRes[],
  shipId: number,
  token: string,
  ship: ShipsType
) => {
  let dbCruises: DBCruiseData[] = [];
  for (let cruise of cruises) {
    await timeout(2000);
    const tarifs = await getTarif(cruise.id, token);
    const cruiseDetails = await getCruiseDetails(cruise.id, token);
    if (cruiseDetails) {
      cruiseDetails.minPrice = tarifs?.minimum.minPrice || 0;
      cruiseDetails.minDiscountPrice = tarifs?.minimum.minPriceDiscont || 0;
      cruiseDetails.prices = tarifs?.tarifs || {};
      cruiseDetails.shipId = shipId;
      cruiseDetails.shipId = shipId;
      cruiseDetails.class = ship?.class || '';
      cruiseDetails.type = ship?.type || '';
      cruiseDetails.provider = ship?.provider || '';
      cruiseDetails.shipImg = ship?.img || '';

      dbCruises.push(cruiseDetails);
    }
  }

  return dbCruises;
};

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
