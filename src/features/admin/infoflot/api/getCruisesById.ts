import { Providers } from '@/shared/constants/providers';
import { ShipsType } from '@/shared/types/prismaResponse';
import { getPriceseById } from './getPriceseById';
import { getRoutes } from './getRoutes';

const infoflotKey = process.env.NEXT_PUBLIC_INFOFLOT_KEY;

export const getCruisesById = async (
  extId: number,
  shipId: number,
  ship: ShipsType
) => {
  const infoRes = await fetch(
    ` https://restapi.infoflot.com/cruises/${extId}?key=${infoflotKey}`
  );
  const info: InfoflotCruiseResponse = await infoRes.json();

  const { prices, minPriceDiscount, minPrice } = await getPriceseById(
    extId,
    ship
  );

  const route = getRoutes(info.timetable);

  const shortRoute = info.routeShort.split(' – ');

  const regex = /Акция\s*«([^»]+)»|([^«]+)$/;

  let offers: string[] = [];
  let discounts: string[] = [];

  info.sug.map(({ title }) => {
    const matches = title.match(regex);
    if (matches) {
      // Если найдено слово "Акция"
      if (matches[1]) {
        offers.push(matches[1]);
      } else {
        discounts.push(title);
      }
    }
  });

  console.log('offers ', offers);
  console.log('discounts ', discounts);

  return {
    extId: extId,
    title: info.beautifulName || '',
    dateStart: new Date(info.dateStartTimestamp * 1000),
    dateEnd: new Date(info.dateEndTimestamp * 1000),
    cityStart: info.startCityName,
    cityEnd: shortRoute.at(-1) || '',
    days: info.days,
    shortRoute: info.route.split(' – ').join(' → '),
    shipId: shipId,
    extShipId: info.ship.id,
    shipName: info.ship.name,
    loadFrom: Providers.infoflot,
    description: info.description || '',
    included: info.include,
    excluded: info.additional,
    restaurants: '',
    image: Array.isArray(info.photos)
      ? info.photos[0].filename
      : info.photos || '',
    shipImg: ship.img || '',
    minPrice: minPrice,
    minDiscountPrice: minPriceDiscount,
    citiesInRoute: info.route.split(' – '),
    route: route,
    prices,
    class: ship.class || '',
    type: ship.type || '',
    provider: ship.provider || '',
    offers,
    discounts,
  };
};

interface InfoflotCruiseResponse {
  id: number;
  name: string;
  beautifulName: null;
  dateStart: Date;
  dateEnd: Date;
  dateStartTimestamp: number;
  dateEndTimestamp: number;
  days: number;
  nights: number;
  route: string;
  routeShort: string;
  description: null;
  routeBottomText: null;
  include: string;
  additional: string;
  important: null;
  discountsText: string;
  min_price: number;
  max_price: number;
  min_price_absolute: number;
  max_price_absolute: number;
  minDefaultPrice: number;
  shipType: null;
  currency: number;
  childAge: string;
  infantAge: string;
  noPlaceChildAge: null;
  rate: number;
  freeCabins: number;
  portStart: number;
  portEnd: number;
  dockStart: null;
  weekend: null;
  cruise_flags: null;
  cruise_time_avaliable: number;
  cruise_premium_text: null;
  notesExcursions: null;
  startCity: number;
  startCityName: string;
  startCityNameEn: string;
  startCityCountry: number;
  isStepByStepCabinSearch: null;
  timetableDoc: string;
  timetablePdf: string;
  map: string;
  tags: any[];
  prices: Prices;
  min_price_rur: number;
  rate_euro: number;
  min_price_euro: number;
  suggestion: null;
  without_visa: null;
  russian_squad: null;
  russian_squad_title: any[];
  sug: Sug[];
  ship: Ship;
  discounts: Discount[];
  maxDiscount: number;
  type: null;
  rivers: PopularRoute[];
  regions: PopularRoute[];
  popularRoutes: PopularRoute[];
  photo: null;
  cabinCapacity: null;
  photos: PhotoElement[];
  parentCruise: null;
  timetable: Timetable[];
  oneWay: boolean;
  oneMoreDayStop: boolean;
}

interface Discount {
  type: PopularRoute;
  values: Value[];
}

interface PopularRoute {
  id: number;
  name: string;
}

interface Value {
  id: number;
  timeStart: Date;
  timeEnd: Date;
  amount: number;
  gender: number;
  title: string;
  description: null | string;
}

interface PhotoElement {
  position: number;
  filename: string;
  filetype: string;
  filesize: number;
  description: string;
}

interface Prices {
  min: number;
  infoflotBonus: number;
  old: number;
  bsoz: null;
}

interface Ship {
  id: number;
  name: string;
  type: number;
  operatorId: number;
  operatorName: string;
  operatorBrandName: null;
  moscow_time: number;
  decks: Deck[];
  cabins: null;
  photo: ShipPhoto;
}

interface Deck {
  id: number;
  name: string;
  position: number;
}

interface ShipPhoto {
  name: string;
  path: string;
  type: string;
  size: string;
}

interface Sug {
  id: number;
  type: number;
  title: string;
  descr: string;
  icon: string;
  priority: number;
}

export interface Timetable {
  id: number;
  dateArrival: Date;
  dateDeparture: Date;
  place: string;
  cityId: number;
  port: number | null;
  description: string;
  excursions: Excursion[] | null;
  cruiseId: number;
  city: City;
  hideDate: boolean;
  hideTime: boolean;
}

interface City {
  id: number;
  name: string;
  name_en: string;
}

export interface Excursion {
  id: number;
  name: string;
  type: Type;
  description: string;
  length: string;
  minimumPeople: number;
  priceAdult: number;
  priceAdultCurrency: number;
  priceChild: number;
  priceChildCurrency: number;
  included: number;
  photos: string;
  hasTranslate: boolean;
  timeStart: string;
  timeEnd: string;
  date: Date;
  images: null;
}

enum Type {
  Автобусная = 'Автобусная',
  АвтобусноПешеходная = 'Автобусно-пешеходная',
  Пешая = 'Пешая',
}
