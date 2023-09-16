import { CruisesDataRes } from '@/components/vodohod/api/useGetCruiseList';
import { Providers } from '@/constants/providers';
import moment from 'moment';

interface Price {
  basePrice: number;
  discountPrice: number;
}
interface ClassPrice {
  name: string;
  price: Price;
}

interface DBPricesData {
  deckName: string;
  class: ClassPrice[];
}

export interface DBCruiseData {
  exId: number;
  title: string;
  dateStart: string;
  dateEnd: string;
  cityStart: string;
  cityEnd: string;
  days: number;
  route: string;
  shortRoute: string;
  shipId: number;
  shipName: string;
  type: string;
  loadFrom: string;
  minPrice: number;
  minDiskontPrice: number;
  prices: DBPricesData[];
}

export const prepareCruises = (cruises: CruisesDataRes[], shipId: number) => {
  return cruises.map((cruise) => {
    const days = moment(cruise.duration * 1000).format('D');

    return {
      exId: cruise.id,
      title: cruise.name,
      dateStart: cruise.dateStart,
      dateEnd: cruise.dateEnd,
      cityStart: cruise.cityStart.name,
      cityEnd: cruise.cityEnd.name,
      days: parseInt(days),
      route: '', //TODO fix it
      shortRoute: '', //TODO fix it
      shipId: shipId,
      shipName: cruise.motorship.name,
      type: 'river', //TODO fix it
      loadFrom: Providers.vodohod,
      minPrice: 0,
      minDiskontPrice: 0,
      prices: [],
    };
  });
};
