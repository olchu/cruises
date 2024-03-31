import { Providers } from '@/shared/constants/providers';
import moment from 'moment';
import { getCruiseRoute } from './getCruiseRoute';

const endPoint = 'https://api-crs.vodohod.com/json/v3/cruise';

export const getCruiseDetails = async (id: number, token: any) => {
  const url = `${endPoint}?id=${id}`;
  try {
    const res = await fetch(url, {
      method: 'Get',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responce: CruiseDetailsResponce = await res.json();
    const { result } = responce;
    console.log('result', result);
    const days = moment(result.duration * 1000).format('D');
    const routesCity = result.route.map((i) => i.name);

    const route = (await getCruiseRoute(responce, token)) || {};

    return {
      extId: result.id,
      title: result.name,
      dateStart: new Date(result.dateStart),
      dateEnd: new Date(result.dateEnd),
      cityStart: result.cityStart.name,
      cityEnd: result.cityEnd.name,
      days: parseInt(days) - 1,
      route,
      citiesInRoute: routesCity,
      shortRoute: routesCity.join(' → '),
      extShipId: result.motorship.id,
      shipId: 0,
      shipName: result.motorship.name,
      loadFrom: Providers.vodohod,
      minPrice: 0,
      minDiscountPrice: 0,
      prices: {},
      description: result.description,
      restaurants: result.restaurants,
      included: result.included,
      excluded: result.excluded,
      // image: result.image,
      image: '',
      class: '',
      type: '',
      provider: '',
      shipImg: '',
    };
  } catch (error) {}
};

export interface CruiseDetailsResponce {
  code: number;
  message: string;
  result: Result;
}

interface Result {
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
  mainImageMobile: string;
  mainImageMobileAlt: string;
  discounts: Discount[];
  motorship: CityEnd;
  cityStart: CityEnd;
  cityEnd: CityEnd;
  cityUturn: null;
  theme: null;
  properties: null;
  destinations: Destination[];
  features: Destination[];
  offers: Destination[];
  route: Route[];
  cabinClasses: CabinClass[];
  decks: CabinClass[];
  rooms: number;
  price: number;
  registrationTime: Date;
  description: string;
  restaurants: string;
  included: string;
  excluded: string;
  transportation_type_id: number;
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
  class?: string;
}

interface Destination {
  id: number;
  name: string;
}

interface Discount {
  id: number;
  name: string;
  annotation: null | string;
  percent: number;
  sort: number;
  updatedAt: number;
  isSelected: boolean;
  isConfirmed: boolean;
  accountable: null;
}

interface Route {
  id: number;
  city_id: number;
  name: string;
  annotation: string;
  in: Date;
  out: Date;
}
